-- S1D1 (lesson_id: 27) - 17 step structure
-- Flow:
-- 1-3 read, 4 flashcard, 5 sentence-completion
-- 6-8 read, 9 flashcard, 10 sentence-completion
-- 11-13 read, 14 flashcard, 15 sentence-completion
-- 16 audio summary, 17 final quiz

-- Block 1
update lesson_steps
set type = 'read',
    title = 'Ortak, Borsaya Hoş Geldin',
    content = null,
    metadata = $${
      "text": "Ortak, borsa denince gözünü korkutan ekranlar normal. Ama işin özü aslında basit: burası şirketlerle yatırımcıların buluştuğu düzenli bir pazar.\n\nMarkette domates satılır, burada şirket ortaklığı satılır.\n\nBu derste hızlı kazanç peşinde koşmayı değil, borsanın gerçek mantığını kuracağız."
    }$$::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set type = 'read',
    title = 'Pazar Mantığı',
    content = null,
    metadata = $${
      "text": "Fiyat, alıcı ile satıcının anlaştığı noktada oluşur. Talep güçlüyse fiyat yukarı, satış baskısı güçlüyse aşağı yönlü hareket eder.\n\nAma tek bir fiyat hareketiyle kesin hüküm verilmez.\n\nFiyat bir sinyaldir; yorumlamak için bağlam gerekir."
    }$$::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set type = 'read',
    title = 'Ortaklık Nedir?',
    content = null,
    metadata = $${
      "text": "Bir hisse aldığında sadece bir kod almıyorsun; şirketin küçük de olsa ortağı oluyorsun.\n\nŞirket büyür, kârlılığını artırır ve iyi yönetilirse bu durum pay değerine zamanla yansıyabilir.\n\nBu yüzden iyi yatırımcı önce şirketi, sonra fiyatı okur."
    }$$::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 1',
    content = null,
    metadata = $${
      "front_text": "Hisse Senedi",
      "back_text": "Bir şirketin ortaklık payını temsil eden menkul kıymettir."
    }$$::jsonb
where lesson_id = 27 and order_index = 4;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 1',
    content = null,
    metadata = $${
      "question": "Cümleyi tamamla: Borsada yatırımcı, hisse alarak şirkete ____ olur.",
      "options": [
        { "id": "a", "text": "müşteri" },
        { "id": "b", "text": "ortak" },
        { "id": "c", "text": "alacaklı" },
        { "id": "d", "text": "personel" }
      ],
      "correct_option_id": "b"
    }$$::jsonb
where lesson_id = 27 and order_index = 5;

-- Block 2
update lesson_steps
set type = 'read',
    title = 'Borsa Neden Var?',
    content = null,
    metadata = $${
      "text": "Şirketler büyümek için sermaye arar; yatırımcı ise birikimini değer üreten alanlara taşımak ister.\n\nBorsa bu iki ihtiyacı aynı zeminde buluşturur.\n\nBu yüzden borsa sadece bireysel kazanç alanı değil, ekonominin de canlı bir parçasıdır."
    }$$::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set type = 'read',
    title = 'Yanlış İnanç: Borsa Şans mı?',
    content = null,
    metadata = $${
      "text": "Plansız işlem yapan biri için borsa yorucu ve riskli hale gelir; bu doğru.\n\nAma bu durum, borsanın şans oyunu olduğu anlamına gelmez.\n\nAnaliz, risk yönetimi ve disiplinli plan, sonucu ciddi şekilde etkiler."
    }$$::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set type = 'read',
    title = 'İlk Takip Listesi',
    content = null,
    metadata = $${
      "text": "Başlangıçta her şeyi aynı anda öğrenmeye çalışma.\n\nŞirketin ne iş yaptığı, temel finansal durumu, işlem hacmi ve genel trend ilk aşamada yeterlidir.\n\nAz ama anlamlı göstergeyle başlamak, gereksiz gürültüyü azaltır."
    }$$::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set type = 'flashcard',
    title = 'Kelime Kartı 2',
    content = null,
    metadata = $${
      "front_text": "Arz - Talep",
      "back_text": "Fiyat hareketinin temel mekanizmasıdır; talep arttıkça fiyatın yükselme eğilimi güçlenir."
    }$$::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set type = 'quiz',
    title = 'Cümle Tamamlama 2',
    content = null,
    metadata = $${
      "question": "Cümleyi tamamla: Talep, satış baskısından güçlü olduğunda fiyat genelde ____ yönlü olur.",
      "options": [
        { "id": "a", "text": "aşağı" },
        { "id": "b", "text": "yatay" },
        { "id": "c", "text": "yukarı" },
        { "id": "d", "text": "rastgele" }
      ],
      "correct_option_id": "c"
    }$$::jsonb
where lesson_id = 27 and order_index = 10;

-- Block 3
update lesson_steps
set type = 'read',
    title = 'Senaryo: Yatırım Haberi',
    content = null,
    metadata = $${
      "text": "Bir şirket yeni yatırım açıklıyor ve fiyat gün içinde sert yükseliyor.\n\nBu hareket, beklentinin güçlendiğini gösterebilir; ama tek başına yeterli değildir.\n\nAsıl soru: Bu yatırım şirketin uzun vadeli performansına ne katacak?"
    }$$::jsonb
where lesson_id = 27 and order_index = 11;

update lesson_steps
set type = 'read',
    title = 'Hızlı Karar Riski',
    content = null,
    metadata = $${
      "text": "Fiyat hareketini görünce hemen işlem açmak, yeni başlayanların en sık düştüğü hatalardan biridir.\n\nPanik veya FOMO ile verilen kararlar çoğu zaman plansız olur.\n\nÖnce neden hareket ettiğini anlamak, sonra karar vermek daha sağlıklı sonuç üretir."
    }$$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set type = 'read',
    title = 'Dersin Ana Çıktısı',
    content = null,
    metadata = $${
      "text": "Bu dersin özeti net: Borsa, şans oyunu değil; analiz ve disiplinle yönetilen bir karar ortamı.\n\nFiyat tek başına hikâye değildir, sadece bir parçasıdır.\n\nOrtaklık mantığını kurduğunda sonraki dersler çok daha anlamlı gelecek."
    }$$::jsonb
where lesson_id = 27 and order_index = 13;

-- Reuse existing audio + final rows by moving to 16/17 first
update lesson_steps
set order_index = 16,
    type = 'audio',
    title = 'Moono Sesli Özet',
    metadata = $${
      "text": "Ortak, bu dersin ana fikrini 2 dakikada topladım. Dinledikten sonra testte daha net olacaksın.",
      "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3"
    }$$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set order_index = 17,
    type = 'final_quiz',
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
            { "id": "c", "text": "Şirketin yönetimini devralmak" }
          ],
          "correct_option_id": "b"
        },
        {
          "id": "q2",
          "question": "Fiyatın yükselme eğiliminde olması en çok neyi gösterebilir?",
          "options": [
            { "id": "a", "text": "Talebin görece güçlü olduğunu" },
            { "id": "b", "text": "Hissenin risksiz olduğunu" },
            { "id": "c", "text": "Fiyatın hep yükseleceğini" }
          ],
          "correct_option_id": "a"
        },
        {
          "id": "q3",
          "question": "Zayıf yatırım yaklaşımı hangisidir?",
          "options": [
            { "id": "a", "text": "Şirketi ve sektörünü incelemek" },
            { "id": "b", "text": "Risk planı yapmak" },
            { "id": "c", "text": "Sadece anlık harekete göre karar vermek" }
          ],
          "correct_option_id": "c"
        },
        {
          "id": "q4",
          "question": "Borsanın ekonomi için temel rolü nedir?",
          "options": [
            { "id": "a", "text": "Tasarrufları üretime yönlendirmek" },
            { "id": "b", "text": "Fiyatı sabitlemek" },
            { "id": "c", "text": "Riski tamamen kaldırmak" }
          ],
          "correct_option_id": "a"
        },
        {
          "id": "q5",
          "question": "\"Borsa şans\" algısını en çok ne azaltır?",
          "options": [
            { "id": "a", "text": "Anlık dedikodu takibi" },
            { "id": "b", "text": "Analiz ve disiplinli plan" },
            { "id": "c", "text": "Sürekli işlem açmak" }
          ],
          "correct_option_id": "b"
        },
        {
          "id": "q6",
          "question": "Yatırım haberi sonrası en sağlıklı ilk adım nedir?",
          "options": [
            { "id": "a", "text": "Anında alım yapmak" },
            { "id": "b", "text": "Etkiyi uzun vadeli değerlendirmek" },
            { "id": "c", "text": "Haberi yok saymak" }
          ],
          "correct_option_id": "b"
        },
        {
          "id": "q7",
          "question": "Yeni başlayan biri için doğru başlangıç yaklaşımı hangisidir?",
          "options": [
            { "id": "a", "text": "Az ama anlamlı metrikle düzenli takip" },
            { "id": "b", "text": "Tüm göstergeleri aynı anda öğrenmek" },
            { "id": "c", "text": "Sadece sosyal medya yorumları" }
          ],
          "correct_option_id": "a"
        },
        {
          "id": "q8",
          "question": "Arz-talep ilişkisi için doğru ifade hangisidir?",
          "options": [
            { "id": "a", "text": "Fiyatı etkilemez" },
            { "id": "b", "text": "Talep güçlenirse fiyat yükselme eğilimi gösterebilir" },
            { "id": "c", "text": "Sadece resmi açıklama belirler" }
          ],
          "correct_option_id": "b"
        },
        {
          "id": "q9",
          "question": "Dengeli yatırım bakışı hangi ifadedir?",
          "options": [
            { "id": "a", "text": "Fiyat her zaman değeri tam yansıtır" },
            { "id": "b", "text": "Kısa vade dalgalanır, değer zamanla netleşir" },
            { "id": "c", "text": "Fiyat tamamen anlamsızdır" }
          ],
          "correct_option_id": "b"
        },
        {
          "id": "q10",
          "question": "Dersin ana mesajı hangisidir?",
          "options": [
            { "id": "a", "text": "Borsa, analiz ve disiplinle öğrenilebilen bir ortaklık piyasasıdır" },
            { "id": "b", "text": "Borsa yalnızca şansla çalışır" },
            { "id": "c", "text": "Borsa yalnızca uzmanlar içindir" }
          ],
          "correct_option_id": "a"
        }
      ]
    }$$::jsonb
where lesson_id = 27 and order_index = 13;

-- New step 14: 3rd flashcard
insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
values (
  27,
  'flashcard',
  'Kelime Kartı 3',
  null,
  14,
  $${
    "front_text": "Risk Yönetimi",
    "back_text": "Kayıp ihtimalini baştan sınırlamak için planlı pozisyon ve disiplin kullanmaktır."
  }$$::jsonb
)
on conflict do nothing;

-- New step 15: 3rd sentence-completion
insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
values (
  27,
  'quiz',
  'Cümle Tamamlama 3',
  null,
  15,
  $${
    "question": "Cümleyi tamamla: Sağlıklı yatırım kararında önce ____ sonra fiyat hareketi yorumlanır.",
    "options": [
      { "id": "a", "text": "söylenti" },
      { "id": "b", "text": "şans" },
      { "id": "c", "text": "şirketin temeli" },
      { "id": "d", "text": "anlık korku" }
    ],
    "correct_option_id": "c"
  }$$::jsonb
)
on conflict do nothing;
