-- Ara 3 yanlışlıkla eklendi: 4 ve 7 sonrası ara; 10 sonrası yalnızca seviye geçiş sınavı.

delete from lesson_steps
where lesson_id in (
  select id from lessons
  where title ilike 'Ara Değerlendirme 3%'
    and unit_id between 1 and 5
);

delete from user_progress
where lesson_id in (
  select id from lessons
  where title ilike 'Ara Değerlendirme 3%'
    and unit_id between 1 and 5
);

delete from lessons
where title ilike 'Ara Değerlendirme 3%'
  and unit_id between 1 and 5;
