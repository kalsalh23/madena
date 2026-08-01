import { BarChart3 } from 'lucide-react';
import EntityManager from '@/components/admin/EntityManager';
import { resolveIcon } from '@/lib/iconMap';
import { formatNumber } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const iconOptions = [
  'Users', 'GraduationCap', 'Cross', 'Trees', 'Building2', 'Home',
  'Landmark', 'Newspaper', 'Map', 'Image', 'Play', 'CalendarDays',
  'Star', 'Banknote', 'Hotel',
].map((v) => ({ value: v, label: v }));

export default function StatisticsManagePage() {
  useSEO({ title: 'إدارة الإحصائيات' });

  const fields = [
    { name: 'label', label: 'التسمية', required: true },
    { name: 'value', label: 'القيمة', type: 'number', required: true },
    { name: 'icon', label: 'الأيقونة', type: 'select', options: iconOptions },
    { name: 'sort_order', label: 'الترتيب', type: 'number' },
    { name: 'expires_at', label: 'تاريخ الانتهاء', type: 'datetime', hint: 'اختياري — تُحذف الإحصائية تلقائياً بعد هذا التاريخ' },
    { name: 'is_published', label: 'منشور', type: 'toggle' },
  ];

  const columns = [
    {
      key: 'icon',
      label: 'الأيقونة',
      render: (item) => {
        const Icon = resolveIcon(item.icon);
        return Icon ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Icon className="h-4 w-4" />
          </span>
        ) : null;
      },
    },
    { key: 'label', label: 'التسمية', render: (item) => <span className="font-semibold text-ink-900">{item.label}</span> },
    { key: 'value', label: 'القيمة', render: (item) => <span className="font-display font-bold text-brand-800">{formatNumber(item.value)}</span> },
    { key: 'sort_order', label: 'الترتيب', render: (item) => <span className="text-xs">{item.sort_order}</span> },
  ];

  return (
    <EntityManager
      title="الإحصائيات"
      icon={BarChart3}
      entity="statistics"
      columns={columns}
      fields={fields}
      searchFields={['label']}
      defaultValues={{ value: 0, sort_order: 0, is_published: true }}
    />
  );
}
