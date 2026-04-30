# MOONO 13 Adım Ders Şablonu (Audio Gizli Mod)

Bu şablon, dersleri 10-12 dakika bandında tutmak ve tüm seviyelerde aynı öğrenme akışını korumak için hazırlanmıştır.

## Standart Akış

1. Hook kartı (25-35 kelime)
2. Okuma 1 (30-45 kelime)
3. Okuma 2 (30-45 kelime)
4. Mini Quiz 1 (tek soru, 3 seçenek)
5. Okuma 3 (30-45 kelime)
6. Okuma 4 (30-45 kelime)
7. Mini Quiz 2 (tek soru, 3 seçenek)
8. Okuma 5 (30-45 kelime)
9. Kelime kartı (terim + tanım)
10. Okuma 6 / örnek senaryo (30-45 kelime)
11. Mini Quiz 3 (tek soru, 3 seçenek)
12. Audio/Video özet (30-60 sn) -> su an UI'da gizli
13. Bolum sonu test (8-10 soru, 3 secenek)

## Teknik Not

- `type: "audio"` adimi backend'de kalabilir.
- Frontend su anda audio adimlarini gostermiyor (gizli mod).
- Dersler yine ayni `lesson_steps` tablosuna yazilir.

## Pilot Ornek — S1D1 Borsa Nedir?

Asagidaki icerik, ayni gun Claude/Gemini'ye cogu ders icin olceklenebilir referans format verir.

```json
{
  "lesson_code": "S1D1",
  "lesson_title": "Borsa Nedir?",
  "steps": [
    {
      "order_index": 1,
      "type": "read",
      "title": "Hook",
      "metadata": {
        "text": "Borsa, karmasik bir ekran degil Ortak. Alici ve saticinin bulustugu modern bir pazar. Fark su: domates degil, sirket ortakligi alip satiliyor."
      }
    },
    {
      "order_index": 2,
      "type": "read",
      "title": "Pazar Mantigi",
      "metadata": {
        "text": "Pazarda fiyat nasil olusuyorsa, borsada da benzer sekilde olusur: talep artarsa fiyat yukselir, talep duserse fiyat geriler. Mantik basit, hizli ve olculebilir."
      }
    },
    {
      "order_index": 3,
      "type": "read",
      "title": "Ortaklik Mantigi",
      "metadata": {
        "text": "Bir hisse aldiginda sadece bir kod almiyorsun. O sirketin kucuk de olsa ortagi oluyorsun. Sirket buyurse payin de deger kazanabilir."
      }
    },
    {
      "order_index": 4,
      "type": "quiz",
      "title": "Mini Quiz 1",
      "metadata": {
        "question": "Borsa mantik olarak en cok neye benzer?",
        "options": [
          { "id": "a", "text": "Pazar yerine" },
          { "id": "b", "text": "Sans oyununa" },
          { "id": "c", "text": "Kapali kutuya" }
        ],
        "correct_option_id": "a",
        "explanation": "Dogru. Borsa, alici ve saticinin bulustugu organize bir pazardir."
      }
    },
    {
      "order_index": 5,
      "type": "read",
      "title": "Borsa Neden Var?",
      "metadata": {
        "text": "Sirketler buyumek icin fon bulur, yatirimci da birikimini calistirir. Borsa bu iki ihtiyaci ayni zeminde bulusturur. Bu yuzden ekonomi icin kritik bir koprudur."
      }
    },
    {
      "order_index": 6,
      "type": "read",
      "title": "Yanlis Inanc",
      "metadata": {
        "text": "\"Borsa oyun\" algisi yanlistir. Plansiz hareket risklidir; ama bilgi, disiplin ve surec takibiyle borsa ogrenilebilir bir karar ortamina donusur."
      }
    },
    {
      "order_index": 7,
      "type": "quiz",
      "title": "Mini Quiz 2",
      "metadata": {
        "question": "Borsanin temel islevi nedir?",
        "options": [
          { "id": "a", "text": "Sadece fiyat gostermek" },
          { "id": "b", "text": "Sirket ve yatirimciyi bulusturmak" },
          { "id": "c", "text": "Sadece bankalara hizmet etmek" }
        ],
        "correct_option_id": "b",
        "explanation": "Evet. Sirket fon bulur, yatirimci ise ortak olur."
      }
    },
    {
      "order_index": 8,
      "type": "read",
      "title": "Ilk Bakista Ne Takip Edilir?",
      "metadata": {
        "text": "Ilk adimda her seyi ogrenmeye calisma. Sirket adi, fiyat, hacim ve genel trendi takip et. Baslangicta az metrikle net gorus almak daha saglikli."
      }
    },
    {
      "order_index": 9,
      "type": "flashcard",
      "title": "Kelime Karti",
      "metadata": {
        "front_text": "Hisse Senedi",
        "back_text": "Bir sirketin ortaklik payini temsil eden finansal varliktir. Alan kisi, o sirkete ortak olur."
      }
    },
    {
      "order_index": 10,
      "type": "read",
      "title": "Ornek Senaryo",
      "metadata": {
        "text": "Bir sirketin yeni yatirim haberi geldi. Talep artinca hisseye ilgi yukselir. Fiyat yukari hareket edebilir. Yani haber, beklenti ve talep birlikte fiyati etkiler."
      }
    },
    {
      "order_index": 11,
      "type": "quiz",
      "title": "Mini Quiz 3",
      "metadata": {
        "question": "Talep artisinda fiyat genelde ne olur?",
        "options": [
          { "id": "a", "text": "Sabit kalir" },
          { "id": "b", "text": "Yukselme egilimine girer" },
          { "id": "c", "text": "Her zaman duser" }
        ],
        "correct_option_id": "b",
        "explanation": "Genel piyasa mantiginda artan talep, fiyati yukari iter."
      }
    },
    {
      "order_index": 12,
      "type": "audio",
      "title": "Sesli Ozet",
      "metadata": {
        "text": "Bu adim su an gizli. Ileride 30-60 saniyelik sesli ozet eklenecek."
      }
    },
    {
      "order_index": 13,
      "type": "quiz",
      "title": "Bolum Sonu Testi",
      "metadata": {
        "question": "S1D1 final testi ayri 8-10 soru seti olarak uretilmeli.",
        "options": [
          { "id": "a", "text": "Tamam" },
          { "id": "b", "text": "Tamam" },
          { "id": "c", "text": "Tamam" }
        ],
        "correct_option_id": "a",
        "explanation": "Final test bu adimda tek soru yerine 8-10 soruluk ayri blokla tamamlanmali."
      }
    }
  ]
}
```
