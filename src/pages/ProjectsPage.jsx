import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import { SkeletonList } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import ProjectCard from '@/components/projects/ProjectCard';
import { api } from '@/services';
import { useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';

const statuses = [
  { value: 'all', label: 'الكل' },
  { value: 'ongoing', label: 'جاري التنفيذ' },
  { value: 'planned', label: 'مخطط' },
  { value: 'completed', label: 'مكتمل' },
];

export default function ProjectsPage() {
  useDocumentTitle('المشاريع');
  const [status, setStatus] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['projects', status],
    queryFn: () =>
      api.list('projects', {
        filters: status !== 'all' ? { status } : {},
        order: 'created_at',
        perPage: 100,
        page: 1,
      }).then((r) => r.data),
  });

  const ongoingCount = (data || []).filter((p) => p.status === 'ongoing').length;

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">نهضة عمرانية</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">المشاريع التنموية</h1>
          <p className="max-w-xl text-ink-100">
            تعرف على أبرز المشاريع التي تشهدها المدينة مع نسب الإنجاز وآخر التحديثات.
            {ongoingCount > 0 && ` حالياً ${ongoingCount} مشاريع جارية.`}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                status === s.value ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <SkeletonList count={4} />
        ) : !data?.length ? (
          <EmptyState title="لا توجد مشاريع" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((p) => (
              <ProjectCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
