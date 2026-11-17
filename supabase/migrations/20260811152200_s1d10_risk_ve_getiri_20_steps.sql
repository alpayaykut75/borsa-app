-- Seviye 1 · Ders 10 — Risk ve Getiri İlişkisi (lesson_id 57) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Risk ve Getiri İlişkisi',
    description = 'Yüksek getiri neden bedava değil?'
where id = 57;

update lesson_steps
set type = 'read',
    title = 'Ortak, Dokuz Dersin Sonunda Tek Bir Kural',
    content = null,
    metadata = $moono$
{
  "text": "Buraya kadar çok yol aldık. Şirketin paylara bölünmesinden başladık, borsaya vardık, fiyatın nasıl oluştuğunu ve kimlerin işlem yaptığını gördük.\n\nŞimdi bütün bunları tek bir cümlede birleştirecek kurala geliyoruz. Bu kural her yatırım aracı için, her ülkede, her dönemde geçerlidir ve öğrendiğin diğer her şeyin altında yatar: getiri beklentisi ile belirsizlik birbirinden ayrılamaz.\n\nYani bu ders yeni bir konu değil. Dokuz dersin ortak paydası."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Risk Ne Demek Değil?',
    content = null,
    metadata = $moono$
{
  "text": "Önce yaygın bir yanlış anlamayı düzeltelim. Risk, \"kaybetmek\" demek değildir.\n\nRisk, sonucun önceden bilinememesi demektir. Yani belirsizliktir. Bir yatırımın riskli olması onun kaybettireceği anlamına gelmez; sonucun hem beklenenden iyi hem de beklenenden kötü çıkabileceği anlamına gelir. Risksiz bir yatırım ise sonucu baştan bilinen yatırımdır; kazandırdığı da bellidir, kazandırmadığı da.\n\nYani risk bir tehlike değil, bir aralıktır. Aralık genişledikçe hem yukarısı hem aşağısı uzar."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Beklenti ile Garanti Arasındaki Fark',
    content = null,
    metadata = $moono$
{
  "text": "İkinci derste tahvil ile payı karşılaştırırken bu ayrımı görmüştük. Şimdi genelleştirelim.\n\nBir yatırımın \"getirisi\" ile \"getiri beklentisi\" farklı şeylerdir. Getiri, işin sonunda gerçekten ne olduğudur; geçmişe bakarak söylenir. Getiri beklentisi ise ne olabileceğine dair bir tahmindir; geleceğe bakar ve tutmayabilir. Reklamlarda, sosyal medyada ve konuşmalarda bu ikisi sürekli birbirine karıştırılır.\n\nYani \"bu yatırım yüzde 30 kazandırır\" cümlesi bir bilgi değil, bir tahmindir. Cümleyi kuran kişi bunu bilmiyor olabilir; sen bileceksin."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Risk",
  "back_text": "Bir yatırımın sonucunun önceden bilinememesidir. Yalnızca kayıp ihtimalini değil, sonucun beklenenden farklı çıkma ihtimalinin tamamını anlatır."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Yatırımda risk kavramı en doğru nasıl tanımlanır?",
  "options": [
    {
      "id": "a",
      "text": "Yatırımın kesin olarak zarar etmesi durumu"
    },
    {
      "id": "b",
      "text": "Sonucun önceden bilinememesi, yani belirsizlik"
    },
    {
      "id": "c",
      "text": "Fiyatın gün içinde hiç hareket etmemesi"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Yüksek getiri beklentisi her zaman yüksek ____ birlikte gelir.",
  "options": [
    {
      "id": "a",
      "text": "komisyonla"
    },
    {
      "id": "b",
      "text": "vergiyle"
    },
    {
      "id": "c",
      "text": "belirsizlikle"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Neden Risksiz Yüksek Getiri Olamaz?',
    content = null,
    metadata = $moono$
{
  "text": "Bu, dersin en önemli mantık zinciri. Yavaş oku.\n\nDiyelim ki gerçekten risksiz ve yüksek getirili bir fırsat var. Ne olurdu? Herkes onu duyar ve oraya yönelirdi. Talep artınca fiyatı yükselirdi. Fiyat yükseldikçe aynı yatırımdan elde edilecek getiri düşerdi. Bu, getiri sıradan bir seviyeye inene kadar sürerdi. Yani fırsat, herkes fark ettiği anda kendini yok eder.\n\nYani yüksek getirinin ayakta kalabilmesinin tek yolu, onu almaya herkesin istekli olmamasıdır. İnsanların çekindiği şey de risktir. Risk, yüksek getirinin bekçisidir."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Bir Risk Merdiveni',
    content = null,
    metadata = $moono$
{
  "text": "Bunu somut bir sıralamayla görelim. Aşağıdan yukarı çıkalım.\n\nEn altta vadeli mevduat gibi araçlar vardır; getirisi baştan bellidir. Bir üstte tahviller; Ders 2'de gördüğümüz gibi alacak sırasında öndedirler ama garanti değildir. Onun üstünde şirket payları; ne vade ne getiri sözü vardır ve sıranın en sonundadırlar. En üstte ise kaldıraçlı türev ürünler; küçük hareketler bile büyük sonuçlar doğurabilir.\n\nYani merdivenin her basamağında beklenti biraz artar, belirsizlik de biraz artar. Basamak atlarken ikisi birlikte hareket eder."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Hiçbir Şey Yapmamanın da Bir Riski Var',
    content = null,
    metadata = $moono$
{
  "text": "Merdivenin en altında durmanın da bir bedeli olduğunu bilmek gerekir.\n\nParanı hiç değerlendirmeyip nakit tuttuğunda sayı olarak hiçbir şey kaybetmezsin. Ama enflasyon devam ettiği sürece o paranın alım gücü zamanla azalır; aynı rakamla daha az şey alabilirsin. Bu da bir belirsizliktir, çünkü enflasyonun ne olacağını kimse baştan bilmez.\n\nYani \"riske girmemek\" diye bir seçenek yoktur; hangi riski taşıyacağını seçmek vardır. Bu seçim kişiye göre değişir ve doğru cevabı Moono veremez, ancak sen verebilirsin."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "Getiri Beklentisi",
  "back_text": "Bir yatırımdan elde edilebileceği tahmin edilen sonuçtur. Gerçekleşen getiriyle aynı şey değildir; tahmindir ve tutmayabilir."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "\"Risksiz ve yüksek getiri\" vaadi neden şüpheyle karşılanmalı?",
  "options": [
    {
      "id": "a",
      "text": "Böyle bir fırsat olsaydı herkes ona yönelirdi"
    },
    {
      "id": "b",
      "text": "Yüksek getiri yalnızca büyük yatırımcılara açıktır"
    },
    {
      "id": "c",
      "text": "Devlet böyle ürünlerin satışını tamamen yasaklamıştır"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Alacaklının pay sahibine göre daha az risk taşımasının sebebi ____ önde olmasıdır.",
  "options": [
    {
      "id": "a",
      "text": "getiri hesabında"
    },
    {
      "id": "b",
      "text": "vergi sırasında"
    },
    {
      "id": "c",
      "text": "alacak sırasında"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: "Aylık Yüzde 20, Garantili"',
    content = null,
    metadata = $moono$
{
  "text": "Bir gün karşına şöyle bir teklif çıkacak. Hazırlıklı ol.\n\nBirisi sana aylık yüzde 20 kazanç vaat ediyor ve \"risk yok, garanti\" diyor. Artık bu cümlenin neden imkânsız olduğunu biliyorsun: eğer gerçekten risksiz ve bu kadar yüksek bir getiri mümkün olsaydı, o kişinin seni araması gerekmezdi. Kendi parasını koyar, bankadan borçlanır ve kimseye söylemezdi. Seni araması, paranın senden geliyor olması gerektiğini gösterir.\n\nYani \"garanti getiri\" ifadesi bir fırsat işareti değil, bir uyarı işaretidir. Bu tür yapıların ayrıntılarını Usta seviyesinde ayrıca konuşacağız."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Doğru Soru Hangisi?',
    content = null,
    metadata = $moono$
{
  "text": "Yeni başlayan biri genellikle şunu sorar: \"Bu yatırım bana ne kadar kazandırır?\"\n\nBu soru cevaplanamaz, çünkü kimse bilmiyor. Onun yerine cevaplanabilir bir soru var: \"İşler kötüye giderse ne kadar kayba dayanabilirim?\" Bu sorunun cevabını yalnızca sen bilirsin ve bilmek için piyasayı değil, kendi durumunu tanımak yeterlidir. Paranı ne zaman kullanacağın, ne kadarını gözden çıkarabileceğin, düşüş gördüğünde uykunun kaçıp kaçmayacağı senin bildiğin şeylerdir.\n\nYani iyi yatırımcı geleceği daha iyi tahmin eden kişi değildir. Kendi sınırlarını daha iyi bilen kişidir."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Çaylak Seviyesinin Sonu',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak, hem bu dersi hem bütün seviyeyi.\n\nBir işletme paylara bölünür; pay sahibi ortak olur, alacaklı ise sırada önde durur. Şirketler büyümek için halka açılır ve karşılığında şeffaflık kabul eder. Borsa bu payların el değiştirmesini mümkün kılar; fiyat da alıcı ve satıcıların karşılaşmasından doğar. Endeksler piyasanın nabzını tutar, farklı oyuncular farklı sebeplerle işlem yapar. Ve hepsinin altında tek bir kural vardır: getiri beklentisi ile belirsizlik birlikte hareket eder.\n\nYani artık borsanın ne olduğunu biliyorsun. Sıradaki seviyede ekrana geçiyoruz: hesap nasıl açılır, emir nasıl verilir, ekranda ne yazar. Çaylak bitti, Çırak başlıyor."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Risk-Getiri Dengesi",
  "back_text": "Getiri beklentisi arttıkça belirsizliğin de artması ilkesidir. Yüksek getiri beklentisi sunan hiçbir araç, aynı anda düşük belirsizlik sunamaz."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Bir yatırımcının risk konusunda kendine sorması gereken soru nedir?",
  "options": [
    {
      "id": "a",
      "text": "İyi senaryoda bana ne kadar kazandırır"
    },
    {
      "id": "b",
      "text": "Kötü senaryoda ne kadar kayba dayanırım"
    },
    {
      "id": "c",
      "text": "Bu hisse bu ay ne kadar yükselir"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Parayı hiç değerlendirmemek de bir risktir, çünkü ____ alım gücünü azaltır.",
  "options": [
    {
      "id": "a",
      "text": "enflasyon"
    },
    {
      "id": "b",
      "text": "komisyon"
    },
    {
      "id": "c",
      "text": "temettü"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 57 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, Çaylak seviyesinin son dersini tamamladın. Şimdi iki dakikada risk ile getiriyi ve bütün seviyeyi toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, Çaylak seviyesinin son dersini tamamladın. Toparlayalım.\n\nBu ders yeni bir konu değildi; dokuz dersin ortak paydasıydı. Tek bir kural: getiri beklentisi ile belirsizlik birbirinden ayrılamaz.\n\nÖnce bir yanlış anlamayı düzelttik. Risk \"kaybetmek\" demek değil, sonucun önceden bilinememesi demek. Yani belirsizlik. Risk bir tehlike değil, bir aralık; aralık genişledikçe hem yukarısı hem aşağısı uzuyor.\n\nSonra en önemli mantık zincirine geldik. Gerçekten risksiz ve yüksek getirili bir fırsat olsaydı ne olurdu? Herkes oraya yönelirdi, fiyat yükselirdi, getiri düşerdi. Yani fırsat herkes fark ettiği anda kendini yok eder. Yüksek getirinin ayakta kalmasının tek yolu, insanların ondan çekinmesidir. Çekindikleri şey de risktir. Risk, yüksek getirinin bekçisidir.\n\nBir merdiven çizdik. En altta getirisi belli araçlar, sonra tahviller, sonra paylar, en üstte kaldıraçlı türevler. Her basamakta beklenti biraz artıyor, belirsizlik de biraz artıyor.\n\nAma merdivenin en altında durmanın da bir bedeli var. Parayı hiç değerlendirmezsen sayı olarak kaybetmezsin, ama enflasyon alım gücünü zamanla azaltır. Yani riske girmemek diye bir seçenek yok; hangi riski taşıyacağını seçmek var. Bu seçim kişiye göre değişir ve doğru cevabı ancak sen verebilirsin.\n\nBir de karşına çıkacak bir teklif var: \"Aylık yüzde 20, garantili.\" Artık biliyorsun. Böyle bir şey mümkün olsaydı o kişinin seni araması gerekmezdi. Garanti getiri ifadesi bir fırsat işareti değil, uyarı işaretidir.\n\nSon olarak doğru soru. \"Bu yatırım ne kadar kazandırır\" sorusunu kimse cevaplayamaz. Ama \"işler kötüye giderse ne kadar kayba dayanabilirim\" sorusunu sen cevaplayabilirsin. İyi yatırımcı geleceği daha iyi tahmin eden değil, kendi sınırlarını daha iyi bilen kişidir.\n\nÇaylak seviyesini tamamladın ortak. Şirketten paya, halka arzdan borsaya, fiyattan riske kadar geldik. Şimdi ekrana geçiyoruz: hesap nasıl açılır, emir nasıl verilir, o ekranda ne yazar. Çırak seviyesinde görüşürüz."
}
$moono$::jsonb
where lesson_id = 57 and order_index = 19;

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
      "question": "Yatırımda risk ne demektir?",
      "options": [
        {
          "id": "a",
          "text": "Yatırımın kesin olarak kaybettireceği durum"
        },
        {
          "id": "b",
          "text": "Yalnızca borsaya özgü bir tehlike türü"
        },
        {
          "id": "c",
          "text": "Sonucun önceden bilinememesi, yani belirsizlik"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q2",
      "question": "\"Risksiz yüksek getiri\" vaadi neden gerçekçi değildir?",
      "options": [
        {
          "id": "a",
          "text": "Böyle bir fırsat olsaydı herkes ona yönelirdi"
        },
        {
          "id": "b",
          "text": "Devlet bu tür ürünlerin tamamını yasaklamıştır"
        },
        {
          "id": "c",
          "text": "Yüksek getiri yalnızca kurumsal yatırımcılara açıktır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Alacaklı, pay sahibinden neden daha az risk taşır?",
      "options": [
        {
          "id": "a",
          "text": "Getirisinin bir üst sınırı bulunmadığı için"
        },
        {
          "id": "b",
          "text": "Alacak sırasında ondan önde olduğu için"
        },
        {
          "id": "c",
          "text": "Şirketin genel kurulunda oy kullandığı için"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q4",
      "question": "Riski en düşükten en yükseğe doğru sıralama hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Pay, mevduat, türev ürün"
        },
        {
          "id": "b",
          "text": "Türev ürün, pay, mevduat"
        },
        {
          "id": "c",
          "text": "Mevduat, pay, türev ürün"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q5",
      "question": "Parayı hiç değerlendirmemenin taşıdığı risk nedir?",
      "options": [
        {
          "id": "a",
          "text": "Enflasyonun paranın alım gücünü zamanla azaltması"
        },
        {
          "id": "b",
          "text": "Bankaların hesabı kapatmak zorunda kalması"
        },
        {
          "id": "c",
          "text": "Devletin nakit tutmayı yasaklama ihtimali"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q6",
      "question": "Yüksek getiri beklentisi ile risk arasındaki ilişki nasıldır?",
      "options": [
        {
          "id": "a",
          "text": "Birbirinden tamamen bağımsız duran iki kavramdır"
        },
        {
          "id": "b",
          "text": "Getiri beklentisi arttıkça belirsizlik de artar"
        },
        {
          "id": "c",
          "text": "Getiri arttıkça risk azalma eğilimi gösterir"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q7",
      "question": "Bir yatırımcının risk konusunda kendine sorması gereken asıl soru nedir?",
      "options": [
        {
          "id": "a",
          "text": "Kötü senaryoda ne kadar kayba dayanırım"
        },
        {
          "id": "b",
          "text": "İyi senaryoda bana ne kadar kazandırır"
        },
        {
          "id": "c",
          "text": "Bu hisse bu ay ne kadar yükselebilir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "\"Aylık yüzde 20 garanti kazanç\" teklifi alan biri ne düşünmelidir?",
      "options": [
        {
          "id": "a",
          "text": "Fırsatı kaçırmamak için hemen katılmalıdır"
        },
        {
          "id": "b",
          "text": "Yalnızca çok küçük bir tutarla denemelidir"
        },
        {
          "id": "c",
          "text": "Garanti kazanç vaadi ciddi bir uyarı işaretidir"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q9",
      "question": "Aynı risk düzeyinde iki yatırımcı neden farklı seçimler yapabilir?",
      "options": [
        {
          "id": "a",
          "text": "Kayba dayanma güçleri ve hedefleri farklıdır"
        },
        {
          "id": "b",
          "text": "Borsada herkese farklı fiyat uygulanmaktadır"
        },
        {
          "id": "c",
          "text": "Risk herkes için matematiksel olarak aynıdır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q10",
      "question": "Çaylak seviyesinin en temel çıkarımı hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru hisseyi seçen yatırımcı mutlaka kazanır"
        },
        {
          "id": "b",
          "text": "Her getiri beklentisi bir belirsizlikle birlikte gelir"
        },
        {
          "id": "c",
          "text": "Borsa uzun vadede herkese kazandıran bir yerdir"
        }
      ],
      "correct_option_id": "b"
    }
  ]
}
$moono$::jsonb
where lesson_id = 57 and order_index = 20;
