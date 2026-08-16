-- ============================================================
-- إشعارات الدفع: جدول اشتراكات المتصفحات (Web Push)
-- ============================================================

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- RLS: يسمح للجميع بالإدراج والحذف (المتصفح غير مسجّل الدخول)
alter table public.push_subscriptions enable row level security;

-- ضرورية لعمليات upsert (onConflict) والتحقق من الاشتراك وتجديده
drop policy if exists "public_select_push" on public.push_subscriptions;
create policy "public_select_push" on public.push_subscriptions
  for select using (true);

drop policy if exists "public_insert_push" on public.push_subscriptions;
create policy "public_insert_push" on public.push_subscriptions
  for insert with check (true);

drop policy if exists "public_update_push" on public.push_subscriptions;
create policy "public_update_push" on public.push_subscriptions
  for update using (true) with check (true);

drop policy if exists "public_delete_push" on public.push_subscriptions;
create policy "public_delete_push" on public.push_subscriptions
  for delete using (true);

-- يقرأها فقط دالة الإرسال عبر Service Role
