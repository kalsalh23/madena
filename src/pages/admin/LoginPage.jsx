import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Loader2, AlertTriangle } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { isDemoMode } from '@/services';
import { useSEO } from '@/hooks/useSEO';
import { ADMIN_BASE_PATH } from '@/lib/constants';

export default function LoginPage() {
  useSEO({ title: 'تسجيل دخول الإدارة' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ADMIN_BASE_PATH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'بيانات الدخول غير صحيحة');
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 p-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/90 to-brand-950" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <Logo dark />
        </div>

        <div className="rounded-xl3 border border-white/10 bg-white/95 p-8 shadow-lift backdrop-blur">
          <h1 className="mb-1 text-center text-2xl font-black text-ink-900">تسجيل الدخول</h1>
          <p className="mb-7 text-center text-sm text-ink-100">الوصول مخصص للإدارة فقط</p>

          {isDemoMode && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-xs leading-6 text-gold-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                وضع العرض التجريبي نشط. أنشئ مشروع Supabase وعبّئ <code dir="ltr">VITE_SUPABASE_URL</code> و
                <code dir="ltr">VITE_SUPABASE_ANON_KEY</code> ثم أنشئ مستخدم إدارة عبر جدول
                <code dir="ltr"> admins</code>.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@madinti.gov.sa"
                required
                className="input"
                dir="ltr"
              />
            </div>
            <div>
              <label className="label">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input"
                dir="ltr"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-wine-50 px-4 py-2.5 text-xs font-semibold text-wine-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              دخول
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-cream/60">
          <Link to="/" className="font-semibold text-gold-400 hover:text-gold-300">← العودة للموقع</Link>
        </p>
      </motion.div>
    </div>
  );
}
