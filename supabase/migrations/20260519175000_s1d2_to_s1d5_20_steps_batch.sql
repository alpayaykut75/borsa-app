-- Batch content rollout: S1D2-S1D5
-- Lesson IDs:
-- 28 = S1D2 Hisse Senedi Nedir?
-- 29 = S1D3 Yatırımcı mı, Oyuncu mu?
-- 30 = S1D4 Borsa İstanbul Nedir?
-- 31 = S1D5 Endeksler ve BIST 100
--
-- Structure for each lesson:
-- 20 steps = 3x(3 read + 1 flashcard + 1 practice + 1 sentence completion) + audio + final quiz

-- ---------------------------------------------------------------------
-- S1D2 (lesson_id = 28)
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 28;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(28, 'read', 'Ortak, Hisse Senedi Ne Demek?', null, 1, $${
  "text": "Hisse senedi, bir şirketin ortaklık payıdır.\n\nYani hisse aldığında, o şirkete küçük bir ortak olursun.\n\nBu yüzden hisse fiyatı sadece rakam değil, ortaklık değeridir."
}$$::jsonb),
(28, 'read', 'Ortaklık Mantığı', null, 2, $${
  "text": "Şirket iyi yönetilir, büyür ve kârlılığını artırırsa bu durum hissedarın payına zamanla yansıyabilir.\n\nTersi durumda risk de vardır.\n\nBu nedenle hisse seçimi, şirket seçimi demektir."
}$$::jsonb),
(28, 'read', 'Hissedarın Bakışı', null, 3, $${
  "text": "Kısa vadede dalgalanma normaldir.\n\nAma hissedar, şirketin uzun vadeli gücüne bakar: iş modeli, rekabet gücü, kârlılık.\n\nSadece fiyat değil, şirketin kalitesi önemlidir."
}$$::jsonb),
(28, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Hissedar",
  "back_text": "Bir şirketin hissesine sahip olan, şirkete ortak kişidir."
}$$::jsonb),
(28, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Hisse senedi almak teknik olarak ne sağlar?",
  "options": [
    { "id": "a", "text": "Şirketten sabit faiz alacağı" },
    { "id": "b", "text": "Şirkete ortaklık payı" },
    { "id": "c", "text": "Şirket yönetimini tek başına alma" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(28, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Hisse senedi, şirketin ____ payını temsil eder.",
  "options": [
    { "id": "a", "text": "borç" },
    { "id": "b", "text": "ortaklık" },
    { "id": "c", "text": "maaş" },
    { "id": "d", "text": "tedarik" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(28, 'read', 'Neden Hisse Alınır?', null, 7, $${
  "text": "İki ana beklenti vardır: değer artışı ve şirketin üreteceği ekonomik güçten pay almak.\n\nBazı şirketler temettü de dağıtır.\n\nAma temel fikir yine aynı: ortaklıktan değer üretmek."
}$$::jsonb),
(28, 'read', 'Risk ve Gerçekçilik', null, 8, $${
  "text": "Her hisse yatırımında risk vardır.\n\nÖnemli olan riski yok etmek değil, yönetmektir.\n\nBunun için tek hisseye yüklenmek yerine dengeli portföy yaklaşımı tercih edilir."
}$$::jsonb),
(28, 'read', 'Fiyat ve Değer Ayrımı', null, 9, $${
  "text": "Fiyat, anlık piyasa görüşüdür; değer ise şirketin uzun vadeli kapasitesidir.\n\nİkisi kısa vadede ayrışabilir.\n\nİyi yatırımcı bu farkı okuyabilen kişidir."
}$$::jsonb),
(28, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Temettü",
  "back_text": "Şirketin elde ettiği kârın bir kısmını hissedarlarına dağıtmasıdır."
}$$::jsonb),
(28, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi daha doğru bir yatırım bakışıdır?",
  "options": [
    { "id": "a", "text": "Fiyat düştüyse şirket kesin kötüdür" },
    { "id": "b", "text": "Fiyat ve değer her zaman birebir aynıdır" },
    { "id": "c", "text": "Fiyat dalgalanabilir, şirket değeri ayrı değerlendirilir" }
  ],
  "correct_option_id": "c"
}$$::jsonb),
(28, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Sağlıklı hisse yatırımında önce ____ incelenir.",
  "options": [
    { "id": "a", "text": "şirketin temeli" },
    { "id": "b", "text": "anlık dedikodu" },
    { "id": "c", "text": "günlük renkler" },
    { "id": "d", "text": "şans" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(28, 'read', 'Senaryo: Yeni Şube Açılışı', null, 13, $${
  "text": "Bir şirket yeni şubeler açıyor ve satışlarını artırıyor.\n\nBu, şirketin gelir kapasitesine olumlu sinyal olabilir.\n\nYatırımcı için soru şudur: Bu büyüme sürdürülebilir mi?"
}$$::jsonb),
(28, 'read', 'Acele Karar Tuzağı', null, 14, $${
  "text": "Sadece tek bir haberle işlem açmak yanıltıcı olabilir.\n\nHaberi şirketin finansalıyla birlikte okumak daha doğru olur.\n\nYani hızdan önce bağlam gelir."
}$$::jsonb),
(28, 'read', 'Ders Özeti', null, 15, $${
  "text": "Hisse almak, şirket ortaklığıdır.\n\nKarar verirken fiyat kadar şirketin kalitesi önemlidir.\n\nOrtaklık bakışı kurulduğunda yatırım dili netleşir."
}$$::jsonb),
(28, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Değer",
  "back_text": "Şirketin uzun vadeli ekonomik gücünü ifade eder; fiyatla her zaman aynı olmayabilir."
}$$::jsonb),
(28, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda en sağlıklı ilk adım hangisidir?",
  "options": [
    { "id": "a", "text": "Haberi finansal etkisiyle birlikte okumak" },
    { "id": "b", "text": "Anında alım yapmak" },
    { "id": "c", "text": "Hiç bakmadan geçmek" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(28, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Hisse yatırımı, fiyat oyunu değil ____ yaklaşımıdır.",
  "options": [
    { "id": "a", "text": "ortaklık" },
    { "id": "b", "text": "tesadüf" },
    { "id": "c", "text": "kumar" },
    { "id": "d", "text": "rastgele" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(28, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, bu derste hisse senedinin ortaklık mantığını kurduk. Kısa bir sesli özetle toparlayalım."
}$$::jsonb),
(28, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Hisse senedi en doğru hangi kavramı temsil eder?",
      "options": [
        { "id": "a", "text": "Ortaklık payı" },
        { "id": "b", "text": "Sabit faiz alacağı" },
        { "id": "c", "text": "Şirket yönetim yetkisi" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Hissedar hangi yaklaşımı benimsemelidir?",
      "options": [
        { "id": "a", "text": "Sadece anlık fiyat" },
        { "id": "b", "text": "Şirketin uzun vadeli gücü" },
        { "id": "c", "text": "Sadece söylenti" }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "Temettü nedir?",
      "options": [
        { "id": "a", "text": "Kâr payı dağıtımı" },
        { "id": "b", "text": "Borç ödeme planı" },
        { "id": "c", "text": "Hisse bölünmesi" }
      ],
      "correct_option_id": "a"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D3 (lesson_id = 29)
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 29;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(29, 'read', 'Yatırımcı mı, Oyuncu mu?', null, 1, $${
  "text": "Ortak, aynı piyasada iki farklı yaklaşım var: yatırımcı ve oyuncu.\n\nYatırımcı plan ve değer odaklıdır.\n\nOyuncu ise anlık heyecan ve hızlı hareket peşindedir."
}$$::jsonb),
(29, 'read', 'Yatırımcı Zihniyeti', null, 2, $${
  "text": "Yatırımcı şirketi, sektörü ve riski birlikte düşünür.\n\nKısa dalgalanmada paniklemek yerine planına sadık kalır.\n\nOdak noktası süreklilik ve disiplin olur."
}$$::jsonb),
(29, 'read', 'Oyuncu Refleksi', null, 3, $${
  "text": "Oyuncu çoğu zaman fiyatın peşinden koşar.\n\nSık al-sat, duygusal karar ve plansızlık riski artırır.\n\nBu yaklaşım kısa vadede heyecanlı, uzun vadede yorucu olabilir."
}$$::jsonb),
(29, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Disiplin",
  "back_text": "Önceden belirlenen plana sadık kalma becerisidir."
}$$::jsonb),
(29, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Aşağıdakilerden hangisi yatırımcı davranışına daha yakındır?",
  "options": [
    { "id": "a", "text": "Anlık söylentiyle işlem açmak" },
    { "id": "b", "text": "Plan ve risk yönetimiyle hareket etmek" },
    { "id": "c", "text": "Her gün yön değiştirmek" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(29, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Yatırımcı kısa vadeli dalgalanmada ____ kalır.",
  "options": [
    { "id": "a", "text": "panik" },
    { "id": "b", "text": "sakin" },
    { "id": "c", "text": "kararsız" },
    { "id": "d", "text": "aceleci" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(29, 'read', 'Zaman Perspektifi', null, 7, $${
  "text": "Yatırımcı için zaman avantajdır.\n\nOyuncu için zaman baskıdır.\n\nAynı grafikte biri fırsat, diğeri panik görebilir."
}$$::jsonb),
(29, 'read', 'Duygu Yönetimi', null, 8, $${
  "text": "Korku ve açgözlülük en büyük tuzaktır.\n\nDuyguyla verilen karar, planı bozar.\n\nBu yüzden karar sistemi duygudan güçlü olmalıdır."
}$$::jsonb),
(29, 'read', 'Hangi Taraftasın?', null, 9, $${
  "text": "Soru şu: Piyasa seni yönetiyor mu, sen planını mı yönetiyorsun?\n\nYatırımcı yaklaşımı ikinciyi hedefler.\n\nBu fark, sonuçları yıllar içinde belirginleştirir."
}$$::jsonb),
(29, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Risk Profili",
  "back_text": "Yatırımcının dalgalanmaya dayanma kapasitesi ve tercih düzeyidir."
}$$::jsonb),
(29, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi duygusal karar örneğidir?",
  "options": [
    { "id": "a", "text": "Kuralına bağlı kalmak" },
    { "id": "b", "text": "Düşüşte panikle plansız satış" },
    { "id": "c", "text": "Önceden risk sınırı belirlemek" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(29, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Başarılı yatırımın temeli ____ ve disiplindir.",
  "options": [
    { "id": "a", "text": "acele" },
    { "id": "b", "text": "sabır" },
    { "id": "c", "text": "şans" },
    { "id": "d", "text": "söylenti" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(29, 'read', 'Senaryo: Sert Düşüş Günü', null, 13, $${
  "text": "Piyasa bir günde sert düştü.\n\nOyuncu paniğe kapılıp plansız satış yapabilir.\n\nYatırımcı ise önce neden düştüğünü analiz eder."
}$$::jsonb),
(29, 'read', 'Planın Gücü', null, 14, $${
  "text": "Önceden tanımlı plan, kriz anında karar kalitesini korur.\n\nPlan yoksa duygu devreye girer.\n\nYatırımcının sigortası, net kurallardır."
}$$::jsonb),
(29, 'read', 'Ders Özeti', null, 15, $${
  "text": "Yatırımcı ve oyuncu arasındaki fark, araç değil zihniyettir.\n\nDisiplin, sabır ve risk yönetimi uzun vadede fark yaratır.\n\nOrtak, bu bakış seni oyundan stratejiye taşır."
}$$::jsonb),
(29, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Duygu Tuzağı",
  "back_text": "Korku veya açgözlülükle plan dışı karar verme durumudur."
}$$::jsonb),
(29, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Sert düşüş gününde en sağlıklı ilk adım hangisidir?",
  "options": [
    { "id": "a", "text": "Panikle hepsini satmak" },
    { "id": "b", "text": "Düşüş nedenini analiz edip plana bakmak" },
    { "id": "c", "text": "Sosyal medyaya göre hareket etmek" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(29, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Yatırımcıyı oyuncudan ayıran ana unsur ____ yönetimidir.",
  "options": [
    { "id": "a", "text": "duygu" },
    { "id": "b", "text": "şans" },
    { "id": "c", "text": "söylenti" },
    { "id": "d", "text": "günlük renk" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(29, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, yatırımcı ve oyuncu farkını 2 dakikada netleştirelim."
}$$::jsonb),
(29, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Yatırımcı yaklaşımı hangi özelliğe yakındır?",
      "options": [
        { "id": "a", "text": "Plan ve disiplin" },
        { "id": "b", "text": "Sürekli hızlı al-sat" },
        { "id": "c", "text": "Sadece söylenti" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Oyuncu davranışında hangi risk yüksektir?",
      "options": [
        { "id": "a", "text": "Duygusal karar" },
        { "id": "b", "text": "Uzun vadeli sabır" },
        { "id": "c", "text": "Risk planı" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Sert düşüşte ilk doğru adım nedir?",
      "options": [
        { "id": "a", "text": "Panik satış" },
        { "id": "b", "text": "Analiz ve plan kontrolü" },
        { "id": "c", "text": "Rastgele alım" }
      ],
      "correct_option_id": "b"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D4 (lesson_id = 30)
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 30;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(30, 'read', 'Borsa İstanbul Nedir?', null, 1, $${
  "text": "Borsa İstanbul, Türkiye'de menkul kıymetlerin işlem gördüğü ana piyasadır.\n\nYani alıcı ve satıcı burada düzenli kurallarla buluşur.\n\nBu yapı, piyasanın güvenini destekler."
}$$::jsonb),
(30, 'read', 'Tek Çatı Mantığı', null, 2, $${
  "text": "Farklı şirketlerin hisseleri aynı sistemde işlem görür.\n\nBöylece yatırımcı fiyatı, hacmi ve veriyi şeffaf biçimde izler.\n\nBu düzen, dağınık pazara göre daha güvenli bir yapı sunar."
}$$::jsonb),
(30, 'read', 'Neden Bilmek Önemli?', null, 3, $${
  "text": "Yatırım yaptığın yerin kurallarını bilmek, karar kaliteni artırır.\n\nBorsa İstanbul'un işleyişini anlamak, fiyat hareketlerini daha doğru okumaya yardım eder.\n\nYani zemin netse karar da netleşir."
}$$::jsonb),
(30, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "BIST",
  "back_text": "Borsa İstanbul'un kısa adıdır."
}$$::jsonb),
(30, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "Borsa İstanbul'un temel rolü nedir?",
  "options": [
    { "id": "a", "text": "Alıcı-satıcıyı düzenli piyasada buluşturmak" },
    { "id": "b", "text": "Fiyatları sabitlemek" },
    { "id": "c", "text": "Riski tamamen kaldırmak" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(30, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: BIST, Türkiye'deki ____ işlem platformudur.",
  "options": [
    { "id": "a", "text": "dağınık" },
    { "id": "b", "text": "merkezi" },
    { "id": "c", "text": "kapalı" },
    { "id": "d", "text": "rastgele" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(30, 'read', 'İşleyiş Akışı', null, 7, $${
  "text": "Yatırımcı emri iletir, sistem uygun karşı emirle eşleştirir.\n\nBu süreç dijital olarak hızlı yürür.\n\nŞeffaf kayıt düzeni, güvenin temel parçalarından biridir."
}$$::jsonb),
(30, 'read', 'Şeffaflık Neden Kritik?', null, 8, $${
  "text": "Şeffaf veri olmadan sağlıklı karar zorlaşır.\n\nBorsa İstanbul'da temel amaç, veriye dayalı karar zeminini korumaktır.\n\nBöylece söylenti yerine bilgi öne çıkar."
}$$::jsonb),
(30, 'read', 'Yeni Başlayan İçin Bakış', null, 9, $${
  "text": "İlk adımda tüm detaylara boğulma.\n\nÖnce piyasa düzeni, şirket listesi ve temel işlem mantığını kavra.\n\nBu altyapı kurulduğunda diğer konular kolaylaşır."
}$$::jsonb),
(30, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "Likidite",
  "back_text": "Bir varlığın hızlı ve adil fiyata alınıp satılabilme kolaylığıdır."
}$$::jsonb),
(30, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Şeffaf piyasa verisinin en büyük katkısı nedir?",
  "options": [
    { "id": "a", "text": "Söylentiyi artırmak" },
    { "id": "b", "text": "Kararları bilgiye dayandırmak" },
    { "id": "c", "text": "Fiyatı sabitlemek" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(30, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Piyasa verisinin açık olması, ____ kalitesini artırır.",
  "options": [
    { "id": "a", "text": "karar" },
    { "id": "b", "text": "söylenti" },
    { "id": "c", "text": "karmaşa" },
    { "id": "d", "text": "belirsizlik" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(30, 'read', 'Senaryo: Emir Eşleşmesi', null, 13, $${
  "text": "Bir yatırımcı belirli fiyattan alım emri verdi.\n\nKarşı tarafta uygun satış emri varsa işlem gerçekleşir.\n\nPiyasa mekanizması bu eşleşme mantığıyla çalışır."
}$$::jsonb),
(30, 'read', 'Düzenin Faydası', null, 14, $${
  "text": "Kurallı yapı, işlem güvenliğini artırır.\n\nDağınık ve kuralsız piyasaya göre daha öngörülebilir bir zemin sağlar.\n\nBu da özellikle yeni yatırımcı için önemlidir."
}$$::jsonb),
(30, 'read', 'Ders Özeti', null, 15, $${
  "text": "Borsa İstanbul, Türkiye piyasasının ana işlem merkezidir.\n\nKurallı yapı + şeffaf veri + dijital eşleşme, temel işleyişi oluşturur.\n\nOrtak, zemin netse karar daha sağlam olur."
}$$::jsonb),
(30, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Eşleşme",
  "back_text": "Alım ve satım emirlerinin fiyat-zaman önceliğine göre buluşmasıdır."
}$$::jsonb),
(30, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda işlem ne zaman gerçekleşir?",
  "options": [
    { "id": "a", "text": "Uygun karşı emir bulunduğunda" },
    { "id": "b", "text": "Her zaman anında" },
    { "id": "c", "text": "Sadece gün sonunda" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(30, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Borsa İstanbul'da işlem mantığı, alım-satım ____ dayanır.",
  "options": [
    { "id": "a", "text": "eşleşmesine" },
    { "id": "b", "text": "rastlantıya" },
    { "id": "c", "text": "kapalı sisteme" },
    { "id": "d", "text": "söylentiye" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(30, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, Borsa İstanbul mantığını kısa bir sesli özetle pekiştirelim."
}$$::jsonb),
(30, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "BIST neyin kısa adıdır?",
      "options": [
        { "id": "a", "text": "Borsa İstanbul" },
        { "id": "b", "text": "Borsa İstatistik" },
        { "id": "c", "text": "Bireysel Sistem" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "İşlem hangi durumda gerçekleşir?",
      "options": [
        { "id": "a", "text": "Uygun karşı emirle" },
        { "id": "b", "text": "Rastgele" },
        { "id": "c", "text": "Yalnız gün sonunda" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Şeffaf verinin katkısı nedir?",
      "options": [
        { "id": "a", "text": "Söylentiyi artırır" },
        { "id": "b", "text": "Bilgiye dayalı karar sağlar" },
        { "id": "c", "text": "Fiyatı sabitler" }
      ],
      "correct_option_id": "b"
    }
  ]
}$$::jsonb);

-- ---------------------------------------------------------------------
-- S1D5 (lesson_id = 31)
-- ---------------------------------------------------------------------
delete from lesson_steps where lesson_id = 31;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
(31, 'read', 'Endeks Nedir?', null, 1, $${
  "text": "Endeks, birçok hissenin genel performansını tek sayı ile gösteren özet göstergedir.\n\nTek tek her hisseyi takip etmek zor olduğunda yön bulmaya yardımcı olur.\n\nYani piyasanın nabzını ölçen bir panel gibidir."
}$$::jsonb),
(31, 'read', 'BIST 100 Mantığı', null, 2, $${
  "text": "BIST 100, piyasadaki önemli şirketlerin genel hareketini temsil eder.\n\nBu yüzden yatırımcılar günün havasını anlamak için sıkça bu endekse bakar.\n\nEndeks tek başına karar değildir ama güçlü bir referanstır."
}$$::jsonb),
(31, 'read', 'Neden İşe Yarar?', null, 3, $${
  "text": "Endeks sayesinde genel yönü hızlı görürsün: iyimserlik mi, tedirginlik mi?\n\nTek hisseye takılı kalmadan büyük resmi okumayı sağlar.\n\nBu da karar sürecini dengeler."
}$$::jsonb),
(31, 'flashcard', 'Kelime Kartı 1', null, 4, $${
  "front_text": "Endeks",
  "back_text": "Belirli hisse grubunun toplu performansını gösteren ölçüttür."
}$$::jsonb),
(31, 'quiz', 'Alıştırma 1', null, 5, $${
  "question": "BIST 100 en çok ne işe yarar?",
  "options": [
    { "id": "a", "text": "Tek hisse fiyatını garanti etmeye" },
    { "id": "b", "text": "Piyasanın genel yönünü okumaya" },
    { "id": "c", "text": "Riski sıfırlamaya" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(31, 'quiz', 'Cümle Tamamlama 1', null, 6, $${
  "question": "Cümleyi tamamla: Endeks, piyasayı ____ olarak izlemeyi kolaylaştırır.",
  "options": [
    { "id": "a", "text": "tek tek" },
    { "id": "b", "text": "bütünsel" },
    { "id": "c", "text": "rastgele" },
    { "id": "d", "text": "kapalı" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(31, 'read', 'Tek Hisse ve Büyük Resim', null, 7, $${
  "text": "Tek bir hisse çok hareketli olabilir.\n\nAma endeks genel piyasa sağlığını daha dengeli yansıtır.\n\nBu yüzden önce büyük resim, sonra detay yaklaşımı güçlüdür."
}$$::jsonb),
(31, 'read', 'Ağırlık Etkisi', null, 8, $${
  "text": "Endeksi oluşturan hisselerin etkisi aynı değildir.\n\nBazı büyük şirketlerin hareketi endekste daha fazla iz bırakabilir.\n\nBu nedenle endeks yorumunda bile bileşen yapısı önemlidir."
}$$::jsonb),
(31, 'read', 'Yanlış Yorum Riski', null, 9, $${
  "text": "Endeks yükselirken her hisse yükselmeyebilir.\n\nEndeks düşerken de bazı hisseler güçlü kalabilir.\n\nYani endeks yönü, filtre görevi görür; nihai seçim için ek analiz gerekir."
}$$::jsonb),
(31, 'flashcard', 'Kelime Kartı 2', null, 10, $${
  "front_text": "BIST 100",
  "back_text": "Piyasanın genel yönünü izlemek için kullanılan temel endekslerden biridir."
}$$::jsonb),
(31, 'quiz', 'Alıştırma 2', null, 11, $${
  "question": "Aşağıdakilerden hangisi daha dengeli endeks yorumudur?",
  "options": [
    { "id": "a", "text": "Endeks yükseliyorsa tüm hisseler yükselir" },
    { "id": "b", "text": "Endeks yön verir, hisse seçimi için ek analiz gerekir" },
    { "id": "c", "text": "Endeks tek başına alım-satım kararıdır" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(31, 'quiz', 'Cümle Tamamlama 2', null, 12, $${
  "question": "Cümleyi tamamla: Endeks, nihai karar değil; önce ____ sağlar.",
  "options": [
    { "id": "a", "text": "yön filtresi" },
    { "id": "b", "text": "kesin kazanç" },
    { "id": "c", "text": "risk sıfırı" },
    { "id": "d", "text": "otomatik seçim" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(31, 'read', 'Senaryo: Endeks Yükselişi', null, 13, $${
  "text": "Endeks güçlü yükseliyor ama senin izlediğin hisse zayıf.\n\nBu durumda panik yerine şirket özel nedenlerini araştırmak gerekir.\n\nGenel hava pozitif olsa da hisse bazlı dinamikler farklı olabilir."
}$$::jsonb),
(31, 'read', 'Karar Adımı', null, 14, $${
  "text": "Önce endeksle piyasa yönünü oku.\n\nSonra sektör ve şirket bazında filtre daralt.\n\nBu iki aşamalı yaklaşım karar kalitesini artırır."
}$$::jsonb),
(31, 'read', 'Ders Özeti', null, 15, $${
  "text": "Endeks, piyasayı tek bakışta okumayı sağlar.\n\nAma tek başına yeterli değildir; hisse bazlı analizle tamamlanmalıdır.\n\nOrtak, büyük resmi görüp detaya inmek en sağlam yoldur."
}$$::jsonb),
(31, 'flashcard', 'Kelime Kartı 3', null, 16, $${
  "front_text": "Büyük Resim",
  "back_text": "Piyasanın genel yönünü endeksle okuyup sonra hisse bazında derine inmektir."
}$$::jsonb),
(31, 'quiz', 'Alıştırma 3', null, 17, $${
  "question": "Senaryoda en sağlıklı yaklaşım hangisidir?",
  "options": [
    { "id": "a", "text": "Endeksi görüp tüm hisseleri aynı sanmak" },
    { "id": "b", "text": "Şirket özel nedenleri ayrıca analiz etmek" },
    { "id": "c", "text": "Sadece tek gün verisine bakmak" }
  ],
  "correct_option_id": "b"
}$$::jsonb),
(31, 'quiz', 'Cümle Tamamlama 3', null, 18, $${
  "question": "Cümleyi tamamla: Endeks, kararın tamamı değil ____ adımıdır.",
  "options": [
    { "id": "a", "text": "ilk filtre" },
    { "id": "b", "text": "son hüküm" },
    { "id": "c", "text": "tek veri" },
    { "id": "d", "text": "otomatik emir" }
  ],
  "correct_option_id": "a"
}$$::jsonb),
(31, 'audio', 'Moono Sesli Özet', null, 19, $${
  "text": "Ortak, endeks mantığını kısa sesli özetle pekiştirelim."
}$$::jsonb),
(31, 'final_quiz', 'Final Testi', null, 20, $${
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Endeksin temel faydası nedir?",
      "options": [
        { "id": "a", "text": "Genel piyasa yönünü göstermek" },
        { "id": "b", "text": "Kesin kazanç vermek" },
        { "id": "c", "text": "Tek hisseyi sabitlemek" }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "BIST 100 neyi temsil eder?",
      "options": [
        { "id": "a", "text": "Tek bir hisseyi" },
        { "id": "b", "text": "Piyasanın önemli bölümünün genel hareketini" },
        { "id": "c", "text": "Sabit getiriyi" }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "Doğru karar akışı hangisidir?",
      "options": [
        { "id": "a", "text": "Önce endeks, sonra hisse analizi" },
        { "id": "b", "text": "Sadece tek hisse" },
        { "id": "c", "text": "Sadece tek gün fiyatı" }
      ],
      "correct_option_id": "a"
    }
  ]
}$$::jsonb);
