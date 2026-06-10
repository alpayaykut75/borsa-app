-- S1D1 (lesson_id: 27) content v2
-- Goals:
-- 1) Proper Turkish characters
-- 2) Stronger alignment between reading flow and questions
-- 3) More balanced correct option distribution
-- 4) Medium-level (not overly obvious) options

update lesson_steps
set title = 'Hook',
    metadata = $${
      "text": "Borsa, karmaşık bir ekran değil; şirketlerle yatırımcıların buluştuğu düzenli bir pazardır. Burada ürün değil, şirket ortaklığı alınıp satılır. Bu yüzden borsayı sadece fiyat hareketi değil, değer ortaklığı olarak okumak gerekir."
    }$$::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set title = 'Pazar Mantığı',
    metadata = $${
      "text": "Borsada fiyat, alıcı ve satıcının uzlaştığı noktada oluşur. Talep arttığında fiyat yukarı, satış baskısı arttığında aşağı yönlü hareket etme eğilimindedir. Ancak bu hareketler her zaman şirketin gerçek değerini aynı anda yansıtmayabilir."
    }$$::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set title = 'Ortaklık Mantığı',
    metadata = $${
      "text": "Bir hisse aldığında sadece bir kod almazsın; şirketin küçük de olsa ortağı olursun. Şirketin kârlılığı, büyüme potansiyeli ve yönetim kalitesi uzun vadede payının değerini etkiler. Bu yüzden yatırımcı önce şirketi, sonra fiyatı okur."
    }$$::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set title = 'Mini Quiz 1',
    metadata = $${
      "question": "Aşağıdakilerden hangisi borsanın temel yapısını en doğru özetler?",
      "options": [
        { "id": "a", "text": "Şirketlerin ve yatırımcıların denetlenen bir piyasada buluşması" },
        { "id": "b", "text": "Sadece kısa vadeli al-sat işlemleriyle kazanç üretmesi" },
        { "id": "c", "text": "Şirket fiyatlarının tek merkezden belirlenmesi" }
      ],
      "correct_option_id": "a",
      "explanation": "Doğru. Borsa, şirketlerin sermaye bulduğu ve yatırımcıların ortaklık payı aldığı düzenli bir piyasadır."
    }$$::jsonb
where lesson_id = 27 and order_index = 4;

update lesson_steps
set title = 'Borsa Neden Var?',
    metadata = $${
      "text": "Şirketler büyümek için sermayeye ihtiyaç duyar; yatırımcılar ise birikimlerini değer üreten alanlara yönlendirmek ister. Borsa bu iki ihtiyacı aynı zeminde birleştirir. Bu yönüyle yalnızca bireysel kazanç aracı değil, ekonomik büyümenin de önemli bir altyapısıdır."
    }$$::jsonb
where lesson_id = 27 and order_index = 5;

update lesson_steps
set title = 'Yanlış İnanç',
    metadata = $${
      "text": "\"Borsa tamamen şanstır\" düşüncesi eksik bir bakıştır. Plansız ve duygusal işlem risk yaratır; fakat araştırma, risk yönetimi ve disiplinli yaklaşım yatırım kararlarını daha sağlıklı hale getirir. Yani belirleyici olan piyasa değil, yaklaşım biçimidir."
    }$$::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set title = 'Mini Quiz 2',
    metadata = $${
      "question": "Bir yatırımcının \"borsa oyundur\" algısını azaltan en güçlü unsur hangisidir?",
      "options": [
        { "id": "a", "text": "Sürekli işlem yaparak piyasayı yakalamaya çalışmak" },
        { "id": "b", "text": "Sadece fiyat grafiğine bakarak karar vermek" },
        { "id": "c", "text": "Şirket analizi, risk yönetimi ve disiplinli planla hareket etmek" }
      ],
      "correct_option_id": "c",
      "explanation": "Doğru. Bilgiye dayalı analiz ve planlı süreç, borsayı şans değil karar ortamı haline getirir."
    }$$::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set title = 'İlk Bakışta Ne Takip Edilir?',
    metadata = $${
      "text": "Başlangıçta her detayı aynı anda öğrenmeye çalışma. Şirketin ne iş yaptığı, kârlılık eğilimi, işlem hacmi ve genel trend ilk aşamada yeterli bir çerçeve sunar. Az ama anlamlı göstergeyle başlamak, yanlış güven duygusunu azaltır."
    }$$::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set title = 'Kelime Kartı',
    metadata = $${
      "front_text": "Hisse Senedi",
      "back_text": "Bir şirketin ortaklık payını temsil eden menkul kıymettir. Hisse alan kişi, şirketin ekonomik sonucuna sınırlı oranda ortak olur."
    }$$::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set title = 'Örnek Senaryo',
    metadata = $${
      "text": "Bir şirket yeni bir üretim tesisi yatırımı açıkladı. Piyasa bu yatırımın gelecekte gelir artışı sağlayacağını düşünürse talep artabilir ve fiyat yukarı hareket edebilir. Ancak yatırımın etkisi zamanla finansal sonuçlara yansıyacağı için kısa vadeli dalgalanma normaldir."
    }$$::jsonb
where lesson_id = 27 and order_index = 10;

update lesson_steps
set title = 'Mini Quiz 3',
    metadata = $${
      "question": "Yatırım haberi sonrası fiyat hareketini değerlendirirken en sağlıklı yaklaşım hangisidir?",
      "options": [
        { "id": "a", "text": "Sadece fiyat yükseldiyse hemen almak" },
        { "id": "b", "text": "Haberi şirketin uzun vadeli etkisiyle birlikte değerlendirmek" },
        { "id": "c", "text": "Hareketin tamamını şansa bağlamak" }
      ],
      "correct_option_id": "b",
      "explanation": "Doğru. Haber akışını şirketin uzun vadeli etkisiyle birlikte okumak daha sağlıklı karar verir."
    }$$::jsonb
where lesson_id = 27 and order_index = 11;

update lesson_steps
set title = 'Sesli Özet',
    metadata = $${
      "text": "Moono bu derste ana fikri 2 dakikada özetliyor. Dinledikten sonra sorulara geri dönmen, bilgiyi daha kalıcı hale getirir.",
      "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3"
    }$$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set title = 'Final Testi',
    metadata = $${
      "pass_threshold": 7,
      "questions": [
        {
          "id": "q1",
          "question": "Borsa yatırımcısı için \"ortaklık\" ifadesi neyi anlatır?",
          "options": [
            { "id": "a", "text": "Şirkete borç vermeyi" },
            { "id": "b", "text": "Şirketin belirli payına ortak olmayı" },
            { "id": "c", "text": "Şirketin günlük yönetimini devralmayı" }
          ],
          "correct_option_id": "b",
          "explanation": "Hisse senedi, şirketin payına ortaklık hakkı verir."
        },
        {
          "id": "q2",
          "question": "Fiyatın yükselme eğiliminde olması en çok hangi durumu işaret eder?",
          "options": [
            { "id": "a", "text": "Talebin satış baskısına göre daha güçlü olmasını" },
            { "id": "b", "text": "Şirketin kesin olarak risksiz olmasını" },
            { "id": "c", "text": "Hissenin her gün yükseleceğini" }
          ],
          "correct_option_id": "a",
          "explanation": "Genel olarak talep üstünlüğü fiyatı yukarı iter."
        },
        {
          "id": "q3",
          "question": "Aşağıdakilerden hangisi yatırım kararında en zayıf yaklaşımdır?",
          "options": [
            { "id": "a", "text": "Şirketin faaliyetini ve finansal yapısını incelemek" },
            { "id": "b", "text": "Riskleri belirleyip pozisyon boyutunu ayarlamak" },
            { "id": "c", "text": "Sadece anlık fiyat hareketine göre karar vermek" }
          ],
          "correct_option_id": "c",
          "explanation": "Tek başına anlık fiyat hareketi, sağlıklı yatırım kararı için yetersizdir."
        },
        {
          "id": "q4",
          "question": "Borsanın ekonomi için kritik rolü hangi seçenekte daha doğru anlatılır?",
          "options": [
            { "id": "a", "text": "Tasarrufları üretime yönlendirerek şirketlerin sermaye bulmasını sağlar" },
            { "id": "b", "text": "Şirketlerin kârlılığını sabitler" },
            { "id": "c", "text": "Fiyat dalgalanmasını tamamen ortadan kaldırır" }
          ],
          "correct_option_id": "a",
          "explanation": "Borsa, tasarrufların şirket yatırımlarına kanalize olmasını sağlar."
        },
        {
          "id": "q5",
          "question": "Aşağıdakilerden hangisi \"borsa oyundur\" algısını azaltır?",
          "options": [
            { "id": "a", "text": "Her düşüşte panik satış yapmak" },
            { "id": "b", "text": "Analiz, disiplin ve risk planı ile hareket etmek" },
            { "id": "c", "text": "Sadece popüler yorumları takip etmek" }
          ],
          "correct_option_id": "b",
          "explanation": "Planlı ve analitik yaklaşım karar kalitesini artırır."
        },
        {
          "id": "q6",
          "question": "Bir yatırım haberi sonrasında fiyat yükseliyorsa en sağlıklı yorum hangisidir?",
          "options": [
            { "id": "a", "text": "Piyasa haberi olumlu fiyatlamaya başlamış olabilir" },
            { "id": "b", "text": "Hisse artık kesinlikle pahalıdır" },
            { "id": "c", "text": "Haberin şirkete etkisi önemsizdir" }
          ],
          "correct_option_id": "a",
          "explanation": "Pozitif beklenti talebi artırabilir; etkisi zamanla netleşir."
        },
        {
          "id": "q7",
          "question": "Yeni başlayan biri için ilk aşamada hangi yaklaşım daha uygundur?",
          "options": [
            { "id": "a", "text": "Tüm göstergeleri aynı anda öğrenmeye çalışmak" },
            { "id": "b", "text": "Az sayıda anlamlı metrikle düzenli takip başlatmak" },
            { "id": "c", "text": "Sadece sosyal medya sinyallerine odaklanmak" }
          ],
          "correct_option_id": "b",
          "explanation": "Az ama anlamlı göstergeyle başlamak öğrenmeyi hızlandırır."
        },
        {
          "id": "q8",
          "question": "Hisse senedi sahibi olmak aşağıdakilerden hangisine en yakındır?",
          "options": [
            { "id": "a", "text": "Şirketten sabit faizli alacak hakkı" },
            { "id": "b", "text": "Şirketin tüm operasyonunu yönetme yetkisi" },
            { "id": "c", "text": "Şirketin ekonomik performansına ortaklık" }
          ],
          "correct_option_id": "c",
          "explanation": "Hisse sahibi, şirketin değer ve sonuçlarına ortak olur."
        },
        {
          "id": "q9",
          "question": "Aşağıdaki ifadelerden hangisi en dengeli yatırım bakışını yansıtır?",
          "options": [
            { "id": "a", "text": "Fiyat her zaman değeri tam yansıtır" },
            { "id": "b", "text": "Kısa vadeli hareketler olabilir; şirket değeri zamanla netleşir" },
            { "id": "c", "text": "Fiyat hareketleri tamamen anlamsızdır" }
          ],
          "correct_option_id": "b",
          "explanation": "Kısa vadeli dalga ile uzun vadeli değer aynı şey değildir."
        },
        {
          "id": "q10",
          "question": "Bu dersin ana mesajı hangi seçenekte doğru özetlenir?",
          "options": [
            { "id": "a", "text": "Borsa, rastgele tahminlerle hızlı kazanç alanıdır" },
            { "id": "b", "text": "Borsa yalnızca profesyoneller içindir" },
            { "id": "c", "text": "Borsa, disiplinli ve analiz odaklı yaklaşımla öğrenilebilen ortaklık piyasasıdır" }
          ],
          "correct_option_id": "c",
          "explanation": "Dersin özeti: borsa şans oyunu değil, öğrenilebilir bir karar ortamıdır."
        }
      ]
    }$$::jsonb
where lesson_id = 27 and order_index = 13;
