-- Shorts: yeni içerik — "Borsa bir kumarhane değil, ortaklık yeridir"
-- Kategori: ogret · Derse köprü: lesson 27 (Borsa Nedir?)
-- sort_order = 5 → feed'in başında (temel giriş konusu, videolu).

insert into public.shorts
  (category, title, caption, voiceover, video_url, accent, series_label, lesson_id, lesson_title, like_count, sort_order)
select
  'ogret',
  'Borsa bir kumarhane değil, ortaklık yeridir',
  'Dev şirketlere ortak olma sanatı',
  null,
  'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/Shorts/shorts_ortak.mp4',
  '#0B3D40',
  null,
  27::bigint,
  'Borsa Nedir?',
  0,
  5
where not exists (
  select 1 from public.shorts
  where video_url = 'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/Shorts/shorts_ortak.mp4'
);
