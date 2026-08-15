import { Link } from 'react-router-dom';
import {
  Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Code2,
  Newspaper, Building2, Map, Play, CalendarDays, BarChart3,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Logo from './Logo';
import { useSettings } from '@/contexts/SettingsContext';

const quickLinks = [
  { to: '/news', label: 'الأخبار', icon: Newspaper },
  { to: '/projects', label: 'المشاريع', icon: Building2 },
  { to: '/places', label: 'دليل المدينة', icon: Map },
  { to: '/videos', label: 'الفيديوهات', icon: Play },
  { to: '/events', label: 'الفعاليات', icon: CalendarDays },
  { to: '/statistics', label: 'الإحصائيات', icon: BarChart3 },
];

const socials = [
  { key: 'social_facebook', icon: Facebook },
  { key: 'social_twitter', icon: Twitter },
  { key: 'social_instagram', icon: Instagram },
  { key: 'social_youtube', icon: Youtube },
];

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 bg-brand-950 text-cream">
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm leading-7 text-cream/70">{settings.site_description}</p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ key, icon: Icon }) => {
              const href = settings[key];
              if (!href) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cream/80 transition-all hover:bg-gold-500 hover:text-brand-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-gold-400">روابط سريعة</h3>
          <ul className="space-y-2.5">
            {quickLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-gold-400"
                >
                  <Icon className="h-4 w-4 text-gold-500/70" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-gold-400">أقسام الموقع</h3>
          <ul className="space-y-2.5">
            <li>
              <Link to="/about" className="text-sm text-cream/75 hover:text-gold-400">عن المدينة</Link>
            </li>
            <li>
              <Link to="/about-platform" className="text-sm text-cream/75 hover:text-gold-400">عن المنصة</Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-cream/75 hover:text-gold-400">اتصل بنا</Link>
            </li>
            <li>
              <Link to="/search" className="text-sm text-cream/75 hover:text-gold-400">البحث</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-gold-400">تواصل معنا</h3>
          <ul className="space-y-3 text-sm text-cream/75">
            {settings.contact_phone && (
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-500/70" />
                <a href={`tel:${settings.contact_phone}`} dir="ltr">{settings.contact_phone}</a>
              </li>
            )}
            {settings.contact_email && (
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-500/70" />
                <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
              </li>
            )}
            {settings.contact_address && (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" />
                {settings.contact_address}
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-cream/50 sm:flex-row">
          <p>{settings.footer_text}</p>
          <p className="flex items-center gap-1.5">
            <span>صُنع بحب لخدمة أهالي المدينة ✦</span>
          </p>
        </Container>
        <Container className="mt-2 flex flex-col items-center justify-center gap-1 text-xs text-cream/50 sm:flex-row sm:gap-2">
          <span className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-gold-500/70" />
            تطوير: {settings.developer_name}
          </span>
          <span className="hidden sm:inline">•</span>
          <a href={`tel:${settings.developer_phone}`} className="flex items-center gap-1.5 hover:text-gold-400">
            <Phone className="h-3.5 w-3.5 text-gold-500/70" />
            <span dir="ltr">{settings.developer_phone}</span>
          </a>
        </Container>
      </div>
    </footer>
  );
}
