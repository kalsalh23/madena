import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { api } from '@/services';
import { formatDuration } from '@/lib/utils';

export default function LatestVideos() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ['home-videos'],
    queryFn: () => api.list('videos', { order: 'created_at', perPage: 3, page: 1 }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="فيديوهات"
          title="جولات وتقارير مصورة"
          action={
            <Link to="/videos" className="btn-ghost">
              كل الفيديوهات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-56 rounded-xl2" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {videos?.map((v) => (
              <Link
                key={v.id}
                to={`/videos?v=${v.id}`}
                className="card-surface group relative overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={v.thumbnail}
                    alt={v.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-950/30 transition-colors group-hover:bg-brand-950/45">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lift transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </span>
                  {v.duration > 0 && (
                    <span className="absolute bottom-3 left-3 rounded-lg bg-brand-950/85 px-2 py-0.5 text-xs font-bold text-cream">
                      {formatDuration(v.duration)}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-ink-900 group-hover:text-brand-700">{v.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
