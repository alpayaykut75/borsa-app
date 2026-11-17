-- Seviye 1 · Ders 1: Şirket ve Ortaklık (lesson_id 27) — 20 adım içeriği
-- Hedefli UPDATE; step id'leri korunur.
-- Adım 19: eski Moono_Ders1.mp3 örnek olarak açık kalır; yeni seslendirme sonra değiştirilecek.

update lessons
set title = 'Şirket ve Ortaklık',
    description = 'Bir işin parçasına sahip olmak'
where id = 27;

update lesson_steps
set type = 'read',
    title = 'Ortak, Her Şey Küçük Başlar',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, mahallendeki fırını düşün. Sabah ekmek çıkarıyor, akşam kepenk kapatıyor. Sahibi tek kişi: hem hamuru yoğuruyor hem kasaya bakıyor.\n\nBir gün işler açılıyor ve ikinci bir fırın açmak istiyor. Ama elindeki para yetmiyor. Önünde iki yol var: ya bankadan borç alıp faiziyle geri ödeyecek, ya da yanına birini ortak alıp onun parasıyla büyüyecek.\n\nYani bir işletmenin büyümek için ihtiyaç duyduğu şey çoğu zaman fikir değil, paradır. Ortaklık fikri tam olarak bu ihtiyaçtan doğar."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Ortak Almak Ne Demek?',
    content = null,
    metadata = $moono$
{
  "text": "Ortak almak, borç almaya benzemez. İlk bakışta ikisi de \"dışarıdan para bulmak\" gibi görünür ama aralarında çok temel bir fark vardır.\n\nBorç aldığında parayı faiziyle geri ödersin ve iş bittiğinde işletme yine tamamen senindir. Ortak aldığında ise geri ödeme yoktur. Onun yerine işletmenin bir bölümünü kalıcı olarak ona devredersin.\n\nYani ortak, sana para veren biri değil; işin bir parçasını senden satın alan kişidir. Bundan sonra kazanç da risk de ikinizindir."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set type = 'read',
    title = '"Bir Parça" Tam Olarak Ne Kadar?',
    content = null,
    metadata = $moono$
{
  "text": "Peki \"işin bir parçası\" ne kadar? Bunu duyguya değil, nete bağlamak gerekir.\n\nFırının toplam değerinin 1.000.000 TL olduğunu varsayalım. İşletmeyi eşit 1.000 parçaya bölersek her parça 1.000 TL eder. Bu parçalardan 50 tanesini alan kişi, işletmenin yüzde 5'ine sahip olur.\n\nYani ortaklık el sıkışmayla kalan bir anlaşma değil, ölçülebilir bir orandır. Bu eşit parçaların her birine **pay** diyoruz."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Pay",
  "back_text": "Bir şirketin eşit parçalara bölünmüş mülkiyetinin tek bir birimidir. Pay sahibi, elindeki pay oranı kadar şirketin ortağıdır."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Bir işletme sahibinin ortak alması ile bankadan kredi alması arasındaki temel fark nedir?",
  "options": [
    {
      "id": "a",
      "text": "Kredide alınan tutar büyük olur, ortaklıkta küçük kalır"
    },
    {
      "id": "b",
      "text": "Kredi faiziyle geri ödenir, ortaklıkta işin bir kısmı devredilir"
    },
    {
      "id": "c",
      "text": "Kredide karar yetkisi paylaşılır, ortaklıkta sahibinde kalır"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir şirketin eşit parçalara bölünmüş mülkiyetinin her bir birimine ____ denir.",
  "options": [
    {
      "id": "a",
      "text": "pay"
    },
    {
      "id": "b",
      "text": "sermaye"
    },
    {
      "id": "c",
      "text": "kâr payı"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Ortak Ne Kazanır?',
    content = null,
    metadata = $moono$
{
  "text": "Ortak olmanın karşılığında elde ettiğin üç temel hak vardır.\n\nBirincisi kâr payı: şirket kâr eder ve bunu dağıtmaya karar verirse, payın oranında sana da düşer. İkincisi oy hakkı: şirketin geleceğini belirleyen genel kurul toplantılarında söz sahibi olursun. Üçüncüsü ise payını dilediğin zaman başka birine satabilme hakkındır.\n\nYani ortaklık sana hem gelir, hem söz, hem de bir çıkış kapısı sunar."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Ortak Ne Riske Girer?',
    content = null,
    metadata = $moono$
{
  "text": "Ortaklığın bir de öbür yüzü var ve bunu ilk günden bilmen gerekiyor.\n\nŞirket kâr edemezse kâr payı dağıtılmaz. İşler kötüye giderse payının değeri düşer. Şirket tamamen batarsa payın değersiz hâle gelebilir ve koyduğun parayı geri alamazsın. Borçta olduğu gibi \"ne olursa olsun geri ödenir\" diye bir güvence yoktur.\n\nYani ortak, iyi günde kazanca ortak olduğu gibi kötü günde kayba da ortaktır. Ortaklığı borçtan ayıran şey tam olarak budur."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Peki Şirketin Borcu Bana Kalır Mı?',
    content = null,
    metadata = $moono$
{
  "text": "Burada çok haklı bir soru akla geliyor: Şirket batarsa onun borçları benim borcum olur mu?\n\nAnonim şirketlerde hayır. Pay sahibinin sorumluluğu, o paylara ödediği parayla sınırlıdır. Şirket milyonlarca lira borç bırakarak kapansa bile alacaklılar senin evine, arabana ya da maaşına el koyamaz.\n\nYani kaybedebileceğin en yüksek tutar, o paylar için ödediğin paradır — bir kuruş fazlası değil. Buna **sınırlı sorumluluk** denir."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Sınırlı Sorumluluk",
  "back_text": "Pay sahibinin şirketin borçlarından yalnızca paylarına ödediği tutar kadar sorumlu olmasıdır. Kişisel varlıkları bu borçlardan etkilenmez."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Ortağı olduğun şirket zarar ettiğinde en olası sonuç nedir?",
  "options": [
    {
      "id": "a",
      "text": "Zarar payın oranında hesabından tahsil edilir"
    },
    {
      "id": "b",
      "text": "Şirket koyduğun parayı iade etmekle yükümlü olur"
    },
    {
      "id": "c",
      "text": "Kâr payı dağıtılmaz ve payının değeri düşebilir"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Sınırlı sorumluluk sayesinde bir pay sahibinin kaybedebileceği en yüksek tutar ____ kadardır.",
  "options": [
    {
      "id": "a",
      "text": "paylarına ödediği para"
    },
    {
      "id": "b",
      "text": "şirketin toplam borcu"
    },
    {
      "id": "c",
      "text": "şirketin yıllık zararı"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: İki Ortaktan Binlerce Ortağa',
    content = null,
    metadata = $moono$
{
  "text": "Fırın büyüdü. Artık iki değil, on şehirde üretim yapmak istiyor. Bunun için gereken para, tek bir ortağın koyabileceğinin çok üstünde.\n\nŞirketin önünde şöyle bir yol var: payları çok daha küçük parçalara bölmek ve binlerce kişiye açmak. Kimse tek başına dev bir tutar koymaz; herkes gücü kadar koyar, toplandığında büyük bir sermaye çıkar.\n\nYani ortak sayısı arttıkça kişi başına düşen tutar küçülür. Sıradan birinin dev bir şirkete ortak olabilmesinin yolu da buradan geçer."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Ortak, Peki Sen Neye Sahipsin?',
    content = null,
    metadata = $moono$
{
  "text": "Payın olduğunda elinde bir belge ya da ekranda bir satır görürsün. Ama sahip olduğun şey o satır değildir.\n\nFırının unu, makineleri, dağıtım araçları, çalışanlarının kurduğu düzen ve markasının değeri... Bunların hepsinin payın oranındaki bir dilimi senindir.\n\nYani ortaklık soyut bir kavram değil, gerçek bir işletme üzerindeki gerçek bir haktır. Bir şirkete ortak olurken önce o işletmenin ne yaptığına bakmanın sebebi de budur."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Bir şirket, eşit paylara bölünmüş bir işletmedir ve pay sahibi olmak o işletmenin gerçek ortağı olmaktır.\n\nOrtaklık sana kâr payı, oy hakkı ve payını satabilme hakkı verir. Buna karşılık şirket kötüye giderse değer kaybı riskini de üstlenirsin. Kaybın ise paylarına ödediğin parayla sınırlı kalır.\n\nYani sana neden \"ortak\" dediğimizi artık biliyorsun. İlk adımı mühürledin."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Sermaye",
  "back_text": "Bir işletmenin kurulması veya büyütülmesi için konulan paradır. Ortaklardan gelen sermaye geri ödenmez; karşılığında pay verilir."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Bir şirketin payları neden binlerce küçük parçaya bölünür?",
  "options": [
    {
      "id": "a",
      "text": "Şirketin toplam değeri bu yolla artırılabildiği için"
    },
    {
      "id": "b",
      "text": "Yasalar tek ortaklı şirket kurulmasını yasakladığı için"
    },
    {
      "id": "c",
      "text": "Küçük tutarlarla çok sayıda kişiden sermaye toplandığı için"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Şirkete ortak olan kişi, koyduğu paranın karşılığında ____ alır.",
  "options": [
    {
      "id": "a",
      "text": "sabit bir faiz geliri"
    },
    {
      "id": "b",
      "text": "şirketten belirli bir pay"
    },
    {
      "id": "c",
      "text": "geri ödeme garantisi belgesi"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 27 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, ilk dersi tamamladın. Şimdi iki dakikada ortaklık fikrini baştan sona toparlayalım ve Çaylak seviyesinin ilk adımını mühürleyelim.",
  "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3",
  "hidden_in_app": false,
  "transcript": "Ortak, ilk dersi tamamladın. Şimdi kısaca toparlayalım.\n\nBu derste tek bir fikri konuştuk: ortaklık.\n\nMahalledeki fırınla başladık. Tek kişinin işlettiği bir yer büyümek istediğinde önünde iki yol vardı. Ya borç alacak ve faiziyle geri ödeyecek, ya da yanına ortak alacak.\n\nBu ikisi birbirine hiç benzemez. Borç geri ödenir ve iş yine tamamen sahibinde kalır. Ortaklıkta ise geri ödeme yoktur; onun yerine işin bir bölümü kalıcı olarak ortağa geçer.\n\nPeki o bölüm ne kadar? Bunu ölçmek için işletmeyi eşit parçalara böleriz. Bir milyon liralık fırını bin parçaya bölersek her parça bin lira eder. Bu parçaların her birine pay diyoruz. Elli pay alan kişi işletmenin yüzde beşine sahip olur.\n\nPay sahibi olmanın üç karşılığı var. Kâr dağıtıldığında payın oranında alırsın. Genel kurulda oy kullanırsın. Ve payını istediğinde satabilirsin.\n\nAma madalyonun bir de öbür yüzü var. Şirket kâr edemezse kâr payı dağıtılmaz. İşler kötüye giderse payının değeri düşer. Şirket batarsa payın değersiz kalabilir. Ortak, iyi günde kazanca ortak olduğu gibi kötü günde kayba da ortaktır.\n\nYalnız burada önemli bir koruma var: sınırlı sorumluluk. Anonim şirketlerde pay sahibi, şirketin borçlarından yalnızca paylarına ödediği tutar kadar sorumludur. Şirket milyonlarca lira borçla kapansa bile senin evine ya da maaşına kimse dokunamaz.\n\nVe son olarak: bir şirket paylarını çok küçük parçalara bölerse binlerce kişiden sermaye toplayabilir. Sıradan birinin dev bir şirkete ortak olabilmesi işte bu sayede mümkün olur.\n\nŞimdi sana neden \"ortak\" dediğimizi biliyorsun. İlk adımı mühürledin. Bir sonraki derste bir şirkete ortak olmakla o şirkete borç vermenin farkına bakacağız."
}
$moono$::jsonb
where lesson_id = 27 and order_index = 19;

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
      "question": "Bir şirketin değeri 2.000.000 TL ve bu değer eşit 4.000 paya bölünmüştür. Tek bir payın değeri ne kadardır?",
      "options": [
        {
          "id": "a",
          "text": "200 TL"
        },
        {
          "id": "b",
          "text": "400 TL"
        },
        {
          "id": "c",
          "text": "500 TL"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q2",
      "question": "Ortaklık ile borç arasındaki temel fark aşağıdakilerden hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklıkta para geri ödenmez, işin bir kısmı devredilir"
        },
        {
          "id": "b",
          "text": "Ortaklıkta para daha kısa vadede geri ödenmiş olur"
        },
        {
          "id": "c",
          "text": "Ortaklıkta alınan tutarın üst sınırı yasayla belirlenir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Aşağıdakilerden hangisi bir pay sahibinin haklarından biri değildir?",
      "options": [
        {
          "id": "a",
          "text": "Dağıtılan kârdan payı oranında pay alma"
        },
        {
          "id": "b",
          "text": "Şirketin günlük işleyişine doğrudan talimat verme"
        },
        {
          "id": "c",
          "text": "Genel kurulda payı oranında oy kullanma"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q4",
      "question": "Bir şirketin kâr edemediği bir yılda pay sahibini ne bekler?",
      "options": [
        {
          "id": "a",
          "text": "Kâr payı dağıtılmaz, payın değeri de düşebilir"
        },
        {
          "id": "b",
          "text": "Şirket dağıtmadığı kâr payını sonraki yıla borçlanır"
        },
        {
          "id": "c",
          "text": "Pay sahibi koyduğu parayı geri isteme hakkı kazanır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "Ortağı olduğun anonim şirket 10 milyon TL borç bırakarak kapandı. Sen paylarına 5.000 TL ödemiştin. Ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Payın oranında hesaplanan borç tutarından sorumlu olursun"
        },
        {
          "id": "b",
          "text": "Tasfiye sonunda ödediğin 5.000 TL'yi öncelikli alırsın"
        },
        {
          "id": "c",
          "text": "Kaybın ödediğin 5.000 TL ile sınırlı kalır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q6",
      "question": "Bir şirketin paylarını çok sayıda küçük parçaya bölmesinin başlıca amacı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin piyasadaki toplam değerini yükseltmek"
        },
        {
          "id": "b",
          "text": "Daha geniş bir kitleden sermaye toplayabilmek"
        },
        {
          "id": "c",
          "text": "Mevcut ortakların oy haklarını sınırlandırmak"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q7",
      "question": "\"Sermaye\" kelimesi bu derste hangi anlamda kullanılmıştır?",
      "options": [
        {
          "id": "a",
          "text": "İşletmenin kurulması veya büyütülmesi için konulan para"
        },
        {
          "id": "b",
          "text": "Şirketin bir yıl içinde elde ettiği toplam net kâr"
        },
        {
          "id": "c",
          "text": "Şirketin bankalara olan uzun vadeli borç tutarı"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "Payını başka birine satan bir ortak için hangisi doğrudur?",
      "options": [
        {
          "id": "a",
          "text": "Satıştan sonra da kâr payı almaya devam eder"
        },
        {
          "id": "b",
          "text": "Payını satabilmek için diğer ortaklardan onay alır"
        },
        {
          "id": "c",
          "text": "Ortaklığı ve ona bağlı hakları alıcıya geçmiş olur"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q9",
      "question": "Bir işletmeye ortak olmadan önce bakılması gereken ilk şey nedir?",
      "options": [
        {
          "id": "a",
          "text": "Payın son bir aydaki fiyat değişim yönü"
        },
        {
          "id": "b",
          "text": "İşletmenin ne ürettiği ve nasıl para kazandığı"
        },
        {
          "id": "c",
          "text": "Şirketin ortak sayısının geçen yıla göre artışı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "\"Pay aldım, peki aslında ne satın aldım?\" sorusunun en doğru karşılığı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Bir işletmenin varlıkları ve kazancı üzerindeki oransal hak"
        },
        {
          "id": "b",
          "text": "Şirketin gelecekte ödemeyi taahhüt ettiği belirli tutar"
        },
        {
          "id": "c",
          "text": "Şirket ürünlerinden indirimli yararlanma hakkı veren belge"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 27 and order_index = 20;
