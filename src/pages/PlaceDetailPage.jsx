import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Phone, Clock, MapPin, Globe, Building2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { useSEO } from '@/hooks/useSEO';

export default function PlaceDetailPage() {
  const { slug } = useParams();
  const { data: place, isLoading } = useQuery({
    queryKey: ['place', slug],
    queryFn: () => api.getBySlug('places', slug).then((r) => r.data),
  });

  useSEO({
    title: place?.name,
    description: place?.description,
    image: place?.images?.[0],
  });

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <Container>
          <div className="skeleton h-96 w-full rounded-xl3" />
        </Container>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="pt-28 pb-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink-900">المكان غير موجود</h1>
          <Link to="/places" className="btn-ghost mt-4">العودة للدليل</Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <Container>
        <nav className="mb-6 flex items-center gap-1 text-sm text-ink-100">
          <Link to="/" className="hover:text-brand-700">الرئيسية</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/places" className="hover:text-brand-700">دليل المدينة</Link>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl3 shadow-soft">
              <ImageWithFallback src={place.images?.[0]} alt={place.name} className="h-[380px] w-full" />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black text-ink-900 sm:text-3xl">{place.name}</h1>
                {place.category && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${place.category.color}1a`, color: place.category.color }}
                  >
                    {place.category.name}
                  </span>
                )}
              </div>
              <p className="max-w-2xl leading-8 text-ink-100">{place.description}</p>
            </div>

            {place.latitude && place.longitude && (
              <div className="mt-8">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink-900">
                  <MapPin className="h-5 w-5 text-brand-700" /> الموقع على الخريطة
                </h2>
                <MapView
                  markers={[
                    {
                      id: place.id,
                      lat: place.latitude,
                      lng: place.longitude,
                      title: place.name,
                      subtitle: place.category?.name,
                      image: place.images?.[0],
                      color: place.category?.color || '#054239',
                    },
                  ]}
                  height={380}
                  fitBounds
                />
              </div>
            )}
          </div>

          <aside>
            <div className="card-surface sticky top-24 space-y-5 p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <Building2 className="h-4 w-4 text-brand-700" /> معلومات التواصل
              </h3>
              <div className="space-y-4 text-sm">
                {place.phone && (
                  <a href={`tel:${place.phone}`} className="flex items-center gap-3 text-ink-100 hover:text-brand-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span dir="ltr">{place.phone}</span>
                  </a>
                )}
                {place.website && (
                  <a href={place.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink-100 hover:text-brand-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Globe className="h-4 w-4" />
                    </span>
                    <span dir="ltr" className="truncate">{place.website}</span>
                  </a>
                )}
                {place.working_hours && (
                  <div className="flex items-center gap-3 text-ink-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Clock className="h-4 w-4" />
                    </span>
                    {place.working_hours}
                  </div>
                )}
                {place.address && (
                  <div className="flex items-center gap-3 text-ink-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <MapPin className="h-4 w-4" />
                    </span>
                    {place.address}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
