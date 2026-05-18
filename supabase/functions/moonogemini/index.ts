// Deno ve Supabase Edge Function için gerekli importlar
import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HARD_CONSTRAINT_MESSAGE =
  'Unutma Ortak: Ben bir eğitim asistanıyım; yatırım tavsiyesi veremem. Son kararını kendi araştırmana göre vermelisin.';

const SYSTEM_INSTRUCTIONS = `Karakterin Moono — Türkiye'deki kullanıcılar için borsa ve parayı sade Türkçe ile anlatan bir eğitim asistanısın. Uygulama markası: Moono ("Adım Adım Borsa").

KİMLİK VE ÜSLUP:
- Kullanıcıya samimi, sıcak, günlük Türkçe; "sen" zamirı ile hitap et (kullanıcıya yöneliktir, adın değil). Ara sıra "Ortak" de.
- Resmî dil yok (Sayın, bilginize, değerli yatırımcı vb.).
- Kısa paragraflar; önce net cevap, sonra örnek.
- Her yanıtta 1–2 adet, konuya uygun emoji kullan (ör. 📈 💡 😊). Abartma; her cümleye koyma.

SOHBET AKIŞI (çok önemli):
- Bu bir mesajlaşma; her soruyu sıfırdan karşılama gibi ele alma.
- Uygulama zaten "Merhaba Ortak!" karşılama mesajı gösteriyor — normal sorularda "Merhaba", "Hoş geldin", "Ben Moono'yum" YAZMA.
- Önceki tur mesajları varsa: selam ve tanıtım TEKRARLAMA; kısa köprü cümlesiyle ("Güzel soru Ortak,") doğrudan konuya gir; gerekirse önceki konuya kısaca atıf yap.
- Yalnızca kullanıcı açıkça "sen kimsin" derse 1 cümleyle tanıt.

GÖREV:
- Soruyu tam ve anlaşılır yanıtla; her cümleyi bitir — asla yarım kelime veya yarım cümleyle bırakma.
- Cevap mutlaka noktalama ile bitsin (. ! ?). Ortalama 120–220 kelime yeter; gereksiz uzatma ama asla erken kesme.
- Belirli bir hisse sorulursa: al/sat demeden, "tek bir hisseyi incelerken eğitim amaçlı bakılabilecek 3–4 kriter" (şirket ne iş yapar, sektör, borç/kârlılık, risk) anlat; sonunda kısa uyarı cümlesi ekle.
- Emin değilsen uydurma.

UYARI (gerektiğinde SONDA, aynen):
"${HARD_CONSTRAINT_MESSAGE}"
Kısa tanım sorularında (ör. "BİST 100 nedir?") bu uyarıyı ekleme.`;

const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_OUTPUT_TOKENS = 2048;

type GeminiContent = { role: string; parts: { text: string }[] };

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const userMessage = typeof body.userMessage === 'string' ? body.userMessage.trim() : '';
    const history = Array.isArray(body.history) ? sanitizeHistory(body.history) : [];
    const userTurnIndex = resolveUserTurnIndex(body.userTurnIndex, history);

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'userMessage is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const contents: GeminiContent[] = [
      ...history,
      { role: 'user', parts: [{ text: userMessage }] },
    ];

    let { text, finishReason } = await callGemini(apiKey, contents, userTurnIndex);

    if (needsContinuation(text, finishReason)) {
      const continued = await callGemini(apiKey, [
        ...contents,
        { role: 'model', parts: [{ text }] },
        {
          role: 'user',
          parts: [{
            text:
              'Yanıtın yarım kalmış. Aynı konudan kaldığın yerden devam et; yarım kalan cümleyi tamamla ve 1–2 kısa paragrafla bitir. Selam/tanıtım ekleme. Mutlaka tam cümle ve noktalama ile sonlandır.',
          }],
        },
      ], userTurnIndex);
      text = mergeContinuation(text, continued.text);
    }

    text = polishMoonoReply(text, userTurnIndex);

    return new Response(
      JSON.stringify({ response: text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    );
  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function sanitizeHistory(raw: unknown[]): GeminiContent[] {
  const out: GeminiContent[] = [];
  for (const item of raw.slice(-12)) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: string }).role === 'user' ? 'user' : 'model';
    const text = String((item as { text?: string }).text ?? '').trim().slice(0, 4000);
    if (!text) continue;
    out.push({ role, parts: [{ text }] });
  }
  return out;
}

function resolveUserTurnIndex(
  raw: unknown,
  history: GeminiContent[],
): number {
  if (typeof raw === 'number' && Number.isFinite(raw) && raw >= 0) {
    return Math.floor(raw);
  }
  return history.filter((m) => m.role === 'user').length;
}

function turnContextHint(userTurnIndex: number): string {
  if (userTurnIndex <= 0) {
    return '\n\n[TUR] İlk kullanıcı sorusu — uygulama karşıladı. Tanıtım/selam yok; doğrudan cevap + 1–2 emoji.';
  }
  return `\n\n[TUR] Sohbet devam ediyor (önceki ${userTurnIndex} kullanıcı mesajı var). Selam, hoş geldin, "Ben Moono'yum" YOK. Kısa köprü + cevap + 1–2 emoji.`;
}

async function callGemini(
  apiKey: string,
  contents: GeminiContent[],
  userTurnIndex = 0,
): Promise<{ text: string; finishReason: string }> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTIONS + turnContextHint(userTurnIndex) }],
      },
      contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    }),
  });

  const geminiData = await response.json();

  if (geminiData.error) {
    console.error('Gemini API Error:', geminiData.error);
    throw new Error('Gemini API call failed');
  }

  const candidate = geminiData.candidates?.[0];
  if (!candidate) {
    return {
      text:
        'Üzgünüm Ortak, bu soruya şu an net cevap veremedim. Biraz farklı sorar mısın?',
      finishReason: 'EMPTY',
    };
  }

  const finishReason = String(candidate.finishReason ?? '');
  const text = extractCandidateText(candidate);

  if (!text) {
    return {
      text: 'Yanıt boş geldi Ortak, bir kez daha dener misin?',
      finishReason,
    };
  }

  return { text, finishReason };
}

function extractCandidateText(candidate: { content?: { parts?: { text?: string }[] } }): string {
  const parts = candidate.content?.parts ?? [];
  return parts.map((p) => (typeof p.text === 'string' ? p.text : '')).join('').trim();
}

function needsContinuation(text: string, finishReason: string): boolean {
  if (finishReason === 'MAX_TOKENS') return true;
  return looksIncomplete(text);
}

function looksIncomplete(text: string): boolean {
  const t = text.trim();
  if (t.length < 20) return false;
  if (/[.!?…]["')\]]*\s*$/.test(t)) return false;
  if (/[\u{1F300}-\u{1FAFF}]\s*$/u.test(t)) return false;
  const tail = t.slice(-1);
  if (tail === ',' || tail === ':' || tail === ';') return true;
  const words = t.split(/\s+/);
  const last = words[words.length - 1]?.toLowerCase() ?? '';
  const dangling = new Set([
    've', 'veya', 'ama', 'fakat', 'çünkü', 'için', 'ile', 'bir', 'bu', 'şu', 'o',
    'yatırım', 'hisse', 'olarak', 'gibi', 'de', 'da', 'mi', 'mı', 'mu', 'mü',
  ]);
  if (dangling.has(last)) return true;
  return false;
}

function mergeContinuation(base: string, extra: string): string {
  const a = base.trim();
  const b = extra.trim();
  if (!b) return a;
  if (a.endsWith(b) || b.startsWith(a.slice(-40))) return a;
  const overlap = findOverlap(a, b);
  if (overlap > 0) {
    return `${a}${b.slice(overlap)}`.trim();
  }
  const joiner = /[.!?…]\s*$/.test(a) ? ' ' : ' ';
  return `${a}${joiner}${b}`.trim();
}

function findOverlap(a: string, b: string): number {
  const max = Math.min(a.length, b.length, 80);
  for (let len = max; len > 10; len--) {
    if (a.endsWith(b.slice(0, len))) return len;
  }
  return 0;
}

function polishMoonoReply(text: string, userTurnIndex: number): string {
  let t = softenFormalTone(text);
  t = stripRepeatedIntro(t, userTurnIndex);
  return t.trim();
}

function stripRepeatedIntro(text: string, userTurnIndex: number): string {
  let t = text.trim();
  const introPatterns = [
    /^(Merhaba\s+Ortak!?[,!.\s—-]*)+/gi,
    /^(Selam\s+Ortak!?[,!.\s—-]*)+/gi,
    /^(Hoş\s+geldin!?[,!.\s—-]*)+/gi,
    /^(Ben\s+Moono['’]?yum!?[,!.\s—-]*)+/gi,
    /^(Ben\s+sen\s+Moono['’]?yum!?[,!.\s—-]*)+/gi,
  ];
  let changed = true;
  while (changed) {
    changed = false;
    for (const pattern of introPatterns) {
      const next = t.replace(pattern, '').trim();
      if (next !== t) {
        t = next;
        changed = true;
      }
    }
  }
  if (userTurnIndex > 0 && t.length > 0) {
    const first = t.charAt(0);
    if (first === first.toLowerCase() && /[a-zçğıöşü]/i.test(first)) {
      t = first.toUpperCase() + t.slice(1);
    }
  }
  return t;
}

function softenFormalTone(text: string): string {
  return text
    .replace(/\bBen\s+Sen\s+Moono['’]?yum\b/gi, "Ben Moono'yum")
    .replace(/\bBen\s+sen\s+Moono\b/gi, 'Ben Moono')
    .replace(/\bUnutmayın\b/g, 'Unutma')
    .replace(/\bunutmayın\b/g, 'unutma')
    .replace(/\bSayın kullanıcı\b/gi, 'Ortak')
    .replace(/\bdeğerli yatırımcı\b/gi, 'Ortak')
    .replace(/\bBilginize\b/g, 'bilgin olsun')
    .replace(/\bhususen\b/gi, 'özellikle')
    .replace(/\bmemnuniyetle\b/gi, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
