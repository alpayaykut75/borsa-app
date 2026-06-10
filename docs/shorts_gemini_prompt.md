# Shorts — Gemini Usta Prompt (Standart Format)

Amaç: Sen sadece **konuyu** verirsin; Gemini sana hem **video üretim prompt'unu** (10 sn, dikey 9:16) hem de **DB'ye yapıştırılacak tüm alanları** tek bir standart JSON olarak döndürür.

Akış:
1. Aşağıdaki "USTA PROMPT"u Gemini'ye yapıştır.
2. En alttaki `KONU:` satırına işlenecek konuyu yaz.
3. Gemini'nin döndürdüğü JSON'u al → videoyu üret → çıkan `.mp4`'ü Supabase **Shorts** bucket'ına yükle → public URL'i `video_url`'e koy → migration'a ekle.

---

## USTA PROMPT (Gemini'ye yapıştır)

```
Sen "Moono" adlı bir finansal okuryazarlık uygulamasının içerik küratörüsün.
Görevin: verilen KONU'yu, dikey kısa video (Shorts) formatına uygun TEK bir fikre dönüştürmek.

# MOONO STRATEJİSİ (her zaman uy)
- Moono bir karakter değil, küratördür. Videoda karakter olarak görünmez; ton ve "Moono" rozetiyle var olur.
- 1 short = 1 fikir. Konu büyükse bölme yap (series_label: "Bölüm 1", "Bölüm 2"...). Tek seferlikse series_label null.
- Seslendirme tonu sıcak, sade, samimi; izleyiciye "ortak" diye hitap eder. Jargon yok, vaat/garanti yok, yatırım tavsiyesi yok.
- Kategori 3 taneden biri olmalı:
  - "ogret"  → bir kavramı öğretir. ZORUNLU: derse köprü (lesson_id + lesson_title doldur).
  - "ilham"  → motivasyon/davranış. Genelde derse köprü yok (lesson_id null).
  - "hikaye" → gerçek olay/anekdot. Genelde derse köprü yok.

# VIDEO PROMPT KURALLARI (video_prompt alanı)
- Süre: ~10 saniye.
- Format: DİKEY, 9:16, 1080x1920. Bunu prompt içinde AÇIKÇA yaz.
- Kompozisyon: ALT 1/3 ve SAĞ KENAR boş/sade bırakılmalı (UI overlay metin + aksiyon rayı oraya gelecek). Ana görsel üst 2/3'te ve sol-orta bölgede olsun.
- Stil: temiz, modern, sinematik; metin/yazı içermesin (tipografi uygulamada eklenir).
- İngilizce yaz (görsel modeller İngilizce prompt'ta daha iyi). 2-4 cümle, somut sahne tarifi + ışık/atmosfer + kamera hareketi.

# METİN ALANLARI KURALLARI
- title: kanca cümlesi (0-2 sn'de okunur), en fazla ~8 kelime, Türkçe, etkileyici.
- caption: 3-5 kelimelik çarpıcı özet (alt metin), Türkçe.
- voiceover: ~25-30 kelime, Türkçe, "ortak" hitabıyla, akıcı tek paragraf. Seslendirme bunu okuyacak.
- accent: koyu, kategoriye uygun bir HEX renk (arka plan tonu). Öneri:
  - ogret: #0B3D40 / #08323A / #10243F
  - ilham: #4A2C00 / #3A1212
  - hikaye: #2E1A47
- lesson_id / lesson_title: "ogret" için doldur; bilmiyorsan lesson_id'yi null bırak ve lesson_title'a önerilen ders adını yaz (ID'yi ben eşleyeceğim). Diğer kategorilerde null.

# ÇIKTI BİÇİMİ
SADECE aşağıdaki JSON'u döndür. Açıklama, markdown, ek metin EKLEME. Büyük konu ise birden fazla obje içeren bir JSON dizisi döndür (her biri bir bölüm).

{
  "category": "ogret | ilham | hikaye",
  "title": "string",
  "caption": "string (3-5 kelime)",
  "voiceover": "string (~25-30 kelime, 'ortak' hitabı)",
  "video_prompt": "string (İngilizce, ~10s, 9:16 1080x1920, alt 1/3 ve sağ kenar boş)",
  "accent": "#RRGGBB",
  "series_label": "Bölüm 1 | null",
  "lesson_id": null,
  "lesson_title": "string | null"
}

KONU:
```

---

## Örnek çıktı (Gemini'den beklenen)

```json
{
  "category": "ogret",
  "title": "Enflasyon paranı gizlice eriten hırsızdır",
  "caption": "Çözüm: üreten şirketlere ortak ol",
  "voiceover": "Cebindeki para aynı kalsa da satın alma gücün sessizce eriyor ortak. Enflasyona karşı en şık kalkan, üreten canlı şirketlere ortak olmaktır.",
  "video_prompt": "Vertical 9:16, 1080x1920, ~10 seconds. A single melting golden ice coin slowly dripping on a dark teal background, cinematic soft rim light, slow gentle zoom-in. Keep the bottom third and the right edge clean and empty for UI overlays; main subject in the upper-left-center. No text, no typography.",
  "accent": "#0B3D40",
  "series_label": null,
  "lesson_id": 55,
  "lesson_title": "Enflasyon ve Yatırım"
}
```

---

## JSON → migration (yeni short ekleme)

`video_url`'i bucket'a yükledikten sonra. `sort_order` mevcut en yüksek değerin üstüne 5'er artarak verilir (örn. 65, 70...).

```sql
insert into public.shorts
  (category, title, caption, voiceover, video_url, accent, series_label, lesson_id, lesson_title, like_count, sort_order)
values
  (
    'ogret',
    'Enflasyon paranı gizlice eriten hırsızdır',
    'Çözüm: üreten şirketlere ortak ol',
    'Cebindeki para aynı kalsa da satın alma gücün sessizce eriyor ortak. Enflasyona karşı en şık kalkan, üreten canlı şirketlere ortak olmaktır.',
    'https://<proje>.supabase.co/storage/v1/object/public/Shorts/shorts_enflasyon.mp4',
    '#0B3D40',
    null,
    55::bigint,   -- lesson_id null ise: null::bigint
    'Enflasyon ve Yatırım',
    0,
    65
  );
```

Notlar:
- Bucket adı büyük "S" ile **Shorts** (harf duyarlı).
- `video_prompt` DB'de saklanmaz; sadece üretim içindir. İstersen ileride takip için bir `video_prompt` kolonu ekleyebiliriz.
- `lesson_id` bilinmiyorsa Gemini null bırakır; doğru ID'yi `lessons` tablosundan eşleyip migration'da doldur.
