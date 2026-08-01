import { useQuery } from '@tanstack/react-query';
import { Headset, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { api } from '@/services';
import { useCountUp, useDocumentTitle } from '@/hooks';
import { formatNumber } from '@/lib/utils';
import { resolveIcon } from '@/lib/iconMap';
import { useSettings } from '@/contexts/SettingsContext';

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

function SupportRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-center justify-between gap-4 px-6 py-4">
      <span className="flex items-center gap-3 text-ink-100">
        <Icon className="h-5 w-5 text-brand-700" />
        {label}
      </span>
      <span className="font-bold text-brand-900">{children}</span>
    </li>
  );
}

export default function StatisticsPage() {
  useDocumentTitle('الإحصائيات');

  const { data: stats } = useQuery({
    queryKey: ['stats-page'],
    queryFn: () => api.list('statistics', { order: 'sort_order', orderAsc: true }).then((r) => r.data),
  });

  const { settings } = useSettings();

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-14 max-w-2xl"
        >
          <div className="card-surface overflow-hidden">
            <div className="flex flex-col items-center gap-4 border-b border-ink-100/10 bg-brand-900 px-6 py-8 text-center sm:flex-row sm:text-right">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400">
                <Headset className="h-8 w-8" />
              </span>
              <div>
                <h2 className="font-display text-xl font-black text-cream">الدعم والاتصال</h2>
                <p className="mt-1 text-sm text-cream/75">فريقنا جاهز لخدمتك للإجابة عن استفساراتك وملاحظاتك.</p>
              </div>
            </div>

            <ul className="divide-y divide-ink-100/10">
              {settings.contact_phone && (
                <SupportRow icon={Phone} label="رقم الدعم">
                  <a href={`tel:${settings.contact_phone}`} dir="ltr" className="hover:text-brand-700">{settings.contact_phone}</a>
                </SupportRow>
              )}
              {settings.contact_email && (
                <SupportRow icon={Mail} label="البريد الإلكتروني">
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-brand-700">{settings.contact_email}</a>
                </SupportRow>
              )}
              {settings.contact_address && (
                <SupportRow icon={MapPin} label="العنوان">
                  <span className="font-semibold text-ink-900">{settings.contact_address}</span>
                </SupportRow>
              )}
              <SupportRow icon={Clock} label="أوقات العمل">
                <span className="font-semibold text-ink-900">على مدار الساعة، طوال أيام الأسبوع</span>
              </SupportRow>
            </ul>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
