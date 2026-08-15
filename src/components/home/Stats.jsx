import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { api } from '@/services';
import { resolveIcon } from '@/lib/iconMap';
import { useCountUp } from '@/hooks';
import { formatNumber } from '@/lib/utils';

function StatCard({ stat, index }) {
  const Icon = resolveIcon(stat.icon);
  const count = useCountUp(stat.value);

  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
        {Icon ? <Icon className="h-6 w-6" /> : null}
      </span>
      <div>
        <div className="font-display text-2xl font-extrabold text-brand-900">{formatNumber(count)}</div>
        <div className="text-sm font-semibold text-ink-100">{stat.label}</div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`card-surface p-5 ${stat.link ? 'group hover:-translate-y-1 hover:shadow-lift' : ''}`}
    >
      {stat.link ? (
        <Link to={stat.link} className="flex items-center gap-4">
          {content}
          <ArrowLeft className="mr-auto h-4 w-4 text-brand-700 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}

function CategoryCard({ category, index }) {
  const Icon = resolveIcon(category.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="card-surface group p-5 hover:-translate-y-1 hover:shadow-lift"
    >
      <Link to={`/places?cat=${category.slug}`} className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${category.color}1a`, color: category.color }}
        >
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </span>
        <div>
          <div className="text-sm font-bold text-ink-900 group-hover:text-brand-700">{category.name}</div>
          <div className="text-xs text-ink-100">دليل المدينة</div>
        </div>
        <ArrowLeft className="mr-auto h-4 w-4 text-brand-700 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
}

export default function Stats() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => api.list('statistics', { order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { data: categories, isLoading: catsLoading } = useQuery({
    queryKey: ['stats-place-categories'],
    queryFn: () => api.list('categories', { filters: { type: 'places' }, order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  if (statsLoading || catsLoading || !stats?.length) return null;

  const population = stats.find((s) => s.icon === 'Users' || s.label === 'عدد السكان') || stats[0];
  const hiddenSlugs = ['hotels', 'landmarks', 'fuel', 'parks'];
  const sections = (categories || []).filter((c) => !hiddenSlugs.includes(c.slug));

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="حقائق سريعة" title="مدينتنا بالأرقام" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard stat={population} index={0} />
          {sections.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
