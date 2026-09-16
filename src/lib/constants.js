export const SITE = {
  name: 'طيبة الإمام',
  tagline: 'بوابة المدينة الشاملة',
  description: 'بوابة إلكترونية شاملة لمدينتك: آخر الأخبار، المشاريع، دليل الأماكن، الفعاليات، الخرائط والإحصائيات.',
  logo: '/logo.png',
  developer_name: 'المهندس قصي مهند الصالح',
  developer_phone: '0952639157',
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
  markets: 'الأسواق',
  fuel: 'محطات الوقود',
  exchanges: 'مراكز الصرافة',
};

export const PLACE_TYPE_KEYS = Object.keys(PLACE_TYPE_LABELS);

export const ENTITY_LABELS = {
  news: 'الأخبار',
  projects: 'المشاريع',
  places: 'الأماكن',
  statistics: 'الإحصائيات',
  pages: 'الصفحات',
  partners: 'الشركاء',
  admins: 'الإداريون',
  settings: 'الإعدادات',
};

// إحداثيات مدينة طيبة الإمام (محافظة حماة)
export const DEFAULT_MAP_CENTER = {
  lat: Number(import.meta.env.VITE_MAP_CENTER_LAT) || 35.2685,
  lng: Number(import.meta.env.VITE_MAP_CENTER_LNG) || 36.7175,
};

// المسار المخصص للوحة التحكم — يُعطى لمدير النظام فقط ولا يظهر في الواجهة العامة
export const ADMIN_BASE_PATH = '/portal-almadena';
