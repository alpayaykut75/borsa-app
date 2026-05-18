/**
 * Türkiye ağırlıklı göstergeler (TCMB gün sonu kur + Finnhub; BİST/altın için Yahoo Finance yedeği)
 * ve güncel finans haberleri (Finnhub, TR anahtar kelime süzmesi).
 *
 * Secrets (Supabase Dashboard → Edge Functions → market-turkey):
 * - FINNHUB_API_KEY (zorunlu, ücretsiz: https://finnhub.io )
 */

import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

type QuoteCard = {
  id: string;
  label: string;
  value: string;
  changeText: string | null;
  up: boolean | null;
  footnote?: string;
};

type NewsItem = {
  headline: string;
  source: string;
  datetime: number;
  url: string;
  summary?: string;
};

async function tcmbUsdEur(xml: string): Promise<{ tarih: string; usd: string; eur: string; usdNum: number; eurNum: number } | null> {
  const tarihM = xml.match(/Tarih_Date[^>]*Tarih="([^"]+)"/);
  const tarih = tarihM?.[1] ?? '';

  function rateFor(code: string): string | null {
    const re = new RegExp(
      `<Currency[^>]*Kod="${code}"[\\s\\S]*?<BanknoteSelling>([^<]+)</BanknoteSelling>`,
      'i',
    );
    const m = xml.match(re);
    const raw = m?.[1]?.trim();
    if (!raw) return null;
    return raw.replace('.', ',');
  }
  const usd = rateFor('USD');
  const eur = rateFor('EUR');
  if (!usd || !eur) return null;
  const usdNum = parseFloat(usd.replace(',', '.'));
  const eurNum = parseFloat(eur.replace(',', '.'));
  if (!Number.isFinite(usdNum) || !Number.isFinite(eurNum)) return null;
  return { tarih, usd, eur, usdNum, eurNum };
}

type FinnhubQuoteNum = { c: number; d: number; dp: number };

async function fetchFinnhubQuote(symbol: string, token: string): Promise<FinnhubQuoteNum | null> {
  const u = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`;
  const res = await fetch(u);
  if (!res.ok) return null;
  const j = await res.json();
  const cRaw = typeof j.c === 'number' ? j.c : 0;
  const pc = typeof j.pc === 'number' ? j.pc : 0;
  const d = typeof j.d === 'number' ? j.d : 0;
  const dp = typeof j.dp === 'number' ? j.dp : 0;
  const c = cRaw > 0 ? cRaw : pc > 0 ? pc : 0;
  if (c <= 0 || !Number.isFinite(c)) return null;
  return { c, d, dp };
}

/** Kotasyon 0 döndüğünde (kapalı seans / sembol) günlük mumdan son kapanış. */
async function fetchFinnhubDailyLastClose(
  symbol: string,
  token: string,
): Promise<{ close: number; prevClose: number | null; dp: number | null } | null> {
  const now = Math.floor(Date.now() / 1000);
  const from = now - 20 * 24 * 3600;
  const u =
    `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=D&from=${from}&to=${now}&token=${token}`;
  const res = await fetch(u);
  if (!res.ok) return null;
  const j = await res.json();
  if (j.s !== 'ok' || !Array.isArray(j.c) || j.c.length === 0) return null;
  const closes = j.c as number[];
  const last = closes[closes.length - 1];
  const prev = closes.length >= 2 ? closes[closes.length - 2] : null;
  if (typeof last !== 'number' || !Number.isFinite(last) || last <= 0) return null;
  let dp: number | null = null;
  if (prev != null && prev > 0) {
    dp = ((last - prev) / prev) * 100;
  }
  return { close: last, prevClose: prev, dp };
}

async function fetchFinnhubPriceWithFallbacks(
  symbols: string[],
  token: string,
): Promise<{ c: number; d: number; dp: number; usedSymbol: string } | null> {
  for (const sym of symbols) {
    const q = await fetchFinnhubQuote(sym, token);
    if (q) return { ...q, usedSymbol: sym };
    const candle = await fetchFinnhubDailyLastClose(sym, token);
    if (candle && typeof candle.dp === 'number') {
      return { c: candle.close, d: 0, dp: candle.dp, usedSymbol: sym };
    }
    if (candle) {
      return { c: candle.close, d: 0, dp: 0, usedSymbol: sym };
    }
  }
  return null;
}

/** Finnhub ücretsiz planda TR endeks / OANDA kotasyonu bazen boş; Yahoo şema API yedeği (anahtarsız). */
async function fetchYahooRegular(symbol: string): Promise<{ c: number; dp: number } | null> {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MoonoBorsaApp/1.1; +https://supabase.com)',
      Accept: 'application/json',
    },
  });
  if (!res.ok) return null;
  const j = await res.json() as {
    chart?: { result?: Array<{ meta?: Record<string, number> }> };
  };
  const meta = j.chart?.result?.[0]?.meta;
  if (!meta) return null;
  const price = meta.regularMarketPrice ?? meta.previousClose ?? 0;
  if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) return null;
  const prev =
    typeof meta.chartPreviousClose === 'number'
      ? meta.chartPreviousClose
      : typeof meta.previousClose === 'number'
      ? meta.previousClose
      : 0;
  let dp = 0;
  if (prev > 0) dp = ((price - prev) / prev) * 100;
  return { c: price, dp };
}

function formatTRY(n: number): string {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: n >= 100 ? 2 : 4,
    maximumFractionDigits: 4,
  });
}

async function fetchFinnhubNews(token: string, category: 'general' | 'forex'): Promise<NewsItem[]> {
  const res = await fetch(`https://finnhub.io/api/v1/news?category=${category}&token=${token}`);
  if (!res.ok) return [];
  const rows = await res.json();
  if (!Array.isArray(rows)) return [];
  return rows
    .map((r: any) => ({
      headline: String(r.headline ?? '').trim(),
      source: String(r.source ?? ''),
      datetime: typeof r.datetime === 'number' ? r.datetime : 0,
      url: String(r.url ?? ''),
      summary: typeof r.summary === 'string' ? r.summary : '',
    }))
    .filter((n) => n.headline.length > 0 && n.url.length > 0);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  const finnh = Deno.env.get('FINNHUB_API_KEY')?.trim();
  if (!finnh) {
    return new Response(JSON.stringify({
      ok: false,
      error:
        'FINNHUB_API_KEY tanımlı değil. Supabase Secrets içine Finnhub ücretsiz anahtarını ekleyin.',
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const tcmbQuotes: QuoteCard[] = [];
  const disclaimers = [
    'Değerlere dayalı olarak yatırım tavsiyesi verilmiyor. Veriler gecikebilir; kaynaklara bağlı olarak hatalı olabilir.',
  ];

  /** TCMB (gram altın için USD/TRY); USD/EUR kotasyonu Yahoo; BİST Finnhub+Yahoo */
  try {
    const xc = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
    const xml = await xc.text();
    const tc = await tcmbUsdEur(xml);
    if (tc) {
      const fmtPct = (dp: number) =>
        `${dp >= 0 ? '+' : ''}${dp.toLocaleString('tr-TR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}% (gün)`;

      const [usdY, eurY] = await Promise.all([
        fetchYahooRegular('USDTRY=X'),
        fetchYahooRegular('EURTRY=X'),
      ]);

      if (usdY) {
        tcmbQuotes.push({
          id: 'usdtry',
          label: 'USD/TRY',
          value: formatTRY(usdY.c),
          changeText: fmtPct(usdY.dp),
          up: usdY.dp >= 0,
          footnote:
            'Kaynak Yahoo Finance (USD/TRY; serbest piyasa kotasyonu, TCMB banknot kurundan farklı olabilir).',
        });
      } else {
        tcmbQuotes.push({
          id: 'usdtry',
          label: 'USD/TRY',
          value: tc.usd.replace(',', '.'),
          changeText: tc.tarih ? `TCMB ${tc.tarih}` : null,
          up: null,
          footnote: 'Merkez Bankası günlük kapanış (banknot satış).',
        });
      }

      if (eurY) {
        tcmbQuotes.push({
          id: 'eurtry',
          label: 'EUR/TRY',
          value: formatTRY(eurY.c),
          changeText: fmtPct(eurY.dp),
          up: eurY.dp >= 0,
          footnote:
            'Kaynak Yahoo Finance (EUR/TRY; serbest piyasa kotasyonu, TCMB banknot kurundan farklı olabilir).',
        });
      } else {
        tcmbQuotes.push({
          id: 'eurtry',
          label: 'EUR/TRY',
          value: tc.eur.replace(',', '.'),
          changeText: tc.tarih ? `TCMB ${tc.tarih}` : null,
          up: null,
          footnote: 'Kaynak TCMB.',
        });
      }

      let xau = await fetchFinnhubPriceWithFallbacks(
        ['OANDA:XAU_USD', 'FOREXCOM:XAUUSD', 'CME_MINI:GC1!', 'GC=F'],
        finnh,
      );
      if (!xau && tc.usdNum > 0) {
        const y = await fetchYahooRegular('GC=F');
        if (y) xau = { ...y, usedSymbol: 'Yahoo:GC=F' };
      }
      if (xau && tc.usdNum > 0) {
        const tryPerGram = (xau.c * tc.usdNum) / 31.1034768;
        const dp = typeof xau.dp === 'number' ? xau.dp : 0;
        tcmbQuotes.push({
          id: 'gramaltin',
          label: 'Gram altın',
          value: formatTRY(tryPerGram),
          changeText: `Ons ≈ ${xau.c.toFixed(0)} USD · ${dp >= 0 ? '+' : ''}${dp.toFixed(2)}%`,
          up: dp >= 0,
          footnote:
            'Yaklaşık: ons altın (USD) × TCMB USD/TRY ÷ 31,1035 g/ons. Kuyumcu fiyatı değildir; gecikmeli olabilir.',
        });
      }
    }
  } catch {
    disclaimers.push('TCMB / altın verisi şu an alınamadı.');
  }

  const indexSymbols: { id: string; label: string; symbol: string }[] = [
    { id: 'bist100', label: 'BİST 100', symbol: 'XU100.IS' },
  ];

  const indexCards: QuoteCard[] = [];

  await Promise.all(
    indexSymbols.map(async ({ id, label, symbol }) => {
      const trySymbols = [...new Set([symbol, 'XU100.IS', '^XU100'])];
      let q = await fetchFinnhubPriceWithFallbacks(trySymbols, finnh);
      let sourceNote = 'Kaynak Finnhub (BİST 100; gecikmeli olabilir).';
      if (!q) {
        const y = await fetchYahooRegular('XU100.IS');
        if (y) {
          q = { ...y, usedSymbol: 'Yahoo:XU100.IS' };
          sourceNote = 'Kaynak Yahoo Finance (BİST 100; gecikmeli olabilir).';
        }
      }
      if (!q) return;
      const dp = typeof q.dp === 'number' ? q.dp : 0;
      const changeText =
        `${dp >= 0 ? '+' : ''}${dp.toLocaleString('tr-TR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}% (gün)`;
      indexCards.push({
        id,
        label,
        value: formatTRY(q.c),
        changeText,
        up: dp >= 0,
        footnote: sourceNote,
      });
    }),
  );

  indexCards.sort((a, b) => {
    const order = ['bist100'];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  /** Sıra: BİST 100, USD, EUR, gram altın */
  const quotes: QuoteCard[] = [...indexCards, ...tcmbQuotes];
  const quoteOrder = ['bist100', 'usdtry', 'eurtry', 'gramaltin'];
  quotes.sort((a, b) => quoteOrder.indexOf(a.id) - quoteOrder.indexOf(b.id));

  /** Haberler */
  const rawGeneral = await fetchFinnhubNews(finnh, 'general');
  const rawForex = await fetchFinnhubNews(finnh, 'forex');
  const merged: NewsItem[] = [];
  const seen = new Set<string>();
  const nowSec = Math.floor(Date.now() / 1000);
  const cutoff = nowSec - 72 * 3600;

  for (const arr of [rawGeneral, rawForex]) {
    for (const n of arr) {
      if (n.datetime < cutoff) continue;
      const hay = `${n.headline}\n${n.summary ?? ''}`;
      if (!isTurkeyRelevant(hay)) continue;
      const key = `${n.headline}:${n.datetime}`;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(n);
    }
  }
  merged.sort((a, b) => b.datetime - a.datetime);
  /** Son 48 saatte TR yeterli çıkmazsa: genel+kur listesinden en güncelleri ara */
  let newsItems = merged.slice(0, 18);
  if (newsItems.length < 8) {
    const wider = [...rawGeneral, ...rawForex]
      .filter((n) => n.datetime >= cutoff && !/\b(ai|gaming|climate)\s+stock\b/i.test(n.headline))
      .sort((a, b) => b.datetime - a.datetime);

    newsItems = [];
    const wseen = new Set<string>();
    for (const n of wider) {
      const k = `${n.headline}:${n.datetime}`;
      if (wseen.has(k)) continue;
      wseen.add(k);
      newsItems.push(n);
      if (newsItems.length >= 18) break;
    }
    disclaimers.push(
      'Türkiye anahtar kelime süzmesiyla az sonuç kaldığı için daha geniş finans başlıkları gösterildi.',
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      fetchedAt: new Date().toISOString(),
      quotes,
      aiHighlights: [],
      aiHighlightsNote: 'Günlük Moono özeti için Piyasa sekmesindeki Moono kartına bak.',
      news: newsItems,
      disclaimers,
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
