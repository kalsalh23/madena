import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Play, X, Clock3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Modal from '@/components/ui/Modal';
import { api } from '@/services';
import { useDocumentTitle } from '@/hooks';
import { formatDuration } from '@/lib/utils';

export default function VideosPage() {
  useDocumentTitle('الفيديوهات');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('v');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(activeId);
  }, [activeId]);

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => api.list('videos', { order: 'created_at', perPage: 100, page: 1 }).then((r) => r.data),
  });

  const close = () => {
    setSelected(null);
    setSearchParams({});
  };

  const current = videos?.find((v) => v.id === selected);

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">فيديوهات</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">جولات وتقارير مصورة</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-56 rounded-xl2" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos?.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelected(v.id);
                  setSearchParams({ v: v.id });
                }}
                className="card-surface group relative overflow-hidden text-right hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback src={v.thumbnail} alt={v.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-950/30 transition-colors group-hover:bg-brand-950/45">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lift transition-transform group-hover:scale-110">
                      <Play className="h-7 w-7 fill-current" />
                    </span>
                  </span>
                  {v.duration > 0 && (
                    <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-brand-950/85 px-2 py-0.5 text-xs font-bold text-cream">
                      <Clock3 className="h-3 w-3" />
                      {formatDuration(v.duration)}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-ink-900 group-hover:text-brand-700">{v.title}</h3>
                  {v.description && <p className="mt-1 line-clamp-2 text-sm text-ink-100">{v.description}</p>}
                </div>
              </button>
            ))}
          </div>
        )}

        <Modal
          open={Boolean(current)}
          onClose={close}
          title={current?.title}
          size="xl"
        >
          {current && (
            <div>
              <div className="overflow-hidden rounded-xl2 bg-black">
                {current.video_url?.includes('youtube') || current.video_url?.includes('youtu.be') ? (
                  <iframe
                    src={current.video_url}
                    title={current.title}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={current.video_url} controls autoPlay className="aspect-video w-full" poster={current.thumbnail} />
                )}
              </div>
              <p className="mt-4 leading-7 text-ink-100">{current.description}</p>
            </div>
          )}
        </Modal>
      </Container>
    </div>
  );
}
