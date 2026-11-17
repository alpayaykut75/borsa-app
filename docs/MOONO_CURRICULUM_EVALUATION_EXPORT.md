# Moono — Müfredat & Ders Kuralları (Dış Değerlendirme Paketi)

> **Uygulama:** Moono — Türkçe finansal okuryazarlık (Expo/React Native)
> **Veri kaynağı:** Canlı Supabase DB yedeği `supabase/backups/*_20260610.json`
> **Dışa aktarım tarihi:** 2026-06-26
> **Not:** Canlı DB esastır; bu dump 10 Haziran 2026. Ders 1–2 şık dağılımı o tarihte düzeltildi.

---

## Bu dosyayı başka bir yapay zekaya verirken

Örnek değerlendirme isteği:

```
Moono uygulamasının borsa eğitim müfredatını değerlendir.
Ton, pedagoji, şık dağılımı bias, trader/yatırımcı ayrımı, jargon,
Türkçe kalitesi, ilerleme mantığı ve içerik tutarlılığını incele.
Güçlü yanlar, zayıf yanlar ve öncelikli iyileştirme listesi ver.
```

---

## 1. Uygulama özeti

- **Hedef kitle:** Türkiye'de borsaya yeni başlayanlar; finansal okuryazarlık.
- **Dil / ton:** Türkçe; izleyiciye **"ortak"** hitabı; sıcak, sade, cesaret verici.
- **Yasaklar:** Yatırım tavsiyesi, garanti, kazanç vaadi; trader'ı aşağılama (kumar/plansızlık eleştirilir).
- **Müfredat:** 5 ünite × 12 ders = **60 ders** (10 tanesi ara değerlendirme sınavı, 50 tanesi 20 adımlık standart ders).

### Uygulama içi kurallar (kod)

| Kural | Değer |
|---|---|
| Ücretsiz dersler | Seviye 1'in ilk **5** dersi |
| Premium kilit | Seviye 1, **6. ders** (indeks 5) ve sonrası |
| Gelişim Merkezi / Kelime Kartları | İlk **5** ders tamamlanınca açılır |
| Ders kilidi | Sırayla: önceki ders bitmeden sonraki açılmaz |
| Ünite kilidi | Önceki ünite tamamlanmadan sonraki ünite açılmaz |
| Final test geçme | 10 soruda en az **7** doğru (`pass_threshold: 7`) |
| Ses adımı (audio) | Standart adım 19; Ders 1 (lesson 27) aktif, diğerleri DB'de `hidden_in_app` |
| Test bayrağı | `UNLOCK_ALL_FOR_TEST=true` (prod öncesi false) — şu an tüm dersler açık test modunda |

### Standart 20 adım yapısı (kanonik)

```
1-3   read       (giriş + kavram)
4     flashcard
5-6   quiz       (5: 3 şık alıştırma, 6: 4 şık cümle tamamlama)
7-9   read
10    flashcard
11-12 quiz
13-15 read       (13: senaryo, 15: ana çıktı)
16    flashcard
17-18 quiz
19    audio      (Moono sesli özet)
20    final_quiz (10 soru)
```

### İçerik kalite kuralları (editoryal)

- `read`: 3 kısa paragraf, `\n\n` ile; paragraf başına 1–2 cümle; ritim: Onayla → Açıkla → Toparla ("Yani ...").
- Ders 1. adım "Ortak," ile sıcak karşılama.
- Quiz şıkları kısa; yanlış şıklar makul (bariz saçma olmasın).
- **Şık dağılımı (anti-bias):** doğru cevap a/b/c arasında ~eşit; üst üste 3 aynı şık yasak; final 4/3/3 hedefi.
- Ara quizler (5,6,11,12,17,18): hedef dağılım 2/2/2.
- Ton: "trader kötü, yatırımcı iyi" mesajı VERME; farklı zaman ufukları, kumar/plansızlık eleştirilir.

### İnceleme durumu (10 Haz 2026)

| App Ders | lesson_id | Başlık | Durum |
|---|---|---|---|
| D1 | 27 | Borsa Nedir? | ✅ şık+ton düzeltildi |
| D2 | 28 | Hisse Senedi Nedir? | ✅ şık düzeltildi |
| D3 | 29 | Trader mı, Yatırımcı mı? | ⏳ sırada (9b/1a bilinen bias) |
| D4 | 30 | Borsa İstanbul ve Güvenlik | bekliyor |
| D5 | 31 | Endeksler | bekliyor |
| D6 | 53 | Fiyat Nasıl Oluşur? | bekliyor |
| D7 | 54 | Piyasa Döngüleri | bekliyor |
| D8 | 55 | Sessiz Hırsız: Enflasyon | bekliyor |
| D9 | 56 | Risk Yönetimi | bekliyor |
| D10 | 57 | Seviye 1 Final: İlk Adıma Hazırlık | bekliyor |

Bilinen genel sorun: lesson 6–25 ve 33–52 final testlerinde çoğunda tüm doğru cevaplar "a"; checkpoint sınavlarında da benzer bias.

---

## 2. Müfredat haritası (tüm dersler)

### Ünite 1: Seviye 1 — Çıraklık (Temel Kavramlar)

| Sıra | lesson_id | Başlık | Adım sayısı | Tür |
|---|---|---|---|---|
| 1 | 27 | Borsa Nedir? | 20 | Standart ders |
| 2 | 28 | Hisse Senedi Nedir? | 20 | Standart ders |
| 3 | 29 | Trader mı, Yatırımcı mı? | 20 | Standart ders |
| 4 | 70 | Ara Değerlendirme 1 | 1 | Ara değerlendirme |
| 5 | 30 | Borsa İstanbul ve Güvenlik | 20 | Standart ders |
| 6 | 31 | Endeksler | 20 | Standart ders |
| 7 | 53 | Fiyat Nasıl Oluşur? | 20 | Standart ders |
| 8 | 71 | Ara Değerlendirme 2 | 1 | Ara değerlendirme |
| 9 | 54 | Piyasa Döngüleri | 20 | Standart ders |
| 10 | 55 | Sessiz Hırsız: Enflasyon | 20 | Standart ders |
| 11 | 56 | Risk Yönetimi | 20 | Standart ders |
| 12 | 57 | Seviye 1 Final: İlk Adıma Hazırlık | 20 | Final sınav |

### Ünite 2: Seviye 2 — Uygulama / İşlem

| Sıra | lesson_id | Başlık | Adım sayısı | Tür |
|---|---|---|---|---|
| 1 | 6 | Banka mı, Aracı Kurum mu? | 20 | Standart ders |
| 2 | 7 | Yatırım Hesabı Açılış Süreci ve Uygunluk Testi | 20 | Standart ders |
| 3 | 8 | Emir Tipleri 1: Piyasa Emri ve Limit Emir | 20 | Standart ders |
| 4 | 72 | Ara Değerlendirme 1 | 1 | Ara değerlendirme |
| 5 | 9 | Emir Tipleri 2: Zincir Emir ve Stop-Loss | 20 | Standart ders |
| 6 | 10 | Lot Nedir? | 20 | Standart ders |
| 7 | 33 | İşlem Saatleri ve Takvim | 20 | Standart ders |
| 8 | 73 | Ara Değerlendirme 2 | 1 | Ara değerlendirme |
| 9 | 34 | Maliyetler: Komisyon Oranları ve Vergiler | 20 | Standart ders |
| 10 | 35 | KAP Okuryazarlığı | 20 | Standart ders |
| 11 | 36 | Portföy İzleme ve Uygulama Arayüzü Kullanımı | 20 | Standart ders |
| 12 | 37 | Seviye 2 Final: İlk Hisse Emrim | 20 | Final sınav |

### Ünite 3: Seviye 3 — Şirket Analizi

| Sıra | lesson_id | Başlık | Adım sayısı | Tür |
|---|---|---|---|---|
| 1 | 11 | Şirket Hikayesi ve Sektör Analizi | 20 | Standart ders |
| 2 | 12 | Bilanço Okuma 101: Varlıklar ve Yükümlülükler | 20 | Standart ders |
| 3 | 13 | Gelir Tablosu: Satışlar, Esas Faaliyet Kârı ve Net Kâr | 20 | Standart ders |
| 4 | 74 | Ara Değerlendirme 1 | 1 | Ara değerlendirme |
| 5 | 14 | Temel Rasyolar 1: F/K Oranı | 20 | Standart ders |
| 6 | 15 | Temel Rasyolar 2: PD/DD | 20 | Standart ders |
| 7 | 38 | Nakit Akış Tablosu: Sıcak Para Nereye Gidiyor? | 20 | Standart ders |
| 8 | 75 | Ara Değerlendirme 2 | 1 | Ara değerlendirme |
| 9 | 39 | Özsermaye Kârlılığı: Şirket Parasını Verimli Yönetiyor mu? | 20 | Standart ders |
| 10 | 40 | Borçluluk Analizi: Şirket Finansal Olarak Sıkışmış mı? | 20 | Standart ders |
| 11 | 41 | Temettü Verimliliği ve Büyümesi Hesaplama | 20 | Standart ders |
| 12 | 42 | Seviye 3 Final: Bir Şirketi Check-up’tan Geçirmek | 20 | Final sınav |

### Ünite 4: Seviye 4 — Teknik Analiz

| Sıra | lesson_id | Başlık | Adım sayısı | Tür |
|---|---|---|---|---|
| 1 | 16 | Teknik Analiz Mantığı: Geçmiş Veri Geleceğe Işık Tutabilir mi? | 20 | Standart ders |
| 2 | 17 | Grafik Türleri: Çizgi, Bar ve Mum Grafikleri Okuma | 20 | Standart ders |
| 3 | 18 | Trendleri Görmek: Yükselen, Düşen ve Yatay Kanallar | 20 | Standart ders |
| 4 | 76 | Ara Değerlendirme 1 | 1 | Ara değerlendirme |
| 5 | 19 | Destek ve Direnç Seviyeleri | 20 | Standart ders |
| 6 | 20 | Hareketli Ortalamalar | 20 | Standart ders |
| 7 | 43 | Göstergeler 1: RSI | 20 | Standart ders |
| 8 | 77 | Ara Değerlendirme 2 | 1 | Ara değerlendirme |
| 9 | 44 | Göstergeler 2: MACD | 20 | Standart ders |
| 10 | 45 | İşlem Hacmi Analizi | 20 | Standart ders |
| 11 | 46 | Popüler Formasyonlar: Çanak, OBO ve Bayrak Mantığı | 20 | Standart ders |
| 12 | 47 | Seviye 4 Final: Grafikle Konuşmak | 20 | Final sınav |

### Ünite 5: Seviye 5 — Portföy & Makro

| Sıra | lesson_id | Başlık | Adım sayısı | Tür |
|---|---|---|---|---|
| 1 | 21 | Modern Portföy Teorisi: Riski Matematiksel Olarak Dağıtmak | 20 | Standart ders |
| 2 | 22 | Dolar Bazlı Getiri: Param Gerçekten mi Büyüyor, Enflasyona mı Yeniliyor? | 20 | Standart ders |
| 3 | 23 | Makro Ekonomi: Faiz, Enflasyon ve Döviz Borsayı Nasıl Etkiler? | 20 | Standart ders |
| 4 | 78 | Ara Değerlendirme 1 | 1 | Ara değerlendirme |
| 5 | 24 | Portföy Rebalansı : Ne Zaman Satıp Ne Zaman Almalı? | 20 | Standart ders |
| 6 | 25 | Davranışsal Finans: FOMO, Panik ve Psikoloji Yönetimi | 20 | Standart ders |
| 7 | 48 | Yatırım Fonları: Profesyonel Sepetlerle Birlikte Büyümek | 20 | Standart ders |
| 8 | 79 | Ara Değerlendirme 2 | 1 | Ara değerlendirme |
| 9 | 49 | Tematic Yatırımlar: Teknoloji, Enerji ve Sürdürülebilirlik Fonları | 20 | Standart ders |
| 10 | 50 | Temettü Emekliliği ve Bileşik Getirinin Gücü Stratejisi | 20 | Standart ders |
| 11 | 51 | Yatırımcının Vergi ve Hukuki Hakları | 20 | Standart ders |
| 12 | 52 | Büyük Final: Kendi Yatırım Anayasamı Yazıyorum | 20 | Final sınav |

---

## 3. Tam ders içerikleri

Aşağıda her standart dersin 20 adımı ve ara/final sınavların içeriği yer alır.
Quizlerde ✓ işaretli şık doğru cevaptır.

## DERS: Borsa Nedir? (lesson_id=27, unit_id=1)
*Semt pazarı ve ortaklık mantığı*

#### Adım 1 — READ · Ortak, Borsa Aslında Pazar Gibi

Ortak, borsa ilk bakışta karmaşık görünüyor olabilir; çok normal.

Ama özü şu: Nasıl ki mahalle pazarında domates, biber, patlıcan tezgahlarda alıcı bekliyorsa; borsada da dev şirketlerin ortaklık payları, yani hisseleri alınıp satılıyor.

Yani burası tahminlere dayalı bir şans masası değil; kuralları, alıcıları ve satıcıları olan kurumsal ve düzenli bir alışveriş alanıdır.

#### Adım 2 — READ · Fiyat Nasıl Çıkıyor?

Pazarda bir ürüne talep aniden artarsa ne olur? Fiyat yukarı gider, değil mi? Borsada da temel mekanizma tamamen aynıdır.

Bir şirketin geleceğine inanan ve ortak olmak isteyen kişi sayısı (talep) satmak isteyenlerden fazlaysa fiyat yukarı; nakde geçmek isteyenler çoğunluktaysa fiyat aşağı kayar.

Tek fark: Burada domates değil, saniyeler içinde el değiştiren şirket paylarını fiyatlıyoruz.

#### Adım 3 — READ · Hisse Alınca Ne Oluyor?

Bir hisse senedi aldığında telefonunun ekranında sadece dijital bir kod veya harf kombinasyonu satın almıyorsun; o şirkete yasal olarak ortak oluyorsun.

Şirket işlerini büyüttükçe, fabrikalar ürettikçe senin o dev yapı içerisindeki payın da zamanla değer kazanıyor.

Bu yüzden iyi yatırımcı önce ekrandaki fiyat hareketine değil, arkadaki şirketin gerçek hayattaki hikâyesine ve üretimine bakar.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Hisse Senedi

**Arka:** Bir şirketin mülkiyetini temsil eden ve borsada alınıp satılan yasal ortaklık payıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Borsanın temel işleyiş mantığını en doğru özetleyen tanım hangisidir?
  - (a) Şirketlerin büyüme sermayesi bulduğu, yatırımcıların ise pay aldığı kurallı bir pazar ✓
  - (b) Fiyatların tek bir merkezden şirket değerlerine göre belirlenip dağıtıldığı sistem
  - (c) Kısa vadeli fiyat tahminleriyle hızlı nakit üretilen bir finansal platform

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Borsadan bir şirketin hisse senedini alan kişi, yasal olarak o şirketin ____ haline gelir.
  - (a) alacaklısı
  - (b) müşterisi
  - (c) ortaklık payı sahibi ✓

#### Adım 7 — READ · Borsa Neden Gerekiyor?

Şirketler yeni yatırımlar yapmak, dev tesisler kurmak veya teknoloji geliştirmek için büyük sermayelere ihtiyaç duyar. Yatırımcılar ise birikimlerini enflasyona karşı koruyup büyütmek ister.

Borsa, bu iki büyük ihtiyacı güvenli ve şeffaf bir çatıda buluşturur.

Bu sayede hem reel ekonomi canlanıp istihdam yaratılır hem de sen küçük bütçelerle bile dev şirketlerin büyüme ivmesine ortak olursun.

#### Adım 8 — READ · Şans Değil, Plan Meselesi

Kulaktan dolma bilgilerle, plansız ve heyecanla işlem yaparsan borsa senin için yorucu ve kayıplarla dolu bir yer olur; bu kaçınılmazdır.

Ama Moono tarzında biz şansa veya tesadüflere değil; araştırmaya, sabra ve risk yönetimine inanıyoruz.

Borsayı bir oyun değil, bir disiplin olarak gördüğünde uzun vadeli finansal geleceğini inşa etmeye başlarsın.

#### Adım 9 — READ · Denetim ve Güvenlik

Burası kimsenin kendi kurallarını koyamayacağı, son derece sıkı korunan bir yapıdır. SPK (Sermaye Piyasası Kurulu) tüm işlemleri anlık olarak denetler.

Şirketler her kuruş kârını ve planını şeffafça açıklamak zorundadır. Yapay zeka destekli piyasa gözetim sistemleri ise olağandışı her hareketi saniyesinde yakalar.

Varlıkların dijital ve hukuki bir zırh altındadır.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Gözetim Sistemleri

**Arka:** Piyasadaki işlemleri saniye saniye izleyerek kurallara aykırı durumları yapay zeka ve uzmanlarla tespit eden sistemlerdir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Bir yatırımcı borsayı bir "şans oyunu" olmaktan çıkarmak için ilk olarak ne yapmalıdır?
  - (a) Fiyatı en hızlı yükselen popüler hisseleri seçerek
  - (b) Şirketlerin finansal durumunu araştırıp, bir plan dahilinde hareket ederek ✓
  - (c) Sosyal medyadaki uzman analizlerini eksiksiz uygulayarak

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Şirketlerin tüm mali verilerini halka açıklamak zorunda olması, borsayı ____ bir platform yapar.
  - (a) hızlı ve spekülatif
  - (b) gizli ve korumalı
  - (c) denetlenebilir ve şeffaf ✓

#### Adım 13 — READ · Senaryo: Pazar Karışırsa Ne Olur?

Bazen küresel veya yerel gelişmeler nedeniyle piyasada genel bir panik havası oluşur ve neredeyse tüm hisseler aynı anda değer kaybeder.

Böyle anlarda 'her şeyin bittiğini' düşünüp panikle satış yapmak en yaygın hatadır. Sakin kalmalı ve şu soruyu sormalısın: 'Benim ortak olduğum şirket hala üretmeye, satmaya ve değer yaratmaya devam ediyor mu?'

Cevabın evetse, pazarın geçici fırtınası senin ortaklık hakkını yok edemez.

#### Adım 14 — READ · Dijital Değil, Gerçek Varlık

Yatırım yaparken telefon ekranına bakıyor olmak sende sanal bir algı yaratmasın.

Hisse sahibi olduğunda, o şirketin yollardaki tırlarına, fabrikasındaki makinelere, laboratuvardaki patentlerine ve insan kaynağına ortak olursun.

Finansal özgürlüğün anahtarı, bu somut mülkiyet bilincini zihne tam olarak yerleştirmektir.

#### Adım 15 — READ · Dersin Özeti

Özetle ortak; borsa bir kısa yol veya tahmin oyunu değil, profesyonel bir ortaklık ekosistemidir.

Devlet eliyle denetlenen bu şeffaf pazarda, şirketlerin gerçek değerlerine odaklanıp planlı adımlar attığında, birikimlerinin senin için gece gündüz çalışan birer motora dönüştüğünü göreceksin.

İlk adımı başarıyla mühürledin!

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** SPK (Sermaye Piyasası Kurulu)

**Arka:** Borsadaki şirketlerin şeffaflığını ve işlemlerin yasal kurallara uygunluğunu denetleyen en üst yetkili kamu kurumudur.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Hisse senedinin gerçek hayattaki karşılığını en doğru anlatan ifade hangisidir?
  - (a) Şirketin varlıklarına ve gelecekteki kârına ortaklık sağlayan mülkiyet belgesidir ✓
  - (b) Şirketin piyasa değerinin anlık değişim grafikleridir
  - (c) Şirketin yatırımcısına belirli bir vade sonunda ödeyeceği borç senedidir

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Borsada geçici kazançlar yerine kalıcı bir servet inşa etmek için en gerekli sermaye ____ dir.
  - (a) fiyatı en dipten yakalamak
  - (b) bilgi, disiplin ve plan ✓
  - (c) sürekli alım-satım yapmak

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, borsa temelini attık. Şimdi 2 dakikada her şeyi toparlayalım, Çırak seviyesinin ilk adımını mühürleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Borsa pazarında alınıp satılan asıl 'ürün' teknik olarak nedir?
  - (a) Şirketlerin gelecekteki değerine ve kârına ortaklık payı ✓
  - (b) Gelecekte faiziyle geri alınacak nakit borçlar
  - (c) Şirket yönetim kurullarında doğrudan oy kullanma yetkisi

**Final S2:** **Soru:** Bir hisse senedinin fiyatı piyasada genel olarak ne zaman yükselme eğilimi gösterir?
  - (a) Şirket maliyetleri azaltmak için üretim hacmini düşürdüğünde
  - (b) Borsa endeksi genel bir düşüş trendine girdiğinde
  - (c) Hisseye olan alım isteği (talep), satım isteğinden (arz) daha güçlü olduğunda ✓

**Final S3:** **Soru:** Piyasanın şeffaf kalmasını sağlayan ve tüm kuralları koyan en üst denetleyici yasal kurum hangisidir?
  - (a) Borsa İstanbul Yönetim Kurulu
  - (b) SPK (Sermaye Piyasası Kurulu) ✓
  - (c) Merkezi Kayıt Kuruluşu

**Final S4:** **Soru:** Borsanın makro ekonomi içindeki en temel işlevi nedir?
  - (a) Şirketlerin yatırımları için kaynak bulmasını, birikimlerin de üretime ortak olmasını sağlamak ✓
  - (b) Hisse fiyatlarının stabil kalmasını sağlayarak piyasa risklerini tamamen yok etmek
  - (c) Şirketlerin finansal yönetimini tek bir devlet merkezinden idare etmek

**Final S5:** **Soru:** Moono felsefesine sahip bir yatırımcının borsa yaklaşımı nasıl olmalıdır?
  - (a) Anlık fiyat dalgalanmalarından hızlı kârlar kovalamak
  - (b) Sadece endekste en çok işlem gören popüler şirketleri toplamak
  - (c) Ortaklık bilinciyle, büyüyen bir şirketin değer hikayesine eşlik etmek ✓

**Final S6:** **Soru:** Borsada işlem gören bir şirketin 'şeffaf olması' tam olarak ne anlama gelir?
  - (a) Şirket sırlarını ve üretim detaylarını rakiplerine kapatması
  - (b) Finansal tablolarını, kâr/zarar durumunu ve gelecek planlarını kamuoyuna açıkça sunması ✓
  - (c) Hisselerini sadece belirli kurumsal aracı kurumlara satması

**Final S7:** **Soru:** Bir hisseye sahip olmanın gerçek hayattaki hukuki ve finansal karşılığı nedir?
  - (a) Şirket ürünlerini piyasa fiyatından daha indirimli alma hakkı
  - (b) Şirketin finansal borçlarına kişisel varlıklarıyla kefil olmak
  - (c) Şirketin ürettiği fiziki değerlere, kârına ve büyümesine yasal ortaklık ✓

**Final S8:** **Soru:** Şirket ile yatırımcı arasındaki o meşhur 'kazan-kazan' ilişkisi borsada nasıl çalışır?
  - (a) Şirket değer ürettikçe ve büyüdükçe yatırımcının ortaklık payı da değerlenir ✓
  - (b) Şirket yatırımcıya sabit bir dönem sonu faizi öder
  - (c) Borsa yönetimi kâr eden şirketlerin gelirlerini tüm yatırımcılara eşit dağıtır

**Final S9:** **Soru:** Dersin bütününde verilen mesaja göre borsa nasıl bir yerdir?
  - (a) Sadece çok profesyonel uzmanların karmaşık sistemlerle kazanabileceği, sıradan insana kapalı bir yer
  - (b) Bilgi, strateji ve finansal disiplinle riskleri yönetilebilen profesyonel bir pazar ✓
  - (c) Gelecek tahminlerinin doğru çıkma olasılığına dayalı bir finansal tahmin alanı

**Final S10:** **Soru:** Bu ilk dersin kullanıcıda bırakmak istediği ana düşünce hangisidir?
  - (a) Hisse senedi mülkiyet hakkıdır; şeffaf ve denetlenen bu pazarda planlı giden kazanır ✓
  - (b) Hisse senedi anlık bir yatırım aracıdır; piyasa takibini en hızlı yapan kazanır
  - (c) Borsada riskler devlet güvencesinde sıfırlandığı için her şirket kazandırır

---

## DERS: Hisse Senedi Nedir? (lesson_id=28, unit_id=1)
*Kağıt değil, tapu*

#### Adım 1 — READ · Mülkiyet Tapusu Elinde

Ortak, ilk derste borsanın büyük bir pazar yeri olduğunu konuşmuştuk. Peki bu pazardan aldığımız 'hisse senedi' tam olarak ne?

Bir şirketin hissesini aldığında, sadece ekranda dönen dijital bir kod veya harf kombinasyonu satın almazsın; o şirketin mülkiyetine yasal olarak ortak olursun.

Yani elindeki hisse, devasa bir ticari yapının içindeki küçük ama hukuken sana ait olan bir mülkiyet tapusudur.

#### Adım 2 — READ · Ortaklık Pastası Nasıl Bölünür?

Bir şirketin toplam değeri milyonlarca, bazen milyarlarca eşit parçaya bölünür ve bu parçaların her birine 'pay' veya 'hisse' denir.

Sen bu paylardan bir tanesini bile alsan, o şirketin tüm fabrikaları, markası, ürettiği teknolojiler ve gelecekte yaratacağı ticari değerlerde hakkın olur.

Sen artık dışarıdan bakan bir tüketici değil, içerideki mülkiyetin yasal bir parçasısın.

#### Adım 3 — READ · Masadaki Yasal Hakların

Hisse sahibi olmak sana sadece fiyat yükselişi bekletmez, aynı zamanda çok güçlü yasal haklar da tanır.

Her yıl düzenlenen 'Genel Kurul' toplantılarına katılabilir, şirketin geleceği hakkında birinci ağızdan bilgi alabilir ve yönetim kararlarında oy kullanabilirsin.

Tek bir hisseyle dev kararları tek başına değiştiremezsin belki ama o masada sesini duyurma hakkın her zaman yasalarla mühürlenmiştir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Hisse / Pay

**Arka:** Bir şirketin toplam sermayesinin eşit parçalarından her birini temsil eden ve sahibine yasal ortaklık hakkı veren kıymetli evraktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Hisse senedi sahibi olmak teknik ve hukuki olarak neyi ifade eder?
  - (a) Şirketin kârına, varlıklarına ve geleceğine belirli oranda yasal olarak ortak olmak ✓
  - (b) Şirketin finansal borçlarına ve yönetim risklerine kişisel servetinle kefil olmak
  - (c) Şirketin ürettiği fiziki ürünler üzerinde doğrudan öncelikli alım hakkı kazanmak

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Bir şirketin hisse senedini portföye eklemek, aslında dijital bir kod değil, ____ temsil eder.
  - (a) şirkete verilen borcu
  - (b) yasal bir mülkiyet ortaklığını ✓
  - (c) anlık bir fiyat sözleşmesini

#### Adım 7 — READ · En Tatlı Kazanç: Temettü

Şirketler yıl boyunca çalışır, üretir, küresel veya yerel satış yapar ve günün sonunda net bir kâr elde ederler.

İşte bu elde edilen kârın bir kısmını, hisseleri oranında ortaklarına nakit para olarak dağıtmalarına 'Temettü' denir.

Doğru ve kârlı şirketi seçtiğinde, o şirket ortaklarını düzenli nakit akışıyla ödüllendirir; yatırımın gerçek hayattaki en somut meyvesi tam olarak budur.

#### Adım 8 — READ · Değerin Arkasındaki Gerçek Güç

Bir hissenin fiyatı ekranda uzun vadede neden yukarı gider? Çünkü arkasındaki şirket iyi yönetiliyor, kârını artırıyor, pazar payını büyütüyordur.

Şirket büyüdükçe ona ortak olmak isteyen yatırımcıların sayısı (talep) artar ve bu istek fiyatı yukarı tırmandırır.

Kısacası hisse senedinin piyasadaki değeri, şirketin gerçek hayattaki ticari başarısının borsaya yansıyan bir aynasıdır.

#### Adım 9 — READ · Yatırımcı Vizyonu Kurmak

Bilinçli bir yatırımcı, sadece ucuz veya pahalı diye ya da grafik parladı diye hisse almaz.

Olayı şu vizyonla okur: 'Ben uyurken bile benim için değer üreten binlerce insan, çalışan fabrikalar ve dünyaya mal satan dev bir organizasyon var.'

Bu ortaklık bilinci seni anlık fiyat takibinin yaratacağı stresten kurtarır ve uzun vadeli bir servet inşasına taşır.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Temettü (Kâr Payı)

**Arka:** Şirketin yıllık net kârının bir kısmını, yönetim kurulu kararıyla ortaklarına payları oranında nakit olarak dağıtması işlemidir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Bir hisse senedinin değeri uzun vadede en çok neye göre şekillenir?
  - (a) Günlük piyasa dedikodularına ve sosyal medyadaki alım-satım hacimlerine
  - (b) Sektördeki diğer rakip şirketlerin hisse kodlarının harf popülerliğine
  - (c) Şirketin gerçek üretim gücüne, kârlılık büyümesine ve ticari başarısına ✓

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Şirketin ürettiği yıllık kârı ortaklarının banka hesaplarına nakit olarak aktarmasına ____ ödemesi denir.
  - (a) temettü ✓
  - (b) bedelsiz sermaye
  - (c) tahvil faizi

#### Adım 13 — READ · Senaryo: Dünyaya Satılan Bir Ürün

Türkiye’nin lider bir teknoloji veya beyaz eşya üreticisinin hissesine sahip olduğunu hayal et.

Dünyanın öbür ucunda, Avrupa'da veya Asya'da satılan her bir üründen elde edilen kârda senin de payın oranında hakkın var.

Şirketin küresel başarısı ve kasasına giren döviz, doğrudan senin elindeki ortaklık belgesini yani hisseni daha değerli ve korumalı kılar.

#### Adım 14 — READ · Tek Hisseden Kaçınma İlkesi

Ortak olduğun şirket ne kadar devasa ve harika olursa olsun, tüm birikimini tek bir hisseye bağlamak Moono tarzı değildir.

Sektörel bir kriz, hammadde sıkıntısı veya şirkete özel bir şanssızlık seni korumasız bırakabilir.

Ortaklığı seveceğiz ama riskleri dağıtmak için farklı sektörlerden dengeli bir sepet yapmayı asla ihmal etmeyeceğiz.

#### Adım 15 — READ · Dersin Özeti

Bu dersin ana fikri net: Hisse senedi soyut bir oyun aracı değil, somut bir ortaklık hakkıdır.

Temettü kültürünü, genel kurul hakkını ve hisse fiyatının şirketin başarısına bağlı olduğunu tam olarak kavradın.

Harika gidiyorsun ortak, bu sağlam bakış açısıyla finansal okuryazarlık temelini tıkır tıkır inşa ediyoruz.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Genel Kurul

**Arka:** Şirket ortaklarının yılda en az bir kez bir araya gelerek yönetimi denetlediği, ibra ettiği ve kritik kararları oyladığı resmi toplantıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda bahsedilen tek bir şirkete yatırım yapma riskinden kaçınmanın en sağlıklı yolu nedir?
  - (a) Gelecekte daha yüksek fiyattan satma garantisi olan hisseleri bulmak
  - (b) Farklı sektörlerdeki güçlü şirketlere payı dağıtarak olası riskleri minimize etmek ✓
  - (c) Sadece nominal değeri yani kuruşlu fiyatı en düşük olan hisseleri toplamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Yatırımcıyı piyasa dalgalanmalarındaki panikten koruyan en güçlü kalkan, ____ geliştirmektir.
  - (a) anlık grafik takibi
  - (b) kısa vadeli al-sat stratejisi
  - (c) ortaklık bilinci ✓

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste hisse senedi ve mülkiyet kavramını çözdük. 2 dakikada hızlı bir özet dinle, hemen ardından final testine geçelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders2.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Bir şirketin resmi ve yasal ortağı sayılabilmek için gereken asgari alt sınır nedir?
  - (a) Şirketin toplam piyasa değerinin en az yüzde birine sahip olmak
  - (b) Borsada o şirkete ait sadece 1 adet hisse senedi satın almış olmak ✓
  - (c) Şirketin kuruluş sermayesine nakit olarak bizzat katkıda bulunmak

**Final S2:** **Soru:** Finans dünyasındaki 'Temettü' kavramının en eksiksiz tanımı hangisidir?
  - (a) Şirketin elde ettiği dönem sonu net kârını pay sahipleriyle nakit paylaşmasıdır ✓
  - (b) Şirketin borsa endeksindeki yükselişine bağlı olarak yatırımcıya bonus puan vermesidir
  - (c) Yatırımcının aracı kuruma ödediği işlem komisyonlarının bir kısmını geri almasıdır

**Final S3:** **Soru:** Küçük ya da büyük fark etmeksizin, tüm hisse senedi sahiplerine tanınan yasal haklar nelerdir?
  - (a) Şirketin yönetim binalarını ve fiziki ofislerini dilediği zaman kişisel olarak kullanma hakkı
  - (b) Şirket çalışanlarını doğrudan denetleme ve kurumsal operasyonları durdurma hakkı
  - (c) Genel kurula katılma, kurumsal kararlarda oy kullanma ve finansal bilgi alma hakkı ✓

**Final S4:** **Soru:** Yatırım yaparken tek bir şirkete odaklanmak yerine 'sepet (çeşitlendirme)' yapmanın temel amacı nedir?
  - (a) Sektörel krizlerin veya tek bir şirkette oluşabilecek risklerin tüm portföyü yıkmasını engellemek ✓
  - (b) Borsa İstanbul’un gözetim sistemlerinden daha yüksek bir güvenlik puanı almak
  - (c) Hisselerin Takasbank nezdindeki saklama maliyetlerini tamamen sıfıra indirmek

**Final S5:** **Soru:** Bir hisse senedi fiyatının uzun vadeli ve kalıcı yükselişindeki ana lokomotif aşağıdakilerden hangisidir?
  - (a) Şirketin reklam harcamalarını artırarak sosyal medyada trend olması
  - (b) Şirketin ticari operasyonlarındaki başarısı, kârlılığı ve sürdürülebilir büyümesi ✓
  - (c) Hisse senedinin borsada işlem gördüğü işlem kodunun harf uzunluğu

**Final S6:** **Soru:** Bir şirketteki hisse senedinden doğan yasal ortaklık hakkınız tam olarak ne zaman sona erer?
  - (a) Şirket her yıl sonunda hesap dönemini kapatıp yeni yıla geçtiği an
  - (b) Şirketin genel müdürü veya yönetim kurulu üyeleri değiştiği an
  - (c) Elindeki hisseleri borsada canlı piyasada başka bir yatırımcıya sattığın an ✓

**Final S7:** **Soru:** Doğru bir yatırımcı bakış açısına göre hisse senedi için hangisi söylenebilir?
  - (a) Hisse senetleri sadece büyük fonların ve zenginlerin kullanabileceği haklar doğurur
  - (b) Hisse senedi sadece anlık alınıp satılan bir rakam değil, yasal bir mülkiyet belgesidir ✓
  - (c) Küçük yatırımcıların genel kurul toplantılarında bilgi alma veya soru sorma hakkı yoktur

**Final S8:** **Soru:** Arkadaki şirketin ticari ve finansal performansının olumsuz gitmesi hisse senedini nasıl etkiler?
  - (a) Şirketin ticari işleri ve kârlılığı kötüye giderse hisse değeri aşağı yönlü etkilenebilir ✓
  - (b) Şirketin finansal tabloları kötü gitse bile devlet hisse fiyatını sabit tutar
  - (c) Zarar eden şirketlerin piyasadaki tüm hisselerini Borsa İstanbul geri satın alır

**Final S9:** **Soru:** Moono felsefesindeki bir yatırımcı zihniyetinin temel motivasyonu hangisidir?
  - (a) Kısa vadeli fiyat hareketlerini saniye saniye izleyerek hızlı yoldan nakit üretmeye çalışmak
  - (b) Şirketin fiziksel mağaza ve ofislerinde öncelikli hizmet alma ayrıcalığına kavuşmak
  - (c) Sen uyurken veya günlük hayatına devam ederken de değer üreten dev bir mekanizmaya ortak olmak ✓

**Final S10:** **Soru:** Bu dersin kullanıcıya aktarmak istediği en temel mesaj aşağıdakilerden hangisidir?
  - (a) Hisse senedi, yaşayan ve değer üreten şirketlerin ticari başarısına yasal olarak ortak olma aracıdır ✓
  - (b) Hisse senedi, vadesi geldiğinde şirketten faiz talep edebileceğiniz bir borçlanma senedidir
  - (c) Hisse senedi sahiplerinin, şirketin kurumsal geleceği üzerinde hiçbir yasal söz hakkı yoktur

---

## DERS: Trader mı, Yatırımcı mı? (lesson_id=29, unit_id=1)
*Zaman Ufku: Uzun Vadeli Değer mi, Günlük Alım Satım mı?*

#### Adım 1 — READ · Finans Dünyasında İki Farklı Yol

Ortak, borsada adımlarına yön verecek en popüler iki finansal rolü tanıma vaktimiz geldi: Yatırımcı ve Trader.

Piyasada bu iki rol genellikle birbiriyle yarışıyor gibi gösterilir ama aslında ikisi de kendi içinde derin stratejileri olan saygın ve profesyonel yöntemlerdir.

 Aralarındaki temel fark, şans veya kumar değil; piyasaya ayırdıkları zaman, risk yönetim tarzları ve hedefleridir.

#### Adım 2 — READ · Trader: Zamanını ve Emeğini Koyan Profesyonel

Trader, fiyat ekranındaki kısa vadeli dalgalanmaları ve saniyelik grafik hareketlerini yakalayarak kazanç elde etmeyi hedefler.

Bunu yaparken şansa değil; matematiksel göstergelere, trend analizlerine ve çok sıkı stop-loss (zarar kes) kurallarına güvenir. Gözü sürekli ekrandadır.

Traderlık, borsayı tam zamanlı bir iş veya yoğun emek isteyen bir meslek olarak yürütme sanatıdır.

#### Adım 3 — READ · Yatırımcı: Şirketlerin Ortaklık Vizyonu

Yatırımcı ise fiyatın günlük gürültüsüyle veya saniyelik aşağı-yukarı hareketleriyle ilgilenmez. Onun odağı şirketin gerçek hayattaki büyüme hikayesidir.

Sermayesini güvendiği bir şirkete bağlar ve o şirketin üretim gücüne, küresel satışlarına ortak olur. Zaman, yatırımcının en büyük dostudur.

Ekranı kapatıp günlük hayatına devam edebilme özgürlüğü, uzun vadeli yatırımcılığın en konforlu yanıdır.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Trader

**Arka:** Fiyatların kısa vadeli ve anlık yönünü matematiksel stratejilerle analiz ederek sık alım-satım yapan piyasa profesyonelidir.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bir trader ile yatırımcı arasındaki en temel fark aşağıdakilerden hangisidir?
  - (a) Odaklandıkları zaman ufku, piyasaya ayırdıkları mesai ve kullandıkları analiz araçları ✓
  - (b) Birinin yasal kurallara uyması, diğerinin ise tamamen serbest hareket etmesi
  - (c) İşlem yaptıkları aracı kurumların devlet tarafından belirlenen yasal statüleri

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Traderlık anlık fiyat hareketlerini yöneten yoğun bir meslek gibiyken, yatırımcılık parayı zamana yayarak ____ ortak etmektir.
  - (a) anlık piyasa dedikodularına
  - (b) şirketlerin reel büyüme hikayelerine ✓
  - (c) fiyat adımlarındaki rastgele şanslara

#### Adım 7 — READ · Neden Çıraklıkta Yatırımcılık Önde?

Moono yolculuğunun başında sana yatırımcı zihniyetini aşılamamızın çok mantıklı bir sebebi var ortak.

Traderlık, çok yüksek düzeyde teknik analiz bilgisi, saniyeler içinde karar verme soğukkanlılığı ve ileri seviye risk yönetim kasları gerektirir.

Henüz bu eğitimleri tamamlamadan, yeterli donanım olmadan hızlı al-sat dünyasına girmek büyük risk taşır. Önce yürümeyi, sonra koşmayı öğreneceğiz.

#### Adım 8 — READ · Strateji Farkı: Teknik vs Temel

İki rolün de beslendiği strateji kaynakları farklıdır ve ikisi de kendi alanında uzmanlık ister.

Yatırımcı, şirketin bilançosuna, kârlılığına ve ne ürettiğine bakar (Temel Analiz). Trader ise fiyat grafiklerine, matematiksel göstergelere ve alıcı-satıcı hacimlerine odaklanır (Teknik Analiz).

İlerleyen seviyelerde (Analist ve Stratejist olduğunda) iki yöntemin de araçlarını elinde tutacaksın.

#### Adım 9 — READ · Disiplin Her İki Yolda da Şart

Borsada şansa yer yoktur ortak. Plansız hareket eden bir yatırımcı da, stop-loss kuralına uymayan bir trader da uzun vadede kaybetmeye mahkumdur.

Bir trader işleme girmeden önce nereden çıkacağını, ne kadar risk aldığını matematiksel olarak belirler. 

Yani borsa kumar değil, hangi yolu seçersen seç sıkı bir finansal disiplin yönetimidir.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Zaman Ufku

**Arka:** Yatırımcının veya traderın bir varlığı portföyünde ne kadar süre tutmayı planladığını gösteren stratejik zaman planıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Moono eğitiminin başlangıcında uzun vadeli yatırımcılığın önerilmesinin ana sebebi nedir?
  - (a) Traderlığın yasal olarak sadece büyük kurumsal şirketlere izin verilen bir alan olması
  - (b) Traderlığın ileri düzey teknik bilgi ve saniyelik psikoloji yönetimi kasları gerektirmesi ✓
  - (c) Uzun vadeli yatırımcıların borsada hiçbir zaman risk taşımadığı gerçeği

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Traderlar kararlarını verirken ağırlıklı olarak fiyat grafiklerini inceleyen ____ yöntemini kullanırlar.
  - (a) temel analiz
  - (b) teknik analiz ✓
  - (c) kamuyu aydınlatma

#### Adım 13 — READ · Senaryo: İki Profesyonelin Aynı Hisseye Bakışı

X şirketinin hissesi çok sert bir fiyat hareketi yapıyor. Trader, grafikteki matematiksel kırılımı görür, 'Bu hareket bana 2 saat içinde kâr getirebilir' diyerek işleme girer ve hedefi görünce disiplinle çıkar.

Yatırımcı ise aynı şirkete bakar: 'Bu şirketin 3 yıl sonra açacağı yeni fabrika değerini katlayacak' der ve günlük sert dalgalanmayı hiç umursamadan pay biriktirir. İkisinin de planı tıkır tıkır işler.

#### Adım 14 — READ · Yaşam Tarzı ve Tercih Meselesi

Hangi yolun sana daha uygun olduğu, hayattan ne beklediğinle ilgilidir ortak. Eğer başka bir ana mesleğin varsa, ekrana bakacak vaktin kısıtlıysa yatırımcılık senin için en doğrusudur.

Ama finansal piyasalara saatlerini ayırabilecek durumdaysan, gerekli eğitimleri bitirip kurallara sadık kalacaksan traderlık da harika bir seçenektir.

#### Adım 15 — READ · Dersin Özeti: İki Yol da Saygın

Özetle ortak; traderlık ekran başında aktif mesai harcanan dinamik bir meslek, yatırımcılık ise paranın senin için çalışmasını sağlayan sakin bir yaşam tarzıdır.

Moono’da biz sana önce borsa ekosisteminde güvenle ayakta kalmayı öğreteceğiz, ardından uzmanlaştıkça hangi yoldan yürüyeceğine sen karar vereceksin.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Stop-Loss

**Arka:** Bir işlemde olası zararı baştan belirlenmiş bir seviyede sınırlandırmak için kullanılan otomatik zarar kes emridir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryodaki trader ve yatırımcının ortak başarı sırrı aşağıdakilerden hangisidir?
  - (a) Aynı aracı kurum robotlarını kullanarak siber avantaj sağlamaları
  - (b) Kendi zaman ufuklarına uygun, net ve disiplinli birer plana sadık kalmaları ✓
  - (c) Şans faktörünün o gün iki profesyonelin de yanında olması

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Borsada uzun vadede kalıcı olmak için şansa güvenmek yerine, her iki rolde de ____ şarttır.
  - (a) günlük en yüksek hacimli hisseyi tahmin etmek
  - (b) sıkı bir finansal plan ve duygusal disiplin yönetimi ✓
  - (c) sürekli hesap değiştirerek işlem açmak

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste trader ve yatırımcı rollerinin finans dünyasındaki gerçek ve profesyonel yerlerini inceledik. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders3.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Traderlık finans dünyasında en doğru şekilde nasıl tanımlanır?
  - (a) Gelecek tahminlerine dayalı, yüksek şans odaklı bir borsa oyunu
  - (b) Kısa vadeli fiyat hareketlerini matematiksel strateji ve disiplinle yönetme mesleği ✓
  - (c) Şirketlerin hisse senetlerini sonsuza kadar saklama zorunluluğu

**Final S2:** **Soru:** Yatırımcı zihniyetinin ana odağı aşağıdakilerden hangisidir?
  - (a) Saniyeler içindeki fiyat dalgalanmalarından hızlı kârlar almak
  - (b) Şirketin gerçek hayattaki üretim, kârlılık ve uzun vadeli büyüme hikayesi ✓
  - (c) Akşam borsa kapandıktan sonra tüm hisseleri nakde çevirmek

**Final S3:** **Soru:** Bir traderın olası zararları sınırlandırmak için kullandığı en önemli disiplin aracı hangisidir?
  - (a) Temettü ödemesi
  - (b) Stop-Loss (Zarar Kes) kuralı ✓
  - (c) Genel kurul oylaması

**Final S4:** **Soru:** Moono çıraklık seviyesinde neden öncelikle uzun vadeli bakış açısı işlenir?
  - (a) Traderlığın yasal ehliyetinin sadece bankalara verilmesi
  - (b) Kısa vadeli riskleri yönetmenin ileri düzey teknik bilgi ve soğukkanlılık kasları gerektirmesi ✓
  - (c) Uzun vadeli yatırımlarda borsa komisyonlarının hiç olmaması

**Final S5:** **Soru:** Şirketlerin bilançolarını, satışlarını ve kurumsal hikayesini inceleyen strateji türü hangisidir?
  - (a) Teknik Analiz
  - (b) Temel Analiz ✓
  - (c) Kademe Derinliği

**Final S6:** **Soru:** Bir trader ile yatırımcının kararlarındaki ortak bilimsel temel ne olmalıdır?
  - (a) Sosyal medyadaki popüler yorum grupları
  - (b) Kendi zaman ufuklarına göre kurgulanmış net bir finansal strateji ve disiplin ✓
  - (c) Geçmiş yılın şans faktörü ortalaması

**Final S7:** **Soru:** Ekrana ayıracak vakti kısıtlı olan ve başka bir ana meslekle uğraşan biri için hangi rol daha konforludur?
  - (a) Gün içi anlık al-sat yapan traderlık
  - (b) Şirket değerine odaklanan uzun vadeli yatırımcılık ✓
  - (c) Kredili saniyelik arbitraj işlemleri

**Final S8:** **Soru:** Traderların grafik ve matematiksel göstergeleri inceleyerek yön bulduğu çalışma alanına ne denir?
  - (a) Mali tablo analizi
  - (b) Teknik Analiz ✓
  - (c) Halka arz süreci

**Final S9:** **Soru:** Borsada kalıcı başarı elde etmek için şans faktörü hakkında ne söylenebilir?
  - (a) Şans her şeydir, iyi tahminci her zaman kazanır
  - (b) Şansa dayalı plansız işlemler, borsa rolü ne olursa olsun uzun vadede kaybettirir ✓
  - (c) Sadece yatırımcıların şansa ihtiyacı vardır, traderlar şans kullanmaz

**Final S10:** **Soru:** Bu dersin yatırımcıya bırakmak istediği ana vizyon mesajı hangisidir?
  - (a) Borsada traderlık da yatırımcılık da strateji ve disiplinle yönetilen iki profesyonel ve saygın yoldur ✓
  - (b) Gerçek kazanç sadece gün içinde yüzlerce kez al-sat yaparak elde edilir
  - (c) Borsada risk yönetimi sadece uzun vadeli bekleyenler için geçerlidir

---

## DERS: Ara Değerlendirme 1 (lesson_id=70, unit_id=1)
*Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 1

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Borsanın işleyiş mantığı düşünüldüğünde, piyasada işlem gören şirket payları en doğru şekilde hangi kurumsal benzetmeyle açıklanabilir?
  - (a) Bir pazar yerindeki tezgahların üzerinde alıcı bekleyen, kuralları ve şeffaflığı yasal olarak korunan kurumsal ortaklık paylarına ✓
  - (b) Devlet tarafından belirli bir vade sonunda sabit kâr ve anapara garantisiyle dağıtılan kurumsal borç senetlerine
  - (c) Fiyatları tek bir finansal merkezden şirketlerin büyüklüğüne göre belirlenip dağıtılan dijital ticaret kuponlarına

**Final S2:** **Soru:** Bir şirketin hisse senedini portföyüne ekleyen bir kişi, yasal ve hukuki olarak hangi finansal unvana sahip olur?
  - (a) Şirketin ticari borçlarından ve kurumsal yönetim risklerinden kişisel varlıklarıyla sorumlu olan finansal sponsoru
  - (b) Şirketin gelecekteki tüm üretimlerine, fiziki varlıklarına ve elde edeceği kârlara yasal olarak ortaklık payı sahibi ✓
  - (c) Şirketin ürettiği fiziki mal ve hizmetleri piyasa fiyatından daha indirimli alma ayrıcalığına sahip özel müşterisi

**Final S3:** **Soru:** Borsada bir hisse senedinin fiyatının gün içinde saniyeler içinde yukarı veya aşağı yönlü hareket etmesinin arkasındaki ana lokomotif mekanizma nedir?
  - (a) Borsa İstanbul yönetim kurulunun piyasa hacmini artırmak için fiyat kademelerini yapay olarak aşağı yukarı oynatması
  - (b) Şirket finans müdürlerinin o sabah kasaya giren nakit miktarına göre yeni bir hisse fiyatı belirleyip sisteme girmesi
  - (c) Canlı piyasadaki alıcıların alım iştahı (talep) mi yoksa satıcıların nakde geçme isteği (arz) mi arasındaki anlık denge değişimi ✓

**Final S4:** **Soru:** Borsanın genel makro ekonomi ve şirketler dünyası içindeki en temel varlık sebebi aşağıdakilerden hangisidir?
  - (a) Şirketlerin yeni yatırımları için banka kredisi yerine sermaye bulmasını, birikimlerin de üretime ortak olmasını sağlamak ✓
  - (b) Hisse fiyatlarının her gün tamamen sabit kalmasını sağlayarak piyasadaki tüm yatırım risklerini yasal olarak sıfırlamak
  - (c) Ülkedeki tüm büyük ticari şirketlerin finansal yönetimini tek bir yasal devlet merkezi üzerinden idare etmek

**Final S5:** **Soru:** Borsada işlem gören bir şirketin yasal olarak 'şeffaf olmak' zorunda olması yatırımcıya ne fayda sağlar?
  - (a) Şirketin tüm üretim detaylarını, patent formüllerini ve ticari sırlarını rakiplerine tamamen açmasını zorunlu kılar
  - (b) Yatırımcıların şirketin finansal tablolarını, kâr/zarar durumunu ve gelecek planlarını açıkça görerek bilinçli karar vermesini sağlar ✓
  - (c) Şirket hisselerinin sadece belirli aracı kurumlar tarafından çok özel fiyatlarla alınıp satılmasına imkan tanır

**Final S6:** **Soru:** Bilinçli bir yatırımcı portföyüne bir hisse eklemeden önce ekrandaki anlık fiyat hareketlerinden ziyade öncelikle neye odaklanmalıdır?
  - (a) Sosyal medya gruplarında o hisse hakkında yapılan en son popüler ve heyecanlı yorum dalgalarına
  - (b) Hissenin borsa kodunun akılda kalıcı olmasına ve grafik ekranındaki renginin yeşil kalma süresine
  - (c) Arkadaki şirketin gerçek hayattaki üretim gücüne, ne sattığına, kurumsal hikayesine ve büyüme potansiyeline ✓

**Final S7:** **Soru:** Bir şirketin yıl boyunca çalışıp üreterek elde ettiği net kârın bir kısmını, ortaklarına payları oranında nakit para olarak dağıtmasına ne ad verilir?
  - (a) Tahvil Faizi
  - (b) Temettü (Kâr Payı) ✓
  - (c) Bedelsiz Lot

**Final S8:** **Soru:** Hisse senedi sahiplerinin yılda en az bir kez resmi olarak bir araya gelip şirketin yönetimini denetlediği kurumsal yapı hangisidir?
  - (a) Borsa İstanbul Meclisi Toplantıları
  - (b) Yönetim Kurulu Özel Oturumu
  - (c) Genel Kurul Toplantısı ✓

**Final S9:** **Soru:** Finansal okuryazarlıkta, bir hisse senedi fiyatının uzun vadede kalıcı ve istikrarlı olarak yükselmesini sağlayan asıl lokomotif güç nedir?
  - (a) Şirketin ticari operasyonlarındaki kalıcı başarısı, kârlılık büyümesi ve pazar payını genişletmesi ✓
  - (b) Aracı kurumların ve büyük fon yöneticilerinin o hissenin fiyatını sürekli yukarıda tutmak için yaptığı yapay anlaşmalar
  - (c) Şirketin borsa endeksindeki harf sıralamasında en üst sıralarda yer alması ve popüler kalması

**Final S10:** **Soru:** Borsada parayı tek bir şirkete bağlama hatasından kaçınmak için kullanılan, riski farklı sektörlere dağıtma stratejisinin adı nedir?
  - (a) Portföy Rebalansı (Dengeleme)
  - (b) Kredili İşlem Yönetimi
  - (c) Çeşitlendirme (Sepet Yapmak) ✓

**Final S11:** **Soru:** Traderlık ve uzun vadeli yatırımcılık rolleri finans dünyasında felsefi olarak karşılaştırıldığında hangisi en doğru yaklaşımdır?
  - (a) İkisi de kendi kuralları, analiz araçları ve disiplin süreçleri olan son derece profesyonel ve saygın finansal yollardır ✓
  - (b) Yatırımcılık araştırmaya dayalı profesyonel bir yöntemken, traderlık tamamen grafik şansına güvenen bir borsa oyunudur
  - (c) Traderlar kısa vadeli işlemler yaptıkları için SPK kanunlarından ve yasal denetim zırhından tamamen muaftırlar

**Final S12:** **Soru:** Ders 3'ün ana alt başlığı olarak mühürlediğimiz, bu iki rolü birbirinden ayıran o meşhur finansal tanım hangisidir?
  - (a) Finansal Güç: Büyük Sermayeli Dev Yapılar mı, Küçük Bütçeli Tasarruflar mı?
  - (b) Zaman Ufku: Uzun Vadeli Değer mi, Günlük Alım Satım mı? ✓
  - (c) Yasal Güvence: Devlet Korumalı MKK Sistemi mi, Serbest Piyasa Boşluğu mu?

**Final S13:** **Soru:** Bir traderın, piyasadaki anlık fiyat düşüşlerinde olası büyük zararlarını baştan sınırlandırmak için kullandığı en önemli disiplin aracı hangisidir?
  - (a) Limitli Alım Talimatı
  - (b) Zincir Emir Kurgusu
  - (c) Stop-Loss (Zarar Kes) Kuralı ✓

**Final S14:** **Soru:** Şirketlerin finansal mutfağına giren; bilançoları, kârlılık oranlarını, borç yapısını ve büyüme vizyonunu inceleyen analiz dalına ne ad verilir?
  - (a) Teknik Analiz
  - (b) Kademe Derinliği Analizi
  - (c) Temel Analiz ✓

**Final S15:** **Soru:** Fiyat grafiklerini, mum formasyonlarını, matematiksel göstergeleri ve hacim kırılımlarını inceleyerek doğru zamanlamayı yakalamaya çalışan bir profesyonel hangi analiz yöntemini kullanır?
  - (a) Sektörel Temel Analiz
  - (b) Teknik Analiz ✓
  - (c) Kamuyu Aydınlatma Raporlaması

**Final S16:** **Soru:** Moono çıraklık seviyesinin başında olan bir yatırımcı adayına öncelikle uzun vadeli ortaklık vizyonunun tavsiye edilmesinin rasyonel sebebi nedir?
  - (a) Borsa İstanbul kurallarına göre kısa vadeli günlük alım satım işlemlerinin çıraklara yasal olarak yasaklanmış olması
  - (b) Günlük alım satım dünyasının, henüz çıraklık seviyesinde tam inşa edilmemiş olan ileri teknik analiz bilgisi ve saniyelik psikoloji yönetimi kasları gerektirmesi ✓
  - (c) Uzun vadeli beklemeyi seçen bir yatırımcının borsada hiçbir zaman fiyat düşüşü riskiyle karşılaşmayacağı gerçeği

**Final S17:** **Soru:** Yatırımdan kazanılan nakit temettülerin veya kârların harcanmayıp yeniden aynı yatırıma dönüştürülerek yaratılan o meşhur kartopu etkisinin adı nedir?
  - (a) Nominal Büyüme Oranı
  - (b) Likidite Akış Gücü
  - (c) Bileşik Getirinin Gücü ✓

**Final S18:** **Soru:** Borsada şans faktörünün kalıcı finansal başarı üzerindeki etkisi hakkında aşağıdakilerden hangisi bilimsel bir gerçektir?
  - (a) Şansa ve tüyolara dayalı plansız işlemler, borsa rolü ne olursa olsun uzun vadede mutlak kayıpla sonuçlanır ✓
  - (b) Şans her şeydir; borsa endeksindeki en doğru hisseyi sadece güçlü sezgileri olanlar tahmin edebilir
  - (c) Sadece günlük alım satım yapan traderlar şans kullanır; uzun vadeli yatırımcıların analiz yapması yeterlidir

**Final S19:** **Soru:** Başka bir ana mesleği olan, gün içinde yoğun çalışan ve ekran başında saniyeleri izleyecek vakti kısıtlı bir kişi için en ideal borsa yaklaşımı hangisidir?
  - (a) Kredili limitler kullanarak gün içinde saniyelik fiyat dalgalanmalarından hızlı kârlar yakalamaya çalışmak
  - (b) Ortaklık bilinciyle güçlü, kârlı şirketleri seçip arkasına yaslanan uzun vadeli değer yatırımcılığı ✓
  - (c) Sadece borsa endekslerinin dışındaki çok küçük ve işlem hacmi sığ şirketlerde günlük al-sat kovalamak

**Final S20:** **Soru:** Senaryo: X şirketi çok güçlü bir ihracat anlaşması açıkladı ve traderlar grafikteki kırılımı görüp saniyeler içinde işleme girdi. Aynı anda uzun vadeli bir yatırımcı da bu gelişmeyi okudu. Bu iki profesyonelin hamle stratejisi nasıl olmalıdır?
  - (a) Trader anlık fiyat dalgasından kârını alıp disiplinli stop kurallarıyla ayrılırken; yatırımcı şirketin büyüme ivmesine ortak olarak uzun vadeli pay biriktirmeye devam eder ✓
  - (b) Yatırımcı panikle elindeki tüm hisseleri traderlara satıp nakde geçmeli; trader ise şirketin yönetim kuruluna girmek için hisseleri sonsuza kadar saklamalıdır
  - (c) İki profesyonel de serbest piyasa koşullarını bozduğu için SPK tarafından gözetim cezası almayı bekleyip tüm işlemlerini anında iptal etmelidir

---

## DERS: Borsa İstanbul ve Güvenlik (lesson_id=30, unit_id=1)
*Borsa İstanbul'un işlevi*

#### Adım 1 — READ · Borsa İstanbul’un Güvenlik Duvarı

Ortak, borsaya adım atarken en çok duyulan korku 'Param ya buhar olursa, şirket veya aracı kurum batarsa ne olur?' sorusudur. Panik yok.

Borsa İstanbul başıboş, kuralsız bir dijital alan değildir. Sermaye Piyasası Kurulu (SPK), tüm oyuncuların ve şirketlerin kurallara uymasını sağlayan en üst yasal hakem ve otoritedir.

Yani buradaki en büyük koruma kalkanın bizzat devletin yasal güvencesidir.

#### Adım 2 — READ · MKK ve Takasbank: Dijital Kasa

Hisselerini aldığın aracı kurum veya banka batarsa ortaklığın yok olur mu? Kesinlikle hayır! Çünkü hisselerin o kurumun kasasında veya insafında durmaz.

Satın aldığın her bir pay, Merkezi Kayıt Kuruluşu (MKK) bünyesinde doğrudan senin T.C. kimlik numaranla dijital olarak mühürlenir. Nakit varlıkların ise devlet denetimindeki Takasbank güvencesinde saklanır.

Aracı kurumlar sadece birer köprüdür; varlıkların yasal bir zırhla korunur.

#### Adım 3 — READ · Yatırımcı Tazmin Merkezi (YTM)

Diyelim ki bir aracı kurum hakkında yasal tasfiye kararı çıktı. Devlet, Yatırımcı Tazmin Merkezi (YTM) aracılığıyla yatırımcıların haklarını koruma altına alır.

Hisse senedi yatırımlarından doğan nakit ve varlık talepleriniz, kanunla belirlenen limitler dahilinde devlet güvencesiyle tazmin edilir. Yani sistem bütünüyle zırhlıdır.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** MKK

**Arka:** Yatırımcıların borsa hisselerinin kendi adlarına dijital olarak kaydedildiği ve güvenle saklandığı devlet denetimindeki resmi kuruluştur.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Borsadan satın aldığın hisse senetleri gerçekte nerede ve nasıl korunur?
  - (a) İşlem yaptığın aracı kurumun kendi ticari kasasında nakit teminat olarak tutulur
  - (b) MKK nezdinde adınıza dijital mühürle kaydedilir ve nakitler Takasbank güvencesinde saklanır ✓
  - (c) Borsa İstanbul binasındaki fiziksel çelik kasalarda hisse senedi kağıdı olarak depolanır

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Borsa İstanbul'da gerçekleşen tüm alım-satım işlemleri ____ şeffafça yürütülür.
  - (a) aracı kurumların inisiyatifinde
  - (b) SPK denetimi ve yapay zeka destekli gözetim altında ✓
  - (c) tamamen serbest piyasa boşluğunda

#### Adım 7 — READ · Kamuyu Aydınlatma Zorunluluğu

Borsadaki şirketler kafalarına göre bilgi gizleyemez. Her şirket, finansal durumunu, yeni yatırımlarını veya yönetim değişikliklerini tüm kamuyu eş zamanlı bilgilendirerek paylaşmak zorundadır.

Bu şeffaflık kuralı, içeriden bilgi sızdırılarak küçük yatırımcının mağdur edilmesini engeller. Herkes masada eşit bilgiye sahiptir.

#### Adım 8 — READ · Takasbank’ın Güvence Rolü

Takasbank, sadece paranı saklamaz; aynı zamanda borsadaki takas işlemlerinin güvenle sonuçlanmasını garanti eder. Alıcının parasını satıcıya, satıcının hissesini alıcıya ulaştıran merkezi bir kurumdur.

Bu sistem sayesinde taraflardan biri yükümlülüğünü yerine getirmese bile sistem tıkanmaz, paranızın üstüne yatılamaz.

#### Adım 9 — READ · Yapay Zekalı Gözetim Sistemleri

Borsa İstanbul, sadece yasalara değil, çok gelişmiş teknolojik sistemlere de sahiptir.

Piyasadaki tüm emirler, fiyat hareketleri ve alım-satım işlemleri yapay zeka destekli gözetim sistemleri tarafından saniye saniye taranır. Olağan dışı bir fiyat şişirme veya şüpheli işlem tespit edildiğinde sistem anında alarm verir.

Kurallı, şeffaf ve korunaklı bir pazarda olmanın güveniyle yatırım yapabilirsin.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Takasbank

**Arka:** Borsadaki para ve menkul kıymet takasını gerçekleştiren, nakit varlıkları güvence altında saklayan merkezi kuruluştur.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** İşlem yaptığın aracı kurum yasal olarak tasfiye edilirse varlıklarına ne olur?
  - (a) Hisseleriniz MKK'da adınıza mühürlü olduğundan, brassica başka bir kuruma taşınarak yasal olarak korunur ✓
  - (b) Varlıklar tasfiye edilen kurumun borçlarını ödemek için mahkemece haczedilir
  - (c) Varlıkların tümü Borsa İstanbul yönetimine hibe edilir

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Borsadaki şirketlerin tüm finansal ve kurumsal gelişmelerini halka açıklamak zorunda olmasına ____ denir.
  - (a) ticari sır saklama hakkı
  - (b) kamuyu aydınlatma zorunluluğu ✓
  - (c) şirket içi denetim muafiyeti

#### Adım 13 — READ · Senaryo: Şüpheli İşlem Karşısında Sistem

Bir hissede yapay bir şekilde, hiçbir mantıklı sebep veya haber yokken fiyatı üst üste tavan serilerine götüren şüpheli işlemler başladı. Borsa İstanbul gözetim robotları bunu anında fark eder.

İlk adım olarak o hisseye brüt takas veya kredili işlem yasağı gibi tedbirler gelir. Gerekirse işlemler durdurulur Genel Güvenlik sağlanır.

#### Adım 14 — READ · Yasal Hakem: SPK Kanunları

SPK, piyasada manipünan veya içeriden hatalı bilgiyle haksız kazanç sağlamaya çalışan kişilere karşı hapis cezasına varan ağır yaptırımlar uygular.

Borsa kurallarla korunan kurumsal bir ekosistemdir ve her kural küçük yatırımcının masadaki hakkını büyük fonlara karşı korumak için tasarlanmıştır.

#### Adım 15 — READ · Dersin Özeti: Güvenli Liman

Özetle ortak; Borsa İstanbul’da yatırım yaparken paran veya hissen sahipsiz değildir. Aracı kurumlar batabilir, isimler değişebilir ama mülkiyetin devlet zırhı altındadır.

Senin tek yapman gereken spekülatif tuzaklardan uzak durup, yasal sistemin güveniyle sağlam şirket biriktirmektir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** SPK

**Arka:** Sermaye piyasalarının güvenilir, şeffaf ve kararlı bir ortamda işleyişini denetleyen en üst yasal kamu kurumudur.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Borsa İstanbul gözetim sistemleri olağan dışı bir fiyat hareketi saptadığında ilk olarak ne yapar?
  - (a) Hissedeki tüm ortaklık haklarını kalıcı olarak iptal eder
  - (b) Piyasayı korumak amacıyla brüt takas veya işlem yasağı gibi yasal tedbirler uygular ✓
  - (c) Şirketin tüm fabrikalarını mühürleyerek üretimi durdurur

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Yatırımcıların uğrayabileceği yasal kurum tasfiye zararlarını karşılamak amacıyla kurulan devlet güvencesindeki merkeze ____ denir.
  - (a) Merkez Bankası Kasası
  - (b) Yatırımcı Tazmin Merkezi (YTM) ✓
  - (c) Borsa Dayanışma Fonu

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste Borsa İstanbul'un hukuki ve dijital güvenlik zırhını inceledik. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders4.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Borsada işlemlerin yasal ve şeffaf yürütülmesini sağlayan en üst otorite hangisidir?
  - (a) Bankalar Birliği Komitesi
  - (b) SPK (Sermaye Piyasası Kurulu) ✓
  - (c) Borsa Aracı Kurumlar Derneği

**Final S2:** **Soru:** Satın aldığınız borsa hisseleri yasal olarak nerede saklanır?
  - (a) MKK (Merkezi Kayıt Kuruluşu) nezdinde adınıza dijital mühürle ✓
  - (b) İşlem yapılan aracı kurumun yerel sunucularında
  - (c) Yatırımcının kendi bankasındaki vadesiz hesap havuzunda

**Final S3:** **Soru:** Borsadaki nakit varlıklarınızın saklanma güvencesi hangi kuruma aittir?
  - (a) Darphane Genel Müdürlüğü
  - (b) Takasbank ✓
  - (c) Maliye Bakanlığı Kasası

**Final S4:** **Soru:** İşlem yaptığınız aracı kurum iflas ederse hisse senetlerinize ne olur?
  - (a) Kurumun borçları için icra yoluyla tamamen tasfiye edilir
  - (b) MKK'da adınıza kayıtlı olduğundan başka bir kuruma aktarılarak korunur ✓
  - (c) Devlet tarafından kamulaştırılarak geri alınamaz hale gelir

**Final S5:** **Soru:** Borsa İstanbul gözetim sistemleri piyasayı nasıl izler?
  - (a) Yapay zeka destekli altyapıyla tüm emir ve hareketleri anlık tarayarak ✓
  - (b) Sadece gün sonunda manuel olarak gönderilen raporları kontrol ederek
  - (c) Yalnızca yatırımcılardan gelen şikayet dilekçelerini inceleyerek

**Final S6:** **Soru:** Şirketlerin finansal verilerini halka açıklama zorunluluğunun temel amacı nedir?
  - (a) Şirketlerin kurumlar vergisi oranlarını yapay olarak artırmak
  - (b) Küçük yatırımcıyı korumak ve piyasada tam şeffaflık sağlamak ✓
  - (c) Borsa İstanbul'un toplam işlem hacmini kontrol altında tutmak

**Final S7:** **Soru:** Yatırımcı Tazmin Merkezi (YTM) hangi durumlarda devreye girer?
  - (a) Aracı kurumların yasal tasfiyesi durumunda yatırımcı haklarını kanuni limitlerle tazmin etmek için ✓
  - (b) Hisse senedi fiyatı her düştüğünde yatırımcının zararını karşılamak için
  - (c) Şirketler yıllık temettü ödemesi yapmayı reddettiğinde hukuiki takip için

**Final S8:** **Soru:** Borsada olağan dışı, yapay fiyat hareketlerine karşı uygulanan ilk yasal tedbirlerden biri hangisidir?
  - (a) Şirket yönetim kurulu üyelerini görevden uzaklaştırmak
  - (b) Hisseye brüt takas veya kredili işlem yasağı gibi kısıtlamalar getirmek ✓
  - (c) Hissenin borsa kodunu kalıcı olarak piyasadan silmek

**Final S9:** **Soru:** Aracı kurumların borsa ekosistemindeki gerçek rolü nedir?
  - (a) Varlıkların mülkiyet haklarına bizzat sahip olan ana merkezlerdir
  - (b) Yatırımcı ile borsa arasında alım-satım emirlerini ileten yasal köprülerdir ✓
  - (c) Hisse fiyatlarını serbest piyasadan bağımsız olarak tek başlarına belirleyen otoritelerdir

**Final S10:** **Soru:** Bu dersin yatırımcıya kazandırmak istediği temel güvence mesajı hangisidir?
  - (a) Borsa İstanbul kurallarla yönetilen, varlıklarınızın devlet zırhıyla korunduğu güvenli bir pazardır ✓
  - (b) Borsada riskler çok yüksek olduğundan yasal kurumlar yatırımları koruyamaz
  - (c) Sistem her an çökebileceği için hisseleri her gün nakde çevirmek gerekir

---

## DERS: Endeksler (lesson_id=31, unit_id=1)
*Piyasanın termometresi*

#### Adım 1 — READ · Piyasanın Termometresi: Endeksler

Haberlerde sıkça 'Borsa bugün rekor kırdı' veya 'Endeks düştü' sözlerini duyarsın. Peki nedir bu endeks?

Endeks, belirli kriterlere göre seçilmiş bir grup hissenin toplu performansını ölçen finansal bir termometredir.

Tek tek yüzlerce şirketi incelemek yerine, endekse bakarak piyasanın genel havası, yönü ve yatırımcı iştahı hakkında saniyeler içinde fikir sahibi olabilirsin.

#### Adım 2 — READ · BIST 100 ve BIST 30 Nedir?

Borsa İstanbul’un en meşhur iki termometresi vardır: BIST 100 ve BIST 30.

BIST 100, borsada işlem gören en büyük ve en hacimli 100 şirketin ortalama performansını temsil eder. Borsanın ana göstergesidir.

BIST 30 ise Türkiye’nin en devasa, mali yapısı en güçlü ve en likit 30 devini kapsar. Fırtınalara karşı en dayanıklı olanlar genelde bu gruptadır.

#### Adım 3 — READ · Endeks Yükselirken Her Hisse Yükselir mi?

En çok yapılan yanılgılardan biri şudur: 'BIST 100 endeksi yüzde 2 yükseldi, o zaman benim hissem de kesin yükselmiştir.'

Hayır ortak, endeks bir ortalamadır. Bazı dev şirketlerin çok yükselmesi endeksi yukarı taşırken, senin şirketin o gün özel bir nedenden dolayı düşüyor olabilir.

Endeks sana genel hava durumunu verir, ama senin kendi bahçene (hissene) ayrıca bakman gerekir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** BIST 100

**Arka:** Borsa İstanbul’da işlem gören, piyasa değeri ve işlem hacmi en yüksek 100 şirketin ortak performans ölçüsüdür.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** BIST 100 endeksinin o günü yükselişle kapatması tam olarak neyi ifade eder?
  - (a) Endeksteki 100 şirketin tamamının o gün mutlaka değer kazandığı anlamına gelir
  - (b) Seçilmiş o 100 şirketin ağırlıklı genel performans ortalamasının yukarı yönde olduğunu gösterir ✓
  - (c) Borsadaki tüm şirketlerin fiyatlarının devlet tarafından yukarı çekildiğini ifade eder

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: BIST 100 endeksi hızlı yükselirken, senin portföyündeki tek bir hisse ____.
  - (a) kesinlikle aynı yönde hareket etmek zorundadır
  - (b) endeks ortalamasından bağımsız kendi hikayesini fiyatlayabilir ✓
  - (c) endeks yükselirken yapısal olarak asla düşemez

#### Adım 7 — READ · Ağırlık Esası: Büyüklerin Etkisi

Endeks hesaplanırken her şirketin etkisi aynı değildir. Şirketin piyasa değeri ne kadar devasaysa, endeks üzerindeki ağırlığı da o kadar fazladır.

Örneğin, BIST 30'daki çok büyük bir holding veya dev bir havayolu şirketi %5 yükseldiğinde, küçük 10 şirket düşse bile endeks yukarı gidebilir. Bu yüzden endeks hareketlerini doğru okumak gerekir.

#### Adım 8 — READ · Sektörel Endeksler

Borsa İstanbul'da sadece genel endeksler yoktur. Sektörleri ölçen özel termometreler de vardır: BIST Banka, BIST Teknoloji, BIST Gıda gibi.

Eğer ülkede teknoloji sektöründe genel bir canlanma varsa, BIST Teknoloji endeksi dik bir yükseliş gösterir. Bu, hangi sektörün canlı olduğunu anlamanın en kolay yoludur.

#### Adım 9 — READ · Endekse Göre Konum Almak

Bilinçli bir yatırımcı endeksi bir rehber olarak kullanır. Eğer endeks tarihi zirvelerindeyse, alım yaparken daha seçici ve temkinli olur.

Endeks genel bir panikle sert düştüğünde ise, sağlam şirketlerin fiyatlarının haksız yere ucuzlayıp ucuzlamadığını kontrol eder. Endeks bizim haritamızdır.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** BIST 30

**Arka:** Borsa İstanbul'da işlem gören, mali yapısı en güçlü ve işlem hacmi en devasa 30 şirketin performansını ölçen endekstir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Şirketlerin endeks üzerindeki etki gücü neye göre belirlenir?
  - (a) Şirketlerin halka açık piyasa değerlerine ve endeksteki ağırlık oranlarına göre ✓
  - (b) Şirketlerin borsaya kayıt olma tarihi önceliğine göre
  - (c) Şirket yönetim binasının fiziksel büyüklüğüne ve lot sayılarına göre

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Belirli bir iş koluna ait şirketlerin performansını topluca görmek için ____ takip edilmelidir.
  - (a) genel BIST 100 ana endeksi
  - (b) ilgili sektörel endeksler (BIST Banka, Teknoloji vb.) ✓
  - (c) en ucuz fiyatlı hisse senedi listesi

#### Adım 13 — READ · Senaryo: Endeks Çakılırken Doğru Duruş

Küresel bir kriz haberiyle BIST 100 endeksi o gün %4 düştü. Ekran kıpkırmızı. Panik yatırımcı her şeyi satıp kaçmak ister.

Moono yatırımcısı ise sakin kalır: 'Endeks düştü çünkü büyük fonlar nakde geçiyor. Ama benim ortak olduğum gıda şirketi hala satış yapıyor ve kâr ediyor' diyerek haritayı doğru yorumlar.

#### Adım 14 — READ · Hisse Seçiminde Endeks Filtresi

Yeni başlayan biri için BIST 100 veya BIST 30 dışındaki çok küçük şirketlere yatırım yapmak yüksek risk taşır. Çünkü o şirketlerin işlem hacmi düşüktür ve fiyatları çok sert dalgalanabilir.

Ana endekslerdeki dev yapılara ortak olmak, çıraklık döneminde en güvenli limandır.

#### Adım 15 — READ · Dersin Özeti: Haritayı Okumak

Özetle ortak, endeks borsanın hava durumudur. Hava yağmurlu (endeks düşüyor) diye evini satmazsın, sadece şemsiyeni alırsın.

Piyasanın genel yönünü endeksle oku, ama yatırım kararını her zaman şirketinin kendi kalitesine göre ver.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Sektörel Endeks

**Arka:** Aynı iş kolunda (enerji, teknoloji, gıda vb.) faaliyet gösteren şirketlerin hisse performanslarını ölçen özel endeks gruplarıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Yeni başlayan bir yatırımcının öncelikle BIST 30 veya BIST 100 şirketlerini seçmesi neden daha sağlıklıdır?
  - (a) Bu şirketlerin hisse fiyatları devlet tarafından yasal olarak sabitlendiği için
  - (b) Mali yapıları güçlü, işlem hacimleri yüksek ve sert dalgalanmalara karşı daha dayanıklı oldukları için ✓
  - (c) Bu şirketlerin genel kurullarına katılmak yasal olarak zorunlu olduğu için

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Endeks genel bir panikle sert düştüğünde, bilinçli bir yatırımcı ____.
  - (a) tüm hisselerini zararına satıp borsayı kalıcı olarak bırakır
  - (b) şirketlerinin temel sağlamlığını kontrol edip sakin kalır ✓
  - (c) en hızlı yön değiştiren sığ hisselere borçla giriş yapar

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste borsa endekslerini ve BIST 100'ün gerçek anlamını çözdük. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders5.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Borsada 'Endeks' kavramı temel olarak neyi ifade eder?
  - (a) Şirketlerin yıllık net kâr oranlarının kurumsal sıralamasını
  - (b) Belirli kriterlere göre seçilmiş hisse grubunun toplu performans ölçüsünü ✓
  - (c) Aracı kurumların uyguladığı maksimum komisyon limit oranını

**Final S2:** **Soru:** Türkiye borsasının ana göstergesi kabul edilen ana endeks hangisidir?
  - (a) BIST Banka Endeksi
  - (b) BIST 100 ✓
  - (c) BIST Temettü Endeksi

**Final S3:** **Soru:** BIST 30 endeksi hangi şirketleri kapsamına alır?
  - (a) Borsaya son 30 gün içinde dahil olan yeni halka arzları
  - (b) Piyasa değeri ve işlem hacmi en yüksek, en güçlü 30 dev şirketi ✓
  - (c) Sadece teknoloji ve yazılım sektöründe üretim yapan 30 firmayı

**Final S4:** **Soru:** BIST 100 endeksi %1 yükseldiğinde portföyünüzdeki bir hisse neden düşebilir?
  - (a) Endeks yükselirken tüm küçük hisseler yasal olarak düşmek zorunda olduğu için
  - (b) Endeks bir ortalamadır ve hisseniz o gün kendi özel hikayesini fiyatlıyor olabilir ✓
  - (c) Borsa yönetimi hissenizin yükseliş hakkını o gün özel olarak askıya aldığı için

**Final S5:** **Soru:** Bir şirketin endeks değerini etkileme gücü temel olarak neye bağlıdır?
  - (a) Halka açık piyasa değerine ve endeks hesaplamasındaki ağırlığına ✓
  - (b) Şirketin toplam kurumsal çalışan ve fabrika sayısına
  - (c) Hisse senedinin borsa kodundaki harf önceliği sıralamasına

**Final S6:** **Soru:** Sadece bankacılık sektöründeki hisselerin durumunu görmek isteyen biri hangisine bakmalıdır?
  - (a) BIST 30 genel endeksine
  - (b) BIST Banka sektörel endeksine ✓
  - (c) Günün en çok işlem gören hisseler listesine

**Final S7:** **Soru:** Endeks genel bir panikle sert düştüğünde Moono tarzı bir yatırımcı ne yapar?
  - (a) Sakin kalır, ortak olduğu şirketin temel mali sağlamlığını inceler ✓
  - (b) Hemen tüm ortaklıklarını panikle satıp nakit mevduata geçer
  - (c) Borsa sistemine siber müdahale edilerek işlemlerin geri alınmasını bekler

**Final S8:** **Soru:** Ana endekslerin (BIST 30/100) dışındaki çok küçük şirketlerin temel riski nedir?
  - (a) Bu şirketlerin devlet tarafından yasal olarak denetlenmiyor olması
  - (b) Düşük işlem hacmi nedeniyle fiyatlarının çok sert ve spekülatif dalgalanabilmesi ✓
  - (c) Temettü dağıtmalarının Borsa İstanbul tarafından yasal olarak yasaklanması

**Final S9:** **Soru:** Bilinçli bir yatırımcı için endeks ne anlam ifade eder?
  - (a) Kesin alım-satım sinyalleri üreten tek finansal veri kaynağıdır
  - (b) Piyasanın genel yönünü ve hava durumunu gösteren bir haritadır ✓
  - (c) Hisselerin taban fiyatını sabitleyen kurumsal bir yasal sistemdir

**Final S10:** **Soru:** Bu dersin ana fikri aşağıdakilerden hangisidir?
  - (a) Endeks piyasanın genel rehberidir, ancak nihai başarı tek tek doğru şirkete ortak olmaktan geçer ✓
  - (b) Endeks yükseliyorsa borsa içerisindeki tüm şirketler kusursuz yapıdadır
  - (c) Yatırımcılar sadece endeks kontratı almalı, asla bireysel hisse senedi seçmemelidir

---

## DERS: Fiyat Nasıl Oluşur? (lesson_id=53, unit_id=1)
*Arz, talep ve denge noktası*

#### Adım 1 — READ · Arz ve Talep: Görünmez Terazi

Borsada bir hissenin fiyatı saniyeler içinde neden değişir? Arkada gizli bir el mi var? Hayır ortak, her şey görünmez bir terazide belirlenir: Arz ve Talep.

Alıcılar (talep) satıcılardan daha istekli ve aceleciyse fiyat yukarı fırlar. Nakde geçmek isteyen satıcılar (arz) alıcılardan daha çoksa fiyat aşağı kayar.

En son gerçekleşen alım-satım işlemi, o anki piyasa fiyatını mühürler.

#### Adım 2 — READ · Tahta Derinliği: Alıcı ve Satıcı Kuyruğu

Uygulamalarda 'Derinlik' veya 'Kademe' denilen bir yapı göreceksin. Bunu bir mağaza kuyruğu gibi düşünebilirsin.

Üst tarafta 'Şu fiyattan satmaya hazırım' diyen satıcıların sırası, alt tarafta ise 'Şu fiyata düşerse alırım' diyen alıcıların emirleri bekler.

Bu iki kuyruktaki insanların psikolojisi, hızı ve emir adetleri fiyatın anlık yönünü çizer.

#### Adım 3 — READ · Haberler Teraziyi Nasıl Bozar?

Şirket devasa bir ihracat anlaşması açıkladığında terazi aniden bozulur. Neden mi?

Çünkü o şirkete ortak olmak isteyen binlerce yeni insan (talep) kuyruğa girerken, elinde hisse olanlar 'Daha da değerlenecek' diyerek satmaktan vazgeçer (arz azalır).

Azalan mala karşı devasa talep baskısı, fiyatı tavan serilerine doğru koşturur.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Arz - Talep

**Arka:** Piyasadaki fiyat hareketlerinin temel mekanizmasıdır; talep güçlendikçe fiyatın yükselme, arz arttıkça düşme eğilimi artar.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bir hisse senedinin fiyatının gün içinde hızlıca yükselmesinin arkasındaki ana mekanizma nedir?
  - (a) Alıcıların (talep) satıcılardan (arz) çok daha agresif ve istekli şekilde öne çıkması ✓
  - (b) Şirketin yönetim kurulunun o sabah fiyatı artırma kararı alıp sisteme girmesi
  - (c) Aracı kurumların komisyon gelirlerini artırmak için fiyatları yukarı çekmesi

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Çok iyi bir şirket haberi geldiğinde fiyatın fırlaması, ____ kaynaklanır.
  - (a) canlı arz hacminin toplam talepten fazla olmasından
  - (b) yoğun talep karşısında satıcıların (arz) çekilmesi veya daha yüksek fiyat istemesinden ✓
  - (c) borsadaki yapay zeka sistemlerinin otomatik fiyat sabitleme mekanizmasından

#### Adım 7 — READ · Piyasa Fiyatı ve Değer Farkı

Fiyat, o saniye alıcı ve satıcının uzlaştığı rakamdır. Değer ise şirketin gelecekteki potansiyeli, fabrikaları ve kârlılığıdır.

Piyasa kısa vadede arz-talep çılgınlığıyla fiyatı değerinin çok üzerine çıkarabilir veya panikle çok altına indirebilir. Başarılı yatırımcı fiyat dalgalanmalarına değil, şirketin gerçek değerine odaklanır.

#### Adım 8 — READ · Likitide: Pazarın Akıcılığı

Büyük şirketlerin hisselerinde alıcı ve satıcı kuyruğu (derinlik) çok kalabalıktır. İstediğin an, saniyeler içinde hisseni satıp nakde dönebilirsin. Buna 'Yüksek Likidite' denir.

Küçük şirketlerde ise kuyruk boştur; satmak istediğinde alıcı bulamayabilirsin. Bu yüzden pazarın akıcılığı güvenliğin için kritiktir.

#### Adım 9 — READ · Serbest Piyasa Kuralları

Borsada fiyatlar serbest piyasa koşullarında oluşur. Devlet veya Borsa İstanbul doğrudan 'Bu hissenin fiyatı şu olacak' diyemez.

Ancak adil bir pazar oluşması için manipülatif emirleri engeller. Yani kurallı ama özgür bir terazi işler. Yatırımcı bu terazinin dilini öğrenmek zorundadır.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Likidite

**Arka:** Bir varlığın veya hisse senedinin fiyat kaybına uğramadan hızlıca nakit paraya dönüştürülebilme kolaylığıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Hisse senedi piyasasında 'Likidite' neden hayati bir öneme sahiptir?
  - (a) İhtiyaç anında hisseleri değer kaybı yaşamadan saniyeler içinde nakde çevirebilme imkanı sunduğu için ✓
  - (b) Şirketlerin ortaklarına daha yüksek oranda temettü ödemesini yasal olarak zorunlu kıldığı için
  - (c) Hisse fiyatlarının gün boyunca kademelerde tamamen sabit kalmasını garanti ettiği için

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Bir hissenin o anki piyasa fiyatı, emir defterindeki alıcı ve satıcı kuyruğunun ____ belirlenir.
  - (a) devlet zoruyla tavan kademesine eşitlenmesiyle
  - (b) anlık arz ve talep dengesinin uzlaşmasıyla ✓
  - (c) şirket genel müdürünün kurumsal onayıyla

#### Adım 13 — READ · Senaryo: Alıcı Kuyruğu Boşalırsa

Kötü bir sektörel haber geldi ve herkes aynı anda elindeki hisseleri satmak istiyor (arz tavan yaptı). Ancak alt kademelerde hiç alıcı yok (talep sıfır).

Bu durumda satıcılar fiyatı mecbur aşağı indirmek zorunda kalır. Fiyat, yeni bir alıcı grubu kuyruğa girene kadar taban seviyelerine doğru çekilir. İşte dengenin bozulma anı budur.

#### Adım 14 — READ · Fiyat Adımları ve Kademe Yapısı

Borsada fiyatlar rastgele rakamlarla değişmez. Hisse fiyatının seviyesine göre 1 kuruş, 2 kuruş veya 5 kuruşluk net adımlarla (kademe) hareket eder.

Her kademede bekleyen lot (hisse adedi) miktarı, o fiyat seviyesinin ne kadar güçlü bir destek veya direnç olduğunu bize gösterir.

#### Adım 15 — READ · Dersin Özeti: Teraziyi İzlemek

Özetle ortak, borsa fiyatı sihirli bir şekilde oluşmaz. Her saniye değişen rakamlar, binlerce yatırımcının kararlarının, korkularının ve beklentilerinin arz-talep terazisindeki savaşıdır.

Gerçek yatırımcı anlık terazi çılgınlıklarına kapılmadan, şirketinin değerine odaklanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Emir Defteri

**Arka:** Alıcıların ve satıcıların hangi fiyattan kaç adet hisse almak veya satmak istediklerini gösteren canlı kademe tablosudur.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Fiyat ile Değer arasındaki temel farkı en iyi anlatan ifade hangisidir?
  - (a) Fiyat ve değer serbest piyasada her zaman birbirine eşit olmak zorundadır
  - (b) Fiyat anlık arz-taleple uzlaşılan rakamdır; değer ise şirketin gerçek varlık ve potansiyelidir ✓
  - (c) Değer sadece devlet tarafından belirlenirken, fiyatı aracı kurumlar çizer

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Bir hissede satıcıların alıcılardan çok daha yoğun ve aceleci olması fiyatı ____ baskılar.
  - (a) yukarı yönde tavan serisine doğru
  - (b) aşağı yönlü taban kademesine doğru ✓
  - (c) yatay kanalda sabit kalacak şekilde

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste fiyata yön veren arz ve talep terazisinin çalışma prensibini çözdük. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders6.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Borsada hisse senedi fiyatlarının saniyeler içinde değişmesinin ana nedeni hangisidir?
  - (a) Borsa yönetiminin fiyat kademelerini manuel olarak sürekli güncellemesi
  - (b) Canlı piyasadaki anlık arz ve talep dengesinin sürekli değişmesi ✓
  - (c) Şirketlerin her saniye Kamuyu Aydınlatma Platformuna yeni bilanço göndermesi

**Final S2:** **Soru:** Bir hisseye olan 'Talep' arzdan daha güçlüyse fiyatın eğilimi ne olur?
  - (a) Yukarı yönde tırmanış gösterir ✓
  - (b) Hızla aşağı doğru çakılır
  - (c) Yatay eksende tamamen sabit kalır

**Final S3:** **Soru:** Finansal piyasalarda 'Likidite' ne anlama gelir?
  - (a) Bir varlığın fiyat kaybı yaşamadan hızlıca nakit paraya dönüştürülebilme kolaylığı ✓
  - (b) Şirketin kasasındaki nakit paranın toplam kısa vadeli borçlarına oranı
  - (c) Hisselerin yıllık dönemlerde temettü dağıtma sıklığı gücü

**Final S4:** **Soru:** Alıcı ve satıcıların bekleyen emirlerinin görüldüğü canlı tabloya ne denir?
  - (a) Geçmiş fiyat hareket grafiği
  - (b) Emir defteri / Kademe derinliği ✓
  - (c) Yıllık bilanço performans tablosu

**Final S5:** **Soru:** Fiyat ve Değer kavramları için aşağıdakilerden hangisi doğrudur?
  - (a) Fiyat anlık piyasa uzlaşmasıdır; değer ise şirketin gerçek ticari gücüdür ✓
  - (b) Fiyat her zaman şirketin gerçek değerini piyasada kusursuz yansıtır
  - (c) Değer anlık olarak değişirken fiyat sadece yıl sonunda güncellenir

**Final S6:** **Soru:** Çok büyük bir sipariş veya ortaklık haberi hisse fiyatını neden yükseltir?
  - (a) Yatırımcıların alım iştahı (talep) fırlarken satıcıların (arz) paylarını çekmesiyle ✓
  - (b) Borsa İstanbul yönetiminin fiyat adımlarını otomatik olarak tavan seviyesine çekmesiyle
  - (c) Şirket kurumsal çalışanlarının hisse satın almasının yasal olarak zorunlu hale gelmesiyle

**Final S7:** **Soru:** Düşük likiditeye sahip küçük şirketlerin temel riski nedir?
  - (a) Bu şirketlerin yasal olarak temettü dağıtmalarının yasak olması
  - (b) İhtiyaç anında alıcı bulunamadığı için hissenin nakde çevrilememesi veya sert düşmesi ✓
  - (c) SPK denetim mekanizmalarının dışına çıkarılarak korunmasız kalmaları

**Final S8:** **Soru:** Borsada fiyat kademeleri neye göre belirlenir?
  - (a) Hisse senedinin mevcut fiyat seviyesine göre belirlenmiş resmi kuruş adımlarına göre ✓
  - (b) Yatırımcının aracı kurumundaki portföy büyüklük limitine göre
  - (c) İşlem yapılan şirketin toplam kurumsal lot adedi büyüklüğüne göre

**Final S9:** **Soru:** Borsada fiyatların serbest piyasa koşullarında oluşması ne demektir?
  - (a) Fiyatların tamamen başıboş ve yasal denetim olmadan spekülatörlerce belirlenmesi
  - (b) Fiyatın devlet müdahalesi olmadan, alıcı ve satıcının rızasıyla ortak terazide netleşmesi ✓
  - (c) Tüm hisse senetlerinin yılın belirli dönemlerinde bedelsiz olarak halka dağıtılması

**Final S10:** **Soru:** Bu dersin ana fikri aşağıdakilerden hangisidir?
  - (a) Borsadaki anlık fiyatlar arz-talep savaşıdır; yatırımcı bu gürültüye değil, şirketin değerine odaklanmalıdır ✓
  - (b) Fiyatı en hızlı düşen hisseleri seçmek uzun vadede en güvenli stratejidir
  - (c) Emir defterindeki lot miktarları sadece aracı kurumların mal varlığını gösterir

---

## DERS: Ara Değerlendirme 2 (lesson_id=71, unit_id=1)
*Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 2

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Borsa İstanbul'un temel işlevi nedir?
  - (a) Alıcı-satıcıyı düzenli piyasada buluşturmak ✓
  - (b) Fiyatı sabitlemek
  - (c) Riski kaldırmak

**Final S2:** **Soru:** Endeks ne sağlar?
  - (a) Tek hisse garantisi
  - (b) Genel piyasa yönünü okumak ✓
  - (c) Kesin getiri

**Final S3:** **Soru:** BIST 100 neye daha yakındır?
  - (a) Piyasa göstergesi ✓
  - (b) Sabit fiyat listesi
  - (c) Tek şirket raporu

**Final S4:** **Soru:** Fiyat oluşumunda temel mekanizma nedir?
  - (a) Arz-talep dengesi ✓
  - (b) Yorumlar
  - (c) Renkler

**Final S5:** **Soru:** Likidite düşükse ne görülebilir?
  - (a) Fiyat daha sert oynayabilir ✓
  - (b) Fiyat sabit kalır
  - (c) Risk yok olur

**Final S6:** **Soru:** Enflasyonun temel etkisi nedir?
  - (a) Alım gücünü azaltmak ✓
  - (b) Parayı büyütmek
  - (c) Riski sıfırlamak

**Final S7:** **Soru:** Reel getiri neyi ifade eder?
  - (a) Enflasyondan arınmış kazancı ✓
  - (b) Nominal rakamı
  - (c) Tahmini getiriyi

**Final S8:** **Soru:** Yatırımın en temel rollerinden biri nedir?
  - (a) Değeri korumak ✓
  - (b) Şans beklemek
  - (c) Sadece kısa vade

**Final S9:** **Soru:** Risk yönetiminin amacı nedir?
  - (a) Riski yönetmek ✓
  - (b) Riski yok saymak
  - (c) Riski büyütmek

**Final S10:** **Soru:** Çeşitlendirme neyi azaltır?
  - (a) Portföy kırılganlığını ✓
  - (b) Öğrenmeyi
  - (c) Şeffaflığı

**Final S11:** **Soru:** Psikolojik risk örneği hangisidir?
  - (a) Panikle plansız satış ✓
  - (b) Kurala bağlı kalmak
  - (c) Dengeli dağılım

**Final S12:** **Soru:** Borsa İstanbul'da işlem ne zaman gerçekleşir?
  - (a) Uygun karşı emirle ✓
  - (b) Sadece kapanışta
  - (c) Rastgele

**Final S13:** **Soru:** Endeks yükseliyor diye hangi hata yapılmamalı?
  - (a) Tüm hisseleri aynı sanmak ✓
  - (b) Detay analiz yapmak
  - (c) Büyük resmi okumak

**Final S14:** **Soru:** Fiyat ile değer için doğru ifade hangisi?
  - (a) Kısa vadede ayrışabilir ✓
  - (b) Her zaman aynıdır
  - (c) İlişkisizdir

**Final S15:** **Soru:** Düşüş döneminde en doğru ilk refleks nedir?
  - (a) Planı kontrol etmek ✓
  - (b) Panik yapmak
  - (c) Rastgele alım

**Final S16:** **Soru:** Yüksek getiri beklentisi genelde ne taşır?
  - (a) Daha yüksek risk ✓
  - (b) Sıfır risk
  - (c) Garantili kazanç

**Final S17:** **Soru:** Yeni başlayan için uygun yaklaşım hangisi?
  - (a) Az ama anlamlı metrikle ilerlemek ✓
  - (b) Her şeyi aynı anda öğrenmek
  - (c) Sadece yorum takip etmek

**Final S18:** **Soru:** Reel düşünmenin amacı nedir?
  - (a) Gerçek alım gücünü görmek ✓
  - (b) Sadece nominale bakmak
  - (c) Enflasyonu yok saymak

**Final S19:** **Soru:** Risk yönetiminde temel üçlü hangisidir?
  - (a) Dağılım + kural + duygu kontrolü ✓
  - (b) Hız + söylenti + tahmin
  - (c) Şans + acele + panik

**Final S20:** **Soru:** Bu ara sınavın odağı hangi ders aralığıdır?
  - (a) Ders 1-6 kapsamı ✓
  - (b) Sadece seviye sonu
  - (c) Sadece teknik analiz

---

## DERS: Piyasa Döngüleri (lesson_id=54, unit_id=1)
*Yükseliş ve düşüş trendleri*

#### Adım 1 — READ · Piyasa Psikolojisi: Boğa ve Ayı

Ortak, borsanın kendine has ikonik iki canlısı vardır: Boğa ve Ayı. Bu hayvanlar piyasanın genel psikolojik havasını ve trend yönlerini temsil eder.

Efer fiyatlar uzun süredir istikrarlı bir şekilde yükseliyorsa, yatırımcılarda müthiş bir iyimserlik, coşku ve güven varsa buna 'Boğa Piyasası' denir.

Boğa, boynuzlarını aşağıdan yukarıya doğru sertçe vurarak fiyatları yukarı fırlatır.

#### Adım 2 — READ · Ayının Pençesi ve Korku Döngüsü

Bazen de tam tersi olur; makro ekonomide işler sıkışır, faizler yükselir ve piyasaya karamsarlık çöker. İşte bu uzun süreli düşüş dönemlerine 'Ayı Piyasası' diyoruz.

Ayı, dev pençesini yukarıdan aşağıya doğru vurarak fiyatları aşağı bastırır.

Bu dönemlerde mantık değil, korku hakimdir; insanlar daha da düşecek endişesiyle ellerindeki harika varlıkları bile zararına satmaya başlar.

#### Adım 3 — READ · Moono Tarzı Döngü Yönetimi

Unutma ortak, borsa sonsuza kadar yükselmediği gibi sonsuza kadar da düşmez. Piyasa bu iki döngü arasında sürekli gider gelir.

Boğa piyasasında aşırı coşkuya kapılıp plansız riskler almak ne kadar tehlikeliyse; ayı piyasasında korkuya teslim olup harika şirketleri zararına satmak da o kadar büyük bir hatadır.

Döngüleri bilmek, fırtınada sakin kalmanı sağlar.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Boğa Piyasası

**Arka:** Piyasalarda fiyatların uzun süreli bir yükseliş trendinde olduğu, yatırımcılarda iyimserlik ve coşkunun hakim olduğu dönemdir.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Finans dünyasında kullanılan 'Ayı Piyasası' ifadesi neyi tanımlar?
  - (a) Piyasadaki tüm şirketlerin iflas aşamasına geldiği kurumsal tasfiye dönemini
  - (b) Fiyatların genel olarak düşüş trendinde olduğu, korku ve karamsarlığın hakim olduğu süreci ✓
  - (c) Borsa İstanbul binasının tadilat nedeniyle işlemlere kapalı olduğu günleri

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Boğa piyasasının en belirgin psikolojik özelliği yatırımcılarda görülen ____ durumudur.
  - (a) aşırı iyimserlik ve alım coşkusu ✓
  - (b) aşırı korku ve panik satışı
  - (c) tamamen ilgisizlik ve durağanlık

#### Adım 7 — READ · Açgözlülük Tuzağı (FOMO)

Boğa piyasasının en büyük tehlikesi 'Fırsatı kaçırıyorum' hissidir, yani FOMO. Fiyatlar her gün yükselirken, çevredekilerin kazandığını gören kişi araştırmadan en tepeden borsaya atlar.

Unutma ortak, herkesin coşkuyla borsa konuştuğu anlar genelde riskin en yüksek olduğu, Boğa döngüsünün sonuna yaklaşılan anlar olabilir.

#### Adım 8 — READ · Ayı Döneminde Değer Avcılığı

Ayı piyasası korkutucudur ama gerçek yatırımcı için bir cennettir. Çünkü panik havası nedeniyle çok kaliteli, devasa kârlar üreten şirketlerin hisseleri bile değerinin çok altına sarkar.

Bilinçli yatırımcı herkes kaçarken sakin adımlarla bu ucuz kalmış 'indirimli' dev ortaklık paylarını toplamaya başlar.

#### Adım 9 — READ · Döngülerin Kaçınılmazlığı

Ekonomiler büyür (Boğa) ve ekonomiler daralır (Ayı). Bu finansal evrenin nefes alıp verme ritmidir. Hiçbir trend sonsuza kadar sürmez.

Stratejini tek bir yöne göre kurma. Boğa piyasasında kâr realizasyonu yapmayı, ayı piyasasında ise sabırla biriktirmeyi öğrenmek gerçek ustalıktır.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Ayı Piyasası

**Arka:** Piyasalarda fiyatların uzun süreli bir düşüş trendinde olduğu, yatırımcılarda güvensizlik ve korkunun hakim olduğu dönemdir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Boğa piyasasında yatırımcıların en çok düştüğü tehlikeli tuzak hangisidir?
  - (a) Hisselerini çok erken zararına satıp nakde geçmek
  - (b) Şirket genel kurullarına katılmaktan vazgeçmek
  - (c) Fırsatı kaçırma korkusuyla (FOMO) araştırmadan en tepeden agresif alımlar yapmak ✓

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Ayı piyasasının yarattığı sert fiyat düşüşleri, uzun vadeli yatırımcılar için kaliteli şirketleri ____ dönüştürebilir.
  - (a) büyük bir risk yuvasına
  - (b) makul fiyattan maliyetlenme fırsatına ✓
  - (c) değersiz yasal kağıtlara

#### Adım 13 — READ · Senaryo: Manşetler Kararırken

Televizyonlar 'Borsada büyük çöküş', 'Yatırımcı kan ağlıyor' diye manşet atıyor (Tam bir Ayı zirvesi). Amatör yatırımcı ağlayarak zararına satış yapıyor.

Moono yatırımcısı ise açıyor bilançoyu: 'Şirketimin satışları taş gibi, borcu yok, ihracatı güçlü. Bu fiyat düşüşü şirketin hatası değil, piyasanın psikolojisi' diyerek ekrana gülümser.

#### Adım 14 — READ · Trendlerin Süresi

Birkaç günlük yükseliş piyasayı Boğa yapmaz. Gerçek bir Boğa veya Ayı piyancasından bahsetmek için fiyatların en az birkaç ay boyunca istikrarlı bir ana yöne doğru akması gerekir. Kısa dalgalanmalarla yön duygunu kaybetme.

#### Adım 15 — READ · Dersin Özeti: Hayvanlar Alemi

Özetle ortak; Boğa coşkunun ve dikkatli olmanın, Ayı ise korkunun ve sabırlı ortaklık biriktirmenin zamanıdır.

Piyasanın hangi mevsimde olduğunu anlarsan, ona uygun kıyafet giyer (strateji kurar) ve asla üşümezsin.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** FOMO

**Arka:** Piyasadaki hızlı yükselişleri ve kazanç fırsatlarını kaçırma korkusuyla plansızca kararlar alma psikolojisidir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Gerçek bir Boğa veya Ayı piyasası tespiti için aranan zaman kriteri ne olmalıdır?
  - (a) Fiyatların en az birkaç ay boyunca istikrarlı bir ana trend yönünde ilerlemesi ✓
  - (b) Hisselerin gün içindeki 10 dakikalık hareket yönü
  - (c) Şirketlerin sadece hafta başındaki açılış fiyatı yönü

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Finansal döngüler ekonominin kaçınılmaz doğasıdır; bu yüzden hiçbir yükseliş veya düşüş ____.
  - (a) devlet tarafından durdurulamaz
  - (b) küçük yatırımcıyı etkilemez
  - (c) sonsuza kadar sürmez ✓

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste piyasa psikolojisinin iki devi olan Boğa ve Ayı piyasalarını işledik. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders7.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Borsada 'Boğa Piyasası' ifadesi temel olarak neyi temsil eder?
  - (a) İşlem hacimlerinin tamamen durma noktasına geldiğini
  - (b) Fiyatların uzun süreli yükseliş trendinde olduğu iyimserlik dönemini ✓
  - (c) Şirketlerin borç yükünün arttığı kurumsal kriz anlarını

**Final S2:** **Soru:** Ayı piyasasında yatırımcılar arasında hakim olan ana duygu hangisidir?
  - (a) Korku, karamsarlık ve panik ✓
  - (b) Aşırı coşku ve özgüven
  - (c) Tamamen tepkisizlik

**Final S3:** **Soru:** Boğa piyasasında fiyatları yukarı iten metaforik hareket hangisidir?
  - (a) Ayının pençesini yukarı kaldırması
  - (b) Aracı kurumların fiyat sabitlemesi
  - (c) Boğanın boynuzlarını aşağıdan yukarıya vurması ✓

**Final S4:** **Soru:** Piyasalarda 'FOMO' tuzağına düşen bir yatırımcı ne yapar?
  - (a) Fiyatı çok düşmüş hisseleri sabırla inceler
  - (b) Fırsatı kaçırma korkusuyla en tepedeki popüler hisseye plansızca atlar ✓
  - (c) Tüm varlıklarını nakit olarak bankada bekletir

**Final S5:** **Soru:** Ayı piyasası uzun vadeli değer yatırımcıları için neden bir fırsat olabilir?
  - (a) Şirketler bu dönemde daha yüksek vergi ödediği için
  - (b) Borsa endeksi bu dönemde tamamen sıfırlandığı için
  - (c) Kaliteli ve güçlü şirketlerin payları çok ucuz fiyatlara gerilediği için ✓

**Final S6:** **Soru:** Borsada bir hareketin gerçek bir trend sayılabilmesi için asgari kriter nedir?
  - (a) En az birkaç ay boyunca istikrarlı bir ana yönde ilerlemesi ✓
  - (b) Sadece 1 günlük hızlı fiyat değişimi
  - (c) Şirket müdürünün sosyal medya açıklaması

**Final S7:** **Soru:** Piyasa döngüleri hakkında hangisi kesinlikle doğrudur?
  - (a) Boğa piyasası başladıktan sonra fiyatlar bir daha asla düşmez
  - (b) Hiçbir trend sonsuza kadar sürmez, piyasa iki döngü arasında nefes alır ✓
  - (c) Ayı piyasası sadece küçük şirketleri etkiler, devleri etkilemez

**Final S8:** **Soru:** Herkesin borsa konuştuğu ve aşırı coşkulu olduğu dönemlerde ne yapılmalıdır?
  - (a) Temkinli olunmalı, risk analizleri artırılmalı ve FOMO'dan kaçınılmalı ✓
  - (b) Tüm birikimle borç alarak borsaya girilmeli
  - (c) Hisselerin tümü satılıp borsa kalıcı olarak bırakılmalı

**Final S9:** **Soru:** Ayı piyasasında fırtınadan korunmanın en güçlü yolu nedir?
  - (a) Anlık fiyat düşüşlerine bakıp panikle zararına satmak
  - (b) Grafik takibini saniyelik seviyeye indirmek
  - (c) Ortak olunan şirketin gerçek üretim, kârlılık ve temel gücüne odaklamak ✓

**Final S10:** **Soru:** Bu dersin yatırımcıya vermek istediği ana mesaj hangisidir?
  - (a) Piyasanın psikolojik döngülerini bilmek, panik kararlardan korunarak uzun vadeli plan kurmayı sağlar ✓
  - (b) En iyi strateji, sadece Boğa piyasasında işlem yapayıp Ayı döneminde uyumaktır
  - (c) Ayı piyasasında borsa tamamen güvensiz bir kumar alanına dönüşür

---

## DERS: Sessiz Hırsız: Enflasyon (lesson_id=55, unit_id=1)
*Paranın neden uyumaması gerekir*

#### Adım 1 — READ · Sessiz Hırsız: Enflasyon

Geldik yatırım yapmamızın arkasındaki en büyük gizli düşmana: Enflasyon.

Enflasyon, cebindeki paranın miktarına dokunmadan, onun satın alma gücünü günden güne eriten sessiz bir hırsızdır. Bugün 100 TL'ye aldığın bir ürünü seneye 150 TL'ye alabiliyorsan, paran durduğu yerde değer kaybetmiştir.

Parayı nakit veya vadeli mevduatta tutmak, aslında enflasyona karşı bile bile erimeyi kabul etmektir.

#### Adım 2 — READ · Şirketler Enflasyona Nasıl Kafa Tutar?

Peki neden doğru şirketlerin hisse senetleri enflasyona karşı en güçlü koruma kalkanıdır?

Çünkü şirketler yaşayan, üreten organizasyonlardır. Enflasyon olduğunda, şirketler de ürettikleri mallara veya hizmetlere zam yaparlar; yani gelirlerini enflasyon oranında artırırlar.

Ayağını bastıkları fabrikaları, arsaları ve stokları da değer kazanır. Sen o şirkete ortak olarak paranın reel değerini korumuş olursun.

#### Adım 3 — READ · Reel Getiri: Gerçekten Kazandın mı?

Yatırımcılıkta tek bir kural vardır ortak: Enflasyonun altında kalan her getiri aslında gizli bir kayıptır.

Paran bir yılda yüzde 40 değer kazanmış olabilir, harika görünüyor değil mi? Ama o yıl ülkedeki enflasyon yüzde 50 ise, paran aslında satın alma gücü olarak yüzde 10 erimiştir.

Moono yatırımcısının hedefi sadece 'rakamsal kazanç' değil, enflasyonun üzerindeki 'Reel Getiri'dir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Enflasyon

**Arka:** Fiyatlar genel düzeyinin sürekli ve hissedilir derecede yükselmesi, dolayısıyla paranın satın alma gücünün azalmasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Doğru şirketlerin hisse senetleri neden enflasyona karşı en güçlü koruma kalkanlarından biridir?
  - (a) Ürünlerine zam yapabilme, varlıklarının değerlenmesi ve kâr büyümesini enflasyona endeksleyebilme güçleri ✓
  - (b) Devletin enflasyon dönemlerinde borsa şirketlerine vergi muafiyeti sağlaması
  - (c) Hisse senetlerinin enflasyon yükseldikçe otomatik olarak devlet garantili faiz üretmesi

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Bir yatırımın paranızın satın alma gücünü gerçekten artırabilmesi için yatırım getirisinin ____ gerekir.
  - (a) enflasyon oranıyla tam olarak aynı seviyede kalması
  - (b) enflasyon oranının üzerinde bir kazanç (reel getiri) sağlaması ✓
  - (c) sadece döviz kuru bazında sabit durması

#### Adım 7 — READ · Nakit Kalmanın Gizli Riski

Çoğu insan yatırım yapmayı riskli bulduğu için parasını nakit TL veya döviz olarak yastık altında tutar. Oysa enflasyonist bir ortamda hiçbir şey yapmamak, en büyük riskin ta kendisidir.

Nakit para, harcanmasa bile zaman karşısında eriyen bir buz kalıbı gibidir. Değer biriktirmek için parayı varlığa çevirmek zorundayız.

#### Adım 8 — READ · Fiyat Geçişkenliği Gücü

Her şirket enflasyona karşı aynı direnci gösteremez. Moono tarzı yatırımcı, 'fiyat geçişkenliği yüksek' şirketleri arar. Yani maliyetleri arttığında, ürettiği ürüne müşteri kaybetmeden rahatça zam yapabilen lider şirketler.

Bir gıda veya temel enerji devi, enflasyona küçük bir tekstil atölyesinden çok daha kolay kafa tutar.

#### Adım 9 — READ · Varlık Enflasyonu

Enflasyon sadece marketteki süt fiyatını artırmaz; şirketlerin sahip olduğu arsaların, binaların ve makine parkurlarının da nominal değerini uçurur. Şirketin yeniden kurulma maliyeti (ikame değeri) yükselir.

Bu durum, şirketinin borsadaki yasal hisse değerinin de doğal olarak yukarı doğru itilmesini sağlar.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Reel Getiri

**Arka:** Bir yatırımın getirisinden enflasyon oranı düşüldükten sonra elinizde kalan net satın alma gücü kazancıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdaki şirket türlerinden hangisi enflasyon dönemlerinde maliyet artışlarını fiyatlarına daha kolay yansıtabilir?
  - (a) Çok sert rekabetin olduğu ve ikame ürünü çok kolay bulunan küçük işletmeler
  - (b) Müşterilerin vazgeçemediği, tekel veya pazar lideri olan temel hizmet ve ürün şirketleri ✓
  - (c) Ürün fiyatları sadece devlet tarafından sabitlenmiş olan kurumlar

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Enflasyonun %60 olduğu bir ortamda paranız bir yılda %40 değer kazandıysa, paranız gerçekte ____.
  - (a) %20 satın alma gücü kaybına uğramıştır ✓
  - (b) %20 reel kâr etmiştir
  - (c) değerini tam olarak korumuştur

#### Adım 13 — READ · Senaryo: İki Arkadaşın Birikim Tercihi

Ahmet ve Mehmet'in 100.000 TL'si var. Ahmet parayı kasada nakit tutuyor. Mehmet ise Türkiye’nin en büyük perakende market zincirinin hissesini alıyor.

Bir yıl sonra enflasyon %50 oluyor. Ahmet’in parası hala 100.000 TL ama alım gücü yarı yarıya düştü. Mehmet’in ortak olduğu şirket ise raflara zam yaptığı için kârını ve hisse değerini %60 artırıyor. Kim kazandı?

#### Adım 14 — READ · Nominal ve Reel Farkı

Nominal getiri, hesabında gördüğün rakamsal artıştır. Reel getiri ise o artışın marketteki gerçek karşılığıdır. Yatırım yaparken sadece nominal rakamlara aldanmak yanıltıcıdır.

Moono arayüzünde ve zihninde her zaman reel büyümeyi sorgulamalısın.

#### Adım 15 — READ · Dersin Özeti: Sessiz Savaş

Özetle ortak; paranı korumak istiyorsan onu nakit hapis hayatından kurtarmak zorundasın.

Enflasyonla savaşmanın en şık ve yasal yolu, fiyat belirleme gücü olan dev üretim mekanizmalarına yani borsa şirketlerine ortak olmaktır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Nominal Getiri

**Arka:** Enflasyon etkisi hesaba katılmadan, bir yatırımın kağıt üzerinde, rakamsal olarak sağladığı brüt kazanç oranıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryodaki Mehmet'in enflasyona karşı kazanmasının ana sebebi aşağıdakilerden hangisidir?
  - (a) Parasını devlet bankasında faizde bekletmesi
  - (b) Aracı kurumundan özel bir prim bonusu alması
  - (c) Enflasyonist ortamda raflarına zam yaparak kârlılığını ve varlık değerini koruyan canlı bir şirkete ortak olması ✓

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Parayı hiçbir varlığa bağlamadan nakit olarak saklamak, yüksek enflasyon dönemlerinde ____ yol açar.
  - (a) risksiz bir servet büyümesine
  - (b) kesin ve garantili bir satın alma gücü kaybına ✓
  - (c) şirket hisselerinin otomatik ucuzlamasına

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste paranın azılı düşmanı enflasyonu ve borsa ile ona nasıl kafa tutabileceğimizi öğrendik. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders8.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Enflasyon kavramının yatırımcı için en doğru tanımı aşağıdakilerden hangisidir?
  - (a) Borsadaki şirket sayısının günden güne artması
  - (b) Paranın miktarını değiştirmeden, satın alma gücünü eriten sessiz süreç ✓
  - (c) Döviz kurlarının dünya genelinde sabitlenmesi

**Final S2:** **Soru:** Yatırımda 'Reel Getiri' ne anlama gelir?
  - (a) Nominal kazançtan enflasyon oranı düşüldükten sonra kalan net satın alma gücü artışı ✓
  - (b) Aracı kuruma ödenen komisyonlar brüt toplamı
  - (c) Hisseden elde edilen sadece nakit temettü miktarı

**Final S3:** **Soru:** Yüksek enflasyon döneminde nakit para biriktirmek neden büyük bir risk taşır?
  - (a) Devletin nakit paraya el koyma ihtimali olduğu için
  - (b) Nakit paranın saklama maliyetleri borsadan yüksek olduğu için
  - (c) Para harcanmasa bile günden güne reel değerini ve alım gücünü kaybettiği için ✓

**Final S4:** **Soru:** Borsa şirketleri enflasyonist baskıya gerçek hayatta nasıl direnç gösterir?
  - (a) Fiyat adımlarını sabitleyerek
  - (b) Ürün ve hizmetlerine zam yaparak gelirlerini ve varlık değerlerini reel olarak büyüterek ✓
  - (c) Tüm çalışan sayılarını yarı yarıya azaltarak

**Final S5:** **Soru:** Yatırım kazancınız %50, o yılki enflasyon ise %60 ise gerçek finansal durumunuz nedir?
  - (a) %10 satın alma gücü kaybına (zarara) uğramışsınızdır ✓
  - (b) %10 reel kâr elde etmişsinizdir
  - (c) Paranızın alım gücü tam olarak korunmuştur

**Final S6:** **Soru:** Moono yatırımcısının enflasyona karşı aradığı en önemli şirket özelliği hangisidir?
  - (a) Fiyat geçişkenliği yüksek olan, pazar lideri ve güçlü yapılara sahip olması ✓
  - (b) Borsadaki en ucuz nominal fiyata sahip olması
  - (c) Hisse kodunun kısa ve akılda kalıcı olması

**Final S7:** **Soru:** Varlık Enflasyonu borsa hisselerini nasıl etkiler?
  - (a) Şirketlerin fabrikalarının ve arsalarının değerini düşürür
  - (b) Şirketin tüm fiziki varlıklarının nominal değerini yükselterek hisse taban değerini yukarı iter ✓
  - (c) Hisselerin borsada işlem görmesini kalıcı olarak engeller

**Final S8:** **Soru:** Aşağıdakilerden hangisi nominal getiriye bir örnektir?
  - (a) Enflasyon düşüldükten sonra cebinizde kalan net alım gücü
  - (b) Satın aldığınız hisse adedinin iki katına çıkması
  - (c) Portföyünüzün kağıt üzerinde, sadece rakamsal olarak %30 büyümesi ✓

**Final S9:** **Soru:** Enflasyonun %80 olduğu bir ülkede mevduat faizinin %40 olması yatırımcıya ne yapar?
  - (a) Parasını enflasyona karşı tam koruma altına alır
  - (b) Parasını rakamsal olarak büyütürken reel olarak eritmeye devam eder ✓
  - (c) Şirket ortaklık haklarını otomatik olarak iptal eder

**Final S10:** **Soru:** Bu dersin özet mesajı aşağıdakilerden hangisidir?
  - (a) Yatırımın asıl amacı nominal rakam büyütmek değil, enflasyon üstü reel getiriyle satın alma gücünü korumaktır ✓
  - (b) Yüksek enflasyon dönemlerinde en güvenli varlık nakit Türk Lirasıdır
  - (c) Borsa şirketleri enflasyondan en çok zarar gören ve asla zam yapamayan yapılardır

---

## DERS: Risk Yönetimi (lesson_id=56, unit_id=1)
*Belirsizliği tanımak*

#### Adım 1 — READ · Risk Nedir? Korkmalı mıyız?

Ortak, hayatta risksiz hiçbir adım yok. Yatırımda risk; gelecekteki getirinin beklediğinden farklı veya eksik gerçekleşme ihtimalidir.

Riskten körü körüne korkup kaçmak yerine, onu tanımak ve akıllıca yönetmek zorundayız. Borsada iki tür risk vardır: Tüm piyasayı sarsan genel riskler ve sadece ortak olduğun şirketi vuran özel riskler.

İlkini tek başına engelleyemeyiz ama ikincisini tamamen evcilleştirebiliriz.

#### Adım 2 — READ · Çeşitlendirmenin Gücü: Sepet Mantığı

Özel riskleri yok etmenin en eski ve en sarsılmaz finansal kuralı şudur: 'Tüm yumurtaları aynı sepete koyma.'

Sadece bir teknoloji şirketinin hissesini alırsan ve o sektörde küresel bir kriz çıkarsa portföyün ağır yara alır. Ama paranı teknoloji, enerji, gıda ve otomotiv gibi farklı sektörlere dağıtırsan, biri düşerken diğeri seni dengeler.

Çeşitlendirme, yatırımcının emniyet kemeridir.

#### Adım 3 — READ · Bilgi Arttıkça Risk Azalır

Bir şeyi bilmediğinde o şey senin için devasa bir tehlikedir. Karanlık, yabancı bir odada yürümek gibi.

Borsada da kulaktan dolma tüyo ile ne yaptığını bilmeden hareket eden biri için risk yüzde yüzdür. Ama şirketin bilançosunu inceleyen, sektörü anlayan ve plan yapan biri için risk minimuma iner.

Moono’da tamamladığın her adım, o karanlık odaya yaktığın yeni bir ışıktır.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Çeşitlendirme

**Arka:** Olası zararları azaltmak amacıyla birikimleri farklı şirket, sektör veya yatırım araçları arasında dağıtma stratejisidir.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Borsada şirkete veya sektöre özel riskleri minimize etmenin en etkili finansal yolu hangisidir?
  - (a) Tüm sermayeyi en güvendiğimiz tek bir dev şirkete yatırarak beklemek
  - (b) Parayı birbiriyle ilişkisiz farklı sektörlerden güçlü şirketlere paylaştırarak sepet yapmak ✓
  - (c) Hisseleri sadece fiyat grafiğinin en çok düştüğü günlerde satın almak

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Yeni başlayanlar için borsadaki en büyük risk aslında piyasanın kendisinden değil, ____ kaynaklanır.
  - (a) ne yaptığını bilmemekten, tüyolarla plansız hareket etmekten ✓
  - (b) şans faktörünün düşük olmasından
  - (c) borsadaki toplam şirket sayısının azlığından

#### Adım 7 — READ · Sistemik Risk (Genel Piyasa Riski)

Sistemik risk, ülkedeki faiz kararları, savaşlar veya küresel salgınlar gibi tüm şirketleri aynı anda etkileyen risk türüdür. Şirketin ne kadar harika olduğu fark etmez, piyasa geneli düşerken o da düşer.

Bu risk sepet yaparak yok edilemez. Bunu yönetmenin yolu, borsaya sadece uzun vadeli ve acil ihtiyacın olmayan bir nakitle girmektir.

#### Adım 8 — READ · Sistemik Olmayan Risk (Özel Risk)

Sistemik olmayan risk ise tamamen şirkete özeldir. Fabrikada yangın çıkması, genel müdürün istifası veya hatalı bir ürün üretilmesi gibi durumları kapsar.

İşte sepet (çeşitlendirme) mantığı tam olarak bu riski sıfırlamak için vardır. Sepetindeki 5 şirketten birinin başına kötü bir şey gelse bile, diğer 4 şirket seni ayakta tutar.

#### Adım 9 — READ · Vade ile Riski Evcilleştirmek

Borsada parayı tuttuğun süre (vade) uzadıkça, karşı karşıya kaldığın risk oranı matematiksel olarak azalır. Kısa vadede grafikler çılgınca dalgalanabilir ve seni zarara uğratabilir.

Ama vadeyi 3-5 yıla yaydığında, o kısa vadeli fırtınalar sadece küçük birer dalgaya dönüşür ve şirketin büyüme gücü tüm riskleri yener.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Sistemik Risk

**Arka:** Savaş, kriz veya faiz gibi tüm piyasayı ve tüm şirketleri aynı anda etkileyen, çeşitlendirmeyle yok edilemeyen genel risktir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Savaş veya küresel ekonomik kriz gibi 'Sistemik Riskler' karşısında bir yatırımcı kendini en iyi nasıl korur?
  - (a) Teknoloji sektöründen daha fazla hisse satın alarak
  - (b) Hisselerini her gün düzenli olarak satıp geri alarak
  - (c) Borsaya sadece kısa vadede ihtiyacı olmayan, sabırla bekletebileceği bir tasarrufla girerek ✓

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Bir şirketin fabrikasında yangın çıkması veya yönetim krizi yaşaması ____ bir örnektir.
  - (a) sistemik (genel piyasa) riske
  - (b) sistemik olmayan (şirkete özel) riske ✓
  - (c) enflasyonist getiri riskine

#### Adım 13 — READ · Senaryo: Tek Hisseli Portföyün Sonu

Can, çok popüler bir havayolu şirketine tüm parasını yatırdı. Başka hiç hissesi yok. Aniden küresel bir salgın çıkıyor ve uçuşlar yasal olarak durduruluyor. Can’ın portföyü aylarca kilitleniyor ve eriyor.

Eğer Can parasını havayolu, yazılım, gıda ve holding arasında bölüştürseydi, salgında yazılım ve gıda hisseleri fırlayacak ve onu koruyacaktı.

#### Adım 14 — READ · Kendi Risk Profilini Tanımak

Herkesin risk toleransı farklıdır. Gece hisse fiyatı düştüğünde uykun kaçıyorsa, risk profilin düşüktür. Bu durumda BIST 30'daki en devasa, oturmuş holding ve şirketleri seçmelisin.

Eğer dalgalanmaları rahat göğüsleyebiliyorsan büyüyen teknoloji şirketlerine yer açabilirsin. Kendini bilmek başarının ilk kuralıdır.

#### Adım 15 — READ · Dersin Özeti: Eğitilmiş Risk

Özetle ortak; risk borsanın düşmanı değil, getirinin yakıtıdır. Önemli olan risk almamak değil, ne kadar risk aldığını bilmek ve onu sepet mantığıyla kontrol altında tutmaktır.

Moono tarzı yatırımcı tüyoların karanlığında değil, bilginin ışığında bilinçli risk alır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Risk Toleransı

**Arka:** Bir yatırımcının varlık fiyatlarındaki dalgalanmaları ve olası değer kayıplarını psikolojik olarak göğüsleyebilme kapasitesidir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Yatırım vadesinin (süresinin) uzaması risk üzerinde nasıl bir etki yaratır?
  - (a) Kısa vadeli dalgalanma gürültülerini yok ederek şirketin büyüme gücüyle riski azaltır ✓
  - (b) Şirketin iflas etme ihtimalini her yıl otomatik olarak artırır
  - (c) Aracı kurum komisyonlarını katlayarak riski büyütür

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Gece fiyat düşüşlerinde uykusu kaçan, strese giren bir yatırımcı portföyünde ağırlıklı olarak ____ yer vermelidir.
  - (a) en riskli ve en hızlı hareket eden küçük şirketlere
  - (b) sadece sosyal medyada adı yeni duyulan hisselere
  - (c) BIST 30 endeksindeki mali yapısı sarsılmaz dev yapılara ✓

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, bu derste yatırımın doğasındaki risk türlerini ve onları sepet yöntemiyle nasıl evcilleştireceğimizi işledik. 2 dakikada hızlıca özetleyelim, testte daha rahat edeceksin.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders9.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Finansal piyasalarda 'Yatırım Riski' en doğru şekilde nasıl tanımlanır?
  - (a) Borsanın hafta sonları tamamen kapanması ihtimali
  - (b) Gelecekteki getirinin beklenen veya öngörülen seviyeden farklı gerçekleşme olasılığı ✓
  - (c) Şirketlerin isim haklarını kaybetme riski

**Final S2:** **Soru:** Aşağıdakilerden hangisi çeşitlendirme (sepet yapmak) yöntemiyle tamamen minimize edilebilen risk türüdür?
  - (a) Sistemik olmayan risk (Şirkete veya sektöre özel krizler) ✓
  - (b) Sistemik risk (Genel ekonomik krizler)
  - (c) Küresel enflasyon riski

**Final S3:** **Soru:** Faiz oranlarının aniden fırlaması veya ülkede ekonomik kriz çıkması hangi risk türüne örnektir?
  - (a) Sistemik risk ✓
  - (b) Sistemik olmayan risk
  - (c) Şirket içi operasyonel risk

**Final S4:** **Soru:** Borsada 'Tüm yumurtaları aynı sepete koymamak' kuralının teknik karşılığı hangisidir?
  - (a) Portföy rebalansı
  - (b) Çeşitlendirme (Asset Diversification) ✓
  - (c) Kredili işlem açmak

**Final S5:** **Soru:** Yatırımcının borsadaki dalgalanmaları psikolojik olarak göğüsleyebilme sınırına ne denir?
  - (a) Vade ufku
  - (b) Risk toleransı ✓
  - (c) Likidite gücü

**Final S6:** **Soru:** Borsada ne yaptığını bilmeden, tüyolarla hareket eden biri için risk oranı neden her zaman %100'dür?
  - (a) Karanlıkta plansız yürüdüğü ve riskin nereden geleceğini bilmediği için ✓
  - (b) Devlet bu işlemlerden daha yüksek vergi aldığı için
  - (c) Aracı kurumlar bu emirleri bilerek iptal ettiği için

**Final S7:** **Soru:** Yatırım vadesinin uzaması riski nasıl etkiler?
  - (a) Riski zamanla tamamen sıfırlar
  - (b) Kısa vadeli piyasa gürültülerini sönümleyerek riski belirgin şekilde düşürür ✓
  - (c) Riski katlayarak artırır

**Final S8:** **Soru:** Risk toleransı çok düşük olan bir yatırımcı portföyünü ağırlıklı olarak nasıl kurmalıdır?
  - (a) BIST 30 endeksindeki, köklü, mali yapısı sarsılmaz dev ortaklık paylarıyla ✓
  - (b) Halka arzı yeni yapılmış küçük teknoloji startup hisseleriyle
  - (c) Sadece gün içinde en hızlı yön değiştiren popüler tahtalarla

**Final S9:** **Soru:** Sepetinizdeki 5 farklı sektörden birinde kriz çıkması portföyün tamamını neden yıkamaz?
  - (a) Kriz çıkan şirketin borçlarını borsa yönetimi ödediği için
  - (b) Diğer 4 bağımsız sektördeki şirketlerin üretim gücü portföy dengesini koruduğu için ✓
  - (c) Hisse fiyatları yasal olarak eksiye düşemediği için

**Final S10:** **Soru:** Bu dersin yatırımcı anayasasına eklemek istediği temel mesaj hangisidir?
  - (a) Risk kaçılması gereken bir canavar değil; bilgi, plan ve sepet mantığıyla yönetilmesi gereken bir finansal parametredir ✓
  - (b) Borsada risklerden tamamen kurtulmanın tek yolu parayı tek bir hisseye gömmektir
  - (c) En başarılı portföy, hiç risk almadan sadece endeks takibi yapan portföydür

---

## DERS: Seviye 1 Final: İlk Adıma Hazırlık (lesson_id=57, unit_id=1)
*Korkunun gerçek kaynağı*

#### Adım 1 — READ · Sahaya İniş Öncesi Son Kontrol

Tebrikler ortak! Seviye 1: Çırak eğitiminin büyük finaline ulaştın. Buraya kadar borsanın kumarhane değil kurallı bir pazar olduğunu, mülkiyet zihniyetini, devlet güvencesini, arz-talebi, döngüleri, enflasyon savaşını og risk yönetimini öğrendin.

Artık finansal okuryazarlık temel kalkanını kuşanmış durumdasın. Yolculuğun bu ilk aşamasını başarıyla mühürlemek üzeresin.

#### Adım 2 — READ · Yatırımın Üç Altın Anayasası

Gerçek sahaya adım atmadan önce zihnine kazıman gereken üç Moono ilkesi şudur:

1. Kısa vadede ihtiyacın olan, borç veya acil ödeme nakitleriyle asla borsaya girme.
2. Sabır ve duygusal disiplin, borsa ekranında matematik bilmekten çok daha fazla servet kazandırır.
3. Yatırım bir varış çizgisi değil, ömür boyu sürecek disiplinli bir varlık biriktirme yolculuğudur.

#### Adım 3 — READ · Şimdi Kendini Kanıtlama Vakti

Teorik zırhın hazır ortak. Birazdan karşına çıkacak olan Seviye Final Testi, senin buraya kadar öğrendiğin tüm hayati kavramları ne kadar sindirdiğini ölçecek.

Panik yok, soruları dikkatli oku, şıklardaki ince çeldiricilere dikkat et. En az 7 doğru yaptığında Çıraklık dönemi senin için resmen kapanacak ve Seviye 2: Çaylak aşamasına yasal olarak geçmeye hak kazanacaksın. Başarılar!

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Uzun Vadeli Yatırım

**Arka:** Kısa vadeli piyasa dalgalanmalarını ve fiyat gürültülerini yok sayarak, düzenli og planlı bir şekilde varlık biriktirmeye dayalı Moono tarzıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Moono ilklerine göre borsada yatırıma başlarken kullanılacak en sağlıklı ve doğru bütçe hangisidir?
  - (a) Gelecek ay ödenmesi gereken ev kirası veya acil kredi borcu nakitleri
  - (b) Kısa ve orta vadede acil bir ihtiyaca dönüşmeyecek, gözden çıkarılabilen düzenli tasarruflar ✓
  - (c) Banka limitlerini sonuna kadar kullanarak çekilen yüksek faizli tüketici kredileri

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Moono ekosisteminde bir yatırımcının nihai başarı kriteri, anlık fiyat yakalamak değil ____.
  - (a) en hızlı al-sat robot yazılımını kurmaktır
  - (b) enflasyonun üzerinde reel getiri üreterek uzun vadeli servet inşa etmektir ✓
  - (c) her gün en çok konuşulan spekülatif hisseyi bulmaktır

#### Adım 7 — READ · Seviye 2'de Seni Ne Bekliyor?

Çıraklık bittiğinde 'Çaylak' seviyesine geçeceksin. Orada işin operasyonel mutfağına gireceğiz: Banka mı aracı kurum mu seçilmeli? Yatırım hesabı nasıl açılır? Uygunluk testi nedir?

Piyasa emri, limit emir, zincir emir ve stop-loss (zarar kes) gibi sahada hayat kurtaran tüm pratik araçları tek tek elinle uygulayacaksın.

#### Adım 8 — READ · Sermaye Değil, Disiplin Yarışı

Borsada büyük parası olan değil, büyük disiplini olan kazanır ortak. Milyon liran olup plansız hareket edersen batarsın; ama her ay 500 lira ile düzenli sepet yapan bir çırak, uzun vadede devasa bir portföy gücüne ulaşır.

Moono sana paranın miktarını değil, zihninin kalitesini büyütmeyi öğretir.

#### Adım 9 — READ · Bilgi Zırhını Kuşanmak

Sosyal medyada, forumlarda veya WhatsApp gruplarında sana 'Bu hisse uçacak, zengin olacaksın' diyen yüzlerce manipülatörle karşılaşacaksın. Artık borsa mantığını biliyorsun.

Sana tüyo verenlere gülüp geçeceksin; çünkü sen Moono tarzı bilgi zırhını kuşandın. Kendi kararlarını kendin vereceksin.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Yatırım Disiplini

**Arka:** Piyasa koşulları ne olursa olsun, panik ve coşkuya kapılmadan baştan belirlenmiş risk og sepet planına sadık kalma becerisidir.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Borsada uzun vadeli finansal başarının ana anahtarı aşağıdakilerden hangisidir?
  - (a) Küçük bütçelerle bile olsa düzenli, planlı ve sepet mantığına sadık kalarak disiplinli birikim yapmak ✓
  - (b) Yatırıma çok devasa başlangıç sermayeleriyle giriş yapmak
  - (c) Her gün borsa binasını bizzat ziyaret ederek bilgi toplamak

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Çırak seviyesini başarıyla tamamlayan bir yatırımcı adayı, Seviye 2'de ____ öğrenecektir.
  - (a) ileri seviye teknik bilanço analizi yapmayı
  - (b) hesap açılış süreçlerini, emir tiplerini ve operasyonel pratikleri ✓
  - (c) borsadan tamamen bağımsız döviz ticaretini

#### Adım 13 — READ · Senaryo: Mezuniyet Öncesi Kararlılık

Arkadaş ortamında biri heyecanla 'X küçük hissesi yarın tavan olacak, evini sat gir' diyor. Eski sen olsan heyecanlanıp adını kağıda yazardın.

Ama Moono mezunu sen diyorsun ki: 'Bu şirketin üretimi ne? SPK denetiminde gözetim cezası var mı? Çeşitlendirilmiş risk planıma uyuyor mu?' İşte bu cümle senin resmen seviye atladığının kanıtıdır.

#### Adım 14 — READ · Finansal Özgürlük İnancı

Finansal özgürlük, paranın senin için gece gündüz çalışmasıdır. Sen uyurken, tatil yaparken veya asıl işinle ilgilenirken; ortak olduğun şirketlerin fabrikalarında çarklar döner, tırlar mal taşır, yazılımlar satılır. Sen bu sisteme inanarak ilk adımı attın, inancını kaybetme.

#### Adım 15 — READ · Büyük Sınava Son Çağrı

Çıraklık dönemi senin için resmen bitmek üzere ortak. Sonraki adımda seni 10 soruluk dev bir Seviye Final Testi bekliyor. Bu test senin pasaportun.

Derin bir nefes al, buraya kadar kurduğun o güçlü ortaklık vizyonuna güven ve final testini darmadağın et. Sahada görüşmek üzere!

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Finansal Özgürlük

**Arka:** Kişinin aktif olarak çalışmasına gerek kalmadan, yatırımlarından ve varlıklarından elde ettiği reel gelirlerle yaşamını sürdürebilme durumudur.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryodaki arkadaşının tüyo baskısı karşısında Moono mezunu bir yatırımcının duruşu ne olmalıdır?
  - (a) Fırsatı kaçırmamak adına hemen tüm birikimle o hisseye atlamak
  - (b) Kulaktan dolma tüyoyu reddedip, kararlarını kendi bilgi filtreleri ve planına göre vermek ✓
  - (c) Arkadaşının haklı çıkması için dua edip izlemek

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Borsada büyük paralar kaybetmenin en yaygın nedeni yetersiz sermaye değil, ____.
  - (a) bilgi eksikliği, tüyoculuk ve duygusal disiplinsizliktir ✓
  - (b) aracı kurumların mesai saatleridir
  - (c) borsa endeksinin her gün rekor kırmasıdır

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Seviye 1: Çırak eğitiminin tüm anayasa maddelerini toparladık. Şimdi o 2 dakikalık dev final özetini dinle, zihnini fişekle ve büyük seviye sınavına gir!

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders10.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Seviye 1: Çırak Büyük Sınavı

**Geçme eşiği:** 7/10

**Final S1:** **Soru:** Moono felsefesindeki 'Yatırımcı' zihniyeti temel olarak aşağıdakilerden hangisine odaklanır?
  - (a) Fiyatların anlık yön değişimlerinden saniyelik al-satlarla gün içi kâr kovalamaya
  - (b) Arkadaki şirketin gerçek üretim, kârlılık ve büyüme hikayesine odaklanıp zamana yayılmaya ✓
  - (c) Endeksteki en popüler hisseleri grafik parladığı an hızlıca portföye eklemeye

**Final S2:** **Soru:** Borsadan aldığın hisse senetlerinin yasal saklama güvencesi devlet tarafından nerede sağlanır?
  - (a) MKK nezdinde adınıza dijital mühürle kaydedilerek, nakitler ise Takasbank’ta korunarak ✓
  - (b) Aracı kurumların kendi yerel bilgisayar kasalarında
  - (c) Borsa İstanbul binasındaki fiziksel arşivlerde basılı evrak olarak depolanarak

**Final S3:** **Soru:** Piyasanın ana termometresi sayılan BIST 100 endeksi bize temel olarak neyi gösterir?
  - (a) Borsadaki en büyük ve işlem hacmi en yüksek 100 şirketin genel ortalama performansını ✓
  - (b) Borsaya o yıl yeni dahil olan tüm halka arz şirketlerinin toplam fiyat değerini
  - (c) Fiyatı devlet tarafından koruma altına alınmış en risksiz 100 kamu şirketini

**Final S4:** **Soru:** Bir hissenin fiyatının gün içinde saniyeler içinde yukarı tırmanmasının arkasındaki temel yasa nedir?
  - (a) Alıcıların (talep) satıcılardan (arz) daha istekli, baskın ve aceleci olması ✓
  - (b) Şirketlerin finans müdürlerinin o sabah fiyatı yukarı çekme kararı alması
  - (c) SPK kurumunun fiyat dengesini korumak amacıyla yukarı yönlü müdahale etmesi

**Final S5:** **Soru:** Finans dünyasında sıkça geçen 'Ayı Piyasası' ifadesi neyi betimler?
  - (a) Yatırımcı iştahının zirvede olduğu, fiyatların sürekli rekor kırdığı coşku dönemini
  - (b) Piyasanın karamsar, fiyatların düşüş eğiliminde ve korkunun hakim olduğu dönemi ✓
  - (c) Hisse senetlerinin fiyatlarının aylarca tamamen sabit kaldığı durağan piyasayı

**Final S6:** **Soru:** Sessiz hırsız Enflasyon karşısında paranın gerçek satın alma gücünü korumanın en güçlü yolu nedir?
  - (a) Paranızı mevduat faizinde veya nakitte tutarak sabit kılmak
  - (b) Ürünlerine zam yapabilen, kâr üreten ve varlıkları değerlenen şirketlere ortak olmak ✓
  - (c) Gün içinde sürekli al-sat yaparak nakit hacmini yapay olarak büyütmek

**Final S7:** **Soru:** Şirkete veya sektöre özel risklerin portföyü çökertmesini engellemenin en sarsılmaz altın kuralı nedir?
  - (a) Tüm birikimi en güvendiğimiz tek bir dev şirketin hissesine bağlamak
  - (b) Birbiriyle ilişkisiz farklı sektörlerden şirketleri seçerek dengeli bir sepet (çeşitlendirme) yapmak ✓
  - (c) Fiyat grafiği sadece aşağı yönlü kırmızı olan hisseleri portföye toplamak

**Final S8:** **Soru:** Borsada yatırımcının asıl hedefi olan 'Reel Getiri' tam olarak ne anlama gelir?
  - (a) Yatırımın enflasyon oranı düşüldükten sonra sağladığı net satın alma gücü kazancı ✓
  - (b) Bir hisse senedinin bir yıl içinde ulaştığı en yüksek nominal Türk Lirası fiyatı
  - (c) Aracı kuruma ödenen komisyonlar düşüldükten sonra hesapta kalan brüt nakit

**Final S9:** **Soru:** Borsada psikolojik olarak panik yapmadan sabırla bekleyebilmek için hangi bütçeyle başlanmalıdır?
  - (a) Gelecek ay ödenmesi gereken acil ödemelerin, borçların veya ev kirasının parasıyla
  - (b) Kısa ve orta vadede acil bir ihtiyaca dönüşmeyecek olan düzenli tasarruflarla ✓
  - (c) Tüm banka limitlerini ve kredi imkanlarını sonuna kadar kullanarak

**Final S10:** **Soru:** Seviye 1: Çırak eğitiminin kullanıcıya kazandırmak istediği nihai anayasa fikri hangisidir?
  - (a) Borsa denetlenen, şeffaf bir ortaklık pazarıdır; bilgi, plan ve sepet mantığıyla giden servet inşa eder ✓
  - (b) Borsa şans oyunudur; hızlı hareket eden ve tüyoları takip eden kazanır
  - (c) Borsada riskler çok yüksek olduğu için küçük yatırımcıların reel kazanç sağlaması imkansızdır

---

## DERS: Banka mı, Aracı Kurum mu? (lesson_id=6, unit_id=2)
*Aracı kurum ve MKK sicili*

#### Adım 1 — READ · Hesap Nasıl Açılır? - Başlangıç

Ortak, bu derste odak konumuz: yatırım hesabı açılış süreci. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Hesap Nasıl Açılır?

**Arka:** yatırım hesabı açılış süreci konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste yatırım hesabı açılış süreci konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Hesap Nasıl Açılır? dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Hesap Nasıl Açılır? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** yatırım hesabı açılış süreci başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Yatırım Hesabı Açılış Süreci ve Uygunluk Testi (lesson_id=7, unit_id=2)
*Limit, piyasa ve stop emirleri*

#### Adım 1 — READ · Emir Tipleri - Başlangıç

Ortak, bu derste odak konumuz: alım-satım emir türleri. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Emir Tipleri

**Arka:** alım-satım emir türleri konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste alım-satım emir türleri konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Emir Tipleri dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Emir Tipleri konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** alım-satım emir türleri başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Emir Tipleri 1: Piyasa Emri ve Limit Emir (lesson_id=8, unit_id=2)
*Adet kavramı ve minimum işlem*

#### Adım 1 — READ · Lot ve Küsuratlar - Başlangıç

Ortak, bu derste odak konumuz: lot mantığı ve adet hesaplama. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Lot ve Küsuratlar

**Arka:** lot mantığı ve adet hesaplama konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste lot mantığı ve adet hesaplama konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Lot ve Küsuratlar dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Lot ve Küsuratlar konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** lot mantığı ve adet hesaplama başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Ara Değerlendirme 1 (lesson_id=72, unit_id=2)
*Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 1

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu testin amacı nedir?
  - (a) İlk 3 ders kazanımlarını ölçmek ✓
  - (b) Sadece hız denemek
  - (c) Rastgele seçim yapmak

**Final S2:** **Soru:** Doğru öğrenme yaklaşımı hangisidir?
  - (a) Planlı ilerlemek ✓
  - (b) Acele etmek
  - (c) Sadece yorum takip etmek

**Final S3:** **Soru:** Hata riskini azaltan davranış hangisidir?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duyguyla karar vermek

**Final S4:** **Soru:** Analiz + plan + disiplin üçlüsü ne sağlar?
  - (a) Daha tutarlı karar ✓
  - (b) Daha çok acele
  - (c) Daha fazla belirsizlik

**Final S5:** **Soru:** Aşağıdakilerden hangisi zayıf yaklaşımdır?
  - (a) Sadece anlık harekete bakmak ✓
  - (b) Bağlamla karar vermek
  - (c) Kurala sadık kalmak

**Final S6:** **Soru:** Dengeli ilerlemede ilk adım nedir?
  - (a) Konuyu anlamak ✓
  - (b) Hemen işlem açmak
  - (c) Söylentiye gitmek

**Final S7:** **Soru:** Yeni başlayan için en doğru tercih hangisi?
  - (a) Az ama anlamlı metrik ✓
  - (b) Her şeyi aynı anda yüklenmek
  - (c) Sadece sosyal medya

**Final S8:** **Soru:** Karar kalitesini ne yükseltir?
  - (a) Sistemli tekrar ✓
  - (b) Rastgele deneme
  - (c) Acele

**Final S9:** **Soru:** Disiplinin yatırımdaki karşılığı nedir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Anlık tepki
  - (c) Hızlı yön değiştirmek

**Final S10:** **Soru:** Hangi ifade doğrudur?
  - (a) Bağlam olmadan fiyat yorumu eksik kalır ✓
  - (b) Fiyat tek başına her şeyi anlatır
  - (c) Yorumlar veriden güçlüdür

**Final S11:** **Soru:** Planın olmadığı yerde ne artar?
  - (a) Hata riski ✓
  - (b) Netlik
  - (c) Tutarlılık

**Final S12:** **Soru:** Güçlü öğrenme döngüsü hangi sıradır?
  - (a) Oku -> test et -> düzelt ✓
  - (b) Acele et -> unut
  - (c) Sadece izle

**Final S13:** **Soru:** Aşağıdakilerden hangisi riskli davranıştır?
  - (a) Plansız karar ✓
  - (b) Kural seti
  - (c) Ön kontrol

**Final S14:** **Soru:** Sağlam ilerleme neye dayanır?
  - (a) Süreç disiplini ✓
  - (b) Şans
  - (c) Taklit

**Final S15:** **Soru:** Kontrol listesi ne sağlar?
  - (a) Karar hatasını azaltır ✓
  - (b) Riski yok eder
  - (c) Kazancı garanti eder

**Final S16:** **Soru:** Tutarlı yatırımcı davranışı hangisidir?
  - (a) Aynı ilkelere bağlı kalmak ✓
  - (b) Her gün yeni kural
  - (c) Duyguyla yön değiştirmek

**Final S17:** **Soru:** Hangi ifade yanlıştır?
  - (a) Söylenti tek başına yeterli veridir ✓
  - (b) Bağlam önemlidir
  - (c) Plan disiplini gerekir

**Final S18:** **Soru:** Ara değerlendirme ne işe yarar?
  - (a) Kazanımı doğrular ✓
  - (b) Sadece süre doldurur
  - (c) Akışı bozar

**Final S19:** **Soru:** Süreç odaklı yaklaşımın sonucu nedir?
  - (a) Daha düşük hata oranı ✓
  - (b) Daha yüksek panik
  - (c) Rastgele sonuç

**Final S20:** **Soru:** Bu sınav hangi kapsamı ölçer?
  - (a) Ders 1-3 kapsamı ✓
  - (b) Sadece seviye sonu
  - (c) Sadece teknik sınav

---

## DERS: Emir Tipleri 2: Zincir Emir ve Stop-Loss (lesson_id=9, unit_id=2)
*Borsa ne zaman açılır, ne zaman kapanır?*

#### Adım 1 — READ · Seans Saatleri - Başlangıç

Ortak, bu derste odak konumuz: işlem saatleri ve seans akışı. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Seans Saatleri

**Arka:** işlem saatleri ve seans akışı konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste işlem saatleri ve seans akışı konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Seans Saatleri dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Seans Saatleri konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** işlem saatleri ve seans akışı başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Lot Nedir? (lesson_id=10, unit_id=2)
*Derinlik, fiyat ve hacim*

#### Adım 1 — READ · Piyasa Ekranını Okumak - Başlangıç

Ortak, bu derste odak konumuz: fiyat ekranı okuma becerisi. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Piyasa Ekranını Okumak

**Arka:** fiyat ekranı okuma becerisi konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste fiyat ekranı okuma becerisi konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Piyasa Ekranını Okumak dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Piyasa Ekranını Okumak konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** fiyat ekranı okuma becerisi başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: İşlem Saatleri ve Takvim (lesson_id=33, unit_id=2)
*Param ne zaman gelir?*

#### Adım 1 — READ · T+2 Kuralı - Başlangıç

Ortak, bu derste odak konumuz: takas süreci ve T+2 mantığı. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** T+2 Kuralı

**Arka:** takas süreci ve T+2 mantığı konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste takas süreci ve T+2 mantığı konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, T+2 Kuralı dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** T+2 Kuralı konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** takas süreci ve T+2 mantığı başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Ara Değerlendirme 2 (lesson_id=73, unit_id=2)
*Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 2

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu sınavın kapsadığı ders aralığı nedir?
  - (a) Ders 1-6 kapsamı ✓
  - (b) Sadece son ders
  - (c) Sadece final öncesi

**Final S2:** **Soru:** Ders 1-6 tekrarında doğru yöntem hangisidir?
  - (a) Konuları bağlayarak tekrar etmek ✓
  - (b) Parça parça ezberlemek
  - (c) Sadece rastgele çözmek

**Final S3:** **Soru:** Karar kalitesi en çok neyle artar?
  - (a) Plan ve sistem disiplini ✓
  - (b) Acele
  - (c) Söylenti

**Final S4:** **Soru:** Hata payını düşüren yaklaşım hangisi?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duygusal tepki

**Final S5:** **Soru:** Bağlam neden önemlidir?
  - (a) Kararı doğru zemine oturtur ✓
  - (b) Sadece süre uzatır
  - (c) Gereksizdir

**Final S6:** **Soru:** Sistemli yatırımcı hangi davranışı gösterir?
  - (a) Kurallarına sadık kalır ✓
  - (b) Her gün yön değiştirir
  - (c) Anlık tepki verir

**Final S7:** **Soru:** Ders tekrarının amacı nedir?
  - (a) Bilgiyi kalıcı hale getirmek ✓
  - (b) Sadece süre doldurmak
  - (c) Rastgele soru çözmek

**Final S8:** **Soru:** Hangi davranış risklidir?
  - (a) Plansız hız ✓
  - (b) Kontrollü adım
  - (c) Dengeli ilerleme

**Final S9:** **Soru:** Yatırım öğrenme sürecinde doğru sıra hangisi?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce uygula, sonra düşün
  - (c) Sadece izle

**Final S10:** **Soru:** Duygu yönetimi niçin kritiktir?
  - (a) Plan dışı hatayı azaltır ✓
  - (b) Kazancı garanti eder
  - (c) Riski yok eder

**Final S11:** **Soru:** Sürdürülebilir yaklaşım hangisidir?
  - (a) Süreç odaklı tekrar ✓
  - (b) Acele karar
  - (c) Tek veriye bakmak

**Final S12:** **Soru:** Ara değerlendirme 2 neyi kontrol eder?
  - (a) İlk 6 ders kazanımını ✓
  - (b) Sadece 1 dersi
  - (c) Sadece finali

**Final S13:** **Soru:** Aşağıdakilerden hangisi güçlü karar öncesi adımıdır?
  - (a) Kontrol sorusu sormak ✓
  - (b) Hızlı tepki
  - (c) Kopya karar

**Final S14:** **Soru:** Hangi ifade doğrudur?
  - (a) Sistem disiplini uzun vadede fark yaratır ✓
  - (b) Şans yeterlidir
  - (c) Plan gereksizdir

**Final S15:** **Soru:** Doğru tekrar stratejisi hangisidir?
  - (a) Konular arası bağlantı kurmak ✓
  - (b) Sadece son soruya bakmak
  - (c) Rastgele ilerlemek

**Final S16:** **Soru:** Karar netliği nasıl artar?
  - (a) Bağlam + kural birlikte kullanınca ✓
  - (b) Sadece sezgiyle
  - (c) Sadece hızla

**Final S17:** **Soru:** Aşağıdakilerden hangisi yanlıştır?
  - (a) Plansızlık faydalıdır ✓
  - (b) Plan disiplini gereklidir
  - (c) Kontrol listesi yararlıdır

**Final S18:** **Soru:** Risk yönetimi yaklaşımı ne ister?
  - (a) Önceden düşünülmüş sınırlar ✓
  - (b) Sınırsız deneme
  - (c) Tesadüf

**Final S19:** **Soru:** Sağlam ilerleme için kritik ikili hangisi?
  - (a) Plan ve disiplin ✓
  - (b) Acele ve panik
  - (c) Söylenti ve tahmin

**Final S20:** **Soru:** Bu sınavın türü nedir?
  - (a) 20 soruluk ara değerlendirme ✓
  - (b) 10 soruluk final
  - (c) 5 soruluk deneme

---

## DERS: Maliyetler: Komisyon Oranları ve Vergiler (lesson_id=34, unit_id=2)
*Şirketlerin borsaya ilk çıkışı*

#### Adım 1 — READ · Halka Arz (IPO) - Başlangıç

Ortak, bu derste odak konumuz: halka arz süreci ve katılım. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Halka Arz (IPO)

**Arka:** halka arz süreci ve katılım konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste halka arz süreci ve katılım konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Halka Arz (IPO) dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Halka Arz (IPO) konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** halka arz süreci ve katılım başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: KAP Okuryazarlığı (lesson_id=35, unit_id=2)
*Düzenli gelir ve kâr payı*

#### Adım 1 — READ · Temettü Nedir? - Başlangıç

Ortak, bu derste odak konumuz: temettü ve nakit akışı yaklaşımı. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Temettü Nedir?

**Arka:** temettü ve nakit akışı yaklaşımı konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste temettü ve nakit akışı yaklaşımı konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Temettü Nedir? dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Temettü Nedir? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** temettü ve nakit akışı yaklaşımı başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Portföy İzleme ve Uygulama Arayüzü Kullanımı (lesson_id=36, unit_id=2)
*Sepet mantığı ve çeşitlendirme*

#### Adım 1 — READ · Portföy Nedir? - Başlangıç

Ortak, bu derste odak konumuz: portföy kurgusu ve dağılım dengesi. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Portföy Nedir?

**Arka:** portföy kurgusu ve dağılım dengesi konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste portföy kurgusu ve dağılım dengesi konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Portföy Nedir? dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Portföy Nedir? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** portföy kurgusu ve dağılım dengesi başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Seviye 2 Final: İlk Hisse Emrim (lesson_id=37, unit_id=2)
*Simülasyon ile gerçek arasındaki fark*

#### Adım 1 — READ · İlk Emri Vermek - Başlangıç

Ortak, bu derste odak konumuz: ilk işlem adımı ve kontrol listesi. 

Önce temel mantığı sade şekilde kuracağız.

Sonra küçük alıştırmalarla pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.

Tanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.

Bu yüzden her bölümde pratik bir kontrol noktası göreceksin.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Ortak, amaç hızlı geçmek değil sağlam ilerlemek.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** İlk Emri Vermek

**Arka:** ilk işlem adımı ve kontrol listesi konusunda ilk kavramsal çerçeveyi veren ana başlıktır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu derste doğru yaklaşım hangisidir?
  - (a) Adımları planlı ve sırayla uygulamak ✓
  - (b) Sadece hızlıca işlem yapmak
  - (c) Sadece yorumlara göre karar vermek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Adım Adım Uygulama

Bu bölümde odak, doğru sırayla ilerlemektir.

Yanlış sırada verilen kararlar gereksiz hata doğurabilir.

Sistemli adımlar, süreci sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.

Çözüm: küçük kontrol listesi + net sıra.

Ortak, kurgu varsa hata azalır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Bu yüzden şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: karar vermen gereken bir an geldi.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi korumaktır.

Süreç bozulursa küçük hata büyük zarara dönebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste ilk işlem adımı ve kontrol listesi konusunu adım adım kurduk.

Temel kural: plan + bağlam + disiplin.

Ortak, bu üçlü varsa ilerleme hızlanır.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, İlk Emri Vermek dersinin kısa özetini dinleyelim.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** İlk Emri Vermek konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** ilk işlem adımı ve kontrol listesi başlığında hata riskini en çok ne azaltır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Rastgele hareket etmek
  - (c) Sadece tek veriye bakmak

**Final S4:** **Soru:** Bu derste tekrar eden ana tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Hızlı sonuç arayışı
  - (c) Şansa bırakma

**Final S5:** **Soru:** Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?
  - (a) Planla ilerlemek ✓
  - (b) Duyguyla karar vermek
  - (c) Sürekli acele etmek

**Final S6:** **Soru:** Dersin ana çıktısı için en doğru ifade hangisi?
  - (a) Önce anlayıp sonra uygulamak ✓
  - (b) Önce işlem açıp sonra bakmak
  - (c) Sadece kalabalığı takip etmek

---

## DERS: Şirket Hikayesi ve Sektör Analizi (lesson_id=11, unit_id=3)
*Şirketin fotoğrafı*

#### Adım 1 — READ · Bilanço Nedir? - Başlangıç

Ortak, bu derste odak konumuz: bilanço nedir?. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Bilanço Nedir?

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste bilanço nedir? konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Bilanço Nedir? dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Bilanço Nedir? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Bilanço Okuma 101: Varlıklar ve Yükümlülükler (lesson_id=12, unit_id=3)
*Şirket ne kazandı, ne harcadı?*

#### Adım 1 — READ · Gelir Tablosu - Başlangıç

Ortak, bu derste odak konumuz: gelir tablosu. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Gelir Tablosu

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste gelir tablosu konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Gelir Tablosu dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Gelir Tablosu konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Gelir Tablosu: Satışlar, Esas Faaliyet Kârı ve Net Kâr (lesson_id=13, unit_id=3)
*Fiyat kazanç ve değerleme*

#### Adım 1 — READ · F/K Oranı - Başlangıç

Ortak, bu derste odak konumuz: f/k oranı. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** F/K Oranı

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste f/k oranı konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, F/K Oranı dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** F/K Oranı konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 1 (lesson_id=74, unit_id=3)
*Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 1

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu testin amacı nedir?
  - (a) İlk 3 ders kazanımlarını ölçmek ✓
  - (b) Sadece hız denemek
  - (c) Rastgele seçim yapmak

**Final S2:** **Soru:** Doğru öğrenme yaklaşımı hangisidir?
  - (a) Planlı ilerlemek ✓
  - (b) Acele etmek
  - (c) Sadece yorum takip etmek

**Final S3:** **Soru:** Hata riskini azaltan davranış hangisidir?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duyguyla karar vermek

**Final S4:** **Soru:** Analiz + plan + disiplin üçlüsü ne sağlar?
  - (a) Daha tutarlı karar ✓
  - (b) Daha çok acele
  - (c) Daha fazla belirsizlik

**Final S5:** **Soru:** Aşağıdakilerden hangisi zayıf yaklaşımdır?
  - (a) Sadece anlık harekete bakmak ✓
  - (b) Bağlamla karar vermek
  - (c) Kurala sadık kalmak

**Final S6:** **Soru:** Dengeli ilerlemede ilk adım nedir?
  - (a) Konuyu anlamak ✓
  - (b) Hemen işlem açmak
  - (c) Söylentiye gitmek

**Final S7:** **Soru:** Yeni başlayan için en doğru tercih hangisi?
  - (a) Az ama anlamlı metrik ✓
  - (b) Her şeyi aynı anda yüklenmek
  - (c) Sadece sosyal medya

**Final S8:** **Soru:** Karar kalitesini ne yükseltir?
  - (a) Sistemli tekrar ✓
  - (b) Rastgele deneme
  - (c) Acele

**Final S9:** **Soru:** Disiplinin yatırımdaki karşılığı nedir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Anlık tepki
  - (c) Hızlı yön değiştirmek

**Final S10:** **Soru:** Hangi ifade doğrudur?
  - (a) Bağlam olmadan fiyat yorumu eksik kalır ✓
  - (b) Fiyat tek başına her şeyi anlatır
  - (c) Yorumlar veriden güçlüdür

**Final S11:** **Soru:** Planın olmadığı yerde ne artar?
  - (a) Hata riski ✓
  - (b) Netlik
  - (c) Tutarlılık

**Final S12:** **Soru:** Güçlü öğrenme döngüsü hangi sıradır?
  - (a) Oku -> test et -> düzelt ✓
  - (b) Acele et -> unut
  - (c) Sadece izle

**Final S13:** **Soru:** Aşağıdakilerden hangisi riskli davranıştır?
  - (a) Plansız karar ✓
  - (b) Kural seti
  - (c) Ön kontrol

**Final S14:** **Soru:** Sağlam ilerleme neye dayanır?
  - (a) Süreç disiplini ✓
  - (b) Şans
  - (c) Taklit

**Final S15:** **Soru:** Kontrol listesi ne sağlar?
  - (a) Karar hatasını azaltır ✓
  - (b) Riski yok eder
  - (c) Kazancı garanti eder

**Final S16:** **Soru:** Tutarlı yatırımcı davranışı hangisidir?
  - (a) Aynı ilkelere bağlı kalmak ✓
  - (b) Her gün yeni kural
  - (c) Duyguyla yön değiştirmek

**Final S17:** **Soru:** Hangi ifade yanlıştır?
  - (a) Söylenti tek başına yeterli veridir ✓
  - (b) Bağlam önemlidir
  - (c) Plan disiplini gerekir

**Final S18:** **Soru:** Ara değerlendirme ne işe yarar?
  - (a) Kazanımı doğrular ✓
  - (b) Sadece süre doldurur
  - (c) Akışı bozar

**Final S19:** **Soru:** Süreç odaklı yaklaşımın sonucu nedir?
  - (a) Daha düşük hata oranı ✓
  - (b) Daha yüksek panik
  - (c) Rastgele sonuç

**Final S20:** **Soru:** Bu sınav hangi kapsamı ölçer?
  - (a) Ders 1-3 kapsamı ✓
  - (b) Sadece seviye sonu
  - (c) Sadece teknik sınav

---

## DERS: Temel Rasyolar 1: F/K Oranı (lesson_id=14, unit_id=3)
*Piyasa değeri ve defter değeri*

#### Adım 1 — READ · PD/DD Oranı - Başlangıç

Ortak, bu derste odak konumuz: pd/dd oranı. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** PD/DD Oranı

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste pd/dd oranı konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, PD/DD Oranı dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** PD/DD Oranı konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Temel Rasyolar 2: PD/DD (lesson_id=15, unit_id=3)
*Kâr ile nakit aynı şey değil*

#### Adım 1 — READ · Nakit Akışı - Başlangıç

Ortak, bu derste odak konumuz: nakit akışı. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Nakit Akışı

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste nakit akışı konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Nakit Akışı dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Nakit Akışı konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Nakit Akış Tablosu: Sıcak Para Nereye Gidiyor? (lesson_id=38, unit_id=3)
*Şirket ne kadar borçlu?*

#### Adım 1 — READ · Borçluluk Oranları - Başlangıç

Ortak, bu derste odak konumuz: borçluluk oranları. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Borçluluk Oranları

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste borçluluk oranları konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Borçluluk Oranları dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Borçluluk Oranları konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 2 (lesson_id=75, unit_id=3)
*Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 2

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu sınavın kapsadığı ders aralığı nedir?
  - (a) Ders 1-6 kapsamı ✓
  - (b) Sadece son ders
  - (c) Sadece final öncesi

**Final S2:** **Soru:** Ders 1-6 tekrarında doğru yöntem hangisidir?
  - (a) Konuları bağlayarak tekrar etmek ✓
  - (b) Parça parça ezberlemek
  - (c) Sadece rastgele çözmek

**Final S3:** **Soru:** Karar kalitesi en çok neyle artar?
  - (a) Plan ve sistem disiplini ✓
  - (b) Acele
  - (c) Söylenti

**Final S4:** **Soru:** Hata payını düşüren yaklaşım hangisi?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duygusal tepki

**Final S5:** **Soru:** Bağlam neden önemlidir?
  - (a) Kararı doğru zemine oturtur ✓
  - (b) Sadece süre uzatır
  - (c) Gereksizdir

**Final S6:** **Soru:** Sistemli yatırımcı hangi davranışı gösterir?
  - (a) Kurallarına sadık kalır ✓
  - (b) Her gün yön değiştirir
  - (c) Anlık tepki verir

**Final S7:** **Soru:** Ders tekrarının amacı nedir?
  - (a) Bilgiyi kalıcı hale getirmek ✓
  - (b) Sadece süre doldurmak
  - (c) Rastgele soru çözmek

**Final S8:** **Soru:** Hangi davranış risklidir?
  - (a) Plansız hız ✓
  - (b) Kontrollü adım
  - (c) Dengeli ilerleme

**Final S9:** **Soru:** Yatırım öğrenme sürecinde doğru sıra hangisi?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce uygula, sonra düşün
  - (c) Sadece izle

**Final S10:** **Soru:** Duygu yönetimi niçin kritiktir?
  - (a) Plan dışı hatayı azaltır ✓
  - (b) Kazancı garanti eder
  - (c) Riski yok eder

**Final S11:** **Soru:** Sürdürülebilir yaklaşım hangisidir?
  - (a) Süreç odaklı tekrar ✓
  - (b) Acele karar
  - (c) Tek veriye bakmak

**Final S12:** **Soru:** Ara değerlendirme 2 neyi kontrol eder?
  - (a) İlk 6 ders kazanımını ✓
  - (b) Sadece 1 dersi
  - (c) Sadece finali

**Final S13:** **Soru:** Aşağıdakilerden hangisi güçlü karar öncesi adımıdır?
  - (a) Kontrol sorusu sormak ✓
  - (b) Hızlı tepki
  - (c) Kopya karar

**Final S14:** **Soru:** Hangi ifade doğrudur?
  - (a) Sistem disiplini uzun vadede fark yaratır ✓
  - (b) Şans yeterlidir
  - (c) Plan gereksizdir

**Final S15:** **Soru:** Doğru tekrar stratejisi hangisidir?
  - (a) Konular arası bağlantı kurmak ✓
  - (b) Sadece son soruya bakmak
  - (c) Rastgele ilerlemek

**Final S16:** **Soru:** Karar netliği nasıl artar?
  - (a) Bağlam + kural birlikte kullanınca ✓
  - (b) Sadece sezgiyle
  - (c) Sadece hızla

**Final S17:** **Soru:** Aşağıdakilerden hangisi yanlıştır?
  - (a) Plansızlık faydalıdır ✓
  - (b) Plan disiplini gereklidir
  - (c) Kontrol listesi yararlıdır

**Final S18:** **Soru:** Risk yönetimi yaklaşımı ne ister?
  - (a) Önceden düşünülmüş sınırlar ✓
  - (b) Sınırsız deneme
  - (c) Tesadüf

**Final S19:** **Soru:** Sağlam ilerleme için kritik ikili hangisi?
  - (a) Plan ve disiplin ✓
  - (b) Acele ve panik
  - (c) Söylenti ve tahmin

**Final S20:** **Soru:** Bu sınavın türü nedir?
  - (a) 20 soruluk ara değerlendirme ✓
  - (b) 10 soruluk final
  - (c) 5 soruluk deneme

---

## DERS: Özsermaye Kârlılığı: Şirket Parasını Verimli Yönetiyor mu? (lesson_id=39, unit_id=3)
*Kamuyu Aydınlatma ve haber okumak*

#### Adım 1 — READ · KAP Nedir? - Başlangıç

Ortak, bu derste odak konumuz: kap nedir?. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** KAP Nedir?

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste kap nedir? konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, KAP Nedir? dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** KAP Nedir? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Borçluluk Analizi: Şirket Finansal Olarak Sıkışmış mı? (lesson_id=40, unit_id=3)
*Şirketi bağlamında değerlendirmek*

#### Adım 1 — READ · Sektör Analizi - Başlangıç

Ortak, bu derste odak konumuz: sektör analizi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Sektör Analizi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste sektör analizi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Sektör Analizi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Sektör Analizi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Temettü Verimliliği ve Büyümesi Hesaplama (lesson_id=41, unit_id=3)
*Aynı sektörde kimi seçmeli?*

#### Adım 1 — READ · Rakip Karşılaştırması - Başlangıç

Ortak, bu derste odak konumuz: rakip karşılaştırması. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Rakip Karşılaştırması

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste rakip karşılaştırması konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Rakip Karşılaştırması dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Rakip Karşılaştırması konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Seviye 3 Final: Bir Şirketi Check-up’tan Geçirmek (lesson_id=42, unit_id=3)
*Tüm göstergeleri bir arada okumak*

#### Adım 1 — READ · Temel Analiz Sentezi - Başlangıç

Ortak, bu derste odak konumuz: temel analiz sentezi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Temel Analiz Sentezi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste temel analiz sentezi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Temel Analiz Sentezi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Temel Analiz Sentezi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Teknik Analiz Mantığı: Geçmiş Veri Geleceğe Işık Tutabilir mi? (lesson_id=16, unit_id=4)
*Grafik okumaya giriş*

#### Adım 1 — READ · Teknik Analiz Nedir? - Başlangıç

Ortak, bu derste odak konumuz: teknik analiz nedir?. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Teknik Analiz Nedir?

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste teknik analiz nedir? konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Teknik Analiz Nedir? dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Teknik Analiz Nedir? konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Grafik Türleri: Çizgi, Bar ve Mum Grafikleri Okuma (lesson_id=17, unit_id=4)
*Fiyatın hafızası*

#### Adım 1 — READ · Destek ve Direnç - Başlangıç

Ortak, bu derste odak konumuz: destek ve direnç. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Destek ve Direnç

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste destek ve direnç konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Destek ve Direnç dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Destek ve Direnç konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Trendleri Görmek: Yükselen, Düşen ve Yatay Kanallar (lesson_id=18, unit_id=4)
*Yönü okumak*

#### Adım 1 — READ · Trend Çizgileri - Başlangıç

Ortak, bu derste odak konumuz: trend çizgileri. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Trend Çizgileri

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste trend çizgileri konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Trend Çizgileri dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Trend Çizgileri konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 1 (lesson_id=76, unit_id=4)
*Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 1

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu testin amacı nedir?
  - (a) İlk 3 ders kazanımlarını ölçmek ✓
  - (b) Sadece hız denemek
  - (c) Rastgele seçim yapmak

**Final S2:** **Soru:** Doğru öğrenme yaklaşımı hangisidir?
  - (a) Planlı ilerlemek ✓
  - (b) Acele etmek
  - (c) Sadece yorum takip etmek

**Final S3:** **Soru:** Hata riskini azaltan davranış hangisidir?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duyguyla karar vermek

**Final S4:** **Soru:** Analiz + plan + disiplin üçlüsü ne sağlar?
  - (a) Daha tutarlı karar ✓
  - (b) Daha çok acele
  - (c) Daha fazla belirsizlik

**Final S5:** **Soru:** Aşağıdakilerden hangisi zayıf yaklaşımdır?
  - (a) Sadece anlık harekete bakmak ✓
  - (b) Bağlamla karar vermek
  - (c) Kurala sadık kalmak

**Final S6:** **Soru:** Dengeli ilerlemede ilk adım nedir?
  - (a) Konuyu anlamak ✓
  - (b) Hemen işlem açmak
  - (c) Söylentiye gitmek

**Final S7:** **Soru:** Yeni başlayan için en doğru tercih hangisi?
  - (a) Az ama anlamlı metrik ✓
  - (b) Her şeyi aynı anda yüklenmek
  - (c) Sadece sosyal medya

**Final S8:** **Soru:** Karar kalitesini ne yükseltir?
  - (a) Sistemli tekrar ✓
  - (b) Rastgele deneme
  - (c) Acele

**Final S9:** **Soru:** Disiplinin yatırımdaki karşılığı nedir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Anlık tepki
  - (c) Hızlı yön değiştirmek

**Final S10:** **Soru:** Hangi ifade doğrudur?
  - (a) Bağlam olmadan fiyat yorumu eksik kalır ✓
  - (b) Fiyat tek başına her şeyi anlatır
  - (c) Yorumlar veriden güçlüdür

**Final S11:** **Soru:** Planın olmadığı yerde ne artar?
  - (a) Hata riski ✓
  - (b) Netlik
  - (c) Tutarlılık

**Final S12:** **Soru:** Güçlü öğrenme döngüsü hangi sıradır?
  - (a) Oku -> test et -> düzelt ✓
  - (b) Acele et -> unut
  - (c) Sadece izle

**Final S13:** **Soru:** Aşağıdakilerden hangisi riskli davranıştır?
  - (a) Plansız karar ✓
  - (b) Kural seti
  - (c) Ön kontrol

**Final S14:** **Soru:** Sağlam ilerleme neye dayanır?
  - (a) Süreç disiplini ✓
  - (b) Şans
  - (c) Taklit

**Final S15:** **Soru:** Kontrol listesi ne sağlar?
  - (a) Karar hatasını azaltır ✓
  - (b) Riski yok eder
  - (c) Kazancı garanti eder

**Final S16:** **Soru:** Tutarlı yatırımcı davranışı hangisidir?
  - (a) Aynı ilkelere bağlı kalmak ✓
  - (b) Her gün yeni kural
  - (c) Duyguyla yön değiştirmek

**Final S17:** **Soru:** Hangi ifade yanlıştır?
  - (a) Söylenti tek başına yeterli veridir ✓
  - (b) Bağlam önemlidir
  - (c) Plan disiplini gerekir

**Final S18:** **Soru:** Ara değerlendirme ne işe yarar?
  - (a) Kazanımı doğrular ✓
  - (b) Sadece süre doldurur
  - (c) Akışı bozar

**Final S19:** **Soru:** Süreç odaklı yaklaşımın sonucu nedir?
  - (a) Daha düşük hata oranı ✓
  - (b) Daha yüksek panik
  - (c) Rastgele sonuç

**Final S20:** **Soru:** Bu sınav hangi kapsamı ölçer?
  - (a) Ders 1-3 kapsamı ✓
  - (b) Sadece seviye sonu
  - (c) Sadece teknik sınav

---

## DERS: Destek ve Direnç Seviyeleri (lesson_id=19, unit_id=4)
*Gürültüyü filtrelemek*

#### Adım 1 — READ · Hareketli Ortalamalar - Başlangıç

Ortak, bu derste odak konumuz: hareketli ortalamalar. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Hareketli Ortalamalar

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste hareketli ortalamalar konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Hareketli Ortalamalar dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Hareketli Ortalamalar konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Hareketli Ortalamalar (lesson_id=20, unit_id=4)
*Fiyatın arkasındaki güç*

#### Adım 1 — READ · Hacim Analizi - Başlangıç

Ortak, bu derste odak konumuz: hacim analizi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Hacim Analizi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste hacim analizi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Hacim Analizi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Hacim Analizi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Göstergeler 1: RSI (lesson_id=43, unit_id=4)
*Aşırı alım, aşırı satım*

#### Adım 1 — READ · RSI ve Momentum - Başlangıç

Ortak, bu derste odak konumuz: rsi ve momentum. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** RSI ve Momentum

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste rsi ve momentum konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, RSI ve Momentum dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** RSI ve Momentum konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 2 (lesson_id=77, unit_id=4)
*Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 2

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu sınavın kapsadığı ders aralığı nedir?
  - (a) Ders 1-6 kapsamı ✓
  - (b) Sadece son ders
  - (c) Sadece final öncesi

**Final S2:** **Soru:** Ders 1-6 tekrarında doğru yöntem hangisidir?
  - (a) Konuları bağlayarak tekrar etmek ✓
  - (b) Parça parça ezberlemek
  - (c) Sadece rastgele çözmek

**Final S3:** **Soru:** Karar kalitesi en çok neyle artar?
  - (a) Plan ve sistem disiplini ✓
  - (b) Acele
  - (c) Söylenti

**Final S4:** **Soru:** Hata payını düşüren yaklaşım hangisi?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duygusal tepki

**Final S5:** **Soru:** Bağlam neden önemlidir?
  - (a) Kararı doğru zemine oturtur ✓
  - (b) Sadece süre uzatır
  - (c) Gereksizdir

**Final S6:** **Soru:** Sistemli yatırımcı hangi davranışı gösterir?
  - (a) Kurallarına sadık kalır ✓
  - (b) Her gün yön değiştirir
  - (c) Anlık tepki verir

**Final S7:** **Soru:** Ders tekrarının amacı nedir?
  - (a) Bilgiyi kalıcı hale getirmek ✓
  - (b) Sadece süre doldurmak
  - (c) Rastgele soru çözmek

**Final S8:** **Soru:** Hangi davranış risklidir?
  - (a) Plansız hız ✓
  - (b) Kontrollü adım
  - (c) Dengeli ilerleme

**Final S9:** **Soru:** Yatırım öğrenme sürecinde doğru sıra hangisi?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce uygula, sonra düşün
  - (c) Sadece izle

**Final S10:** **Soru:** Duygu yönetimi niçin kritiktir?
  - (a) Plan dışı hatayı azaltır ✓
  - (b) Kazancı garanti eder
  - (c) Riski yok eder

**Final S11:** **Soru:** Sürdürülebilir yaklaşım hangisidir?
  - (a) Süreç odaklı tekrar ✓
  - (b) Acele karar
  - (c) Tek veriye bakmak

**Final S12:** **Soru:** Ara değerlendirme 2 neyi kontrol eder?
  - (a) İlk 6 ders kazanımını ✓
  - (b) Sadece 1 dersi
  - (c) Sadece finali

**Final S13:** **Soru:** Aşağıdakilerden hangisi güçlü karar öncesi adımıdır?
  - (a) Kontrol sorusu sormak ✓
  - (b) Hızlı tepki
  - (c) Kopya karar

**Final S14:** **Soru:** Hangi ifade doğrudur?
  - (a) Sistem disiplini uzun vadede fark yaratır ✓
  - (b) Şans yeterlidir
  - (c) Plan gereksizdir

**Final S15:** **Soru:** Doğru tekrar stratejisi hangisidir?
  - (a) Konular arası bağlantı kurmak ✓
  - (b) Sadece son soruya bakmak
  - (c) Rastgele ilerlemek

**Final S16:** **Soru:** Karar netliği nasıl artar?
  - (a) Bağlam + kural birlikte kullanınca ✓
  - (b) Sadece sezgiyle
  - (c) Sadece hızla

**Final S17:** **Soru:** Aşağıdakilerden hangisi yanlıştır?
  - (a) Plansızlık faydalıdır ✓
  - (b) Plan disiplini gereklidir
  - (c) Kontrol listesi yararlıdır

**Final S18:** **Soru:** Risk yönetimi yaklaşımı ne ister?
  - (a) Önceden düşünülmüş sınırlar ✓
  - (b) Sınırsız deneme
  - (c) Tesadüf

**Final S19:** **Soru:** Sağlam ilerleme için kritik ikili hangisi?
  - (a) Plan ve disiplin ✓
  - (b) Acele ve panik
  - (c) Söylenti ve tahmin

**Final S20:** **Soru:** Bu sınavın türü nedir?
  - (a) 20 soruluk ara değerlendirme ✓
  - (b) 10 soruluk final
  - (c) 5 soruluk deneme

---

## DERS: Göstergeler 2: MACD (lesson_id=44, unit_id=4)
*Korku, açgözlülük ve karar alma*

#### Adım 1 — READ · Yatırımcı Psikolojisi - Başlangıç

Ortak, bu derste odak konumuz: yatırımcı psikolojisi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Yatırımcı Psikolojisi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste yatırımcı psikolojisi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Yatırımcı Psikolojisi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Yatırımcı Psikolojisi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: İşlem Hacmi Analizi (lesson_id=45, unit_id=4)
*Zarardayken strateji*

#### Adım 1 — READ · Ortalama Maliyet Düşürme - Başlangıç

Ortak, bu derste odak konumuz: ortalama maliyet düşürme. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Ortalama Maliyet Düşürme

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste ortalama maliyet düşürme konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Ortalama Maliyet Düşürme dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Ortalama Maliyet Düşürme konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Popüler Formasyonlar: Çanak, OBO ve Bayrak Mantığı (lesson_id=46, unit_id=4)
*Dağılım ve yeniden yapılanma*

#### Adım 1 — READ · Portföy Dengesi - Başlangıç

Ortak, bu derste odak konumuz: portföy dengesi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Portföy Dengesi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste portföy dengesi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Portföy Dengesi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Portföy Dengesi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Seviye 4 Final: Grafikle Konuşmak (lesson_id=47, unit_id=4)
*Strateji belgesi yazmak*

#### Adım 1 — READ · Kendi Sistemini Kurmak - Başlangıç

Ortak, bu derste odak konumuz: kendi sistemini kurmak. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Kendi Sistemini Kurmak

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste kendi sistemini kurmak konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Kendi Sistemini Kurmak dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Kendi Sistemini Kurmak konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Modern Portföy Teorisi: Riski Matematiksel Olarak Dağıtmak (lesson_id=21, unit_id=5)
*Paranın kartopu gibi büyümesi*

#### Adım 1 — READ · Bileşik Getiri - Başlangıç

Ortak, bu derste odak konumuz: bileşik getiri. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Bileşik Getiri

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste bileşik getiri konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Bileşik Getiri dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Bileşik Getiri konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Dolar Bazlı Getiri: Param Gerçekten mi Büyüyor, Enflasyona mı Yeniliyor? (lesson_id=22, unit_id=5)
*Büyük paranın etkisi*

#### Adım 1 — READ · Yabancı Takas ve Küresel Oyuncular - Başlangıç

Ortak, bu derste odak konumuz: yabancı takas ve küresel oyuncular. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Yabancı Takas ve Küresel Oyuncular

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste yabancı takas ve küresel oyuncular konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Yabancı Takas ve Küresel Oyuncular dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Yabancı Takas ve Küresel Oyuncular konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Makro Ekonomi: Faiz, Enflasyon ve Döviz Borsayı Nasıl Etkiler? (lesson_id=23, unit_id=5)
*Kur, enflasyon ve hisse fiyatı*

#### Adım 1 — READ · Döviz ve Borsa İlişkisi - Başlangıç

Ortak, bu derste odak konumuz: döviz ve borsa i̇lişkisi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Döviz ve Borsa İlişkisi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste döviz ve borsa i̇lişkisi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Döviz ve Borsa İlişkisi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Döviz ve Borsa İlişkisi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 1 (lesson_id=78, unit_id=5)
*Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 1

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu testin amacı nedir?
  - (a) İlk 3 ders kazanımlarını ölçmek ✓
  - (b) Sadece hız denemek
  - (c) Rastgele seçim yapmak

**Final S2:** **Soru:** Doğru öğrenme yaklaşımı hangisidir?
  - (a) Planlı ilerlemek ✓
  - (b) Acele etmek
  - (c) Sadece yorum takip etmek

**Final S3:** **Soru:** Hata riskini azaltan davranış hangisidir?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duyguyla karar vermek

**Final S4:** **Soru:** Analiz + plan + disiplin üçlüsü ne sağlar?
  - (a) Daha tutarlı karar ✓
  - (b) Daha çok acele
  - (c) Daha fazla belirsizlik

**Final S5:** **Soru:** Aşağıdakilerden hangisi zayıf yaklaşımdır?
  - (a) Sadece anlık harekete bakmak ✓
  - (b) Bağlamla karar vermek
  - (c) Kurala sadık kalmak

**Final S6:** **Soru:** Dengeli ilerlemede ilk adım nedir?
  - (a) Konuyu anlamak ✓
  - (b) Hemen işlem açmak
  - (c) Söylentiye gitmek

**Final S7:** **Soru:** Yeni başlayan için en doğru tercih hangisi?
  - (a) Az ama anlamlı metrik ✓
  - (b) Her şeyi aynı anda yüklenmek
  - (c) Sadece sosyal medya

**Final S8:** **Soru:** Karar kalitesini ne yükseltir?
  - (a) Sistemli tekrar ✓
  - (b) Rastgele deneme
  - (c) Acele

**Final S9:** **Soru:** Disiplinin yatırımdaki karşılığı nedir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Anlık tepki
  - (c) Hızlı yön değiştirmek

**Final S10:** **Soru:** Hangi ifade doğrudur?
  - (a) Bağlam olmadan fiyat yorumu eksik kalır ✓
  - (b) Fiyat tek başına her şeyi anlatır
  - (c) Yorumlar veriden güçlüdür

**Final S11:** **Soru:** Planın olmadığı yerde ne artar?
  - (a) Hata riski ✓
  - (b) Netlik
  - (c) Tutarlılık

**Final S12:** **Soru:** Güçlü öğrenme döngüsü hangi sıradır?
  - (a) Oku -> test et -> düzelt ✓
  - (b) Acele et -> unut
  - (c) Sadece izle

**Final S13:** **Soru:** Aşağıdakilerden hangisi riskli davranıştır?
  - (a) Plansız karar ✓
  - (b) Kural seti
  - (c) Ön kontrol

**Final S14:** **Soru:** Sağlam ilerleme neye dayanır?
  - (a) Süreç disiplini ✓
  - (b) Şans
  - (c) Taklit

**Final S15:** **Soru:** Kontrol listesi ne sağlar?
  - (a) Karar hatasını azaltır ✓
  - (b) Riski yok eder
  - (c) Kazancı garanti eder

**Final S16:** **Soru:** Tutarlı yatırımcı davranışı hangisidir?
  - (a) Aynı ilkelere bağlı kalmak ✓
  - (b) Her gün yeni kural
  - (c) Duyguyla yön değiştirmek

**Final S17:** **Soru:** Hangi ifade yanlıştır?
  - (a) Söylenti tek başına yeterli veridir ✓
  - (b) Bağlam önemlidir
  - (c) Plan disiplini gerekir

**Final S18:** **Soru:** Ara değerlendirme ne işe yarar?
  - (a) Kazanımı doğrular ✓
  - (b) Sadece süre doldurur
  - (c) Akışı bozar

**Final S19:** **Soru:** Süreç odaklı yaklaşımın sonucu nedir?
  - (a) Daha düşük hata oranı ✓
  - (b) Daha yüksek panik
  - (c) Rastgele sonuç

**Final S20:** **Soru:** Bu sınav hangi kapsamı ölçer?
  - (a) Ders 1-3 kapsamı ✓
  - (b) Sadece seviye sonu
  - (c) Sadece teknik sınav

---

## DERS: Portföy Rebalansı : Ne Zaman Satıp Ne Zaman Almalı? (lesson_id=24, unit_id=5)
*Faiz, büyüme ve piyasa*

#### Adım 1 — READ · Makroekonomik Göstergeler - Başlangıç

Ortak, bu derste odak konumuz: makroekonomik göstergeler. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Makroekonomik Göstergeler

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste makroekonomik göstergeler konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Makroekonomik Göstergeler dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Makroekonomik Göstergeler konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Davranışsal Finans: FOMO, Panik ve Psikoloji Yönetimi (lesson_id=25, unit_id=5)
*Panik anında ne yapmalı?*

#### Adım 1 — READ · Devre Kesici ve Kriz Yönetimi - Başlangıç

Ortak, bu derste odak konumuz: devre kesici ve kriz yönetimi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Devre Kesici ve Kriz Yönetimi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste devre kesici ve kriz yönetimi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Devre Kesici ve Kriz Yönetimi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Devre Kesici ve Kriz Yönetimi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Yatırım Fonları: Profesyonel Sepetlerle Birlikte Büyümek (lesson_id=48, unit_id=5)
*Tuzakları tanımak*

#### Adım 1 — READ · Spekülasyon ve Manipülasyon - Başlangıç

Ortak, bu derste odak konumuz: spekülasyon ve manipülasyon. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Spekülasyon ve Manipülasyon

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste spekülasyon ve manipülasyon konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Spekülasyon ve Manipülasyon dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Spekülasyon ve Manipülasyon konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Ara Değerlendirme 2 (lesson_id=79, unit_id=5)
*Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.*

#### Adım 1 — FINAL_QUIZ · Ara Değerlendirme 2

**Geçme eşiği:** 14/10

**Final S1:** **Soru:** Bu sınavın kapsadığı ders aralığı nedir?
  - (a) Ders 1-6 kapsamı ✓
  - (b) Sadece son ders
  - (c) Sadece final öncesi

**Final S2:** **Soru:** Ders 1-6 tekrarında doğru yöntem hangisidir?
  - (a) Konuları bağlayarak tekrar etmek ✓
  - (b) Parça parça ezberlemek
  - (c) Sadece rastgele çözmek

**Final S3:** **Soru:** Karar kalitesi en çok neyle artar?
  - (a) Plan ve sistem disiplini ✓
  - (b) Acele
  - (c) Söylenti

**Final S4:** **Soru:** Hata payını düşüren yaklaşım hangisi?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Kuralsız hareket etmek
  - (c) Duygusal tepki

**Final S5:** **Soru:** Bağlam neden önemlidir?
  - (a) Kararı doğru zemine oturtur ✓
  - (b) Sadece süre uzatır
  - (c) Gereksizdir

**Final S6:** **Soru:** Sistemli yatırımcı hangi davranışı gösterir?
  - (a) Kurallarına sadık kalır ✓
  - (b) Her gün yön değiştirir
  - (c) Anlık tepki verir

**Final S7:** **Soru:** Ders tekrarının amacı nedir?
  - (a) Bilgiyi kalıcı hale getirmek ✓
  - (b) Sadece süre doldurmak
  - (c) Rastgele soru çözmek

**Final S8:** **Soru:** Hangi davranış risklidir?
  - (a) Plansız hız ✓
  - (b) Kontrollü adım
  - (c) Dengeli ilerleme

**Final S9:** **Soru:** Yatırım öğrenme sürecinde doğru sıra hangisi?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce uygula, sonra düşün
  - (c) Sadece izle

**Final S10:** **Soru:** Duygu yönetimi niçin kritiktir?
  - (a) Plan dışı hatayı azaltır ✓
  - (b) Kazancı garanti eder
  - (c) Riski yok eder

**Final S11:** **Soru:** Sürdürülebilir yaklaşım hangisidir?
  - (a) Süreç odaklı tekrar ✓
  - (b) Acele karar
  - (c) Tek veriye bakmak

**Final S12:** **Soru:** Ara değerlendirme 2 neyi kontrol eder?
  - (a) İlk 6 ders kazanımını ✓
  - (b) Sadece 1 dersi
  - (c) Sadece finali

**Final S13:** **Soru:** Aşağıdakilerden hangisi güçlü karar öncesi adımıdır?
  - (a) Kontrol sorusu sormak ✓
  - (b) Hızlı tepki
  - (c) Kopya karar

**Final S14:** **Soru:** Hangi ifade doğrudur?
  - (a) Sistem disiplini uzun vadede fark yaratır ✓
  - (b) Şans yeterlidir
  - (c) Plan gereksizdir

**Final S15:** **Soru:** Doğru tekrar stratejisi hangisidir?
  - (a) Konular arası bağlantı kurmak ✓
  - (b) Sadece son soruya bakmak
  - (c) Rastgele ilerlemek

**Final S16:** **Soru:** Karar netliği nasıl artar?
  - (a) Bağlam + kural birlikte kullanınca ✓
  - (b) Sadece sezgiyle
  - (c) Sadece hızla

**Final S17:** **Soru:** Aşağıdakilerden hangisi yanlıştır?
  - (a) Plansızlık faydalıdır ✓
  - (b) Plan disiplini gereklidir
  - (c) Kontrol listesi yararlıdır

**Final S18:** **Soru:** Risk yönetimi yaklaşımı ne ister?
  - (a) Önceden düşünülmüş sınırlar ✓
  - (b) Sınırsız deneme
  - (c) Tesadüf

**Final S19:** **Soru:** Sağlam ilerleme için kritik ikili hangisi?
  - (a) Plan ve disiplin ✓
  - (b) Acele ve panik
  - (c) Söylenti ve tahmin

**Final S20:** **Soru:** Bu sınavın türü nedir?
  - (a) 20 soruluk ara değerlendirme ✓
  - (b) 10 soruluk final
  - (c) 5 soruluk deneme

---

## DERS: Tematic Yatırımlar: Teknoloji, Enerji ve Sürdürülebilirlik Fonları (lesson_id=49, unit_id=5)
*Net getiriyi hesaplamak*

#### Adım 1 — READ · Vergi ve Maliyet Yönetimi - Başlangıç

Ortak, bu derste odak konumuz: vergi ve maliyet yönetimi. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Vergi ve Maliyet Yönetimi

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste vergi ve maliyet yönetimi konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Vergi ve Maliyet Yönetimi dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Vergi ve Maliyet Yönetimi konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Temettü Emekliliği ve Bileşik Getirinin Gücü Stratejisi (lesson_id=50, unit_id=5)
*Altın, döviz, fon karşılaştırması*

#### Adım 1 — READ · Alternatif Varlıklar - Başlangıç

Ortak, bu derste odak konumuz: alternatif varlıklar. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Alternatif Varlıklar

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste alternatif varlıklar konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Alternatif Varlıklar dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Alternatif Varlıklar konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Yatırımcının Vergi ve Hukuki Hakları (lesson_id=51, unit_id=5)
*5, 10, 20 yıllık düşünmek*

#### Adım 1 — READ · Uzun Vadeli Yatırım Planı - Başlangıç

Ortak, bu derste odak konumuz: uzun vadeli yatırım planı. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Uzun Vadeli Yatırım Planı

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste uzun vadeli yatırım planı konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Uzun Vadeli Yatırım Planı dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Uzun Vadeli Yatırım Planı konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---

## DERS: Büyük Final: Kendi Yatırım Anayasamı Yazıyorum (lesson_id=52, unit_id=5)
*Kendi kurallarını yazmak*

#### Adım 1 — READ · Yatırımcı Manifestosu - Başlangıç

Ortak, bu derste odak konumuz: yatırımcı manifestosu. 

Temel mantığı sade ve adım adım kuracağız.

Sonra kısa uygulamalarla bilgiyi pekiştireceğiz.

#### Adım 2 — READ · Temel Mantık

Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.

Tanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.

Ortak, süreç net olunca kararlar da netleşir.

#### Adım 3 — READ · Neden Önemli?

Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.

Yanlış yorumlar genelde temel adım atlandığında oluşur.

Hız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.

#### Adım 4 — FLASHCARD · Kelime Kartı 1

**Ön:** Yatırımcı Manifestosu

**Arka:** Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.

#### Adım 5 — QUIZ · Alıştırma 1

**Soru:** Bu ders için en doğru ilk yaklaşım hangisidir?
  - (a) Konuyu planlı ve adım adım uygulamak ✓
  - (b) Sadece anlık hareketle karar vermek
  - (c) Sadece yorumları takip etmek

#### Adım 6 — QUIZ · Cümle Tamamlama 1

**Soru:** Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) rastgelelik

#### Adım 7 — READ · Uygulama Akışı

Bu bölümde odak, doğru sırayla ilerlemektir.

Sıra bozulduğunda yorum kalitesi düşebilir.

Adım adım akış, karar sürecini sadeleştirir.

#### Adım 8 — READ · Sık Hata Noktası

Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.

Çözüm: kısa kontrol listesi + net sıra.

Bu ikili, gereksiz hatayı azaltır.

#### Adım 9 — READ · Pratik Bakış

Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.

Tekrar eden küçük alıştırmalar büyük fark yaratır.

Şimdi bir mini kontrol daha yapacağız.

#### Adım 10 — FLASHCARD · Kelime Kartı 2

**Ön:** Kontrol Listesi

**Arka:** Karardan önce yapılan kısa doğrulama adımlarıdır.

#### Adım 11 — QUIZ · Alıştırma 2

**Soru:** Aşağıdakilerden hangisi daha sağlıklı uygulamadır?
  - (a) Önce bağlamı okuyup sonra karar vermek ✓
  - (b) Sadece anlık hareketle işlem açmak
  - (c) Kuralsız ilerlemek

#### Adım 12 — QUIZ · Cümle Tamamlama 2

**Soru:** Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.
  - (a) bağlam ✓
  - (b) panik
  - (c) tahmin
  - (d) söylenti

#### Adım 13 — READ · Senaryo

Kısa bir senaryo düşün: kritik bir karar anındasın.

Bu noktada hızdan önce doğrulama gerekir.

Doğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.

#### Adım 14 — READ · Karar Disiplini

Karar disiplini, zor anlarda sistemi koruyabilmektir.

Süreç bozulursa küçük hata büyüyebilir.

Disiplin, performansın omurgasıdır.

#### Adım 15 — READ · Ders Özeti

Bu derste yatırımcı manifestosu konusunu 3 katmanda kurduk.

Ana üçlü: plan + bağlam + disiplin.

Bu refleksler oturdukça karar kalitesi yükselir.

#### Adım 16 — FLASHCARD · Kelime Kartı 3

**Ön:** Süreç Disiplini

**Arka:** Kararları duygu yerine kuralla yürütme yaklaşımıdır.

#### Adım 17 — QUIZ · Alıştırma 3

**Soru:** Senaryoda en doğru ilk adım hangisidir?
  - (a) Kontrol listesine dönmek ✓
  - (b) Aceleyle karar vermek
  - (c) Sadece başkalarını kopyalamak

#### Adım 18 — QUIZ · Cümle Tamamlama 3

**Soru:** Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.
  - (a) plan ✓
  - (b) acele
  - (c) şans
  - (d) kopya

#### Adım 19 — AUDIO · Moono Sesli Özet

_Not: metadata.hidden_in_app=true (uygulamada gizli olabilir)_

**Giriş metni:** Ortak, Yatırımcı Manifestosu dersini kısa sesli özetle toparlayalım.

**audio_url:** https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3

_Uygulama: Ders 1 (id 27) ses adımı aktif; diğerleri çoğunlukla gizli._

#### Adım 20 — FINAL_QUIZ · Final Testi

**Geçme eşiği:** 4/10

**Final S1:** **Soru:** Yatırımcı Manifestosu konusunda en doğru yaklaşım hangisidir?
  - (a) Planlı ve adım adım ilerlemek ✓
  - (b) Acele ve kuralsız karar vermek
  - (c) Sadece söylentiye göre işlem yapmak

**Final S2:** **Soru:** Doğru karar sırası için en uygun ifade hangisidir?
  - (a) Bağlam -> plan -> karar ✓
  - (b) Panik -> hız -> karar
  - (c) Söylenti -> kopya -> karar

**Final S3:** **Soru:** Aşağıdakilerden hangisi daha sağlıklı davranıştır?
  - (a) Kontrol listesi kullanmak ✓
  - (b) Plansız hız
  - (c) Duygusal tepki

**Final S4:** **Soru:** Dersin ana çıktısı hangi ifade ile özetlenir?
  - (a) Önce anla, sonra uygula ✓
  - (b) Önce işlem aç, sonra düşün
  - (c) Sadece kalabalığı izle

**Final S5:** **Soru:** Sürdürülebilir yatırım davranışı hangisidir?
  - (a) Kurala bağlı kalmak ✓
  - (b) Her gün plansız yön değiştirmek
  - (c) Sadece şansa bırakmak

**Final S6:** **Soru:** Bu derste tekrar eden güçlü tema nedir?
  - (a) Disiplinli süreç yönetimi ✓
  - (b) Acele karar verme
  - (c) Rastgele işlem

---
