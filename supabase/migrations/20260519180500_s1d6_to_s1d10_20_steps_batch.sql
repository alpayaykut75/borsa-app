-- Batch content rollout: S1D6-S1D10 (lesson_id: 53-57)
-- Structure per lesson:
-- 3x (3 read + 1 flashcard + 1 practice + 1 sentence completion) + audio + final quiz = 20 steps

-- ---------------------------------------------------------------------
-- S1D6 (lesson_id = 53) - Fiyat Nasıl Oluşur?
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 53;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(53, 'read', 'Fiyatın Kalbi: Arz ve Talep', null, 1, $${
  "text": "Ortak, fiyatın özü çok net: almak isteyenle satmak isteyenin dengesi.\n\nAlıcı güçlü olursa fiyat yukarı, satıcı güçlü olursa fiyat aşağı kayar.\n\nBorsadaki her hareket bu dengenin sonucu."
}$$::jsonb),
(53, 'read', 'Emirler Nasıl Çalışır?', null, 2, $${
  "text": "Sen bir fiyattan alım emri girersin, karşıda uygun satış emri varsa işlem olur.\n\nYani fiyat, ekran başında yazılan değil; eşleşen emrin fiyatıdır.\n\nBu yüzden emir mantığını bilmek çok önemli."
}$$::jsonb),
(53, 'read', 'Neden Bir Anda Oynar?', null, 3, $${
  "text": "Haber, bilanço, faiz, jeopolitik gelişme... Hepsi beklentiyi etkiler.\n\nBeklenti değişince alıcı-satıcı dengesi de değişir.\n\nFiyatın hızlı hareketi çoğu zaman beklenti değişiminin yansımasıdır."
}$$::jsonb),
(53, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Arz - Talep",
  "back_text": "Fiyatı belirleyen temel denge; alıcı ve satıcının gücünü ifade eder."
}$$::jsonb),
(53, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Talep, satıştan güçlü olduğunda fiyat genelde ne yapar?",
  "options": [
    { "id": "a", "text": "Yukarı yönlü hareket eder" },
    { "id": "b", "text": "Sabit kalır" },
    { "id": "c", "text": "Kesin düşer" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(53, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Borsada fiyat, alım ve satım emirleri ____ oluşur.",
  "options": [
    { "id": "a", "text": "eşleşince" },
    { "id": "b", "text": "bekleyince" },
    { "id": "c", "text": "karışınca" },
    { "id": "d", "text": "kapanınca" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(53, 'read', 'Likidite Neden Önemli?', null, 7, $${
  "text": "Likidite yüksekse işlem yapmak daha kolay olur.\n\nLikidite düşük hisselerde küçük emir bile fiyatı sert oynatabilir.\n\nBu yüzden yeni başlayanlar likit hisselerde daha rahat ilerler."
}$$::jsonb),
(53, 'read', 'Psikoloji Etkisi', null, 8, $${
  "text": "Piyasada sadece veri değil, duygu da fiyatı etkiler.\n\nKorku satışları hızlandırır, açgözlülük alımları şişirebilir.\n\nYatırımcı duyguyu değil planı takip etmelidir."
}$$::jsonb),
(53, 'read', 'Fiyat ve Değer Ayrımı', null, 9, $${
  "text": "Fiyat anlık görüşü yansıtır; değer uzun vadeli gerçekliği.\n\nİkisi kısa vadede ayrışabilir.\n\nBu farkı anlamak yatırım kararını güçlendirir."
}$$::jsonb),
(53, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Likidite",
  "back_text": "Bir varlığın hızlı ve adil fiyata alınıp satılabilme kolaylığıdır."
}$$::jsonb),
(53, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi sağlıklı fiyat yorumudur?",
  "options": [
    { "id": "a", "text": "Fiyat düştüyse şirket bitti" },
    { "id": "b", "text": "Fiyat her zaman değerin aynısıdır" },
    { "id": "c", "text": "Fiyatı, haber ve beklentiyle birlikte okumak gerekir" }
  ],
  "correct_option_id": "c"
}$$::jsonb),
(53, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Düşük likiditede küçük emirler bile fiyatı ____ oynatabilir.",
  "options": [
    { "id": "a", "text": "sert" },
    { "id": "b", "text": "hiç" },
    { "id": "c", "text": "yavaş" },
    { "id": "d", "text": "dengeli" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(53, 'read', 'Senaryo: Haber Sonrası Sıçrama', null, 13, $${
  "text": "Bir şirket güçlü bilanço açıkladı, fiyat açılışta sert yükseldi.\n\nBu hareket ilk tepki olabilir.\n\nAsıl karar için haberin sürdürülebilir etkisini görmek gerekir."
}$$::jsonb),
(53, 'read', 'İlk Adım Ne Olmalı?', null, 14, $${
  "text": "Fiyat koşarken plansız atlamak riskli olur.\n\nÖnce neden yükseldi, ne kadar sürdürülebilir, buna bak.\n\nSebep netse işlem daha sağlıklı olur."
}$$::jsonb),
(53, 'read', 'Ders Özeti', null, 15, $${
  "text": "Fiyatın temel motoru arz-talep dengesidir.\n\nAma yorum için likidite, psikoloji ve haber bağlamı birlikte okunmalıdır.\n\nOrtak, fiyatı değil sistemi anladığında hata azalır."
}$$::jsonb),
(53, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Fiyatlama",
  "back_text": "Piyasanın bilgi ve beklentiyi fiyatlara yansıtma sürecidir."
}$$::jsonb),
(53, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda en sağlıklı yaklaşım hangisidir?",
  "options": [
    { "id": "a", "text": "Fiyat koştu diye anında almak" },
    { "id": "b", "text": "Haberin kalıcı etkisini incelemek" },
    { "id": "c", "text": "Hiç bakmadan geçmek" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(53, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Sağlıklı fiyat okuması için önce ____ sonra işlem gelir.",
  "options": [
    { "id": "a", "text": "bağlam" },
    { "id": "b", "text": "acele" },
    { "id": "c", "text": "şans" },
    { "id": "d", "text": "renk" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(53, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, fiyatın nasıl oluştuğunu 2 dakikada toparlayalım."
}$$::jsonb),
(53, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Fiyatın temel belirleyicisi nedir?",
      "options": [
        { "id": "a", "text": "Arz-talep dengesi" },
        { "id": "b", "text": "Renkler" },
        { "id": "c", "text": "Şans" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Likidite düşükse ne olabilir?",
      "options": [
        { "id": "a", "text": "Fiyat daha sert oynayabilir" },
        { "id": "b", "text": "Fiyat sabit kalır" },
        { "id": "c", "text": "Risk sıfırlanır" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Sağlıklı karar için önce ne gerekir?",
      "options": [
        { "id": "a", "text": "Acele" },
        { "id": "b", "text": "Bağlam analizi" },
        { "id": "c", "text": "Söylenti" }
      ],
      "correct_option_id": "b"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D7 (lesson_id = 54) - Boğa ve Ayı Piyasası
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 54;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(54, 'read', 'Piyasanın İki Havası', null, 1, $${
  "text": "Ortak, piyasada iki ana dönem var: boğa ve ayı.\n\nBoğa dönemi iyimserliği, ayı dönemi tedirginliği temsil eder.\n\nHangi havada olduğunu anlamak, stratejiyi değiştirir."
}$$::jsonb),
(54, 'read', 'Boğa Dönemi', null, 2, $${
  "text": "Boğa piyasasında genel hava pozitif olur.\n\nAlıcı iştahı güçlüdür, fiyatlar yükseliş eğilimindedir.\n\nAma bu dönemde bile risk yönetimi bırakılmaz."
}$$::jsonb),
(54, 'read', 'Ayı Dönemi', null, 3, $${
  "text": "Ayı piyasasında güven zayıflar, satış baskısı artar.\n\nFiyatlar genel olarak aşağı eğilim gösterebilir.\n\nBu dönemler panik değil, disiplin testi dönemidir."
}$$::jsonb),
(54, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Boğa Piyasası",
  "back_text": "Genel iyimserlik ve yükseliş eğiliminin güçlü olduğu dönemdir."
}$$::jsonb),
(54, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Boğa piyasasını en doğru hangi ifade anlatır?",
  "options": [
    { "id": "a", "text": "Genel yükseliş ve iyimserlik" },
    { "id": "b", "text": "Sürekli panik satış" },
    { "id": "c", "text": "Hacimsiz ve durağan yapı" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(54, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Ayı piyasasında yatırımcı duygu olarak daha çok ____ hisseder.",
  "options": [
    { "id": "a", "text": "coşku" },
    { "id": "b", "text": "güven" },
    { "id": "c", "text": "tedirginlik" },
    { "id": "d", "text": "rahatlık" }
  ],
  "correct_option_id": "c"
}$$::jsonb),
(54, 'read', 'Döngü Mantığı', null, 7, $${
  "text": "Piyasa tek yönlü gitmez; dönemler dönüşür.\n\nBoğa gelir, ayı gelir, sonra tekrar dönüş olabilir.\n\nÖnemli olan tek döneme göre kimlik kurmamak."
}$$::jsonb),
(54, 'read', 'Yatırımcı Ne Yapar?', null, 8, $${
  "text": "Boğada aşırı özgüven tuzağına, ayıda panik tuzağına düşmemek gerekir.\n\nHer iki dönemde de plan, risk sınırı ve disiplin korunur.\n\nStrateji dönemle uyumlu ama ilke sabit olmalı."
}$$::jsonb),
(54, 'read', 'Duygu Değil Sistem', null, 9, $${
  "text": "Piyasa duyguyu sürekli test eder.\n\nSistemli yatırımcı duyguyu tanır ama kararını kuralla verir.\n\nUzun vadede farkı bu yaklaşım yaratır."
}$$::jsonb),
(54, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Ayı Piyasası",
  "back_text": "Genel karamsarlık ve düşüş eğiliminin güçlü olduğu dönemdir."
}$$::jsonb),
(54, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi döngü yaklaşımına uygundur?",
  "options": [
    { "id": "a", "text": "Piyasa hep aynı yönde gider" },
    { "id": "b", "text": "Dönem değişimine göre strateji ayarlanır" },
    { "id": "c", "text": "Sadece hisle karar verilir" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(54, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Boğa ve ayı dönemlerinde sabit kalması gereken şey ____ olmalıdır.",
  "options": [
    { "id": "a", "text": "duygu" },
    { "id": "b", "text": "sistem" },
    { "id": "c", "text": "söylenti" },
    { "id": "d", "text": "acele" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(54, 'read', 'Senaryo: Hızlı Düşüş Haftası', null, 13, $${
  "text": "Piyasa bir haftada sert düştü.\n\nPlansız yatırımcı panikleyebilir.\n\nSistemli yatırımcı önce risk planına döner."
}$$::jsonb),
(54, 'read', 'Soğukkanlılık Kuralı', null, 14, $${
  "text": "Dönem kötü olduğunda değil, plansız olduğunda zarar büyür.\n\nÖnceden tanımlı kurallar bu yüzden önemlidir.\n\nİşin sırrı tahmin değil, hazırlıktır."
}$$::jsonb),
(54, 'read', 'Ders Özeti', null, 15, $${
  "text": "Boğa ve ayı, piyasanın doğal döngüsüdür.\n\nDuyguyla değil sistemle ilerleyen yatırımcı her dönemde daha dengeli kalır.\n\nOrtak, dönem değişir ama disiplin değişmez."
}$$::jsonb),
(54, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Döngü",
  "back_text": "Piyasada yükseliş ve düşüş dönemlerinin dönüşümlü yaşanma yapısıdır."
}$$::jsonb),
(54, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Sert düşüş haftasında en doğru ilk adım nedir?",
  "options": [
    { "id": "a", "text": "Panik satış" },
    { "id": "b", "text": "Risk planına dönüp soğukkanlı kalmak" },
    { "id": "c", "text": "Sosyal medyaya göre işlem açmak" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(54, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Piyasa dönemleri değişir, ama yatırımcının ____ sabit kalmalıdır.",
  "options": [
    { "id": "a", "text": "disiplini" },
    { "id": "b", "text": "panik düzeyi" },
    { "id": "c", "text": "aceleciliği" },
    { "id": "d", "text": "hissi" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(54, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, boğa ve ayı dönemini kısa özetle netleştirelim."
}$$::jsonb),
(54, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Boğa piyasası neyi temsil eder?",
      "options": [
        { "id": "a", "text": "Yükseliş ve iyimserlik" },
        { "id": "b", "text": "Panik ve düşüş" },
        { "id": "c", "text": "Durgunluk" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Ayı döneminde en kritik yaklaşım nedir?",
      "options": [
        { "id": "a", "text": "Panik" },
        { "id": "b", "text": "Plan disiplini" },
        { "id": "c", "text": "Rastgele işlem" }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "Döngü yaklaşımı neyi söyler?",
      "options": [
        { "id": "a", "text": "Piyasa tek yönlüdür" },
        { "id": "b", "text": "Dönemler dönüşür" },
        { "id": "c", "text": "Tahmin her şeydir" }
      ],
      "correct_option_id": "b"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D8 (lesson_id = 55) - Enflasyon ve Yatırım
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 55;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(55, 'read', 'Enflasyon Neyi Yer?', null, 1, $${
  "text": "Ortak, enflasyon paranın alım gücünü zamanla düşürür.\n\nYani aynı para ile daha az ürün alınır.\n\nBu yüzden para sadece durunca değil, değer kaybedince de risk taşır."
}$$::jsonb),
(55, 'read', 'Nakitte Beklemek', null, 2, $${
  "text": "Parayı hiç değerlendirmeden tutmak bazen görünmez kayıp yaratır.\n\nNominal rakam aynı kalsa bile alım gücü azalabilir.\n\nBu farkı görmek yatırım bilincinin temelidir."
}$$::jsonb),
(55, 'read', 'Yatırımın Rolü', null, 3, $${
  "text": "Yatırımın amacı sadece kazanmak değil, satın alma gücünü korumaktır.\n\nDeğer üreten varlıklara ortak olmak bu yüzden önemlidir.\n\nBorsa bu koruma araçlarından biridir."
}$$::jsonb),
(55, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Enflasyon",
  "back_text": "Paranın satın alma gücünün zamanla azalmasıdır."
}$$::jsonb),
(55, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Enflasyonun temel etkisi nedir?",
  "options": [
    { "id": "a", "text": "Paranın alım gücünü düşürmek" },
    { "id": "b", "text": "Parayı otomatik büyütmek" },
    { "id": "c", "text": "Riski sıfırlamak" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(55, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Enflasyon yükseldikçe aynı para ile ____ şey alınır.",
  "options": [
    { "id": "a", "text": "daha çok" },
    { "id": "b", "text": "daha az" },
    { "id": "c", "text": "aynı" },
    { "id": "d", "text": "sınırsız" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(55, 'read', 'Reel Getiri', null, 7, $${
  "text": "Nominal kazanç tek başına yeterli değildir.\n\nAsıl önemli olan enflasyondan arındırılmış reel getiridir.\n\nYani kazancın, değer kaybını ne kadar telafi ettiği."
}$$::jsonb),
(55, 'read', 'Şirketler ve Fiyatlama', null, 8, $${
  "text": "Bazı şirketler maliyet artışını fiyatlara yansıtabilir.\n\nBu da enflasyon döneminde dayanıklılık sağlayabilir.\n\nYatırımcı için şirketin iş modeli burada belirleyicidir."
}$$::jsonb),
(55, 'read', 'Zaman Avantajı', null, 9, $${
  "text": "Yatırımda erken başlamak önemlidir.\n\nZaman, bileşik etkiyi güçlendirir.\n\nGeç kalmak çoğu zaman fırsat maliyeti yaratır."
}$$::jsonb),
(55, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Reel Getiri",
  "back_text": "Nominal getiri eksi enflasyon etkisiyle kalan gerçek kazançtır."
}$$::jsonb),
(55, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi daha doğru yaklaşımdır?",
  "options": [
    { "id": "a", "text": "Nominal kazanç tek başına yeterlidir" },
    { "id": "b", "text": "Reel getiri esas alınmalıdır" },
    { "id": "c", "text": "Enflasyon yatırımcının konusu değildir" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(55, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Sağlıklı değerlendirme için nominal değil ____ getiriye bakılır.",
  "options": [
    { "id": "a", "text": "reel" },
    { "id": "b", "text": "tahmini" },
    { "id": "c", "text": "anlık" },
    { "id": "d", "text": "rastgele" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(55, 'read', 'Senaryo: Maaş Artışı', null, 13, $${
  "text": "Maaşın %20 arttı ama enflasyon %30 oldu.\n\nNominal olarak artış var gibi görünür.\n\nReel olarak alım gücü düşmüş olabilir."
}$$::jsonb),
(55, 'read', 'Yorum Hatası', null, 14, $${
  "text": "Sadece nominal rakama bakmak yanıltır.\n\nGerçek durum için enflasyon etkisi mutlaka eklenmelidir.\n\nYatırımcı farkı burada yaratır."
}$$::jsonb),
(55, 'read', 'Ders Özeti', null, 15, $${
  "text": "Enflasyon görünmez bir aşındırıcıdır.\n\nYatırımın görevi yalnızca büyütmek değil, değeri korumaktır.\n\nOrtak, reel düşünmek yatırımın temel refleksidir."
}$$::jsonb),
(55, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Satın Alma Gücü",
  "back_text": "Belirli para miktarıyla alınabilen mal-hizmet kapasitesidir."
}$$::jsonb),
(55, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda en doğru yorum hangisidir?",
  "options": [
    { "id": "a", "text": "Nominal artış kesin kazançtır" },
    { "id": "b", "text": "Enflasyon etkisiyle reel kayıp olabilir" },
    { "id": "c", "text": "Enflasyon önemsizdir" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(55, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Yatırımda esas olan sadece rakam değil ____ korumaktır.",
  "options": [
    { "id": "a", "text": "alışkanlık" },
    { "id": "b", "text": "duygu" },
    { "id": "c", "text": "satın alma gücü" },
    { "id": "d", "text": "tesadüf" }
  ],
  "correct_option_id": "c"
}$$::jsonb),
(55, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, enflasyon ve reel getiri farkını kısa sesli özetle netleştirelim."
}$$::jsonb),
(55, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Enflasyonun temel etkisi nedir?",
      "options": [
        { "id": "a", "text": "Alım gücünü azaltmak" },
        { "id": "b", "text": "Parayı büyütmek" },
        { "id": "c", "text": "Riski sıfırlamak" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Doğru karşılaştırma hangisidir?",
      "options": [
        { "id": "a", "text": "Nominal getiri yeterlidir" },
        { "id": "b", "text": "Reel getiri esas alınır" },
        { "id": "c", "text": "Enflasyon dikkate alınmaz" }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "Yatırımın önemli rolü nedir?",
      "options": [
        { "id": "a", "text": "Değeri korumak ve büyütmek" },
        { "id": "b", "text": "Şansa bırakmak" },
        { "id": "c", "text": "Beklemek" }
      ],
      "correct_option_id": "a"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D9 (lesson_id = 56) - Risk Nedir?
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 56;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(56, 'read', 'Risk Kaçınılmaz mı?', null, 1, $${
  "text": "Ortak, yatırımda risk sıfır değildir.\n\nÖnemli olan riski yok etmek değil, yönetmektir.\n\nBu fark yatırımcı kalitesini belirler."
}$$::jsonb),
(56, 'read', 'Risk Türleri', null, 2, $${
  "text": "Bazı riskler piyasa geneline aittir, bazıları şirkete özeldir.\n\nŞirket riski seçimle, piyasa riski stratejiyle yönetilir.\n\nAyrım yapmak kararları güçlendirir."
}$$::jsonb),
(56, 'read', 'Çeşitlendirme Kalkanı', null, 3, $${
  "text": "Tüm sermayeyi tek hisseye koymak kırılganlığı artırır.\n\nFarklı sektör ve varlıklara dağılım riski dengeleyebilir.\n\nÇeşitlendirme, yatırımcının emniyet kemeridir."
}$$::jsonb),
(56, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Çeşitlendirme",
  "back_text": "Riski azaltmak için yatırımı farklı varlık ve sektörlere dağıtmaktır."
}$$::jsonb),
(56, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Aşağıdakilerden hangisi risk yönetimine daha uygundur?",
  "options": [
    { "id": "a", "text": "Tüm parayı tek hisseye koymak" },
    { "id": "b", "text": "Portföyü dengeli dağıtmak" },
    { "id": "c", "text": "Plansız işlem açmak" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(56, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Risk yönetimi, riski yok etmek değil riski ____ etmektir.",
  "options": [
    { "id": "a", "text": "yönetmek" },
    { "id": "b", "text": "görmezden gelmek" },
    { "id": "c", "text": "artırmak" },
    { "id": "d", "text": "ertelemek" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(56, 'read', 'Risk-Getiri Dengesi', null, 7, $${
  "text": "Yüksek getiri beklentisi genelde daha yüksek risk taşır.\n\nDüşük riskli tercihler daha dengeli ama sınırlı olabilir.\n\nUygun denge kişisel profile göre kurulur."
}$$::jsonb),
(56, 'read', 'Psikolojik Risk', null, 8, $${
  "text": "Korku ve açgözlülük, yatırımcının en görünmez riskidir.\n\nPlan dışı duygusal kararlar zarar büyütebilir.\n\nSistem kurmak psikolojik riski azaltır."
}$$::jsonb),
(56, 'read', 'Kural Seti', null, 9, $${
  "text": "Pozisyon boyutu, zarar sınırı, hedef planı gibi kurallar baştan tanımlanmalıdır.\n\nKriz anında bu kurallar karar yükünü azaltır.\n\nKural yoksa duygu devreye girer."
}$$::jsonb),
(56, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Risk Profili",
  "back_text": "Yatırımcının dalgalanmaya dayanma kapasitesi ve tercih düzeyidir."
}$$::jsonb),
(56, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi psikolojik risk örneğidir?",
  "options": [
    { "id": "a", "text": "Panikle plansız satış yapmak" },
    { "id": "b", "text": "Önceden belirlenen kurala bağlı kalmak" },
    { "id": "c", "text": "Portföyü dağıtmak" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(56, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Çeşitlendirme, portföyün ____ azaltır.",
  "options": [
    { "id": "a", "text": "kırılganlığını" },
    { "id": "b", "text": "takibini" },
    { "id": "c", "text": "şeffaflığını" },
    { "id": "d", "text": "esnekliğini" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(56, 'read', 'Senaryo: Tek Hisseye Yüklenmek', null, 13, $${
  "text": "Bir yatırımcı tüm sermayesini tek hisseye koydu.\n\nHisse sert düşünce portföyün tamamı etkilendi.\n\nDağılım eksikliği riski büyüttü."
}$$::jsonb),
(56, 'read', 'Alternatif Senaryo', null, 14, $${
  "text": "Aynı sermaye farklı sektörlere dağıtılsa darbe daha sınırlı olurdu.\n\nYani amaç kazancı kısmak değil, yıkıcı riski azaltmaktır.\n\nBu yaklaşım sürdürülebilirliği artırır."
}$$::jsonb),
(56, 'read', 'Ders Özeti', null, 15, $${
  "text": "Risk yatırımın düşmanı değil, yönetilmesi gereken gerçeğidir.\n\nÇeşitlendirme + kural seti + duygu yönetimi üçlü kalkan sağlar.\n\nOrtak, risk yönetimi varsa oyun uzun sürer."
}$$::jsonb),
(56, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Pozisyon Boyutu",
  "back_text": "Toplam sermayeye göre bir işleme ayrılan pay oranıdır."
}$$::jsonb),
(56, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Tek hisse senaryosunda temel hata neydi?",
  "options": [
    { "id": "a", "text": "Aşırı çeşitlendirme" },
    { "id": "b", "text": "Dağılım yapmamak" },
    { "id": "c", "text": "Kurala bağlı kalmak" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(56, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Sağlıklı yatırım için risk ____ olmalıdır.",
  "options": [
    { "id": "a", "text": "yönetilebilir" },
    { "id": "b", "text": "yok sayılmış" },
    { "id": "c", "text": "rastgele" },
    { "id": "d", "text": "sınırsız" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(56, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, risk yönetimi mantığını 2 dakikada pekiştirelim."
}$$::jsonb),
(56, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Risk yönetiminin amacı nedir?",
      "options": [
        { "id": "a", "text": "Riski yönetmek" },
        { "id": "b", "text": "Riski yok saymak" },
        { "id": "c", "text": "Riski artırmak" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Çeşitlendirme ne sağlar?",
      "options": [
        { "id": "a", "text": "Kırılganlığı azaltır" },
        { "id": "b", "text": "Riski sıfırlar" },
        { "id": "c", "text": "Takibi imkansızlaştırır" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Psikolojik risk örneği hangisidir?",
      "options": [
        { "id": "a", "text": "Kurala bağlı kalmak" },
        { "id": "b", "text": "Panikle plansız satış" },
        { "id": "c", "text": "Portföy dağıtımı" }
      ],
      "correct_option_id": "b"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D10 (lesson_id = 57) - İlk Adımı Atmak
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 57;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(57, 'read', 'Teori Tamam, Sıra Adımda', null, 1, $${
  "text": "Ortak, temel kavramları kurdun.\n\nŞimdi mesele bilgiyi plana çevirmek.\n\nİlk adımda hız değil, hazırlık kazanır."
}$$::jsonb),
(57, 'read', 'Acil Durum Fonu', null, 2, $${
  "text": "Yatırıma ayrılan para, kısa vadede ihtiyaç olmayacak para olmalıdır.\n\nAcil ihtiyaçta zorunlu satış yapmak planı bozar.\n\nBu yüzden güvenlik yastığı şarttır."
}$$::jsonb),
(57, 'read', 'Hedef Belirleme', null, 3, $${
  "text": "Neden yatırım yaptığını netleştir: öğrenmek mi, birikim büyütmek mi, uzun vade hedefi mi?\n\nHedef netse yöntem de netleşir.\n\nBelirsiz hedef, dağınık karar üretir."
}$$::jsonb),
(57, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Acil Durum Fonu",
  "back_text": "Beklenmeyen ihtiyaçlar için ayrılan ve yatırım dışında tutulan güvenlik payıdır."
}$$::jsonb),
(57, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Yatırıma başlanırken ilk öncelik hangisidir?",
  "options": [
    { "id": "a", "text": "Acil durum fonunu ayırmak" },
    { "id": "b", "text": "Tüm parayla girmek" },
    { "id": "c", "text": "Hızlı işlem denemek" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(57, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Sağlıklı başlangıç için önce ____ sonra yatırım gelir.",
  "options": [
    { "id": "a", "text": "hazırlık" },
    { "id": "b", "text": "acele" },
    { "id": "c", "text": "söylenti" },
    { "id": "d", "text": "kopya işlem" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(57, 'read', 'Plan Yazmak', null, 7, $${
  "text": "Plan; giriş kuralı, risk sınırı ve hedef çerçevesini içerir.\n\nYazılı plan, karar kalitesini artırır.\n\nKafa içi plan, kriz anında kolay dağılır."
}$$::jsonb),
(57, 'read', 'Küçük Başlamak', null, 8, $${
  "text": "İlk adımda büyük miktarla girmek gerekmez.\n\nKüçük pozisyonla süreç öğrenilir, hata maliyeti düşer.\n\nBüyüme, deneyimle birlikte yapılır."
}$$::jsonb),
(57, 'read', 'Süreklilik', null, 9, $${
  "text": "Yatırım tek atış değil, süreçtir.\n\nDüzenli gözden geçirme ve öğrenme döngüsü şarttır.\n\nSistemli ilerleyen yatırımcı uzun vadede avantaj sağlar."
}$$::jsonb),
(57, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Yatırım Planı",
  "back_text": "İşlem kararlarını rastgele değil, önceden belirlenen kurallarla yönetme çerçevesidir."
}$$::jsonb),
(57, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Yeni başlayan için en doğru yöntem hangisidir?",
  "options": [
    { "id": "a", "text": "Küçük başlayıp planı test etmek" },
    { "id": "b", "text": "Büyük ve hızlı işlem açmak" },
    { "id": "c", "text": "Plansız ilerlemek" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(57, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Yazılı plan, kriz anında ____ yükünü azaltır.",
  "options": [
    { "id": "a", "text": "karar" },
    { "id": "b", "text": "veri" },
    { "id": "c", "text": "fırsat" },
    { "id": "d", "text": "öğrenme" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(57, 'read', 'Senaryo: İlk İşlem Günü', null, 13, $${
  "text": "Yatırımcı ilk işlem günü piyasada dalga görünce kararsız kaldı.\n\nPlanı varsa adımı netleşir; yoksa duygu öne çıkar.\n\nİlk gün başarısı, planın varlığıyla başlar."
}$$::jsonb),
(57, 'read', 'Kontrol Listesi', null, 14, $${
  "text": "İşleme girmeden önce kısa liste: hedef net mi, risk sınırı yazılı mı, miktar uygun mu?\n\nBu üç soru birçok hatayı baştan keser.\n\nKontrol listesi, yatırımcının emniyet kapısıdır."
}$$::jsonb),
(57, 'read', 'Ders Özeti', null, 15, $${
  "text": "İlk adımın sırrı: hazırlık, plan ve disiplin.\n\nKüçük başla, düzenli öğren, sistemi koru.\n\nOrtak, yatırım yolculuğu böyle sürdürülebilir olur."
}$$::jsonb),
(57, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Disiplin",
  "back_text": "Plan dışına çıkmadan süreç boyunca aynı kurallara sadık kalma becerisidir."
}$$::jsonb),
(57, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda en sağlıklı hareket hangisidir?",
  "options": [
    { "id": "a", "text": "Duyguyla anında işlem açmak" },
    { "id": "b", "text": "Plan ve kontrol listesine dönmek" },
    { "id": "c", "text": "Sadece başkalarını kopyalamak" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(57, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Başarılı ilk adımın temeli ____ ve plandır.",
  "options": [
    { "id": "a", "text": "disiplin" },
    { "id": "b", "text": "acele" },
    { "id": "c", "text": "söylenti" },
    { "id": "d", "text": "rastlantı" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(57, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, ilk adımı nasıl sağlam atacağını kısa özetle toparlayalım."
}$$::jsonb),
(57, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "İlk adımda en kritik unsur hangisidir?",
      "options": [
        { "id": "a", "text": "Hazırlık ve plan" },
        { "id": "b", "text": "Hızlı işlem" },
        { "id": "c", "text": "Sadece his" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Acil durum fonu neden önemlidir?",
      "options": [
        { "id": "a", "text": "Zorunlu satış riskini azaltır" },
        { "id": "b", "text": "Getiriyi garanti eder" },
        { "id": "c", "text": "Riski sıfırlar" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Yazılı planın katkısı nedir?",
      "options": [
        { "id": "a", "text": "Karar kalitesini artırır" },
        { "id": "b", "text": "Duyguyu büyütür" },
        { "id": "c", "text": "Süreci karmaşıklaştırır" }
      ],
      "correct_option_id": "a"
    }
  ]
}$$::jsonb);
