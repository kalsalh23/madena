import { supabase, isDemoMode } from '@/lib/supabase';

const BUCKET = 'media';

export async function uploadFile(file, folder = 'general') {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 500));
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const ext = file.name.split('.').pop() || 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadMultiple(files, folder = 'general') {
  const results = [];
  for (const file of files) {
    results.push(await uploadFile(file, folder));
  }
  return results;
}

export function publicUrl(path) {
  if (!path) return '';
  if (isDemoMode) return path;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function removeFile(url) {
  if (isDemoMode) return;
  try {
    const path = decodeURIComponent(new URL(url).pathname.split(`/${BUCKET}/`)[1] || '');
    if (!path) return;
    await supabase.storage.from(BUCKET).remove([path]);
  } catch {
    /* تجاهل الأخطاء في الحذف */
  }
}
