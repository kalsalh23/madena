import { Link } from 'react-router-dom';
import { Building2, CalendarRange } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

const statusMeta = {
  planned: { label: 'مخطط', tone: 'neutral' },
  ongoing: { label: 'جاري التنفيذ', tone: 'brand' },
  completed: { label: 'مكتمل', tone: 'green' },
};

export default function ProjectCard({ item }) {
  const meta = statusMeta[item.status] || statusMeta.planned;

  return (
    <Link
      to={`/projects/${item.slug}`}
      className="card-surface group block overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative h-44 overflow-hidden">
        <ImageWithFallback
          src={item.images?.[0]}
          alt={item.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 flex items-start gap-2 font-bold text-ink-900 group-hover:text-brand-700">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          {item.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-6 text-ink-100">{item.description}</p>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-100">
          <span>نسبة الإنجاز</span>
          <span className="text-brand-700">{item.progress}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
          <div
            className="h-full rounded-full bg-gradient-to-l from-brand-800 to-brand-500 transition-all duration-700"
            style={{ width: `${item.progress}%` }}
          />
        </div>
        {item.start_date && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-100">
            <CalendarRange className="h-3.5 w-3.5" />
            {formatDate(item.start_date)} — {formatDate(item.end_date)}
          </div>
        )}
      </div>
    </Link>
  );
}
