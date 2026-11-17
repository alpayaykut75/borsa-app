-- Seviye 1 · Ders 8 — Endeks Nedir? (lesson_id 55) — 20 adım
-- Hedefli UPDATE. Ses kaydı gelene kadar hidden_in_app=true.

update lessons
set title = 'Endeks Nedir?',
    description = 'BIST 100 tek başına ne anlatır?'
where id = 55;

update lesson_steps
set type = 'read',
    title = 'Ortak, "Borsa Bugün Yükseldi" Ne Demek?',
    content = null,
    metadata = $moono$
{
  "text": "Haberlerde sık duyarsın: \"Borsa bugün yüzde 2 yükseldi.\"\n\nAma dur bir saniye. Borsada yüzlerce şirket var. Bazıları yükselmiş, bazıları düşmüştür, bazıları hiç hareket etmemiştir. Peki tek bir cümleyle \"borsa yükseldi\" demek nasıl mümkün oluyor? Kim bu yüzlerce farklı sonucu tek bir rakama indiriyor?\n\nYani ortada bir özetleme aracı var. O aracın adı **endeks**."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Sepet Mantığı',
    content = null,
    metadata = $moono$
{
  "text": "Endeksi anlamanın en kolay yolu onu bir sepet gibi düşünmektir.\n\nBelirli ölçütlere göre seçilmiş bir grup payı bir sepete koyarsın. Sonra bu sepetin toplam değerinin zaman içinde nasıl değiştiğini takip edersin. Sepetteki paylar ortalama olarak değer kazandıysa endeks yükselir; kaybettiyse düşer. Endeksin kendisi bir şirket değildir, satın alabileceğin bir şey de değildir; sadece bir hesaplamadır.\n\nYani endeks bir termometre gibidir. Havayı değiştirmez, sadece ölçer."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'BIST 100 ve BIST 30',
    content = null,
    metadata = $moono$
{
  "text": "Türkiye'de en çok izlenen sepet **BIST 100**'dür.\n\nAdından anlaşılacağı gibi içinde yüz pay bulunur ve Borsa İstanbul'un ana göstergesi kabul edilir. Bir de **BIST 30** vardır; içindeki otuz pay, BIST 100'ün de bir parçasıdır ve en büyük, en çok işlem gören şirketleri temsil eder. Bunların dışında bankacılık, sınai gibi sektörlere özel endeksler de vardır. Hangi payın hangi endekste yer alacağı belirli ölçütlere göre dönemsel olarak yeniden belirlenir.\n\nYani tek bir \"borsa endeksi\" yoktur; neyi ölçmek istediğine göre farklı sepetler vardır."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $moono$
{
  "front_text": "Endeks",
  "back_text": "Belirli ölçütlerle seçilmiş bir grup payın topluca nasıl hareket ettiğini gösteren sayıdır. Bir şirket değildir; piyasanın genel yönünü özetler."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 1',
    content = null,
    metadata = $moono$
{
  "question": "Bir endeks temel olarak neyi gösterir?",
  "options": [
    {
      "id": "a",
      "text": "Bir grup payın topluca nasıl hareket ettiğini"
    },
    {
      "id": "b",
      "text": "Tek bir şirketin yıllık kâr büyüme oranını"
    },
    {
      "id": "c",
      "text": "Borsanın gün içinde topladığı komisyon tutarını"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 5;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Borsa İstanbul'un en çok izlenen ana endeksi ____ endeksidir.",
  "options": [
    {
      "id": "a",
      "text": "BIST Bankacılık"
    },
    {
      "id": "b",
      "text": "BIST 30"
    },
    {
      "id": "c",
      "text": "BIST 100"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Sepetteki Her Şirket Eşit Değil',
    content = null,
    metadata = $moono$
{
  "text": "Şimdi çoğu kişinin bilmediği bir ayrıntı: endekste her şirketin ağırlığı aynı değildir.\n\nEndeks hesaplanırken şirketler piyasa değerlerine göre ağırlıklandırılır. Yani çok büyük bir şirketin payı yüzde 1 hareket ettiğinde endeks üzerindeki etkisi, küçük bir şirketin yüzde 10 hareket etmesinden daha fazla olabilir. Ders 7'de öğrendiğimiz piyasa değeri kavramı tam burada işe yarıyor.\n\nYani endeks yüz şirketin ortalaması değildir. Büyüklerin sesinin daha çok çıktığı bir ortalamadır."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'Endeks Ne İşe Yarar?',
    content = null,
    metadata = $moono$
{
  "text": "Peki bu sayıyı bilmek yatırımcıya ne kazandırır? Üç şey.\n\nBirincisi karşılaştırma: kendi sonucunu piyasanın geneliyle kıyaslayabilirsin. Yılda yüzde 20 kazandın diyelim; endeks yüzde 40 arttıysa aslında piyasanın gerisinde kalmışsındır. İkincisi nabız tutma: piyasanın genel yönünü tek bakışta görürsün. Üçüncüsü ise ürün temeli: bazı fonlar bir endeksi taklit edecek şekilde kurulur ve bu sayede tek tek hisse seçmeden bütün sepete yatırım yapılabilir.\n\nYani endeks hem bir ölçü aleti hem de bir kıyas noktasıdır."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 8;

update lesson_steps
set type = 'read',
    title = 'Endeks Ortalamadır, Herkesin Hikâyesi Değil',
    content = null,
    metadata = $moono$
{
  "text": "Burada dikkat edilmesi gereken bir sınır var.\n\nEndeks yüzde 3 yükseldiğinde bu, o sepetteki her payın yükseldiği anlamına gelmez. Aynı gün içinde bazı şirketler sert düşmüş olabilir; endeks yine de yükselir, çünkü diğerlerinin toplam etkisi daha güçlüdür. Kendi portföyün endeksle aynı yönde hareket etmek zorunda değildir.\n\nYani endeks piyasanın ortalamasını anlatır, senin hesabının durumunu değil. İkisini karıştırmamak gerekir."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $moono$
{
  "front_text": "BIST 100",
  "back_text": "Borsa İstanbul'un ana endeksidir; belirli ölçütlere göre seçilmiş yüz payın topluca hareketini gösterir. BIST 30 payları da bu yüzün içinde yer alır."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 2',
    content = null,
    metadata = $moono$
{
  "question": "Bir endekste hangi şirketler daha çok etkili olur?",
  "options": [
    {
      "id": "a",
      "text": "Payının fiyatı en yüksek olan şirketler"
    },
    {
      "id": "b",
      "text": "Piyasa değeri en büyük olan şirketler"
    },
    {
      "id": "c",
      "text": "En uzun süredir borsada olan şirketler"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 11;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Endeks yükseldiği hâlde bir yatırımcının hissesi ____ olabilir.",
  "options": [
    {
      "id": "a",
      "text": "endeksten çıkarılmış"
    },
    {
      "id": "b",
      "text": "temettü dağıtmış"
    },
    {
      "id": "c",
      "text": "değer kaybetmiş"
    }
  ],
  "correct_option_id": "c"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Senaryo: Endeks Yükseldi, Ben Kaybettim',
    content = null,
    metadata = $moono$
{
  "text": "Sabah haberleri açıyorsun: \"BIST 100 yüzde 2,5 arttı.\" Sonra kendi hesabına bakıyorsun ve düşüşte olduğunu görüyorsun.\n\nBir hata mı var? Hayır. O gün endeksteki birkaç büyük şirket güçlü yükselmiş ve ağırlıkları yüksek olduğu için endeksi yukarı taşımış olabilir. Senin elindeki şirket ise bu hareketin dışında kalmış, hatta kendine özgü bir sebeple değer kaybetmiş olabilir. Endeks ortalamayı gösterir; ortalama, içindeki her parçayı temsil etmez.\n\nYani \"borsa yükseldi ama ben kaybettim\" cümlesi bir çelişki değil, endeksin doğasının sonucudur."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 13;

update lesson_steps
set type = 'read',
    title = 'Endeks Bir Tavsiye Listesi Değildir',
    content = null,
    metadata = $moono$
{
  "text": "Yaygın bir yanlış anlamayı kapatalım.\n\nBir şirketin BIST 100'e girmesi, o şirketin iyi bir yatırım olduğu anlamına gelmez. Endekse girmek büyüklük ve işlem görme ölçütlerini karşılamak demektir; kârlılık, yönetim kalitesi ya da payın pahalı olup olmadığı hakkında bir hüküm içermez. Aynı şekilde endeksten çıkmak da şirketin battığı anlamına gelmez.\n\nYani endeks bir sıralama tablosu ya da alışveriş listesi değildir. Sadece kimin ölçüldüğünü söyleyen bir ölçüm çerçevesidir."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 14;

update lesson_steps
set type = 'read',
    title = 'Dersin Özeti',
    content = null,
    metadata = $moono$
{
  "text": "Toparlayalım ortak. Endeks, belirli ölçütlerle seçilmiş bir grup payın topluca nasıl hareket ettiğini gösteren bir sayıdır.\n\nTürkiye'nin ana endeksi BIST 100'dür; BIST 30 ise onun içindeki en büyük otuz payı kapsar. Endekste şirketler piyasa değerlerine göre ağırlıklandırılır, yani büyüklerin etkisi daha fazladır. Endeks piyasanın nabzını tutmaya ve kendi sonucunu kıyaslamaya yarar; ama içindeki her payın aynı yönde hareket ettiğini göstermez ve bir tavsiye listesi değildir.\n\nYani artık \"borsa bugün yükseldi\" cümlesini duyduğunda tam olarak neyin yükseldiğini biliyorsun."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 15;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    content = null,
    metadata = $moono$
{
  "front_text": "Endeks Ağırlığı",
  "back_text": "Bir payın endeks üzerindeki etki payıdır. Piyasa değeri büyüdükçe ağırlık artar; bu yüzden büyük şirketler endeksi daha çok hareket ettirir."
}
$moono$::jsonb
where lesson_id = 55 and order_index = 16;

update lesson_steps
set type = 'quiz',
    title = 'Alıştırma 3',
    content = null,
    metadata = $moono$
{
  "question": "Bir yatırımcı endeksi hangi amaçla kullanır?",
  "options": [
    {
      "id": "a",
      "text": "Piyasanın genel gidişatıyla karşılaştırma yapmak için"
    },
    {
      "id": "b",
      "text": "Şirketin dağıtacağı kâr payı oranını hesaplamak için"
    },
    {
      "id": "c",
      "text": "Aracı kurumun aldığı komisyonu ölçmek için"
    }
  ],
  "correct_option_id": "a"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 17;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 3',
    content = null,
    metadata = $moono$
{
  "question": "Cümleyi tamamla: Endeks bir şirket değil, birçok payın ____ ifade eden bir sayıdır.",
  "options": [
    {
      "id": "a",
      "text": "toplam kârını"
    },
    {
      "id": "b",
      "text": "ortak hareketini"
    },
    {
      "id": "c",
      "text": "temettü oranını"
    }
  ],
  "correct_option_id": "b"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 18;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    content = null,
    metadata = $moono$
{
  "text": "Ortak, sekizinci dersi tamamladın. Şimdi iki dakikada endekslerin ne olduğunu ve ne olmadığını toparlayalım.",
  "audio_url": "",
  "hidden_in_app": true,
  "transcript": "Ortak, sekizinci dersi tamamladın. Kısaca toparlayalım.\n\nHaberlerde \"borsa bugün yüzde 2 yükseldi\" cümlesini duyuyorsun. Ama borsada yüzlerce şirket var; bazıları yükselmiş, bazıları düşmüştür. Bu yüzlerce sonucu tek bir rakama indiren araca endeks diyoruz.\n\nEndeksi bir sepet gibi düşün. Belirli ölçütlere göre seçilmiş payları sepete koyarsın ve sepetin toplam değerinin nasıl değiştiğini izlersin. Endeks bir şirket değildir, doğrudan satın alabileceğin bir şey de değildir; sadece bir hesaplamadır. Termometre gibi: havayı değiştirmez, ölçer.\n\nTürkiye'de en çok izlenen sepet BIST 100. İçinde yüz pay var. Bir de BIST 30 var; oradaki otuz pay BIST 100'ün de bir parçası ve en büyük şirketleri temsil ediyor. Sektörlere özel endeksler de mevcut.\n\nBurada bilinmesi gereken bir ayrıntı var: endekste her şirketin ağırlığı aynı değil. Şirketler piyasa değerlerine göre ağırlıklandırılır. Yani çok büyük bir şirketin küçük bir hareketi, küçük bir şirketin büyük hareketinden daha etkili olabilir. Endeks yüz şirketin düz ortalaması değil, büyüklerin sesinin daha çok çıktığı bir ortalamadır.\n\nNe işe yarar? Üç şey. Kendi sonucunu piyasayla kıyaslarsın. Piyasanın genel yönünü tek bakışta görürsün. Ve bazı fonlar bir endeksi taklit edecek şekilde kurulur.\n\nİki de sınırını unutma. Birincisi: endeks yükseldiğinde her pay yükselmiş olmaz. Senin hissen düşerken endeks artabilir; bu bir çelişki değil, ortalamanın doğası. İkincisi: endekse girmek \"iyi yatırım\" demek değildir. Endeks bir alışveriş listesi değil, bir ölçüm çerçevesidir.\n\nSekizinci adımı da mühürledin. Bir sonraki derste bu fiyatları oluşturan insanlara bakacağız: piyasadaki oyuncular kimler?"
}
$moono$::jsonb
where lesson_id = 55 and order_index = 19;

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
      "question": "Endeks en doğru şekilde nasıl tanımlanır?",
      "options": [
        {
          "id": "a",
          "text": "Borsada en çok kazandıran payların resmi listesi"
        },
        {
          "id": "b",
          "text": "Bir grup payın topluca hareketini gösteren sayı"
        },
        {
          "id": "c",
          "text": "Şirketlerin büyüklüğüne göre yapılan resmi sıralama"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "\"Borsa bugün yüzde 2 yükseldi\" cümlesi neyi anlatır?",
      "options": [
        {
          "id": "a",
          "text": "Takip edilen endeksin yüzde 2 arttığını"
        },
        {
          "id": "b",
          "text": "Her hissenin yüzde 2 değer kazandığını"
        },
        {
          "id": "c",
          "text": "Şirketlerin kârlarının yüzde 2 arttığını"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "BIST 30 ile BIST 100 arasındaki ilişki nedir?",
      "options": [
        {
          "id": "a",
          "text": "İkisi tamamen farklı şirket gruplarını kapsar"
        },
        {
          "id": "b",
          "text": "BIST 30, BIST 100'den daha geniş kapsamlıdır"
        },
        {
          "id": "c",
          "text": "BIST 30 payları BIST 100 içinde yer alır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q4",
      "question": "Endekste büyük şirketlerin etkisi neden fazladır?",
      "options": [
        {
          "id": "a",
          "text": "Ağırlıklar piyasa değerine göre belirlendiği için"
        },
        {
          "id": "b",
          "text": "Büyük şirketler daha çok kâr açıkladığı için"
        },
        {
          "id": "c",
          "text": "Endekste her şirkete eşit ağırlık verildiği için"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "Endeks yükseldi ama senin hissen düştü. Bu mümkün mü?",
      "options": [
        {
          "id": "a",
          "text": "Hayır, endeks tüm hisseleri aynı yönde hareket ettirir"
        },
        {
          "id": "b",
          "text": "Evet, endeks ortalamadır ve paylar farklı hareket eder"
        },
        {
          "id": "c",
          "text": "Hayır, bu ancak sistem hatası durumunda görülür"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q6",
      "question": "Endeksler yatırımcı için hangi amaçla kullanılır?",
      "options": [
        {
          "id": "a",
          "text": "Hangi hissenin alınacağını belirlemek için"
        },
        {
          "id": "b",
          "text": "Şirketlerin kâr payı takvimini öğrenmek için"
        },
        {
          "id": "c",
          "text": "Kendi sonucunu piyasayla karşılaştırmak için"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q7",
      "question": "Sektör endeksleri ne işe yarar?",
      "options": [
        {
          "id": "a",
          "text": "Belirli bir sektörün gidişatını izlemeye"
        },
        {
          "id": "b",
          "text": "O sektördeki en kârlı şirketi seçmeye"
        },
        {
          "id": "c",
          "text": "Sektördeki şirketlerin vergisini hesaplamaya"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "Endeksin kendisi doğrudan satın alınabilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Evet, borsada doğrudan endeksin kendisi alınır"
        },
        {
          "id": "b",
          "text": "Doğrudan alınmaz; endeksi izleyen fonlar vardır"
        },
        {
          "id": "c",
          "text": "Hayır, endeksler hiçbir biçimde yatırıma konu olmaz"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q9",
      "question": "Bir şirketin endekse girmesi ne anlama gelir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin kârının artacağının garanti edilmesi"
        },
        {
          "id": "b",
          "text": "Şirketin devlet güvencesi altına alınmış olması"
        },
        {
          "id": "c",
          "text": "Şirketin endeks ölçütlerini karşılamış olması"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q10",
      "question": "Endeksle ilgili en doğru ifade hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Piyasanın genel yönünü özetleyen bir göstergedir"
        },
        {
          "id": "b",
          "text": "Alınması gereken hisseleri gösteren bir listedir"
        },
        {
          "id": "c",
          "text": "Şirketlerin gerçek değerini ölçen bir hesaptır"
        }
      ],
      "correct_option_id": "a"
    }
  ]
}
$moono$::jsonb
where lesson_id = 55 and order_index = 20;
