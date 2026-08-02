export const SITE = {
  name: 'طيبة الإمام',
  tagline: 'بوابة المدينة الشاملة',
  description: 'بوابة إلكترونية شاملة لمدينتك: آخر الأخبار، المشاريع، دليل الأماكن، الفعاليات، الخرائط والإحصائيات.',
  logo: '/logo.jpg',
};

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80';

export const PLACE_TYPE_LABELS = {
  schools: 'المدارس',
  hospitals: 'المشافي',
  pharmacies: 'الصيدليات',
  restaurants: 'المطاعم',
  parks: 'الحدائق',
  mosques: 'المساجد',
  gas_centers: 'مراكز الغاز',
  government: 'الدوائر الحكومية',
  hotels: 'الفنادق',
  markets: 'الأسواق',
  fuel: 'محطات الوقود',
  banks: 'البنوك',
};

export const PLACE_TYPE_KEYS = Object.keys(PLACE_TYPE_LABELS);

export const ENTITY_LABELS = {
  news: 'الأخبار',
  projects: 'المشاريع',
  places: 'الأماكن',
  events: 'الفعاليات',
  gallery: 'الصور',
  videos: 'الفيديوهات',
  statistics: 'الإحصائيات',
  pages: 'الصفحات',
  partners: 'الشركاء',
  admins: 'الإداريون',
  settings: 'الإعدادات',
};

export const DEFAULT_MAP_CENTER = {
  lat: Number(import.meta.env.VITE_MAP_CENTER_LAT) || 24.7136,
  lng: Number(import.meta.env.VITE_MAP_CENTER_LNG) || 46.6753,
};
