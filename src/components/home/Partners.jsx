import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import LogoDownloads from '@/components/ui/LogoDownloads';
import { api } from '@/services';

export default function Partners() {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.list('partners', { order: 'sort_order', orderAsc: true, perPage: 20, page: 1 }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !partners?.length) return null;

  return (
    <section className="bg-cream/50 py-16">
      <div className="pattern-strip pattern-strip-fsefsaa mx-auto mb-10 max-w-5xl opacity-70" aria-hidden="true" />
      <Container>
        <SectionHeading eyebrow="شركاء النجاح" title="شركاء المدينة" />
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-ink-100">هل تحتاج شعار المنصة للاستخدام؟ حمّله مباشرة:</p>
          <LogoDownloads />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.website || undefined}
              target={p.website ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-surface flex h-24 w-44 items-center justify-center overflow-hidden p-3 grayscale transition-all hover:grayscale-0"
            >
              <ImageWithFallback src={p.logo} alt={p.name} className="h-full w-full object-contain" />
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
