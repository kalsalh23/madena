import { Info, Globe, Layers, Database, ShieldCheck, Rocket, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useSEO } from '@/hooks/useSEO';
import { SITE } from '@/lib/constants';

const features = [
  'نشر وإدارة الأخبار والمشاريع والفعاليات بشكل فوري',
  'دليل شامل للأماكن والخدمات مع خرائط تفاعلية',
  'معرض صور وفيديوهات لمدينة طيبة الإمام',
  'لوحة إحصائيات محدثة وإعلان مخصص للزوار',
  'بيئة مؤمّنة بصلاحيات إدارية كاملة',
];

const stack = [
  { icon: Layers, name: 'React + Vite', role: 'واجهة الموقع' },
  { icon: Database, name: 'Supabase (PostgreSQL)', role: 'قاعدة البيانات والتخزين' },
  { icon: ShieldCheck, name: 'Row Level Security', role: 'حماية البيانات' },
  { icon: Rocket, name: 'Vercel', role: 'الاستضافة والنشر التلقائي' },
];

export default function AboutPlatformPage() {
  useSEO({ title: 'عن المنصة' });
  const { settings } = useSettings();

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
          <Info className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink-900">عن المنصة</h1>
          <p className="text-xs text-ink-100">معلومات عامة عن منصة {SITE.name}</p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="flex flex-col items-center gap-5 bg-brand-900 px-6 py-10 text-center sm:flex-row sm:text-right">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-brand-700 shadow-lift">
            <Globe className="h-10 w-10 text-cream" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-black text-cream">{settings.site_name || SITE.name}</h2>
            <p className="mt-1 text-sm text-cream/75">{settings.site_tagline || SITE.tagline}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-7 text-ink-100">
            {settings.about_us ||
              'منصة إلكترونية شاملة تقدم كل ما يخص المدينة من أخبار ومشاريع وأماكن وفعاليات، مع لوحة تحكم متكاملة لإدارة المحتوى بسهولة وأمان.'}
          </p>

          <h3 className="mt-8 mb-4 text-base font-bold text-ink-900">أبرز الإمكانيات</h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm text-ink-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                {f}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 mb-4 text-base font-bold text-ink-900">التقنيات المستخدمة</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s) => (
              <div key={s.name} className="rounded-xl2 border border-[#E5E7EB] p-5 text-center">
                <s.icon className="mx-auto h-6 w-6 text-gold-600" />
                <div className="mt-3 text-sm font-bold text-ink-900">{s.name}</div>
                <div className="mt-1 text-xs text-ink-100">{s.role}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-8 mb-4 text-base font-bold text-ink-900">الدعم الفني</h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {settings.contact_phone && (
              <li className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
                <Phone className="h-5 w-5 text-brand-700" />
                <a href={`tel:${settings.contact_phone}`} dir="ltr" className="font-semibold text-ink-900">{settings.contact_phone}</a>
              </li>
            )}
            {settings.contact_email && (
              <li className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
                <Mail className="h-5 w-5 text-brand-700" />
                <a href={`mailto:${settings.contact_email}`} className="font-semibold text-ink-900">{settings.contact_email}</a>
              </li>
            )}
            {settings.contact_address && (
              <li className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
                <MapPin className="h-5 w-5 text-brand-700" />
                <span className="font-semibold text-ink-900">{settings.contact_address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
