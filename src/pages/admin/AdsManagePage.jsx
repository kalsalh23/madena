import { Megaphone } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useSEO } from '@/hooks/useSEO';

export default function AdsManagePage() {
  useSEO({ title: 'إدارة الإعلانات' });

  const fields = [
    { name: 'title', label: 'عنوان الإعلان', required: true },
    { name: 'body', label: 'نص الإعلان', type: 'textarea', rows: 3 },
    { name: 'image', label: 'صورة الإعلان', type: 'image' },
    { name: 'link', label: 'رابط الإعلان', hint: 'يُفتح في نافذة جديدة عند الضغط على زر التفاصيل' },
    { name: 'sort_order', label: 'الترتيب', type: 'number' },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — يُحذف الإعلان تلقائياً بعد هذا التاريخ' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'image',
      label: 'الصورة',
      render: (item) => (
        <ImageWithFallback src={item.image} alt="" className="h-11 w-16 rounded-lg" />
      ),
    },
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title || 'بدون عنوان'}</span> },
    { key: 'body', label: 'النص', render: (item) => <span className="line-clamp-1 max-w-[260px] text-xs text-ink-100">{item.body || '—'}</span> },
    { key: 'sort_order', label: 'الترتيب', render: (item) => <span className="text-xs">{item.sort_order}</span> },
  ];

  return (
    <EntityManager
      title="الإعلانات"
      icon={Megaphone}
      entity="ads"
      columns={columns}
      fields={fields}
      searchFields={['title', 'body']}
      defaultValues={{ sort_order: 0, is_published: true }}
    />
  );
}
