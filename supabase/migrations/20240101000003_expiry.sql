-- ============================================================
-- انتهاء صلاحية المحتوى: عمود expires_at + حذف تلقائي
-- ============================================================

-- 1) عمود الانتهاء لجداول المحتوى
alter table public.news       add column if not exists expires_at timestamptz;
alter table public.projects   add column if not exists expires_at timestamptz;
alter table public.places     add column if not exists expires_at timestamptz;
alter table public.events     add column if not exists expires_at timestamptz;
alter table public.gallery    add column if not exists expires_at timestamptz;
alter table public.videos     add column if not exists expires_at timestamptz;
alter table public.statistics add column if not exists expires_at timestamptz;
alter table public.pages      add column if not exists expires_at timestamptz;

-- 2) دالة حذف المحتوى المنتهي
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

  select nullif(value, '')::timestamptz into ad_exp from public.settings where key = 'ad_expires_at';
  if ad_exp is not null and ad_exp < now() then
    update public.settings set value = '0' where key = 'ad_enabled';
    update public.settings set value = '' where key in ('ad_title', 'ad_text', 'ad_image', 'ad_link', 'ad_expires_at');
  end if;
end;
$$;

-- 3) جدولة التشغيل يومياً
create extension if not exists pg_cron;
do $$
begin
  if not exists (select 1 from cron.job where jobname = 'delete-expired-content') then
    perform cron.schedule('delete-expired-content', '0 3 * * *', $job$select public.delete_expired_content()$job$);
  end if;
end;
$$;

-- 4) استبعاد المنتهي من إحصائيات النظرة العامة
create or replace view public.city_overview_stats as
select
  (select count(*) from public.news where is_published and (expires_at is null or expires_at > now())) as news_count,
  (select count(*) from public.projects where is_published and (expires_at is null or expires_at > now())) as projects_count,
  (select count(*) from public.places where is_published and (expires_at is null or expires_at > now())) as places_count,
  (select count(*) from public.events where is_published and (expires_at is null or expires_at > now())) as events_count,
  (select count(*) from public.gallery where (expires_at is null or expires_at > now())) as gallery_count,
  (select count(*) from public.videos where is_published and (expires_at is null or expires_at > now())) as videos_count,
  (select count(*) from public.partners where is_published) as partners_count;
