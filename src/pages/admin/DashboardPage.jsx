import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Newspaper, Building2, Map, Image as ImageIcon, Play, CalendarDays,
  Users, ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/services';
import { formatNumber } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const cards = [
  { label: 'الأخبار', entity: 'news', icon: Newspaper, to: '/admin/news' },
  { label: 'المشاريع', entity: 'projects', icon: Building2, to: '/admin/projects' },
  { label: 'الأماكن', entity: 'places', icon: Map, to: '/admin/places' },
  { label: 'الصور', entity: 'gallery', icon: ImageIcon, to: '/admin/gallery' },
  { label: 'الفيديوهات', entity: 'videos', icon: Play, to: '/admin/videos' },
  { label: 'الفعاليات', entity: 'events', icon: CalendarDays, to: '/admin/events' },
];

export default function DashboardPage() {
  useSEO({ title: 'لوحة التحكم' });

  const { data: overview } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: () => api.overview().then((r) => r.data),
  });

  const { data: latestNews } = useQuery({
    queryKey: ['admin-latest-news'],
    queryFn: () => api.list('news', { order: 'published_at', perPage: 5, page: 1 }).then((r) => r.data),
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink-900">لوحة التحكم</h1>
          <p className="text-xs text-ink-100">نظرة سريعة على محتوى الموقع</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.entity}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={c.to} className="card-surface block p-5 text-center hover:-translate-y-1 hover:shadow-lift">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
                <c.icon className="h-5 w-5" />
              </span>
              <div className="font-display text-2xl font-extrabold text-brand-900">
                {formatNumber(overview?.[`${c.entity}_count`])}
              </div>
              <div className="text-xs font-semibold text-ink-100">{c.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-ink-900">أحدث الأخبار</h2>
            <Link to="/admin/news" className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-900">
              الكل <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestNews?.map((n) => (
              <Link
                key={n.id}
                to="/admin/news"
                className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 transition-colors hover:bg-brand-50/50"
              >
                <img src={n.cover} alt="" className="h-12 w-16 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">{n.title}</p>
                  <p className="text-xs text-ink-100">
                    {n.category?.name} · {n.views?.toLocaleString('ar-SA')} مشاهدة
                  </p>
                </div>
              </Link>
            ))}
            {!latestNews?.length && <p className="py-6 text-center text-sm text-ink-100">لا توجد أخبار بعد</p>}
          </div>
        </div>

        <div className="card-surface p-6">
          <h2 className="mb-4 text-base font-bold text-ink-900">إرشادات سريعة</h2>
          <ul className="space-y-3 text-sm leading-7 text-ink-100">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
              أضف المحتوى من القائمة الجانبية لكل قسم (أخبار، مشاريع، أماكن...).
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
              ارفع الصور مباشرة من النماذج، وتخزن تلقائياً في Supabase Storage.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
              تحكم بظهور كل عنصر عبر زر «النشر/الإخفاء» في الجدول.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
              عدّل بيانات الموقع الأساسية (الشعار، الهاتف، السوشيال) من «إعدادات الموقع».
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
