-- Add two checkpoint exams to Level 1 (Unit 1)
-- Existing level exam remains as separate LevelExam screen card.

-- 1) Clean old checkpoint lessons (if any) and normalize core sort order
delete from lesson_steps
where lesson_id in (
  select id
  from lessons
  where unit_id = 1
    and (title ilike 'Ara Değerlendirme 1%' or title ilike 'Ara Değerlendirme 2%')
);

delete from lessons
where unit_id = 1
  and (title ilike 'Ara Değerlendirme 1%' or title ilike 'Ara Değerlendirme 2%');

-- Core lessons fixed positions
update lessons set sort_order = 1 where id = 27 and unit_id = 1; -- S1D1
update lessons set sort_order = 2 where id = 28 and unit_id = 1; -- S1D2
update lessons set sort_order = 3 where id = 29 and unit_id = 1; -- S1D3
update lessons set sort_order = 5 where id = 30 and unit_id = 1; -- S1D4
update lessons set sort_order = 6 where id = 31 and unit_id = 1; -- S1D5
update lessons set sort_order = 7 where id = 53 and unit_id = 1; -- S1D6
update lessons set sort_order = 9 where id = 54 and unit_id = 1; -- S1D7
update lessons set sort_order = 10 where id = 55 and unit_id = 1; -- S1D8
update lessons set sort_order = 11 where id = 56 and unit_id = 1; -- S1D9
update lessons set sort_order = 12 where id = 57 and unit_id = 1; -- S1D10

-- 2) Insert checkpoint lessons
insert into lessons (unit_id, title, description, sort_order, icon_name, is_locked)
values
  (1, 'Ara Değerlendirme 1', 'Ders 1-3 kazanımlarını ölçen 20 soruluk ara sınav.', 4, 'medal-outline', false),
  (1, 'Ara Değerlendirme 2', 'Ders 1-6 kazanımlarını ölçen 20 soruluk ara sınav.', 8, 'document-text-outline', false);

-- 3) Insert step content for Ara Değerlendirme 1 (20 soru)
insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
select l.id, 'final_quiz', 'Ara Değerlendirme 1', null, 1, $${
  "pass_threshold": 14,
  "questions": [
    {"id":"q1","question":"Borsa en doğru hangi ifadeyle açıklanır?","options":[{"id":"a","text":"Düzenli ortaklık pazarı"},{"id":"b","text":"Sadece şans oyunu"},{"id":"c","text":"Sabit fiyat tablosu"}],"correct_option_id":"a"},
    {"id":"q2","question":"Hisse alan kişi ne olur?","options":[{"id":"a","text":"Sadece müşteri"},{"id":"b","text":"Şirkete ortak"},{"id":"c","text":"Şirketin borç vereni"}],"correct_option_id":"b"},
    {"id":"q3","question":"Talep güçlenirse fiyat eğilimi genelde nasıldır?","options":[{"id":"a","text":"Yukarı"},{"id":"b","text":"Aşağı"},{"id":"c","text":"Kesin sabit"}],"correct_option_id":"a"},
    {"id":"q4","question":"'Borsa tamamen şans' algısını en çok ne azaltır?","options":[{"id":"a","text":"Plan ve analiz"},{"id":"b","text":"Söylenti takibi"},{"id":"c","text":"Acele işlem"}],"correct_option_id":"a"},
    {"id":"q5","question":"Yatırımcı yaklaşımı hangisine daha yakındır?","options":[{"id":"a","text":"Duygusal tepki"},{"id":"b","text":"Disiplinli plan"},{"id":"c","text":"Rastgele seçim"}],"correct_option_id":"b"},
    {"id":"q6","question":"Oyuncu davranışında hangi risk artar?","options":[{"id":"a","text":"Duygusal karar"},{"id":"b","text":"Sistem disiplini"},{"id":"c","text":"Uzun vadeli bakış"}],"correct_option_id":"a"},
    {"id":"q7","question":"Hisse yatırımı için temel odak nedir?","options":[{"id":"a","text":"Sadece anlık fiyat"},{"id":"b","text":"Şirketin kalitesi"},{"id":"c","text":"Günlük renkler"}],"correct_option_id":"b"},
    {"id":"q8","question":"Fiyat ile değer ilişkisi için doğru ifade hangisi?","options":[{"id":"a","text":"Her zaman aynıdır"},{"id":"b","text":"Kısa vadede ayrışabilir"},{"id":"c","text":"İlişkisizdir"}],"correct_option_id":"b"},
    {"id":"q9","question":"Temettü nedir?","options":[{"id":"a","text":"Kâr payı dağıtımı"},{"id":"b","text":"Borç artışı"},{"id":"c","text":"Hisse dondurma"}],"correct_option_id":"a"},
    {"id":"q10","question":"Yeni başlayan için en doğru başlangıç hangisi?","options":[{"id":"a","text":"Az ve anlamlı metrik"},{"id":"b","text":"Tüm veriyi aynı anda öğrenmek"},{"id":"c","text":"Sadece yorum takibi"}],"correct_option_id":"a"},
    {"id":"q11","question":"Boğa piyasası neyi temsil eder?","options":[{"id":"a","text":"Yükseliş eğilimi"},{"id":"b","text":"Düşüş eğilimi"},{"id":"c","text":"Sıfır hareket"}],"correct_option_id":"a"},
    {"id":"q12","question":"Ayı piyasasında öne çıkan duygu hangisidir?","options":[{"id":"a","text":"Aşırı rahatlık"},{"id":"b","text":"Tedirginlik"},{"id":"c","text":"Kayıtsızlık"}],"correct_option_id":"b"},
    {"id":"q13","question":"Döngü yaklaşımı ne söyler?","options":[{"id":"a","text":"Piyasa tek yönlüdür"},{"id":"b","text":"Dönemler dönüşür"},{"id":"c","text":"Sadece boğa kalıcıdır"}],"correct_option_id":"b"},
    {"id":"q14","question":"Düşüş gününde ilk doğru refleks nedir?","options":[{"id":"a","text":"Panik satış"},{"id":"b","text":"Planı kontrol etmek"},{"id":"c","text":"Rastgele alım"}],"correct_option_id":"b"},
    {"id":"q15","question":"Disiplinli yatırımcıyı ayıran ana özellik nedir?","options":[{"id":"a","text":"Kurala sadakat"},{"id":"b","text":"Sürekli işlem"},{"id":"c","text":"Hızlı karar"}],"correct_option_id":"a"},
    {"id":"q16","question":"Bir hisse yatırımında risk gerçeği için doğru ifade hangisi?","options":[{"id":"a","text":"Risk yoktur"},{"id":"b","text":"Risk yönetilmelidir"},{"id":"c","text":"Risk sadece yeni başlayanlarda olur"}],"correct_option_id":"b"},
    {"id":"q17","question":"Duygusal kararın olası sonucu nedir?","options":[{"id":"a","text":"Plan bozulması"},{"id":"b","text":"Kesin kazanç"},{"id":"c","text":"Risk azalması"}],"correct_option_id":"a"},
    {"id":"q18","question":"Hisse almak en doğru hangi anlamı taşır?","options":[{"id":"a","text":"Ortaklık"},{"id":"b","text":"Sabit faiz"},{"id":"c","text":"Yönetimi devralma"}],"correct_option_id":"a"},
    {"id":"q19","question":"Piyasa yaklaşımında en doğru sıra nedir?","options":[{"id":"a","text":"Duygu -> işlem"},{"id":"b","text":"Analiz -> plan -> işlem"},{"id":"c","text":"Söylenti -> işlem"}],"correct_option_id":"b"},
    {"id":"q20","question":"Bu ara sınavın odağı hangi ders aralığıdır?","options":[{"id":"a","text":"Ders 1-3 temel mantık"},{"id":"b","text":"Sadece teknik analiz"},{"id":"c","text":"Makro ekonomi"}],"correct_option_id":"a"}
  ]
}$$::jsonb
from lessons l
where l.unit_id = 1 and l.title = 'Ara Değerlendirme 1';

-- 4) Insert step content for Ara Değerlendirme 2 (20 soru)
insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
select l.id, 'final_quiz', 'Ara Değerlendirme 2', null, 1, $${
  "pass_threshold": 14,
  "questions": [
    {"id":"q1","question":"Borsa İstanbul'un temel işlevi nedir?","options":[{"id":"a","text":"Alıcı-satıcıyı düzenli piyasada buluşturmak"},{"id":"b","text":"Fiyatı sabitlemek"},{"id":"c","text":"Riski kaldırmak"}],"correct_option_id":"a"},
    {"id":"q2","question":"Endeks ne sağlar?","options":[{"id":"a","text":"Tek hisse garantisi"},{"id":"b","text":"Genel piyasa yönünü okumak"},{"id":"c","text":"Kesin getiri"}],"correct_option_id":"b"},
    {"id":"q3","question":"BIST 100 neye daha yakındır?","options":[{"id":"a","text":"Piyasa göstergesi"},{"id":"b","text":"Sabit fiyat listesi"},{"id":"c","text":"Tek şirket raporu"}],"correct_option_id":"a"},
    {"id":"q4","question":"Fiyat oluşumunda temel mekanizma nedir?","options":[{"id":"a","text":"Arz-talep dengesi"},{"id":"b","text":"Yorumlar"},{"id":"c","text":"Renkler"}],"correct_option_id":"a"},
    {"id":"q5","question":"Likidite düşükse ne görülebilir?","options":[{"id":"a","text":"Fiyat daha sert oynayabilir"},{"id":"b","text":"Fiyat sabit kalır"},{"id":"c","text":"Risk yok olur"}],"correct_option_id":"a"},
    {"id":"q6","question":"Enflasyonun temel etkisi nedir?","options":[{"id":"a","text":"Alım gücünü azaltmak"},{"id":"b","text":"Parayı büyütmek"},{"id":"c","text":"Riski sıfırlamak"}],"correct_option_id":"a"},
    {"id":"q7","question":"Reel getiri neyi ifade eder?","options":[{"id":"a","text":"Enflasyondan arınmış kazancı"},{"id":"b","text":"Nominal rakamı"},{"id":"c","text":"Tahmini getiriyi"}],"correct_option_id":"a"},
    {"id":"q8","question":"Yatırımın en temel rollerinden biri nedir?","options":[{"id":"a","text":"Değeri korumak"},{"id":"b","text":"Şans beklemek"},{"id":"c","text":"Sadece kısa vade"}],"correct_option_id":"a"},
    {"id":"q9","question":"Risk yönetiminin amacı nedir?","options":[{"id":"a","text":"Riski yönetmek"},{"id":"b","text":"Riski yok saymak"},{"id":"c","text":"Riski büyütmek"}],"correct_option_id":"a"},
    {"id":"q10","question":"Çeşitlendirme neyi azaltır?","options":[{"id":"a","text":"Portföy kırılganlığını"},{"id":"b","text":"Öğrenmeyi"},{"id":"c","text":"Şeffaflığı"}],"correct_option_id":"a"},
    {"id":"q11","question":"Psikolojik risk örneği hangisidir?","options":[{"id":"a","text":"Panikle plansız satış"},{"id":"b","text":"Kurala bağlı kalmak"},{"id":"c","text":"Dengeli dağılım"}],"correct_option_id":"a"},
    {"id":"q12","question":"Borsa İstanbul'da işlem ne zaman gerçekleşir?","options":[{"id":"a","text":"Uygun karşı emirle"},{"id":"b","text":"Sadece kapanışta"},{"id":"c","text":"Rastgele"}],"correct_option_id":"a"},
    {"id":"q13","question":"Endeks yükseliyor diye hangi hata yapılmamalı?","options":[{"id":"a","text":"Tüm hisseleri aynı sanmak"},{"id":"b","text":"Detay analiz yapmak"},{"id":"c","text":"Büyük resmi okumak"}],"correct_option_id":"a"},
    {"id":"q14","question":"Fiyat ile değer için doğru ifade hangisi?","options":[{"id":"a","text":"Kısa vadede ayrışabilir"},{"id":"b","text":"Her zaman aynıdır"},{"id":"c","text":"İlişkisizdir"}],"correct_option_id":"a"},
    {"id":"q15","question":"Düşüş döneminde en doğru ilk refleks nedir?","options":[{"id":"a","text":"Planı kontrol etmek"},{"id":"b","text":"Panik yapmak"},{"id":"c","text":"Rastgele alım"}],"correct_option_id":"a"},
    {"id":"q16","question":"Yüksek getiri beklentisi genelde ne taşır?","options":[{"id":"a","text":"Daha yüksek risk"},{"id":"b","text":"Sıfır risk"},{"id":"c","text":"Garantili kazanç"}],"correct_option_id":"a"},
    {"id":"q17","question":"Yeni başlayan için uygun yaklaşım hangisi?","options":[{"id":"a","text":"Az ama anlamlı metrikle ilerlemek"},{"id":"b","text":"Her şeyi aynı anda öğrenmek"},{"id":"c","text":"Sadece yorum takip etmek"}],"correct_option_id":"a"},
    {"id":"q18","question":"Reel düşünmenin amacı nedir?","options":[{"id":"a","text":"Gerçek alım gücünü görmek"},{"id":"b","text":"Sadece nominale bakmak"},{"id":"c","text":"Enflasyonu yok saymak"}],"correct_option_id":"a"},
    {"id":"q19","question":"Risk yönetiminde temel üçlü hangisidir?","options":[{"id":"a","text":"Dağılım + kural + duygu kontrolü"},{"id":"b","text":"Hız + söylenti + tahmin"},{"id":"c","text":"Şans + acele + panik"}],"correct_option_id":"a"},
    {"id":"q20","question":"Bu ara sınavın odağı hangi ders aralığıdır?","options":[{"id":"a","text":"Ders 1-6 kapsamı"},{"id":"b","text":"Sadece seviye sonu"},{"id":"c","text":"Sadece teknik analiz"}],"correct_option_id":"a"}
  ]
}$$::jsonb
from lessons l
where l.unit_id = 1 and l.title = 'Ara Değerlendirme 2';
