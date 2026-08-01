import { FileText } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import Badge from '@/components/ui/Badge';
import { generateSlug } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

export default function PagesManagePage() {
  useSEO({ title: 'إدارة الصفحات' });

  const fields = [
    { name: 'title', label: 'العنوان', required: true },
    { name: 'slug', label: 'الرابط', hint: 'مثال: about, contact' },
    { name: 'content', label: 'المحتوى', type: 'richtext' },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — تُحذف الصفحة تلقائياً بعد هذا التاريخ' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    { key: 'title', label: 'العنوان', render: (item) => <span className="font-semibold text-ink-900">{item.title}</span> },
    { key: 'slug', label: 'الرابط', render: (item) => <span dir="ltr" className="text-xs text-brand-700">/{item.slug}</span> },
    { key: 'is_published', label: 'الحالة', render: (item) => <Badge tone={item.is_published ? 'green' : 'neutral'}>{item.is_published ? 'منشور' : 'مخفي'}</Badge> },
  ];

  return (
    <EntityManager
      title="الصفحات"
      icon={FileText}
      entity="pages"
      columns={columns}
      fields={fields}
      searchFields={['title', 'slug']}
      defaultValues={{ is_published: true }}
      transform={(v) => ({ ...v, slug: generateSlug(v.slug || v.title) })}
    />
  );
}
