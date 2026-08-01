import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { api } from '@/services';

export default function GalleryPreview() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['home-gallery'],
    queryFn: () => api.list('gallery', { order: 'created_at', perPage: 6, page: 1 }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="معرض المدينة"
          title="لقطات من جمال مدينتنا"
          action={
            <Link to="/gallery" className="btn-ghost">
              المعرض الكامل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-52 rounded-xl2" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {items?.map((g, i) => (
              <Link
                key={g.id}
                to="/gallery"
                className={`group relative overflow-hidden rounded-xl2 ${i === 0 ? 'col-span-2 row-span-2 h-full min-h-[300px] lg:col-span-2' : 'h-52'}`}
              >
                <ImageWithFallback
                  src={g.image_url}
                  alt={g.title}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-950/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-brand-950/50 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                    <Plus className="h-6 w-6" />
                  </span>
                </div>
                {g.title && (
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-brand-950/80 to-transparent p-4">
                    <h3 className="text-sm font-bold text-cream">{g.title}</h3>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
