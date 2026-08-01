-- ============================================================
-- مدينتي — سياسات الأمان RLS
-- الزوار: قراءة فقط. الإداريون: كامل الصلاحيات.
-- ============================================================

-- helper: الإداري المعتمد = مستخدم مصادق موجود في جدول admins
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where a.user_id = auth.uid() and a.is_active
  );
$$;

-- تمكين RLS
alter table public.categories enable row level security;
alter table public.news enable row level security;
alter table public.projects enable row level security;
alter table public.project_updates enable row level security;
alter table public.places enable row level security;
alter table public.events enable row level security;
alter table public.gallery enable row level security;
alter table public.videos enable row level security;
alter table public.statistics enable row level security;
alter table public.pages enable row level security;
alter table public.partners enable row level security;
alter table public.settings enable row level security;
alter table public.admins enable row level security;

-- ============================================================
-- سياسات عامة: قراءة عامة لكل شيء
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'categories','news','projects','project_updates','places','events',
    'gallery','videos','statistics','pages','partners','settings','admins'
  ]
  loop
    execute format('create policy "public_read_%s" on public.%I for select using (true);', t, t);
  end loop;
end $$;

-- ============================================================
-- سياسات الكتابة: للإداريين فقط
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'categories','news','projects','project_updates','places','events',
    'gallery','videos','statistics','pages','partners','settings'
  ]
  loop
    execute format('create policy "admin_write_%s" on public.%I for all using (public.is_admin()) with check (public.is_admin());', t, t);
  end loop;
end $$;

-- admins: يمكن للمستخدم إنشاء سجل نفسه فقط (عند إضافة أول إداري عبر supabase)
create policy "admins_self_insert" on public.admins
  for insert with check (user_id = auth.uid());
create policy "admins_admin_manage" on public.admins
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- Storage: باكت media عام القراءة، الكتابة للمصادق فقط
-- ============================================================
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media_auth_upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "media_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
create policy "media_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
