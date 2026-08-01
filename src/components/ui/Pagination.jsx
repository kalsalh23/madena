import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Pagination({ page, pageCount, onPageChange, className }) {
  if (pageCount <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pageCount, page + 2);
  for (let i = start; i <= end; i += 1) pages.push(i);

  const btn =
    'flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-sm font-semibold transition-colors';

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        className={cn(btn, 'border border-[#E5E7EB] bg-white text-ink-100 hover:border-brand-300')}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="السابق"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      {start > 1 && (
        <>
          <button className={cn(btn, 'text-ink-100 hover:bg-brand-50')} onClick={() => onPageChange(1)}>
            1
          </button>
          {start > 2 && <span className="px-1 text-ink-100">…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            btn,
            p === page
              ? 'bg-brand-800 text-cream shadow-lift'
              : 'border border-[#E5E7EB] bg-white text-ink-100 hover:border-brand-300'
          )}
        >
          {p}
        </button>
      ))}
      {end < pageCount && (
        <>
          {end < pageCount - 1 && <span className="px-1 text-ink-100">…</span>}
          <button className={cn(btn, 'text-ink-100 hover:bg-brand-50')} onClick={() => onPageChange(pageCount)}>
            {pageCount}
          </button>
        </>
      )}
      <button
        className={cn(btn, 'border border-[#E5E7EB] bg-white text-ink-100 hover:border-brand-300')}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="التالي"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
}
