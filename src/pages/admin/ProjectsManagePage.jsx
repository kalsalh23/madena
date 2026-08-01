import { Building2 } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const statusOptions = [
  { value: 'planned', label: 'مخطط' },
  { value: 'ongoing', label: 'جاري التنفيذ' },
  { value: 'completed', label: 'مكتمل' },
];

const statusTone = {
  planned: 'neutral',
  ongoing: 'brand',
  completed: 'green',
};

const statusLabel = {
  planned: 'مخطط',
  ongoing: 'جاري',
  completed: 'مكتمل',
};

export default function ProjectsManagePage() {
  useSEO({ title: 'إدارة المشاريع' });

  const fields = [
    { name: 'name', label: 'اسم المشروع', required: true },
    { name: 'slug', label: 'الرابط', hint: 'اتركه فارغاً لتوليده تلقائياً' },
    { name: 'description', label: 'الوصف', type: 'textarea', rows: 3 },
    { name: 'images', label: 'الصور', type: 'images' },
    { name: 'agency', label: 'الجهة المنفذة' },
    { name: 'budget', label: 'الميزانية' },
    { name: 'start_date', label: 'تاريخ البداية', type: 'date' },
    { name: 'end_date', label: 'تاريخ النهاية', type: 'date' },
    { name: 'progress', label: 'نسبة الإنجاز %', type: 'number', min: 0, max: 100 },
    { name: 'status', label: 'الحالة', type: 'select', options: statusOptions },
    { name: 'latitude', label: 'خط العرض', type: 'number' },
    { name: 'longitude', label: 'خط الطول', type: 'number' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'images',
      label: 'الصورة',
      render: (item) => (
        <ImageWithFallback src={item.images?.[0]} alt="" className="h-11 w-16 rounded-lg" />
      ),
    },
    { key: 'name', label: 'الاسم', render: (item) => <span className="font-semibold text-ink-900">{item.name}</span> },
    { key: 'agency', label: 'الجهة', render: (item) => <span className="text-xs text-ink-100">{item.agency || '—'}</span> },
    {
      key: 'status',
      label: 'الحالة',
      render: (item) => <Badge tone={statusTone[item.status]}>{statusLabel[item.status]}</Badge>,
    },
    {
      key: 'progress',
      label: 'الإنجاز',
      render: (item) => (
        <span className="flex items-center gap-2">
          <span className="h-2 w-16 overflow-hidden rounded-full bg-[#E5E7EB]">
            <span className="block h-full rounded-full bg-brand-700" style={{ width: `${item.progress}%` }} />
          </span>
          <span className="text-xs font-bold text-brand-700">{item.progress}%</span>
        </span>
      ),
    },
  ];

  return (
    <EntityManager
      title="المشاريع"
      icon={Building2}
      entity="projects"
      columns={columns}
      fields={fields}
      searchFields={['name', 'description']}
      defaultValues={{ progress: 0, status: 'planned', is_published: true, images: [] }}
      transform={(v) => ({ ...v, slug: generateSlug(v.slug || v.name) })}
    />
  );
}
