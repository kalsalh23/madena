import { Newspaper } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import { useCategories } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function NewsManagePage() {
  useSEO({ title: 'إدارة الأخبار' });
  const { data: categories } = useCategories('news');

  const fields = [
    { name: 'title', label: 'العنوان', required: true },
    {
      name: 'slug', label: 'الرابط', hint: 'اتركه فارغاً لتوليده تلقائياً',
    },
    { name: 'category_id', label: 'التصنيف', type: 'select', options: (categories || []).map((c) => ({ value: c.id, label: c.name })) },
    { name: 'excerpt', label: 'الملخص', type: 'textarea', rows: 2 },
    { name: 'content', label: 'المحتوى', type: 'richtext' },
    { name: 'cover', label: 'صورة الغلاف', type: 'image' },
    { name: 'video_url', label: 'رابط فيديو (YouTube)', hint: 'اختياري' },
    { name: 'author', label: 'الكاتب' },
    { name: 'published_at', label: 'تاريخ النشر', type: 'datetime' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'cover',
      label: 'الصورة',
      render: (item) => (
        <ImageWithFallback src={item.cover} alt="" className="h-11 w-16 rounded-lg" />
      ),
    },
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title}</span> },
    { key: 'category', label: 'التصنيف', render: (item) => item.category && <Badge>{item.category.name}</Badge> },
    { key: 'published_at', label: 'التاريخ', render: (item) => <span className="text-xs text-ink-100">{formatDate(item.published_at)}</span> },
    { key: 'views', label: 'المشاهدات', render: (item) => <span className="text-xs">{item.views?.toLocaleString('ar-SA')}</span> },
  ];

  return (
    <EntityManager
      title="الأخبار"
      icon={Newspaper}
      entity="news"
      columns={columns}
      fields={fields}
      searchFields={['title', 'excerpt']}
      defaultValues={{ is_published: true, published_at: new Date().toISOString().slice(0, 16), images: [] }}
      transform={(v) => {
        const slug = v.slug || v.title;
        return {
          ...v,
          slug: generateSlug(slug),
          published_at: v.published_at ? new Date(v.published_at).toISOString() : new Date().toISOString(),
        };
      }}
    />
  );
}
