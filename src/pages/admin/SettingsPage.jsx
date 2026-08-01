import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Settings as SettingsIcon, Loader2, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Field, TextInput, TextArea, ImageUpload } from '@/components/admin/fields';
import { api } from '@/services';
import { useToast } from '@/contexts/ToastContext';
import { useSEO } from '@/hooks/useSEO';

const groups = [
  {
    title: 'معلومات أساسية',
    fields: [
      { key: 'site_name', label: 'اسم الموقع' },
      { key: 'site_tagline', label: 'الشعار النصي' },
      { key: 'site_description', label: 'وصف الموقع', type: 'textarea' },
      { key: 'hero_image', label: 'صورة الهيرو', type: 'image' },
      { key: 'hero_title', label: 'عنوان الهيرو' },
      { key: 'hero_subtitle', label: 'نص الهيرو التعريفي' },
    ],
  },
  {
    title: 'معلومات التواصل',
    fields: [
      { key: 'contact_phone', label: 'الهاتف' },
      { key: 'contact_email', label: 'البريد الإلكتروني' },
      { key: 'contact_address', label: 'العنوان' },
      { key: 'map_center_lat', label: 'خط عرض مركز الخريطة' },
      { key: 'map_center_lng', label: 'خط طول مركز الخريطة' },
    ],
  },
  {
    title: 'روابط التواصل الاجتماعي',
    fields: [
      { key: 'social_facebook', label: 'فيسبوك' },
      { key: 'social_twitter', label: 'إكس (تويتر)' },
      { key: 'social_instagram', label: 'إنستغرام' },
      { key: 'social_youtube', label: 'يوتيوب' },
    ],
  },
  {
    title: 'محتوى إضافي',
    fields: [
      { key: 'about_us', label: 'نبذة عن الموقع', type: 'textarea' },
      { key: 'footer_text', label: 'نص الفوتر' },
    ],
  },
];

export default function SettingsPage() {
  useSEO({ title: 'إعدادات الموقع' });
  const [form, setForm] = useState({});
  const queryClient = useQueryClient();
  const { toast, error: toastError } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.settings().then((r) => r.data),
  });

  useEffect(() => {
    if (data) setForm((prev) => ({ ...prev, ...data }));
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => api.saveSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast('تم حفظ الإعدادات بنجاح');
    },
    onError: toastError,
  });

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-gold-400">
          <SettingsIcon className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink-900">إعدادات الموقع</h1>
          <p className="text-xs text-ink-100">البيانات العامة التي تظهر في الموقع</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-16 w-full rounded-xl2" />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {groups.map((g) => (
            <div key={g.title} className="card-surface p-6">
              <h2 className="mb-5 border-b border-[#E5E7EB] pb-3 text-base font-bold text-ink-900">{g.title}</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {g.fields.map((f) => (
                  <div key={f.key} className={f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
                    {f.type === 'image' ? (
                      <Field label={f.label}>
                        <ImageUpload value={form[f.key] || ''} onChange={(v) => set(f.key, v)} />
                      </Field>
                    ) : f.type === 'textarea' ? (
                      <Field label={f.label}>
                        <TextArea value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} />
                      </Field>
                    ) : (
                      <Field label={f.label}>
                        <TextInput value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} />
                      </Field>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending} size="lg">
              {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              حفظ الإعدادات
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
