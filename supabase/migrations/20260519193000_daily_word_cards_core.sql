-- Daily word cards: pool + per-user daily assignments + attempts
create table if not exists public.word_card_pool (
  id bigserial primary key,
  term text not null,
  prompt text not null,
  options jsonb not null,
  correct_option_id text not null,
  explanation text,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_word_assignments (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_date date not null,
  slot_index int not null check (slot_index between 1 and 3),
  word_card_id bigint not null references public.word_card_pool(id) on delete restrict,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  selected_option_id text,
  is_correct boolean,
  answered_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, assignment_date, slot_index),
  unique (user_id, assignment_date, word_card_id)
);

create table if not exists public.daily_word_attempts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_id bigint not null references public.daily_word_assignments(id) on delete cascade,
  word_card_id bigint not null references public.word_card_pool(id) on delete restrict,
  attempt_no int not null check (attempt_no >= 1),
  selected_option_id text not null,
  is_correct boolean not null,
  created_at timestamptz not null default now(),
  unique (assignment_id, attempt_no)
);

create index if not exists idx_daily_word_assignments_user_date
  on public.daily_word_assignments(user_id, assignment_date);
create index if not exists idx_daily_word_assignments_word
  on public.daily_word_assignments(word_card_id);
create index if not exists idx_daily_word_attempts_user_date
  on public.daily_word_attempts(user_id, created_at desc);

alter table public.word_card_pool enable row level security;
alter table public.daily_word_assignments enable row level security;
alter table public.daily_word_attempts enable row level security;

drop policy if exists "word_card_pool_select_all" on public.word_card_pool;
create policy "word_card_pool_select_all"
on public.word_card_pool
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "daily_word_assignments_select_own" on public.daily_word_assignments;
create policy "daily_word_assignments_select_own"
on public.daily_word_assignments
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "daily_word_assignments_insert_own" on public.daily_word_assignments;
create policy "daily_word_assignments_insert_own"
on public.daily_word_assignments
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "daily_word_assignments_update_own" on public.daily_word_assignments;
create policy "daily_word_assignments_update_own"
on public.daily_word_assignments
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "daily_word_attempts_select_own" on public.daily_word_attempts;
create policy "daily_word_attempts_select_own"
on public.daily_word_attempts
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "daily_word_attempts_insert_own" on public.daily_word_attempts;
create policy "daily_word_attempts_insert_own"
on public.daily_word_attempts
for insert
to authenticated
with check (auth.uid() = user_id);

insert into public.word_card_pool (term, prompt, options, correct_option_id, explanation, difficulty, tags)
select * from (
  values
    ('Hisse Senedi', 'Hisse senedi almak neyi ifade eder?', '[{"id":"a","text":"Şirkete ortak olmayı"},{"id":"b","text":"Şirkete borç vermeyi"},{"id":"c","text":"Sabit faiz almayı"}]'::jsonb, 'a', 'Hisse sahibi olmak, şirketin payına ortak olmaktır.', 'easy', '{temel,ortaklik}'::text[]),
    ('BIST 100', 'BIST 100 en doğru neyi gösterir?', '[{"id":"a","text":"Tek bir şirketin fiyatını"},{"id":"b","text":"Piyasanın genel yönüne dair göstergeyi"},{"id":"c","text":"Döviz kurunu"}]'::jsonb, 'b', 'BIST 100, büyük ve likit hisseler üzerinden genel eğilim sinyali verir.', 'easy', '{endeks,temel}'::text[]),
    ('Temettü', 'Temettü ne demektir?', '[{"id":"a","text":"Şirketin borcunu artırması"},{"id":"b","text":"Kârın hissedarlara paylaştırılması"},{"id":"c","text":"Yeni hisse çıkarması"}]'::jsonb, 'b', 'Temettü, şirketin elde ettiği kârın bir kısmını hissedarlarla paylaşmasıdır.', 'easy', '{temettu,temel}'::text[]),
    ('Likidite', 'Likiditesi yüksek bir varlık için doğru ifade hangisidir?', '[{"id":"a","text":"Alım satımı daha kolaydır"},{"id":"b","text":"Hiç risk taşımaz"},{"id":"c","text":"Fiyatı hiç değişmez"}]'::jsonb, 'a', 'Likidite, uygun fiyata hızlı alım-satım yapabilme kolaylığıdır.', 'easy', '{likidite,temel}'::text[]),
    ('Arz-Talep', 'Talep arzdan güçlüyse fiyat eğilimi genelde nasıldır?', '[{"id":"a","text":"Yukarı yönlü"},{"id":"b","text":"Aşağı yönlü"},{"id":"c","text":"Kesin sabit"}]'::jsonb, 'a', 'Talep baskısı arttığında fiyat üzerinde yukarı yönlü baskı oluşur.', 'easy', '{arz_talep,temel}'::text[]),
    ('Portföy', 'Portföy çeşitlendirmesinin ana amacı nedir?', '[{"id":"a","text":"Riski dengelemek"},{"id":"b","text":"Kazancı garanti etmek"},{"id":"c","text":"Her gün işlem yapmak"}]'::jsonb, 'a', 'Çeşitlendirme riski yok etmez ama tek varlığa bağımlılığı azaltır.', 'easy', '{portfoy,risk}'::text[]),
    ('Volatilite', 'Volatilite neyi anlatır?', '[{"id":"a","text":"Fiyat dalgalanmasının şiddetini"},{"id":"b","text":"Şirketin borç oranını"},{"id":"c","text":"Temettü verimini"}]'::jsonb, 'a', 'Volatilite, fiyatların ne kadar sert hareket ettiğini ifade eder.', 'easy', '{volatilite,risk}'::text[]),
    ('Stop-Loss', 'Stop-loss emri hangi amaca hizmet eder?', '[{"id":"a","text":"Zararı sınırlamaya"},{"id":"b","text":"Kazancı sabitlemeye"},{"id":"c","text":"Temettüyü artırmaya"}]'::jsonb, 'a', 'Stop-loss, plan dışı kaybı sınırlamak için kullanılan bir risk aracıdır.', 'easy', '{risk,emir}'::text[]),
    ('Nominal Getiri', 'Nominal getiri hangi bilgiyi verir?', '[{"id":"a","text":"Enflasyondan arındırılmış kazancı"},{"id":"b","text":"Ham yüzdesel değişimi"},{"id":"c","text":"Kur etkisini"}]'::jsonb, 'b', 'Nominal getiri, enflasyon etkisi ayrıştırılmadan görülen getiridir.', 'easy', '{getiri,enflasyon}'::text[]),
    ('Reel Getiri', 'Reel getiri en doğru nasıl tanımlanır?', '[{"id":"a","text":"Enflasyondan arındırılmış getiri"},{"id":"b","text":"Sadece yıllık temettü"},{"id":"c","text":"Kur farkı geliri"}]'::jsonb, 'a', 'Reel getiri, satın alma gücündeki gerçek değişimi gösterir.', 'easy', '{getiri,enflasyon}'::text[]),
    ('Piyasa Emri', 'Piyasa emri verildiğinde ne olur?', '[{"id":"a","text":"Belirli bir limit fiyat beklenir"},{"id":"b","text":"Uygun en iyi fiyatlardan hızlı eşleşme hedeflenir"},{"id":"c","text":"İşlem gün sonuna ertelenir"}]'::jsonb, 'b', 'Piyasa emri hız odaklıdır; fiyat kontrolü limit emirde daha yüksektir.', 'easy', '{emir,temel}'::text[]),
    ('Limit Emir', 'Limit emrin temel avantajı nedir?', '[{"id":"a","text":"Fiyat kontrolü sağlaması"},{"id":"b","text":"Kesin gerçekleşmesi"},{"id":"c","text":"Her zaman daha düşük komisyon"}]'::jsonb, 'a', 'Limit emir istenen fiyat seviyesini korumaya yardımcı olur.', 'easy', '{emir,temel}'::text[]),

    ('Fiyat-Değer', 'Aşağıdaki ifadelerden hangisi daha doğrudur?', '[{"id":"a","text":"Fiyat ve değer kısa vadede ayrışabilir"},{"id":"b","text":"Fiyat her zaman gerçek değerin aynısıdır"},{"id":"c","text":"Değer sadece teknik grafikten çıkar"}]'::jsonb, 'a', 'Piyasa fiyatı kısa vadede duygu ve beklentiyle sapma gösterebilir.', 'medium', '{degerleme,analiz}'::text[]),
    ('Risk-Getiri', 'Risk-getiri ilişkisi için en tutarlı ifade hangisidir?', '[{"id":"a","text":"Daha yüksek getiri beklentisi genelde daha yüksek risk taşır"},{"id":"b","text":"Yüksek getiri daima düşük risklidir"},{"id":"c","text":"Riskle getiri arasında ilişki yoktur"}]'::jsonb, 'a', 'Yatırımda getiri beklentisi arttıkça belirsizlik de artma eğilimindedir.', 'medium', '{risk,getiri}'::text[]),
    ('Trend ve Gürültü', 'Kısa vadeli fiyat sıçramaları çoğu zaman ne olabilir?', '[{"id":"a","text":"Kalıcı trend değişimi"},{"id":"b","text":"Geçici piyasa gürültüsü"},{"id":"c","text":"Mutlak alım sinyali"}]'::jsonb, 'b', 'Her ani hareket kalıcı trend anlamına gelmez.', 'medium', '{trend,analiz}'::text[]),
    ('T+2', 'Borsada T+2 kuralı neyi anlatır?', '[{"id":"a","text":"İşlemin takasının iki iş günü sonra tamamlanmasını"},{"id":"b","text":"İki farklı hisse zorunluluğunu"},{"id":"c","text":"İki kat komisyonu"}]'::jsonb, 'a', 'Takas süreci işlemin nihai mutabakat zamanını ifade eder.', 'medium', '{takas,islem}'::text[]),
    ('Psikolojik Yanılgı', 'FOMO davranışının temel riski nedir?', '[{"id":"a","text":"Plansız ve geç kalmış alım yapmak"},{"id":"b","text":"Riski azaltmak"},{"id":"c","text":"Portföyü dengelemek"}]'::jsonb, 'a', 'FOMO, fırsatı kaçırma korkusuyla plan dışı hamle yaptırabilir.', 'medium', '{psikoloji,risk}'::text[]),
    ('Destek-Direnç', 'Destek/direnç seviyeleri için doğru ifade hangisidir?', '[{"id":"a","text":"Kesin sonuç verir"},{"id":"b","text":"Olasılık çerçevesi sunar"},{"id":"c","text":"Sadece uzun vadede kullanılır"}]'::jsonb, 'b', 'Teknik seviyeler kesinlik değil olasılık yönetimi sağlar.', 'medium', '{teknik,analiz}'::text[]),
    ('Bilanço', 'Bir şirketin bilançosunda yatırımcı neye bakar?', '[{"id":"a","text":"Varlık-borç dengesine"},{"id":"b","text":"Sadece logo tasarımına"},{"id":"c","text":"Sadece günlük fiyat rengine"}]'::jsonb, 'a', 'Finansal sağlamlık için varlık-borç yapısı kritik bir göstergedir.', 'medium', '{bilanço,temel_analiz}'::text[]),
    ('Nakit Akışı', 'Pozitif nakit akışı yatırımcı için neden önemlidir?', '[{"id":"a","text":"Şirketin operasyonel sürdürülebilirliğini destekler"},{"id":"b","text":"Fiyatı her gün yükseltir"},{"id":"c","text":"Riski sıfırlar"}]'::jsonb, 'a', 'Nakit üretimi zayıf şirketlerde finansman riski artabilir.', 'medium', '{nakit_akisi,temel_analiz}'::text[]),
    ('Enflasyon', 'Yüksek enflasyon ortamında yatırımcı açısından kritik soru nedir?', '[{"id":"a","text":"Nominal kazanç var mı?"},{"id":"b","text":"Reel olarak alım gücü korunuyor mu?"},{"id":"c","text":"Renkli grafik var mı?"}]'::jsonb, 'b', 'Alım gücü korunmuyorsa nominal kazanç yanıltıcı olabilir.', 'medium', '{enflasyon,reel_getiri}'::text[]),
    ('Pozisyon Boyutu', 'Pozisyon boyutu yönetiminde temel amaç nedir?', '[{"id":"a","text":"Tek işlemde tüm sermayeyi kullanmak"},{"id":"b","text":"Tek hatada portföyün aşırı zarar görmesini önlemek"},{"id":"c","text":"İşlem sayısını artırmak"}]'::jsonb, 'b', 'Pozisyon boyutu riski sayısal olarak kontrol etmeye yarar.', 'medium', '{risk,portfoy}'::text[]),
    ('Yatay Piyasa', 'Yatay piyasada sık görülen hata hangisidir?', '[{"id":"a","text":"Her küçük harekete trend muamelesi yapmak"},{"id":"b","text":"Risk limitini korumak"},{"id":"c","text":"Nakit oranını yönetmek"}]'::jsonb, 'a', 'Yatay dönemde aşırı işlem maliyeti ve hata oranını artırır.', 'medium', '{trend,islem_disiplini}'::text[]),
    ('Halka Arz', 'Halka arz sürecinde yatırımcı için kritik nokta nedir?', '[{"id":"a","text":"Sadece sosyal medya coşkusu"},{"id":"b","text":"Şirketin değerleme ve finansallarını anlamak"},{"id":"c","text":"İlk gün mutlaka tavan beklemek"}]'::jsonb, 'b', 'Halka arzlar da temel analiz gerektirir.', 'medium', '{halka_arz,degerleme}'::text[]),

    ('Beklenti Yönetimi', 'Aşağıdakilerden hangisi profesyonel beklenti yönetimine uygundur?', '[{"id":"a","text":"Her işlemde yüksek kazanç beklemek"},{"id":"b","text":"Seri sonuçlar yerine süreç kalitesini ölçmek"},{"id":"c","text":"Kayıpları tamamen imkansız görmek"}]'::jsonb, 'b', 'Süreç kalitesi odaklı yaklaşım uzun vadede daha sürdürülebilirdir.', 'hard', '{psikoloji,disiplin}'::text[]),
    ('Korelasyon', 'Portföyde yüksek korelasyon ne anlama gelebilir?', '[{"id":"a","text":"Varlıkların benzer yönde hareket edip çeşitlendirme etkisini azaltması"},{"id":"b","text":"Riski otomatik sıfırlaması"},{"id":"c","text":"Kazancı garanti etmesi"}]'::jsonb, 'a', 'Benzer davranan varlıklar kriz anında birlikte düşebilir.', 'hard', '{portfoy,korelasyon}'::text[]),
    ('Drawdown', 'Maksimum drawdown kavramı neyi ölçer?', '[{"id":"a","text":"En yüksek noktadan en düşük noktaya görülen en büyük düşüşü"},{"id":"b","text":"Yıllık temettü oranını"},{"id":"c","text":"Günlük işlem sayısını"}]'::jsonb, 'a', 'Drawdown, stratejinin dayanıklılığını ölçmede kritik bir metriktir.', 'hard', '{risk,performans}'::text[]),
    ('Rebalancing', 'Rebalancing (yeniden dengeleme) neden yapılır?', '[{"id":"a","text":"Portföy hedef dağılımını korumak için"},{"id":"b","text":"Her gün daha çok işlem yapmak için"},{"id":"c","text":"Riski görmezden gelmek için"}]'::jsonb, 'a', 'Varlıklar farklı performans gösterdikçe portföy ağırlıkları sapar.', 'hard', '{portfoy,denge}'::text[]),
    ('Marj Güvenliği', 'Kaldıraçlı işlemlerde temel tehlike hangisidir?', '[{"id":"a","text":"Küçük fiyat hareketlerinin sermayeyi hızla eritebilmesi"},{"id":"b","text":"Riski azaltması"},{"id":"c","text":"Volatiliteyi yok etmesi"}]'::jsonb, 'a', 'Kaldıraç getiriyi büyüttüğü gibi kaybı da büyütür.', 'hard', '{kaldirac,risk}'::text[]),
    ('Regresyon', 'Fiyatın ortalamaya dönüş eğilimi hangi yaklaşımla ilişkilidir?', '[{"id":"a","text":"Mean reversion"},{"id":"b","text":"Sabit getiri garantisi"},{"id":"c","text":"Tam rastgele alım"}]'::jsonb, 'a', 'Bazı varlıklar uç değerlerden sonra ortalamaya dönme eğilimi gösterebilir.', 'hard', '{strateji,analiz}'::text[]),
    ('Senaryo Analizi', 'Senaryo analizi neden önemlidir?', '[{"id":"a","text":"Tek bir sonuca kör bağımlılığı azaltır"},{"id":"b","text":"Kesin tahmin sağlar"},{"id":"c","text":"Plan yapmayı gereksiz kılar"}]'::jsonb, 'a', 'Alternatif senaryolar kriz anında daha hızlı ve kontrollü karar sağlar.', 'hard', '{risk,planlama}'::text[]),
    ('Sharpe Bakışı', 'Sharpe oranı kabaca neyi karşılaştırır?', '[{"id":"a","text":"Risk başına getiriyi"},{"id":"b","text":"Sadece nominal kazancı"},{"id":"c","text":"Sadece işlem sayısını"}]'::jsonb, 'a', 'Getiriyi volatiliteyle birlikte yorumlamaya yardımcı olur.', 'hard', '{performans,risk}'::text[]),
    ('Likidite Riski', 'Likidite riski en çok hangi durumda belirginleşir?', '[{"id":"a","text":"Stresli piyasa koşullarında makasların açılmasıyla"},{"id":"b","text":"Piyasa çok sakinken"},{"id":"c","text":"Hacim çok yüksekken riskin sıfırlanmasıyla"}]'::jsonb, 'a', 'Piyasada alıcı-satıcı dengesizliği büyüdüğünde çıkış maliyeti artar.', 'hard', '{likidite,risk}'::text[]),
    ('Davranışsal Finans', 'Anchoring (çapa etkisi) hangi hataya yol açabilir?', '[{"id":"a","text":"İlk görülen fiyata gereğinden fazla bağlı kalmaya"},{"id":"b","text":"Riski dengeli yönetmeye"},{"id":"c","text":"Portföyü çeşitlendirmeye"}]'::jsonb, 'a', 'Yatırımcı, yeni bilgiye rağmen eski referansa gereksiz bağlı kalabilir.', 'hard', '{davranissal_finans,psikoloji}'::text[]),
    ('Tail Risk', 'Tail risk yaklaşımı neyi vurgular?', '[{"id":"a","text":"Nadir ama büyük etkili olayların portföyü sert etkileyebileceğini"},{"id":"b","text":"Sadece günlük dalgalanmayı"},{"id":"c","text":"Temettü dağıtımını"}]'::jsonb, 'a', 'Nadir şoklar normal dağılım varsayımının ötesinde zarar yaratabilir.', 'hard', '{risk,tail_risk}'::text[]),
    ('Karar Disiplini', 'Zor piyasa koşullarında en sağlıklı refleks hangisidir?', '[{"id":"a","text":"Önceden tanımlı kurallara geri dönmek"},{"id":"b","text":"Panikle pozisyon büyütmek"},{"id":"c","text":"Söylentiyi merkeze almak"}]'::jsonb, 'a', 'Önceden tanımlı süreç, stres altında hata oranını düşürür.', 'hard', '{disiplin,surec}')
) as seed(term, prompt, options, correct_option_id, explanation, difficulty, tags)
where not exists (select 1 from public.word_card_pool);
