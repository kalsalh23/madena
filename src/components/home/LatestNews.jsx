import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { SkeletonList } from '@/components/ui/Skeleton';
import NewsCard from '@/components/news/NewsCard';
import { api } from '@/services';

export default function LatestNews() {
  const { data: news, isLoading } = useQuery({
    queryKey: ['latest-news'],
    queryFn: () => api.list('news', { order: 'published_at', perPage: 4, page: 1 }).then((r) => r.data),
    staleTime: 60 * 1000,
  });

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="آخر المستجدات"
          title="أحدث الأخبار"
          action={
            <Link to="/news" className="btn-ghost">
              جميع الأخبار
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <SkeletonList count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {news?.map((n, i) => (
              <NewsCard key={n.id} item={n} large={i === 0} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
