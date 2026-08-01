import { cn } from '@/lib/utils';

const tones = {
  brand: 'bg-brand-50 text-brand-800 border-brand-200',
  gold: 'bg-gold-50 text-gold-700 border-gold-200',
  wine: 'bg-wine-50 text-wine-600 border-wine-200',
  neutral: 'bg-gray-50 text-gray-600 border-gray-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function Badge({ tone = 'brand', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tones[tone] || tones.brand,
        className
      )}
    >
      {children}
    </span>
  );
}
