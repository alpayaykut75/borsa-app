-- Seviye 1 · Ders 6: Birincil ve İkincil Piyasa (lesson_id 53) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Birincil ve İkincil Piyasa',
    description = 'Şirketten mi, başkasından mı?'
where id = 53;

update lesson_steps
set type = 'read',
    title = 'Ortak, Ödediğin Para Nereye Gidiyor?',
    content = null,
    metadata = $moono$
{
  "text": "Dördüncü derste bir soruyu askıda bırakmıştık. Şimdi cevaplayalım.\n\nBorsadan bir hisse aldın ve parayı ödedin. Bu para şirketin kasasına mı girdi? Yeni bir makine mi alındı, bir çalışanın maaşı mı ödendi? Çoğu kişi bunu böyle sanır. Cevap ise büyük ihtimalle hayır.\n\nYani \"hisse aldım\" cümlesi, paranın kime gittiğini söylemez. Aynı işlem iki farklı yerde gerçekleşebilir ve para iki farklı cebe gider."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Birincil Piyasa: Doğrudan Şirketten',
    content = null,
    metadata = $moono$
{
  "text": "Birinci durumda pay ilk kez satılıyordur.\n\nŞirket yeni paylar çıkarır ve bunları yatırımcılara satar. Bu, halka arzda olabilir; sonradan yapılan bir sermaye artırımında da olabilir. Böyle bir işlemde ödediğin para doğrudan şirkete gider ve yatırıma, borç kapatmaya ya da işletme sermayesine dönüşür. Menkul kıymetin ilk kez alıcısına ulaştığı bu aşamaya **birincil piyasa** denir.\n\nYani birincil piyasada şirketle yüz yüzesindir. Verdiğin para gerçekten o işe girer."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'İkincil Piyasa: Başka Bir Yatırımcıdan',
    content = null,
    metadata = $moono$
{
  "text": "İkinci durumda ise pay zaten birinin elindedir.\n\nSen borsadan bir hisse aldığında onu şirketten almazsın; o payı elinde tutan başka bir yatırımcıdan alırsın. Paran o kişinin hesabına geçer. Şirket bu işlemin tarafı bile değildir; sadece pay sahipleri listesindeki isim değişir. Payların yatırımcılar arasında el değiştirdiği bu alana **ikincil piyasa** denir. Borsa, ikincil piyasanın ta kendisidir.\n\nYani borsada alım satım yaparken şirketle değil, senin gibi bir yatırımcıyla işlem yapıyorsun."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Birincil Piyasa",
  "back_text": "Menkul kıymetin ilk kez alıcısına ulaştığı aşamadır. Halka arz ve sermaye artırımı buraya girer; ödenen para şirkete gider."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Halka arzda pay alan bir kişi parayı kime ödemiş olur?",
  "options": [
    {
      "id": "a",
      "text": "Payı daha önce elinde tutan bir yatırımcıya"
    },
    {
      "id": "b",
      "text": "İşlemi gerçekleştiren borsa kurumunun kendisine"
    },
    {
      "id": "c",
      "text": "Payı ihraç eden şirkete ya da satan ortağa"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Menkul kıymetin ilk kez alıcısına ulaştığı piyasaya ____ piyasa denir.",
  "options": [
    {
      "id": "a",
      "text": "birincil"
    },
    {
      "id": "b",
      "text": "ikincil"
    },
    {
      "id": "c",
      "text": "serbest"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Şirket Para Almıyorsa Neden Umursuyor?',
    content = null,
    metadata = $moono$
{
  "text": "Mantıklı bir soru: madem borsadaki işlemlerden şirkete bir kuruş girmiyor, şirket fiyatı neden takip ediyor?\n\nÇünkü bugünkü fiyat, yarınki sermayenin fiyatıdır. Şirket ileride yeni pay çıkarıp para toplamak isterse, bunu borsadaki fiyata yakın bir seviyeden yapar; fiyat yüksekse aynı miktar pay için daha çok para toplar. Ayrıca fiyat şirketin kredibilitesini, çalışanlarına verdiği pay planlarının değerini ve yönetimin nasıl değerlendirildiğini etkiler.\n\nYani ikincil piyasa şirkete doğrudan para vermez ama şirketin gelecekteki para toplama gücünü belirler."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Biri Olmadan Diğeri Çalışmaz',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi ikisi arasındaki bağı kuralım, çünkü bu ders bu bağ anlaşılmadan tamamlanmaz.\n\nKimse çıkışı olmayan bir yere para koymak istemez. Eğer aldığın payı bir daha satamayacağını bilseydin, halka arza katılır mıydın? Büyük ihtimalle hayır. İkincil piyasa var olduğu için insanlar birincil piyasaya güvenle katılır. Yani borsanın varlığı, şirketlerin ilk etapta para toplayabilmesinin ön koşuludur.\n\nYani ikisi ayrı piyasalar değil, aynı zincirin iki halkasıdır. Biri sermayeyi toplar, diğeri o sermayenin dolaşımını sağlar."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Aynı Pay, İki Farklı Fiyat Dünyası',
    content = null,
    metadata = $moono$
{
  "text": "Bir fark daha var ve pratikte sık karşına çıkacak.\n\nBirincil piyasada fiyat önceden belirlenir ve herkes için aynıdır; halka arzda tüm katılımcılar aynı fiyattan alır. İkincil piyasada ise fiyat sabit değildir. Her saniye değişebilir, halka arz fiyatının çok üstüne de çıkabilir çok altına da inebilir. Halka arz fiyatı bir başlangıç noktasıdır, bir taban değil.\n\nYani halka arzdan aldığın fiyat sonrasında korunmaz. İkincil piyasa kendi fiyatını kendi üretir."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "İkincil Piyasa",
  "back_text": "Daha önce ihraç edilmiş menkul kıymetlerin yatırımcılar arasında el değiştirdiği piyasadır. Borsa bu piyasadır; ödenen para şirkete değil satan yatırımcıya gider."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Borsadan bir pay satın aldığında paran nereye gider?",
  "options": [
    {
      "id": "a",
      "text": "Payı çıkaran şirketin yatırım kasasına"
    },
    {
      "id": "b",
      "text": "O payı sana satan yatırımcının hesabına"
    },
    {
      "id": "c",
      "text": "Şirketin kâr payı dağıtacağı ortak havuza"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: İkincil piyasa olmasaydı yatırımcılar için ____ ortadan kalkardı.",
  "options": [
    {
      "id": "a",
      "text": "payı satabilme imkânı"
    },
    {
      "id": "b",
      "text": "kâr payı alma hakkı"
    },
    {
      "id": "c",
      "text": "oy kullanma hakkı"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Tek Payın Yolculuğu',
    content = null,
    metadata = $moono$
{
  "text": "Bir payın izini sürelim. Fırın halka açılıyor ve Deniz halka arzdan bu payı 20 liraya alıyor.\n\nBu ilk işlem birincil piyasada gerçekleşti; Deniz'in 20 lirası doğrudan fırının kasasına girdi ve yeni fabrikaya harcandı. Aylar sonra Deniz payını borsada 26 liraya Kaan'a satıyor. Bu ikinci işlem ikincil piyasada gerçekleşti; Kaan'ın 26 lirası Deniz'in hesabına geçti. Fırın bu işlemden tek kuruş almadı ve haberi bile olmadı; sadece ortak listesinde Deniz'in yerini Kaan aldı.\n\nYani aynı pay iki kez el değiştirdi ama şirket parayı yalnızca ilkinde gördü."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 13;

update lesson_steps
set type = 'read',
    title = '"Hisse Alarak Şirkete Destek Oluyorum" Yanılgısı',
    content = null,
    metadata = $moono$
{
  "text": "Bu, en sık duyulan yanlış cümlelerden biridir ve artık senin için geçerli değil.\n\nBorsadan hisse almak şirkete para vermek değildir. Sevdiğin bir markanın hissesini almak o şirketin kasasına katkı yapmaz; sadece o payı satan yatırımcıya ödeme yapmış olursun. Şirkete doğrudan sermaye koymak istiyorsan bunun yolu halka arza katılmak ya da sermaye artırımına iştirak etmektir. Bunların dışında yaptığın her işlem, yatırımcılar arasındaki bir el değiştirmedir.\n\nYani hisse almak bir destek değil, bir yatırım kararıdır. İkisi farklı şeylerdir ve karıştırılmamalıdır."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Bir menkul kıymet ilk kez satıldığında birincil piyasadayız; para şirkete gider.\n\nAynı kıymet sonrasında yatırımcılar arasında el değiştirdiğinde ikincil piyasadayız; para satan yatırımcıya gider ve şirket bu işlemin tarafı değildir. Borsa ikincil piyasadır. Ama şirket yine de fiyatı takip eder, çünkü ileride sermaye toplarken o fiyat esas alınacaktır. Üstelik ikincil piyasa olmasaydı kimse birincil piyasaya katılmak istemezdi.\n\nYani ikisi rakip değil, birbirini ayakta tutan iki halkadır. Bundan sonra bir işlem gördüğünde ilk soracağın soru şu olacak: bu para şirkete mi gitti, yoksa birine mi?"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "İhraç",
  "back_text": "Bir şirketin veya devletin yeni menkul kıymet çıkarıp satışa sunmasıdır. İhraç işlemi birincil piyasada gerçekleşir ve toplanan para ihraççıya gider."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Şirket ikincil piyasadan para almamasına rağmen neden pay fiyatını önemser?",
  "options": [
    {
      "id": "a",
      "text": "Fiyat düştüğünde şirkete ceza uygulandığı için"
    },
    {
      "id": "b",
      "text": "Fiyat, şirketin ödeyeceği vergiyi belirlediği için"
    },
    {
      "id": "c",
      "text": "İleride sermaye toplarken bu fiyat esas alındığı için"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Halka arzdan sonra aynı payın borsada el değiştirmesi ____ piyasada gerçekleşir.",
  "options": [
    {
      "id": "a",
      "text": "birincil"
    },
    {
      "id": "b",
      "text": "ikincil"
    },
    {
      "id": "c",
      "text": "kapalı"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 53 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, altıncı dersi tamamladın. Şimdi iki dakikada paranın gerçekte kime gittiğini toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, altıncı dersi tamamladın. Kısaca toparlayalım.\n\nDördüncü derste bir soruyu askıda bırakmıştık: borsadan hisse aldığında ödediğin para nereye gidiyor? Bu derste cevapladık.\n\nİki farklı durum var. Birincisinde pay ilk kez satılıyordur. Şirket yeni paylar çıkarır ve satar; bu halka arzda olabilir, sonradan yapılan bir sermaye artırımında da olabilir. Böyle bir işlemde ödediğin para doğrudan şirkete girer ve yatırıma dönüşür. Buna birincil piyasa diyoruz.\n\nİkincisinde ise pay zaten birinin elindedir. Borsadan hisse aldığında onu şirketten değil, o payı elinde tutan başka bir yatırımcıdan alırsın. Paran o kişinin hesabına geçer. Şirket işlemin tarafı bile değildir; sadece ortak listesinde isim değişir. Buna ikincil piyasa diyoruz ve borsa tam olarak burasıdır.\n\nPeki şirket para almıyorsa fiyatı neden takip eder? Çünkü bugünkü fiyat yarınki sermayenin fiyatıdır. Şirket ileride yeni pay çıkarıp para toplamak isterse borsadaki fiyata yakın bir seviyeden yapar.\n\nBir de şunu unutma: ikisi birbirine bağlıdır. Kimse çıkışı olmayan bir yere para koymak istemez. İkincil piyasa var olduğu için insanlar birincil piyasaya güvenle katılır.\n\nSon olarak çok yaygın bir yanılgı: \"Bu hisseyi alarak şirkete destek oluyorum\" cümlesi doğru değildir. Borsadan hisse almak şirkete para vermek değildir; sadece o payı satan yatırımcıya ödeme yapmış olursun. Şirkete doğrudan sermaye koymanın yolu halka arza ya da sermaye artırımına katılmaktır.\n\nAltıncı adımı da mühürledin. Bir sonraki derste ekrandaki o rakamın nasıl oluştuğuna bakacağız."
}
$moono$::jsonb
where lesson_id = 53 and order_index = 19;

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
      "question": "Birincil piyasa en doğru şekilde nasıl tanımlanır?",
      "options": [
        {
          "id": "a",
          "text": "Menkul kıymetin ilk kez alıcısına ulaştığı aşama"
        },
        {
          "id": "b",
          "text": "Payların yatırımcılar arasında el değiştirdiği yer"
        },
        {
          "id": "c",
          "text": "Yalnızca büyük yatırımcıların işlem yaptığı bölüm"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q2",
      "question": "Borsadan bir hisse aldın. Bu işlem hangi piyasada gerçekleşti?",
      "options": [
        {
          "id": "a",
          "text": "Birincil piyasada, çünkü şirketin payını aldın"
        },
        {
          "id": "b",
          "text": "Hem birincil hem ikincil piyasada aynı anda"
        },
        {
          "id": "c",
          "text": "İkincil piyasada, çünkü başka yatırımcıdan aldın"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q3",
      "question": "Halka arzda toplanan para ile borsadaki alım satımın farkı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Halka arzda komisyon alınmaz, borsada alınır"
        },
        {
          "id": "b",
          "text": "Halka arzda para şirkete, borsada satana gider"
        },
        {
          "id": "c",
          "text": "Halka arzda vergi ödenmez, borsada ödenir"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q4",
      "question": "İkincil piyasa olmasaydı halka arzlar için ne olurdu?",
      "options": [
        {
          "id": "a",
          "text": "Çıkış bulamayan yatırımcının katılımı azalırdı"
        },
        {
          "id": "b",
          "text": "Şirketler daha yüksek fiyattan pay satabilirdi"
        },
        {
          "id": "c",
          "text": "Halka arz fiyatları devlet tarafından belirlenirdi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "\"Bu hisseyi borsadan alarak şirkete destek oluyorum\" diyen birine ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru, para doğrudan şirketin kasasına girer"
        },
        {
          "id": "b",
          "text": "Doğru, şirket her işlemden komisyon almaktadır"
        },
        {
          "id": "c",
          "text": "Para şirkete değil, satan yatırımcıya gider"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q6",
      "question": "Bir şirket sermaye artırımıyla yeni pay sattığında bu hangi piyasadır?",
      "options": [
        {
          "id": "a",
          "text": "Birincil piyasa, çünkü paylar ilk kez satılıyor"
        },
        {
          "id": "b",
          "text": "İkincil piyasa, çünkü şirket zaten borsadadır"
        },
        {
          "id": "c",
          "text": "Hiçbiri, çünkü sermaye artırımı piyasa dışıdır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q7",
      "question": "Şirket ikincil piyasadaki fiyatı neden takip eder?",
      "options": [
        {
          "id": "a",
          "text": "Yapılan her işlemden şirkete komisyon aktarıldığı için"
        },
        {
          "id": "b",
          "text": "İleride sermaye toplarken bu fiyat esas alınacağı için"
        },
        {
          "id": "c",
          "text": "Fiyat düşerse borsadan çıkarılmak zorunda olduğu için"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q8",
      "question": "Aşağıdakilerden hangisi ikincil piyasada gerçekleşir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin ilk kez pay ihraç etmesi"
        },
        {
          "id": "b",
          "text": "Sermaye artırımında yeni payların satılması"
        },
        {
          "id": "c",
          "text": "İki yatırımcı arasında pay el değiştirmesi"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q9",
      "question": "Halka arzda bir kurucu ortak kendi payını sattı. Bu işlem nedir?",
      "options": [
        {
          "id": "a",
          "text": "İkincil piyasa işlemi, çünkü pay daha önce de vardı"
        },
        {
          "id": "b",
          "text": "Birincil piyasa işlemi, çünkü pay ilk kez halka açılıyor"
        },
        {
          "id": "c",
          "text": "Borsa işlemi, çünkü paylar borsada işlem görecek"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "Birincil ve ikincil piyasa arasındaki temel fark nedir?",
      "options": [
        {
          "id": "a",
          "text": "Paranın şirkete mi yatırımcıya mı gittiği"
        },
        {
          "id": "b",
          "text": "İşlemlerin günün hangi saatinde yapıldığı"
        },
        {
          "id": "c",
          "text": "Yatırımcının hangi aracı kurumu kullandığı"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 53 and order_index = 20;
