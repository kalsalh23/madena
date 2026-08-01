import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, CalendarDays, MapPin, User } from 'lucide-react';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { formatDate } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return (
    <div className="flex gap-3">
      {[
        { value: days, label: 'يوم' },
        { value: hours, label: 'ساعة' },
        { value: minutes, label: 'دقيقة' },
      ].map((b) => (
        <div key={b.label} className="rounded-xl bg-brand-950 px-4 py-3 text-center">
          <div className="font-display text-2xl font-extrabold text-gold-400">{b.value}</div>
          <div className="text-xs text-cream/75">{b.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventDetailPage() {
  const { slug } = useParams();
  const { data: event, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => api.getBySlug('events', slug).then((r) => r.data),
  });

  useSEO({ title: event?.title, description: event?.description, image: event?.images?.[0], type: 'article' });

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <Container>
          <div className="skeleton h-96 w-full rounded-xl3" />
        </Container>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-28 pb-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink-900">الفعالية غير موجودة</h1>
          <Link to="/events" className="btn-ghost mt-4">العودة للفعاليات</Link>
        </Container>
      </div>
    );
  }

  const isUpcoming = new Date(event.start_date) > new Date();

  return (
    <div className="pt-28 pb-16">
      <Container>
        <nav className="mb-6 flex items-center gap-1 text-sm text-ink-100">
          <Link to="/" className="hover:text-brand-700">الرئيسية</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/events" className="hover:text-brand-700">الفعاليات</Link>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl3 shadow-soft">
              <ImageWithFallback src={event.images?.[0]} alt={event.title} className="h-[380px] w-full" />
            </div>
            <h1 className="mb-4 mt-6 text-2xl font-black text-ink-900 sm:text-3xl">{event.title}</h1>
            <div className="prose-content">
              <p>{event.description}</p>
            </div>
          </div>

          <aside className="space-y-5">
            {isUpcoming && (
              <div className="card-surface p-6">
                <h3 className="mb-4 text-sm font-bold text-ink-900">ينطلق خلال</h3>
                <Countdown target={new Date(event.start_date).getTime()} />
              </div>
            )}
            <div className="card-surface space-y-4 p-6 text-sm">
              <div className="flex items-center gap-3 text-ink-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <CalendarDays className="h-4 w-4" />
                </span>
                {formatDate(event.start_date)} — {event.end_date ? formatDate(event.end_date) : ''}
              </div>
              {event.location && (
                <div className="flex items-center gap-3 text-ink-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {event.location}
                </div>
              )}
              {event.organizer && (
                <div className="flex items-center gap-3 text-ink-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <User className="h-4 w-4" />
                  </span>
                  {event.organizer}
                </div>
              )}
            </div>

            {event.latitude && event.longitude && (
              <MapView
                markers={[
                  { id: event.id, lat: event.latitude, lng: event.longitude, title: event.title, subtitle: event.location, color: '#988561' },
                ]}
                height={260}
                fitBounds
              />
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
