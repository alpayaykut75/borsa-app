-- Seviye 1 · Ders 9 — Piyasadaki Oyuncular (lesson_id 56) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Piyasadaki Oyuncular',
    description = 'Kim alıyor, kim satıyor?'
where id = 56;

update lesson_steps
set type = 'read',
    title = 'Ortak, Karşındaki Kim?',
    content = null,
    metadata = $moono$
{
  "text": "Geçen derste fiyatın alıcı ve satıcıların karşılaşmasından doğduğunu öğrendik. Şimdi şu soruyu soralım: o alıcılar ve satıcılar kimler?\n\nBir hisse aldığında karşında mutlaka birisi vardır; senin aldığın payı satan biri. Bu kişi mahallendeki bir emekli olabilir, milyarlarca lira yöneten bir emeklilik fonu olabilir, Londra'daki bir yatırım şirketi olabilir. Sen onu görmezsin, o da seni görmez. Ama ikiniz de aynı anda, aynı fiyata, tam tersi yönde karar vermişsinizdir.\n\nYani borsa insansız bir makine değildir. Her rakamın arkasında karar veren biri vardır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Birinci Oyuncu: Sen',
    content = null,
    metadata = $moono$
{
  "text": "En kalabalık grup bireysel yatırımcılardır; yani sen ve senin gibi kendi parasını yöneten kişiler.\n\nBireysel yatırımcının en belirgin özelliği kendi adına karar vermesidir. Kimseye hesap vermez, kimseden onay almaz. Genellikle daha küçük tutarlarla çalışır, bu yüzden tek başına fiyatı hareket ettirmesi zordur. Buna karşılık istediği kadar bekleyebilir; üç ay sonra rapor vermek zorunda olmadığı için sabırlı olma lüksü vardır.\n\nYani bireysel yatırımcı küçüktür ama esnektir. Bu esneklik göründüğünden daha değerli bir avantajdır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'İkinci Oyuncu: Kurumsallar',
    content = null,
    metadata = $moono$
{
  "text": "İkinci grup, başkalarının parasını profesyonelce yöneten kuruluşlardır.\n\nYatırım fonları, bireysel emeklilik fonları, sigorta şirketleri ve portföy yönetim şirketleri bu gruba girer. Bunlara **kurumsal yatırımcı** denir. Çok büyük tutarlarla çalışırlar, analiz ekipleri vardır ve verdikleri kararların arkasında yazılı bir süreç bulunur. Ama bir zorunlulukları da vardır: yönettikleri paranın sahiplerine düzenli olarak hesap verirler.\n\nYani kurumsalların kaynağı çoktur, ama zaman baskısı da vardır. Sabretmek onlar için her zaman bir seçenek değildir."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Kurumsal Yatırımcı",
  "back_text": "Başkalarından toplanan tasarrufları profesyonel olarak yöneten kuruluşlardır. Yatırım fonları, emeklilik fonları ve sigorta şirketleri bu gruba girer."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Borsada bir hisse aldığında karşı tarafta kim olabilir?",
  "options": [
    {
      "id": "a",
      "text": "Yalnızca aynı şehirde yaşayan bireysel yatırımcılar"
    },
    {
      "id": "b",
      "text": "Yalnızca payı çıkaran şirketin kendi yönetimi"
    },
    {
      "id": "c",
      "text": "Bireysel, kurumsal ya da yabancı bir yatırımcı"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Toplanan tasarrufları profesyonelce yöneten kuruluşlara ____ denir.",
  "options": [
    {
      "id": "a",
      "text": "aracı kurum"
    },
    {
      "id": "b",
      "text": "kurumsal yatırımcı"
    },
    {
      "id": "c",
      "text": "borsa yapıcısı"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Üçüncü Oyuncu: Yabancı Yatırımcı',
    content = null,
    metadata = $moono$
{
  "text": "Türkiye'de haberlerde en çok konuşulan grup budur ve bunun bir sebebi vardır.\n\nYabancı yatırımcılar, yurt dışından gelip Borsa İstanbul'da işlem yapan fonlar ve kurumlardır. Genellikle büyük tutarlarla çalışırlar; bu yüzden toplu olarak alım yaptıklarında ya da çıkmaya başladıklarında fiyatlar üzerinde belirgin bir etki oluşabilir. Kararlarını yalnızca şirketlere değil, kurun yönüne, faize ve ülke riskine bakarak da verirler.\n\nYani yabancı payı takip edilir çünkü büyüklüğü fiyatta hissedilir. Ama bu, onların her zaman doğru karar verdiği anlamına gelmez."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Dördüncü Oyuncu: Şirketin Kendisi ve Büyük Ortaklar',
    content = null,
    metadata = $moono$
{
  "text": "Sahnede beklemediğin bir oyuncu daha var: şirketin kendisi.\n\nBir şirket kendi paylarını borsadan geri satın alabilir; buna pay geri alımı denir ve dolaşımdaki pay sayısını azaltır. Büyük ortaklar ve kurucular da zaman zaman pay alıp satar. Ama burada sıkı bir kural vardır: şirket yöneticileri ve içeriden bilgiye erişenler, henüz kamuya açıklanmamış bilgileri kullanarak işlem yapamaz. Buna **içeriden öğrenenlerin ticareti** denir ve yasaktır.\n\nYani şirketin içindekiler de piyasada olabilir, ama herkesten önce bilme avantajını kullanmaları yasaktır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Aynı Hisse, Farklı Saatler',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi bu oyuncuları birbirinden ayıran en önemli şeye gelelim: zaman ufku.\n\nBir kişi o payı bir saat sonra satmak için almış olabilir. Bir başkası üç aylık bir hedefle girmiştir. Bir emeklilik fonu ise on beş yıl sonrasını düşünerek almıştır. Üçü de aynı hisseye, aynı gün, aynı fiyattan girebilir; ama üçünün \"başarı\" tanımı tamamen farklıdır. Bir günlük düşüş biri için felaket, diğeri için hiçbir şeydir.\n\nYani aynı fiyatın arkasında birbiriyle hiç ilgisi olmayan hedefler vardır. Başkasının hamlesini kopyalamak, onun takvimini bilmeden anlamsızdır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Zaman Ufku",
  "back_text": "Bir yatırımcının parasını ne kadar süre yatırımda tutmayı planladığıdır. Aynı fiyat, farklı zaman ufkuna sahip kişiler için farklı anlam taşır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Yabancı yatırımcı payının takip edilmesinin sebebi nedir?",
  "options": [
    {
      "id": "a",
      "text": "Büyük tutarlarla girip çıkmaları fiyatı etkiler"
    },
    {
      "id": "b",
      "text": "Yabancılar her zaman daha doğru karar verir"
    },
    {
      "id": "c",
      "text": "Yabancı işlemleri tamamen farklı kurallara tabidir"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Bir yöneticinin henüz kamuya açıklanmamış bilgiyle işlem yapması ____ sayılır.",
  "options": [
    {
      "id": "a",
      "text": "sıradan bir işlem"
    },
    {
      "id": "b",
      "text": "yasak bir davranış"
    },
    {
      "id": "c",
      "text": "zorunlu bir bildirim"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Üç Kişi, Tek Hisse',
    content = null,
    metadata = $moono$
{
  "text": "Salı sabahı fırının hissesinde üç işlem geçiyor ve üçünün de sebebi farklı.\n\nAyşe hisseyi satıyor, çünkü kızının okul taksitini ödemesi gerekiyor; şirket hakkında olumsuz düşündüğü için değil. Bir emeklilik fonu alıyor, çünkü portföyünde gıda sektörünün ağırlığını artırmaya karar vermiş. Bora ise satıyor, çünkü fiyat kendi belirlediği hedefe ulaştı ve planını uyguluyor. Üçü de aynı fiyattan işlem yaptı ve üçü de kendi açısından doğru davrandı.\n\nYani bir satış her zaman kötü haber, bir alış her zaman iyi haber değildir. İşlemin arkasındaki sebebi bilmeden anlamını çıkaramazsın."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 13;

update lesson_steps
set type = 'read',
    title = '"Büyükler Biliyor" Yanılgısı',
    content = null,
    metadata = $moono$
{
  "text": "Yeni başlayanların sık düştüğü bir tuzak var: büyük oyuncuların bilmediğimiz bir şey bildiğini sanmak.\n\nKurumsal ve yabancı yatırımcıların daha çok kaynağı, daha kalabalık analiz ekibi vardır; bu doğru. Ama daha fazla bilgiye erişimleri yoktur, çünkü şirketler önemli her gelişmeyi KAP üzerinden herkese aynı anda duyurmak zorundadır. Üstelik büyük olmak yanılmamak demek değildir; profesyonel fonlar da düzenli olarak zarar eder. Onların bir hisseye girmesi, o hissenin kazandıracağını göstermez.\n\nYani \"onlar aldıysa vardır bir bildikleri\" cümlesi bir analiz değil, bir tahmindir. Üstelik onların neden aldığını ve ne kadar bekleyeceğini bilmiyorsun."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Borsada dört ana oyuncu grubu var: bireysel yatırımcılar, kurumsal yatırımcılar, yabancı yatırımcılar ve şirketin kendisiyle büyük ortakları.\n\nHer grubun kaynağı, hedefi ve zaman ufku farklıdır. Kurumsalların analiz gücü fazladır ama hesap verme baskısı da vardır. Bireysel yatırımcı küçüktür ama istediği kadar bekleyebilir. Önemli bilgiler ise KAP sayesinde herkese aynı anda ulaşır; içeriden bilgiyle işlem yapmak yasaktır.\n\nYani ekrandaki fiyat, birbirini hiç tanımayan ve birbirinden çok farklı sebeplerle hareket eden insanların ortak sonucudur."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "İçeriden Öğrenenlerin Ticareti",
  "back_text": "Henüz kamuya açıklanmamış bilgiyi kullanarak işlem yapmaktır. Yasaktır ve tespit edildiğinde yaptırım uygulanır."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Kurumsal yatırımcılar hakkında hangisi doğrudur?",
  "options": [
    {
      "id": "a",
      "text": "Verdikleri kararlar hemen her zaman doğru çıkar"
    },
    {
      "id": "b",
      "text": "Bireysel yatırımcıdan farklı bilgilere erişirler"
    },
    {
      "id": "c",
      "text": "Daha çok kaynakları vardır ama onlar da yanılır"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Aynı hisseyi aynı anda biri alırken diğeri satıyorsa, ikisinin ____ farklıdır.",
  "options": [
    {
      "id": "a",
      "text": "beklentisi ve zaman ufku"
    },
    {
      "id": "b",
      "text": "ödediği komisyon tutarı"
    },
    {
      "id": "c",
      "text": "eriştiği resmi bilgi kaynağı"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 56 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, dokuzuncu dersi tamamladın. Şimdi iki dakikada piyasadaki oyuncuları toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, dokuzuncu dersi tamamladın. Kısaca toparlayalım.\n\nGeçen derste fiyatın alıcı ve satıcıların karşılaşmasından doğduğunu öğrendik. Bu derste o alıcı ve satıcıların kim olduğuna baktık.\n\nBirinci grup bireysel yatırımcılar, yani sen. Kendi paranı yönetirsin, kimseye hesap vermezsin. Küçük tutarlarla çalışırsın ama istediğin kadar bekleyebilirsin. Bu esneklik göründüğünden daha değerli bir avantaj.\n\nİkinci grup kurumsal yatırımcılar. Yatırım fonları, emeklilik fonları, sigorta şirketleri. Büyük tutarlarla çalışırlar, analiz ekipleri vardır. Ama yönettikleri paranın sahiplerine düzenli hesap verirler; yani sabretmek onlar için her zaman bir seçenek değildir.\n\nÜçüncü grup yabancı yatırımcılar. Büyük tutarlarla çalıştıkları için toplu giriş çıkışları fiyatta hissedilir. Bu yüzden yakından takip edilirler.\n\nDördüncü grup ise şirketin kendisi ve büyük ortakları. Şirket kendi paylarını geri alabilir. Ama burada sıkı bir kural var: yöneticiler ve içeriden bilgiye erişenler, henüz açıklanmamış bilgiyi kullanarak işlem yapamaz. Buna içeriden öğrenenlerin ticareti denir ve yasaktır.\n\nBu oyuncuları birbirinden ayıran en önemli şey zaman ufku. Biri bir saat sonrasını düşünüyor, biri üç ayı, bir emeklilik fonu on beş yılı. Üçü de aynı hisseye aynı fiyattan girebilir ama üçünün başarı tanımı farklıdır.\n\nSon olarak yaygın bir yanılgı: \"Büyükler aldıysa vardır bir bildikleri.\" Kurumsalların daha çok kaynağı var, bu doğru. Ama daha fazla bilgiye erişimleri yok; çünkü şirketler önemli gelişmeleri KAP üzerinden herkese aynı anda duyurmak zorunda. Üstelik büyük olmak yanılmamak demek değil.\n\nDokuzuncu adımı da mühürledin. Bir sonraki derste Çaylak seviyesini kapatıyoruz ve her şeyi tek bir kuralda birleştiriyoruz: risk ile getiri."
}
$moono$::jsonb
where lesson_id = 56 and order_index = 19;

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
      "question": "Borsadaki her işlemde ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Bir tarafta alıcı, diğer tarafta satıcı vardır"
        },
        {
          "id": "b",
          "text": "Şirket ile yatırımcı doğrudan karşı karşıya gelir"
        },
        {
          "id": "c",
          "text": "Borsa payı önce alıp sonra yatırımcıya satar"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Aşağıdakilerden hangisi kurumsal yatırımcıya örnektir?",
      "options": [
        {
          "id": "a",
          "text": "Kendi birikimini yöneten bir emekli"
        },
        {
          "id": "b",
          "text": "Bir şirketin kendi muhasebe departmanı"
        },
        {
          "id": "c",
          "text": "Bireysel emeklilik fonu yöneten şirket"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q3",
      "question": "Yabancı yatırımcıların payı neden yakından izlenir?",
      "options": [
        {
          "id": "a",
          "text": "Yabancılar piyasa hakkında daha çok bilgiye sahiptir"
        },
        {
          "id": "b",
          "text": "Büyük tutarlarla yaptıkları giriş çıkışlar fiyatları etkiler"
        },
        {
          "id": "c",
          "text": "Yabancılar borsada farklı bir vergi oranına tabidir"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q4",
      "question": "Bir yöneticinin henüz açıklanmamış bilgiyle işlem yapması nedir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket içi bilgi avantajının doğal kullanımı"
        },
        {
          "id": "b",
          "text": "Yöneticinin sözleşmeden doğan bir hakkı"
        },
        {
          "id": "c",
          "text": "Yasaklanmış bir davranış olan içeriden öğrenenlerin ticareti"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q5",
      "question": "\"Büyük fonlar aldıysa bu hisse kesin kazandırır\" cümlesi için ne denir?",
      "options": [
        {
          "id": "a",
          "text": "Yanlış; kurumsal yatırımcılar da zarar edebilir"
        },
        {
          "id": "b",
          "text": "Doğru; fonlar hiçbir zaman zarar etmez"
        },
        {
          "id": "c",
          "text": "Doğru; fonlar gizli bilgiye erişebilmektedir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q6",
      "question": "Aynı hisseyi aynı anda biri alıp diğeri satıyorsa bu neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Taraflardan birinin mutlaka hata yaptığını"
        },
        {
          "id": "b",
          "text": "Beklenti ve zaman ufuklarının farklı olduğunu"
        },
        {
          "id": "c",
          "text": "Fiyatın o anda yanlış hesaplanmış olduğunu"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q7",
      "question": "Aracı kurumun piyasadaki rolü nedir?",
      "options": [
        {
          "id": "a",
          "text": "Senin adına hangi hisseyi alacağına karar verir"
        },
        {
          "id": "b",
          "text": "Aldığın payların değer kazanmasını güvence altına alır"
        },
        {
          "id": "c",
          "text": "Emrini borsaya ileten ve işlemi yürüten kurumdur"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "Şirketin kendi paylarını borsadan geri alması ne anlama gelir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket, dolaşımdaki pay sayısını azaltmış olur"
        },
        {
          "id": "b",
          "text": "Şirket, yeni ortak almak için hazırlık yapar"
        },
        {
          "id": "c",
          "text": "Şirket borsadan tamamen çıkmak zorunda kalmıştır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "KAP'ın piyasa oyuncuları açısından işlevi nedir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketlerin belirlediği fiyat hedeflerini duyurmasını sağlar"
        },
        {
          "id": "b",
          "text": "Önemli bilgilerin herkese aynı anda ulaşmasını sağlar"
        },
        {
          "id": "c",
          "text": "Yabancı yatırımcıların tüm işlemlerini kayıt altına alır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "Bireysel yatırımcının kurumsallara göre avantajı ne olabilir?",
      "options": [
        {
          "id": "a",
          "text": "Kimseye hesap vermeden uzun süre bekleyebilmesi"
        },
        {
          "id": "b",
          "text": "Fiyatları tek başına yönlendirebilme gücünün olması"
        },
        {
          "id": "c",
          "text": "Şirket bilgilerine herkesten erken erişebilmesi"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 56 and order_index = 20;
