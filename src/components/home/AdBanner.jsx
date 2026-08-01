import { Megaphone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { useSettings } from '@/contexts/SettingsContext';

export default function AdBanner() {
  const { settings } = useSettings();
  const enabled = settings.ad_enabled === '1';
  const expired = Boolean(settings.ad_expires_at && new Date(settings.ad_expires_at).getTime() <= Date.now());
  const hasContent = Boolean(settings.ad_title || settings.ad_text || settings.ad_image);
  if (!enabled || expired || !hasContent) return null;

  return (
    <section className="py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface flex flex-col items-center gap-6 overflow-hidden border-2 border-gold-500/30 p-6 sm:flex-row sm:p-8"
        >
          {settings.ad_image && (
            <img
              src={settings.ad_image}
              alt={settings.ad_title || 'إعلان'}
              className="h-44 w-full shrink-0 rounded-xl2 object-cover sm:h-36 sm:w-64"
            />
          )}
          <div className="min-w-0 flex-1 text-center sm:text-right">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-wine-700/10 px-3 py-1 text-xs font-bold text-wine-700">
              <Megaphone className="h-3.5 w-3.5" />
              إعلان
            </span>
            {settings.ad_title && (
              <h2 className="font-display text-xl font-black text-brand-900 sm:text-2xl">{settings.ad_title}</h2>
            )}
            {settings.ad_text && <p className="mt-2 text-sm leading-7 text-ink-100">{settings.ad_text}</p>}
          </div>
          {settings.ad_link && (
            <a
              href={settings.ad_link}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex shrink-0 items-center gap-2 px-6 py-3 text-sm"
            >
              التفاصيل
              <ArrowLeft className="h-4 w-4" />
            </a>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
