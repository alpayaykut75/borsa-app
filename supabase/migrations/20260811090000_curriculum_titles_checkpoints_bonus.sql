-- Moono: ders başlık/alt başlık + ara quiz 4-7-10 + Bonus Türevler
-- İçerik (lesson_steps) dokunulmaz; yalnızca lessons/units metadata ve sıra.

-- =============================================================================
-- 1) Seviye 1 — Çaylak: 10 ders başlığı
-- =============================================================================
update lessons set title = 'Şirket ve Ortaklık', description = 'Bir işin parçasına sahip olmak', sort_order = 1 where id = 27 and unit_id = 1;
update lessons set title = 'Ortak mı, Alacaklı mı?', description = 'Pay almakla borç vermenin farkı', sort_order = 2 where id = 28 and unit_id = 1;
update lessons set title = 'Şirketler Neden Halka Açılır?', description = 'Büyümek için ortak aramak', sort_order = 3 where id = 29 and unit_id = 1;
update lessons set title = 'Borsa Ne İşe Yarar?', description = 'Alıcıyla satıcıyı buluşturan çatı', sort_order = 4 where id = 30 and unit_id = 1;
update lessons set title = 'Ara Değerlendirme 1', description = 'Ders 1-4 kazanımlarını ölçen ara sınav.', sort_order = 5, icon_name = 'medal-outline' where id = 70 and unit_id = 1;
update lessons set title = 'Borsa İstanbul''a Giriş', description = 'BIST''in pazarları ve işleyişi', sort_order = 6 where id = 31 and unit_id = 1;
update lessons set title = 'Birincil ve İkincil Piyasa', description = 'Şirketten mi, başkasından mı?', sort_order = 7 where id = 53 and unit_id = 1;
update lessons set title = 'Fiyat Nasıl Oluşur?', description = 'Arz, talep ve son işlem fiyatı', sort_order = 8 where id = 54 and unit_id = 1;
update lessons set title = 'Ara Değerlendirme 2', description = 'Ders 5-7 kazanımlarını ölçen ara sınav.', sort_order = 9, icon_name = 'document-text-outline' where id = 71 and unit_id = 1;
update lessons set title = 'Endeks Nedir?', description = 'BIST 100 tek başına ne anlatır?', sort_order = 10 where id = 55 and unit_id = 1;
update lessons set title = 'Piyasadaki Oyuncular', description = 'Kim alıyor, kim satıyor?', sort_order = 11 where id = 56 and unit_id = 1;
update lessons set title = 'Risk ve Getiri İlişkisi', description = 'Yüksek getiri neden bedava değil?', sort_order = 12 where id = 57 and unit_id = 1;

-- =============================================================================
-- 2) Seviye 2 — Çırak
-- =============================================================================
update lessons set title = 'Aracı Kurum ve Hesap', description = 'Nereden başlanır, neye bakılır?', sort_order = 1 where id = 6 and unit_id = 2;
update lessons set title = 'Hisseler Nerede Duruyor?', description = 'MKK, Takasbank ve T+2', sort_order = 2 where id = 7 and unit_id = 2;
update lessons set title = 'Seans Saatleri', description = 'Açılıştan kapanışa bir gün', sort_order = 3 where id = 8 and unit_id = 2;
update lessons set title = 'Emir Tipleri', description = 'Limit mi, piyasa mı?', sort_order = 4 where id = 9 and unit_id = 2;
update lessons set title = 'Ara Değerlendirme 1', description = 'Ders 1-4 kazanımlarını ölçen ara sınav.', sort_order = 5, icon_name = 'medal-outline' where id = 72 and unit_id = 2;
update lessons set title = 'Emir Ekranının Anatomisi', description = 'Ekrandaki her kutu ne işe yarar?', sort_order = 6 where id = 10 and unit_id = 2;
update lessons set title = 'Emir Defterini Okumak', description = 'Kademelerdeki sıraların dili', sort_order = 7 where id = 33 and unit_id = 2;
update lessons set title = 'Lot, Fiyat Adımı, Tavan-Taban', description = 'İşlemin görünmez sınırları', sort_order = 8 where id = 34 and unit_id = 2;
update lessons set title = 'Ara Değerlendirme 2', description = 'Ders 5-7 kazanımlarını ölçen ara sınav.', sort_order = 9, icon_name = 'document-text-outline' where id = 73 and unit_id = 2;
update lessons set title = 'Portföy Ekranını Okumak', description = 'Maliyet, kâr, zarar ve değer', sort_order = 10 where id = 35 and unit_id = 2;
update lessons set title = 'İşlemin Görünmeyen Maliyeti', description = 'Komisyon, BSMV ve stopaj', sort_order = 11 where id = 36 and unit_id = 2;
update lessons set title = 'Temettü, Bedelli ve Bedelsiz', description = 'Sen yokken değişen portföy', sort_order = 12 where id = 37 and unit_id = 2;

-- =============================================================================
-- 3) Seviye 3 — Analist
-- =============================================================================
update lessons set title = 'Şirketin Karnesi Nerede?', description = 'Üç tablo ve KAP', sort_order = 1 where id = 11 and unit_id = 3;
update lessons set title = 'Bilanço', description = 'Neyi var, neyi borçlu?', sort_order = 2 where id = 12 and unit_id = 3;
update lessons set title = 'Gelir Tablosu', description = 'Hasılattan net kâra inen yol', sort_order = 3 where id = 13 and unit_id = 3;
update lessons set title = 'Nakit Akış Tablosu', description = 'Kâr etmekle para kazanmak', sort_order = 4 where id = 14 and unit_id = 3;
update lessons set title = 'Ara Değerlendirme 1', description = 'Ders 1-4 kazanımlarını ölçen ara sınav.', sort_order = 5, icon_name = 'medal-outline' where id = 74 and unit_id = 3;
update lessons set title = 'Enflasyon Muhasebesi', description = 'Rakamlar neden düzeltiliyor?', sort_order = 6 where id = 15 and unit_id = 3;
update lessons set title = 'Marjlar ve FAVÖK', description = 'Satıştan geriye ne kalıyor?', sort_order = 7 where id = 38 and unit_id = 3;
update lessons set title = 'Borçluluk ve Likidite', description = 'Şirketin nefes alma payı', sort_order = 8 where id = 39 and unit_id = 3;
update lessons set title = 'Ara Değerlendirme 2', description = 'Ders 5-7 kazanımlarını ölçen ara sınav.', sort_order = 9, icon_name = 'document-text-outline' where id = 75 and unit_id = 3;
update lessons set title = 'F/K Oranı', description = 'Kâr başına ödenen fiyat', sort_order = 10 where id = 40 and unit_id = 3;
update lessons set title = 'PD/DD, FD/FAVÖK ve ROE', description = 'Ucuz mu, öyle mi görünüyor?', sort_order = 11 where id = 41 and unit_id = 3;
update lessons set title = 'Bilançoda Kırmızı Bayraklar', description = 'Erken uyarı işaretleri', sort_order = 12 where id = 42 and unit_id = 3;

-- =============================================================================
-- 4) Seviye 4 — Stratejist
-- =============================================================================
update lessons set title = 'Mum Grafiğini Okumak', description = 'Tek mumda dört fiyat', sort_order = 1 where id = 16 and unit_id = 4;
update lessons set title = 'Trend Nedir?', description = 'Yukarı, aşağı ve yatay', sort_order = 2 where id = 17 and unit_id = 4;
update lessons set title = 'Boğa ve Ayı Piyasaları', description = 'Piyasanın iki ruh hali', sort_order = 3 where id = 18 and unit_id = 4;
update lessons set title = 'Destek ve Direnç', description = 'Fiyatın takıldığı seviyeler', sort_order = 4 where id = 19 and unit_id = 4;
update lessons set title = 'Ara Değerlendirme 1', description = 'Ders 1-4 kazanımlarını ölçen ara sınav.', sort_order = 5, icon_name = 'medal-outline' where id = 76 and unit_id = 4;
update lessons set title = 'Hacim', description = 'Harekete kaç kişi katıldı?', sort_order = 6 where id = 20 and unit_id = 4;
update lessons set title = 'Hareketli Ortalamalar', description = '50 ve 200 günün hikâyesi', sort_order = 7 where id = 43 and unit_id = 4;
update lessons set title = 'Momentum Göstergeleri', description = 'RSI ve MACD ne ölçer?', sort_order = 8 where id = 44 and unit_id = 4;
update lessons set title = 'Ara Değerlendirme 2', description = 'Ders 5-7 kazanımlarını ölçen ara sınav.', sort_order = 9, icon_name = 'document-text-outline' where id = 77 and unit_id = 4;
update lessons set title = 'Zaman Dilimi ve Ufuk', description = 'Aynı grafik, farklı hikâye', sort_order = 10 where id = 45 and unit_id = 4;
update lessons set title = 'Teknik Analizin Sınırları', description = 'Her sinyal neden çalışmaz?', sort_order = 11 where id = 46 and unit_id = 4;
update lessons set title = 'Piyasa Psikolojisi', description = 'FOMO, panik ve sürü etkisi', sort_order = 12 where id = 47 and unit_id = 4;

-- =============================================================================
-- 5) Seviye 5 — Usta
-- =============================================================================
update lessons set title = 'Hedef ve Zaman Ufku', description = 'Parayı ne zaman kullanacaksın?', sort_order = 1 where id = 21 and unit_id = 5;
update lessons set title = 'Risk Profilini Tanımak', description = 'Ne kadar düşüşe dayanırsın?', sort_order = 2 where id = 22 and unit_id = 5;
update lessons set title = 'Zarar Kes ve Pozisyon Boyutu', description = 'Kaybı sınırlamanın iki yolu', sort_order = 3 where id = 23 and unit_id = 5;
update lessons set title = 'Çeşitlendirme', description = 'Tek sepete güvenmemek', sort_order = 4 where id = 24 and unit_id = 5;
update lessons set title = 'Ara Değerlendirme 1', description = 'Ders 1-4 kazanımlarını ölçen ara sınav.', sort_order = 5, icon_name = 'medal-outline' where id = 78 and unit_id = 5;
update lessons set title = 'Varlık Dağılımı', description = 'Hisse, altın, döviz, mevduat', sort_order = 6 where id = 25 and unit_id = 5;
update lessons set title = 'Fonlar ve ETF''ler', description = 'Hisse seçmeden yatırım', sort_order = 7 where id = 48 and unit_id = 5;
update lessons set title = 'Düzenli Alım', description = 'Zamanlama yerine düzen', sort_order = 8 where id = 49 and unit_id = 5;
update lessons set title = 'Ara Değerlendirme 2', description = 'Ders 5-7 kazanımlarını ölçen ara sınav.', sort_order = 9, icon_name = 'document-text-outline' where id = 79 and unit_id = 5;
update lessons set title = 'Makro ve Borsa', description = 'Faiz, enflasyon ve kurun etkisi', sort_order = 10 where id = 50 and unit_id = 5;
update lessons set title = 'Yatırımcı Tuzakları', description = 'Manipülasyon ve garanti vaatler', sort_order = 11 where id = 51 and unit_id = 5;
update lessons set title = 'Yatırım Planını Yaz', description = 'Her şeyi tek sayfaya dök', sort_order = 12 where id = 52 and unit_id = 5;

-- Ara quiz: yalnızca Ders 4 ve Ders 7 sonrası (2 adet).
-- Ders 10 sonrası seviye geçiş sınavı uygulama kartı olarak kalır (Ara 3 yok).

-- =============================================================================
-- Bonus modül — Türevler (order 6)
-- =============================================================================
insert into units (title, description, order_index)
select 'Bonus: Türevler', 'Kaldıracı, teminatı ve VİOP''u tanıyoruz.', 6
where not exists (
  select 1 from units where order_index = 6 or title ilike '%Türev%'
);

-- Bonus dersleri (içerik sonra)
with bonus as (
  select id as unit_id from units where order_index = 6 limit 1
),
rows as (
  select * from (values
    (1, 'Türev Ürün Nedir?', 'Başkasının fiyatına bağlı sözleşme'),
    (2, 'VİOP''ta Ne İşlem Görür?', 'Endeks, döviz, altın ve emtia'),
    (3, 'Kontrat, Çarpan ve Vade', 'Sözleşmenin üç temel ayarı'),
    (4, 'Teminat Sistemi', 'Yatırmak değil, bloke etmek'),
    (5, 'Kaldıraç Matematiği', '%5 hareket neden %50 olur?'),
    (6, 'Teminat Tamamlama Çağrısı', 'Margin call nasıl işler?'),
    (7, 'Uzun ve Kısa Pozisyon', 'Düşüşten kazanmanın bedeli'),
    (8, 'Korunma (Hedge)', 'Türevi sigorta gibi kullanmak'),
    (9, 'Opsiyonlara Giriş', 'Hak almak, yükümlülük almak'),
    (10, 'Kim İçin Uygun Değil?', 'Girmemek de bir karardır')
  ) as t(sort_order, title, description)
)
insert into lessons (unit_id, title, description, sort_order, icon_name, is_locked)
select b.unit_id, r.title, r.description, r.sort_order, null, false
from bonus b
cross join rows r
where not exists (
  select 1 from lessons l where l.unit_id = b.unit_id and l.sort_order = r.sort_order
);

-- Bonus derslere kısa yer tutucu adım
insert into lesson_steps (lesson_id, type, title, content, order_index, metadata)
select l.id, 'read', 'Yakında', null, 1,
  jsonb_build_object('text', 'Bu dersin içeriği yakında eklenecek, Ortak. Şimdilik başlığı ve yolu görüyorsun.')
from lessons l
join units u on u.id = l.unit_id
where u.order_index = 6
  and not exists (select 1 from lesson_steps s where s.lesson_id = l.id);
