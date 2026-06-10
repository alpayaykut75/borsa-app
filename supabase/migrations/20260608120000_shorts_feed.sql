-- Shorts feed: dikey kısa video akışı için içerik tablosu
-- Kategoriler: ogret / ilham / hikaye
-- Moono = küratör; her short tek fikir.

create table if not exists public.shorts (
  id bigserial primary key,
  category text not null check (category in ('ogret', 'ilham', 'hikaye')),
  title text not null,
  caption text not null,
  voiceover text,
  video_url text,
  accent text not null default '#0B3D40',
  series_label text,
  lesson_id bigint,
  lesson_title text,
  like_count int not null default 0,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_shorts_active_order
  on public.shorts(is_active, sort_order, created_at);

alter table public.shorts enable row level security;

drop policy if exists "shorts_select_all" on public.shorts;
create policy "shorts_select_all"
on public.shorts
for select
to anon, authenticated
using (is_active = true);

-- Başlangıç içerik stoğu (yalnızca tablo boşsa eklenir)
insert into public.shorts
  (category, title, caption, voiceover, video_url, accent, series_label, lesson_id, lesson_title, like_count, sort_order)
select * from (
  values
    (
      'ogret',
      'Enflasyon paranı gizlice eriten hırsızdır',
      'Çözüm: üreten şirketlere ortak ol',
      'Cebindeki para aynı kalsa da satın alma gücün sessizce eriyor ortak. Enflasyona karşı en şık kalkan, üreten canlı şirketlere ortak olmaktır.',
      'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/shorts_enflasyon.mp4',
      '#0B3D40',
      null,
      55::bigint,
      'Enflasyon ve Yatırım',
      0,
      10
    ),
    (
      'ogret',
      'Hisse almak = ortak olmak',
      'Fiyat değil, ortaklık değeri',
      'Ortak, hisse aldığında o şirkete küçük bir ortak olursun. Sen fiyata değil, şirketin değerine ortak olursun.',
      null,
      '#0B3D40',
      null,
      28::bigint,
      'Hisse Senedi Nedir?',
      0,
      20
    ),
    (
      'ilham',
      'Bugün başla, mükemmeli bekleme',
      'Küçük başla, sistemi kur',
      'En iyi zaman dünmüş ortak. İkincisi bugün. Mükemmeli bekleme; küçük başla, sistemini kur, zamanı yanına al.',
      null,
      '#4A2C00',
      null,
      null::bigint,
      null,
      0,
      30
    ),
    (
      'hikaye',
      'Buffett 11 yaşında ilk hissesini aldı',
      'Sabır en büyük bileşik faiz',
      'Warren Buffett ilk hissesini 11 yaşında aldı. Onu zengin eden erken başlamak değil, uzun süre sabırla kalmaktı.',
      null,
      '#2E1A47',
      null,
      null::bigint,
      null,
      0,
      40
    ),
    (
      'ilham',
      'Panik satışı en pahalı alışkanlık',
      'Planın varsa kriz fırsattır',
      'Ekran kıpkırmızıyken karar verme ortak. Plan varsa panik değil, fırsat görürsün. Disiplin duygudan güçlüdür.',
      null,
      '#3A1212',
      null,
      null::bigint,
      null,
      0,
      50
    ),
    (
      'ogret',
      'Endeks borsanın hava durumudur',
      'Endeks ortalama, sen bahçene bak',
      'BIST 100 yükseldi diye senin hissen yükselmek zorunda değil ortak. Endeks ortalamadır; sen kendi şirketinin kalitesine bak.',
      null,
      '#08323A',
      'Bölüm 1',
      31::bigint,
      'Endeksler ve BIST 100',
      0,
      60
    )
) as seed(category, title, caption, voiceover, video_url, accent, series_label, lesson_id, lesson_title, like_count, sort_order)
where not exists (select 1 from public.shorts);
