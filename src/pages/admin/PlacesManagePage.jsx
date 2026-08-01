import { Map as MapIcon } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useCategories } from '@/hooks';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function PlacesManagePage() {
  useSEO({ title: 'إدارة الأماكن' });
  const { data: categories } = useCategories('places');

  const fields = [
    { name: 'name', label: 'اسم المكان', required: true },
    { name: 'slug', label: 'الرابط', hint: 'اتركه فارغاً لتوليده تلقائياً' },
    { name: 'category_id', label: 'التصنيف', type: 'select', options: (categories || []).map((c) => ({ value: c.id, label: c.name })) },
    { name: 'description', label: 'الوصف', type: 'textarea', rows: 3 },
    { name: 'images', label: 'الصور', type: 'images' },
    { name: 'phone', label: 'الهاتف' },
    { name: 'website', label: 'الموقع الإلكتروني' },
    { name: 'address', label: 'العنوان' },
    { name: 'working_hours', label: 'ساعات العمل' },
    { name: 'latitude', label: 'خط العرض', type: 'number' },
    { name: 'longitude', label: 'خط الطول', type: 'number' },
    { name: 'is_featured', label: 'مميز', type: 'toggle' },
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
    {
      key: 'category',
      label: 'التصنيف',
      render: (item) =>
        item.category ? (
          <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${item.category.color}1a`, color: item.category.color }}>
            {item.category.name}
          </span>
        ) : (
          '—'
        ),
    },
    { key: 'phone', label: 'الهاتف', render: (item) => <span className="text-xs" dir="ltr">{item.phone || '—'}</span> },
    { key: 'is_featured', label: 'مميز', render: (item) => (item.is_featured ? '★ نعم' : '—') },
  ];

  return (
    <EntityManager
      title="الأماكن"
      icon={MapIcon}
      entity="places"
      columns={columns}
      fields={fields}
      searchFields={['name', 'description', 'address']}
      defaultValues={{ is_published: true, is_featured: false, images: [] }}
      transform={(v) => ({ ...v, slug: generateSlug(v.slug || v.name) })}
    />
  );
}
