-- Seviye 1 · Ders 7: Fiyat Nasıl Oluşur? (lesson_id 54) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Fiyat Nasıl Oluşur?',
    description = 'Arz, talep ve son işlem fiyatı'
where id = 54;

update lesson_steps
set type = 'read',
    title = 'Ortak, O Rakam Tam Olarak Ne?',
    content = null,
    metadata = $moono$
{
  "text": "Bir hisseye baktın ve yanında bir rakam yazıyor. Diyelim 84,50 TL.\n\nBu rakam nereden geldi? Şirketin resmi bir açıklaması mı? Borsanın belirlediği bir liste fiyatı mı? Bir uzmanın hesapladığı değer mi? Hiçbiri değil. O rakam çok daha basit bir şeyi gösteriyor: en son gerçekleşen alım satımın fiyatını.\n\nYani ekranda gördüğün şey bir değerleme değil, bir anlaşma kaydıdır. Birileri en son o fiyattan el sıkıştı, ekran da onu yazdı."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'İki Taraf: Almak İsteyenler ve Satmak İsteyenler',
    content = null,
    metadata = $moono$
{
  "text": "Fiyatın nasıl oluştuğunu anlamak için borsaya iki kalabalık olarak bakmak gerekir.\n\nBir tarafta o payı almak isteyenler var; her biri ödemeye razı olduğu en yüksek fiyatı belirtir. Buna **talep** diyoruz. Diğer tarafta satmak isteyenler var; her biri kabul edeceği en düşük fiyatı belirtir. Buna da **arz** diyoruz. İki taraf da kendi çıkarına göre hareket eder: alıcı ucuza almak, satıcı pahalıya satmak ister.\n\nYani borsada tek bir fiyat değil, aslında binlerce farklı fiyat teklifi vardır. Fiyat bunların kesiştiği noktada doğar."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Anlaşma Olduğu An',
    content = null,
    metadata = $moono$
{
  "text": "Peki bu iki kalabalık nasıl anlaşır?\n\nBir alıcının ödemeye razı olduğu fiyat, bir satıcının kabul ettiği fiyata ulaştığı anda işlem gerçekleşir. Pay el değiştirir, para el değiştirir ve o fiyat ekrana **son işlem fiyatı** olarak yazılır. Sonraki saniyede başka bir alıcı ve satıcı daha yüksek ya da daha düşük bir fiyatta anlaşırsa, ekrandaki rakam da değişir.\n\nYani fiyat sabit bir şey değil, sürekli yenilenen bir kayıttır. Gün içinde binlerce kez değişebilir."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Son İşlem Fiyatı",
  "back_text": "Bir payda en son gerçekleşen alım satımın fiyatıdır. Şirketin değerini değil, o an anlaşan alıcı ile satıcının üzerinde uzlaştığı rakamı gösterir."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Borsada ekranda gördüğün fiyat neyi gösterir?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin gerçek değerini gösteren resmi rakamı"
    },
    {
      "id": "b",
      "text": "En son gerçekleşen alım satımın fiyatını"
    },
    {
      "id": "c",
      "text": "Gün sonunda oluşacak tahmini kapanış fiyatını"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir payı almak isteyenler satmak isteyenlerden fazlaysa fiyat ____ eğilimindedir.",
  "options": [
    {
      "id": "a",
      "text": "yükselme"
    },
    {
      "id": "b",
      "text": "düşme"
    },
    {
      "id": "c",
      "text": "sabit kalma"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Fiyat Neden Değişir?',
    content = null,
    metadata = $moono$
{
  "text": "Fiyat kendiliğinden hareket etmez. Değişen şey insanların beklentisidir.\n\nYeni bir bilgi geldiğinde — bir bilanço açıklandığında, bir sözleşme duyurulduğunda, faizler değiştiğinde — insanlar şirketin geleceği hakkında farklı düşünmeye başlar. Kimi \"bu şirket eskisinden daha değerli\" deyip almak ister, kimi \"riskler arttı\" deyip satmak ister. Emirler değişir, denge kayar, yeni bir fiyat oluşur.\n\nYani fiyatı hareket ettiren şey haberin kendisi değil, haberin insanların beklentisinde yarattığı değişimdir."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Fiyat ile Değer Aynı Şey Değildir',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi bu dersin en önemli ayrımına geliyoruz.\n\nFiyat, en son kimin kaça anlaştığıdır; gözlemlenir, tartışılmaz. Değer ise şirketin gerçekte ne kadar ettiğidir; hesaplanır, tahmin edilir ve herkes farklı sonuca varabilir. Bu ikisi çoğu zaman birbirine yakın seyreder ama her zaman eşit olmaz. Bazen bir şirket değerinin üstünde fiyatlanır, bazen altında.\n\nYani \"fiyatı 84 lira\" demek \"84 lira ediyor\" demek değildir. Fiyatı ekran söyler; değeri anlamak ayrı bir iştir ve Analist seviyesinde bunu öğreneceğiz."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Az İşlem, Sert Hareket',
    content = null,
    metadata = $moono$
{
  "text": "Beşinci derste likiditeden söz etmiştik. Şimdi onun fiyata etkisini görelim.\n\nÇok işlem gören bir payda her an çok sayıda alıcı ve satıcı vardır; büyük bir emir bile fiyatı çok oynatmaz, çünkü karşı tarafta yeterli teklif birikmiştir. Az işlem gören bir payda ise durum farklıdır: karşı tarafta yeterli emir yoksa tek bir işlem fiyatı beklenenden çok daha sert hareket ettirebilir. Bu hem yukarı hem aşağı yönde geçerlidir.\n\nYani aynı büyüklükteki bir emir, iki farklı hissede tamamen farklı sonuç doğurur. Fiyat hareketinin büyüklüğü tek başına bir anlam taşımaz."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Arz ve Talep",
  "back_text": "Arz, bir payı satmak isteyenlerin toplamıdır; talep ise almak isteyenlerin. Fiyat, bu iki tarafın karşılaşmasıyla oluşur ve denge kaydıkça değişir."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Az işlem gören bir hissede tek bir büyük emir ne yapabilir?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin piyasa değerini kalıcı olarak sabitler"
    },
    {
      "id": "b",
      "text": "Fiyatın o gün hiç değişmemesini sağlar"
    },
    {
      "id": "c",
      "text": "Fiyatı beklenenden sert biçimde hareket ettirir"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir şirketin piyasa değeri, pay fiyatı ile ____ çarpılarak bulunur.",
  "options": [
    {
      "id": "a",
      "text": "yıllık net kârı"
    },
    {
      "id": "b",
      "text": "toplam pay sayısı"
    },
    {
      "id": "c",
      "text": "halka açıklık oranı"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Haber Geldi',
    content = null,
    metadata = $moono$
{
  "text": "Fırın bir sabah duyuru yapıyor: Avrupa'ya ihracat için büyük bir anlaşma imzalandı.\n\nBu haberi duyan bazı yatırımcılar fırının gelecekte daha çok kazanacağını düşünüyor ve almak istiyor. Almak isteyenlerin sayısı ve teklif ettikleri fiyat yükseliyor. Satmak isteyenler ise daha yüksek fiyat beklemeye başlıyor. Sonuç: birkaç dakika içinde son işlem fiyatı yukarı hareket ediyor.\n\nYani haber fiyatı doğrudan değiştirmedi; insanların beklentisini değiştirdi, beklenti de emirleri. Üstelik haber duyurulur duyurulmaz fiyata yansıdığı için, saatler sonra aynı haberi okuyan biri artık avantajlı değildir."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 13;

update lesson_steps
set type = 'read',
    title = '"Bu Hisse Ucuz" Yanılgısı',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi yeni başlayanların en sık düştüğü tuzağı konuşalım.\n\nİki şirket düşün: birinin payı 5 lira, diğerininki 500 lira. Çoğu kişi ilkinin \"ucuz\" olduğunu sanır. Ama bu yanlıştır, çünkü pay fiyatı tek başına hiçbir şey söylemez. Önemli olan şirketin toplam değeridir ve bu, pay fiyatı ile toplam pay sayısının çarpımıyla bulunur. Buna **piyasa değeri** denir. 5 liralık payı olan şirketin 10 milyar payı varsa, 500 liralık payı olan ve 1 milyon payı olan şirketten çok daha büyüktür.\n\nYani pay fiyatına bakıp \"ucuz\" ya da \"pahalı\" demek, bir pastanın diliminin kalınlığına bakıp pastanın büyüklüğü hakkında hüküm vermeye benzer."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Borsada fiyatı kimse belirlemez; fiyat, almak isteyenlerle satmak isteyenlerin karşılaşmasından doğar.\n\nEkranda gördüğün rakam son işlem fiyatıdır, yani en son kimin kaça anlaştığı. Bu rakam şirketin değeriyle aynı şey değildir. Fiyatı hareket ettiren şey yeni bilgilerin insanların beklentisinde yarattığı değişimdir. Ve bir payın fiyatı tek başına ucuz ya da pahalı olduğunu söylemez; bunun için piyasa değerine bakmak gerekir.\n\nYani artık ekrandaki rakama bakarken ne gördüğünü biliyorsun: bir değerleme değil, bir anlaşmanın izi."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Piyasa Değeri",
  "back_text": "Bir şirketin borsadaki toplam değeridir. Pay fiyatı ile toplam pay sayısının çarpımıyla bulunur; şirketleri karşılaştırırken pay fiyatı yerine buna bakılır."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "İki şirketten birinin payı 5 TL, diğerininki 500 TL. Bundan ne çıkar?",
  "options": [
    {
      "id": "a",
      "text": "Hiçbir şey; karşılaştırmak için piyasa değeri gerekir"
    },
    {
      "id": "b",
      "text": "5 TL'lik pay diğerine göre daha ucuzdur"
    },
    {
      "id": "c",
      "text": "500 TL'lik şirket diğerinden daha büyüktür"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Borsada fiyatın değişmesinin temel sebebi ____ değişmesidir.",
  "options": [
    {
      "id": "a",
      "text": "borsa yönetiminin günlük kararının"
    },
    {
      "id": "b",
      "text": "şirketin açıkladığı fiyat hedefinin"
    },
    {
      "id": "c",
      "text": "alıcı ve satıcı dengesinin"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 54 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, yedinci dersi tamamladın. Şimdi iki dakikada ekrandaki o rakamın nereden geldiğini toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, yedinci dersi tamamladın. Kısaca toparlayalım.\n\nBir hisseye baktın ve yanında bir rakam var. Bu rakam şirketin resmi açıklaması değil, borsanın belirlediği bir liste fiyatı da değil. Çok daha basit bir şeyi gösteriyor: en son gerçekleşen alım satımın fiyatını. Yani bir değerleme değil, bir anlaşma kaydı.\n\nBorsaya iki kalabalık olarak bakmak gerekir. Bir tarafta almak isteyenler var; her biri ödemeye razı olduğu en yüksek fiyatı belirtir, buna talep diyoruz. Diğer tarafta satmak isteyenler var; her biri kabul edeceği en düşük fiyatı belirtir, buna da arz. Bir alıcının kabul ettiği fiyat bir satıcının kabul ettiği fiyata ulaştığı anda işlem olur ve o rakam ekrana yazılır.\n\nPeki fiyat neden değişir? Değişen şey insanların beklentisidir. Yeni bir bilgi geldiğinde kimi \"bu şirket daha değerli\" deyip almak ister, kimi \"riskler arttı\" deyip satmak. Emirler değişir, denge kayar, yeni fiyat oluşur.\n\nBurada çok önemli bir ayrım var. Fiyat, en son kimin kaça anlaştığıdır; gözlemlenir. Değer ise şirketin gerçekte ne ettiğidir; hesaplanır ve herkes farklı sonuca varabilir. İkisi çoğu zaman yakın seyreder ama her zaman eşit olmaz.\n\nBir de likiditenin etkisi var. Çok işlem gören bir payda büyük bir emir bile fiyatı fazla oynatmaz. Az işlem gören bir payda ise tek bir işlem fiyatı çok sert hareket ettirebilir.\n\nSon olarak yeni başlayanların en sık düştüğü tuzak: pay fiyatına bakıp \"ucuz\" demek. Beş liralık pay, beş yüz liralık paydan ucuz değildir. Önemli olan şirketin toplam değeridir; buna piyasa değeri diyoruz ve pay fiyatı ile toplam pay sayısını çarparak buluyoruz.\n\nYedinci adımı da mühürledin. Bir sonraki derste tek bir şirketten çıkıp bütün piyasaya bakacağız: endeksler."
}
$moono$::jsonb
where lesson_id = 54 and order_index = 19;

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
      "question": "Borsada bir payın fiyatı nasıl oluşur?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin açıkladığı değerleme raporuna göre"
        },
        {
          "id": "b",
          "text": "Borsa yönetiminin belirlediği günlük listeye göre"
        },
        {
          "id": "c",
          "text": "Alıcı ve satıcı emirlerinin karşılaşması sonucunda"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q2",
      "question": "\"Son işlem fiyatı\" ifadesi neyi anlatır?",
      "options": [
        {
          "id": "a",
          "text": "Gün içinde görülen en yüksek fiyatı"
        },
        {
          "id": "b",
          "text": "En son gerçekleşen alım satımın fiyatını"
        },
        {
          "id": "c",
          "text": "Şirketin resmi olarak açıkladığı fiyatı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "Bir şirket beklenenden iyi bir haber açıkladı. Genellikle ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Almak isteyenler artar, fiyat yükselebilir"
        },
        {
          "id": "b",
          "text": "Satmak isteyenler artar, fiyat hızla düşer"
        },
        {
          "id": "c",
          "text": "Borsa o payda işlemi bir gün durdurur"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "A şirketinin payı 10 TL ve toplam 1 milyon payı var. Piyasa değeri nedir?",
      "options": [
        {
          "id": "a",
          "text": "100 bin TL"
        },
        {
          "id": "b",
          "text": "1 milyon TL"
        },
        {
          "id": "c",
          "text": "10 milyon TL"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q5",
      "question": "Payı 8 TL olan şirket, payı 400 TL olan şirkete göre nasıl değerlendirilir?",
      "options": [
        {
          "id": "a",
          "text": "Kesinlikle daha ucuz ve daha risklidir"
        },
        {
          "id": "b",
          "text": "Yalnızca fiyata bakarak karşılaştırma yapılamaz"
        },
        {
          "id": "c",
          "text": "Kesinlikle daha küçük bir şirkettir"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q6",
      "question": "Az işlem gören bir payda fiyat neden daha sert hareket eder?",
      "options": [
        {
          "id": "a",
          "text": "Karşı tarafta yeterli alıcı veya satıcı bulunmadığı için"
        },
        {
          "id": "b",
          "text": "Borsa bu paylarda farklı bir kural uyguladığı için"
        },
        {
          "id": "c",
          "text": "Şirketler bu paylarda fiyatı kendileri belirlediği için"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q7",
      "question": "Fiyat ile değer arasındaki ilişki için hangisi doğrudur?",
      "options": [
        {
          "id": "a",
          "text": "Fiyat her zaman şirketin değerine eşittir"
        },
        {
          "id": "b",
          "text": "Şirketin değeri fiyattan bağımsız olarak sabittir"
        },
        {
          "id": "c",
          "text": "Fiyat son anlaşmadır; değer ayrıca incelenmelidir"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "Herkesin bildiği iyi bir haber fiyata ne yapar?",
      "options": [
        {
          "id": "a",
          "text": "Genellikle fiyata çoktan yansımış olur"
        },
        {
          "id": "b",
          "text": "Fiyatı her koşulda hızla ikiye katlar"
        },
        {
          "id": "c",
          "text": "Fiyatı bir hafta boyunca sabit tutar"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "Bir payı satmak isteyenler almak isteyenlerden fazlaysa ne beklenir?",
      "options": [
        {
          "id": "a",
          "text": "Fiyatın yükselmesi ve işlem hacminin artması"
        },
        {
          "id": "b",
          "text": "Fiyatın aşağı yönlü baskı altına girmesi"
        },
        {
          "id": "c",
          "text": "Borsanın fiyatı sabitlemek için müdahale etmesi"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "Fiyatın sürekli değişmesinin temel sebebi nedir?",
      "options": [
        {
          "id": "a",
          "text": "Alıcı ve satıcıların beklentilerinin sürekli değişmesi"
        },
        {
          "id": "b",
          "text": "Borsanın fiyatı gün içinde güncellemesi"
        },
        {
          "id": "c",
          "text": "Şirketin her gün yeni pay ihraç etmesi"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 54 and order_index = 20;
