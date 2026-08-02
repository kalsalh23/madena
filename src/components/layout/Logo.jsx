import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export default function Logo({ className, dark = false, to = '/' }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl2 bg-white shadow-lift ring-1 ring-black/5">
        <img src={SITE.logo} alt={SITE.name} className="h-full w-full object-cover" />
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
