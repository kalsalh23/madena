import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Mail, MapPin, User, Instagram, Facebook } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useSettings } from '@/contexts/SettingsContext';
import { SITE } from '@/lib/constants';

const features = [
  'نشر وإدارة الأخبار والمشاريع والفعاليات بشكل فوري',
  'دليل شامل للأماكن والخدمات مع خرائط تفاعلية',
  'فيديوهات ومحتوى مصور لمدينة طيبة الإمام',
  'لوحة إحصائيات محدثة وإعلان مخصص للزوار',
  'بيئة مؤمّنة بصلاحيات إدارية كاملة',
];

const socials = [
  { href: 'https://www.instagram.com/kosai_al_saleh?igsh=cWM0dzEzaThqN2sz', label: 'انستغرام', icon: Instagram, hover: 'hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]' },
  { href: 'https://www.facebook.com/share/17m6YZ1NKS/', label: 'فيسبوك', icon: Facebook, hover: 'hover:bg-[#1877F2]' },
];

export default function AboutPlatform() {
  const { settings } = useSettings();

  return (
    <section className="bg-white py-16">
      <Container className="max-w-[1600px] px-3 sm:px-4 lg:px-6">
        <SectionHeading eyebrow="عن المنصة" title="تعرف على منصتنا" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="card-surface overflow-hidden"
        >
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
            <div className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-b from-brand-800 to-brand-950 px-6 py-8 text-center shadow-soft ring-1 ring-black/5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <User className="h-7 w-7 text-gold-400" />
              </span>
              <span className="text-lg font-bold leading-tight text-white">{settings.developer_name}</span>
              <a
                href="tel:+963952639157"
                dir="ltr"
                className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-center text-sm font-bold text-brand-950 shadow-soft transition hover:bg-gold-400"
              >
                <Phone className="h-4 w-4" />
                +963 952 639 157
              </a>
              <div className="mt-1 flex items-center gap-3">
                {socials.map(({ href, label, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:text-white ${hover}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
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
                  <MapPin className="h-5 w-5 shrink-0 text-brand-700" />
                  <span className="font-semibold text-ink-900">{settings.contact_address}</span>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
