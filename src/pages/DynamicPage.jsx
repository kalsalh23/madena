import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Container from '@/components/ui/Container';
import { api } from '@/services';
import { useSEO } from '@/hooks/useSEO';

export default function DynamicPage() {
  const { slug } = useParams();
  const { data: page, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: () => api.getBySlug('pages', slug).then((r) => r.data),
  });

  useSEO({ title: page?.title });

  if (isLoading) {
    return (
      <div className="pt-28 pb-16">
        <Container className="max-w-3xl">
          <div className="skeleton h-10 w-1/2" />
          <div className="skeleton mt-6 h-64 w-full rounded-xl2" />
        </Container>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="pt-28 pb-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink-900">الصفحة غير موجودة</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <Container className="max-w-3xl">
        <h1 className="mb-8 font-display text-3xl font-black text-brand-900 sm:text-4xl">{page.title}</h1>
        <article className="prose-content rounded-xl2 border border-[#E5E7EB] bg-white p-6 shadow-soft sm:p-8">
          <div dangerouslySetInnerHTML={{ __html: page.content || '' }} />
        </article>
      </Container>
    </div>
  );
}
