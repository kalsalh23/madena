import { CalendarDays } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { useCategories } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function EventsManagePage() {
  useSEO({ title: 'إدارة الفعاليات' });
  const { data: categories } = useCategories('events');

  const fields = [
    { name: 'title', label: 'العنوان', required: true },
    { name: 'slug', label: 'الرابط', hint: 'اتركه فارغاً لتوليده تلقائياً' },
    { name: 'category_id', label: 'التصنيف', type: 'select', options: (categories || []).map((c) => ({ value: c.id, label: c.name })) },
    { name: 'description', label: 'الوصف', type: 'textarea', rows: 3 },
    { name: 'images', label: 'الصور', type: 'images' },
    { name: 'start_date', label: 'تاريخ البداية', type: 'datetime', required: true },
    { name: 'end_date', label: 'تاريخ النهاية', type: 'datetime' },
    { name: 'location', label: 'المكان' },
    { name: 'organizer', label: 'الجهة المنظمة' },
    { name: 'latitude', label: 'خط العرض', type: 'number' },
    { name: 'longitude', label: 'خط الطول', type: 'number' },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — تُحذف الفعالية تلقائياً بعد هذا التاريخ' },
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
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title}</span> },
    { key: 'start_date', label: 'التاريخ', render: (item) => <span className="text-xs text-ink-100">{formatDate(item.start_date)}</span> },
    {
      key: 'status',
      label: 'الحالة',
      render: (item) => {
        const upcoming = new Date(item.start_date) > new Date();
        return <Badge tone={upcoming ? 'brand' : 'neutral'}>{upcoming ? 'قادم' : 'ماضٍ'}</Badge>;
      },
    },
  ];

  return (
    <EntityManager
      title="الفعاليات"
      icon={CalendarDays}
      entity="events"
      columns={columns}
      fields={fields}
      searchFields={['title', 'description', 'location']}
      defaultValues={{ is_published: true, images: [] }}
      transform={(v) => ({
        ...v,
        slug: generateSlug(v.slug || v.title),
        start_date: v.start_date ? new Date(v.start_date).toISOString() : new Date().toISOString(),
        end_date: v.end_date ? new Date(v.end_date).toISOString() : null,
      })}
    />
  );
}
