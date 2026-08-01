import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-5 bg-[#F8FAFC] px-4 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-800 text-gold-400">
        <Compass className="h-10 w-10" />
      </span>
      <h1 className="font-display text-6xl font-black text-brand-900">404</h1>
      <p className="max-w-sm text-ink-100">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="btn-primary">العودة للرئيسية</Link>
    </div>
  );
}
