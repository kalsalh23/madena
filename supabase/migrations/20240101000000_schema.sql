-- ============================================================
-- مدينتي — قاعدة البيانات الأساسية
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- admins : الإداريون (يرتبط مع auth.users)
-- ------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete cascade,
  name text not null default '',
  role text not null default 'admin' check (role in ('admin', 'editor', 'super_admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- categories : التصنيفات الموحدة
-- ------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  type text not null check (type in ('news','projects','places','events','gallery','videos')),
  icon text,
  color text default '#054239',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- news : الأخبار
-- ------------------------------------------------------------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text default '',
  cover text,
  images text[] default '{}',
  video_url text,
  category_id uuid references public.categories (id) on delete set null,
  author text default '',
  published_at timestamptz default now(),
  is_published boolean not null default true,
  views int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- projects : المشاريع
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default '',
  images text[] default '{}',
  agency text default '',
  start_date date,
  end_date date,
  progress int not null default 0 check (progress between 0 and 100),
  budget text default '',
  latitude double precision,
  longitude double precision,
  status text not null default 'ongoing' check (status in ('planned','ongoing','completed')),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- project_updates : آخر تحديثات المشاريع
-- ------------------------------------------------------------
create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  body text,
  image text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- places : دليل الأماكن
-- ------------------------------------------------------------
create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default '',
  images text[] default '{}',
  category_id uuid references public.categories (id) on delete set null,
  phone text,
  website text,
  address text,
  working_hours text,
  latitude double precision,
  longitude double precision,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- events : الفعاليات
-- ------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text default '',
  images text[] default '{}',
  category_id uuid references public.categories (id) on delete set null,
  start_date timestamptz not null,
  end_date timestamptz,
  location text,
  latitude double precision,
  longitude double precision,
  organizer text default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- gallery : معرض الصور
-- ------------------------------------------------------------
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  description text default '',
  image_url text not null,
  category_id uuid references public.categories (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- videos : الفيديوهات
-- ------------------------------------------------------------
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  video_url text not null,
  thumbnail text,
  category_id uuid references public.categories (id) on delete set null,
  duration int default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- statistics : الإحصائيات
-- ------------------------------------------------------------
create table if not exists public.statistics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value int not null default 0,
  icon text default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- pages : الصفحات الديناميكية
-- ------------------------------------------------------------
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- partners : شركاء المدينة
-- ------------------------------------------------------------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text,
  website text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- settings : إعدادات الموقع
-- ------------------------------------------------------------
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text default '',
  type text not null default 'text',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
create index if not exists idx_news_category on public.news (category_id);
create index if not exists idx_news_published on public.news (is_published, published_at desc);
create index if not exists idx_projects_published on public.projects (is_published, created_at desc);
create index if not exists idx_places_category on public.places (category_id);
create index if not exists idx_places_published on public.places (is_published);
create index if not exists idx_places_featured on public.places (is_featured) where is_featured;
create index if not exists idx_events_dates on public.events (start_date, end_date);
create index if not exists idx_events_published on public.events (is_published);
create index if not exists idx_gallery_created on public.gallery (created_at desc);
create index if not exists idx_videos_published on public.videos (is_published);
create index if not exists idx_updates_project on public.project_updates (project_id, created_at desc);
create index if not exists idx_categories_type on public.categories (type, sort_order);

-- ------------------------------------------------------------
-- Views
-- ------------------------------------------------------------
create or replace view public.city_overview_stats as
select
  (select count(*) from public.news where is_published) as news_count,
  (select count(*) from public.projects where is_published) as projects_count,
  (select count(*) from public.places where is_published) as places_count,
  (select count(*) from public.events where is_published) as events_count,
  (select count(*) from public.gallery) as gallery_count,
  (select count(*) from public.videos where is_published) as videos_count,
  (select count(*) from public.partners where is_published) as partners_count;
