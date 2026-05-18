/**
 * Günde bir "Sabah kahvesi" — Moono dili, yurtiçi / yurtdışı blokları.
 * Yurtiçi: Hürriyet + NTV ekonomi RSS (başlık) + Finnhub TR süzülmüş başlıklar.
 * Yurtdışı: Finnhub genel (TR ile ilgisiz) başlıklar.
 * Cache: brief_date + slot sabit "morning" (günde tek kayıt).
 *
 * Secrets: FINNHUB_API_KEY, GEMINI_API_KEY
 * Otomatik: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/** Günde tek özet için cache slotu (DB check constraint ile uyumlu) */
const DAILY_SLOT = 'morning' as const;

function isTurkeyRelevant(text: string): boolean {
  const s = text.normalize('NFKC').toLowerCase();
  const tlKur = /\btl\b/.test(s) && (s.includes('kur') || s.includes('kurum') || s.includes('dolar'));
  return (
    s.includes('türkiye') ||
    s.includes('turkiye') ||
    /\bturkey\b/.test(s) ||
    /\bistanbul\b/.test(s) ||
    s.includes('tcmb') ||
    s.includes('merkez bank') ||
    s.includes('usd/try') ||
    s.includes('eur/try') ||
    s.includes('dolar') ||
    /\btry\b/.test(s) ||
    tlKur ||
    s.includes('bist') ||
    s.includes('borsa istanbul') ||
    s.includes('borsa i̇stanbul') ||
    (s.includes('lira') && (s.includes('türk') || s.includes('turk')))
  );
}

function istanbulYmd(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

async function fetchFinnhubNews(
  token: string,
  category: 'general' | 'forex',
): Promise<{ headline: string; summary?: string; datetime: number }[]> {
  const res = await fetch(`https://finnhub.io/api/v1/news?category=${category}&token=${token}`);
  if (!res.ok) return [];
  const rows = await res.json();
  if (!Array.isArray(rows)) return [];
  return rows
    .map((r: any) => ({
      headline: String(r.headline ?? '').trim(),
      summary: typeof r.summary === 'string' ? r.summary : '',
      datetime: typeof r.datetime === 'number' ? r.datetime : 0,
    }))
    .filter((n) => n.headline.length > 0);
}

/** RSS `<item>` bloklarından başlık çeker (Hürriyet, NTV ekonomi vb.). */
function parseRssItemTitles(xml: string, max: number, excludeLower: Set<string>): string[] {
  const out: string[] = [];
  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null && out.length < max) {
    const block = m[1];
    const tm = block.match(
      /<title(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i,
    );
    if (!tm) continue;
    let title = tm[1]
      .replace(/<!\[CDATA\[|\]\]>/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    title = title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    const low = title.normalize('NFKC').toLowerCase();
    if (title.length < 8 || excludeLower.has(low)) continue;
    out.push(title);
  }
  return out;
}

async function fetchRssTitles(url: string, max: number, excludeSiteNames: string[]): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'MoonoBorsaApp/1.0 (daily-brief; contact: app)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const ex = new Set(excludeSiteNames.map((s) => s.normalize('NFKC').toLowerCase()));
    return parseRssItemTitles(xml, max, ex);
  } catch {
    return [];
  }
}

/** Hürriyet Ekonomi RSS — yalnızca başlıklar (Edge sunucusundan çekilir). */
async function fetchHurriyetEkonomiTitles(max = 14): Promise<string[]> {
  return fetchRssTitles('https://www.hurriyet.com.tr/rss/ekonomi', max, ['Hürriyet']);
}

async function fetchNtvEkonomiTitles(max = 14): Promise<string[]> {
  return fetchRssTitles('https://www.ntv.com.tr/ekonomi.rss', max, [
    'Ntv',
    'NTV',
    'NTV Ekonomi',
    'NTV.COM.TR',
  ]);
}

function dedupeHeadlines(titles: string[], cap: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of titles) {
    const trimmed = t.trim();
    if (trimmed.length < 8) continue;
    const k = trimmed.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').slice(0, 96);
    if (k.length < 8) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
    if (out.length >= cap) break;
  }
  return out;
}

async function tcmbKurLine(): Promise<string> {
  try {
    const xc = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
    const xml = await xc.text();
    const tarihM = xml.match(/Tarih_Date[^>]*Tarih="([^"]+)"/);
    const tarih = tarihM?.[1] ?? '';
    function rateFor(code: string): string | null {
      const re = new RegExp(
        `<Currency[^>]*Kod="${code}"[\\s\\S]*?<BanknoteSelling>([^<]+)</BanknoteSelling>`,
        'i',
      );
      const m = xml.match(re);
      return m?.[1]?.trim() ?? null;
    }
    const usd = rateFor('USD');
    const eur = rateFor('EUR');
    if (!usd || !eur) return '';
    return `TCMB ${tarih}: USD/TRY ${usd}, EUR/TRY ${eur} (banknot satış).`;
  } catch {
    return '';
  }
}

type BriefJson = {
  v: 2;
  opening: string;
  domestic: string;
  international: string;
};

async function generateBriefJson(
  apiKey: string,
  kurLine: string,
  domesticHeadlines: string[],
  intlHeadlines: string[],
): Promise<BriefJson> {
  const GEMINI_MODEL = 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const body = JSON.stringify({
    contents: [{
      parts: [{
        text: `Sen Moono adında bir finans eğitmeni asistanısın. Kullanıcıya "Ortak" diye hitap edersin. Kısa, sıcak, net cümleler. Asla yatırım tavsiyesi verme, al/sat deme.

Görev: "Sabah kahvesi" metni üret. SADECE aşağıdaki JSON şemasında cevap ver; başına/sonuna başka metin, markdown kod çiti ekleme.
Şema:
{"v":2,"opening":"1-2 cümle: kısa selam ve bugünün genel havası (dün/bugün fark etmeden).","domestic":"Uzun metin: Türkiye / yurtiçi gündem; 5-8 kısa paragraf veya birbirinden ayrı 4-5 net madde (haber özü gibi). Başlıklardan esinlen; spekülasyon uydurma.","international":"Uzun metin: yurtdışı piyasa ve jeopolitik; 5-8 kısa paragraf veya birbirinden ayrı 4-5 net madde (haber özü gibi)."}

Önemli:
- "Ortak" kelimesini tüm JSON metninde en fazla bir kez kullan (tercihen opening'te tek sefer, domestic ve international'da tekrar etme).
- opening ile domestic içeriğini çiftleme: opening genel ve kısa kalsın; somut Türkiye maddeleri domestic'te.
- domestic + international birlikte okuyucuya **en az 8, tercihen 10 ayrı somut gelişme/haber özü** hissi verecek kadar dolu olsun (her blokta çoklu paragraf veya madde).
- domestic mutlaka aşağıdaki Türkiye başlıklarından en az dört somut konuya değinsin. Başlık listesi kısa olsa bile kur satırı + iç piyasa/BIST/kur gündeminden tarafsız, dolu metin yaz; domestic boş veya "yurtiçi yok" deme.
- international'da en az dört somut küresel gelişmeye değin.

Kur (referans):
${kurLine || 'Kur alınamadı.'}

Yurtiçi kaynak başlıkları (Türkiye — kelimesi kelimesine kopyalama):
${domesticHeadlines.slice(0, 30).join('\n')}

Yurtdışı kaynak başlıkları:
${intlHeadlines.slice(0, 30).join('\n')}`,
      }],
    }],
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body,
  });
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!text || typeof text !== 'string') throw new Error('Gemini boş döndü');
  const cleaned = text.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned) as BriefJson;
  if (parsed.v !== 2 || !parsed.opening || !parsed.domestic || !parsed.international) {
    throw new Error('Geçersiz özet JSON');
  }
  return parsed;
}

function parseStoredBrief(raw: string): BriefJson | null {
  const t = raw.trim();
  if (!t.startsWith('{')) return null;
  try {
    const j = JSON.parse(t) as BriefJson;
    if (j.v === 2 && j.opening && j.domestic && j.international) return j;
  } catch { /* legacy */ }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  const finnh = Deno.env.get('FINNHUB_API_KEY')?.trim();
  const gemini = Deno.env.get('GEMINI_API_KEY')?.trim();
  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim();
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim();

  if (!finnh) {
    return new Response(JSON.stringify({ ok: false, error: 'FINNHUB_API_KEY eksik.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  if (!gemini) {
    return new Response(JSON.stringify({ ok: false, error: 'GEMINI_API_KEY eksik.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const urlObj = new URL(req.url);
  const force = urlObj.searchParams.get('force') === '1';
  const ymd = istanbulYmd();
  const supabase = supabaseUrl && serviceKey
    ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
    : null;

  if (supabase && force) {
    await supabase.from('moono_daily_briefs').delete().eq('brief_date', ymd).eq('slot', DAILY_SLOT);
  }

  if (supabase && !force) {
    const { data: row } = await supabase
      .from('moono_daily_briefs')
      .select('moono_text, created_at')
      .eq('brief_date', ymd)
      .eq('slot', DAILY_SLOT)
      .maybeSingle();
    if (row?.moono_text) {
      const parsed = parseStoredBrief(row.moono_text);
      if (parsed) {
        return new Response(
          JSON.stringify({
            ok: true,
            briefDate: ymd,
            format: 2,
            opening: parsed.opening,
            domestic: parsed.domestic,
            international: parsed.international,
            cached: true,
            createdAt: row.created_at,
            sourcesNote:
              'Yurtiçi: Hürriyet + NTV ekonomi RSS başlıkları + Finnhub (Türkiye). Yurtdışı: Finnhub genel.',
            disclaimer:
              'Moono yapay zekâ özetidir; yatırım tavsiyesi değildir. Başlıkları kaynaklardan doğrula.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      /** Eski düz metin cache */
      return new Response(
        JSON.stringify({
          ok: true,
          briefDate: ymd,
          format: 1,
          fullText: row.moono_text,
          cached: true,
          createdAt: row.created_at,
          disclaimer:
            'Moono yapay zekâ özetidir; yatırım tavsiyesi değildir. Uygulamayı güncelle veya ?force=1 ile yenile.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
  }

  const hurriyet = await fetchHurriyetEkonomiTitles(18);
  const ntvEco = await fetchNtvEkonomiTitles(18);
  const nowSec = Math.floor(Date.now() / 1000);
  const cutoff = nowSec - 72 * 3600;
  const rawG = await fetchFinnhubNews(finnh, 'general');
  const rawF = await fetchFinnhubNews(finnh, 'forex');

  const trHeadlines: string[] = [];
  const seenTr = new Set<string>();
  for (const arr of [rawG, rawF]) {
    for (const n of arr) {
      if (n.datetime < cutoff) continue;
      const hay = `${n.headline}\n${n.summary ?? ''}`;
      if (!isTurkeyRelevant(hay)) continue;
      if (seenTr.has(n.headline)) continue;
      seenTr.add(n.headline);
      trHeadlines.push(n.headline);
    }
  }

  const intlHeadlines: string[] = [];
  const seenI = new Set<string>();
  const mergedFinn = [...rawG, ...rawF].sort((a, b) => b.datetime - a.datetime);
  for (const n of mergedFinn) {
    if (n.datetime < cutoff) continue;
    const hay = `${n.headline}\n${n.summary ?? ''}`;
    if (isTurkeyRelevant(hay)) continue;
    if (seenI.has(n.headline)) continue;
    seenI.add(n.headline);
    intlHeadlines.push(n.headline);
    if (intlHeadlines.length >= 28) break;
  }

  const domesticPool = dedupeHeadlines([...hurriyet, ...ntvEco, ...trHeadlines], 48);
  const kurLine = await tcmbKurLine();

  let brief: BriefJson;
  try {
    brief = await generateBriefJson(gemini, kurLine, domesticPool, intlHeadlines);
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: e instanceof Error ? e.message : 'Özet üretilemedi.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const stored = JSON.stringify(brief);
  if (supabase) {
    const { error: upErr } = await supabase.from('moono_daily_briefs').upsert(
      {
        brief_date: ymd,
        slot: DAILY_SLOT,
        moono_text: stored,
      },
      { onConflict: 'brief_date,slot' },
    );
    if (upErr) console.error('moono_daily_briefs upsert', upErr);
  }

  return new Response(
    JSON.stringify({
      ok: true,
      briefDate: ymd,
      format: 2,
      opening: brief.opening,
      domestic: brief.domestic,
      international: brief.international,
      cached: false,
      sourcesNote:
        'Yurtiçi: Hürriyet + NTV ekonomi RSS + Finnhub (Türkiye). Yurtdışı: Finnhub. RSS kullanımı kaynak sitesi koşullarına tabidir.',
      disclaimer:
        'Moono yapay zekâ özetidir; yatırım tavsiyesi değildir. Başlıkları kaynaklardan doğrula.',
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
