-- Tek statement: id ile aç + sonucu hemen göster
-- Success = Results'ta hidden = false (10 satır)

update lesson_steps
set metadata = jsonb_set(coalesce(metadata, '{}'::jsonb), '{hidden_in_app}', 'false'::jsonb, true)
where id in (438, 458, 478, 1520, 1540, 1560, 1580, 1600, 1620, 1640)
returning lesson_id, metadata->>'hidden_in_app' as hidden;
