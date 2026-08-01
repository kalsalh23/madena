import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import SearchBar from '@/components/ui/SearchBar';
import { SkeletonList } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import PlaceCard from '@/components/places/PlaceCard';
import { api } from '@/services';
import { useDebounce, useDocumentTitle } from '@/hooks';
import { resolveIcon } from '@/lib/iconMap';
import { cn } from '@/lib/utils';

export default function PlacesPage() {
  useDocumentTitle('دليل المدينة');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 400);

  const { data: categories } = useQuery({
    queryKey: ['place-categories'],
    queryFn: () => api.list('categories', { filters: { type: 'places' }, order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['places', category, debounced],
    queryFn: () =>
      api.list('places', {
        filters: category !== 'all' ? { category_id: category } : {},
        search: debounced,
        searchFields: ['name', 'description', 'address'],
        order: 'is_featured',
        perPage: 100,
        page: 1,
      }).then((r) => r.data),
  });

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">دليل المدينة</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">دليل الأماكن والخدمات</h1>
          <p className="max-w-xl text-ink-100">
            ابحث عن المدارس، المشافي، المطاعم، الحدائق وكل ما تحتاجه في مدينتك.
          </p>
          <div className="w-full max-w-md">
            <SearchBar size="sm" placeholder="ابحث عن مكان..." />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategory('all')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              category === 'all' ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
            )}
          >
            جميع الأماكن
          </button>
          {(categories || []).map((c) => {
            const Icon = resolveIcon(c.icon);
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  category === c.id ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {c.name}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <SkeletonList count={8} />
        ) : !data?.length ? (
          <EmptyState title="لا توجد أماكن مطابقة" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((p) => (
              <PlaceCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
