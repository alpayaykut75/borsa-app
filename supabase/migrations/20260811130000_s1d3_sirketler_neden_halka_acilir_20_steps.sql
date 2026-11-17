-- Seviye 1 · Ders 3: Şirketler Neden Halka Açılır? (lesson_id 29) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Şirketler Neden Halka Açılır?',
    description = 'Büyümek için ortak aramak'
where id = 29;

update lesson_steps
set type = 'read',
    title = 'Ortak, Fırın Artık Mahalleye Sığmıyor',
    content = null,
    metadata = $moono$
{
  "text": "Geçen iki derste fırın büyüdü. Önce bir ortak aldı, sonra birkaç ortak daha. Şimdi hedefi çok daha büyük: on şehirde üretim, yeni bir fabrika, belki ihracat.\n\nAma bunun için gereken para, sahibinin tanıdığı herkesin toplayabileceğinin çok üstünde. Bankaya gitmenin de bir sınırı var; bankalar bir şirkete verecekleri borcu, o şirketin taşıyabileceği yükle ölçer.\n\nYani fırının önünde yeni bir soru duruyor: hiç tanımadığı binlerce insandan nasıl ortak bulacak?"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Halka Arz Ne Demek?',
    content = null,
    metadata = $moono$
{
  "text": "Cevabı basit ama sonuçları büyük: şirket paylarını herkese açar.\n\nBuna **halka arz** denir. Şirket, paylarının bir bölümünü belirlenen bir fiyattan geniş bir kitleye satışa çıkarır. Alan kişi kim olursa olsun, aldığı pay oranında şirketin ortağı olur. Bu işlemden sonra paylar borsada işlem görmeye başlar.\n\nYani halka arz, bir şirketin kapısını tanımadığı ortaklara açtığı andır."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Şirket Bundan Ne Kazanır?',
    content = null,
    metadata = $moono$
{
  "text": "Bir şirket bu kapıyı genellikle üç sebeple açar.\n\nBirincisi sermaye: geri ödemesi ve faizi olmayan büyük bir kaynak elde eder. İkincisi tanınırlık: adı borsada geçen bir şirket, müşterisi ve tedarikçisi için daha görünür hale gelir. Üçüncüsü mevcut ortaklarına çıkış imkânı: payını satmak isteyen bir kurucu artık tek tek alıcı aramak zorunda kalmaz.\n\nYani halka arz sadece para toplamak değildir; şirketin ölçek değiştirdiği bir eşiktir."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Halka Arz",
  "back_text": "Bir şirketin paylarının bir bölümünü ilk kez geniş bir kitleye satışa çıkarmasıdır. Bu işlemden sonra paylar borsada alınıp satılabilir hale gelir."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Bir şirket halka arza çıktığında ne yapmış olur?",
  "options": [
    {
      "id": "a",
      "text": "Yatırımcılardan faizli borç almış olur"
    },
    {
      "id": "b",
      "text": "Bankadaki kredi limitini yükseltmiş olur"
    },
    {
      "id": "c",
      "text": "Paylarının bir bölümünü herkese açmış olur"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Halka arzdan sonra şirketin payları ____ işlem görmeye başlar.",
  "options": [
    {
      "id": "a",
      "text": "yalnızca kurucular arasında"
    },
    {
      "id": "b",
      "text": "borsada herkese açık şekilde"
    },
    {
      "id": "c",
      "text": "sadece bankalar aracılığıyla"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Peki Şirket Ne Verir?',
    content = null,
    metadata = $moono$
{
  "text": "Bu kapı tek yönlü açılmaz. Şirket sermaye alırken karşılığında bir şeyler de bırakır.\n\nArtık finansal tablolarını düzenli olarak kamuya açıklamak zorundadır. Önemli her gelişmeyi — büyük bir yatırım, ciddi bir dava, yönetim değişikliği — herkesin aynı anda öğrenmesi için duyurur. Sermaye Piyasası Kurulu'nun, yani SPK'nın kurallarına uyar ve bağımsız denetimden geçer. Bunların hepsinin bir maliyeti ve bir iş yükü vardır.\n\nYani halka arz bir takastır: şirket sermaye alır, karşılığında şeffaflık ve denetim kabul eder."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Para Kime Gidiyor?',
    content = null,
    metadata = $moono$
{
  "text": "Halka arzda dikkat edilmesi gereken bir ayrım var ve çoğu kişi bunu atlar.\n\nİki farklı yol vardır. Birincisinde şirket yeni paylar yaratıp satar; toplanan para doğrudan şirkete girer ve yatırıma dönüşür. İkincisinde mevcut ortaklar kendi ellerindeki payları satar; bu durumda para şirkete değil, satan ortağın cebine gider. Bir halka arzda ikisi bir arada da olabilir.\n\nYani \"şirket halka açıldı\" cümlesi parayı kimin aldığını söylemez. Bunu ayrıca öğrenmen gerekir."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Cevaplar Nerede Yazıyor?',
    content = null,
    metadata = $moono$
{
  "text": "İyi haber şu: bu soruların cevabı tahmine bırakılmaz, hepsi tek bir belgede yazar.\n\nBu belgeye **izahname** denir. Şirketin ne iş yaptığı, finansal durumu, toplanacak paranın nereye harcanacağı, kimin ne kadar pay sattığı ve şirketin kendi gördüğü riskler burada yer alır. SPK bu belgeyi inceler ve onaylar; ama bu onay, bilgilerin usulüne uygun sunulduğu anlamına gelir. \"Bu iyi bir yatırımdır\" anlamına gelmez.\n\nYani izahname bir tavsiye değil, bir bilgi kaynağıdır. Kararı veren yine sensin."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "İzahname",
  "back_text": "Halka arz öncesinde yayımlanan resmi belgedir. Şirketin faaliyetlerini, finansal durumunu, toplanacak paranın kullanımını ve riskleri anlatır."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Bir halka arzda toplanan para nereye gider?",
  "options": [
    {
      "id": "a",
      "text": "Duruma göre değişir; şirkete ya da satan ortağa"
    },
    {
      "id": "b",
      "text": "Her koşulda doğrudan şirketin yatırım kasasına girer"
    },
    {
      "id": "c",
      "text": "Her koşulda mevcut ortakların kendi hesabına geçer"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Halka açılan bir şirket, sermaye karşılığında ____ kabul etmiş olur.",
  "options": [
    {
      "id": "a",
      "text": "sabit bir faiz yükümlülüğü"
    },
    {
      "id": "b",
      "text": "şeffaflık ve denetim yükümlülüğü"
    },
    {
      "id": "c",
      "text": "belirli bir geri ödeme takvimi"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: İki Farklı Halka Arz',
    content = null,
    metadata = $moono$
{
  "text": "Aynı hafta iki şirket halka açılıyor ve ikisi de aynı başlıkla duyuruluyor.\n\nA şirketi yeni paylar çıkarıyor ve toplam payların yüzde 25'ini satıyor; izahnamesinde toplanan paranın yeni bir fabrikaya harcanacağı yazıyor. B şirketinde ise kurucu ortak kendi paylarının bir bölümünü satıyor, halka açıklık oranı yüzde 40 oluyor ve şirkete tek kuruş girmiyor.\n\nYani ikisi de \"halka açıldı\" diye duyurulur ama hikâyeleri farklıdır. A'da fabrikanın gerçekten kurulup kurulmadığını takip etmek gerekir; B'de ise kurucunun neden çıktığını sormak."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Her Halka Arz Aynı Değildir',
    content = null,
    metadata = $moono$
{
  "text": "Buradan \"ortak satan halka arz kötüdür\" sonucunu çıkarmak yanlış olur.\n\nBir kurucunun ya da yatırım fonunun payını satmasının pek çok makul sebebi olabilir; yıllardır bekleyen bir yatırımcının nihayet çıkması bunlardan sadece biridir. Önemli olan sebebin iyi ya da kötü olması değil, senin bunu bilerek karar vermendir. Aynı şey fiyat için de geçerlidir: halka arz fiyatı şirketin değerinin üstünde de olabilir, altında da.\n\nYani halka arz kendiliğinden bir fırsat değildir. Sadece bir şirketin kapısının açıldığı andır; içeri girip girmemek ayrı bir karardır."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Halka arz, bir şirketin paylarını ilk kez geniş bir kitleye açmasıdır.\n\nŞirket bununla sermaye, tanınırlık ve mevcut ortaklarına çıkış imkânı kazanır. Karşılığında şeffaflık, denetim ve düzenli raporlama yükümlülüğü alır. Toplanan paranın şirkete mi yoksa satan ortağa mı gittiği ise izahnamede yazar.\n\nYani bu ders ilk iki dersin doğal devamıydı: bir işletme paylara bölünür, o payı alan kişi ortak olur, halka arz da o payların herkese açıldığı kapıdır."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Halka Açıklık Oranı",
  "back_text": "Bir şirketin paylarının yüzde kaçının halkın elinde olduğunu gösteren orandır. Kalan bölüm kurucularda ve büyük ortaklarda durur."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "SPK'nın bir izahnameyi onaylaması ne anlama gelir?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin gelecekte kâr edeceği doğrulanmıştır"
    },
    {
      "id": "b",
      "text": "Halka arz fiyatının uygun olduğu onaylanmıştır"
    },
    {
      "id": "c",
      "text": "Bilgilerin usulüne uygun sunulduğu incelenmiştir"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Halka açıklık oranı, şirketin paylarının ne kadarının ____ gösterir.",
  "options": [
    {
      "id": "a",
      "text": "halkın elinde olduğunu"
    },
    {
      "id": "b",
      "text": "kuruculara geri döndüğünü"
    },
    {
      "id": "c",
      "text": "bankaya rehin verildiğini"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 29 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, üçüncü dersi tamamladın. Şimdi iki dakikada halka arzın ne olduğunu ve şirkete neye mal olduğunu toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, üçüncü dersi tamamladın. Kısaca toparlayalım.\n\nFırın büyüdü ve artık tanıdık çevrenin toplayabileceğinden çok daha fazla paraya ihtiyacı var. Bankanın da bir sınırı var. Peki hiç tanımadığı binlerce insandan nasıl ortak bulacak?\n\nCevap halka arz. Şirket paylarının bir bölümünü belirlenen bir fiyattan herkese satışa çıkarır. Alan kişi kim olursa olsun aldığı pay oranında ortak olur ve bu paylar sonrasında borsada işlem görmeye başlar.\n\nŞirket bundan üç şey kazanır. Geri ödemesi ve faizi olmayan bir sermaye. Adının duyulmasıyla gelen tanınırlık. Ve mevcut ortakları için bir çıkış kapısı.\n\nAma bu kapı tek yönlü açılmaz. Şirket artık finansal tablolarını düzenli olarak açıklamak zorundadır. Önemli her gelişmeyi herkesin aynı anda öğrenmesi için duyurur. SPK'nın kurallarına uyar ve bağımsız denetimden geçer. Yani halka arz bir takastır: sermaye alınır, şeffaflık ve denetim kabul edilir.\n\nBir de çoğu kişinin atladığı bir ayrım var. Bazı halka arzlarda şirket yeni paylar çıkarır ve para doğrudan şirkete girer. Bazılarında ise mevcut ortaklar kendi paylarını satar ve para şirkete değil, satan kişiye gider. \"Şirket halka açıldı\" cümlesi bunu söylemez; bunu ayrıca öğrenmen gerekir.\n\nNerede yazar? İzahnamede. Şirketin ne iş yaptığı, finansal durumu, paranın nereye gideceği, kimin ne kadar sattığı ve şirketin gördüğü riskler hep orada. SPK bu belgeyi onaylar ama bu onay \"iyi bir yatırımdır\" demek değildir; bilgilerin usulüne uygun sunulduğu anlamına gelir.\n\nSon olarak şunu aklında tut: halka arz kendiliğinden bir fırsat değildir. Sadece bir kapının açıldığı andır. İçeri girip girmemek ayrı bir karar.\n\nÜçüncü adımı da mühürledin. Bir sonraki derste bu payların alınıp satıldığı yere, yani borsanın kendisine bakacağız."
}
$moono$::jsonb
where lesson_id = 29 and order_index = 19;

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
      "question": "Halka arz en doğru şekilde nasıl tanımlanır?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin paylarını ilk kez geniş kitleye açması"
        },
        {
          "id": "b",
          "text": "Şirketin bankadan uzun vadeli büyük kredi alması"
        },
        {
          "id": "c",
          "text": "Şirketin yatırımcılara faizli ve vadeli tahvil satması"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Halka açılan bir şirketin üstlendiği yükümlülük hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklarına her yıl kâr payı ödemek"
        },
        {
          "id": "b",
          "text": "Finansal durumunu düzenli olarak açıklamak"
        },
        {
          "id": "c",
          "text": "Payının fiyatını belirli bir seviyede tutmak"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q3",
      "question": "A şirketi halka arzda yeni paylar çıkarıp sattı. Toplanan para nereye gider?",
      "options": [
        {
          "id": "a",
          "text": "Payları satın alan yatırımcılara geri döner"
        },
        {
          "id": "b",
          "text": "Payları elinde tutan kurucuların hesabına"
        },
        {
          "id": "c",
          "text": "Doğrudan şirkete girer ve yatırıma dönüşür"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q4",
      "question": "B şirketinde kurucu ortak kendi paylarını sattı. Bu durumda ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Para satan ortağa gider, şirkete girmez"
        },
        {
          "id": "b",
          "text": "Para şirkete girer, ortak hiçbir şey almaz"
        },
        {
          "id": "c",
          "text": "Para şirket ile ortak arasında eşit bölünür"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "İzahnamede aşağıdakilerden hangisi yer almaz?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin finansal durumu ve temel faaliyetleri"
        },
        {
          "id": "b",
          "text": "Payın gelecekteki fiyat hedefi ve getiri sözü"
        },
        {
          "id": "c",
          "text": "Toplanan paranın hangi amaçla kullanılacağı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q6",
      "question": "Halka açıklık oranının yüzde 25 olması ne anlatır?",
      "options": [
        {
          "id": "a",
          "text": "Payların yüzde 25'i halkın elinde bulunur"
        },
        {
          "id": "b",
          "text": "Şirketin yüzde 25'i bankaya rehin verilmiştir"
        },
        {
          "id": "c",
          "text": "Kârın yüzde 25'i temettü olarak dağıtılır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q7",
      "question": "Bir yatırımcı halka arz kararını verirken ilk olarak nereye bakmalıdır?",
      "options": [
        {
          "id": "a",
          "text": "Sosyal medyada yapılan yorumlara"
        },
        {
          "id": "b",
          "text": "Talep toplamada oluşan katılım sayısına"
        },
        {
          "id": "c",
          "text": "Şirketin yayımladığı izahname belgesine"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "Bir şirket neden banka kredisi yerine halka arzı tercih edebilir?",
      "options": [
        {
          "id": "a",
          "text": "Halka arzda faiz oranları daha düşük olduğu için"
        },
        {
          "id": "b",
          "text": "Toplanan paranın geri ödeme yükü olmadığı için"
        },
        {
          "id": "c",
          "text": "Halka arzda finansal tablo açıklamak gerekmediği için"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q9",
      "question": "Halka arzdan sonra şirketin payları için ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Yalnızca kurucu ortaklar arasında el değiştirir"
        },
        {
          "id": "b",
          "text": "Bir yıl boyunca hiç alınıp satılamaz hale gelir"
        },
        {
          "id": "c",
          "text": "Borsada herkes tarafından alınıp satılabilir"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q10",
      "question": "\"Bu şirket halka açıldı\" cümlesi neden tek başına yetersizdir?",
      "options": [
        {
          "id": "a",
          "text": "Paranın şirkete mi ortağa mı gittiğini söylemez"
        },
        {
          "id": "b",
          "text": "Şirketin hangi yıl kurulduğunu hiç belirtmemiş olur"
        },
        {
          "id": "c",
          "text": "Şirketin kaç çalışanı olduğunu hiç anlatmamış olur"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 29 and order_index = 20;
