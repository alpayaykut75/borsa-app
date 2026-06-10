# Ders İçeriği — Usta Şablon (lesson_steps)

Amaç: Bir dersi (lesson) **standart 20 adımlık** yapıda, doğrudan migration'a girebilecek JSON olarak üretmek. Hangi model kullanılırsa kullanılsın (Opus / GPT / Sonnet / Gemini) çıktı aynı kalıba düşer.

> Bu dosya, gelecekteki agent oturumları için kalıcı referanstır. Yeni bir agent ders içeriği üretirken önce bunu okumalı.

---

## 1. Şema (DB gerçeği)

Tablo: `public.lesson_steps`

| kolon | açıklama |
|---|---|
| `lesson_id` | bigint — hangi derse ait (örn. 27 = "Borsa Nedir?") |
| `type` | `read` / `flashcard` / `quiz` / `audio` / `final_quiz` |
| `title` | adım başlığı (kolon; metada DEĞİL) |
| `content` | her zaman `null` (içerik `metadata`'da) |
| `order_index` | 1..20 sıralama |
| `metadata` | jsonb — adım tipine göre değişir (aşağıda) |

### Adım tiplerine göre `metadata`

- **read**
```json
{ "text": "1. paragraf\n\n2. paragraf\n\n3. paragraf" }
```
- **flashcard**
```json
{ "front_text": "Terim", "back_text": "Kısa, net tanım." }
```
- **quiz** (3 veya 4 şık)
```json
{
  "question": "Soru?",
  "options": [
    { "id": "a", "text": "..." },
    { "id": "b", "text": "..." },
    { "id": "c", "text": "..." }
  ],
  "correct_option_id": "b"
}
```
- **audio** (Moono sesli özet — şu an uygulamada gizli, bkz. `HIDE_AUDIO_STEPS_TEMPORARILY`)
```json
{ "text": "Kısa giriş cümlesi.", "audio_url": "https://.../lesson-audio/Moono_DersX.mp3" }
```
- **final_quiz** (10 soru)
```json
{
  "pass_threshold": 7,
  "questions": [
    { "id": "q1", "question": "...", "options": [ {"id":"a","text":"..."}, ... ], "correct_option_id": "a" }
  ]
}
```

---

## 2. Kanonik 20 adım dizilimi (DEĞİŞTİRME)

```
BLOK 1
  1  read       (giriş + ana fikir)
  2  read
  3  read
  4  flashcard   (Kelime Kartı 1)
  5  quiz        (Alıştırma 1 — 3 şık)
  6  quiz        (Cümle Tamamlama 1 — 4 şık, "Cümleyi tamamla: ...")
BLOK 2
  7  read
  8  read
  9  read
  10 flashcard   (Kelime Kartı 2)
  11 quiz        (Alıştırma 2)
  12 quiz        (Cümle Tamamlama 2)
BLOK 3
  13 read        (genelde senaryo/örnek)
  14 read
  15 read        (Ana Çıktı / özet)
  16 flashcard   (Kelime Kartı 3)
  17 quiz        (Alıştırma 3)
  18 quiz        (Cümle Tamamlama 3)
BLOK 4
  19 audio       (Moono Sesli Özet)
  20 final_quiz  (10 soru, pass_threshold 7)
```

---

## 3. Ton ve yazım kuralları (Moono sesi)

- İzleyiciye **"ortak"** diye hitap et; sıcak, sade, cesaret verici.
- `read` adımları **3 kısa paragraf**, paragraflar `\n\n` ile ayrılır. Her paragraf 1-2 cümle.
- Jargon yok; gerekiyorsa hemen sadeleştir. **Yatırım tavsiyesi / garanti / vaat YOK.**
- 1 ders = 1 ana kavram; adımlar o kavramı kademeli derinleştirir.
- Quiz şıkları kısa ve net; yanlış şıklar makul (bariz saçma olmasın).
- `flashcard` tanımları tek cümle, ezberlenebilir.
- `final_quiz` dersteki tüm blokları tarar; tekrar değil, pekiştirme.

---

## 4. USTA PROMPT (modele yapıştır)

```
Sen "Moono" adlı Türkçe finansal okuryazarlık uygulamasının ders içeriği yazarısın.
Görevin: verilen KONU için standart 20 adımlık bir ders üretmek.

# TON
- İzleyiciye "ortak" diye hitap et; sıcak, sade, cesaret verici. Jargon yok.
- Yatırım tavsiyesi, garanti veya kazanç vaadi YOK.
- 1 ders = 1 ana kavram; adımlar kademeli derinleşir.

# 20 ADIM YAPISI (bu sırayı aynen koru)
1-3   read       (1: giriş+ana fikir, 2-3: kavramı aç)
4     flashcard  (Kelime Kartı 1)
5     quiz       (Alıştırma 1, 3 şık)
6     quiz       (Cümle Tamamlama 1, 4 şık, "Cümleyi tamamla: ...")
7-9   read
10    flashcard  (Kelime Kartı 2)
11    quiz       (Alıştırma 2, 3 şık)
12    quiz       (Cümle Tamamlama 2, 4 şık)
13-15 read       (13: senaryo/örnek, 15: "Ana Çıktı" özeti)
16    flashcard  (Kelime Kartı 3)
17    quiz       (Alıştırma 3, 3 şık)
18    quiz       (Cümle Tamamlama 3, 4 şık)
19    audio      (Moono sesli özet — kısa giriş cümlesi; audio_url'i ben sonra eklerim, "" bırak)
20    final_quiz (10 soru, pass_threshold 7, tüm blokları tarar)

# METİN KURALI
- read.text = 3 kısa paragraf, "\n\n" ile ayrılmış. Her paragraf 1-2 cümle.
- quiz/flashcard kısa ve net. Yanlış şıklar makul olsun.

# ŞIK DAĞILIMI KURALI (ZORUNLU — buna mutlaka uy)
- Doğru cevabı SÜREKLI "b" şıkkına koyma. Doğru cevap pozisyonunu karıştır.
- Tüm derste doğru cevaplar a/b/c (gerektiğinde d) arasında olabildiğince eşit dağılsın; tek bir harf baskın olmasın.
- Ardışık sorularda aynı doğru şık en fazla 2 kez üst üste; ÜST ÜSTE 3 AYNI ŞIK YASAK.
- final_quiz'de (10 soru, a/b/c) her şık en az 3 kez doğru olsun (örn. 4/3/3).
- Bitirince doğru cevap anahtarını kontrol et; dengesizse şıkların yerini değiştir.

# ÇIKTI BİÇİMİ
SADECE şu JSON dizisini döndür (açıklama/markdown EKLEME). 20 obje, order sırasıyla:
[
  { "order": 1, "type": "read", "title": "...", "metadata": { "text": "...\n\n...\n\n..." } },
  { "order": 4, "type": "flashcard", "title": "Kelime Kartı 1", "metadata": { "front_text": "...", "back_text": "..." } },
  { "order": 5, "type": "quiz", "title": "Alıştırma 1", "metadata": { "question": "...", "options": [ {"id":"a","text":"..."}, {"id":"b","text":"..."}, {"id":"c","text":"..."} ], "correct_option_id": "a" } },
  { "order": 19, "type": "audio", "title": "Moono Sesli Özet", "metadata": { "text": "...", "audio_url": "" } },
  { "order": 20, "type": "final_quiz", "title": "Final Testi", "metadata": { "pass_threshold": 7, "questions": [ { "id": "q1", "question": "...", "options": [...], "correct_option_id": "a" } ] } }
]

LESSON_ID: <buraya ders id>
KONU:
```

---

## 5. JSON → migration

Yeni migration dosyası: `supabase/migrations/<YYYYMMDDHHMMSS>_<lesson>_20_steps.sql`

İdempotent kalıp (önce sil, sonra ekle):

```sql
-- <Ders adı> (lesson_id: 27) — 20 adımlık akış
delete from lesson_steps where lesson_id = 27;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(27, 'read', 'Başlık', null, 1, $$
{ "text": "1. paragraf\n\n2. paragraf\n\n3. paragraf" }
$$::jsonb),
-- ... 2..18 ...
(27, 'audio', 'Moono Sesli Özet', null, 19, $$
{ "text": "Ortak, dersin özünü topladım.", "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders27.mp3" }
$$::jsonb),
(27, 'final_quiz', 'Final Testi', null, 20, $$
{ "pass_threshold": 7, "questions": [ /* 10 soru */ ] }
$$::jsonb);
```

Notlar:
- JSONB için `$$ ... $$` (dollar-quote) kullan; Türkçe tırnak/karakter kaçışı derdi olmaz.
- `audio` adımı şu an uygulamada gizli (`HIDE_AUDIO_STEPS_TEMPORARILY = true`), ama DB'de durur; ses dosyası hazır olunca `audio_url`'i gerçek linkle güncelle.
- `lesson_id`'yi `lessons` tablosundan doğrula; var olan bir derse yazıyorsan `delete ... where lesson_id = X` önceki adımları temizler.

---

## 6. Stil Kılavuzu (onaylanan ilk 5 dersten türetildi)

> Bu bölüm S1D1–S1D5 (lesson_id 27–31) içeriğinden çıkarıldı. Yeni dersleri buradaki sese **birebir** benzet.

### read paragraf kalıbı: Onayla → Açıkla → Toparla
Üç paragraf çoğu zaman şu ritmi izler:
1. **Onayla / sahneyi kur** — okuyucunun hissini doğrula. Örn: "borsa denince gözünü korkutan ekranlar normal."
2. **Açıkla** — kavramı tek bir net fikirle ver.
3. **Toparla** — sıklıkla **"Yani ..."** ile biten sentez cümlesi. Örn: "Yani burası şans masası değil, düzenli bir alışveriş alanı."

Kurallar:
- Paragraf başına 1-2 cümle; kısa tut.
- Dersin **1. adımı** "Ortak," ile başlar ve sıcak bir karşılama yapar.
- **Zıtlık kalıbı** çok kullanılır: "X değil, Y" (şans değil plan; fiyat değil ortaklık değeri; kod değil ortaklık).
- Güven veren ifadeler: "bu doğru", "çok normal", "kısa vadede dalgalanma normaldir".

### Başlık (title) kalıbı
- Kısa; ya **soru** ya da **vurgulu isim tamlaması**.
  - Soru örnekleri: "Fiyat Nasıl Çıkıyor?", "Şans Mı, Süreç Mi?", "Hangi Taraftasın?", "Neden Hisse Alınır?"
  - İsim örnekleri: "Ortaklık Mantığı", "Planın Gücü", "Hızlı Karar Tuzağı", "Zaman Perspektifi"
- **13. adım** genelde `Senaryo: ...` (örn. "Senaryo: Sert Düşüş Günü", "Senaryo: Emir Eşleşmesi").
- **15. adım** başlığı: "Ders Özeti" (veya "Ana Çıktı").

### Moono sözlüğü (tekrar eden ifadeler)
- Hitap: **"Ortak,"** (özellikle 1, 15, 19. adımlarda).
- Bağlaç: **"Yani ..."** (sentez), **"Önce ..., sonra ..."** (sıralama).
- Anahtar kavramlar: plan, disiplin, sabır, risk yönetimi, uzun vade, büyük resim.
- Sık kullanılan **yanlış şık temaları**: "söylenti", "şans", "panik", "acele/anlık", "rastgele". (Makul ama bariz zayıf.)

### flashcard kalıbı
- `front_text`: 1-3 kelimelik terim (örn. "Temettü", "Likidite", "Risk Yönetimi").
- `back_text`: tek cümle, net tanım, nokta ile biter.

### quiz kalıbı
- **Alıştırma (5/11/17):** 3 şık (a/b/c), kavramsal soru. Doğru şık net, diğer ikisi makul-zayıf.
- **Cümle Tamamlama (6/12/18):** 4 şık (a/b/c/d), gövde "Cümleyi tamamla: ... ____ ...".

### ŞIK DAĞILIMI KURALI (anti-bias) — ZORUNLU
Modeller (özellikle Gemini) doğru cevabı sürekli **"b"** şıkkına koyma eğilimindedir. Bunu engelle:
- Doğru cevap pozisyonunu **kasten karıştır**; doğru şıkkı hep aynı harfe koyma.
- **Bir derste** (6 ara quiz dahil) doğru cevaplar harflere olabildiğince **eşit** dağılsın; tek bir harf toplamın ~%40'ını geçmesin.
- **Ardışık** sorularda aynı doğru şık **en fazla 2 kez** üst üste gelebilir — **üst üste 3 aynı şık YASAK.**
- **final_quiz (10 soru, a/b/c):** her şık (a, b, c) **en az 3 kez** doğru olmalı (örn. dağılım 4/3/3). Yine üst üste 3 aynı şık olmamalı.
- Yazdıktan sonra doğru cevap anahtarını gözden geçir; dengesizse şık sıralarını yeniden karıştır.

### audio (19. adım)
- title: "Moono Sesli Özet".
- text: "Ortak," ile başlar, 1-2 cümle, "kısa sesli özet" vaadi. `audio_url` hazır değilse alanı koyma veya "" bırak.

### final_quiz (20. adım) — ÖNEMLİ
- **10 soru** (q1–q10), `pass_threshold: 7`. Dersin tüm bloklarını tarar (pekiştirme, yeni bilgi değil).
- NOT: Mevcut derslerden 27 doğru (10 soru); **28–31 yalnızca 3 soru içeriyor ve bu bir tutarsızlık** (threshold 7 ile geçilemez). Yeni dersler 10 soruyla yazılmalı; eski dersler düzeltilirken 10'a tamamlanmalı.

### Örnek "altın" read adımı (lesson 27, adım 1)
```json
{ "text": "Ortak, borsa denince gözünü korkutan ekranlar normal. Ama işin özü aslında çok basit: burası şirketlerle yatırımcıların buluştuğu düzenli bir pazar.\n\nMarkette domates satılır, burada şirket ortaklığı satılır.\n\nBu derste hızlı kazanç peşinde koşmayı değil, borsanın mantığını sağlam kurmayı hedefleyeceğiz." }
```
```
