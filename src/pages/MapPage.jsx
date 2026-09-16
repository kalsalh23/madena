import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { useDocumentTitle } from '@/hooks';
import { cn } from '@/lib/utils';
import { DEFAULT_MAP_CENTER } from '@/lib/constants';

const layers = [
  { id: 'places', label: 'الأماكن' },
  { id: 'projects', label: 'المشاريع' },
];

export default function MapPage() {
  useDocumentTitle('الخريطة');
  const [active, setActive] = useState('places');

  const { data: places } = useQuery({
    queryKey: ['all-places'],
    queryFn: () => api.list('places', { perPage: 300, page: 1 }).then((r) => r.data),
  });

  const { data: projects } = useQuery({
    queryKey: ['all-projects'],
    queryFn: () => api.list('projects', { perPage: 100, page: 1 }).then((r) => r.data),
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
        color: p.category?.color || '#084239',
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
        color: p.status === 'completed' ? '#0d7562' : p.status === 'ongoing' ? '#5f0113' : '#958162',
      })),
  };

  return (
    <div className="pt-28 pb-16">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gold-500/15 px-4 py-1 text-xs font-bold text-gold-700">خريطة تفاعلية</span>
          <h1 className="font-display text-3xl font-black text-brand-900 sm:text-4xl">خريطة المدينة</h1>
          <p className="max-w-xl text-ink-100">استكشف الأماكن والمشاريع على الخريطة، وانقر على أي علامة لعرض التفاصيل.</p>
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
          center={[DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng]}
          height={620}
          fitBounds={markers[active].length > 1}
          scrollWheelZoom
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-100">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-800" /> أماكن</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-wine-700" /> مشاريع جارية</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-500" /> مشاريع مكتملة</span>
        </div>
      </Container>
    </div>
  );
}
