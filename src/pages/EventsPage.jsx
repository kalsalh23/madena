import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import { SkeletonList } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import EventCard from '@/components/events/EventCard';
import { api } from '@/services';
import { useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';

export default function EventsPage() {
  useDocumentTitle('الفعاليات');
  const [tab, setTab] = useState('upcoming');

  const { data, isLoading } = useQuery({
    queryKey: ['events', tab],
    queryFn: () =>
      api.list('events', { order: 'start_date', orderAsc: true, perPage: 100, page: 1 }).then((r) => r.data),
  });

  const now = Date.now();
  const filtered = (data || []).filter((e) =>
    tab === 'upcoming' ? new Date(e.start_date) >= now : new Date(e.start_date) < now
  );

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">تقويم المدينة</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">الفعاليات والمناسبات</h1>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {[
            { value: 'upcoming', label: 'الفعاليات القادمة' },
            { value: 'past', label: 'الفعاليات السابقة' },
          ].map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-bold transition-colors',
                tab === t.value ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <SkeletonList count={4} />
        ) : !filtered.length ? (
          <EmptyState title={tab === 'upcoming' ? 'لا توجد فعاليات قادمة' : 'لا توجد فعاليات سابقة'} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((e) => (
              <EventCard key={e.id} item={e} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
