import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { api } from '@/services';
import { useCountUp, useDocumentTitle } from '@/hooks';
import { formatNumber } from '@/lib/utils';
import { resolveIcon } from '@/lib/iconMap';

const COLORS = ['#054239', '#b9a779', '#6b1f2a', '#0e7a63', '#988561', '#002623', '#4a151e'];

function StatCard({ stat, index }) {
  const Icon = resolveIcon(stat.icon);
  const count = useCountUp(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="card-surface flex flex-col items-center justify-center gap-3 p-6 text-center hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-gold-400">
        {Icon && <Icon className="h-7 w-7" />}
      </span>
      <div className="font-display text-3xl font-black text-brand-900">{formatNumber(count)}</div>
      <div className="text-sm font-semibold text-ink-100">{stat.label}</div>
    </motion.div>
  );
}

export default function StatisticsPage() {
  useDocumentTitle('الإحصائيات');

  const { data: stats } = useQuery({
    queryKey: ['stats-page'],
    queryFn: () => api.list('statistics', { order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { data: places } = useQuery({
    queryKey: ['stats-places'],
    queryFn: () => api.list('places', { perPage: 500, page: 1 }).then((r) => r.data),
  });

  const byCategory = Object.entries(
    (places || []).reduce((acc, p) => {
      const key = p.category?.name || 'أخرى';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">بيانات وأرقام</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">إحصائيات المدينة</h1>
          <p className="max-w-xl text-ink-100">أرقام دقيقة عن سكان المدينة وخدماتها ومشاريعها، محدثة باستمرار.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(stats || []).map((s, i) => (
            <StatCard key={s.id} stat={s} index={i} />
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="mb-6 text-lg font-bold text-ink-900">مؤشرات رئيسية</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stats || []} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" name="القيمة" radius={[8, 8, 0, 0]}>
                  {(stats || []).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card-surface p-6">
            <h2 className="mb-6 text-lg font-bold text-ink-900">توزيع الأماكن حسب التصنيف</h2>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={55}
                  paddingAngle={3}
                  label={({ name }) => name}
                >
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </div>
  );
}
