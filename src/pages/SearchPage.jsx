import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import Container from '@/components/ui/Container';
import SearchBar from '@/components/ui/SearchBar';
import NewsCard from '@/components/news/NewsCard';
import ProjectCard from '@/components/projects/ProjectCard';
import PlaceCard from '@/components/places/PlaceCard';
import EventCard from '@/components/events/EventCard';
import { api } from '@/services';
import { useDebounce, useDocumentTitle } from '@/hooks';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const debounced = useDebounce(q, 300);

  useDocumentTitle(debounced ? `بحث: ${debounced}` : 'البحث');

  const { data, isLoading } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => api.searchAll(debounced),
    enabled: debounced.length > 0,
    placeholderData: { news: [], projects: [], places: [], events: [] },
  });

  const hasResults = data && Object.values(data).some((arr) => arr.length > 0);

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">بحث شامل</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">البحث في مدينتي</h1>
          <div className="w-full max-w-xl">
            <SearchBar size="lg" placeholder="ابحث في الأخبار، المشاريع، الأماكن، الفعاليات..." />
          </div>
          {q && !isLoading && (
            <p className="text-sm text-ink-100">
              نتائج البحث عن: <span className="font-bold text-brand-800">«{q}»</span>
            </p>
          )}
        </div>

        {!debounced ? (
          <div className="text-center text-ink-100">ابدأ بكتابة كلمة البحث للعثور على ما تريد.</div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl2" />
            ))}
          </div>
        ) : !hasResults ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <SearchX className="h-12 w-12 text-ink-100/50" />
            <h2 className="text-lg font-bold text-ink-900">لا توجد نتائج</h2>
            <p className="text-sm text-ink-100">جرّب كلمات مفتاحية مختلفة.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {data.news.length > 0 && (
              <section>
                <h2 className="mb-5 text-lg font-bold text-brand-900">الأخبار <span className="text-ink-100">({data.news.length})</span></h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.news.map((n) => <NewsCard key={n.id} item={n} />)}
                </div>
              </section>
            )}
            {data.projects.length > 0 && (
              <section>
                <h2 className="mb-5 text-lg font-bold text-brand-900">المشاريع <span className="text-ink-100">({data.projects.length})</span></h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.projects.map((p) => <ProjectCard key={p.id} item={p} />)}
                </div>
              </section>
            )}
            {data.places.length > 0 && (
              <section>
                <h2 className="mb-5 text-lg font-bold text-brand-900">الأماكن <span className="text-ink-100">({data.places.length})</span></h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.places.map((p) => <PlaceCard key={p.id} item={p} />)}
                </div>
              </section>
            )}
            {data.events.length > 0 && (
              <section>
                <h2 className="mb-5 text-lg font-bold text-brand-900">الفعاليات <span className="text-ink-100">({data.events.length})</span></h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.events.map((e) => <EventCard key={e.id} item={e} />)}
                </div>
              </section>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
