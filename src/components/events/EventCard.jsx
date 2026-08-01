import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, User } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function EventCard({ item }) {
  const upcoming = new Date(item.start_date) > new Date();

  return (
    <Link
      to={`/events/${item.slug}`}
      className="card-surface group block overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative h-44 overflow-hidden">
        <ImageWithFallback
          src={item.images?.[0]}
          alt={item.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <Badge tone={upcoming ? 'brand' : 'neutral'}>{upcoming ? 'قادم' : 'ماضٍ'}</Badge>
        </div>
        <div className="absolute bottom-0 right-0 m-3 rounded-xl bg-brand-950/85 px-4 py-2 text-center backdrop-blur">
          <div className="text-xl font-extrabold leading-none text-gold-400">
            {new Date(item.start_date).getDate()}
          </div>
          <div className="text-[11px] font-semibold text-cream/85">
            {formatDate(item.start_date, { month: 'short' })}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 font-bold text-ink-900 group-hover:text-brand-700">{item.title}</h3>
        <div className="space-y-1.5 text-xs text-ink-100">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-brand-700" />
            {formatDate(item.start_date)} — {item.end_date ? formatDate(item.end_date) : ''}
          </span>
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-700" />
              {item.location}
            </span>
          )}
          {item.organizer && (
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-brand-700" />
              {item.organizer}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
