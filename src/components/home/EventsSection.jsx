import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { SkeletonList } from '@/components/ui/Skeleton';
import EventCard from '@/components/events/EventCard';
import { api } from '@/services';

export default function EventsSection() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['home-events'],
    queryFn: () => api.list('events', { order: 'start_date', orderAsc: true, perPage: 4, page: 1 }).then((r) => r.data),
    staleTime: 60 * 1000,
  });

  const upcoming = (events || []).filter((e) => new Date(e.start_date) > new Date()).slice(0, 4);

  return (
    <section className="bg-brand-950 py-16">
      <Container>
        <SectionHeading
          eyebrow="تقويم المدينة"
          title="الفعاليات القادمة"
          subtitle="لا تفوّت أهم الفعاليات والمناسبات في المدينة."
          align="right"
          dark
          action={
            <Link
              to="/events"
              className="btn-gold"
            >
              جميع الفعاليات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-80 rounded-xl2" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((e) => (
              <EventCard key={e.id} item={e} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
