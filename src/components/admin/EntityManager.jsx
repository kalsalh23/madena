import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Pencil, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { api } from '@/services';
import { useToast } from '@/contexts/ToastContext';
import { useDebounce } from '@/hooks';
import {
  Field, TextInput, TextArea, NumberInput, Select, Toggle,
  ImageUpload, MultipleImageUpload, RichEditor,
} from './fields';
import { generateSlug } from '@/lib/utils';
import { isDemoMode } from '@/services';
import { toLocalInputValue, formatDate } from '@/lib/utils';

export default function EntityManager({
  title,
  icon: Icon,
  entity,
  columns,
  fields,
  searchFields = [],
  defaultValues = {},
  transform = (v) => v,
  extraActions,
}) {
  const queryClient = useQueryClient();
  const { toast, error: toastError } = useToast();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // { mode: 'create' } | { mode: 'edit', item }
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const debounced = useDebounce(search, 350);

  const key = [entity];

  const { data, isLoading } = useQuery({
    queryKey: [...key, debounced],
    queryFn: () => api.list(entity, { search: debounced, searchFields, order: 'created_at', perPage: 500, page: 1, includeExpired: true }).then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (payload) => api.create(entity, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      toast('تمت الإضافة بنجاح');
      setModal(null);
    },
    onError: toastError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => api.update(entity, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      toast('تم التحديث بنجاح');
      setModal(null);
    },
    onError: toastError,
  });

  const togglePublish = async (item) => {
    try {
      await api.update(entity, item.id, { is_published: !item.is_published });
      queryClient.invalidateQueries({ queryKey: key });
      toast(item.is_published ? 'تم الإخفاء' : 'تم النشر');
    } catch (err) {
      toastError(err);
    }
  };

  const doDelete = async () => {
    setSaving(true);
    try {
      await api.remove(entity, deleting.id);
      queryClient.invalidateQueries({ queryKey: key });
      toast('تم الحذف');
      setDeleting(null);
    } catch (err) {
      toastError(err);
    } finally {
      setSaving(false);
    }
  };

  const openCreate = () => {
    setForm({ ...defaultValues });
    setModal({ mode: 'create' });
  };

  const openEdit = (item) => {
    setForm({ ...defaultValues, ...item });
    setModal({ mode: 'edit', item });
  };

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = transform(form);
      if (payload.expires_at !== undefined) {
        payload.expires_at = payload.expires_at ? new Date(payload.expires_at).toISOString() : null;
      }
      if (modal.mode === 'create') {
        await createMutation.mutateAsync(payload);
      } else {
        const { id, created_at, updated_at, category, views, ...rest } = payload;
        await updateMutation.mutateAsync({ id, payload: rest });
      }
    } catch {
      /* handled by mutation onError */
    } finally {
      setSaving(false);
    }
  };

  const renderField = (f) => {
    const value = form[f.name] ?? '';
    switch (f.type) {
      case 'textarea':
        return <TextArea value={value} onChange={(e) => set(f.name, e.target.value)} required={f.required} />;
      case 'richtext':
        return <RichEditor value={value || ''} onChange={(v) => set(f.name, v)} />;
      case 'number':
        return <NumberInput value={value} onChange={(e) => set(f.name, Number(e.target.value))} required={f.required} min={f.min} max={f.max} />;
      case 'select':
        return <Select options={f.options || []} value={value || ''} onChange={(e) => set(f.name, e.target.value)} required={f.required} />;
      case 'toggle':
        return <Toggle checked={Boolean(value)} onChange={(v) => set(f.name, v)} label={f.label} />;
      case 'image':
        return <ImageUpload value={value} onChange={(v) => set(f.name, v)} aspect={f.aspect} />;
      case 'images':
        return <MultipleImageUpload value={value || []} onChange={(v) => set(f.name, v)} />;
      case 'date':
        return <TextInput type="date" value={value || ''} onChange={(e) => set(f.name, e.target.value)} />;
      case 'datetime':
        return (
          <TextInput
            type="datetime-local"
            value={value ? toLocalInputValue(value) : ''}
            onChange={(e) => set(f.name, e.target.value)}
          />
        );
      default:
        return <TextInput value={value} onChange={(e) => set(f.name, e.target.value)} required={f.required} />;
    }
  };

  const hasPublish = fields.some((f) => f.name === 'is_published');
  const hasExpiry = fields.some((f) => f.name === 'expires_at');

  const expiryBadge = (item) => {
    if (!item.expires_at) {
      return <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500">دائم</span>;
    }
    const expired = new Date(item.expires_at).getTime() <= Date.now();
    return (
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${expired ? 'bg-wine-50 text-wine-700' : 'bg-emerald-50 text-emerald-600'}`}>
        {expired ? 'منتهي · ' : ''}
        {formatDate(item.expires_at)}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <div>
            <h1 className="text-xl font-bold text-ink-900">{title}</h1>
            <p className="text-xs text-ink-100">{data?.length || 0} عنصر</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-100" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث..."
              className="input w-48 pr-9 sm:w-56"
            />
          </div>
          {extraActions}
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            إضافة جديد
          </Button>
        </div>
      </div>

      <div className="card-surface overflow-x-auto">
        {isLoading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-12 w-full" />
            ))}
          </div>
        ) : !data?.length ? (
          <div className="p-6">
            <EmptyState title={`لا توجد ${title}`} description="ابدأ بإضافة عنصر جديد." />
          </div>
        ) : (
          <table className="w-full min-w-[720px] text-right text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs text-ink-100">
                {columns.map((c) => (
                  <th key={c.key} className="px-5 py-3.5 font-bold">
                    {c.label}
                  </th>
                ))}
                {hasPublish && <th className="px-5 py-3.5 font-bold">النشر</th>}
                {hasExpiry && <th className="px-5 py-3.5 font-bold">الانتهاء</th>}
                <th className="px-5 py-3.5 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-brand-50/40">
                  {columns.map((c) => (
                    <td key={c.key} className="px-5 py-4">
                      {c.render ? c.render(item) : item[c.key]}
                    </td>
                  ))}
                  {hasPublish && (
                    <td className="px-5 py-4">
                      <button
                        onClick={() => togglePublish(item)}
                        title={item.is_published ? 'إخفاء' : 'نشر'}
                        className={`rounded-full p-2 transition-colors ${
                          item.is_published
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {item.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </td>
                  )}
                  {hasExpiry && <td className="px-5 py-4">{expiryBadge(item)}</td>}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-brand-700 transition-colors hover:bg-brand-100"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(item)}
                        className="rounded-lg p-2 text-wine-600 transition-colors hover:bg-wine-50"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal?.mode === 'create' ? `إضافة ${title}` : `تعديل: ${modal?.item?.title || modal?.item?.name || ''}`}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-5">
          {fields.map((f) => (
            <div key={f.name} className={f.type === 'richtext' || f.type === 'textarea' || f.type === 'images' ? 'sm:col-span-2' : ''}>
              {f.type === 'toggle' ? (
                <div className="mb-5">{renderField(f)}</div>
              ) : (
                <Field label={f.label} hint={f.hint}>
                  {renderField(f)}
                </Field>
              )}
            </div>
          ))}
          <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="ghost" onClick={() => setModal(null)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              حفظ
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} title="تأكيد الحذف" size="sm">
        <p className="mb-6 text-sm text-ink-100">
          هل أنت متأكد من حذف «{deleting?.title || deleting?.name || ''}»؟ لا يمكن التراجع عن هذا الإجراء.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleting(null)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={doDelete} disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            حذف نهائي
          </Button>
        </div>
      </Modal>

      {isDemoMode && (
        <div className="mt-4 flex items-center gap-2 rounded-xl2 border border-gold-300 bg-gold-50 px-4 py-3 text-xs font-semibold text-gold-700">
          وضع العرض التجريبي نشط — للتعديل الحقيقي اربط Supabase عبر ملف .env.
        </div>
      )}
    </div>
  );
}
