-- ============================================================
-- الإعلانات المتعددة: جدول ads + تدوير + حذف تلقائي للمنتهي
-- ============================================================

-- 1) جدول الإعلانات
create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  body text default '',
  image text,
  link text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) RLS: قراءة عامة + كتابة للإداريين فقط
alter table public.ads enable row level security;

create policy "public_read_ads" on public.ads for select using (true);
create policy "admin_write_ads" on public.ads
  for all using (public.is_admin()) with check (public.is_admin());

-- 3) حذف الإعلانات المنتهية ضمن مهمة الحذف اليومية
create or replace function public.delete_expired_content()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  ad_exp timestamptz;
begin
  delete from public.news       where expires_at is not null and expires_at < now();
  delete from public.projects   where expires_at is not null and expires_at < now();
  delete from public.places     where expires_at is not null and expires_at < now();
  delete from public.events     where expires_at is not null and expires_at < now();
  delete from public.gallery    where expires_at is not null and expires_at < now();
  delete from public.videos     where expires_at is not null and expires_at < now();
  delete from public.statistics where expires_at is not null and expires_at < now();
  delete from public.pages      where expires_at is not null and expires_at < now();
  delete from public.ads        where expires_at is not null and expires_at < now();

  select nullif(value, '')::timestamptz into ad_exp from public.settings where key = 'ad_expires_at';
  if ad_exp is not null and ad_exp < now() then
    update public.settings set value = '0' where key = 'ad_enabled';
    update public.settings set value = '' where key in ('ad_title', 'ad_text', 'ad_image', 'ad_link', 'ad_expires_at');
  end if;
end;
$$;

-- 4) بيانات تجريبية
insert into public.ads (title, body, image, link, sort_order, is_published) values
  ('انطلاقة مشروع النقل الذكي الجديد', 'تعرف على خطة تحديث شبكة النقل العام في طيبة الإمام وخدماتها الجديدة لسكان المدينة وزوارها.', 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80', 'https://example.com', 1, true),
  ('مهرجان طيبة للإبداع الشبابي', 'فعاليات وأنشطة ثقافية وفنية تستضيفها المدينة طوال الموسم القادم.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', 'https://example.com', 2, true)
on conflict (id) do nothing;
