import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { api } from '@/services';
import { useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';

export default function GalleryPage() {
  useDocumentTitle('معرض الصور');
  const [category, setCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const { data: categories } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: () => api.list('categories', { filters: { type: 'gallery' }, order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['gallery', category],
    queryFn: () =>
      api.list('gallery', {
        filters: category !== 'all' ? { category_id: category } : {},
        order: 'created_at',
        perPage: 200,
        page: 1,
      }).then((r) => r.data),
  });

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i > 0 ? i - 1 : data.length - 1));
  const next = () => setLightbox((i) => (i < data.length - 1 ? i + 1 : 0));

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">معرض الصور</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">جمال مدينتنا في صور</h1>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategory('all')}
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
              onClick={() => setCategory(c.id)}
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-56 rounded-xl2" />
            ))}
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 [&>*]:mb-4">
            {data?.map((g, i) => (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-xl2 shadow-soft"
              >
                <ImageWithFallback src={g.image_url} alt={g.title} className="w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4 text-right">
                    {g.title && <h3 className="text-sm font-bold text-cream">{g.title}</h3>}
                    {g.category && <p className="text-xs text-cream/75">{g.category.name}</p>}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {lightbox !== null && data?.[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-950/95 p-4 backdrop-blur"
              onClick={close}
            >
              <button
                className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                onClick={close}
                aria-label="إغلاق"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="السابق"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="التالي"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl"
              >
                <ImageWithFallback src={data[lightbox].image_url} alt={data[lightbox].title} className="max-h-[78vh] w-full rounded-xl2 object-contain" />
                <div className="mt-4 text-center">
                  {data[lightbox].title && (
                    <h3 className="font-bold text-cream">{data[lightbox].title}</h3>
                  )}
                  {data[lightbox].description && (
                    <p className="mt-1 text-sm text-cream/70">{data[lightbox].description}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
