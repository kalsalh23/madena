import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Megaphone, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import { api } from '@/services';

const ROTATION_SECONDS = 10;

export default function AdBanner() {
  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: () =>
      api
        .list('ads', { filters: { is_published: true }, order: 'sort_order', perPage: 100, page: 1 })
        .then((r) => r.data || []),
  });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ads.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % ads.length), ROTATION_SECONDS * 1000);
    return () => clearInterval(timer);
  }, [ads.length]);

  if (!ads.length) return null;

  const ad = ads[index % ads.length];

  return (
    <section className="py-10">
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="card-surface flex flex-col items-center gap-6 overflow-hidden border-2 border-gold-500/30 p-6 sm:flex-row sm:p-8"
          >
            {ad.image && (
              <img
                src={ad.image}
                alt={ad.title || 'إعلان'}
                className="h-44 w-full shrink-0 rounded-xl2 object-cover sm:h-36 sm:w-64"
              />
            )}
            <div className="min-w-0 flex-1 text-center sm:text-right">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-wine-700/10 px-3 py-1 text-xs font-bold text-wine-700">
                <Megaphone className="h-3.5 w-3.5" />
                إعلان
              </span>
              {ad.title && (
                <h2 className="font-display text-xl font-black text-brand-900 sm:text-2xl">{ad.title}</h2>
              )}
              {ad.body && <p className="mt-2 text-sm leading-7 text-ink-100">{ad.body}</p>}
            </div>
            {ad.link && (
              <a
                href={ad.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex shrink-0 items-center gap-2 px-6 py-3 text-sm"
              >
                التفاصيل
                <ArrowLeft className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {ads.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {ads.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setIndex(i)}
                aria-label={`إعلان ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index % ads.length ? 'w-7 bg-brand-700' : 'w-2 bg-[#D1D5DB] hover:bg-brand-300'
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
