import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { api } from '@/services';
import { resolveIcon } from '@/lib/iconMap';
import { useCountUp } from '@/hooks';
import { formatNumber } from '@/lib/utils';

function StatCard({ stat, index }) {
  const Icon = resolveIcon(stat.icon);
  const count = useCountUp(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="card-surface flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
        {Icon ? <Icon className="h-6 w-6" /> : null}
      </span>
      <div>
        <div className="font-display text-2xl font-extrabold text-brand-900">{formatNumber(count)}</div>
        <div className="text-sm font-semibold text-ink-100">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => api.list('statistics', { order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  if (isLoading || !stats?.length) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="حقائق سريعة" title="مدينتنا بالأرقام" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
