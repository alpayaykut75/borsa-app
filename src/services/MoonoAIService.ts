// --- src/services/MoonoAIService.ts ---

// Supabase URL ve Anon Key'i ortam değişkenlerinden aldığınızı varsayıyoruz
// (Eğer farklı bir yöntem kullanıyorsanız, burayı kendi yapılandırmanıza göre düzenlemelisiniz)
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env'; 

// ÖRNEK DEĞERLERİ KENDİ PROJE DEĞERLERİNİZLE DEĞİŞTİRİN
const SUPABASE_URL = "https://tjxzpfkewlechcpsxull.supabase.co"; 
// Anon Key'i Supabase Dashboard > Settings > API bölümünden alın.
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeHpwZmtld2xlY2hjcHN4dWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzAwNTQsImV4cCI6MjA3OTcwNjA1NH0.tq7gBxCFdfY4F9SJgp9LXXx75pX59oFq1ug_UKztjTY"; 

const MOONO_GEMINI_URL = `${SUPABASE_URL}/functions/v1/moonogemini`;

/**
 * Kullanıcının sorusunu Moono-Gemini Edge Function'a gönderir.
 * @param userMessage Kullanıcının sorduğu soru
 * @returns Moono'nun metin cevabı (string)
 */
export async function getMoonoResponse(userMessage: string): Promise<string> {
    // Kontrol: Eğer kullanıcı mesajı boşsa API çağrısı yapma
    if (!userMessage || userMessage.trim().length === 0) {
        return "Lütfen Moono'ya bir soru sorarak kodları çözmeye başla.";
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
                userMessage: userMessage,
            }),
        });

        if (!response.ok) {
            // Sunucu tarafında (Edge Function'da) bir hata oluştuysa
            const errorData = await response.json();
            console.error("Moono Edge Function Error:", errorData);
            return "Üzgünüm, sistemde bir kod hatası oluştu. Lütfen daha sonra tekrar deneyin.";
        }

        const data = await response.json();
        
        // Edge Function'dan gelen temiz cevabı döndür
        return data.response; 
        
    } catch (error) {
        console.error("Fetch or Network Error:", error);
        return "Bağlantı hatası: İnternet bağlantını kontrol et, Ortak.";
    }
}


