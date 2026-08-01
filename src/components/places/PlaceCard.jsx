import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';

export default function PlaceCard({ item, className }) {
  return (
    <Link
      to={`/places/${item.slug}`}
      className={cn('card-surface group block overflow-hidden hover:-translate-y-1.5 hover:shadow-lift', className)}
    >
      <div className="relative h-40 overflow-hidden">
        <ImageWithFallback
          src={item.images?.[0]}
          alt={item.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {item.is_featured && (
          <span className="absolute right-3 top-3 rounded-full bg-wine-700/90 px-3 py-1 text-xs font-bold text-white">
            مميز
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="font-bold text-ink-900 group-hover:text-brand-700">{item.name}</h3>
          {item.category && (
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: `${item.category.color}1a`, color: item.category.color }}
            >
              {item.category.name}
            </span>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-sm leading-6 text-ink-100">{item.description}</p>
        <div className="space-y-1.5 text-xs text-ink-100">
          {item.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-700" />
              <span dir="ltr">{item.phone}</span>
            </span>
          )}
          {item.working_hours && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-700" />
              {item.working_hours}
            </span>
          )}
          {item.address && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-700" />
              {item.address}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
