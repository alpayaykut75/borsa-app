-- Batch rollout for Units 3-5 core lessons
-- Scope: only core lessons (exclude "Ara Değerlendirme" lessons)
-- Target format per lesson: 20 steps
-- 3x (3 read + 1 flashcard + 1 practice + 1 sentence completion) + audio + final quiz

do $$
declare
  rec record;
  generic_audio_url text := 'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3';
begin
  for rec in
    select id as lesson_id, title as lesson_title, unit_id
    from lessons
    where unit_id in (3, 4, 5)
      and title not ilike 'Ara Değerlendirme%'
    order by unit_id asc, sort_order asc, id asc
  loop
    delete from lesson_steps where lesson_id = rec.lesson_id;

    -- 1
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', rec.lesson_title || ' - Başlangıç',
      null, 1,
      jsonb_build_object(
        'text',
        'Ortak, bu derste odak konumuz: ' || lower(rec.lesson_title) || '. ' ||
        E'\n\nTemel mantığı sade ve adım adım kuracağız.' ||
        E'\n\nSonra kısa uygulamalarla bilgiyi pekiştireceğiz.'
      )
    );

    -- 2
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Temel Mantık',
      null, 2,
      jsonb_build_object(
        'text',
        'Bu konuda asıl fark, kavramları pratik akışa çevirebilmektir.' ||
        E'\n\nTanımı bilmek başlangıçtır; doğru sırayı uygulamak kalıcılığı sağlar.' ||
        E'\n\nOrtak, süreç net olunca kararlar da netleşir.'
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
        E'\n\nHız yerine doğruluk odaklı ilerlemek daha iyi sonuç verir.'
      )
    );

    -- 4 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 1',
      null, 4,
      jsonb_build_object(
        'front_text', rec.lesson_title,
        'back_text', 'Bu dersin ana kavramıdır; doğru yorum için temel referans noktasıdır.'
      )
    );

    -- 5 practice
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'quiz', 'Alıştırma 1',
      null, 5,
      jsonb_build_object(
        'question', 'Bu ders için en doğru ilk yaklaşım hangisidir?',
        'options', jsonb_build_array(
          jsonb_build_object('id','a','text','Konuyu planlı ve adım adım uygulamak'),
          jsonb_build_object('id','b','text','Sadece anlık hareketle karar vermek'),
          jsonb_build_object('id','c','text','Sadece yorumları takip etmek')
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
        'question', 'Cümleyi tamamla: Sağlam ilerleme için önce ____ sonra karar gelir.',
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
      rec.lesson_id, 'read', 'Uygulama Akışı',
      null, 7,
      jsonb_build_object(
        'text',
        'Bu bölümde odak, doğru sırayla ilerlemektir.' ||
        E'\n\nSıra bozulduğunda yorum kalitesi düşebilir.' ||
        E'\n\nAdım adım akış, karar sürecini sadeleştirir.'
      )
    );

    -- 8
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'read', 'Sık Hata Noktası',
      null, 8,
      jsonb_build_object(
        'text',
        'Yeni başlayanlar çoğu zaman ya fazla hızlı ya da fazla dağınık gider.' ||
        E'\n\nÇözüm: kısa kontrol listesi + net sıra.' ||
        E'\n\nBu ikili, gereksiz hatayı azaltır.'
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
        E'\n\nŞimdi bir mini kontrol daha yapacağız.'
      )
    );

    -- 10 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 2',
      null, 10,
      jsonb_build_object(
        'front_text', 'Kontrol Listesi',
        'back_text', 'Karardan önce yapılan kısa doğrulama adımlarıdır.'
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
        'Kısa bir senaryo düşün: kritik bir karar anındasın.' ||
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
        'Karar disiplini, zor anlarda sistemi koruyabilmektir.' ||
        E'\n\nSüreç bozulursa küçük hata büyüyebilir.' ||
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
        'Bu derste ' || lower(rec.lesson_title) || ' konusunu 3 katmanda kurduk.' ||
        E'\n\nAna üçlü: plan + bağlam + disiplin.' ||
        E'\n\nBu refleksler oturdukça karar kalitesi yükselir.'
      )
    );

    -- 16 flashcard
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      rec.lesson_id, 'flashcard', 'Kelime Kartı 3',
      null, 16,
      jsonb_build_object(
        'front_text', 'Süreç Disiplini',
        'back_text', 'Kararları duygu yerine kuralla yürütme yaklaşımıdır.'
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
        'text', 'Ortak, ' || rec.lesson_title || ' dersini kısa sesli özetle toparlayalım.',
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
            'question', 'Aşağıdakilerden hangisi daha sağlıklı davranıştır?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Kontrol listesi kullanmak'),
              jsonb_build_object('id','b','text','Plansız hız'),
              jsonb_build_object('id','c','text','Duygusal tepki')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q4',
            'question', 'Dersin ana çıktısı hangi ifade ile özetlenir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Önce anla, sonra uygula'),
              jsonb_build_object('id','b','text','Önce işlem aç, sonra düşün'),
              jsonb_build_object('id','c','text','Sadece kalabalığı izle')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q5',
            'question', 'Sürdürülebilir yatırım davranışı hangisidir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Kurala bağlı kalmak'),
              jsonb_build_object('id','b','text','Her gün plansız yön değiştirmek'),
              jsonb_build_object('id','c','text','Sadece şansa bırakmak')
            ),
            'correct_option_id', 'a'
          ),
          jsonb_build_object(
            'id', 'q6',
            'question', 'Bu derste tekrar eden güçlü tema nedir?',
            'options', jsonb_build_array(
              jsonb_build_object('id','a','text','Disiplinli süreç yönetimi'),
              jsonb_build_object('id','b','text','Acele karar verme'),
              jsonb_build_object('id','c','text','Rastgele işlem')
            ),
            'correct_option_id', 'a'
          )
        )
      )
    );
  end loop;
end
$$;

