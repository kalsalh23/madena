import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import SearchBar from '@/components/ui/SearchBar';
import { SkeletonList } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import NewsCard from '@/components/news/NewsCard';
import { api } from '@/services';
import { useDebounce, useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';

const PER_PAGE = 9;

export default function NewsListPage() {
  useDocumentTitle('الأخبار');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search, 400);

  const { data: categories } = useQuery({
    queryKey: ['news-categories'],
    queryFn: () => api.list('categories', { filters: { type: 'news' }, order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['news-list', category, debounced, page],
    queryFn: () =>
      api.list('news', {
        filters: category !== 'all' ? { category_id: category } : {},
        search: debounced,
        searchFields: ['title', 'excerpt'],
        order: 'published_at',
        perPage: PER_PAGE,
        page,
      }),
  });

  const totalPages = data?.count ? Math.ceil(data.count / PER_PAGE) : 0;

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">آخر المستجدات</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">الأخبار</h1>
          <div className="w-full max-w-md">
            <SearchBar size="sm" placeholder="ابحث في الأخبار..." />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setCategory('all');
              setPage(1);
            }}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              category === 'all' ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
            )}
          >
            الكل
          </button>
          {(categories || []).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.id);
                setPage(1);
              }}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                category === c.id ? 'bg-brand-800 text-cream shadow-lift' : 'bg-white text-ink-100 hover:bg-brand-50'
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <SkeletonList count={6} />
        ) : !data?.data?.length ? (
          <EmptyState title="لا توجد أخبار مطابقة" description="جرّب كلمة بحث أخرى أو تصفية مختلفة." />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
            <Pagination className="mt-10" page={page} pageCount={totalPages} onPageChange={setPage} />
          </>
        )}
      </Container>
    </div>
  );
}
