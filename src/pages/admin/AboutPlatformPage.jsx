import { Info, Globe, Phone, Mail, MapPin, User, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useSEO } from '@/hooks/useSEO';
import { SITE } from '@/lib/constants';

const features = [
  'نشر وإدارة الأخبار والمشاريع والفعاليات بشكل فوري',
  'دليل شامل للأماكن والخدمات مع خرائط تفاعلية',
  'فيديوهات ومحتوى مصور لمدينة طيبة الإمام',
  'لوحة إحصائيات محدثة وإعلان مخصص للزوار',
  'بيئة مؤمّنة بصلاحيات إدارية كاملة',
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
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/5">
            <img src={SITE.logo} alt={SITE.name} className="h-full w-full object-cover" />
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

          <h3 className="mt-8 mb-4 text-base font-bold text-ink-900">مطور المنصة</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
              <User className="h-5 w-5 shrink-0 text-brand-700" />
              <span className="font-semibold text-ink-900">{settings.developer_name}</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
              <Phone className="h-5 w-5 shrink-0 text-brand-700" />
              <a href={`tel:${settings.developer_phone}`} dir="ltr" className="font-semibold text-ink-900">{settings.developer_phone}</a>
            </li>
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
