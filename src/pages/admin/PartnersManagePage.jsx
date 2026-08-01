import { Handshake } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useSEO } from '@/hooks/useSEO';

export default function PartnersManagePage() {
  useSEO({ title: 'إدارة الشركاء' });

  const fields = [
    { name: 'name', label: 'الاسم', required: true },
    { name: 'logo', label: 'الشعار', type: 'image', aspect: 'square' },
    { name: 'website', label: 'الموقع الإلكتروني' },
    { name: 'sort_order', label: 'الترتيب', type: 'number' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'logo',
      label: 'الشعار',
      render: (item) => (
        <ImageWithFallback src={item.logo} alt="" className="h-11 w-16 rounded-lg object-contain bg-white" />
      ),
    },
    { key: 'name', label: 'الاسم', render: (item) => <span className="font-semibold text-ink-900">{item.name}</span> },
    { key: 'website', label: 'الموقع', render: (item) => <span dir="ltr" className="text-xs text-ink-100">{item.website || '—'}</span> },
    { key: 'sort_order', label: 'الترتيب', render: (item) => <span className="text-xs">{item.sort_order}</span> },
  ];

  return (
    <EntityManager
      title="الشركاء"
      icon={Handshake}
      entity="partners"
      columns={columns}
      fields={fields}
      searchFields={['name']}
      defaultValues={{ sort_order: 0, is_published: true }}
    />
  );
}
