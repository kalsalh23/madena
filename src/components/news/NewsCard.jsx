import { Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function NewsCard({ item, large = false }) {
  return (
    <Link
      to={`/news/${item.slug}`}
      className="card-surface group block overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className={`relative overflow-hidden ${large ? 'h-56' : 'h-44'}`}>
        <ImageWithFallback
          src={item.cover}
          alt={item.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          {item.category && <Badge tone="gold">{item.category.name}</Badge>}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-3 text-xs text-ink-100">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(item.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {item.views?.toLocaleString('ar-SA')}
          </span>
        </div>
        <h3 className={`font-bold text-ink-900 transition-colors group-hover:text-brand-700 ${large ? 'text-xl leading-8' : 'text-base leading-7'}`}>
          {item.title}
        </h3>
        {large && item.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-7 text-ink-100">{item.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
