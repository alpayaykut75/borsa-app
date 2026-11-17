-- Seviye isim/açıklama güncellemesi (dersler taşınmaz; yalnızca units metadata).
-- order 1 ↔ 2 yalnızca isim: Çırak↔Çaylak; order 5 Profesyonel → Usta.

update units
set
  title = 'Seviye 1: Çaylak',
  description = $$Şirketi, payı ve borsayı en baştan öğreniyoruz.$$
where order_index = 1;

update units
set
  title = 'Seviye 2: Çırak',
  description = $$Emir tiplerini ve ekranı adım adım çözüyoruz.$$
where order_index = 2;

update units
set
  title = 'Seviye 3: Analist',
  description = $$Bilançoyla şirketin gerçek sağlığını ölçüyoruz.$$
where order_index = 3;

update units
set
  title = 'Seviye 4: Stratejist',
  description = $$Grafiği ve piyasa psikolojisini okuyoruz.$$
where order_index = 4;

update units
set
  title = 'Seviye 5: Usta',
  description = $$Riski yönetip kendi yatırım planını yazıyoruz.$$
where order_index = 5;

-- Seviye 1 final quiz başlığı (isimle uyum)
update lesson_steps
set title = 'Seviye 1: Çaylak Büyük Sınavı'
where lesson_id = 57
  and order_index = 20
  and title = 'Seviye 1: Çırak Büyük Sınavı';
