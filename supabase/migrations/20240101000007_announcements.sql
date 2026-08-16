-- ============================================================
-- الإعلانات العامة (بانر) التي تظهر لكل الزوار
-- ============================================================
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text default '',
  url text default '/',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

drop policy if exists "public_read_announcements" on public.announcements;
create policy "public_read_announcements" on public.announcements
  for select using (true);

drop policy if exists "admin_write_announcements" on public.announcements;
create policy "admin_write_announcements" on public.announcements
  for all using (public.is_admin()) with check (public.is_admin());

create index if not exists idx_announcements_active on public.announcements (is_active, created_at desc);
