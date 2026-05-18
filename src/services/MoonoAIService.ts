// --- src/services/MoonoAIService.ts ---

// Supabase URL ve Anon Key'i ortam değişkenlerinden aldığınızı varsayıyoruz
// (Eğer farklı bir yöntem kullanıyorsanız, burayı kendi yapılandırmanıza göre düzenlemelisiniz)
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env'; 

// ÖRNEK DEĞERLERİ KENDİ PROJE DEĞERLERİNİZLE DEĞİŞTİRİN
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../lib/supabase';

const MOONO_GEMINI_URL = `${SUPABASE_URL}/functions/v1/moonogemini`;

export type MoonoChatTurn = {
  role: 'user' | 'moono';
  text: string;
};

/**
 * Kullanıcının sorusunu Moono-Gemini Edge Function'a gönderir.
 * @param userMessage Kullanıcının sorduğu soru
 * @param history Son mesajlar (bağlam + yarım cevap tamamlama için)
 */
export async function getMoonoResponse(
  userMessage: string,
  history: MoonoChatTurn[] = [],
  userTurnIndex = 0,
): Promise<string> {
    // Kontrol: Eğer kullanıcı mesajı boşsa API çağrısı yapma
    if (!userMessage || userMessage.trim().length === 0) {
        return "Önce bir soru yaz Ortak, birlikte bakalım.";
    }

    try {
        const response = await fetch(MOONO_GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Supabase Edge Function'lar için kimlik doğrulama
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 
            },
            body: JSON.stringify({
                userMessage,
                userTurnIndex,
                history: history
                  .filter((m) => m.text?.trim())
                  .slice(-12)
                  .map((m) => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    text: m.text.trim(),
                  })),
            }),
        });

        if (!response.ok) {
            // Sunucu tarafında (Edge Function'da) bir hata oluştuysa
            const errorData = await response.json();
            console.error("Moono Edge Function Error:", errorData);
            return "Üzgünüm Ortak, sistemde bir aksaklık oldu. Biraz sonra tekrar dener misin?";
        }

        const data = await response.json();
        
        // Edge Function'dan gelen temiz cevabı döndür
        return data.response; 
        
    } catch (error) {
        console.error("Fetch or Network Error:", error);
        return "Bağlantı hatası: İnternet bağlantını kontrol et, Ortak.";
    }
}


