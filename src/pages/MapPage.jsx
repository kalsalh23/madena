import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { useSettings } from '@/contexts/SettingsContext';
import { useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';

const layers = [
  { id: 'places', label: 'الأماكن' },
  { id: 'projects', label: 'المشاريع' },
  { id: 'events', label: 'الفعاليات' },
];

export default function MapPage() {
  useDocumentTitle('الخريطة');
  const [active, setActive] = useState('places');
  const { settings } = useSettings();

  const { data: places } = useQuery({
    queryKey: ['all-places'],
    queryFn: () => api.list('places', { perPage: 300, page: 1 }).then((r) => r.data),
  });

  const { data: projects } = useQuery({
    queryKey: ['all-projects'],
    queryFn: () => api.list('projects', { perPage: 100, page: 1 }).then((r) => r.data),
  });

  const { data: events } = useQuery({
    queryKey: ['all-events'],
    queryFn: () => api.list('events', { perPage: 100, page: 1 }).then((r) => r.data),
  });

  const markers = {
    places: (places || [])
      .filter((p) => p.latitude && p.longitude)
      .map((p) => ({
        id: p.id,
        lat: p.latitude,
        lng: p.longitude,
        title: p.name,
        subtitle: p.category?.name || p.address,
        image: p.images?.[0],
        href: `/places/${p.slug}`,
        color: p.category?.color || '#054239',
      })),
    projects: (projects || [])
      .filter((p) => p.latitude && p.longitude)
      .map((p) => ({
        id: p.id,
        lat: p.latitude,
        lng: p.longitude,
        title: p.name,
        subtitle: `${p.status === 'ongoing' ? 'جاري التنفيذ' : p.status === 'completed' ? 'مكتمل' : 'مخطط'} — ${p.progress}%`,
        image: p.images?.[0],
        href: `/projects/${p.slug}`,
        color: p.status === 'completed' ? '#0e7a63' : p.status === 'ongoing' ? '#6b1f2a' : '#988561',
      })),
    events: (events || [])
      .filter((e) => e.latitude && e.longitude)
      .map((e) => ({
        id: e.id,
        lat: e.latitude,
        lng: e.longitude,
        title: e.title,
        subtitle: e.location,
        image: e.images?.[0],
        href: `/events/${e.slug}`,
        color: '#988561',
      })),
  };

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">خريطة تفاعلية</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">خريطة المدينة</h1>
          <p className="max-w-xl text-ink-100">استكشف الأماكن والمشاريع والفعاليات على الخريطة، وانقر على أي علامة لعرض التفاصيل.</p>
        </div>

        <div className="mb-5 flex justify-center gap-2">
          {layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setActive(l.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all',
                active === l.id
                  ? 'bg-brand-800 text-cream shadow-lift'
                  : 'bg-white text-ink-100 hover:bg-brand-50'
              )}
            >
              <span
                className={cn(
                  'h-2.5 w-2.5 rounded-full',
                  active === l.id ? 'bg-gold-400' : 'bg-brand-400'
                )}
              />
              {l.label}
              <span className={cn('text-xs', active === l.id ? 'text-cream/70' : 'text-ink-100/60')}>
                {markers[l.id].length}
              </span>
            </button>
          ))}
        </div>

        <MapView
          markers={markers[active]}
          center={[Number(settings.map_center_lat) || 35.26389, Number(settings.map_center_lng) || 36.70667]}
          height={620}
          fitBounds={markers[active].length > 1}
          scrollWheelZoom
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-100">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-800" /> أماكن</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-wine-700" /> مشاريع جارية</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-gold-700" /> فعاليات</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-500" /> مشاريع مكتملة</span>
        </div>
      </Container>
    </div>
  );
}
