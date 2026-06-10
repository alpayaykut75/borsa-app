-- Add 2 checkpoint exams for Units 2-5
-- Pattern:
-- - Ara Değerlendirme 1 after lesson 3 (sort_order 4)
-- - Ara Değerlendirme 2 after lesson 6 (sort_order 8)
-- Existing level-end exam flow remains unchanged.

do $$
declare
  u int;
  exam1_id int;
  exam2_id int;
begin
  for u in 2..5 loop
    -- Remove old checkpoint lessons (if any) in this unit
    delete from lesson_steps
    where lesson_id in (
      select id from lessons
      where unit_id = u
        and (title ilike 'Ara Değerlendirme 1%' or title ilike 'Ara Değerlendirme 2%')
    );

    delete from lessons
    where unit_id = u
      and (title ilike 'Ara Değerlendirme 1%' or title ilike 'Ara Değerlendirme 2%');

    -- Re-number core lessons in this unit to 1..10, then shift with checkpoints
    with ordered as (
      select id, row_number() over (order by sort_order asc, id asc) as rn
      from lessons
      where unit_id = u
    )
    update lessons l
    set sort_order = case
      when o.rn between 1 and 3 then o.rn
      when o.rn between 4 and 6 then o.rn + 1
      when o.rn between 7 and 10 then o.rn + 2
      else l.sort_order
    end
    from ordered o
    where l.id = o.id;

    -- Insert two checkpoint lessons
    insert into lessons (unit_id, title, description, sort_order, icon_name, is_locked)
    values
      (u, 'Ara Değerlendirme 1', 'Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.', 4, 'medal-outline', false)
    returning id into exam1_id;

    insert into lessons (unit_id, title, description, sort_order, icon_name, is_locked)
    values
      (u, 'Ara Değerlendirme 2', 'Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.', 8, 'document-text-outline', false)
    returning id into exam2_id;

    -- Ara Değerlendirme 1 step
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      exam1_id, 'final_quiz', 'Ara Değerlendirme 1', null, 1,
      jsonb_build_object(
        'pass_threshold', 14,
        'questions', jsonb_build_array(
          jsonb_build_object('id','q1','question','Bu testin amacı nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','İlk 3 ders kazanımlarını ölçmek'),jsonb_build_object('id','b','text','Sadece hız denemek'),jsonb_build_object('id','c','text','Rastgele seçim yapmak')),'correct_option_id','a'),
          jsonb_build_object('id','q2','question','Doğru öğrenme yaklaşımı hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Planlı ilerlemek'),jsonb_build_object('id','b','text','Acele etmek'),jsonb_build_object('id','c','text','Sadece yorum takip etmek')),'correct_option_id','a'),
          jsonb_build_object('id','q3','question','Hata riskini azaltan davranış hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kontrol listesi kullanmak'),jsonb_build_object('id','b','text','Kuralsız hareket etmek'),jsonb_build_object('id','c','text','Duyguyla karar vermek')),'correct_option_id','a'),
          jsonb_build_object('id','q4','question','Analiz + plan + disiplin üçlüsü ne sağlar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Daha tutarlı karar'),jsonb_build_object('id','b','text','Daha çok acele'),jsonb_build_object('id','c','text','Daha fazla belirsizlik')),'correct_option_id','a'),
          jsonb_build_object('id','q5','question','Aşağıdakilerden hangisi zayıf yaklaşımdır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Sadece anlık harekete bakmak'),jsonb_build_object('id','b','text','Bağlamla karar vermek'),jsonb_build_object('id','c','text','Kurala sadık kalmak')),'correct_option_id','a'),
          jsonb_build_object('id','q6','question','Dengeli ilerlemede ilk adım nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Konuyu anlamak'),jsonb_build_object('id','b','text','Hemen işlem açmak'),jsonb_build_object('id','c','text','Söylentiye gitmek')),'correct_option_id','a'),
          jsonb_build_object('id','q7','question','Yeni başlayan için en doğru tercih hangisi?','options',jsonb_build_array(jsonb_build_object('id','a','text','Az ama anlamlı metrik'),jsonb_build_object('id','b','text','Her şeyi aynı anda yüklenmek'),jsonb_build_object('id','c','text','Sadece sosyal medya')),'correct_option_id','a'),
          jsonb_build_object('id','q8','question','Karar kalitesini ne yükseltir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Sistemli tekrar'),jsonb_build_object('id','b','text','Rastgele deneme'),jsonb_build_object('id','c','text','Acele')),'correct_option_id','a'),
          jsonb_build_object('id','q9','question','Disiplinin yatırımdaki karşılığı nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kurala bağlı kalmak'),jsonb_build_object('id','b','text','Anlık tepki'),jsonb_build_object('id','c','text','Hızlı yön değiştirmek')),'correct_option_id','a'),
          jsonb_build_object('id','q10','question','Hangi ifade doğrudur?','options',jsonb_build_array(jsonb_build_object('id','a','text','Bağlam olmadan fiyat yorumu eksik kalır'),jsonb_build_object('id','b','text','Fiyat tek başına her şeyi anlatır'),jsonb_build_object('id','c','text','Yorumlar veriden güçlüdür')),'correct_option_id','a'),
          jsonb_build_object('id','q11','question','Planın olmadığı yerde ne artar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Hata riski'),jsonb_build_object('id','b','text','Netlik'),jsonb_build_object('id','c','text','Tutarlılık')),'correct_option_id','a'),
          jsonb_build_object('id','q12','question','Güçlü öğrenme döngüsü hangi sıradır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Oku -> test et -> düzelt'),jsonb_build_object('id','b','text','Acele et -> unut'),jsonb_build_object('id','c','text','Sadece izle')),'correct_option_id','a'),
          jsonb_build_object('id','q13','question','Aşağıdakilerden hangisi riskli davranıştır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plansız karar'),jsonb_build_object('id','b','text','Kural seti'),jsonb_build_object('id','c','text','Ön kontrol')),'correct_option_id','a'),
          jsonb_build_object('id','q14','question','Sağlam ilerleme neye dayanır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Süreç disiplini'),jsonb_build_object('id','b','text','Şans'),jsonb_build_object('id','c','text','Taklit')),'correct_option_id','a'),
          jsonb_build_object('id','q15','question','Kontrol listesi ne sağlar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Karar hatasını azaltır'),jsonb_build_object('id','b','text','Riski yok eder'),jsonb_build_object('id','c','text','Kazancı garanti eder')),'correct_option_id','a'),
          jsonb_build_object('id','q16','question','Tutarlı yatırımcı davranışı hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Aynı ilkelere bağlı kalmak'),jsonb_build_object('id','b','text','Her gün yeni kural'),jsonb_build_object('id','c','text','Duyguyla yön değiştirmek')),'correct_option_id','a'),
          jsonb_build_object('id','q17','question','Hangi ifade yanlıştır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Söylenti tek başına yeterli veridir'),jsonb_build_object('id','b','text','Bağlam önemlidir'),jsonb_build_object('id','c','text','Plan disiplini gerekir')),'correct_option_id','a'),
          jsonb_build_object('id','q18','question','Ara değerlendirme ne işe yarar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kazanımı doğrular'),jsonb_build_object('id','b','text','Sadece süre doldurur'),jsonb_build_object('id','c','text','Akışı bozar')),'correct_option_id','a'),
          jsonb_build_object('id','q19','question','Süreç odaklı yaklaşımın sonucu nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Daha düşük hata oranı'),jsonb_build_object('id','b','text','Daha yüksek panik'),jsonb_build_object('id','c','text','Rastgele sonuç')),'correct_option_id','a'),
          jsonb_build_object('id','q20','question','Bu sınav hangi kapsamı ölçer?','options',jsonb_build_array(jsonb_build_object('id','a','text','Ders 1-3 kapsamı'),jsonb_build_object('id','b','text','Sadece seviye sonu'),jsonb_build_object('id','c','text','Sadece teknik sınav')),'correct_option_id','a')
        )
      )
    );

    -- Ara Değerlendirme 2 step
    insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
    values (
      exam2_id, 'final_quiz', 'Ara Değerlendirme 2', null, 1,
      jsonb_build_object(
        'pass_threshold', 14,
        'questions', jsonb_build_array(
          jsonb_build_object('id','q1','question','Bu sınavın kapsadığı ders aralığı nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Ders 1-6 kapsamı'),jsonb_build_object('id','b','text','Sadece son ders'),jsonb_build_object('id','c','text','Sadece final öncesi')),'correct_option_id','a'),
          jsonb_build_object('id','q2','question','Ders 1-6 tekrarında doğru yöntem hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Konuları bağlayarak tekrar etmek'),jsonb_build_object('id','b','text','Parça parça ezberlemek'),jsonb_build_object('id','c','text','Sadece rastgele çözmek')),'correct_option_id','a'),
          jsonb_build_object('id','q3','question','Karar kalitesi en çok neyle artar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plan ve sistem disiplini'),jsonb_build_object('id','b','text','Acele'),jsonb_build_object('id','c','text','Söylenti')),'correct_option_id','a'),
          jsonb_build_object('id','q4','question','Hata payını düşüren yaklaşım hangisi?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kontrol listesi kullanmak'),jsonb_build_object('id','b','text','Kuralsız hareket etmek'),jsonb_build_object('id','c','text','Duygusal tepki')),'correct_option_id','a'),
          jsonb_build_object('id','q5','question','Bağlam neden önemlidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kararı doğru zemine oturtur'),jsonb_build_object('id','b','text','Sadece süre uzatır'),jsonb_build_object('id','c','text','Gereksizdir')),'correct_option_id','a'),
          jsonb_build_object('id','q6','question','Sistemli yatırımcı hangi davranışı gösterir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kurallarına sadık kalır'),jsonb_build_object('id','b','text','Her gün yön değiştirir'),jsonb_build_object('id','c','text','Anlık tepki verir')),'correct_option_id','a'),
          jsonb_build_object('id','q7','question','Ders tekrarının amacı nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Bilgiyi kalıcı hale getirmek'),jsonb_build_object('id','b','text','Sadece süre doldurmak'),jsonb_build_object('id','c','text','Rastgele soru çözmek')),'correct_option_id','a'),
          jsonb_build_object('id','q8','question','Hangi davranış risklidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plansız hız'),jsonb_build_object('id','b','text','Kontrollü adım'),jsonb_build_object('id','c','text','Dengeli ilerleme')),'correct_option_id','a'),
          jsonb_build_object('id','q9','question','Yatırım öğrenme sürecinde doğru sıra hangisi?','options',jsonb_build_array(jsonb_build_object('id','a','text','Önce anla, sonra uygula'),jsonb_build_object('id','b','text','Önce uygula, sonra düşün'),jsonb_build_object('id','c','text','Sadece izle')),'correct_option_id','a'),
          jsonb_build_object('id','q10','question','Duygu yönetimi niçin kritiktir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plan dışı hatayı azaltır'),jsonb_build_object('id','b','text','Kazancı garanti eder'),jsonb_build_object('id','c','text','Riski yok eder')),'correct_option_id','a'),
          jsonb_build_object('id','q11','question','Sürdürülebilir yaklaşım hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Süreç odaklı tekrar'),jsonb_build_object('id','b','text','Acele karar'),jsonb_build_object('id','c','text','Tek veriye bakmak')),'correct_option_id','a'),
          jsonb_build_object('id','q12','question','Ara değerlendirme 2 neyi kontrol eder?','options',jsonb_build_array(jsonb_build_object('id','a','text','İlk 6 ders kazanımını'),jsonb_build_object('id','b','text','Sadece 1 dersi'),jsonb_build_object('id','c','text','Sadece finali')),'correct_option_id','a'),
          jsonb_build_object('id','q13','question','Aşağıdakilerden hangisi güçlü karar öncesi adımıdır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Kontrol sorusu sormak'),jsonb_build_object('id','b','text','Hızlı tepki'),jsonb_build_object('id','c','text','Kopya karar')),'correct_option_id','a'),
          jsonb_build_object('id','q14','question','Hangi ifade doğrudur?','options',jsonb_build_array(jsonb_build_object('id','a','text','Sistem disiplini uzun vadede fark yaratır'),jsonb_build_object('id','b','text','Şans yeterlidir'),jsonb_build_object('id','c','text','Plan gereksizdir')),'correct_option_id','a'),
          jsonb_build_object('id','q15','question','Doğru tekrar stratejisi hangisidir?','options',jsonb_build_array(jsonb_build_object('id','a','text','Konular arası bağlantı kurmak'),jsonb_build_object('id','b','text','Sadece son soruya bakmak'),jsonb_build_object('id','c','text','Rastgele ilerlemek')),'correct_option_id','a'),
          jsonb_build_object('id','q16','question','Karar netliği nasıl artar?','options',jsonb_build_array(jsonb_build_object('id','a','text','Bağlam + kural birlikte kullanınca'),jsonb_build_object('id','b','text','Sadece sezgiyle'),jsonb_build_object('id','c','text','Sadece hızla')),'correct_option_id','a'),
          jsonb_build_object('id','q17','question','Aşağıdakilerden hangisi yanlıştır?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plansızlık faydalıdır'),jsonb_build_object('id','b','text','Plan disiplini gereklidir'),jsonb_build_object('id','c','text','Kontrol listesi yararlıdır')),'correct_option_id','a'),
          jsonb_build_object('id','q18','question','Risk yönetimi yaklaşımı ne ister?','options',jsonb_build_array(jsonb_build_object('id','a','text','Önceden düşünülmüş sınırlar'),jsonb_build_object('id','b','text','Sınırsız deneme'),jsonb_build_object('id','c','text','Tesadüf')),'correct_option_id','a'),
          jsonb_build_object('id','q19','question','Sağlam ilerleme için kritik ikili hangisi?','options',jsonb_build_array(jsonb_build_object('id','a','text','Plan ve disiplin'),jsonb_build_object('id','b','text','Acele ve panik'),jsonb_build_object('id','c','text','Söylenti ve tahmin')),'correct_option_id','a'),
          jsonb_build_object('id','q20','question','Bu sınavın türü nedir?','options',jsonb_build_array(jsonb_build_object('id','a','text','20 soruluk ara değerlendirme'),jsonb_build_object('id','b','text','10 soruluk final'),jsonb_build_object('id','c','text','5 soruluk deneme')),'correct_option_id','a')
        )
      )
    );
  end loop;
end
$$;
