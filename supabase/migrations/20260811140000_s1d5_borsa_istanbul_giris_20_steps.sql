-- Seviye 1 · Ders 5: Borsa İstanbul'a Giriş (lesson_id 31) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Borsa İstanbul''a Giriş',
    description = 'BIST''in pazarları ve işleyişi'
where id = 31;

update lesson_steps
set type = 'read',
    title = 'Ortak, Türkiye''nin Borsası Nerede?',
    content = null,
    metadata = $moono$
{
  "text": "Geçen derste borsanın ne işe yaradığını konuştuk. Şimdi somutlaştıralım: Türkiye'de bu iş nerede yapılıyor?\n\nCevap tek bir yer: **Borsa İstanbul**. Türkiye'de payların, tahvillerin ve daha birçok ürünün alınıp satıldığı tek organize borsa burasıdır. Bugünkü adını 2013'te aldı; o tarihte İMKB, İstanbul Altın Borsası ve Vadeli İşlem ve Opsiyon Borsası tek çatı altında birleştirildi.\n\nYani \"borsa\" dediğimizde Türkiye'de kastedilen kurum budur ve tek bir adrestir."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Kökleri Sandığından Eski',
    content = null,
    metadata = $moono$
{
  "text": "Bu kurum yeni bir fikir değil. Geçmişi Cumhuriyet'ten de öncesine uzanıyor.\n\nOsmanlı döneminde, 1866'da Dersaadet Tahvilat Borsası kuruldu; İstanbul'da menkul kıymet alım satımı o tarihte kurumsal bir düzene bağlandı. Modern dönemde ise 1985'te İstanbul Menkul Kıymetler Borsası, yani kısaca İMKB kuruldu ve işlemler 1986'da başladı. Bugün kullandığımız yapı bu birikimin üzerine oturuyor.\n\nYani borsa Türkiye'ye sonradan gelmiş bir kavram değil; yüz elli yılı aşan bir geçmişi var."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Tek Çatı, Farklı Piyasalar',
    content = null,
    metadata = $moono$
{
  "text": "Borsa İstanbul'da yalnızca şirket payları işlem görmez. Çatı aynıdır, altındaki bölümler farklıdır.\n\n**Pay Piyasası**, şirket paylarının alınıp satıldığı yerdir; bu uygulamanın ana konusu burasıdır. **Borçlanma Araçları Piyasası**, tahvil ve benzeri borçlanma ürünlerinin işlem gördüğü bölümdür — yani Ders 2'de konuştuğumuz alacaklı tarafı. **Vadeli İşlem ve Opsiyon Piyasası**, kısaca VİOP, türev ürünlerin yeridir. Bir de kıymetli madenlerin işlem gördüğü bölüm vardır.\n\nYani Borsa İstanbul tek bir pazar değil, aynı binada çalışan birkaç farklı pazarın toplamıdır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Borsa İstanbul",
  "back_text": "Türkiye'nin tek organize borsasıdır. 2013 yılında İMKB, İstanbul Altın Borsası ve VOB birleştirilerek kurulmuştur; pay, borçlanma aracı, türev ve kıymetli maden işlemleri burada yapılır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Borsa İstanbul hangi yıl bugünkü adıyla kuruldu?",
  "options": [
    {
      "id": "a",
      "text": "2013"
    },
    {
      "id": "b",
      "text": "1985"
    },
    {
      "id": "c",
      "text": "1866"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Şirket paylarının alınıp satıldığı bölüme ____ denir.",
  "options": [
    {
      "id": "a",
      "text": "Borçlanma Araçları Piyasası"
    },
    {
      "id": "b",
      "text": "Pay Piyasası"
    },
    {
      "id": "c",
      "text": "Kıymetli Madenler Piyasası"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Beş Harflik İsimler',
    content = null,
    metadata = $moono$
{
  "text": "Borsada şirketler tam unvanlarıyla değil, kısa kodlarla anılır.\n\nHer payın beş harften oluşan bir kodu vardır. Türk Hava Yolları için THYAO, Aselsan için ASELS gibi. Buna **BIST kodu** denir. Ekranlarda, haberlerde ve emir verirken hep bu kod kullanılır; çünkü uzun şirket unvanları yerine kısa ve tekil bir isim gerekir.\n\nYani bir şirketin borsadaki kimliği bu beş harftir. Bir hisseyi takip etmeye başlamak, önce kodunu öğrenmekle başlar."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Şirketler Neden Farklı Pazarlarda?',
    content = null,
    metadata = $moono$
{
  "text": "Borsa İstanbul'da işlem gören şirketlerin hepsi aynı yerde durmaz. Pay Piyasası kendi içinde pazarlara ayrılır.\n\nBaşlıcaları şunlardır: **Yıldız Pazar**, büyük ve yoğun işlem gören şirketlerin bulunduğu pazardır. **Ana Pazar**, orta ölçekli şirketlerin yeridir. **Alt Pazar**, daha küçük ölçekli şirketleri barındırır. Bir şirketin hangi pazara gireceği, piyasa değeri ve işlem görme ölçütlerine göre belirlenir. Bu ölçütler zaman içinde güncellenebilir.\n\nYani pazarlar bir sıralama tablosu değil, farklı büyüklükteki şirketlere farklı kuralların uygulanabilmesi için yapılmış bir ayrımdır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Bir de Yakın İzleme Pazarı Var',
    content = null,
    metadata = $moono$
{
  "text": "Bir pazar daha var ve bunu bilmek doğrudan seni korur.\n\n**Yakın İzleme Pazarı**, finansal yapısında bozulma, denetim sorunu ya da başka olağan dışı durumlar görülen şirketlerin alındığı pazardır. Amacı bu şirketleri ayrı bir ortamda takip edilebilir kılmak ve yatırımcıyı durumdan haberdar etmektir. Bir şirket koşulları düzelttiğinde diğer pazarlara geri dönebilir.\n\nYani bir hisseyi incelerken hangi pazarda olduğuna bakmak, ücretsiz ve saniyelik bir uyarı sistemidir."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Pazar",
  "back_text": "Pay Piyasası'nın, şirketleri büyüklük ve işlem ölçütlerine göre ayırdığı bölümlerdir. Yıldız Pazar, Ana Pazar, Alt Pazar ve Yakın İzleme Pazarı başlıcalarıdır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Bir şirketin hangi pazarda işlem göreceği neye göre belirlenir?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin faaliyet gösterdiği sektör grubuna göre"
    },
    {
      "id": "b",
      "text": "Şirketin kaç yıldır faaliyette olduğuna göre"
    },
    {
      "id": "c",
      "text": "Piyasa değeri ve işlem görme ölçütlerine göre"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir payın beş harften oluşan kısa adına ____ denir.",
  "options": [
    {
      "id": "a",
      "text": "BIST kodu"
    },
    {
      "id": "b",
      "text": "endeks adı"
    },
    {
      "id": "c",
      "text": "pazar sınıfı"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Aynı Ekranda İki Şirket',
    content = null,
    metadata = $moono$
{
  "text": "Ekranını açtın ve iki şirket görüyorsun. İlki Yıldız Pazar'da, ikincisi Alt Pazar'da.\n\nYıldız Pazar'daki şirket büyük; her gün çok sayıda alıcı ve satıcı var, yani likiditesi yüksek. Almak ya da satmak istediğinde karşında birini bulman kolay. Alt Pazar'daki şirket ise küçük; bazı günler çok az işlem görüyor. Satmak istediğinde karşında yeterli alıcı olmayabilir ve fiyat daha sert hareket edebilir.\n\nYani pazar bilgisi sana şirketin büyüklüğünü değil, esasen çıkış kapısının ne kadar geniş olduğunu söyler."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Pazar Bir Kalite Belgesi Değildir',
    content = null,
    metadata = $moono$
{
  "text": "Burada çok yaygın bir yanlış anlama var, hemen düzeltelim.\n\nBir şirketin Yıldız Pazar'da olması onun iyi bir yatırım olduğu anlamına gelmez. Pazar ayrımı büyüklük ve işlem ölçütlerine bakar; şirketin kârlı olup olmadığına, iyi yönetilip yönetilmediğine ya da payının pahalı olup olmadığına bakmaz. Büyük bir şirket de değer kaybedebilir. Aynı şekilde Alt Pazar'da olmak da kötü şirket demek değildir.\n\nYani pazar sana işlem koşulları hakkında bilgi verir, şirketin kalitesi hakkında değil. Kaliteyi ölçmeyi Analist seviyesinde öğreneceğiz."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Borsa İstanbul, Türkiye'nin tek organize borsasıdır ve 2013'te üç ayrı kurumun birleşmesiyle bugünkü halini almıştır.\n\nAltında birden fazla piyasa vardır; bizim ana konumuz olan şirket payları Pay Piyasası'nda işlem görür. Pay Piyasası da kendi içinde Yıldız, Ana ve Alt Pazar gibi bölümlere ayrılır. Riskli durumdaki şirketler ise Yakın İzleme Pazarı'na alınır. Her payın beş harflik bir BIST kodu vardır.\n\nYani bir hisseye ilk kez baktığında iki şeyi hemen öğrenebilirsin: kodu ve pazarı. İkisi de birer dakikadan kısa sürer ve ikisi de sana bir şey anlatır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "BIST Kodu",
  "back_text": "Bir şirketin borsadaki beş harfli kısa adıdır. Emir verirken, fiyat takip ederken ve haberlerde şirket bu kodla anılır."
}
$moono$::jsonb
where lesson_id = 31 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Yakın İzleme Pazarı ne amaçla kullanılır?",
  "options": [
    {
      "id": "a",
      "text": "En büyük şirketlerin paylarını bir arada tutmak"
    },
    {
      "id": "b",
      "text": "Riskli görülen şirketleri ayrı bir ortamda izlemek"
    },
    {
      "id": "c",
      "text": "Yeni halka açılan şirketleri geçici olarak barındırmak"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir şirketin Yıldız Pazar'da işlem görmesi, o şirketin ____ anlamına gelmez.",
  "options": [
    {
      "id": "a",
      "text": "piyasa değerinin yüksek olduğu"
    },
    {
      "id": "b",
      "text": "işlem hacminin geniş olduğu"
    },
    {
      "id": "c",
      "text": "iyi bir yatırım olduğu"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, beşinci dersi tamamladın. Şimdi iki dakikada Borsa İstanbul'un yapısını toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, beşinci dersi tamamladın. Kısaca toparlayalım.\n\nGeçen derste borsanın ne işe yaradığını konuştuk. Bu derste Türkiye'de bu işin nerede yapıldığına baktık: Borsa İstanbul.\n\nBugünkü adını 2013'te aldı. O tarihte İMKB, İstanbul Altın Borsası ve Vadeli İşlem ve Opsiyon Borsası tek çatı altında birleştirildi. Ama kökleri çok daha eski; 1866'da kurulan Dersaadet Tahvilat Borsası'na kadar uzanıyor.\n\nBorsa İstanbul'da yalnızca şirket payları işlem görmez. Pay Piyasası bizim ana konumuz. Borçlanma Araçları Piyasası'nda tahviller var, yani Ders 2'de konuştuğumuz alacaklı tarafı. VİOP'ta türev ürünler işlem görüyor. Bir de kıymetli madenlerin bölümü var.\n\nŞirketler borsada tam unvanlarıyla değil, beş harflik kodlarla anılır. Türk Hava Yolları için THYAO gibi. Buna BIST kodu diyoruz ve bir hisseyi takip etmeye önce kodunu öğrenerek başlarsın.\n\nPay Piyasası kendi içinde de pazarlara ayrılır. Yıldız Pazar'da büyük ve yoğun işlem gören şirketler var. Ana Pazar'da orta ölçekliler. Alt Pazar'da daha küçük şirketler. Bir de Yakın İzleme Pazarı var; finansal yapısında bozulma ya da denetim sorunu görülen şirketler oraya alınır. Bir hisseye bakarken hangi pazarda olduğunu görmek, saniyelik ama işe yarar bir uyarıdır.\n\nBurada bir yanılgıya düşme: Yıldız Pazar'da olmak \"iyi yatırım\" demek değildir. Pazar ayrımı büyüklüğe ve işlem ölçütlerine bakar; şirketin kârlı ya da iyi yönetilen bir şirket olup olmadığına bakmaz. Onu ölçmeyi Analist seviyesinde öğreneceğiz.\n\nBeşinci adımı da mühürledin. Bir sonraki derste şu soruya döneceğiz: borsada bir pay aldığında para gerçekte kime gidiyor?"
}
$moono$::jsonb
where lesson_id = 31 and order_index = 19;

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
      "question": "Borsa İstanbul A.Ş. nasıl ortaya çıktı?",
      "options": [
        {
          "id": "a",
          "text": "Yeni kurulan bağımsız bir devlet kurumu olarak"
        },
        {
          "id": "b",
          "text": "İMKB, İstanbul Altın Borsası ve VOB birleştirilerek"
        },
        {
          "id": "c",
          "text": "Yabancı bir borsanın Türkiye şubesi açılarak"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "Aşağıdakilerden hangisi Borsa İstanbul bünyesindeki piyasalardan biridir?",
      "options": [
        {
          "id": "a",
          "text": "Borçlanma Araçları Piyasası"
        },
        {
          "id": "b",
          "text": "Bankalararası Mevduat Piyasası"
        },
        {
          "id": "c",
          "text": "Kamu İhale Piyasası"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "THYAO gibi beş harfli kısaltmalar neyi ifade eder?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin işlem gördüğü pazarın resmi kodunu"
        },
        {
          "id": "b",
          "text": "Şirketin bağlı olduğu endeksin resmi kodunu"
        },
        {
          "id": "c",
          "text": "Şirketin borsadaki kısa adını ve kodunu"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q4",
      "question": "Bir şirket zaman içinde pazar değiştirebilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Hayır, ilk atandığı pazarda kalıcı kalır"
        },
        {
          "id": "b",
          "text": "Evet, karşıladığı ölçütlere göre pazarı değişebilir"
        },
        {
          "id": "c",
          "text": "Evet, ancak yalnızca şirket talep ederse"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q5",
      "question": "Yakın İzleme Pazarı'nda işlem gören bir şirket için ne söylenebilir?",
      "options": [
        {
          "id": "a",
          "text": "Riskli görülen bir durum nedeniyle izlenmektedir"
        },
        {
          "id": "b",
          "text": "Borsanın en büyük şirketleri arasında sayılır"
        },
        {
          "id": "c",
          "text": "Halka arz süreci henüz tamamlanmamış durumdadır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q6",
      "question": "Bir şirketin Yıldız Pazar'da olması yatırımcı için ne anlama gelmez?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin piyasa değerinin yüksek olduğu anlamına"
        },
        {
          "id": "b",
          "text": "İşlem hacminin genelde geniş olduğu anlamına"
        },
        {
          "id": "c",
          "text": "Payının kesinlikle para kazandıracağı anlamına"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q7",
      "question": "Borsa İstanbul'da hangi işlemler yapılır?",
      "options": [
        {
          "id": "a",
          "text": "Pay, tahvil, türev ve kıymetli maden işlemleri"
        },
        {
          "id": "b",
          "text": "Yalnızca şirket paylarına ait alım satım işlemleri"
        },
        {
          "id": "c",
          "text": "Yalnızca devlet tahvillerine ait ihraç işlemleri"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "Pazarlar neden birden fazla gruba ayrılmıştır?",
      "options": [
        {
          "id": "a",
          "text": "Şirketleri faaliyet sektörlerine göre gruplandırmak için"
        },
        {
          "id": "b",
          "text": "Farklı büyüklükteki şirketlere farklı kurallar uygulamak için"
        },
        {
          "id": "c",
          "text": "Yabancı yatırımcıları ayrı bir grupta tutmak için"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q9",
      "question": "Borsa İstanbul'un kökenleri hangi döneme dayanır?",
      "options": [
        {
          "id": "a",
          "text": "Cumhuriyetin kuruluş yıllarına, 1923 sonrasına"
        },
        {
          "id": "b",
          "text": "1980'lerin başındaki finansal düzenleme dönemine"
        },
        {
          "id": "c",
          "text": "Osmanlı dönemindeki Dersaadet Tahvilat Borsası'na"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q10",
      "question": "Bir yatırımcı bir payın hangi pazarda olduğunu neden bilmek ister?",
      "options": [
        {
          "id": "a",
          "text": "İşlem kuralları ve likidite pazara göre değişir"
        },
        {
          "id": "b",
          "text": "Pazar, şirketin dağıtacağı kâr payı oranını belirler"
        },
        {
          "id": "c",
          "text": "Pazar, şirketin ödeyeceği vergi yükümlülüğünü değiştirir"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 31 and order_index = 20;
