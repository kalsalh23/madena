import { Image as ImageIcon } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useCategories } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function GalleryManagePage() {
  useSEO({ title: 'إدارة الصور' });
  const { data: categories } = useCategories('gallery');

  const fields = [
    { name: 'image_url', label: 'الصورة', type: 'image', aspect: 'video', required: true },
    { name: 'title', label: 'العنوان' },
    { name: 'description', label: 'الوصف', type: 'textarea', rows: 2 },
    { name: 'category_id', label: 'التصنيف', type: 'select', options: (categories || []).map((c) => ({ value: c.id, label: c.name })) },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — تُحذف الصورة تلقائياً بعد هذا التاريخ' },
  ];

  const columns = [
    {
      key: 'image_url',
      label: 'الصورة',
      render: (item) => (
        <ImageWithFallback src={item.image_url} alt="" className="h-11 w-16 rounded-lg" />
      ),
    },
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title || 'بدون عنوان'}</span> },
    { key: 'category', label: 'التصنيف', render: (item) => item.category?.name || '—' },
    { key: 'created_at', label: 'التاريخ', render: (item) => <span className="text-xs text-ink-100">{formatDate(item.created_at)}</span> },
  ];

  return (
    <EntityManager
      title="معرض الصور"
      icon={ImageIcon}
      entity="gallery"
      columns={columns}
      fields={fields}
      searchFields={['title', 'description']}
      defaultValues={{}}
    />
  );
}
