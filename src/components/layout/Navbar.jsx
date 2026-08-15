import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import Container from '@/components/ui/Container';
import NotificationBell from './NotificationBell';
import { cn } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/news', label: 'الأخبار' },
  { to: '/projects', label: 'المشاريع' },
  { to: '/places', label: 'دليل المدينة' },
  { to: '/map', label: 'الخريطة' },
  { to: '/videos', label: 'الفيديوهات' },
  { to: '/events', label: 'الفعاليات' },
  { to: '/statistics', label: 'الإحصائيات' },
  { to: '/about-platform', label: 'عن المنصة' },
];

const externalLinks = [
  { href: 'https://dalil-altaybeh.vercel.app', label: 'دليلك الطبي' },
  { href: 'https://iblaghtaybeh.vercel.app', label: 'إبلاغات الطيبة' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-white/90 shadow-soft backdrop-blur-lg'
          : 'bg-gradient-to-b from-brand-950/70 to-transparent'
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Logo dark={!scrolled && isHome} />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? scrolled || !isHome
                      ? 'bg-brand-50 text-brand-800'
                      : 'bg-white/15 text-white'
                    : scrolled || !isHome
                      ? 'text-ink-100 hover:bg-brand-50 hover:text-brand-800'
                      : 'text-cream/85 hover:bg-white/10 hover:text-white'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          {externalLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors',
                scrolled || !isHome
                  ? 'bg-gold-500 text-brand-950 hover:bg-gold-600'
                  : 'bg-white/15 text-white hover:bg-white/25'
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NotificationBell dark={!scrolled && isHome} />
          {settings.contact_phone && (
            <a
              href={`tel:${settings.contact_phone}`}
              className={cn(
                'flex items-center gap-2 text-sm font-semibold transition-colors',
                scrolled || !isHome ? 'text-brand-800' : 'text-white'
              )}
            >
              <Phone className="h-4 w-4" />
              {settings.contact_phone}
            </a>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <NotificationBell dark={!scrolled && isHome} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2"
            aria-label="القائمة"
          >
          {open ? (
            <X className={cn('h-6 w-6 transition-colors', scrolled || !isHome ? 'text-brand-900' : 'text-white')} />
          ) : (
            <Menu className={cn('h-6 w-6 transition-colors', scrolled || !isHome ? 'text-brand-900' : 'text-white')} />
          )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#E5E7EB] bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-sm font-semibold',
                      isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-100 hover:bg-brand-50'
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {externalLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center rounded-xl2 bg-gold-500 px-4 py-3 text-sm font-bold text-brand-950 hover:bg-gold-600"
                >
                  {l.label}
                </a>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
