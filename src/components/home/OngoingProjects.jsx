import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { SkeletonList } from '@/components/ui/Skeleton';
import ProjectCard from '@/components/projects/ProjectCard';
import { api } from '@/services';

export default function OngoingProjects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['home-projects'],
    queryFn: () => api.list('projects', { order: 'created_at', perPage: 4, page: 1 }).then((r) => r.data),
    staleTime: 60 * 1000,
  });

  const ongoing = (projects || []).filter((p) => p.status === 'ongoing');

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="نهضة عمرانية"
          title="المشاريع الجارية"
          action={
            <Link to="/projects" className="btn-ghost">
              جميع المشاريع
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
        {isLoading ? (
          <SkeletonList count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ongoing.slice(0, 4).map((p) => (
              <ProjectCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
