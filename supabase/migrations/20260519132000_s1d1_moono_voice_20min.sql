-- S1D1 (lesson_id: 27) v3
-- Moono voice + richer pacing (~20 min target with audio) + 3 flashcards + scenario-style quiz

update lesson_steps
set type = 'read',
    title = 'Ortak, Borsaya Hoş Geldin',
    metadata = $${
      "text": "Ortak, borsa denince gözünü korkutan ekranlar normal. Ama işin özü aslında çok basit: burası insanların şirketlere ortak olduğu bir pazar.\n\nMarkette domates, patlıcan satılır. Burada ise şirket ortaklığı, yani hisse satılır.\n\nBu derste hızlı para değil, borsanın gerçek mantığını oturtacağız."
    }$$::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Pazar Mantığı Nasıl Çalışır?',
    metadata = $${
      "text": "Fiyat, alıcı ile satıcının anlaştığı noktada oluşur. Talep güçlüyse fiyat yukarıya, satış baskısı güçlüyse aşağıya kayar.\n\nAma tek bir hareketle karar verilmez. Bazen fiyat hızlı koşar, değer sonra gelir; bazen de değer önde olur, fiyat geç tepki verir.\n\nYani fiyat bir sinyal, analiz ise yön pusulasıdır."
    }$$::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Hisse Alınca Tam Olarak Ne Olur?',
    metadata = $${
      "text": "Bir hisse aldığında sadece bir kod almıyorsun; o şirketin küçük de olsa ortağı oluyorsun.\n\nŞirket iyi yönetilir, kârını büyütür ve geleceğini güçlendirirse senin payının değeri de zamanla artabilir.\n\nO yüzden iyi yatırımcı önce şirketi okur, sonra fiyatı yorumlar."
    }$$::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set type = 'quiz',
    title = 'Mini Quiz 1',
    metadata = $${
      "question": "Borsayı en doğru anlatan ifade hangisi?",
      "options": [
        { "id": "a", "text": "Şirket ve yatırımcının denetlenen piyasada buluşması" },
        { "id": "b", "text": "Sadece günlük fiyat tahmini oyunu" },
        { "id": "c", "text": "Fiyatların merkezden tek elde belirlenmesi" }
      ],
      "correct_option_id": "a",
      "explanation": "Doğru. Borsa, düzenli bir ortaklık ve sermaye piyasasıdır."
    }$$::jsonb
where lesson_id = 27 and order_index = 4;

update lesson_steps
set type = 'read',
    title = 'Borsa Neden Önemli?',
    metadata = $${
      "text": "Şirketler büyümek için sermaye arar, yatırımcı da birikimini boş bekletmek istemez. Borsa bu iki ihtiyacı aynı yerde birleştirir.\n\nBu sayede tasarruflar üretime, istihdama ve yeni yatırımlara akar.\n\nKısacası borsa, sadece bireysel kazanç değil, ekonominin çalışma mekanizmasıdır."
    }$$::jsonb
where lesson_id = 27 and order_index = 5;

update lesson_steps
set type = 'read',
    title = 'Yanlış Bilinen: Borsa Şans mı?',
    metadata = $${
      "text": "Ortak, plansız işlem yapan biri için borsa zorlu bir yere dönebilir. Bu kısım doğru.\n\nAma bu, borsanın şans olduğu anlamına gelmez. Analiz, risk yönetimi ve disiplinli planla karar kalitesi ciddi şekilde artar.\n\nYani sonucu şans değil, yaklaşım biçimi belirler."
    }$$::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set type = 'quiz',
    title = 'Mini Quiz 2',
    metadata = $${
      "question": "Aşağıdakilerden hangisi \"borsa oyundur\" algısını en çok azaltır?",
      "options": [
        { "id": "a", "text": "Sadece sosyal medya yorumlarını takip etmek" },
        { "id": "b", "text": "Analiz, risk yönetimi ve disiplinli planla hareket etmek" },
        { "id": "c", "text": "Fiyat hızlı çıkınca her seferinde peşinden koşmak" }
      ],
      "correct_option_id": "b",
      "explanation": "Doğru. Planlı ve analitik yaklaşım, süreci şans olmaktan çıkarır."
    }$$::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    metadata = $${
      "front_text": "Hisse Senedi",
      "back_text": "Bir şirketin ortaklık payını temsil eden varlıktır. Alan kişi, şirketin ekonomik sonucuna ortak olur."
    }$$::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    metadata = $${
      "front_text": "Arz - Talep",
      "back_text": "Fiyatın temel hareket mekanizmasıdır. Talep arttığında fiyat yukarı, arz baskısı arttığında aşağı yöne eğilim olur."
    }$$::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 3',
    metadata = $${
      "front_text": "Risk Yönetimi",
      "back_text": "Tüm parayı tek hisseye bağlamamak, planlı işlem yapmak ve kayıp ihtimalini baştan sınırlamaktır."
    }$$::jsonb
where lesson_id = 27 and order_index = 10;

update lesson_steps
set type = 'quiz',
    title = 'Senaryo Kararı',
    metadata = $${
      "question": "Senaryo: Bir şirket yeni yatırım açıkladı, fiyat bir anda %8 yükseldi. En sağlıklı ilk adım ne olur?",
      "options": [
        { "id": "a", "text": "Kaçırmadan hemen alış yapmak" },
        { "id": "b", "text": "Haberi, şirketin uzun vadeli etkisiyle birlikte değerlendirmek" },
        { "id": "c", "text": "Hareketi tamamen şans sayıp hiç bakmamak" }
      ],
      "correct_option_id": "b",
      "explanation": "Doğru. En sağlıklı adım, haberi uzun vadeli etkiyle birlikte okumaktır."
    }$$::jsonb
where lesson_id = 27 and order_index = 11;

update lesson_steps
set type = 'audio',
    title = 'Moono Sesli Özet',
    metadata = $${
      "text": "Ortak, bu derste anlattığımız çekirdek fikri 2 dakikada toparladım. Dinledikten sonra testte daha net olduğunu göreceksin.",
      "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3"
    }$$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set type = 'final_quiz',
    title = 'Final Testi',
    metadata = $${
      "pass_threshold": 7,
      "questions": [
        {
          "id": "q1",
          "question": "Hisse almak teknik olarak ne anlama gelir?",
          "options": [
            { "id": "a", "text": "Şirketten faizli alacak hakkı almak" },
            { "id": "b", "text": "Şirketin bir payına ortak olmak" },
            { "id": "c", "text": "Şirketin tüm yönetimini devralmak" }
          ],
          "correct_option_id": "b",
          "explanation": "Hisse, ortaklık payını temsil eder."
        },
        {
          "id": "q2",
          "question": "Fiyatın yükselme eğiliminde olması en çok neyi gösterebilir?",
          "options": [
            { "id": "a", "text": "Talebin görece güçlü olduğunu" },
            { "id": "b", "text": "Hissenin risksiz olduğunu" },
            { "id": "c", "text": "Fiyatın hep yükseleceğini" }
          ],
          "correct_option_id": "a",
          "explanation": "Genel olarak talep üstünlüğü fiyatı yukarı iter."
        },
        {
          "id": "q3",
          "question": "Aşağıdakilerden hangisi zayıf yatırım yaklaşımıdır?",
          "options": [
            { "id": "a", "text": "Sadece anlık harekete göre karar vermek" },
            { "id": "b", "text": "Şirketin faaliyetini incelemek" },
            { "id": "c", "text": "Riski baştan sınırlamak" }
          ],
          "correct_option_id": "a",
          "explanation": "Tek başına anlık hareket, sağlıklı karar için yetersizdir."
        },
        {
          "id": "q4",
          "question": "Borsanın ekonomi açısından temel rolü hangisidir?",
          "options": [
            { "id": "a", "text": "Fiyat dalgalanmasını tamamen kaldırmak" },
            { "id": "b", "text": "Şirket kârını sabitlemek" },
            { "id": "c", "text": "Tasarrufları üretime ve sermayeye yönlendirmek" }
          ],
          "correct_option_id": "c",
          "explanation": "Borsa, tasarrufları yatırıma kanalize eder."
        },
        {
          "id": "q5",
          "question": "\"Borsa şans\" algısını azaltan en güçlü faktör hangisi?",
          "options": [
            { "id": "a", "text": "Analiz, plan ve risk yönetimi" },
            { "id": "b", "text": "Anlık dedikodu takibi" },
            { "id": "c", "text": "Hızlı al-sat denemeleri" }
          ],
          "correct_option_id": "a",
          "explanation": "Planlı yaklaşım karar kalitesini artırır."
        },
        {
          "id": "q6",
          "question": "Yatırım haberi sonrası ilk sağlıklı adım nedir?",
          "options": [
            { "id": "a", "text": "Anında alım yapmak" },
            { "id": "b", "text": "Uzun vadeli etkiyi değerlendirmek" },
            { "id": "c", "text": "Haberi tamamen yok saymak" }
          ],
          "correct_option_id": "b",
          "explanation": "Haber etkisi zamanla netleşir, önce etkisi değerlendirilmelidir."
        },
        {
          "id": "q7",
          "question": "Yeni başlayan bir yatırımcı için en iyi ilk yöntem hangisi?",
          "options": [
            { "id": "a", "text": "Tüm göstergeleri aynı anda öğrenmek" },
            { "id": "b", "text": "Sadece yorum kanallarına odaklanmak" },
            { "id": "c", "text": "Az sayıda anlamlı metriği düzenli takip etmek" }
          ],
          "correct_option_id": "c",
          "explanation": "Az ama anlamlı metrikle başlamak daha sağlıklıdır."
        },
        {
          "id": "q8",
          "question": "Arz-talep ilişkisi için doğru ifade hangisidir?",
          "options": [
            { "id": "a", "text": "Talep güçlenirse fiyat yukarı yöne eğilim gösterebilir" },
            { "id": "b", "text": "Arz-talep fiyatı hiç etkilemez" },
            { "id": "c", "text": "Fiyat sadece resmi açıklamayla belirlenir" }
          ],
          "correct_option_id": "a",
          "explanation": "Fiyat oluşumunda arz-talep temel mekanizmadır."
        },
        {
          "id": "q9",
          "question": "Aşağıdaki ifadelerden hangisi daha dengelidir?",
          "options": [
            { "id": "a", "text": "Fiyat her zaman değeri tam yansıtır" },
            { "id": "b", "text": "Kısa vade dalgalanır, değer zamanla netleşir" },
            { "id": "c", "text": "Fiyat hareketleri tamamen anlamsızdır" }
          ],
          "correct_option_id": "b",
          "explanation": "Kısa vadeli fiyatla uzun vadeli değer aynı şey değildir."
        },
        {
          "id": "q10",
          "question": "Bu dersin ana mesajı hangisidir?",
          "options": [
            { "id": "a", "text": "Borsa yalnızca profesyoneller içindir" },
            { "id": "b", "text": "Borsa tamamen şansa dayanır" },
            { "id": "c", "text": "Borsa, analiz ve disiplinle öğrenilebilen bir ortaklık piyasasıdır" }
          ],
          "correct_option_id": "c",
          "explanation": "Temel mesaj: şans değil, bilgi ve disiplin."
        }
      ]
    }$$::jsonb
where lesson_id = 27 and order_index = 13;
