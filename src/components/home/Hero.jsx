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
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-brand-950">
      {/* خلفية الهوية: تدرجات زمردية + وهج ذهبي وعناصر زخرفية */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_560px_at_88%_-10%,rgba(182,166,122,0.20),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_8%_112%,rgba(29,183,154,0.16),transparent_60%)]" />

      {/* رمز المدينة كعلامة مائية كبيرة في الخلفية */}
      <img
        src="/logo-full.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[620px] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.08] sm:w-[760px]"
      />

      {/* زخرفة التطريز أعلى القسم */}
      <div className="pattern-strip pattern-strip-tatriz absolute top-0 inset-x-0 opacity-25" aria-hidden="true" />

      {settings.hero_image ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${settings.hero_image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-900/60 to-brand-950/85" />
        </>
      ) : null}

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

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
          <StatItem value={overview?.places_count || 0} label="مكان وخدمة" delay={0.4} />
          <StatItem value={overview?.projects_count || 0} label="مشروع تنموي" delay={0.5} />
          <StatItem value={overview?.news_count || 0} label="خبر جديد" delay={0.6} />
        </div>
      </Container>

      <div
        className="pattern-strip pattern-strip-sanbala absolute bottom-16 inset-x-0 opacity-60"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#F5F3EC] to-transparent" />
    </section>
  );
}
