import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { SkeletonList } from '@/components/ui/Skeleton';
import PlaceCard from '@/components/places/PlaceCard';
import { api } from '@/services';

export default function FeaturedPlaces() {
  const { data: places, isLoading } = useQuery({
    queryKey: ['featured-places'],
    queryFn: () => api.list('places', { filters: { is_featured: true }, perPage: 4, page: 1 }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="دليل المدينة"
          title="أماكن مميزة تستحق الزيارة"
          action={
            <Link to="/places" className="btn-ghost">
              كل الأماكن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <SkeletonList count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {places?.map((p) => (
              <PlaceCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
