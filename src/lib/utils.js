export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(value, options = {}) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
}

export function formatNumber(value) {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('ar-SA').format(value);
}

export function generateSlug(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function truncate(value, length = 120) {
  if (!value) return '';
  if (value.length <= length) return value;
  return `${value.slice(0, length).trimEnd()}…`;
}

export function stripHtml(value) {
  if (!value) return '';
  return value.replace(/<[^>]*>/g, '');
}

export function formatDuration(seconds) {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function isValidUrl(value) {
  try {
    return Boolean(new URL(value));
  } catch {
    return false;
  }
}

export function toLocalInputValue(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
