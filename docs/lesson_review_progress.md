# Ders İnceleme — İlerleme / Devir Notu

> Amaç: Ünite 1'in ilk 10 dersini tek tek gözden geçirip içerik + şık kalitesini iyileştirmek.
> KAYNAK DOĞRU = canlı Supabase DB (migration dosyaları ESKİ; bkz. AGENTS.md uyarısı).
> Yedek: canlı içeriğin tam dump'ı `supabase/backups/` altında (son: 10 Haz 2026, Ders 1–2 düzeltmeleri dahil). Önemli düzeltmelerden sonra tazele.

## Çalışma yöntemi (her ders için)
1. Canlı içeriği çek (REST API, anon key — `lib/supabase.ts`):
   `curl "$URL/rest/v1/lesson_steps?lesson_id=eq.<ID>&select=order_index,type,title,metadata&order=order_index.asc" -H "apikey: $ANON" -H "Authorization: Bearer $ANON"`
2. İncele: okuma metinleri (Moono tonu), flashcard'lar, ara quizler (5,6,11,12,17,18) ve final (20).
3. **Şık dağılımı kontrolü (anti-bias):** doğru cevap a/b/c'ye ~eşit dağılmalı; "c" hiç doğru olmama tuzağına dikkat; üst üste 3 aynı şık olmamalı. Dağılım hedefi: ara quiz 2/2/2, final 4/3/3.
4. **Ton merceği:** "trader/aktif işlem = kötü, yatırımcı = iyi" mesajı VERME. Bunlar farklı yaklaşımlar; biri daha çok bilgi/günlük takip ister ama kötü değildir. Kumar/plansızlık eleştirilir, aktif trading değil.
5. Düzeltme = içerik/doğru cevabı koruyarak sadece şık SIRASINI dengele + gerekirse ifade rötuşu. Çıktı: kullanıcının Supabase SQL editöründe çalıştıracağı hedefli `update lesson_steps ... where lesson_id=X and order_index=Y`. (Anon yazamaz; kullanıcı çalıştırır. `delete+insert` migration KULLANMA — canlı içeriği ezer.)
6. Kullanıcı Supabase'de uygular → TestFlight'tan kontrol eder → sonraki derse geçilir.

## Ünite 1 ders eşlemesi (app "Ders N" → lesson_id)
D1=27, D2=28, D3=29, D4=30, D5=31, D6=53, D7=54, D8=55, D9=56, D10=57.

## İlerleme durumu
- **Ders 1 (lesson 27 "Borsa Nedir?")**: İçerik güçlü. Sorun: "c" hiç doğru değildi + b-eğilimli (ara a2/b4, final 6b/4a).
  - DÜZELTME: order_index 6,12,17 şık sırası dengelendi; final (20) yeniden dengelendi (anahtar `a,c,b,a,c,b,c,a,b,a` = 4/3/3); Final Q9 a şıkkı trader'ı yermeyecek şekilde reword'lendi.
  - DURUM: SQL canlı DB'ye uygulandı (10 Haz canlıdan doğrulandı). ✅
- **Ders 2 (lesson 28 "Hisse Senedi Nedir?")**: İçerik güçlü, ton sorunu yok. Sorun: "c" hiç doğru değildi; ara quizler b-eğilimli (a1/b5), final 5a/5b.
  - DÜZELTME: ara quiz 11→c, 12→a, 18→c (artık a,b,c,a,b,c = 2/2/2); final (20) yeniden dengelendi (anahtar `b,a,c,a,b,c,b,a,c,a` = 4/3/3, ardışık 3 tekrar yok). İçerik/doğru cevap korundu, sadece şık sırası değişti.
  - DURUM: SQL canlı DB'ye uygulandı (10 Haz canlıdan doğrulandı). ✅
- **Ders 3–10 (29,30,31,53,54,55,56,57)**: SIRADA. Aynı yöntem.
  - Not: Ders 3 (lesson 29 "Yatırımcı mı, Oyuncu mu?") trader/oyuncu ayrımında ton merceğine ÖZEL dikkat.
  - Bilinen dağılım durumu (canlı): 29 (9b/1a!), 30 (6b/4a), 31 (7b/3a, 4 ardışık), 53 (6a/4b), 54 dengeli, 55 dengeli, 56 (5a/5b), 57 (3 ardışık). Çoğunda "c" hiç doğru değil → dağıt.

## Daha sonra (Ünite 1 bitince)
- **Geniş "hep a" sorunu:** lesson 6–25 ve 33–52 final testlerinde 6 sorunun 6'sı da "a"; checkpoint sınavları 70–79'da 20/20 "a" (71 hariç). Toplu dengeleme gerekir.
- **Boşluksuz virgül taraması:** tüm derslerin başlık/metinlerinde ",X" kalıbını tara, düzelt.
- **Sonuç ekranı (Bölüm Sonu Testi skor/yanlışlar) UI'si:** kullanıcı tasarımı beğenmiyor; ayrı, odaklı bir UI turu olarak ele al.
