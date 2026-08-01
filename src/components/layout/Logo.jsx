import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export default function Logo({ className, dark = false, to = '/' }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-gradient-to-br from-gold-500 to-brand-800 shadow-lift">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-cream" fill="currentColor" aria-hidden>
          <path d="M3 21h18v-2H3zM6 18h2V9H6zM11 18h2V6h-2zM16 18h2V11h-2z" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn('font-display text-lg font-extrabold', dark ? 'text-cream' : 'text-brand-900')}>
          {SITE.name}
        </span>
        <span className={cn('text-[10px] font-medium tracking-wide', dark ? 'text-cream/70' : 'text-gold-700')}>
          بوابة المدينة الشاملة
        </span>
      </span>
    </Link>
  );
}
