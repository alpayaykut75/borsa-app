-- Moono günlük (sabah/öğlen/akşam) piyasa özeti cache; yazma sadece service role / edge.
create table if not exists public.moono_daily_briefs (
  brief_date date not null,
  slot text not null check (slot in ('morning', 'noon', 'evening')),
  moono_text text not null,
  created_at timestamptz default now(),
  primary key (brief_date, slot)
);

alter table public.moono_daily_briefs enable row level security;

create policy "moono_daily_briefs_select_all"
on public.moono_daily_briefs
for select
to anon, authenticated
using (true);
