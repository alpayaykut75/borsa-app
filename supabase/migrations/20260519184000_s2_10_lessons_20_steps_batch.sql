-- Level 2 (Unit 2) - 10 lessons in one batch
-- Converts lessons to 20-step format:
-- 3x (3 read + 1 flashcard + 1 practice + 1 sentence completion) + audio + final quiz

do $$
declare
  rec record;
  generic_audio_url text := 'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3';
begin
  for rec in
    select *
    from (values
      (6,  'Hesap Nasıl Açılır?',      'yatırım hesabı açılış süreci'),
      (7,  'Emir Tipleri',             'alım-satım emir türleri'),
      (8,  'Lot ve Küsuratlar',        'lot mantığı ve adet hesaplama'),
      (9,  'Seans Saatleri',           'işlem saatleri ve seans akışı'),
      (10, 'Piyasa Ekranını Okumak',   'fiyat ekranı okuma becerisi'),
      (33, 'T+2 Kuralı',               'takas süreci ve T+2 mantığı'),
      (34, 'Halka Arz (IPO)',          'halka arz süreci ve katılım'),
      (35, 'Temettü Nedir?',           'temettü ve nakit akışı yaklaşımı'),
      (36, 'Portföy Nedir?',           'portföy kurgusu ve dağılım dengesi'),
      (37, 'İlk Emri Vermek',          'ilk işlem adımı ve kontrol listesi')
    ) as t(lesson_id, lesson_title, focus)
  loop
    delete from lesson_steps where lesson_id = rec.lesson_id;

    -- 1
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', rec.lesson_title || ' - Başlangıç',
      null, 1,
      jsonb_build_object(
        'text',
        'Ortak, bu derste odak konumuz: ' || rec.focus || '. ' ||
        E'\n\nÖnce temel mantığı sade şekilde kuracağız.' ||
        E'\n\nSonra küçük alıştırmalarla pekiştireceğiz.'
      )
    );

    -- 2
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Temel Mantık',
      null, 2,
      jsonb_build_object(
        'text',
        'Bu konuda en kritik fark, teoriyi uygulamayla birleştirmektir.' ||
        E'\n\nTanımları bilmek yetmez; adım adım karar akışını da bilmek gerekir.' ||
        E'\n\nBu yüzden her bölümde pratik bir kontrol noktası göreceksin.'
      )
    );

    -- 3
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Neden Önemli?',
      null, 3,
      jsonb_build_object(
        'text',
        'Bu başlığı doğru anlamak, sonraki derslerde hata oranını düşürür.' ||
        E'\n\nYanlış yorumlar genelde temel adım atlandığında oluşur.' ||
        E'\n\nOrtak, amaç hızlı geçmek değil sağlam ilerlemek.'
      )
    );

    -- 4 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 1',
      null, 4,
      jsonb_build_object(
        'front_text', rec.lesson_title,
        'back_text', rec.focus || ' konusunda ilk kavramsal çerçeveyi veren ana başlıktır.'
      )
    );

    -- 5 practice
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Alıştırma 1',
      null, 5,
      jsonb_build_object(
        'question', 'Bu derste doğru yaklaşım hangisidir?',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','Adımları planlı ve sırayla uygulamak'),
          jsonb_build_object('id','b','text','Sadece hızlıca işlem yapmak'),
          jsonb_build_object('id','c','text','Sadece yorumlara göre karar vermek')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 6 sentence completion
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Cümle Tamamlama 1',
      null, 6,
      jsonb_build_object(
        'question', 'Cümleyi tamamla: Sağlıklı ilerlemek için önce ____ sonra işlem gelir.',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','plan'),
          jsonb_build_object('id','b','text','acele'),
          jsonb_build_object('id','c','text','şans'),
          jsonb_build_object('id','d','text','rastgelelik')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 7
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Adım Adım Uygulama',
      null, 7,
      jsonb_build_object(
        'text',
        'Bu bölümde odak, doğru sırayla ilerlemektir.' ||
        E'\n\nYanlış sırada verilen kararlar gereksiz hata doğurabilir.' ||
        E'\n\nSistemli adımlar, süreci sadeleştirir.'
      )
    );

    -- 8
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Sık Hata Noktası',
      null, 8,
      jsonb_build_object(
        'text',
        'Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık hareket eder.' ||
        E'\n\nÇözüm: küçük kontrol listesi + net sıra.' ||
        E'\n\nOrtak, kurgu varsa hata azalır.'
      )
    );

    -- 9
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Pratik Bakış',
      null, 9,
      jsonb_build_object(
        'text',
        'Bilgiyi kısa pratiklerle test etmek kalıcılığı artırır.' ||
        E'\n\nTekrar eden küçük alıştırmalar büyük fark yaratır.' ||
        E'\n\nBu yüzden şimdi bir mini kontrol daha yapacağız.'
      )
    );

    -- 10 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 2',
      null, 10,
      jsonb_build_object(
        'front_text', 'Kontrol Listesi',
        'back_text', 'Karardan önce kısa doğrulama adımlarıdır; hata payını düşürür.'
      )
    );

    -- 11 practice
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Alıştırma 2',
      null, 11,
      jsonb_build_object(
        'question', 'Aşağıdakilerden hangisi daha sağlıklı uygulamadır?',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','Önce bağlamı okuyup sonra karar vermek'),
          jsonb_build_object('id','b','text','Sadece anlık hareketle işlem açmak'),
          jsonb_build_object('id','c','text','Kuralsız ilerlemek')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 12 sentence completion
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Cümle Tamamlama 2',
      null, 12,
      jsonb_build_object(
        'question', 'Cümleyi tamamla: Doğru yorum için önce ____ sonra karar gerekir.',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','bağlam'),
          jsonb_build_object('id','b','text','panik'),
          jsonb_build_object('id','c','text','tahmin'),
          jsonb_build_object('id','d','text','söylenti')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 13
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Senaryo',
      null, 13,
      jsonb_build_object(
        'text',
        'Kısa bir senaryo düşün: karar vermen gereken bir an geldi.' ||
        E'\n\nBu noktada hızdan önce doğrulama gerekir.' ||
        E'\n\nDoğru çerçeveyle ilerlemek sonuç kalitesini yükseltir.'
      )
    );

    -- 14
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Karar Disiplini',
      null, 14,
      jsonb_build_object(
        'text',
        'Karar disiplini, zor anlarda sistemi korumaktır.' ||
        E'\n\nSüreç bozulursa küçük hata büyük zarara dönebilir.' ||
        E'\n\nDisiplin, performansın omurgasıdır.'
      )
    );

    -- 15
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Ders Özeti',
      null, 15,
      jsonb_build_object(
        'text',
        'Bu derste ' || rec.focus || ' konusunu adım adım kurduk.' ||
        E'\n\nTemel kural: plan + bağlam + disiplin.' ||
        E'\n\nOrtak, bu üçlü varsa ilerleme hızlanır.'
      )
    );

    -- 16 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 3',
      null, 16,
      jsonb_build_object(
        'front_text', 'Süreç Disiplini',
        'back_text', 'Kararları anlık duygu yerine önceden tanımlı kurallarla yürütmektir.'
      )
    );

    -- 17 practice
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Alıştırma 3',
      null, 17,
      jsonb_build_object(
        'question', 'Senaryoda en doğru ilk adım hangisidir?',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','Kontrol listesine dönmek'),
          jsonb_build_object('id','b','text','Aceleyle karar vermek'),
          jsonb_build_object('id','c','text','Sadece başkalarını kopyalamak')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 18 sentence completion
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Cümle Tamamlama 3',
      null, 18,
      jsonb_build_object(
        'question', 'Cümleyi tamamla: Sağlam ilerleme için kritik üçlü ____ + bağlam + disiplindir.',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','plan'),
          jsonb_build_object('id','b','text','acele'),
          jsonb_build_object('id','c','text','şans'),
          jsonb_build_object('id','d','text','kopya')
        ),
        'correct_option_id', 'a'
      )
    );

    -- 19 audio
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'audio', 'Moono Sesli Özet',
      null, 19,
      jsonb_build_object(
        'text', 'Ortak, ' || rec.lesson_title || ' dersinin kısa özetini dinleyelim.',
        'audio_url', generic_audio_url
      )
    );

    -- 20 final quiz
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'final_quiz', 'Final Testi',
      null, 20,
      jsonb_build_object(
        'pass_threshold', 4,
        'questions', jsonb_build_array(
          jsonb_build_object(
            'id', 'q1',
            'question', rec.lesson_title || ' konusunda en doğru yaklaşım hangisidir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Planlı ve adım adım ilerlemek'),
              jsonb_build_object('id','b','text','Acele ve kuralsız karar vermek'),
              jsonb_build_object('id','c','text','Sadece söylentiye göre işlem yapmak')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q2',
            'question', 'Doğru karar sırası için en uygun ifade hangisidir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Bağlam -> plan -> karar'),
              jsonb_build_object('id','b','text','Panik -> hız -> karar'),
              jsonb_build_object('id','c','text','Söylenti -> kopya -> karar')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q3',
            'question', rec.focus || ' başlığında hata riskini en çok ne azaltır?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Kontrol listesi kullanmak'),
              jsonb_build_object('id','b','text','Rastgele hareket etmek'),
              jsonb_build_object('id','c','text','Sadece tek veriye bakmak')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q4',
            'question', 'Bu derste tekrar eden ana tema nedir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Disiplinli süreç yönetimi'),
              jsonb_build_object('id','b','text','Hızlı sonuç arayışı'),
              jsonb_build_object('id','c','text','Şansa bırakma')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q5',
            'question', 'Aşağıdakilerden hangisi sürdürülebilir yatırım davranışına uygundur?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Planla ilerlemek'),
              jsonb_build_object('id','b','text','Duyguyla karar vermek'),
              jsonb_build_object('id','c','text','Sürekli acele etmek')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q6',
            'question', 'Dersin ana çıktısı için en doğru ifade hangisi?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Önce anlayıp sonra uygulamak'),
              jsonb_build_object('id','b','text','Önce işlem açıp sonra bakmak'),
              jsonb_build_object('id','c','text','Sadece kalabalığı takip etmek')
            ),
            'correct_option_id', 'a'
          )
        )
      )
    );
  end loop;
end
$$;
