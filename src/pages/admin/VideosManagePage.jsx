import { Play } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useCategories } from '@/hooks';
import { formatDuration } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function VideosManagePage() {
  useSEO({ title: 'إدارة الفيديوهات' });
  const { data: categories } = useCategories('videos');

  const fields = [
    { name: 'title', label: 'العنوان', required: true },
    { name: 'description', label: 'الوصف', type: 'textarea', rows: 3 },
    { name: 'video_url', label: 'رابط الفيديو', hint: 'رابط YouTube embed أو رابط ملف مباشر', required: true },
    { name: 'thumbnail', label: 'صورة مصغرة', type: 'image', aspect: 'video' },
    { name: 'category_id', label: 'التصنيف', type: 'select', options: (categories || []).map((c) => ({ value: c.id, label: c.name })) },
    { name: 'duration', label: 'المدة (ثانية)', type: 'number', min: 0 },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — يُحذف الفيديو تلقائياً بعد هذا التاريخ' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'thumbnail',
      label: 'الصورة',
      render: (item) => (
        <ImageWithFallback src={item.thumbnail} alt="" className="h-11 w-16 rounded-lg" />
      ),
    },
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title}</span> },
    { key: 'category', label: 'التصنيف', render: (item) => item.category?.name || '—' },
    { key: 'duration', label: 'المدة', render: (item) => <span className="text-xs" dir="ltr">{formatDuration(item.duration)}</span> },
  ];

  return (
    <EntityManager
      title="الفيديوهات"
      icon={Play}
      entity="videos"
      columns={columns}
      fields={fields}
      searchFields={['title', 'description']}
      defaultValues={{ duration: 0, is_published: true }}
    />
  );
}
