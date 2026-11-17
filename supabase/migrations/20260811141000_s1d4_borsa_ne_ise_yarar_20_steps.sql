-- Seviye 1 · Ders 4: Borsa Ne İşe Yarar? (lesson_id 30) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Borsa Ne İşe Yarar?',
    description = 'Alıcıyla satıcıyı buluşturan çatı'
where id = 30;

update lesson_steps
set type = 'read',
    title = 'Ortak, Payı Aldın. Peki Sonra?',
    content = null,
    metadata = $moono$
{
  "text": "Geçen derste fırın halka açıldı ve sen de paylarından aldın. Artık ortaksın.\n\nAma bir gün paraya ihtiyacın olursa ne yapacaksın? Payını satman gerekecek. Peki kime? Fırının paylarını almak isteyen birini nasıl bulacaksın, hangi fiyattan anlaşacaksın, karşı taraf parayı gerçekten ödeyecek mi?\n\nYani ortak olmak bir sorunu çözerken bir yenisini doğuruyor: elindeki payı geri paraya çevirebilme sorunu."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Borsa Olmasaydı Ne Olurdu?',
    content = null,
    metadata = $moono$
{
  "text": "Bu soruyu ciddi ciddi düşünelim, çünkü borsanın niye var olduğu ancak böyle anlaşılır.\n\nBorsa olmasaydı payını satmak isteyen kişi alıcıyı kendi bulmak zorunda kalırdı. Tanıdıklarına sorardı, ilan verirdi, aylarca beklerdi. Fiyat konusunda tek tek pazarlık ederdi; çünkü ortada herkesin bildiği bir fiyat olmazdı. Anlaşsalar bile karşı tarafın parayı ödeyeceğine güvenmek zorunda kalırdı.\n\nYani ortaklık kâğıt üzerinde kalırdı. Satamadığın bir pay, elinde donmuş bir varlıktır."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Borsa Tam Olarak Ne Yapar?',
    content = null,
    metadata = $moono$
{
  "text": "Borsa bu üç sorunu birden çözer.\n\nPayı satmak isteyenle almak isteyeni aynı yerde buluşturur. Herkesin gördüğü tek bir fiyat oluşmasını sağlar. Ve işlemin kurallara göre tamamlanacağını, yani paranın ve payın gerçekten el değiştireceğini güvence altına alır. Bunu yaparken tarafların birbirini tanımasına hiç gerek yoktur.\n\nYani borsa bir alışveriş merkezi değil, bir buluşma ve güven altyapısıdır."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Borsa",
  "back_text": "Menkul kıymetlerin belirli kurallar çerçevesinde alınıp satıldığı düzenlenmiş piyasadır. Alıcıyla satıcıyı buluşturur ve işlemin tamamlanmasını güvence altına alır."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Borsanın bir yatırımcı için en temel işlevi nedir?",
  "options": [
    {
      "id": "a",
      "text": "Alınan payların değerinin artmasını sağlamak"
    },
    {
      "id": "b",
      "text": "Payı satmak isteyenle almak isteyeni buluşturmak"
    },
    {
      "id": "c",
      "text": "Şirketlerin kâr payı dağıtmasını zorunlu kılmak"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir varlığın hızlıca ve makul bir fiyattan nakde çevrilebilmesine ____ denir.",
  "options": [
    {
      "id": "a",
      "text": "sermaye"
    },
    {
      "id": "b",
      "text": "getiri"
    },
    {
      "id": "c",
      "text": "likidite"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Likidite: Kapının Her Zaman Açık Olması',
    content = null,
    metadata = $moono$
{
  "text": "Borsanın sağladığı en değerli şeye bir isim verelim: **likidite**.\n\nLikidite, bir varlığı istediğinde makul bir fiyattan nakde çevirebilme kolaylığıdır. Bir dairenin likiditesi düşüktür; satmak aylar sürebilir. Borsada işlem gören bir payın likiditesi ise yüksektir; saniyeler içinde alıcı bulabilirsin. Bu kolaylık payın kendisini daha değerli kılar, çünkü sıkıştığında elinde kalmayacağını bilirsin.\n\nYani likidite bir getiri değildir. Bir çıkış kapısıdır ve kapının açık olduğunu bilmek başlı başına bir güvencedir."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Herkes Aynı Fiyatı Görür',
    content = null,
    metadata = $moono$
{
  "text": "Borsanın ikinci büyük işlevi çoğu zaman fark edilmez: şeffaflık.\n\nBir payın son işlem fiyatı, o anda kim bakarsa baksın aynıdır. İstanbul'daki bir emekli de, Londra'daki bir fon yöneticisi de aynı rakamı aynı anda görür. Kimse \"sana özel fiyat\" alamaz, kimse fiyatı önceden öğrenemez. Emirler de aynı kurallara göre sıraya girer.\n\nYani borsa sadece alıcıyla satıcıyı buluşturmaz; onları eşit şartlarda buluşturur."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Peki Fiyatı Kim Belirliyor?',
    content = null,
    metadata = $moono$
{
  "text": "Burada sık yapılan bir hata var: fiyatın borsa tarafından belirlendiğini sanmak.\n\nBorsa fiyat koymaz. Fiyat, alıcıların ve satıcıların verdiği emirlerin karşılaşmasından çıkar. Borsa yalnızca bu karşılaşmanın kurallarını işletir ve sonucu ilan eder. Ekranda gördüğün rakam, birilerinin o fiyattan alıp satmayı kabul etmiş olmasından ibarettir.\n\nYani borsa fiyatın yaratıcısı değil, taşıyıcısıdır. Bunun nasıl olduğuna Ders 7'de tek tek bakacağız."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Likidite",
  "back_text": "Bir varlığın makul bir fiyattan hızlıca nakde çevrilebilme kolaylığıdır. Borsada işlem gören payların likiditesi, satılması zor varlıklara göre yüksektir."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Borsada oluşan fiyat hakkında hangisi doğrudur?",
  "options": [
    {
      "id": "a",
      "text": "Aynı anda herkese açık şekilde görünür"
    },
    {
      "id": "b",
      "text": "Yalnızca büyük yatırımcılara önceden bildirilir"
    },
    {
      "id": "c",
      "text": "Şirket yönetimi tarafından günlük belirlenir"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Borsa, işlemin tamamlanacağına dair ____ verir, ama fiyat garantisi vermez.",
  "options": [
    {
      "id": "a",
      "text": "yazılı bir kâr sözü"
    },
    {
      "id": "b",
      "text": "uzun vadeli bir taahhüt"
    },
    {
      "id": "c",
      "text": "kurumsal bir takas güvencesi"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Borsasız Bir Gün',
    content = null,
    metadata = $moono$
{
  "text": "İki komşuyu düşün. İkisi de aynı fırının ortağı ve ikisinin de aceleyle paraya ihtiyacı var.\n\nBorsasız dünyada birinci komşu payını satmak için tanıdıklarını arıyor, kimse ilgilenmiyor. Sonunda bulduğu tek alıcıya, elinde başka seçenek olmadığı için düşük bir fiyatı kabul ediyor. Borsalı dünyada ikinci komşu ise telefonundan emrini veriyor; karşısında binlerce potansiyel alıcı var ve işlem birkaç saniyede tamamlanıyor.\n\nYani ikisi de aynı paya sahipti. Aralarındaki tek fark, birinin çıkış kapısının olması."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Borsa Neyi Garanti Etmez?',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi madalyonun öbür yüzü. Borsanın ne yaptığını konuştuk; bir de ne yapmadığını netleştirelim.\n\nBorsa alıcı bulmayı kolaylaştırır, ama iyi bir fiyattan satacağını garanti etmez. Panik dönemlerinde herkes aynı anda satmak isteyebilir; o zaman alıcı sayısı azalır ve fiyatlar hızla düşer. Borsa bu düşüşü engellemez, sadece düzenli biçimde gerçekleşmesini sağlar. Kazanç konusunda ise hiçbir sözü yoktur.\n\nYani borsanın güvencesi işlemin kendisinedir, sonucuna değil. Çıkış kapısı her zaman açıktır; kapıdan ne kadar parayla çıkacağın ise piyasaya bağlıdır."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Borsa, payları almak ve satmak isteyenleri kurallı bir çatı altında buluşturan düzenlenmiş bir pazardır.\n\nÜç şey sağlar: likidite, yani payını nakde çevirebilme imkânı; şeffaflık, yani aynı fiyatın herkese aynı anda görünmesi; ve güven, yani işlemin kurallara göre tamamlanacağı. Buna karşılık ne fiyat ne de kazanç garantisi verir.\n\nYani borsa bir kazanç makinesi değil, bir buluşma altyapısıdır. Ortaklığı kâğıt üstünde kalmaktan çıkarıp elinde tutulabilir hale getiren şey budur."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Fiyat Keşfi",
  "back_text": "Alıcı ve satıcıların emirlerinin karşılaşmasıyla bir varlığın fiyatının ortaya çıkmasıdır. Fiyatı borsa belirlemez; borsa yalnızca oluşan fiyatı ilan eder."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Borsa olmasaydı bir pay sahibi için en büyük zorluk ne olurdu?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin kâr payı kararlarını hiç etkileyememek"
    },
    {
      "id": "b",
      "text": "Payını satmak için tek tek alıcı araması"
    },
    {
      "id": "c",
      "text": "Şirketin genel kurul toplantılarına hiç katılamaması"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Borsada bir payın son işlem fiyatı ____ tarafından belirlenir.",
  "options": [
    {
      "id": "a",
      "text": "alıcı ve satıcıların kararları"
    },
    {
      "id": "b",
      "text": "borsa yönetiminin günlük kararı"
    },
    {
      "id": "c",
      "text": "şirketin açıkladığı hedef fiyat"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 30 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, dördüncü dersi tamamladın. Şimdi iki dakikada borsanın gerçekten ne işe yaradığını toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, dördüncü dersi tamamladın. Kısaca toparlayalım.\n\nGeçen derste fırın halka açıldı ve sen paylarından aldın. Ama şöyle bir soru kaldı: bir gün paraya ihtiyacın olursa bu payı kime satacaksın?\n\nBorsa olmasaydı alıcıyı kendin bulacaktın. Tanıdıklarına soracak, aylarca bekleyecek, fiyat için tek tek pazarlık edecektin. Üstelik karşı tarafın parayı gerçekten ödeyeceğine güvenmek zorunda kalacaktın. Satamadığın bir pay, elinde donmuş bir varlıktır.\n\nBorsa tam olarak bu üç sorunu çözer. Alıcıyla satıcıyı aynı yerde buluşturur. Herkesin gördüğü tek bir fiyat oluşmasını sağlar. Ve işlemin kurallara göre tamamlanacağını güvence altına alır.\n\nBuradaki en değerli şeyin adı likidite. Yani bir varlığı istediğinde makul bir fiyattan nakde çevirebilme kolaylığı. Bir daireyi satmak aylar sürebilir; borsada işlem gören bir pay için saniyeler yeter. Likidite bir getiri değildir, bir çıkış kapısıdır.\n\nİkinci işlev şeffaflık. Bir payın son fiyatı, kim bakarsa baksın aynıdır. Kimse özel fiyat alamaz, kimse önceden öğrenemez.\n\nBurada sık yapılan bir hataya dikkat: fiyatı borsa belirlemez. Fiyat, alıcı ve satıcıların emirlerinin karşılaşmasından çıkar. Borsa sadece bu karşılaşmanın kurallarını işletir ve sonucu ilan eder.\n\nVe en önemlisi: borsa alıcı bulmayı kolaylaştırır, iyi bir fiyattan satacağını garanti etmez. Panik anlarında herkes aynı anda satmak isteyebilir, fiyatlar hızla düşebilir. Borsanın güvencesi işlemin kendisinedir, sonucuna değil.\n\nDördüncü adımı da mühürledin. Bir sonraki derste Türkiye'nin borsasına, yani Borsa İstanbul'a bakacağız."
}
$moono$::jsonb
where lesson_id = 30 and order_index = 19;

update lesson_steps
set type = 'final_quiz',
    title = 'Final Testi',
    content = null,
    metadata = $moono$
{
  "pass_threshold": 7,
  "questions": [
    {
      "id": "q1",
      "question": "Borsa en doğru şekilde nasıl tanımlanır?",
      "options": [
        {
          "id": "a",
          "text": "Şirketlere doğrudan sermaye sağlayan bir devlet kurumu"
        },
        {
          "id": "b",
          "text": "Pay fiyatlarını tek merkezden belirleyip ilan eden yer"
        },
        {
          "id": "c",
          "text": "Alıcı ve satıcıyı kurallı biçimde buluşturan pazar"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q2",
      "question": "Likidite kavramı neyi anlatır?",
      "options": [
        {
          "id": "a",
          "text": "Bir varlığın kolayca nakde çevrilebilmesini"
        },
        {
          "id": "b",
          "text": "Bir şirketin yıllık kâr oranını"
        },
        {
          "id": "c",
          "text": "Bir payın gelecekteki değer artışını"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Borsa olmasaydı payını satmak isteyen biri ne yapmak zorunda kalırdı?",
      "options": [
        {
          "id": "a",
          "text": "Payını doğrudan şirkete geri satmak zorunda kalırdı"
        },
        {
          "id": "b",
          "text": "Alıcıyı kendi bulup fiyatta anlaşmak zorunda kalırdı"
        },
        {
          "id": "c",
          "text": "Payını bir bankaya rehin bırakmak zorunda kalırdı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q4",
      "question": "Borsada oluşan fiyat kim tarafından belirlenir?",
      "options": [
        {
          "id": "a",
          "text": "Borsa yönetimi tarafından her sabah"
        },
        {
          "id": "b",
          "text": "Şirketin yönetim kurulu kararı tarafından"
        },
        {
          "id": "c",
          "text": "Alıcı ve satıcıların emirleri tarafından"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q5",
      "question": "Bir borsanın yatırımcıya sağladığı güvence hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "İşlemin kurallara göre tamamlanacağı güvencesi"
        },
        {
          "id": "b",
          "text": "Alınan payın değerinin artacağı güvencesi"
        },
        {
          "id": "c",
          "text": "Şirketin her yıl kâr edeceği güvencesi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q6",
      "question": "Aşağıdakilerden hangisi borsanın sağladığı bir şey değildir?",
      "options": [
        {
          "id": "a",
          "text": "Alıcı ve satıcının aynı yerde buluşması"
        },
        {
          "id": "b",
          "text": "Payın belirli bir fiyat seviyesinin altına düşmemesi"
        },
        {
          "id": "c",
          "text": "Fiyatın herkes tarafından aynı anda görülmesi"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q7",
      "question": "Panik dönemlerinde borsada ne olabilir?",
      "options": [
        {
          "id": "a",
          "text": "Satıcı çoğalır ve fiyatlar hızla düşebilir"
        },
        {
          "id": "b",
          "text": "Borsa işlemleri kalıcı biçimde tamamen durdurulur"
        },
        {
          "id": "c",
          "text": "Şirketler payları geri almak zorunda kalır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "Bir yatırımcı için likiditenin yüksek olması ne anlama gelir?",
      "options": [
        {
          "id": "a",
          "text": "Payın fiyatının sürekli yükseliyor olması"
        },
        {
          "id": "b",
          "text": "Şirketin borçlarının tamamen kapanmış olması"
        },
        {
          "id": "c",
          "text": "Payını satmak istediğinde alıcı bulabilmesi"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q9",
      "question": "Borsanın şeffaflık işlevi en iyi nasıl açıklanır?",
      "options": [
        {
          "id": "a",
          "text": "Aynı fiyatın aynı anda herkese görünmesi"
        },
        {
          "id": "b",
          "text": "Şirketlerin kârlarını herkese eşit dağıtması"
        },
        {
          "id": "c",
          "text": "Yatırımcıların birbirini isimle tanıyor olması"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q10",
      "question": "\"Borsa var, o zaman istediğim an istediğim fiyattan satarım\" diyen birine ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru, borsa her koşulda aynı fiyat seviyesini korur"
        },
        {
          "id": "b",
          "text": "Alıcı bulmak kolaylaşır ama fiyat garanti değildir"
        },
        {
          "id": "c",
          "text": "Doğru, borsa hem alıcıyı hem fiyatı garanti eder"
        }
      ],
      "correct_option_id": "b"
    }
  ]
}
$moono$::jsonb
where lesson_id = 30 and order_index = 20;
