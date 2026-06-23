# Moono (borsa-app) — Agent Devir Notu

> Yeni Cursor agent: önce `AGENTS.md` + bu dosyayı oku. Kullanıcı kodlama bilmiyor; net adımlar, gerektiğinde copy-paste terminal komutları.

---

## Proje

- **Moono** — Türkçe finansal okuryazarlık uygulaması (Expo / React Native + Supabase)
- **Repo:** https://github.com/alpayaykut75/borsa-app
- **Supabase:** `tjxzpfkewlechcpsxull.supabase.co` (anon key: `lib/supabase.ts`)
- **Ayrı proje:** Leon okuyucu app → `~/Desktop/leon-app` (Moono ile karıştırma)

---

## Kritik kurallar (AGENTS.md)

- **Ders içeriği KAYNAK = canlı Supabase DB** — migration dosyaları ESKİ olabilir
- Ders düzeltmesi = hedefli `update lesson_steps ...` SQL (kullanıcı Supabase'de çalıştırır); `delete+insert` migration PUSH ETME
- Yedek: `supabase/backups/lesson_steps_YYYYMMDD.json` (önemli DB değişikliklerinden sonra tazele)
- Ton: hitap **"ortak"**; yatırım tavsiyesi yok; trader'ı yerme yok (kumar/plansızlık eleştirilir)
- `UNLOCK_ALL_FOR_TEST = true` → prod öncesi `false` yapılmalı (`src/constants/devFlags.ts`)

---

## Aktif iş: Ders içeriği incelemesi (Ünite 1, ilk 10 ders)

Detay: `docs/lesson_review_progress.md`

| App Ders | lesson_id | Durum |
|---|---|---|
| D1 Borsa Nedir? | 27 | ✅ şık + ton düzeltildi |
| D2 Hisse Senedi Nedir? | 28 | ✅ şık düzeltildi |
| D3 Yatırımcı mı, Oyuncu mu? | 29 | **SIRADA** — ton merceği + şık (9b/1a!) |
| D4–D10 | 30,31,53–57 | bekliyor |

---

## Son oturumda yapılan kod değişiklikleri (TestFlight build 21)

### 1. Final test sonuç ekranı — `screens/LessonScreen.tsx`
- Yeni hero (skor halkası), istatistik kartları, yanlış cevap kartları
- "Bölümü Bitir" → anında "Bitiriliyor..." + paralel Supabase kayıtları

### 2. Ders 1 sesli özet + altyazı — `screens/LessonScreen.tsx`
- `HIDE_AUDIO_STEPS_TEMPORARILY = false`
- `LESSONS_WITH_AUDIO_READY: [27]` — Ders 1 ses adımı görünür (DB'de `hidden_in_app` hâlâ true olabilir)
- Standart giriş: `AUDIO_STEP_HEADLINE` / `AUDIO_STEP_SUBLINE` (`src/constants/lessonAudioTranscripts.ts`)
- Oynatınca kelime kelime altyazı (son ~28 kelime penceresi, `overflow: hidden` clip)
- Transkript geçici olarak repoda: `LESSON_AUDIO_TRANSCRIPTS[27]` — kalıcı hedef: Supabase `metadata.transcript`

### 3. TestFlight
- Son commit: `58ffad0` Bump iOS build to 20
- EAS build **21** başlatıldı: https://expo.dev/accounts/alpayaykut/projects/borsa-app/builds/9010d278-a694-41c8-b0e5-c54f40bb2de7
- `--auto-submit` başarısız: `eas.json`'da `ascAppId` yok
- Build bitince: `npx eas-cli submit --platform ios --latest` (etkileşimli)

---

## Kullanıcının istediği 2 revizyon (henüz yapılmadı)

### A) Shorts — tab değişince ses devam ediyor 🐛

**Sorun:** Shorts sekmesinde video oynarken başka bottom tab'a (Ana Sayfa, Moono, Profil) geçilince ses/video durmuyor.

**Dosya:** `screens/ShortsScreen.tsx`
- `Video` bileşeni `shouldPlay={isActive}` kullanıyor (FlatList içinde aktif kart)
- **Eksik:** Tab/ekran focus kaybında pause/unload — muhtemelen `useFocusEffect` (@react-navigation/native) veya parent tab blur listener
- `App.tsx` → `MainTabs` içinde `Shorts` tab'ı

**Beklenen:** Shorts tab'ından çıkınca video durur/sessiz olur; geri dönünce devam edebilir.

### B) Ders 1 sesli anlatım — altyazı küçük revizyon

**Dosyalar:**
- `screens/LessonScreen.tsx` → `renderAudioStep`, `audioCaptionData` useMemo
- `src/constants/lessonAudioTranscripts.ts` → transkript + `AUDIO_CAPTION_WINDOW_WORDS`

**Mevcut davranış:**
- Üstte standart "Hadi bu dersin özetini dinleyelim."
- OYNAT'a basınca altyazı kutusu belirir (önceden gizli)
- Kelimeler ses süresine orantılı beliriyor (tam senkron değil)
- Kullanıcı detaylı revizyonu yeni oturumda anlatacak

---

## Faydalı dosyalar

| Dosya | Ne |
|---|---|
| `AGENTS.md` | Agent kuralları |
| `docs/lesson_review_progress.md` | Ders inceleme ilerlemesi |
| `docs/lesson_content_template.md` | Ders içerik şablonu |
| `docs/shorts_gemini_prompt.md` | Shorts içerik üretimi |
| `supabase/backups/` | Canlı DB dump (10 Haz 2026) |
| `screens/ShortsScreen.tsx` | Shorts feed |
| `screens/LessonScreen.tsx` | Ders + quiz + ses + final |

---

## Kullanıcı tercihleri

- Türkçe iletişim, sıcak ton
- Seans sonu `git commit` + `git push` (istendiğinde)
- Ders SQL'lerini kullanıcı Supabase'de çalıştırır
- TestFlight doğrulaması kullanıcıda

---

## Yeni agent'a ilk mesaj (kopyala-yapıştır)

```
AGENTS.md ve docs/MOONO_AGENT_HANDOFF.md dosyalarını oku.

Öncelik 1: Shorts ekranında başka tab'a geçince video sesi durmuyor — düzelt.
Öncelik 2: Ders 1 (lesson 27) sesli anlatım altyazısında küçük revizyon (detayı sor).

Sonra Ders 3 (lesson 29) içerik incelemesine devam edeceğiz (docs/lesson_review_progress.md).
Canlı DB = kaynak; migration dosyalarına güvenme.
```
