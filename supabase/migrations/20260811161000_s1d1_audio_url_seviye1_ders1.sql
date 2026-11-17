-- Ders 1 (lesson_id 27) — yeni ses dosyası URL'i
-- Önkoşul: Storage bucket `lesson-audio` içine Moono_Seviye1_Ders1.mp3 yüklenmiş olmalı.
-- Public URL: https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Seviye1_Ders1.mp3

update lesson_steps
set metadata = jsonb_set(
      jsonb_set(
        coalesce(metadata, '{}'::jsonb),
        '{audio_url}',
        to_jsonb(
          'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Seviye1_Ders1.mp3'::text
        )
      ),
      '{hidden_in_app}',
      'false'::jsonb
    )
where lesson_id = 27
  and order_index = 19
  and type = 'audio';
