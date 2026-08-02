/* بيانات تجريبية تعمل عندما لا يوجد مشروع Supabase بعد (Demo Mode). */

const daysFromNow = (n) => new Date(Date.now() + n * 86400000).toISOString();
const hoursAgo = (n) => new Date(Date.now() - n * 3600000).toISOString();

export const demoCategories = [
  { id: 'c-places-schools', name: 'المدارس', slug: 'schools', type: 'places', icon: 'GraduationCap', color: '#054239', sort_order: 1 },
  { id: 'c-places-hospitals', name: 'المشافي', slug: 'hospitals', type: 'places', icon: 'Cross', color: '#6b1f2a', sort_order: 2 },
  { id: 'c-places-pharmacies', name: 'الصيدليات', slug: 'pharmacies', type: 'places', icon: 'Pill', color: '#054239', sort_order: 3 },
  { id: 'c-places-restaurants', name: 'المطاعم', slug: 'restaurants', type: 'places', icon: 'Utensils', color: '#988561', sort_order: 4 },
  { id: 'c-places-parks', name: 'الحدائق', slug: 'parks', type: 'places', icon: 'Trees', color: '#0e7a63', sort_order: 5 },
  { id: 'c-places-mosques', name: 'المساجد', slug: 'mosques', type: 'places', icon: 'Moon', color: '#054239', sort_order: 6 },
  { id: 'c-places-gas', name: 'مراكز الغاز', slug: 'gas-centers', type: 'places', icon: 'Fuel', color: '#054239', sort_order: 7 },
  { id: 'c-places-government', name: 'الدوائر الحكومية', slug: 'government', type: 'places', icon: 'Landmark', color: '#054239', sort_order: 8 },
  { id: 'c-places-hotels', name: 'الفنادق', slug: 'hotels', type: 'places', icon: 'Hotel', color: '#988561', sort_order: 9 },
  { id: 'c-places-markets', name: 'الأسواق', slug: 'markets', type: 'places', icon: 'ShoppingBag', color: '#6b1f2a', sort_order: 10 },
  { id: 'c-places-fuel', name: 'محطات الوقود', slug: 'fuel', type: 'places', icon: 'Fuel', color: '#054239', sort_order: 11 },
  { id: 'c-places-banks', name: 'البنوك', slug: 'banks', type: 'places', icon: 'Banknote', color: '#0e7a63', sort_order: 12 },
  { id: 'c-news-local', name: 'الأخبار المحلية', slug: 'local-news', type: 'news', icon: 'Newspaper', color: '#054239', sort_order: 1 },
  { id: 'c-news-projects', name: 'المشاريع', slug: 'projects-news', type: 'news', icon: 'Building2', color: '#988561', sort_order: 2 },
  { id: 'c-events-community', name: 'فعاليات المجتمع', slug: 'community-events', type: 'events', icon: 'Calendar', color: '#6b1f2a', sort_order: 1 },
  { id: 'c-events-exhibitions', name: 'المعارض', slug: 'exhibitions', type: 'events', icon: 'GalleryHorizontal', color: '#054239', sort_order: 2 },
  { id: 'c-gallery-city', name: 'معرض المدينة', slug: 'city-gallery', type: 'gallery', icon: 'Image', color: '#054239', sort_order: 1 },
  { id: 'c-gallery-nature', name: 'الطبيعة', slug: 'nature', type: 'gallery', icon: 'Leaf', color: '#0e7a63', sort_order: 2 },
  { id: 'c-videos-city', name: 'فيديو المدينة', slug: 'city-videos', type: 'videos', icon: 'Play', color: '#054239', sort_order: 1 },
];

export const demoNews = [
  {
    id: 'n-1', title: 'إطلاق المرحلة الثانية من تطوير الواجهة البحرية', slug: 'waterfront-phase-two',
    excerpt: 'أعلنت أمانة المدينة عن بدء أعمال المرحلة الثانية لتطوير الواجهة البحرية على مساحة 120 ألف متر مربع.',
    content: '<p>أعلنت أمانة المدينة عن بدء أعمال <strong>المرحلة الثانية</strong> من مشروع تطوير الواجهة البحرية، والتي ستشمل ممشى جديداً ومسطحات خضراء ومرافق ترفيهية.</p><p>ومن المتوقع أن يستفيد من المشروع أكثر من 200 ألف زائر سنوياً.</p><blockquote>المشروع يأتي ضمن رؤية المدينة المستقبلية 2030.</blockquote>',
    cover: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'الإدارة العامة', published_at: hoursAgo(48), is_published: true, views: 1240,
  },
  {
    id: 'n-2', title: 'افتتاح حديقة النور المركزية أبوابها للزوار', slug: 'central-park-opening',
    excerpt: 'افتتحت بلدية المدينة حديقة النور المركزية بمساحة 45 ألف متر مربع وبطاقة استيعابية تصل إلى 5000 زائر.',
    content: '<p>افتتحت بلدية المدينة حديقة النور المركزية التي تعد الأكبر في المدينة.</p><p>تضم الحديقة نافورة تفاعلية ومسارات للدراجات وملاعب للأطفال ومناطق للجلوس.</p>',
    cover: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'إدارة الحدائق', published_at: hoursAgo(120), is_published: true, views: 980,
  },
  {
    id: 'n-3', title: 'انطلاق مهرجان المدينة للتمور والفواكه', slug: 'dates-festival',
    excerpt: 'تنطلق النسخة الخامسة من مهرجان المدينة للتمور والفواكه بمركز المعارض الدولي وتستمر لمدة عشرة أيام.',
    content: '<p>ينطلق مهرجان المدينة للتمور والفواكه بمشاركة أكثر من 150 عارضاً محلياً.</p><p>يتضمن المهرجان ورش عمل وعروضاً شعبية وسوقاً للمنتجات الزراعية.</p>',
    cover: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'اللجنة المنظمة', published_at: hoursAgo(24), is_published: true, views: 560,
  },
  {
    id: 'n-4', title: 'توقيع اتفاقية إنشاء مجمع النقل الحديث', slug: 'transport-complex',
    excerpt: 'وقّعت أمانة المدينة اتفاقية لإنشاء مجمع نقل حديث يخدم جميع الأحياء بنظام تشغيلي ذكي.',
    content: '<p>شهدت المدينة توقيع اتفاقية إنشاء مجمع النقل الحديث الذي سيعمل بنظام تشغيلي ذكي.</p><p>سيقلل المجمع من الازدحام المروري بنسبة تصل إلى 35%.</p>',
    cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80', images: [],
    category_id: 'c-news-projects', author: 'مكتب النقل', published_at: hoursAgo(192), is_published: true, views: 730,
  },
  {
    id: 'n-5', title: 'برنامج تشجير شامل للشوارع الرئيسية', slug: 'tree-planting',
    excerpt: 'أطلقت إدارة البيئة برنامجاً لتشجير 50 شارعاً رئيسياً بأكثر من 10 آلاف شجرة محلية.',
    content: '<p>أطلقت إدارة البيئة برنامجها السنوي لتشجير الشوارع الرئيسية، مستهدفة زراعة أكثر من عشرة آلاف شجرة.</p>',
    cover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'إدارة البيئة', published_at: hoursAgo(288), is_published: true, views: 410,
  },
  {
    id: 'n-6', title: 'جائزة المدينة للابتكار في عامها الثالث', slug: 'innovation-award',
    excerpt: 'فتح باب الترشح لجائزة المدينة للابتكار في نسختها الثالثة بجوائز تصل قيمتها إلى 500 ألف ريال.',
    content: '<p>فتح باب الترشح لجائزة المدينة للابتكار بنسختها الثالثة.</p><p>تستهدف الجائزة رواد الأعمال والطلاب والمبدعين في مختلف المجالات.</p>',
    cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'مركز الابتكار', published_at: hoursAgo(360), is_published: true, views: 320,
  },
];

export const demoProjects = [
  {
    id: 'p-1', name: 'تطوير الواجهة البحرية', slug: 'waterfront-development',
    description: 'مشروع استراتيجي لتطوير الواجهة البحرية يشمل ممشى ومسطحات خضراء ومرافق ترفيهية وتجارية.',
    images: ['https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80'],
    agency: 'أمانة المدينة', start_date: '2024-03-01', end_date: '2026-06-30', progress: 62,
    budget: '850 مليون ريال', latitude: 35.26029, longitude: 36.70137, status: 'ongoing', is_published: true,
  },
  {
    id: 'p-2', name: 'مجمع النقل الحديث', slug: 'modern-transport-complex',
    description: 'إنشاء مجمع نقل متكامل يربط الأحياء بنظام ذكي ومواقف متعددة الطوابق.',
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80'],
    agency: 'مكتب النقل العام', start_date: '2024-06-01', end_date: '2027-03-31', progress: 35,
    budget: '1.2 مليار ريال', latitude: 35.29029, longitude: 36.73137, status: 'ongoing', is_published: true,
  },
  {
    id: 'p-3', name: 'الحديقة المركزية الكبرى', slug: 'grand-central-park',
    description: 'حديقة مركزية على مساحة 45 ألف متر مربع بنافورة تفاعلية ومسار للدراجات.',
    images: ['https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80'],
    agency: 'بلدية المدينة', start_date: '2023-01-01', end_date: '2025-05-31', progress: 100,
    budget: '320 مليون ريال', latitude: 35.27029, longitude: 36.71137, status: 'completed', is_published: true,
  },
  {
    id: 'p-4', name: 'تطوير الأحياء القديمة', slug: 'old-districts-renewal',
    description: 'إعادة تأهيل الأحياء التاريخية مع الحفاظ على الطابع العمراني الأصيل.',
    images: ['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'],
    agency: 'هيئة التطوير الحضري', start_date: '2025-01-01', end_date: '2027-12-31', progress: 18,
    budget: '500 مليون ريال', latitude: 35.30029, longitude: 36.68137, status: 'ongoing', is_published: true,
  },
];

export const demoProjectUpdates = [
  { id: 'u-1', project_id: 'p-1', title: 'إنجاز المرحلة الأولى من الممشى', body: 'تم إنجاز 4 كيلومترات من الممشى البحري وتركيب الإنارة الذكية.', image: null, created_at: daysFromNow(-10) },
  { id: 'u-2', project_id: 'p-1', title: 'وصول 60% من مواد الإنشاء', body: 'وصلت شحنات المواد الأساسية للمشروع وبدأ تركيب المسطحات الخضراء.', image: null, created_at: daysFromNow(-3) },
  { id: 'u-3', project_id: 'p-2', title: 'استكمال الأساسات', body: 'انتهت أعمال الأساسات للمحطة الرئيسية وجارٍ أعمال الهيكل الخرساني.', image: null, created_at: daysFromNow(-6) },
];

export const demoPlaces = [
  { id: 'pl-1', name: 'مدرسة النور الثانوية', slug: 'al-noor-high-school', description: 'مدرسة ثانوية حكومية حديثة تضم مختبرات علمية وصالات رياضية.', images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80'], category_id: 'c-places-schools', phone: '011 222 1001', website: null, address: 'حي النور', working_hours: '7:00 - 14:00', latitude: 35.26389, longitude: 36.70667, is_featured: false, is_published: true },
  { id: 'pl-2', name: 'مستشفى المدينة العام', slug: 'city-general-hospital', description: 'مستشفى عام بسعة 300 سرير يقدم خدمات طوارئ على مدار الساعة.', images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80'], category_id: 'c-places-hospitals', phone: '011 222 2000', website: null, address: 'شارع المستشفى', working_hours: '24 ساعة', latitude: 35.26829, longitude: 36.71337, is_featured: true, is_published: true },
  { id: 'pl-3', name: 'صيدلية الشفاء', slug: 'al-shifa-pharmacy', description: 'صيدلية مجهزة تجهيزاً كاملاً مع خدمة التوصيل.', images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80'], category_id: 'c-places-pharmacies', phone: '011 222 3001', website: null, address: 'حي الورود', working_hours: '8:00 - 23:00', latitude: 35.26229, longitude: 36.70937, is_featured: false, is_published: true },
  { id: 'pl-4', name: 'مطعم بيت الشواء', slug: 'grill-house', description: 'مطعم عائلي متخصص في المشويات والمأكولات الشرقية.', images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'], category_id: 'c-places-restaurants', phone: '011 222 4000', website: null, address: 'شارع التخصصي', working_hours: '12:00 - 00:00', latitude: 35.26529, longitude: 36.71037, is_featured: true, is_published: true },
  { id: 'pl-5', name: 'حديقة الواحة', slug: 'al-oasis-park', description: 'حديقة عائلية كبيرة بمسطحات خضراء وألعاب أطفال.', images: ['https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&q=80'], category_id: 'c-places-parks', phone: null, website: null, address: 'حي الواحة', working_hours: '6:00 - 23:00', latitude: 35.26129, longitude: 36.70337, is_featured: true, is_published: true },
  { id: 'pl-6', name: 'الجامع الكبير', slug: 'grand-mosque', description: 'الجامع الكبير يتسع لخمسة آلاف مصلٍّ بمئذنة مميزة.', images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80'], category_id: 'c-places-mosques', phone: null, website: null, address: 'وسط البلد', working_hours: 'حسب أوقات الصلاة', latitude: 35.26729, longitude: 36.70837, is_featured: false, is_published: true },
  { id: 'pl-7', name: 'البلدية الرئيسية', slug: 'main-municipality', description: 'مبنى البلدية الرئيسي لإنهاء المعاملات والخدمات البلدية.', images: ['https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80'], category_id: 'c-places-government', phone: '011 222 5000', website: null, address: 'شارع البلدية', working_hours: '7:30 - 14:30', latitude: 35.26629, longitude: 36.71237, is_featured: false, is_published: true },
  { id: 'pl-8', name: 'فندق المدينة الذهبي', slug: 'golden-city-hotel', description: 'فندق خمس نجوم يضم 200 غرفة وقاعات مؤتمرات.', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'], category_id: 'c-places-hotels', phone: '011 222 6000', website: null, address: 'شارع الملك فهد', working_hours: '24 ساعة', latitude: 35.26929, longitude: 36.71537, is_featured: true, is_published: true },
  { id: 'pl-9', name: 'سوق المدينة المركزي', slug: 'central-market', description: 'سوق مركزي متعدد الطوابق للمواد الغذائية والمنتجات المحلية.', images: ['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80'], category_id: 'c-places-markets', phone: '011 222 7000', website: null, address: 'حي السوق', working_hours: '9:00 - 22:00', latitude: 35.26429, longitude: 36.70537, is_featured: false, is_published: true },
  { id: 'pl-10', name: 'محطة وقود السلام', slug: 'al-salam-station', description: 'محطة وقود وخدمة سيارات متكاملة.', images: ['https://images.unsplash.com/photo-1503353567194-e2c4e091e972?w=1200&q=80'], category_id: 'c-places-fuel', phone: '011 222 8000', website: null, address: 'الدائري الغربي', working_hours: '24 ساعة', latitude: 35.26029, longitude: 36.70037, is_featured: false, is_published: true },
  { id: 'pl-11', name: 'بنك المدينة الوطني', slug: 'national-bank', description: 'فرع رئيسي لبنك المدينة الوطني مع خدمة سريعة للعملاء.', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'], category_id: 'c-places-banks', phone: '011 222 9000', website: null, address: 'شارع البنوك', working_hours: '9:00 - 16:00', latitude: 35.26879, longitude: 36.71137, is_featured: false, is_published: true },
  { id: 'pl-12', name: 'مدرسة المستقبل الابتدائية', slug: 'future-primary-school', description: 'مدرسة ابتدائية حديثة بفصول ذكية وأنشطة لاصفية.', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80'], category_id: 'c-places-schools', phone: '011 222 1002', website: null, address: 'حي المستقبل', working_hours: '7:00 - 13:30', latitude: 35.26679, longitude: 36.70737, is_featured: false, is_published: true },
];

export const demoEvents = [
  { id: 'e-1', title: 'مهرجان المدينة للتمور والفواكه', slug: 'dates-festival-event', description: 'مهرجان سنوي يضم أكثر من 150 عارضاً مع ورش عمل وعروض شعبية.', images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80'], category_id: 'c-events-community', start_date: daysFromNow(7), end_date: daysFromNow(17), location: 'مركز المعارض الدولي', latitude: 35.27029, longitude: 36.71737, organizer: 'اللجنة المنظمة', is_published: true },
  { id: 'e-2', title: 'معرض المدينة للتقنية والابتكار', slug: 'tech-expo', description: 'معرض يضم أحدث التقنيات من شركات محلية وعالمية مع جلسات ملهمة.', images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80'], category_id: 'c-events-exhibitions', start_date: daysFromNow(30), end_date: daysFromNow(32), location: 'قاعة المؤتمرات', latitude: 35.27129, longitude: 36.71837, organizer: 'مركز الابتكار', is_published: true },
  { id: 'e-3', title: 'مهرجان رمضان الثقافي', slug: 'ramadan-festival', description: 'فعاليات ثقافية وتراثية خلال شهر رمضان المبارك.', images: ['https://images.unsplash.com/photo-1554322961-e79b4bebd9a8?w=1200&q=80'], category_id: 'c-events-community', start_date: daysFromNow(60), end_date: daysFromNow(90), location: 'حي التراث', latitude: 35.26279, longitude: 36.70437, organizer: 'هيئة الثقافة', is_published: true },
  { id: 'e-4', title: 'سباق المدينة للجري', slug: 'city-marathon', description: 'سباق سنوي للجري لمسافات مختلفة بمشاركة أكثر من 3000 متسابق.', images: ['https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80'], category_id: 'c-events-community', start_date: daysFromNow(45), end_date: daysFromNow(45), location: 'الواجهة البحرية', latitude: 35.26029, longitude: 36.70137, organizer: 'الاتحاد الرياضي', is_published: true },
];

export const demoGallery = [
  { id: 'g-1', title: 'أفق المدينة عند الغروب', description: 'منظر بانورامي لأفق المدينة.', image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(200) },
  { id: 'g-2', title: 'الواجهة البحرية الجديدة', description: 'إطلالة على مشروع الواجهة البحرية.', image_url: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(190) },
  { id: 'g-3', title: 'حديقة النور المركزية', description: 'مسطحات خضراء ونافورة تفاعلية.', image_url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(180) },
  { id: 'g-4', title: 'أجواء الطبيعة في الضواحي', description: 'مساحات طبيعية خلابة.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80', category_id: 'c-gallery-nature', created_at: hoursAgo(170) },
  { id: 'g-5', title: 'مسارات المشاة', description: 'مسارات مشي آمنة ومظللة.', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80', category_id: 'c-gallery-nature', created_at: hoursAgo(160) },
  { id: 'g-6', title: 'سوق المدينة المركزي', description: 'نشاط تجاري حيوي.', image_url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(150) },
  { id: 'g-7', title: 'المكتبة العامة', description: 'مكتبة حديثة تخدم القراء.', image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(140) },
  { id: 'g-8', title: 'الجامع الكبير', description: 'تحفة معمارية إسلامية.', image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1400&q=80', category_id: 'c-gallery-city', created_at: hoursAgo(130) },
];

export const demoVideos = [
  { id: 'v-1', title: 'جولة تعريفية في المدينة', description: 'تعرف على أبرز معالم المدينة في ثلاث دقائق.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80', category_id: 'c-videos-city', duration: 180, is_published: true },
  { id: 'v-2', title: 'مشروع الواجهة البحرية', description: 'تقرير مصور حول تقدم أعمال المشروع.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80', category_id: 'c-videos-city', duration: 240, is_published: true },
  { id: 'v-3', title: 'مهرجان التمور - لقطات', description: 'أبرز اللقطات من فعاليات المهرجان.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80', category_id: 'c-videos-city', duration: 150, is_published: true },
];

export const demoStatistics = [
  { id: 's-1', label: 'عدد السكان', value: 40000, icon: 'Users', sort_order: 1, is_published: true },
  { id: 's-2', label: 'المدرّسون', value: 750, icon: 'GraduationCap', link: '/places?cat=schools', sort_order: 2, is_published: true },
  { id: 's-3', label: 'الأطباء', value: 200, icon: 'Cross', link: '/places?cat=hospitals', sort_order: 3, is_published: true },
  { id: 's-4', label: 'المحامون', value: 100, icon: 'Landmark', link: '/places?cat=government', sort_order: 4, is_published: true },
  { id: 's-5', label: 'المهندسون', value: 200, icon: 'Building2', link: '/projects?status=ongoing', sort_order: 5, is_published: true },
  { id: 's-6', label: 'المسافة عن مركز حماة (كم)', value: 18, icon: 'Map', link: '/map', sort_order: 6, is_published: true },
  { id: 's-7', label: 'مساحة لوحة الفسيفساء (م2)', value: 600, icon: 'Star', sort_order: 7, is_published: true },
];

export const demoPartners = [
  { id: 'pa-1', name: 'أمانة المدينة', logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&q=80', website: null, sort_order: 1, is_published: true },
  { id: 'pa-2', name: 'بلدية المدينة', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', website: null, sort_order: 2, is_published: true },
  { id: 'pa-3', name: 'غرفة التجارة', logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', website: null, sort_order: 3, is_published: true },
  { id: 'pa-4', name: 'جامعة المدينة', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80', website: null, sort_order: 4, is_published: true },
];

export const demoPages = [
  { id: 'pg-1', title: 'عن المدينة', slug: 'about', content: '<h2>طيبة الإمام... مدينة التاريخ والطيب</h2><p>طيبة الإمام مدينة سورية تقع في ناحية صوران التابعة لمنطقة حماة، في الريف الشمالي الغربي لمحافظة حماة، على بُعد نحو 18 كيلومتراً شمال مدينة حماة و3 كيلومترات غرب الطريق الدولي (حماة-حلب).</p><h3>التسمية</h3><p>سُمّيت المدينة نسبةً إلى ضريح الإمام علي بن الحسين زين العابدين بن علي بن أبي طالب، حيث دُفن جثمانه في هذا المكان منذ أكثر من ألف عام.</p><h3>التراث والآثار</h3><p>مدينة تاريخية اكتُشفت فيها العديد من اللقى الأثرية، ومن أبرز معالمها أكبر لوحة فسيفساء في العالم وتبلغ مساحتها نحو 600 متر مربع، وتُعرض اليوم في متحف طيبة الإمام، كما كانت مئذنة مسجد الإمام المستطيلة (الهزازة) واحدة من ثلاث مآذن من نوعها في العالم.</p><h3>الاقتصاد</h3><p>يقوم اقتصاد المدينة على التجارة والزراعة والصناعة؛ إذ تنتشر فيها زراعة الفستق الحلبي والزيتون والعنب، إضافة إلى صناعة الأحذية الجلدية والصناعات الخفيفة.</p><h3>التعليم</h3><p>تحتل طيبة الإمام المرتبة الأولى على مستوى الجمهورية نسبةً لعدد السكان من حملة الشهادات العليا، ويُقدَّر عدد سكانها بأكثر من 40 ألف نسمة، ويكثر فيها الأطباء والمهندسون والمدرّسون والأكاديميون.</p>', is_published: true },
  { id: 'pg-2', title: 'اتصل بنا', slug: 'contact', content: '<h2>تواصل معنا</h2><p>نرحب باستفساراتكم واقتراحاتكم على مدار الساعة عبر قنوات التواصل المتاحة.</p><p>هاتف: 011 234 5678 — البريد: info@madinti.gov.sa</p>', is_published: true },
];

export const demoSettings = {
  site_name: 'طيبة الإمام',
  site_tagline: 'بوابة المدينة الشاملة',
  site_description: 'بوابة إلكترونية شاملة لمدينة طيبة الإمام في ريف حماة: الأخبار، المشاريع، دليل الأماكن، الفعاليات، الخرائط والإحصائيات.',
  hero_image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1600&q=80',
  hero_title: 'مرحباً بكم في مدينة طيبة الإمام',
  hero_subtitle: 'بوابة شاملة تعرّف بمدينة طيبة الإمام: أخبارها، مشاريعها، أماكنها، فعالياتها وتراثها العريق.',
  contact_phone: '011 234 5678',
  contact_email: 'info@madinti.gov.sa',
  contact_address: 'مدينة طيبة الإمام، ريف حماة الشمالي، محافظة حماة، سوريا',
  social_facebook: 'https://facebook.com',
  social_twitter: 'https://x.com',
  social_instagram: 'https://instagram.com',
  social_youtube: 'https://youtube.com',
  map_center_lat: '35.26389',
  map_center_lng: '36.70667',
  about_us: 'طيبة الإمام مدينة سورية في ناحية صوران التابعة لمنطقة حماة، تقع في الريف الشمالي الغربي لمحافظة حماة على بُعد نحو 18 كم شمال مدينة حماة و3 كم غرب الطريق الدولي (حماة-حلب). سُمّيت نسبةً إلى ضريح الإمام علي بن الحسين زين العابدين، الحفيد السادس للإمام علي بن أبي طالب، حيث دُفن جثمانه في هذا المكان منذ أكثر من ألف عام. تشتهر المدينة بتراثها الأثري؛ فقد اكتُشفت فيها أكبر لوحة فسيفساء في العالم (نحو 600 م2) تعود للقرن الخامس الميلادي وتُعرض في متحف طيبة الإمام، كما كانت مئذنة مسجد الإمام المستطيلة (الهزازة) من أبرز معالمها. اقتصاد المدينة يقوم على التجارة والزراعة والصناعة، وتنتشر فيها زراعة الفستق الحلبي والزيتون والعنب وصناعة الأحذية الجلدية، وتُعرف بطيبة أهلها وارتفاع التحصيل العلمي، إذ يُقدَّر عدد سكانها بأكثر من 40 ألف نسمة.',
  footer_text: '© 2026 طيبة الإمام — جميع الحقوق محفوظة.',
};

export const demoOverviews = {
  news_count: demoNews.length,
  projects_count: demoProjects.length,
  places_count: demoPlaces.length,
  events_count: demoEvents.length,
  gallery_count: demoGallery.length,
  videos_count: demoVideos.length,
  partners_count: demoPartners.length,
};

export const demoAds = [
  { id: 'ad-1', title: 'انطلاقة مشروع النقل الذكي الجديد', body: 'تعرف على خطة تحديث شبكة النقل العام في طيبة الإمام وخدماتها الجديدة لسكان المدينة وزوارها.', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80', link: 'https://example.com', sort_order: 1, is_published: true },
  { id: 'ad-2', title: 'مهرجان طيبة للإبداع الشبابي', body: 'فعاليات وأنشطة ثقافية وفنية تستضيفها المدينة طوال الموسم القادم.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', link: null, sort_order: 2, is_published: true },
];

export const demoCollections = {
  categories: demoCategories,
  news: demoNews,
  projects: demoProjects,
  project_updates: demoProjectUpdates,
  places: demoPlaces,
  events: demoEvents,
  gallery: demoGallery,
  videos: demoVideos,
  statistics: demoStatistics,
  pages: demoPages,
  partners: demoPartners,
  ads: demoAds,
  settings: demoSettings,
  city_overview_stats: demoOverviews,
};
