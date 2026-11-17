-- Seviye 1 (Çaylak) — 10 ders ses URL + uygulamada görünür
-- Önkoşul: lesson-audio bucket'ta Moono_Seviye1_Ders1..Ders10.mp3

update lesson_steps
set metadata = jsonb_set(
      jsonb_set(
        coalesce(metadata, '{}'::jsonb),
        '{audio_url}',
        to_jsonb(
          ('https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Seviye1_Ders'
            || CASE lesson_id
                 WHEN 27 THEN '1'
                 WHEN 28 THEN '2'
                 WHEN 29 THEN '3'
                 WHEN 30 THEN '4'
                 WHEN 31 THEN '5'
                 WHEN 53 THEN '6'
                 WHEN 54 THEN '7'
                 WHEN 55 THEN '8'
                 WHEN 56 THEN '9'
                 WHEN 57 THEN '10'
               END
            || '.mp3')::text
        )
      ),
      '{hidden_in_app}',
      'false'::jsonb
    )
where type = 'audio'
  and order_index = 19
  and lesson_id in (27, 28, 29, 30, 31, 53, 54, 55, 56, 57);
