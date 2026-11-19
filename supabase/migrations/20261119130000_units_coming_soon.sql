-- PR 5: Seviye kilidi ("Yakında")
-- Yeni içeriği yazılana kadar seviyeleri uygulamada kapalı tutmak için bayrak.
-- Bir seviyeyi açmak için: update public.units set coming_soon = false where id = <id>;
-- (Uygulama build'i gerekmez.)

alter table public.units
  add column if not exists coming_soon boolean not null default false;

-- Başlangıç: yalnızca Seviye 1 (Çaylak) açık.
update public.units set coming_soon = true  where id in (2, 3, 4, 5, 6);
update public.units set coming_soon = false where id = 1;
