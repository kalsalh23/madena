import { Download } from 'lucide-react';

const LOGOS = [
  { href: '/logo-full.png', label: 'الشعار الكامل' },
  { href: '/logo.png', label: 'رمز الشعار' },
];

const PATTERNS = [
  { href: '/images/patterns/tatriz.png', label: 'تطريز' },
  { href: '/images/patterns/fsefsaa.png', label: 'فسيفساء' },
  { href: '/images/patterns/kitab.png', label: 'كتاب' },
  { href: '/images/patterns/sanbala.png', label: 'سنبلة' },
];

/**
 * أزرار تحميل شعارات المنصة وأزرارها الزخرفية — للمواطنين والشركاء
 * withPatterns: لإظهار الأنماط الزخرفية الأربعة إضافة للشعار
 */
export default function LogoDownloads({ withPatterns = false, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2.5 ${className}`}>
      {LOGOS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl2 bg-gold-500 px-4 py-2 text-xs font-bold text-brand-950 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-gold-400"
        >
          <Download className="h-4 w-4" />
          تحميل {label}
        </a>
      ))}
      {withPatterns &&
        PATTERNS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            download
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-cream transition-colors hover:bg-white/20"
          >
            <Download className="h-3.5 w-3.5" />
            نمط {label}
          </a>
        ))}
    </div>
  );
}
