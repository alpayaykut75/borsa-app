-- Seviye 1 · Ders 2: Ortak mı, Alacaklı mı? (lesson_id 28) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Ortak mı, Alacaklı mı?',
    description = 'Pay almakla borç vermenin farkı'
where id = 28;

update lesson_steps
set type = 'read',
    title = 'Ortak, Aynı Kapıya İki Yol Çıkar',
    content = null,
    metadata = $moono$
{
  "text": "Geçen derste fırının önündeki iki yolu konuşmuştuk: ya borç alacaktı ya da ortak alacaktı. Şimdi aynı manzaraya öbür taraftan, yani parayı veren kişinin yerinden bakalım.\n\nÇünkü o parayı veren kişi sen olabilirsin. Ve hangi yoldan girdiğine göre bambaşka bir konuma geçersin: ya şirketin alacaklısı olursun, ya da ortağı.\n\nYani \"bir şirkete para yatırdım\" cümlesi tek başına eksiktir. Asıl soru şudur: alacaklı mı oldun, ortak mı?"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Birinci Yol: Alacaklı Olmak',
    content = null,
    metadata = $moono$
{
  "text": "Bir şirket her zaman ortak aramaz. Bazen sadece belirli bir süreliğine paraya ihtiyacı vardır ve işinin bir parçasını kalıcı olarak devretmek istemez.\n\nBöyle durumlarda borçlanır. Bunu yalnızca bankadan yapmaz; senin gibi yatırımcılardan da borç alabilir. Bunun için çıkardığı belgeye **tahvil** denir. Tahvili alan kişi şirkete borç vermiş olur; karşılığında belirlenen faizi alır ve vade sonunda anaparasını geri ister.\n\nYani tahvil sahibi şirketin ortağı değildir. O, şirketten alacağı olan kişidir."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'İkinci Yol: Ortak Olmak',
    content = null,
    metadata = $moono$
{
  "text": "Pay aldığında ise tablo tamamen değişir. Geçen derste konuştuğumuz gibi işletmenin ölçülebilir bir dilimi senin olur.\n\nBurada ne bir vade vardır ne de geri ödeme sözü. Şirket sana \"şu tarihte paranı iade edeceğim\" demez. Kazancın da baştan belli değildir; şirket iyi giderse artar, kötü giderse azalır.\n\nYani alacaklının elinde bir takvim ve bir rakam vardır. Ortağın elinde ise bir oran ve bir belirsizlik."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Tahvil",
  "back_text": "Bir şirketin veya devletin borçlanmak için çıkardığı belgedir. Tahvili alan kişi ortak değil alacaklı olur; belirlenen faizi ve vade sonunda anaparasını alır."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Bir şirketin çıkardığı tahvili satın alan kişi hangi konuma geçer?",
  "options": [
    {
      "id": "a",
      "text": "Şirketten alacağı olan kişi konumuna"
    },
    {
      "id": "b",
      "text": "Şirketin oy hakkı olan ortağı konumuna"
    },
    {
      "id": "c",
      "text": "Şirketin yönetim kurulu üyesi konumuna"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Pay sahibinin aksine tahvil sahibinin elinde belirli bir ____ vardır.",
  "options": [
    {
      "id": "a",
      "text": "oy hakkı"
    },
    {
      "id": "b",
      "text": "ortaklık oranı"
    },
    {
      "id": "c",
      "text": "vade tarihi"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Kim Ne Kadar Kazanır?',
    content = null,
    metadata = $moono$
{
  "text": "İki yolun kazanç mantığı da birbirinden ayrılır.\n\nAlacaklının getirisi baştan bellidir ve bir tavanı vardır. Şirket tarihinin en kârlı yılını yaşasa bile tahvil sahibi sözleşmede yazandan fazlasını alamaz. Pay sahibinin getirisinde ise böyle bir tavan yoktur; şirket büyüdükçe payının değeri de büyüyebilir.\n\nYani alacaklı bilinen ve sınırlı bir getiriyi seçer. Ortak ise üst sınırı olmayan ama baştan bilinmeyen bir getiriyi."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Sıra Meselesi',
    content = null,
    metadata = $moono$
{
  "text": "Peki işler kötüye giderse ne olur? Aradaki en kritik fark tam olarak burada ortaya çıkar.\n\nBir şirket kapandığında elinde kalan varlıklar rastgele değil, belirli bir sıraya göre dağıtılır. Önce çalışanların ve devletin alacakları ödenir. Sonra bankaların ve tahvil sahiplerinin alacakları gelir. Pay sahipleri bu sıranın en sonundadır.\n\nYani ortak, herkes ödendikten sonra geriye ne kaldıysa onu alır. Çoğu zaman geriye bir şey kalmaz."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Hangisi Daha İyi?',
    content = null,
    metadata = $moono$
{
  "text": "Bu soruya \"şu daha iyidir\" diye tek bir cevap yok. Çünkü ikisi farklı ihtiyaçlar için tasarlanmıştır.\n\nAlacaklı olmak, sırada önde olmayı ve bilinen bir getiriyi seçmektir; bunun bedeli, şirket çok kazandığında bundan pay alamamaktır. Ortak olmak ise sıranın en sonuna geçmeyi kabul etmektir; karşılığında şirketin büyümesine üst sınır olmadan eşlik edebilirsin.\n\nYani seçim getiri ile güvence arasındadır. Daha yüksek getiri beklentisi, her zaman daha yüksek belirsizlikle birlikte gelir."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Alacak Sırası",
  "back_text": "Bir şirket kapandığında varlıklarının kime hangi sırayla dağıtılacağını belirleyen düzendir. Alacaklılar önce, pay sahipleri en sonda yer alır."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Kapanan bir şirketin varlıkları dağıtılırken pay sahipleri sırada nerede yer alır?",
  "options": [
    {
      "id": "a",
      "text": "Çalışanlardan hemen sonra, bankalardan önce"
    },
    {
      "id": "b",
      "text": "Bütün alacaklılar ödendikten sonra en sonda"
    },
    {
      "id": "c",
      "text": "Tahvil sahipleriyle birlikte tamamen aynı sırada"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Şirket tarihinin en kârlı yılını yaşasa bile tahvil sahibi ____ alamaz.",
  "options": [
    {
      "id": "a",
      "text": "anaparasını vade sonunda"
    },
    {
      "id": "b",
      "text": "yıl içindeki faiz ödemelerini"
    },
    {
      "id": "c",
      "text": "sözleşmede yazandan fazlasını"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Aynı Fırına İki Farklı Yatırım',
    content = null,
    metadata = $moono$
{
  "text": "Somutlaştıralım. İki kişi aynı fırına 10.000'er lira veriyor. Ayşe fırının çıkardığı tahvili alıyor: bir yıl vadeli ve yıl sonunda kendisine 12.000 lira ödenecek. Bora ise aynı parayla fırının paylarından alıyor.\n\nFırın harika bir yıl geçirirse ne olur? Ayşe yine 12.000 lira alır, bir kuruş fazlasını değil. Bora'nın payının değeri ise 15.000 liraya çıkabilir. Peki yıl kötü geçerse? Ayşe yine 12.000 lira alır. Bora'nın payı 7.000 liraya düşebilir ve kâr payı da dağıtılmaz.\n\nYani Ayşe'nin sonucu iki senaryoda da aynı. Bora'nınki ise tamamen fırının nasıl gittiğine bağlı."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Söz Vermek, Garanti Vermek Değildir',
    content = null,
    metadata = $moono$
{
  "text": "Buradan \"tahvil risksizdir\" sonucunu çıkarmamak gerekir. Bu, en sık yapılan yanlışlardan biridir.\n\nAyşe'nin elindeki şey bir sözdür, bir garanti değil. Fırın gerçekten batarsa ödeme yapılamayabilir. Ayşe sırada Bora'dan önde olduğu için parasının bir kısmını kurtarma ihtimali daha yüksektir, ama bu bir kesinlik değildir.\n\nYani alacaklı olmak riski azaltır, ortadan kaldırmaz. Sırada önde olmak, sıra sana gelene kadar para kalacağı anlamına gelmez."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Bir şirkete para verirken iki farklı konuma geçebilirsin: alacaklı ya da ortak.\n\nAlacaklının bir vadesi, bilinen bir getirisi ve sırada öncelikli bir yeri vardır; buna karşılık kazancının bir tavanı da vardır. Ortağın ise vadesi ve getiri sözü yoktur, sıranın en sonundadır; karşılığında şirketin büyümesinden pay alma ihtimali açık kalır.\n\nYani ikisi rakip değil, farklı ihtiyaçlara verilmiş farklı cevaplardır. Bu uygulamanın ana konusu olan pay, bunlardan ortaklık tarafında durur."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Vade",
  "back_text": "Bir borç işleminde anaparanın geri ödeneceği tarihtir. Tahvilin vadesi vardır; payın vadesi yoktur."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Bir yatırımcı neden ortak olmak yerine alacaklı olmayı tercih edebilir?",
  "options": [
    {
      "id": "a",
      "text": "Getirisini baştan bilmek ve sırada önde olmak için"
    },
    {
      "id": "b",
      "text": "Şirketin genel kurul kararlarında söz sahibi olmak için"
    },
    {
      "id": "c",
      "text": "Şirket büyüdükçe kazancının üst sınırsız artmasını sağlamak için"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Şirket kâr ettiğinde kazancına üst sınır konmayan taraf ____ olur.",
  "options": [
    {
      "id": "a",
      "text": "tahvil sahibi"
    },
    {
      "id": "b",
      "text": "pay sahibi"
    },
    {
      "id": "c",
      "text": "borç veren banka"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 28 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, ikinci dersi de bitirdin. Şimdi iki dakikada alacaklı ile ortak arasındaki farkı baştan sona toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, ikinci dersi de bitirdin. Kısaca toparlayalım.\n\nGeçen derste fırının önünde iki yol vardı: borç almak ya da ortak almak. Bu derste aynı manzaraya parayı veren kişinin yerinden baktık.\n\nÇünkü bir şirkete para verirken iki farklı konuma geçebilirsin. Ya alacaklısı olursun, ya ortağı.\n\nAlacaklı olmak şu demek: şirkete borç verirsin. Bunun için çıkardığı belgeye tahvil denir. Belirlenen faizi alırsın ve vade sonunda anaparanı geri istersin. Elinde bir takvim ve bir rakam vardır.\n\nOrtak olmak ise şu demek: işletmenin bir dilimi senin olur. Vade yoktur, geri ödeme sözü yoktur. Elinde bir oran ve bir belirsizlik vardır.\n\nKazanç tarafında da ayrılırlar. Alacaklının getirisi baştan bellidir ve bir tavanı vardır; şirket tarihinin en iyi yılını yaşasa bile sözleşmede yazandan fazlasını alamaz. Ortağın getirisinde ise böyle bir tavan yoktur.\n\nAma asıl kritik fark işler kötüye gittiğinde ortaya çıkar. Bir şirket kapandığında varlıkları belirli bir sıraya göre dağıtılır. Önce çalışanlar ve devlet, sonra bankalar ve tahvil sahipleri. Pay sahipleri bu sıranın en sonundadır. Yani ortak, herkes ödendikten sonra geriye ne kaldıysa onu alır. Çoğu zaman geriye bir şey kalmaz.\n\nBurada bir yanılgıya düşme: tahvil risksiz değildir. Alacaklının elindeki bir sözdür, garanti değil. Şirket gerçekten batarsa ödeme yapılamayabilir. Sırada önde olmak riski azaltır, ortadan kaldırmaz.\n\nYani ikisi rakip değil, farklı ihtiyaçlara verilmiş farklı cevaplardır. Bizim ana konumuz olan pay, ortaklık tarafında durur.\n\nİkinci adımı da mühürledin. Bir sonraki derste şirketlerin bu payları neden binlerce kişiye açtığına, yani halka arza bakacağız."
}
$moono$::jsonb
where lesson_id = 28 and order_index = 19;

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
      "question": "Bir şirketin çıkardığı tahvili alan kişi için hangisi doğrudur?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin ortağı olur ve oy hakkı kazanır"
        },
        {
          "id": "b",
          "text": "Şirketin alacaklısı olur, anaparasını vadede ister"
        },
        {
          "id": "c",
          "text": "Şirketin kârından payı oranında hisse alır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "Şirket rekor kâr açıkladığında tahvil sahibinin getirisi ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Kâr oranında artar"
        },
        {
          "id": "b",
          "text": "Kârın yarısı kadar artar"
        },
        {
          "id": "c",
          "text": "Sözleşmedeki tutarda kalır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q3",
      "question": "Bir şirket kapandığında ödemeler hangi sırayla yapılır?",
      "options": [
        {
          "id": "a",
          "text": "Önce alacaklılar, en sonda pay sahipleri"
        },
        {
          "id": "b",
          "text": "Önce pay sahipleri, en sonda alacaklılar"
        },
        {
          "id": "c",
          "text": "Herkese aynı anda ve eşit oranda"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "Ayşe 10.000 TL'ye bir yıl vadeli tahvil aldı; vade sonunda 12.000 TL alacak. Şirket o yıl rekor kâr açıkladı. Ayşe ne alır?",
      "options": [
        {
          "id": "a",
          "text": "Rekor kâr nedeniyle 12.000 TL'den fazlasını"
        },
        {
          "id": "b",
          "text": "Sözleşmede belirlenen 12.000 TL'nin tamamını"
        },
        {
          "id": "c",
          "text": "Yalnızca anaparası olan 10.000 TL'yi"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q5",
      "question": "\"Tahvil aldım, artık param tamamen güvende\" diyen birine ne söylenmelidir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru, tahvilin geri ödenmesi yasal güvence altındadır"
        },
        {
          "id": "b",
          "text": "Doğru, çünkü alacaklılar sırada en önde yer alır"
        },
        {
          "id": "c",
          "text": "Yanlış, sırada önde olmak riski azaltır ama bitirmez"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q6",
      "question": "Bir şirketin ortak almak yerine tahvil çıkarmayı tercih etme sebebi ne olabilir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin bir kısmını devretmek istememesi"
        },
        {
          "id": "b",
          "text": "Faiz ödemekten tamamen kurtulmak istemesi"
        },
        {
          "id": "c",
          "text": "Genel kurulda oy sayısını artırmak istemesi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q7",
      "question": "Getirisinin üst sınırı olmayan araç aşağıdakilerden hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket tahvili"
        },
        {
          "id": "b",
          "text": "Şirket payı"
        },
        {
          "id": "c",
          "text": "Devlet tahvili"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q8",
      "question": "Bir yatırımcı sermayesini korumaya öncelik veriyor. Hangi konum bu önceliğe daha yakındır?",
      "options": [
        {
          "id": "a",
          "text": "Alacaklı konumu, çünkü sırada önde ve getirisi bellidir"
        },
        {
          "id": "b",
          "text": "Ortak konumu, çünkü getirisinin bir üst sınırı yoktur"
        },
        {
          "id": "c",
          "text": "İkisi de tam olarak aynı düzeyde koruma sağlar"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "Tahvil sahibinin şirketin genel kurulunda oy hakkı var mıdır?",
      "options": [
        {
          "id": "a",
          "text": "Vardır, tahvil tutarı oranında oy kullanır"
        },
        {
          "id": "b",
          "text": "Vardır, ancak pay sahiplerinin yarısı kadar"
        },
        {
          "id": "c",
          "text": "Yoktur, çünkü ortak değil alacaklıdır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q10",
      "question": "\"Bir şirkete 50.000 lira yatırdım\" cümlesi neden tek başına yetersizdir?",
      "options": [
        {
          "id": "a",
          "text": "Kişinin ortak mı alacaklı mı olduğu belli değildir"
        },
        {
          "id": "b",
          "text": "Yatırılan tutarın hangi yılda olduğu belirtilmemiştir"
        },
        {
          "id": "c",
          "text": "Şirketin hangi sektörde çalıştığı anlaşılamamaktadır"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 28 and order_index = 20;
