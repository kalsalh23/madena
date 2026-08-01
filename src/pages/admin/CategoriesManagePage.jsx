import { FolderOpen } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import Badge from '@/components/ui/Badge';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const typeOptions = [
  { value: 'news', label: 'الأخبار' },
  { value: 'projects', label: 'المشاريع' },
  { value: 'places', label: 'الأماكن' },
  { value: 'events', label: 'الفعاليات' },
  { value: 'gallery', label: 'الصور' },
  { value: 'videos', label: 'الفيديوهات' },
];

const typeLabels = Object.fromEntries(typeOptions.map((t) => [t.value, t.label]));

export default function CategoriesManagePage() {
  useSEO({ title: 'إدارة التصنيفات' });

  const fields = [
    { name: 'name', label: 'الاسم', required: true },
    { name: 'slug', label: 'الرابط', hint: 'اتركه فارغاً لتوليده تلقائياً' },
    { name: 'type', label: 'النوع', type: 'select', options: typeOptions, required: true },
    { name: 'icon', label: 'اسم الأيقونة', hint: 'من مكتبة lucide' },
    { name: 'color', label: 'اللون (Hex)', hint: 'مثال: #054239' },
    { name: 'sort_order', label: 'الترتيب', type: 'number' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'color',
      label: 'اللون',
      render: (item) => (
        <span className="inline-block h-6 w-6 rounded-full border border-[#E5E7EB]" style={{ backgroundColor: item.color }} />
      ),
    },
    { key: 'name', label: 'الاسم', render: (item) => <span className="font-semibold text-ink-900">{item.name}</span> },
    { key: 'type', label: 'النوع', render: (item) => <Badge tone="brand">{typeLabels[item.type] || item.type}</Badge> },
    { key: 'sort_order', label: 'الترتيب', render: (item) => <span className="text-xs">{item.sort_order}</span> },
  ];

  return (
    <EntityManager
      title="التصنيفات"
      icon={FolderOpen}
      entity="categories"
      columns={columns}
      fields={fields}
      searchFields={['name', 'slug']}
      defaultValues={{ type: 'places', color: '#054239', sort_order: 0, is_published: true }}
      transform={(v) => ({ ...v, slug: generateSlug(v.slug || v.name) })}
    />
  );
}
