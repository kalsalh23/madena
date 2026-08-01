import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import SearchBar from '@/components/ui/SearchBar';
import { useSettings } from '@/contexts/SettingsContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services';
import { useCountUp } from '@/hooks';
import { formatNumber } from '@/lib/utils';

function StatItem({ value, label, delay }) {
  const count = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display text-2xl font-extrabold text-gold-400 sm:text-3xl">
        {formatNumber(count)}
      </div>
      <div className="mt-1 text-xs font-semibold text-cream/75 sm:text-sm">{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const { settings } = useSettings();
  const { data: overview } = useQuery({
    queryKey: ['overview'],
    queryFn: () => api.overview().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${settings.hero_image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/85 via-brand-900/70 to-brand-950/90" />

      <Container className="relative z-10 py-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-gold-300 backdrop-blur"
        >
          <MapPin className="h-3.5 w-3.5" />
          {settings.site_tagline}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mt-6 max-w-4xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {settings.hero_title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-8 text-cream/85 sm:text-lg"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-9 max-w-2xl"
        >
          <SearchBar size="lg" />
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <StatItem value={overview?.places_count || 0} label="مكان وخدمة" delay={0.4} />
          <StatItem value={overview?.projects_count || 0} label="مشروع تنموي" delay={0.5} />
          <StatItem value={overview?.news_count || 0} label="خبر جديد" delay={0.6} />
          <StatItem value={overview?.events_count || 0} label="فعالية قادمة" delay={0.7} />
        </div>
      </Container>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}
