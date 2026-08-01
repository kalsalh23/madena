import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { MapPin } from 'lucide-react';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { useSettings } from '@/contexts/SettingsContext';

export default function MapSection() {
  const { settings } = useSettings();
  const { data: places, isLoading } = useQuery({
    queryKey: ['map-places'],
    queryFn: () => api.list('places', { perPage: 100, page: 1 }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const markers = (places || [])
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
    }));

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="خريطة تفاعلية"
          title="استكشف المدينة على الخريطة"
          subtitle="تصفح الأماكن والمشاريع والخدمات على خريطة مفتوحة المصدر."
          action={
            <Link to="/map" className="btn-ghost">
              الخريطة الكاملة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <div className="skeleton h-[460px] w-full rounded-xl2" />
        ) : (
          <div className="relative">
            <MapView
              markers={markers}
              center={[Number(settings.map_center_lat) || 24.7136, Number(settings.map_center_lng) || 46.6753]}
              height={460}
              scrollWheelZoom
            />
            <span className="absolute right-4 top-4 z-[500] flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-bold text-brand-800 shadow-soft backdrop-blur">
              <MapPin className="h-4 w-4" />
              {markers.length} مكان معروض
            </span>
          </div>
        )}
      </Container>
    </section>
  );
}
