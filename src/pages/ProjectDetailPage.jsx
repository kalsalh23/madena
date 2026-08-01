import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight, Building2, CalendarRange, CircleDollarSign, MapPin, Clock3,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import MapView from '@/components/map/MapView';
import { api } from '@/services';
import { formatDate } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const statusMeta = {
  planned: { label: 'مخطط', tone: 'neutral' },
  ongoing: { label: 'جاري التنفيذ', tone: 'brand' },
  completed: { label: 'مكتمل', tone: 'green' },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => api.getBySlug('projects', slug).then((r) => r.data),
  });

  const { data: updates } = useQuery({
    queryKey: ['project-updates', project?.id],
    queryFn: () =>
      api.list('project_updates', { filters: { project_id: project.id }, order: 'created_at', perPage: 20, page: 1 }).then((r) => r.data),
    enabled: Boolean(project),
  });

  useSEO({
    title: project?.name,
    description: project?.description,
    image: project?.images?.[0],
    type: 'article',
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

  if (!project) {
    return (
      <div className="pt-28 pb-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink-900">المشروع غير موجود</h1>
          <Link to="/projects" className="btn-ghost mt-4">العودة للمشاريع</Link>
        </Container>
      </div>
    );
  }

  const meta = statusMeta[project.status] || statusMeta.planned;
  const images = project.images?.length ? project.images : [];

  return (
    <div className="pt-28 pb-16">
      <Container>
        <nav className="mb-6 flex items-center gap-1 text-sm text-ink-100">
          <Link to="/" className="hover:text-brand-700">الرئيسية</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/projects" className="hover:text-brand-700">المشاريع</Link>
        </nav>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge tone={meta.tone}>{meta.label}</Badge>
          <h1 className="text-2xl font-black text-ink-900 sm:text-3xl">{project.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {images.length > 0 && (
              <div className="mb-4 overflow-hidden rounded-xl3 shadow-soft">
                <ImageWithFallback
                  src={images[activeImage]}
                  alt={project.name}
                  className="h-[380px] w-full"
                />
              </div>
            )}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      i === activeImage ? 'border-brand-700' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback src={img} alt="" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}

            <h2 className="mb-3 mt-8 text-xl font-bold text-ink-900">عن المشروع</h2>
            <div className="prose-content">
              <p>{project.description}</p>
            </div>

            {updates?.length > 0 && (
              <>
                <h2 className="mb-4 mt-10 text-xl font-bold text-ink-900">آخر التحديثات</h2>
                <div className="space-y-4">
                  {updates.map((u) => (
                    <div key={u.id} className="card-surface relative border-r-4 border-r-gold-500 p-5">
                      <div className="mb-1 flex items-center gap-2 text-xs text-ink-100">
                        <Clock3 className="h-3.5 w-3.5" />
                        {formatDate(u.created_at)}
                      </div>
                      <h3 className="font-bold text-ink-900">{u.title}</h3>
                      {u.body && <p className="mt-1 text-sm leading-7 text-ink-100">{u.body}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h3 className="mb-4 text-sm font-bold text-ink-900">معلومات المشروع</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink-100">
                    <Building2 className="h-4 w-4 text-brand-700" /> الجهة المنفذة
                  </span>
                  <span className="font-semibold text-ink-900">{project.agency || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink-100">
                    <CircleDollarSign className="h-4 w-4 text-brand-700" /> الميزانية
                  </span>
                  <span className="font-semibold text-ink-900">{project.budget || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink-100">
                    <CalendarRange className="h-4 w-4 text-brand-700" /> المدة
                  </span>
                  <span className="font-semibold text-ink-900">
                    {formatDate(project.start_date)} — {formatDate(project.end_date)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span className="text-ink-100">نسبة الإنجاز</span>
                  <span className="text-brand-700">{project.progress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-brand-800 to-brand-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {project.latitude && project.longitude && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                  <MapPin className="h-4 w-4 text-brand-700" /> موقع المشروع
                </h3>
                <MapView
                  markers={[
                    {
                      id: project.id,
                      lat: project.latitude,
                      lng: project.longitude,
                      title: project.name,
                      color: '#6b1f2a',
                    },
                  ]}
                  height={280}
                  fitBounds
                />
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
