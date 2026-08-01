import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'لا توجد بيانات بعد', description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border-2 border-dashed border-[#E5E7EB] bg-white/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
        {Icon ? <Icon className="h-7 w-7 text-brand-600" /> : <Inbox className="h-7 w-7 text-brand-600" />}
      </div>
      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-100">{description}</p>}
    </div>
  );
}
