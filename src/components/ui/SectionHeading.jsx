import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'center',
  dark = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-10 flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-right',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold',
            dark ? 'bg-gold-400/15 text-gold-300' : 'bg-gold-500/15 text-gold-700'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
          {eyebrow}
        </span>
      )}
      <div className="flex w-full flex-wrap items-end justify-between gap-4">
        <div className={align === 'center' ? 'w-full' : ''}>
          <h2
            className={cn(
              'text-2xl font-bold sm:text-3xl lg:text-4xl',
              dark ? 'text-cream' : 'text-brand-900'
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                'mt-2 max-w-2xl',
                dark ? 'text-cream/70' : 'text-ink-100',
                align === 'center' && 'mx-auto'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </motion.div>
  );
}
