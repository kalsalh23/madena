import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Eye, ChevronRight, Play } from 'lucide-react';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { SkeletonCard } from '@/components/ui/Skeleton';
import NewsCard from '@/components/news/NewsCard';
import { api } from '@/services';
import { formatDate } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { data: item, isLoading } = useQuery({
    queryKey: ['news', slug],
    queryFn: () => api.getBySlug('news', slug).then((r) => r.data),
  });

  const { data: related } = useQuery({
    queryKey: ['news-related', item?.category_id, item?.id],
    queryFn: () =>
      api
        .list('news', {
          filters: item?.category_id ? { category_id: item.category_id } : {},
          perPage: 3,
          page: 1,
        })
        .then((r) => r.data.filter((n) => n.id !== item.id)),
    enabled: Boolean(item),
  });

  useSEO({
    title: item?.title,
    description: item?.excerpt,
    image: item?.cover,
    type: 'article',
  });

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <Container className="max-w-4xl">
          <div className="skeleton mb-4 h-8 w-2/3" />
          <div className="skeleton h-[380px] w-full rounded-xl2" />
        </Container>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-28 pb-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink-900">الخبر غير موجود</h1>
          <Link to="/news" className="btn-ghost mt-4">العودة للأخبار</Link>
        </Container>
      </div>
    );
  }

  const embedVideo = item.video_url?.includes('youtube') || item.video_url?.includes('youtu.be');

  return (
    <div className="pt-28 pb-16">
      <Container className="max-w-4xl">
        <nav className="mb-4 flex items-center gap-1 text-sm text-ink-100">
          <Link to="/" className="hover:text-brand-700">الرئيسية</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/news" className="hover:text-brand-700">الأخبار</Link>
        </nav>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          {item.category && <Badge tone="gold">{item.category.name}</Badge>}
          <span className="flex items-center gap-1.5 text-xs text-ink-100">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(item.published_at)}
          </span>
          {item.author && (
            <span className="flex items-center gap-1.5 text-xs text-ink-100">
              <User className="h-3.5 w-3.5" /> {item.author}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-ink-100">
            <Eye className="h-3.5 w-3.5" /> {item.views?.toLocaleString('ar-SA')} مشاهدة
          </span>
        </div>

        <h1 className="mb-6 font-display text-3xl font-black leading-snug text-ink-900 sm:text-4xl">
          {item.title}
        </h1>

        <div className="mb-8 overflow-hidden rounded-xl3 shadow-soft">
          <ImageWithFallback src={item.cover} alt={item.title} className="h-[380px] w-full" />
        </div>

        {item.video_url && (
          <div className="mb-8 overflow-hidden rounded-xl3 shadow-soft">
            {embedVideo ? (
              <iframe
                src={item.video_url}
                title={item.title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={item.video_url} controls className="aspect-video w-full" poster={item.cover} />
            )}
          </div>
        )}

        <article
          className="prose-content rounded-xl2 border border-[#E5E7EB] bg-white p-6 shadow-soft sm:p-8"
          dangerouslySetInnerHTML={{ __html: item.content || '<p></p>' }}
        />

        {related?.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-ink-900">أخبار مرتبطة</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
