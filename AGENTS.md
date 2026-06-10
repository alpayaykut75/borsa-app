# borsa-app — Agent Notları

Moono: Türkçe finansal okuryazarlık uygulaması (Expo / React Native + Supabase).

## İçerik üretirken önce oku

- **Ders içeriği** üretiyorsan: `docs/lesson_content_template.md`
  - `lesson_steps` tablosu, kanonik 20 adımlık yapı, Moono tonu, usta prompt ve migration kalıbı burada.
- **Shorts (dikey video) içeriği** üretiyorsan: `docs/shorts_gemini_prompt.md`
  - `shorts` tablosu, Gemini usta prompt'u (10sn / dikey 9:16), JSON → migration kalıbı burada.

## Ton (Moono sesi)

- İzleyiciye **"ortak"** diye hitap et; sıcak, sade, cesaret verici.
- Jargon yok. **Yatırım tavsiyesi / garanti / kazanç vaadi YOK.**

## ⚠️ Ders içeriğinde KAYNAK DOĞRU = canlı Supabase DB

Ders içeriği (`lesson_steps`) zaman zaman doğrudan Supabase'de düzenlenmiştir; bu yüzden
repodaki migration dosyaları çoğu ders için ESKİDİR / canlı DB ile senkron DEĞİLDİR.
- Bir dersi incelemeden/düzeltmeden ÖNCE içeriği canlı DB'den çek (REST API anon key ile
  okunabilir, bkz. `lib/supabase.ts`). Migration dosyasını gerçek içerik sanma.
- `lesson_steps` üzerinde `delete + insert` yapan migration'ları PUSH ETME; canlıdaki
  cilalı içeriğin üzerine yazar. Düzeltme gerekiyorsa hedefli `update` ile ve önce canlı
  içeriği görerek yap.
- Örn. canlı içerik çekme:
 `curl "$SUPABASE_URL/rest/v1/lesson_steps?lesson_id=eq.55&select=order_index,type,title,metadata&order=order_index.asc" -H "apikey: $ANON" -H "Authorization: Bearer $ANON"`
- **Yedek:** canlı `lessons` + `lesson_steps` içeriği periyodik olarak `supabase/backups/` altına
 tarihli JSON olarak dump edilir (REST API ile; `lesson_steps` >1000 satır olduğundan `Range`
 header'ı ile sayfalayarak çek). Repodaki en güncel içerik kopyası budur, migration'lar değil.
 Önemli içerik düzeltmelerinden sonra yedeği tazele.

## Bilinmesi gerekenler

- DB değişiklikleri **migration** ile yapılır: `supabase/migrations/<YYYYMMDDHHMMSS>_<ad>.sql`. Migration'ları idempotent yaz. (Ama yukarıdaki uyarıya dikkat: ders içeriği için canlı DB esastır.)
- JSONB içerik için dollar-quote (`$$ ... $$`) kullan (Türkçe karakter/tırnak kaçışı derdi olmaz).
- Geçici test bayrakları `src/constants/devFlags.ts`'de:
  - `UNLOCK_ALL_FOR_TEST` — prod öncesi `false` yapılmalı.
  - `HIDE_AUDIO_STEPS_TEMPORARILY` — artık `false`; ses adımı görünürlüğü adım bazında DB'deki
   `metadata.hidden_in_app` ile yönetiliyor (sadece sesi hazır derslerde `false` yapılır,
   diğer derslerin ses adımları yer tutucu URL ile gizli durur).
- Storage bucket adı büyük "S" ile **Shorts** (harf duyarlı).
- Shorts beğen/kaydet durumu cihazda AsyncStorage ile kalıcı (`src/services/shortsStorage.ts`).
