-- Seviye 1 (Çaylak) — Ara Değerlendirme 1+2 + Seviye Geçiş Sınavı
-- Hedefli UPDATE / UPSERT. Ders sayacına dahil değildir.

update lessons
set description = 'Ders 1–4 kazanımlarını ölçen 20 soruluk ara sınav. Geçme eşiği: 14/20.'
where id = 70;

update lessons
set description = 'Ders 5–7 kazanımlarını ölçen 20 soruluk ara sınav. Geçme eşiği: 14/20.'
where id = 71;

update lesson_steps
set type = 'final_quiz',
    title = 'Ara Değerlendirme 1',
    content = null,
    metadata = $moono$
{
  "pass_threshold": 14,
  "questions": [
    {
      "id": "q1",
      "question": "Bir şirketin değeri 5.000.000 TL ve eşit 10.000 paya bölünmüş. 200 pay alan kişi ne kadar ödemiş ve şirketin ne kadarına sahip olmuştur?",
      "options": [
        {
          "id": "a",
          "text": "50.000 TL ödemiş, yüzde 4'üne sahip"
        },
        {
          "id": "b",
          "text": "100.000 TL ödemiş, yüzde 2'sine sahip"
        },
        {
          "id": "c",
          "text": "200.000 TL ödemiş, yüzde 5'ine sahip"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "Sınırlı sorumluluk bir pay sahibini neye karşı korur?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin borçlarının kişisel varlıklarına yansımasına"
        },
        {
          "id": "b",
          "text": "Payının değerinin düşmesine karşı tamamen"
        },
        {
          "id": "c",
          "text": "Şirketin kâr payı dağıtmama kararına karşı"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q3",
      "question": "Bir pay sahibinin sahip olmadığı hak hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin günlük kararlarına doğrudan karışmak"
        },
        {
          "id": "b",
          "text": "Payını dilediği zaman başka birine satmak"
        },
        {
          "id": "c",
          "text": "Genel kurulda payı oranında oy kullanmak"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "Şirket rekor kâr açıkladı. Tahvil sahibi ile pay sahibi bundan nasıl etkilenir?",
      "options": [
        {
          "id": "a",
          "text": "Tahvil sahibi aynı tutarı alır, payın değeri artabilir"
        },
        {
          "id": "b",
          "text": "İkisi de kâr oranında hesaplanan ek ödemeyi alır"
        },
        {
          "id": "c",
          "text": "Tahvil sahibi kârdan pay alır, pay sahibi almaz"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "Bir şirket kapandı ve elinde sınırlı varlık kaldı. Ödeme sırası nasıldır?",
      "options": [
        {
          "id": "a",
          "text": "Önce pay sahipleri, sonra tahvil sahipleri"
        },
        {
          "id": "b",
          "text": "Önce alacaklılar, en sonda pay sahipleri"
        },
        {
          "id": "c",
          "text": "Herkese payı oranında eşit dağıtım yapılır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q6",
      "question": "\"Tahvil aldım, param garantide\" diyen biri için ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru, tahvilin anaparası her koşulda güvencededir"
        },
        {
          "id": "b",
          "text": "Doğru, çünkü tahvilin vadesi baştan bellidir"
        },
        {
          "id": "c",
          "text": "Sırada önde olmak riski azaltır, sıfırlamaz"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q7",
      "question": "Bir yatırımcı sabit ve önceden bilinen bir getiri istiyorsa hangi konumu tercih eder?",
      "options": [
        {
          "id": "a",
          "text": "Alacaklı konumunu, yani tahvil tarafını"
        },
        {
          "id": "b",
          "text": "Ortak konumunu, yani pay tarafını"
        },
        {
          "id": "c",
          "text": "İkisi de aynı getiriyi sunmaktadır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q8",
      "question": "Halka arzda toplanan paranın şirkete girip girmediği nereden öğrenilir?",
      "options": [
        {
          "id": "a",
          "text": "Borsanın günlük yayımladığı fiyat listesinden"
        },
        {
          "id": "b",
          "text": "Şirketin halka arz öncesi yayımladığı izahnameden"
        },
        {
          "id": "c",
          "text": "Aracı kurumun gönderdiği işlem dekontundan"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q9",
      "question": "Bir kurucu ortak halka arzda kendi paylarını sattı. Sonuç nedir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket yeni bir sermaye toplamış olur"
        },
        {
          "id": "b",
          "text": "Şirketin mevcut borçları azalmış olur"
        },
        {
          "id": "c",
          "text": "Para şirkete değil, kurucu ortağa gider"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q10",
      "question": "SPK'nın izahnameyi onaylaması ne demektir?",
      "options": [
        {
          "id": "a",
          "text": "Bilgilerin usulüne uygun sunulduğu incelenmiştir"
        },
        {
          "id": "b",
          "text": "Halka arz fiyatının uygun olduğu belirlenmiştir"
        },
        {
          "id": "c",
          "text": "Şirketin ilerde kâr edeceği resmen doğrulanmıştır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q11",
      "question": "Halka açılan bir şirketin kabul ettiği yükümlülük hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Her yıl mutlaka kâr payı dağıtmak"
        },
        {
          "id": "b",
          "text": "Finansal bilgilerini düzenli aralıklarla açıklamak"
        },
        {
          "id": "c",
          "text": "Pay fiyatını belirli bir seviyede tutmak"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q12",
      "question": "Borsanın yatırımcıya sağladığı en temel imkân nedir?",
      "options": [
        {
          "id": "a",
          "text": "Payını istediğinde nakde çevirebilme imkânı"
        },
        {
          "id": "b",
          "text": "Payının değerinin artacağı güvencesi"
        },
        {
          "id": "c",
          "text": "Şirket kararlarına doğrudan katılma hakkı"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q13",
      "question": "Likidite bir yatırımcı için neden önemlidir?",
      "options": [
        {
          "id": "a",
          "text": "Getirinin yüksek olacağını garanti ettiği için"
        },
        {
          "id": "b",
          "text": "Şirketin dağıttığı kâr payını artırdığı için"
        },
        {
          "id": "c",
          "text": "Çıkış kapısının açık olduğunu gösterdiği için"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q14",
      "question": "Panik dönemlerinde borsa ne yapar?",
      "options": [
        {
          "id": "a",
          "text": "Bütün işlemleri durdurup fiyatı sabit tutar"
        },
        {
          "id": "b",
          "text": "İşlemin düzenli yürümesini sağlar, düşüşü engellemez"
        },
        {
          "id": "c",
          "text": "Alıcı bularak fiyatın düşmesini tamamen önler"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q15",
      "question": "Borsa olmasa bir pay sahibi ne yaşardı?",
      "options": [
        {
          "id": "a",
          "text": "Alıcı bulmakta ve fiyat belirlemekte zorlanırdı"
        },
        {
          "id": "b",
          "text": "Şirkete ortak olma hakkını tamamen kaybederdi"
        },
        {
          "id": "c",
          "text": "Kâr payı alma hakkını tamamen kaybederdi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q16",
      "question": "Halka arz ile ortaklık kavramı arasındaki bağ nedir?",
      "options": [
        {
          "id": "a",
          "text": "Halka arz şirkete borç verme yöntemidir"
        },
        {
          "id": "b",
          "text": "Halka arz ortaklığı sona erdiren işlemdir"
        },
        {
          "id": "c",
          "text": "Halka arz ortaklığın çok kişiye açılmasıdır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q17",
      "question": "Bir şirket ortak almak istemiyor ama paraya ihtiyacı var. Ne yapabilir?",
      "options": [
        {
          "id": "a",
          "text": "Halka arza çıkıp yeni pay satabilir"
        },
        {
          "id": "b",
          "text": "Tahvil çıkarıp yatırımcılardan borç alabilir"
        },
        {
          "id": "c",
          "text": "Mevcut ortaklarının paylarını satışa çıkarabilir"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q18",
      "question": "Borsada gördüğün fiyatın şeffaf olması ne demektir?",
      "options": [
        {
          "id": "a",
          "text": "Aynı fiyat aynı anda herkese görünür"
        },
        {
          "id": "b",
          "text": "Fiyat gün boyunca hiç değişmeden kalır"
        },
        {
          "id": "c",
          "text": "Fiyatı şirketin yönetim kurulu açıklar"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q19",
      "question": "Aşağıdaki sıralamalardan hangisi doğrudur?",
      "options": [
        {
          "id": "a",
          "text": "Borsa kurulur, sonra şirket paylara bölünür"
        },
        {
          "id": "b",
          "text": "Şirket halka açılır, sonra paylara bölünür"
        },
        {
          "id": "c",
          "text": "Şirket paylara bölünür, halka açılır, borsaya girer"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q20",
      "question": "Halka arz ile borsadaki alım satım arasındaki temel fark nedir?",
      "options": [
        {
          "id": "a",
          "text": "Halka arzda komisyon ödenmez, borsada ödenir"
        },
        {
          "id": "b",
          "text": "Halka arzda paylar ilk kez satışa çıkar"
        },
        {
          "id": "c",
          "text": "Halka arzda fiyat değişken, borsada sabittir"
        }
      ],
      "correct_option_id": "b"
    }
  ]
}
$moono$::jsonb
where lesson_id = 70 and order_index = 1;

update lesson_steps
set type = 'final_quiz',
    title = 'Ara Değerlendirme 2',
    content = null,
    metadata = $moono$
{
  "pass_threshold": 14,
  "questions": [
    {
      "id": "q1",
      "question": "Borsa İstanbul bugünkü yapısına nasıl ulaştı?",
      "options": [
        {
          "id": "a",
          "text": "1985 yılında sıfırdan kurularak"
        },
        {
          "id": "b",
          "text": "Bir yabancı borsayla ortaklık kurularak"
        },
        {
          "id": "c",
          "text": "2013'te üç ayrı kurumun birleştirilmesiyle"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q2",
      "question": "Şirket paylarının işlem gördüğü bölüm hangisidir?",
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
    },
    {
      "id": "q3",
      "question": "Bir payın hangi pazarda olduğunu bilmek neden işe yarar?",
      "options": [
        {
          "id": "a",
          "text": "İşlem koşulları ve likidite hakkında bilgi verir"
        },
        {
          "id": "b",
          "text": "Şirketin dağıtacağı temettü oranını gösterir"
        },
        {
          "id": "c",
          "text": "Şirketin ödeyeceği vergi oranını belirler"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "Yakın İzleme Pazarı hangi şirketler için kullanılır?",
      "options": [
        {
          "id": "a",
          "text": "Yeni halka açılan ve henüz oturmamış şirketler"
        },
        {
          "id": "b",
          "text": "Piyasa değeri en yüksek olan büyük şirketler"
        },
        {
          "id": "c",
          "text": "Finansal yapısında bozulma görülen riskli şirketler"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q5",
      "question": "THYAO ifadesi neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Şirketin borsadaki beş harfli kodunu"
        },
        {
          "id": "b",
          "text": "Şirketin bulunduğu pazarın adını"
        },
        {
          "id": "c",
          "text": "Şirketin dahil olduğu endeksin adını"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q6",
      "question": "Bir şirketin Yıldız Pazar'da olması neyi göstermez?",
      "options": [
        {
          "id": "a",
          "text": "Piyasa değerinin görece yüksek olduğunu"
        },
        {
          "id": "b",
          "text": "Payının yatırımcıya mutlaka kazandıracağını"
        },
        {
          "id": "c",
          "text": "İşlem hacminin genelde geniş olduğunu"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q7",
      "question": "Borsadan bir hisse aldığında paran kime gider?",
      "options": [
        {
          "id": "a",
          "text": "Doğrudan payı çıkaran şirkete"
        },
        {
          "id": "b",
          "text": "Borsa ile aracı kurum arasında paylaşılır"
        },
        {
          "id": "c",
          "text": "O payı sana satan yatırımcıya"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "Halka arzda alınan bir pay hangi piyasada el değiştirmiştir?",
      "options": [
        {
          "id": "a",
          "text": "Birincil piyasada, çünkü ilk kez satılıyor"
        },
        {
          "id": "b",
          "text": "İkincil piyasada, çünkü borsa üzerinden alınıyor"
        },
        {
          "id": "c",
          "text": "Her ikisinde de aynı anda gerçekleşmiştir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "Şirket ikincil piyasadan para almadığı halde fiyatı neden takip eder?",
      "options": [
        {
          "id": "a",
          "text": "Yapılan her işlemden şirkete komisyon geldiği için"
        },
        {
          "id": "b",
          "text": "İleride sermaye toplarken bu fiyat kullanılacağı için"
        },
        {
          "id": "c",
          "text": "Fiyat düşünce borsadan çıkarılma riski olduğu için"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "İkincil piyasa olmasaydı birincil piyasaya ne olurdu?",
      "options": [
        {
          "id": "a",
          "text": "Şirketler daha yüksek fiyattan pay satardı"
        },
        {
          "id": "b",
          "text": "Halka arz fiyatları resmi olarak belirlenirdi"
        },
        {
          "id": "c",
          "text": "Çıkışı olmadığı için katılım büyük ölçüde azalırdı"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q11",
      "question": "\"Bu hisseyi alarak şirkete destek oluyorum\" cümlesi neden yanlıştır?",
      "options": [
        {
          "id": "a",
          "text": "Para şirkete değil, satan yatırımcıya gider"
        },
        {
          "id": "b",
          "text": "Şirket bu işlemden dolayı vergi ödemek zorundadır"
        },
        {
          "id": "c",
          "text": "Borsada yapılan işlemler şirkete zarar verir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q12",
      "question": "Bir şirket sermaye artırımıyla yeni pay sattı. Bu hangi piyasadır?",
      "options": [
        {
          "id": "a",
          "text": "İkincil piyasa, çünkü şirket zaten borsadadır"
        },
        {
          "id": "b",
          "text": "Birincil piyasa, çünkü paylar ilk kez satılıyor"
        },
        {
          "id": "c",
          "text": "Hiçbiri, çünkü işlem borsa dışında yapılır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q13",
      "question": "Ekranda gördüğün fiyat neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "En son gerçekleşen işlemin fiyatını"
        },
        {
          "id": "b",
          "text": "Şirketin açıkladığı resmi değerini"
        },
        {
          "id": "c",
          "text": "Gün sonunda oluşacak kapanış fiyatını"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q14",
      "question": "Bir payın fiyatı 6 TL ve şirketin toplam 20 milyon payı var. Piyasa değeri nedir?",
      "options": [
        {
          "id": "a",
          "text": "20 milyon TL"
        },
        {
          "id": "b",
          "text": "60 milyon TL"
        },
        {
          "id": "c",
          "text": "120 milyon TL"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q15",
      "question": "Fiyat ile değer arasındaki ilişki nasıl açıklanır?",
      "options": [
        {
          "id": "a",
          "text": "İkisi her zaman birbirine eşittir"
        },
        {
          "id": "b",
          "text": "Fiyat gözlemlenir, değer ise hesaplanır"
        },
        {
          "id": "c",
          "text": "Değer sabittir, fiyat asla değişmez"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q16",
      "question": "Az işlem gören bir payda fiyat neden sert hareket eder?",
      "options": [
        {
          "id": "a",
          "text": "Karşı tarafta yeterli sayıda emir bulunmadığı için"
        },
        {
          "id": "b",
          "text": "Borsa bu paylarda farklı kural uyguladığı için"
        },
        {
          "id": "c",
          "text": "Şirket bu paylarda fiyatı kendisi belirlediği için"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q17",
      "question": "4 TL'lik bir pay, 400 TL'lik bir paydan daha mı ucuzdur?",
      "options": [
        {
          "id": "a",
          "text": "Evet, fiyatı düşük olduğundan daha ucuzdur"
        },
        {
          "id": "b",
          "text": "Evet, çünkü daha küçük bir şirkete aittir"
        },
        {
          "id": "c",
          "text": "Fiyat tek başına ucuzluk göstergesi değildir"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q18",
      "question": "Likiditesi düşük bir payda büyük bir emir verilirse ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Fiyat hiç değişmeden işlem hemen tamamlanır"
        },
        {
          "id": "b",
          "text": "Fiyat beklenenden çok daha sert hareket eder"
        },
        {
          "id": "c",
          "text": "Borsa bu emri otomatik olarak iptal eder"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q19",
      "question": "Halka arz fiyatı sonrasında borsada ne olur?",
      "options": [
        {
          "id": "a",
          "text": "Fiyat serbestçe değişir, o seviye korunmaz"
        },
        {
          "id": "b",
          "text": "Fiyat en az bir yıl sabit tutulur"
        },
        {
          "id": "c",
          "text": "Fiyat halka arz fiyatının altına inemez"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q20",
      "question": "Bir hisseye ilk kez bakan biri hangi üç bilgiyi kolayca öğrenebilir?",
      "options": [
        {
          "id": "a",
          "text": "Kârı, temettüsü ve gelecek yıl hedefi"
        },
        {
          "id": "b",
          "text": "Yöneticileri, çalışan sayısı ve stratejisi"
        },
        {
          "id": "c",
          "text": "Kodu, pazarı ve son işlem fiyatı"
        }
      ],
      "correct_option_id": "c"
    }
  ]
}
$moono$::jsonb
where lesson_id = 71 and order_index = 1;

-- Seviye geçiş sınavı (S1)
update level_exams
set title = 'Seviye Geçiş Sınavı',
    intro_text = $moono$Çaylak seviyesinin 10 dersini tamamladın ortak. Bu sınav, öğrendiklerini farklı senaryolarla ölçer. 30 soruda en az 21 doğru ile Çırak seviyesine geçersin. Yatırım tavsiyesi değil; kavramları sağlamlaştırma anı.$moono$,
    is_active = true,
    metadata = $moono$
{
  "pass_threshold": 21,
  "questions": [
    {
      "id": "q1",
      "question": "Pay sahibi olmak neyi ifade eder?",
      "options": [
        {
          "id": "a",
          "text": "Şirkete belirli vadeyle borç vermeyi"
        },
        {
          "id": "b",
          "text": "Şirketin mülkiyetinden bir dilime sahip olmayı"
        },
        {
          "id": "c",
          "text": "Şirketin ürünlerinden indirim hakkı almayı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "Şirket 10 milyon TL borç bırakarak kapandı. Paylarına 3.000 TL ödeyen kişi ne kaybeder?",
      "options": [
        {
          "id": "a",
          "text": "Payı oranında hesaplanan borç tutarını"
        },
        {
          "id": "b",
          "text": "Hem 3.000 TL'yi hem de ek borç yükünü"
        },
        {
          "id": "c",
          "text": "En fazla ödediği 3.000 TL'yi"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q3",
      "question": "Ortaklığın borçtan en temel farkı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklıkta geri ödeme sözü bulunmaz"
        },
        {
          "id": "b",
          "text": "Ortaklıkta vade sonunda faiz ödenir"
        },
        {
          "id": "c",
          "text": "Ortaklıkta tutar yasayla sınırlandırılır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "Şirket zarar ettiğinde tahvil sahibi ile pay sahibi nasıl etkilenir?",
      "options": [
        {
          "id": "a",
          "text": "Tahvil sahibi alacağını ister, payın değeri düşer"
        },
        {
          "id": "b",
          "text": "İkisi de zararı elindeki oranda paylaşmış olur"
        },
        {
          "id": "c",
          "text": "Tahvil sahibi zarardan pay sahibinden çok etkilenir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "Tahvil sahibi şirketin genel kurulunda oy kullanabilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Evet, tahvil tutarı oranında oy kullanır"
        },
        {
          "id": "b",
          "text": "Evet, ancak pay sahiplerinin yarısı kadar"
        },
        {
          "id": "c",
          "text": "Hayır, çünkü o ortak değil alacaklıdır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q6",
      "question": "Getirisinin üst sınırı olmayan araç hangisidir?",
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
      "id": "q7",
      "question": "Bir şirket halka açılırken ne kabul etmiş olur?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklarına düzenli kâr payı ödemeyi"
        },
        {
          "id": "b",
          "text": "Pay fiyatını belirli seviyede tutmayı"
        },
        {
          "id": "c",
          "text": "Şeffaflık ve denetim yükümlülüğünü"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "İzahname hangi soruyu cevaplar?",
      "options": [
        {
          "id": "a",
          "text": "Toplanan paranın nereye harcanacağını"
        },
        {
          "id": "b",
          "text": "Payın bir yıl sonraki fiyatını"
        },
        {
          "id": "c",
          "text": "Endekse ne zaman girileceğini"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "Halka açıklık oranı yüzde 30 olan bir şirket için ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Kârının yüzde 30'unu temettü dağıtır"
        },
        {
          "id": "b",
          "text": "Paylarının yüzde 30'u halkın elindedir"
        },
        {
          "id": "c",
          "text": "Borçlarının yüzde 30'u ödenmiş durumdadır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "Borsanın sağladığı likidite ne demektir?",
      "options": [
        {
          "id": "a",
          "text": "Payı makul fiyatla nakde çevirebilme kolaylığı"
        },
        {
          "id": "b",
          "text": "Payın değerinin sürekli artması eğilimi"
        },
        {
          "id": "c",
          "text": "Şirketin elindeki nakit rezervinin yüksek olması"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q11",
      "question": "Borsa hangi konuda güvence verir?",
      "options": [
        {
          "id": "a",
          "text": "Alınan payın değerinin artacağı konusunda"
        },
        {
          "id": "b",
          "text": "Fiyatın belirli seviyede kalacağı konusunda"
        },
        {
          "id": "c",
          "text": "İşlemin kurallara göre tamamlanacağı konusunda"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q12",
      "question": "Fiyatı borsa mı belirler?",
      "options": [
        {
          "id": "a",
          "text": "Evet, her sabah resmi liste yayımlar"
        },
        {
          "id": "b",
          "text": "Hayır, alıcı ve satıcı emirleri belirler"
        },
        {
          "id": "c",
          "text": "Hayır, fiyatı şirketin yönetimi açıklar"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q13",
      "question": "Borsa İstanbul'da aşağıdakilerden hangisi işlem görmez?",
      "options": [
        {
          "id": "a",
          "text": "Şirket payları ve şirket tahvilleri"
        },
        {
          "id": "b",
          "text": "Konut ve arsa gibi taşınmazlar"
        },
        {
          "id": "c",
          "text": "Türev ürünler ve kıymetli madenler"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q14",
      "question": "Bir hissenin BIST kodu ne işe yarar?",
      "options": [
        {
          "id": "a",
          "text": "Şirketi borsada tekil olarak tanımlar"
        },
        {
          "id": "b",
          "text": "Şirketin işlem gördüğü pazarı gösterir"
        },
        {
          "id": "c",
          "text": "Şirketin güncel piyasa değerini belirtir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q15",
      "question": "Pazarlar hangi amaçla ayrılmıştır?",
      "options": [
        {
          "id": "a",
          "text": "Şirketleri sektörlerine göre gruplandırmak için"
        },
        {
          "id": "b",
          "text": "Yabancı yatırımcıları ayrı grupta tutmak için"
        },
        {
          "id": "c",
          "text": "Farklı büyüklüğe farklı kural uygulamak için"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q16",
      "question": "Birincil ve ikincil piyasayı ayıran şey nedir?",
      "options": [
        {
          "id": "a",
          "text": "Ödenen paranın kime gittiği"
        },
        {
          "id": "b",
          "text": "İşlemin hangi saatte yapıldığı"
        },
        {
          "id": "c",
          "text": "Kullanılan aracı kurumun büyüklüğü"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q17",
      "question": "Deniz halka arzdan 20 TL'ye aldığı payı borsada 26 TL'ye sattı. Şirket bundan ne kazandı?",
      "options": [
        {
          "id": "a",
          "text": "Aradaki 6 TL fark şirkete kâr olarak yazıldı"
        },
        {
          "id": "b",
          "text": "Hiçbir şey; şirket yalnızca ilk 20 TL'yi aldı"
        },
        {
          "id": "c",
          "text": "26 TL'nin tamamı doğrudan şirketin kasasına girdi"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q18",
      "question": "Şirketin kendi paylarını borsadan geri alması ne sonuç doğurur?",
      "options": [
        {
          "id": "a",
          "text": "Şirkete doğrudan yeni sermaye girişi sağlanır"
        },
        {
          "id": "b",
          "text": "Şirketin toplam borcu otomatik olarak azalır"
        },
        {
          "id": "c",
          "text": "Dolaşımdaki pay sayısı azalmış olur"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q19",
      "question": "Fiyatın değişmesinin temel sebebi nedir?",
      "options": [
        {
          "id": "a",
          "text": "Alıcı ve satıcıların beklentilerinin değişmesi"
        },
        {
          "id": "b",
          "text": "Borsanın fiyatı gün içinde güncellemesi"
        },
        {
          "id": "c",
          "text": "Şirketin sürekli yeni pay ihraç etmesi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q20",
      "question": "Bir haber duyurulduktan saatler sonra öğrenen yatırımcı için ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Haber henüz fiyata yansımamış olur"
        },
        {
          "id": "b",
          "text": "Haber büyük olasılıkla fiyata yansımıştır"
        },
        {
          "id": "c",
          "text": "Haber ancak ertesi gün fiyatı etkiler"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q21",
      "question": "Piyasa değeri nasıl hesaplanır?",
      "options": [
        {
          "id": "a",
          "text": "Yıllık net kâr ile pay sayısı çarpılarak"
        },
        {
          "id": "b",
          "text": "Pay fiyatı ile yıllık net kâr çarpılarak"
        },
        {
          "id": "c",
          "text": "Pay fiyatı ile toplam pay sayısı çarpılarak"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q22",
      "question": "BIST 100 neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Borsadaki en kârlı şirketlerin listesini"
        },
        {
          "id": "b",
          "text": "Yüz şirketin ödediği toplam temettüyü"
        },
        {
          "id": "c",
          "text": "Seçilmiş yüz payın topluca hareketini"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q23",
      "question": "Endekste büyük şirketlerin etkisi neden daha fazladır?",
      "options": [
        {
          "id": "a",
          "text": "Ağırlıklandırma piyasa değerine göre yapılır"
        },
        {
          "id": "b",
          "text": "Büyük şirketler daha çok kâr açıklar"
        },
        {
          "id": "c",
          "text": "Endekste her şirkete eşit ağırlık verilir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q24",
      "question": "Endeks yükselirken senin hissen düşebilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Hayır, endeks tüm payları aynı yönde taşır"
        },
        {
          "id": "b",
          "text": "Evet, çünkü endeks yalnızca ortalamayı gösterir"
        },
        {
          "id": "c",
          "text": "Hayır, bu ancak bir sistem hatasıyla olur"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q25",
      "question": "Kurumsal yatırımcının bireysel yatırımcıdan farkı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Başkasının parasını yönetir ve hesap verir"
        },
        {
          "id": "b",
          "text": "Şirket bilgilerine herkesten daha erken erişir"
        },
        {
          "id": "c",
          "text": "İşlemlerinde komisyon ödemek zorunda değildir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q26",
      "question": "Bir yöneticinin açıklanmamış bilgiyle işlem yapması nedir?",
      "options": [
        {
          "id": "a",
          "text": "Yöneticiye tanınan yasal bir avantajdır"
        },
        {
          "id": "b",
          "text": "Bildirime bağlı olarak serbest bir işlemdir"
        },
        {
          "id": "c",
          "text": "Yasak sayılan içeriden öğrenenlerin ticareti"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q27",
      "question": "Aynı hisseyi biri alırken diğerinin satması neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Taraflardan birinin mutlaka yanıldığını"
        },
        {
          "id": "b",
          "text": "Beklenti ve zaman ufuklarının farklı olduğunu"
        },
        {
          "id": "c",
          "text": "Fiyatın o anda hatalı hesaplanmış olduğunu"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q28",
      "question": "\"Risksiz yüksek getiri\" neden mümkün değildir?",
      "options": [
        {
          "id": "a",
          "text": "Herkes yönelir, fiyat artar, getiri düşer"
        },
        {
          "id": "b",
          "text": "Devlet bu tür ürünlerin tamamını yasaklamıştır"
        },
        {
          "id": "c",
          "text": "Böyle ürünler yalnızca kurumsallara açıktır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q29",
      "question": "Riski en düşükten en yükseğe sıralama hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket payı, mevduat, kaldıraçlı türev"
        },
        {
          "id": "b",
          "text": "Kaldıraçlı türev, mevduat, şirket payı"
        },
        {
          "id": "c",
          "text": "Mevduat, şirket payı, kaldıraçlı türev"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q30",
      "question": "Çaylak seviyesinin özeti hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru hisseyi seçen yatırımcı hiç kaybetmez"
        },
        {
          "id": "b",
          "text": "Getiri beklentisi her zaman belirsizlikle artar"
        },
        {
          "id": "c",
          "text": "Borsa uzun vadede herkese kazandıran yerdir"
        }
      ],
      "correct_option_id": "b"
    }
  ]
}
$moono$::jsonb
where level_code = 'S1';

insert into level_exams (level_code, title, intro_text, is_active, metadata)
select 'S1',
       'Seviye Geçiş Sınavı',
       $moono$Çaylak seviyesinin 10 dersini tamamladın ortak. Bu sınav, öğrendiklerini farklı senaryolarla ölçer. 30 soruda en az 21 doğru ile Çırak seviyesine geçersin. Yatırım tavsiyesi değil; kavramları sağlamlaştırma anı.$moono$,
       true,
       $moono$
{
  "pass_threshold": 21,
  "questions": [
    {
      "id": "q1",
      "question": "Pay sahibi olmak neyi ifade eder?",
      "options": [
        {
          "id": "a",
          "text": "Şirkete belirli vadeyle borç vermeyi"
        },
        {
          "id": "b",
          "text": "Şirketin mülkiyetinden bir dilime sahip olmayı"
        },
        {
          "id": "c",
          "text": "Şirketin ürünlerinden indirim hakkı almayı"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q2",
      "question": "Şirket 10 milyon TL borç bırakarak kapandı. Paylarına 3.000 TL ödeyen kişi ne kaybeder?",
      "options": [
        {
          "id": "a",
          "text": "Payı oranında hesaplanan borç tutarını"
        },
        {
          "id": "b",
          "text": "Hem 3.000 TL'yi hem de ek borç yükünü"
        },
        {
          "id": "c",
          "text": "En fazla ödediği 3.000 TL'yi"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q3",
      "question": "Ortaklığın borçtan en temel farkı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklıkta geri ödeme sözü bulunmaz"
        },
        {
          "id": "b",
          "text": "Ortaklıkta vade sonunda faiz ödenir"
        },
        {
          "id": "c",
          "text": "Ortaklıkta tutar yasayla sınırlandırılır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q4",
      "question": "Şirket zarar ettiğinde tahvil sahibi ile pay sahibi nasıl etkilenir?",
      "options": [
        {
          "id": "a",
          "text": "Tahvil sahibi alacağını ister, payın değeri düşer"
        },
        {
          "id": "b",
          "text": "İkisi de zararı elindeki oranda paylaşmış olur"
        },
        {
          "id": "c",
          "text": "Tahvil sahibi zarardan pay sahibinden çok etkilenir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q5",
      "question": "Tahvil sahibi şirketin genel kurulunda oy kullanabilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Evet, tahvil tutarı oranında oy kullanır"
        },
        {
          "id": "b",
          "text": "Evet, ancak pay sahiplerinin yarısı kadar"
        },
        {
          "id": "c",
          "text": "Hayır, çünkü o ortak değil alacaklıdır"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q6",
      "question": "Getirisinin üst sınırı olmayan araç hangisidir?",
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
      "id": "q7",
      "question": "Bir şirket halka açılırken ne kabul etmiş olur?",
      "options": [
        {
          "id": "a",
          "text": "Ortaklarına düzenli kâr payı ödemeyi"
        },
        {
          "id": "b",
          "text": "Pay fiyatını belirli seviyede tutmayı"
        },
        {
          "id": "c",
          "text": "Şeffaflık ve denetim yükümlülüğünü"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q8",
      "question": "İzahname hangi soruyu cevaplar?",
      "options": [
        {
          "id": "a",
          "text": "Toplanan paranın nereye harcanacağını"
        },
        {
          "id": "b",
          "text": "Payın bir yıl sonraki fiyatını"
        },
        {
          "id": "c",
          "text": "Endekse ne zaman girileceğini"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q9",
      "question": "Halka açıklık oranı yüzde 30 olan bir şirket için ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Kârının yüzde 30'unu temettü dağıtır"
        },
        {
          "id": "b",
          "text": "Paylarının yüzde 30'u halkın elindedir"
        },
        {
          "id": "c",
          "text": "Borçlarının yüzde 30'u ödenmiş durumdadır"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q10",
      "question": "Borsanın sağladığı likidite ne demektir?",
      "options": [
        {
          "id": "a",
          "text": "Payı makul fiyatla nakde çevirebilme kolaylığı"
        },
        {
          "id": "b",
          "text": "Payın değerinin sürekli artması eğilimi"
        },
        {
          "id": "c",
          "text": "Şirketin elindeki nakit rezervinin yüksek olması"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q11",
      "question": "Borsa hangi konuda güvence verir?",
      "options": [
        {
          "id": "a",
          "text": "Alınan payın değerinin artacağı konusunda"
        },
        {
          "id": "b",
          "text": "Fiyatın belirli seviyede kalacağı konusunda"
        },
        {
          "id": "c",
          "text": "İşlemin kurallara göre tamamlanacağı konusunda"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q12",
      "question": "Fiyatı borsa mı belirler?",
      "options": [
        {
          "id": "a",
          "text": "Evet, her sabah resmi liste yayımlar"
        },
        {
          "id": "b",
          "text": "Hayır, alıcı ve satıcı emirleri belirler"
        },
        {
          "id": "c",
          "text": "Hayır, fiyatı şirketin yönetimi açıklar"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q13",
      "question": "Borsa İstanbul'da aşağıdakilerden hangisi işlem görmez?",
      "options": [
        {
          "id": "a",
          "text": "Şirket payları ve şirket tahvilleri"
        },
        {
          "id": "b",
          "text": "Konut ve arsa gibi taşınmazlar"
        },
        {
          "id": "c",
          "text": "Türev ürünler ve kıymetli madenler"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q14",
      "question": "Bir hissenin BIST kodu ne işe yarar?",
      "options": [
        {
          "id": "a",
          "text": "Şirketi borsada tekil olarak tanımlar"
        },
        {
          "id": "b",
          "text": "Şirketin işlem gördüğü pazarı gösterir"
        },
        {
          "id": "c",
          "text": "Şirketin güncel piyasa değerini belirtir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q15",
      "question": "Pazarlar hangi amaçla ayrılmıştır?",
      "options": [
        {
          "id": "a",
          "text": "Şirketleri sektörlerine göre gruplandırmak için"
        },
        {
          "id": "b",
          "text": "Yabancı yatırımcıları ayrı grupta tutmak için"
        },
        {
          "id": "c",
          "text": "Farklı büyüklüğe farklı kural uygulamak için"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q16",
      "question": "Birincil ve ikincil piyasayı ayıran şey nedir?",
      "options": [
        {
          "id": "a",
          "text": "Ödenen paranın kime gittiği"
        },
        {
          "id": "b",
          "text": "İşlemin hangi saatte yapıldığı"
        },
        {
          "id": "c",
          "text": "Kullanılan aracı kurumun büyüklüğü"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q17",
      "question": "Deniz halka arzdan 20 TL'ye aldığı payı borsada 26 TL'ye sattı. Şirket bundan ne kazandı?",
      "options": [
        {
          "id": "a",
          "text": "Aradaki 6 TL fark şirkete kâr olarak yazıldı"
        },
        {
          "id": "b",
          "text": "Hiçbir şey; şirket yalnızca ilk 20 TL'yi aldı"
        },
        {
          "id": "c",
          "text": "26 TL'nin tamamı doğrudan şirketin kasasına girdi"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q18",
      "question": "Şirketin kendi paylarını borsadan geri alması ne sonuç doğurur?",
      "options": [
        {
          "id": "a",
          "text": "Şirkete doğrudan yeni sermaye girişi sağlanır"
        },
        {
          "id": "b",
          "text": "Şirketin toplam borcu otomatik olarak azalır"
        },
        {
          "id": "c",
          "text": "Dolaşımdaki pay sayısı azalmış olur"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q19",
      "question": "Fiyatın değişmesinin temel sebebi nedir?",
      "options": [
        {
          "id": "a",
          "text": "Alıcı ve satıcıların beklentilerinin değişmesi"
        },
        {
          "id": "b",
          "text": "Borsanın fiyatı gün içinde güncellemesi"
        },
        {
          "id": "c",
          "text": "Şirketin sürekli yeni pay ihraç etmesi"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q20",
      "question": "Bir haber duyurulduktan saatler sonra öğrenen yatırımcı için ne söylenir?",
      "options": [
        {
          "id": "a",
          "text": "Haber henüz fiyata yansımamış olur"
        },
        {
          "id": "b",
          "text": "Haber büyük olasılıkla fiyata yansımıştır"
        },
        {
          "id": "c",
          "text": "Haber ancak ertesi gün fiyatı etkiler"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q21",
      "question": "Piyasa değeri nasıl hesaplanır?",
      "options": [
        {
          "id": "a",
          "text": "Yıllık net kâr ile pay sayısı çarpılarak"
        },
        {
          "id": "b",
          "text": "Pay fiyatı ile yıllık net kâr çarpılarak"
        },
        {
          "id": "c",
          "text": "Pay fiyatı ile toplam pay sayısı çarpılarak"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q22",
      "question": "BIST 100 neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Borsadaki en kârlı şirketlerin listesini"
        },
        {
          "id": "b",
          "text": "Yüz şirketin ödediği toplam temettüyü"
        },
        {
          "id": "c",
          "text": "Seçilmiş yüz payın topluca hareketini"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q23",
      "question": "Endekste büyük şirketlerin etkisi neden daha fazladır?",
      "options": [
        {
          "id": "a",
          "text": "Ağırlıklandırma piyasa değerine göre yapılır"
        },
        {
          "id": "b",
          "text": "Büyük şirketler daha çok kâr açıklar"
        },
        {
          "id": "c",
          "text": "Endekste her şirkete eşit ağırlık verilir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q24",
      "question": "Endeks yükselirken senin hissen düşebilir mi?",
      "options": [
        {
          "id": "a",
          "text": "Hayır, endeks tüm payları aynı yönde taşır"
        },
        {
          "id": "b",
          "text": "Evet, çünkü endeks yalnızca ortalamayı gösterir"
        },
        {
          "id": "c",
          "text": "Hayır, bu ancak bir sistem hatasıyla olur"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q25",
      "question": "Kurumsal yatırımcının bireysel yatırımcıdan farkı nedir?",
      "options": [
        {
          "id": "a",
          "text": "Başkasının parasını yönetir ve hesap verir"
        },
        {
          "id": "b",
          "text": "Şirket bilgilerine herkesten daha erken erişir"
        },
        {
          "id": "c",
          "text": "İşlemlerinde komisyon ödemek zorunda değildir"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q26",
      "question": "Bir yöneticinin açıklanmamış bilgiyle işlem yapması nedir?",
      "options": [
        {
          "id": "a",
          "text": "Yöneticiye tanınan yasal bir avantajdır"
        },
        {
          "id": "b",
          "text": "Bildirime bağlı olarak serbest bir işlemdir"
        },
        {
          "id": "c",
          "text": "Yasak sayılan içeriden öğrenenlerin ticareti"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q27",
      "question": "Aynı hisseyi biri alırken diğerinin satması neyi gösterir?",
      "options": [
        {
          "id": "a",
          "text": "Taraflardan birinin mutlaka yanıldığını"
        },
        {
          "id": "b",
          "text": "Beklenti ve zaman ufuklarının farklı olduğunu"
        },
        {
          "id": "c",
          "text": "Fiyatın o anda hatalı hesaplanmış olduğunu"
        }
      ],
      "correct_option_id": "b"
    },
    {
      "id": "q28",
      "question": "\"Risksiz yüksek getiri\" neden mümkün değildir?",
      "options": [
        {
          "id": "a",
          "text": "Herkes yönelir, fiyat artar, getiri düşer"
        },
        {
          "id": "b",
          "text": "Devlet bu tür ürünlerin tamamını yasaklamıştır"
        },
        {
          "id": "c",
          "text": "Böyle ürünler yalnızca kurumsallara açıktır"
        }
      ],
      "correct_option_id": "a"
    },
    {
      "id": "q29",
      "question": "Riski en düşükten en yükseğe sıralama hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Şirket payı, mevduat, kaldıraçlı türev"
        },
        {
          "id": "b",
          "text": "Kaldıraçlı türev, mevduat, şirket payı"
        },
        {
          "id": "c",
          "text": "Mevduat, şirket payı, kaldıraçlı türev"
        }
      ],
      "correct_option_id": "c"
    },
    {
      "id": "q30",
      "question": "Çaylak seviyesinin özeti hangisidir?",
      "options": [
        {
          "id": "a",
          "text": "Doğru hisseyi seçen yatırımcı hiç kaybetmez"
        },
        {
          "id": "b",
          "text": "Getiri beklentisi her zaman belirsizlikle artar"
        },
        {
          "id": "c",
          "text": "Borsa uzun vadede herkese kazandıran yerdir"
        }
      ],
      "correct_option_id": "b"
    }
  ]
}
$moono$::jsonb
where not exists (
  select 1 from level_exams where level_code = 'S1'
);
