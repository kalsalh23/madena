import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Newspaper, Building2, Map, Image as ImageIcon, Play,
  CalendarDays, BarChart3, FileText, Handshake, Settings as SettingsIcon,
  LogOut, Menu, X, ExternalLink,
} from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard, end: true },
  { to: '/admin/news', label: 'الأخبار', icon: Newspaper },
  { to: '/admin/projects', label: 'المشاريع', icon: Building2 },
  { to: '/admin/places', label: 'الأماكن', icon: Map },
  { to: '/admin/gallery', label: 'الصور', icon: ImageIcon },
  { to: '/admin/videos', label: 'الفيديوهات', icon: Play },
  { to: '/admin/events', label: 'الفعاليات', icon: CalendarDays },
  { to: '/admin/statistics', label: 'الإحصائيات', icon: BarChart3 },
  { to: '/admin/pages', label: 'الصفحات', icon: FileText },
  { to: '/admin/partners', label: 'الشركاء', icon: Handshake },
  { to: '/admin/settings', label: 'إعدادات الموقع', icon: SettingsIcon },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-950/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-brand-950 text-cream transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Logo dark />
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-cream/70 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-gold-500 text-brand-950 shadow-lift'
                    : 'text-cream/75 hover:bg-white/10 hover:text-white'
                )
              }
            >
              <n.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 font-display font-bold text-brand-950">
              {profile?.name?.[0] || user?.email?.[0] || 'م'}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{profile?.name || 'إداري'}</p>
              <p className="truncate text-xs text-cream/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-cream hover:bg-white/15"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              عرض الموقع
            </a>
            <button
              onClick={handleLogout}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-wine-700 px-3 py-2 text-xs font-bold text-white hover:bg-wine-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              خروج
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ink-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="hidden text-sm font-semibold text-ink-100 sm:block">لوحة إدارة مدينتي</h2>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
            {profile?.role || 'admin'}
          </span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
