// Deno ve Supabase Edge Function için gerekli importlar
import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';

// ----------------------------------------------------
// 1. MOONO MARKASINA ÖZEL TANIMLAMALAR (BRAND CODE)
// ----------------------------------------------------

// Kritik Kısıtlama Cümlesi (Hard Constraint) [cite: 41, 42]
const HARD_CONSTRAINT_MESSAGE =
  "Unutmayın, ben bir yapay zeka asistanıyım. Yatırım tavsiyesi verme yetkim ve bilgim yoktur. Kararlarınızı daima kendi analizlerinize göre vermelisiniz.";

// Moono'nun Kimliği (Sistem Mesajı) - Minimal Test Versiyonu
const SYSTEM_INSTRUCTIONS = `
Sen, finansal kavramları açıklayan bir yapay zeka asistanısın. Kullanıcının sorusuna doğrudan ve net bir cevap ver.
`;

// ----------------------------------------------------
// 2. ANA EDGE FUNCTION İŞLEYİCİ
// ----------------------------------------------------

serve(async (req) => {
  // Yalnızca POST isteklerini kabul et
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { userMessage } = await req.json();

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'userMessage is required' }), { status: 400 });
    }

    // Gemini API Anahtarını Supabase Ortam Değişkenlerinden Güvenli Olarak Al
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key not configured' }), { status: 500 });
    }

    // ----------------------------------------------------
    // 3. GEMINI API ÇAĞRISI VE PROMPT YAPISI
    // ----------------------------------------------------

    // Gemini-2.5-flash modelini kullanıyoruz
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        // Minimal test yapısı - sadece kullanıcı mesajı
        contents: [{
          role: 'user',
          parts: [{ 
            text: `${SYSTEM_INSTRUCTIONS} \n\n Kullanıcının Sorusu: ${userMessage}` 
          }],
        }],
      }),
    });

    const geminiData = await response.json();
    
    // Basit bir hata kontrolü
    if (geminiData.error) {
         console.error("Gemini API Error:", geminiData.error);
         return new Response(JSON.stringify({ error: 'Gemini API call failed' }), { status: 500 });
    }
    
    // Güvenlik veya boş yanıt kontrolü
    const candidates = geminiData.candidates;

    if (!candidates || candidates.length === 0) {
        // Model, güvenlik kısıtlamaları nedeniyle veya yanıt üretemediği için boş döndürdüyse
        console.error("Gemini API Error: No candidate response found or content was blocked.");
        
        // Kullanıcıya daha yumuşak bir hata mesajı gönder (Brand Code'a uygun)
        return new Response(
            JSON.stringify({ response: "Üzgünüm Ortak, bu kodu çözemedim. Lütfen soruyu başka bir şekilde sormayı dene. Güvenlik protokollerim nedeniyle bazı konulara cevap veremeyebilirim." }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 }
        );
    }
    
    // Cevabın metin kısmını alıyoruz
    const moonoResponseText = candidates[0].content?.parts?.[0]?.text;

    if (!moonoResponseText) {
        return new Response(
            JSON.stringify({ response: "Yanıt metni boş geldi. Lütfen tekrar dene." }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 }
        );
    }

    return new Response(
      JSON.stringify({ response: moonoResponseText }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
});