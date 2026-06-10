-- S1D1 (lesson_id: 27) final 20-step learning flow
-- Structure:
-- 3 blocks x (3 read + 1 flashcard + 1 practice quiz + 1 sentence-completion)
-- + 1 audio summary + 1 final quiz
--
-- Total: 20 steps

delete from lesson_steps
where lesson_id = 27;

insert into lesson_steps (lesson_id, type, title, content, order_index, metadata) values
-- BLOCK 1
(27, 'read', 'Ortak, Borsaya Hoş Geldin', null, 1, $$
{
  "text": "Ortak, borsa denince gözünü korkutan ekranlar normal. Ama işin özü aslında çok basit: burası şirketlerle yatırımcıların buluştuğu düzenli bir pazar.\n\nMarkette domates satılır, burada şirket ortaklığı satılır.\n\nBu derste hızlı kazanç peşinde koşmayı değil, borsanın mantığını sağlam kurmayı hedefleyeceğiz."
}
$$::jsonb),
(27, 'read', 'Pazar Nasıl Çalışır?', null, 2, $$
{
  "text": "Fiyat, alıcı ve satıcının anlaştığı noktada oluşur. Talep yükselirse fiyat yukarı, satış baskısı artarsa aşağı yönlü hareket etme eğilimindedir.\n\nAma tek bir fiyat hareketiyle karar verilmez.\n\nFiyat bir sinyaldir; karar için bağlam gerekir."
}
$$::jsonb),
(27, 'read', 'Hisse Alınca Ne Alırsın?', null, 3, $$
{
  "text": "Bir hisse aldığında sadece bir kod almıyorsun; şirketin küçük de olsa ortağı oluyorsun.\n\nŞirket büyür, kârlılığı artar ve iyi yönetilirse bunun etkisi zamanla pay değerine yansıyabilir.\n\nYani yatırımcı, önce şirketi okur sonra fiyatı yorumlar."
}
$$::jsonb),
(27, 'flashcard', 'Kelime Kartı 1', null, 4, $$
{
  "front_text": "Hisse Senedi",
  "back_text": "Bir şirketin ortaklık payını temsil eden menkul kıymettir."
}
$$::jsonb),
(27, 'quiz', 'Alıştırma 1', null, 5, $$
{
  "question": "Aşağıdakilerden hangisi borsayı en doğru açıklar?",
  "options": [
    { "id": "a", "text": "Şirket ve yatırımcının düzenli piyasada buluşması" },
    { "id": "b", "text": "Sadece kısa vadeli fiyat oyunu" },
    { "id": "c", "text": "Fiyatların merkezden sabit belirlenmesi" }
  ],
  "correct_option_id": "a"
}
$$::jsonb),
(27, 'quiz', 'Cümle Tamamlama 1', null, 6, $$
{
  "question": "Cümleyi tamamla: Borsada hisse alan kişi şirkete ____ olur.",
  "options": [
    { "id": "a", "text": "müşteri" },
    { "id": "b", "text": "ortak" },
    { "id": "c", "text": "personel" },
    { "id": "d", "text": "alacaklı" }
  ],
  "correct_option_id": "b"
}
$$::jsonb),

-- BLOCK 2
(27, 'read', 'Borsa Neden Önemli?', null, 7, $$
{
  "text": "Şirketler büyümek için sermaye arar; yatırımcı ise birikimini değer üreten alanlara taşımak ister.\n\nBorsa bu iki ihtiyacı aynı zeminde buluşturur.\n\nBu yüzden sadece bireysel kazanç alanı değil, ekonominin de canlı bir parçasıdır."
}
$$::jsonb),
(27, 'read', 'Şans Mı, Süreç Mi?', null, 8, $$
{
  "text": "Plansız işlem yapan biri için borsa yorucu olabilir; bu doğru.\n\nAma bu, borsanın şans oyunu olduğu anlamına gelmez.\n\nAnaliz, risk yönetimi ve disiplinli plan karar kalitesini belirgin şekilde artırır."
}
$$::jsonb),
(27, 'read', 'İlk Takip Çerçeven', null, 9, $$
{
  "text": "Başlangıçta her şeyi aynı anda öğrenmeye çalışma.\n\nŞirketin ne iş yaptığı, temel finansal görünümü, işlem hacmi ve genel trend ilk aşamada yeterli çerçeve sunar.\n\nAz ama anlamlı gösterge, daha sağlıklı başlangıç sağlar."
}
$$::jsonb),
(27, 'flashcard', 'Kelime Kartı 2', null, 10, $$
{
  "front_text": "Arz - Talep",
  "back_text": "Fiyat hareketinin temel mekanizmasıdır; talep güçlendikçe fiyatın yükselme eğilimi artar."
}
$$::jsonb),
(27, 'quiz', 'Alıştırma 2', null, 11, $$
{
  "question": "Bir yatırımcı “borsa tamamen şans” algısını en çok neyle kırar?",
  "options": [
    { "id": "a", "text": "Sadece sosyal medya yorumlarıyla" },
    { "id": "b", "text": "Analiz, plan ve risk yönetimiyle" },
    { "id": "c", "text": "Sürekli işlem açıp kapatarak" }
  ],
  "correct_option_id": "b"
}
$$::jsonb),
(27, 'quiz', 'Cümle Tamamlama 2', null, 12, $$
{
  "question": "Cümleyi tamamla: Talep, satış baskısından güçlü olduğunda fiyat genelde ____ yönlü olur.",
  "options": [
    { "id": "a", "text": "aşağı" },
    { "id": "b", "text": "yatay" },
    { "id": "c", "text": "yukarı" },
    { "id": "d", "text": "belirsiz" }
  ],
  "correct_option_id": "c"
}
$$::jsonb),

-- BLOCK 3
(27, 'read', 'Senaryo: Yatırım Haberi', null, 13, $$
{
  "text": "Bir şirket yeni yatırım açıkladı ve fiyat gün içinde hızlı yükseldi.\n\nBu hareket beklentinin güçlendiğini gösterebilir ama tek başına yeterli değildir.\n\nAsıl soru: Bu yatırım, şirketin uzun vadeli performansına ne katkı sağlayacak?"
}
$$::jsonb),
(27, 'read', 'Hızlı Karar Tuzağı', null, 14, $$
{
  "text": "Fiyat hareketini görünce hemen işlem açmak, yeni başlayanların sık düştüğü bir hatadır.\n\nKaçırma korkusuyla verilen kararlar çoğu zaman plansız olur.\n\nÖnce neden hareket ettiğini anlamak, sonra karar vermek daha sağlıklı sonuç üretir."
}
$$::jsonb),
(27, 'read', 'Ana Çıktı', null, 15, $$
{
  "text": "Bu dersin özeti net: Borsa şans oyunu değil, analiz ve disiplinle yönetilen bir karar ortamıdır.\n\nFiyat, hikâyenin tamamı değil sadece bir parçasıdır.\n\nOrtaklık mantığını kurduğunda sonraki dersler daha kolay ilerler."
}
$$::jsonb),
(27, 'flashcard', 'Kelime Kartı 3', null, 16, $$
{
  "front_text": "Risk Yönetimi",
  "back_text": "Kayıp ihtimalini baştan sınırlamak için planlı pozisyon ve disiplin kullanmaktır."
}
$$::jsonb),
(27, 'quiz', 'Alıştırma 3', null, 17, $$
{
  "question": "Yatırım haberi sonrası en sağlıklı ilk adım hangisidir?",
  "options": [
    { "id": "a", "text": "Anında alım yapmak" },
    { "id": "b", "text": "Haberi uzun vadeli etkiyle birlikte değerlendirmek" },
    { "id": "c", "text": "Haberi tamamen yok saymak" }
  ],
  "correct_option_id": "b"
}
$$::jsonb),
(27, 'quiz', 'Cümle Tamamlama 3', null, 18, $$
{
  "question": "Cümleyi tamamla: Sağlıklı yatırım kararında önce ____ sonra fiyat hareketi yorumlanır.",
  "options": [
    { "id": "a", "text": "söylenti" },
    { "id": "b", "text": "şans" },
    { "id": "c", "text": "şirketin temeli" },
    { "id": "d", "text": "anlık korku" }
  ],
  "correct_option_id": "c"
}
$$::jsonb),

-- BLOCK 4
(27, 'audio', 'Moono Sesli Özet', null, 19, $$
{
  "text": "Ortak, bu dersin ana fikrini 2 dakikada toparladım. Dinledikten sonra testte daha net olacaksın.",
  "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3"
}
$$::jsonb),
(27, 'final_quiz', 'Final Testi', null, 20, $$
{
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
}
$$::jsonb);
