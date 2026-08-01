<div align="center">

# مدينتي

**بوابة إلكترونية شاملة للمدينة** — أخبار، مشاريع، دليل أماكن، فعاليات، خرائط تفاعلية وإحصائيات.

![React](https://img.shields.io/badge/React-18-087ea4?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3fcf8e?logo=supabase&logoColor=white)
![RTL](https://img.shields.io/badge/RTL-100%25-054239)

</div>

---

## ✨ المميزات

- **بوابة عامة RTL بالكامل**: أخبار، مشاريع، دليل المدينة (12 تصنيفاً)، خريطة OpenStreetMap، معرض صور مع Lightbox، فيديوهات، فعاليات بعدّاد تنازلي، إحصائيات مع رسوم بيانية، وبحث شامل.
- **لوحة إدارة كاملة**: دخول الإدارة فقط (لا تسجيل زوار)، إدارة كل الأقسام مع رفع الصور لـ Supabase Storage، نشر/إخفاء فوري، وإعدادات الموقع.
- **الأمان**: Row Level Security على كل الجداول (قراءة عامة، كتابة للإداريين فقط).
- **الأداء**: Lazy Loading، Code Splitting، Skeleton Loading، Pagination، وتحسين الصور.
- **SEO**: Meta Tags ديناميكية، Open Graph، Structured Data، Sitemap، Robots.
- **وضع تجريبي (Demo Mode)**: يعمل الموقع فوراً ببيانات تجريبية دون الحاجة لـ Supabase.

## 🎨 الهوية البصرية

| الاستخدام | اللون |
|---|---|
| الأساسي | `#054239` (أخضر داكن فاخر) |
| الثانوي | `#B9A779` (ذهبي) |
| لهجة | `#6B1F2A` (أحمر داكن) |
| الخلفيات | `#F8FAFC` / `#EDEBE0` |
| النصوص | `#161616` / `#3D3A3B` |

## 🧱 التقنيات

- **Frontend**: React 18 · Vite 5 · JavaScript · Tailwind CSS 3 · React Router 6 · React Query 5 · Framer Motion · React Leaflet · Recharts · Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: GitHub · Vercel

## 📁 هيكل المشروع

```
src/
├─ components/   ui/ · layout/ · home/ · news/ · projects/ · places/ · events/ · map/ · admin/
├─ contexts/     Auth · Toast · Settings
├─ hooks/        useDebounce · useInfiniteScroll · useSEO · useCategories ...
├─ lib/          supabase · constants · utils · iconMap · demoData
├─ services/     طبقة API (demo mode تلقائي) · storage
├─ pages/        الصفحات العامة + صفحات الإدارة
├─ types/        توثيق JSDoc
supabase/migrations/  schema.sql · rls.sql · seed.sql
```

## 🚀 التشغيل محلياً

```bash
npm install
npm run dev
```

المشروع يعمل تلقائياً **بوضع تجريبي** ببيانات تجريبية. لربط Supabase:

1. أنشئ مشروعاً على [supabase.com](https://supabase.com).
2. انسخ `.env.example` إلى `.env` وعبّئ القيم:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
3. طبّق قاعدة البيانات:
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-ref>
   npx supabase db push
   ```
   (أو شغّل ملفات `supabase/migrations` من SQL Editor في لوحة Supabase.)
4. أنشئ أول إداري:
   ```sql
   -- من Authentication → Users أنشئ مستخدماً أولاً، ثم:
   insert into public.admins (user_id, name, role)
   values ('<user-uuid>', 'مدير الموقع', 'super_admin');
   ```

## ☁️ النشر على Vercel

المشروع مُربوط بمستودع GitHub `kalsalh23/madena` عبر Vercel، ومتغيرات البيئة (`VITE_SUPABASE_URL`، `VITE_SUPABASE_ANON_KEY`) مُضافة في Vercel.

1. **نشر تلقائي (مُوصى به):** `git push` إلى `main` يبني وينشر تلقائياً.
2. **نشر عبر API (بديل):** إذا لم تستطع الضغط على Git:

   ```powershell
   $env:VERCEL_TOKEN="vcp_..."           # Vercel → Settings → Tokens
   $env:VERCEL_PROJECT_ID="prj_..."      # معرف مشروع Vercel
   node scripts/deploy-vercel.mjs
   ```

3. `vercel.json` جاهز لـ SPA Rewrites و Cache (يُطبق أثناء البناء على Vercel).

## 🛠 الأوامر

| الأمر | الوصف |
|---|---|
| `npm run dev` | خادم التطوير |
| `npm run build` | بناء الإنتاج |
| `npm run preview` | معاينة البناء |

---

صنع بحب ✦ «مدينتي» — جميع الحقوق محفوظة.
