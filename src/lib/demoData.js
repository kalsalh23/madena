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
  { id: 'c-places-landmarks', name: 'المعالم الأثرية', slug: 'landmarks', type: 'places', icon: 'Monument', color: '#6b1f2a', sort_order: 13 },
  { id: 'c-news-local', name: 'الأخبار المحلية', slug: 'local-news', type: 'news', icon: 'Newspaper', color: '#054239', sort_order: 1 },
  { id: 'c-news-projects', name: 'المشاريع', slug: 'projects-news', type: 'news', icon: 'Building2', color: '#988561', sort_order: 2 },
  { id: 'c-events-community', name: 'فعاليات المجتمع', slug: 'community-events', type: 'events', icon: 'Calendar', color: '#6b1f2a', sort_order: 1 },
  { id: 'c-events-exhibitions', name: 'المعارض', slug: 'exhibitions', type: 'events', icon: 'GalleryHorizontal', color: '#054239', sort_order: 2 },
  { id: 'c-videos-city', name: 'فيديو المدينة', slug: 'city-videos', type: 'videos', icon: 'Play', color: '#054239', sort_order: 1 },
];

export const demoNews = [
  {
    id: 'n-1', title: 'مبادرة مجتمعية لتنظيف مدارس طيبة الإمام استعداداً للعام الدراسي', slug: 'schools-cleanup-initiative',
    excerpt: 'أطلق مجلس مدينة طيبة الإمام بالتعاون مع لجنة تسيير الأعمال والمتطوعين مبادرة لتنظيف جميع مدارس المدينة استعداداً للعام الدراسي الجديد.',
    content: '<p>أطلق مجلس مدينة طيبة الإمام، في محافظة حماة، بالتعاون مع لجنة تسيير الأعمال ونشطاء المجتمع المحلي، مبادرة تنظيف كبرى تستهدف مدارس المدينة استعداداً لاستقبال العام الدراسي الجديد.</p><p>وقال رئيس مجلس مدينة طيبة الإمام أحمد عبد الله حج علي: «أطلقنا المبادرة بالتعاون مع نشطاء المجتمع المحلي لتنظيف جميع المدارس في مدينة طيبة الإمام»، مؤكداً أن الخطوة ضمن أولويات المجلس لخدمة قطاع التعليم.</p><p>وتستمر الحملة أربعة أيام وتشمل جميع مدارس المدينة، ما يعكس صورة حية للتكافل والعطاء المجتمعي.</p>',
    cover: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'مجلس مدينة طيبة الإمام', published_at: hoursAgo(240), is_published: true, views: 1240,
  },
  {
    id: 'n-2', title: 'افتتاح مكتب بريد جديد في مدينة طيبة الإمام', slug: 'post-office-opening',
    excerpt: 'افتتحت المؤسسة السورية للبريد مكتباً بريدياً جديداً في مدينة طيبة الإمام ضمن خطتها لتوسيع الخدمات البريدية في الريف الشمالي.',
    content: '<p>افتتحت المؤسسة السورية للبريد مكتباً بريدياً جديداً في مدينة طيبة الإمام بريف حماة الشمالي، ضمن خطتها الرامية إلى توسيع انتشار المكاتب البريدية.</p><p>يقدم المكتب مجموعة من الخدمات أبرزها صرف رواتب المتقاعدين، واستلام الحوالات الداخلية، وخدمة شام كاش، وإصدار وثيقة غير عامل.</p><p>وأعرب أهالي المدينة عن ارتياحهم لأن المكتب الجديد خفف عنهم مشقة السفر لمسافات طويلة لإنهاء معاملاتهم البريدية.</p>',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'المؤسسة السورية للبريد', published_at: hoursAgo(192), is_published: true, views: 980,
  },
  {
    id: 'n-3', title: 'أهالي طيبة الإمام يضيئون شوارع مدينتهم بالطاقة الشمسية', slug: 'solar-street-lighting',
    excerpt: 'جمع أهالي طيبة الإمام تبرعاتهم لإنارة شوارع المدينة بالطاقة الشمسية؛ إذ جرى تركيب 650 جهاز إنارة منها 500 بتبرعات أهلية.',
    content: '<p>جمع أهالي مدينة طيبة الإمام في ريف حماة الشمالي التبرعات لإنارة شوارعهم بالطاقة الشمسية.</p><p>تم تركيب 650 جهاز إنارة، منها 500 بتبرعات أهلية، وُزّعت في الشوارع الرئيسية والساحات، ما أعاد تفعيل عمل الأسواق التجارية وتنشيط حركة السكان ليلاً حتى ساعات الفجر.</p><p>وسبق ذلك مبادرات أهلية عدة في المدينة، منها شراء باصي نقل داخلي بسعة 30 راكباً ووضعهما في الخدمة لنقل الطلاب والموظفين.</p>',
    cover: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'أهالي المدينة', published_at: hoursAgo(144), is_published: true, views: 560,
  },
  {
    id: 'n-4', title: 'متحف طيبة الإمام يحتضن أكبر لوحة فسيفساء في العالم', slug: 'mosaic-museum',
    excerpt: 'يضم متحف طيبة الإمام أكبر لوحة فسيفساء في العالم بمساحة نحو 600 متر مربع، ترصف أرض كنيسة «الشهداء القديسين» البيزنطية.',
    content: '<p>يضم متحف طيبة الإمام أكبر لوحة فسيفساء في العالم، وتبلغ مساحتها نحو 600 متر مربع.</p><p>ترصف اللوحة أرض كنيسة «الشهداء القديسين» البيزنطية التي اكتملت عام 442 ميلادية، وتزينها رسوم هندسية وحيوانات وأبنية وكنائس من بينها كنائس بيت لحم والقدس.</p><p>اكتشفت اللوحة بين عامي 1985 و1987، وأقيم حولها المتحف بجهود سورية-إيطالية ليتمكن الزوار من مشاهدتها من جميع الجهات والتعرف على أدق تفاصيلها.</p>',
    cover: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'المديرية العامة للآثار والمتاحف', published_at: hoursAgo(120), is_published: true, views: 730,
  },
  {
    id: 'n-5', title: 'فريق طيبة الإمام للكرة الطائرة ضمن فرق الدرجة الأولى', slug: 'volleyball-team',
    excerpt: 'يواصل فريق طيبة الإمام للكرة الطائرة منافساته ضمن فرق الدرجة الأولى على مستوى الجمهورية.',
    content: '<p>يُعد فريق طيبة الإمام للكرة الطائرة من فرق الدرجة الأولى على مستوى الجمهورية العربية السورية.</p><p>وتتميز المدينة بارتفاع نسبة التحصيل العلمي، إذ تحل طيبة الإمام في المرتبة الأولى على مستوى الجمهورية نسبةً لعدد السكان من حملة الشهادات العليا، ويكثر فيها الأطباء والمهندسون والمدرّسون والأكاديميون.</p>',
    cover: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80', images: [],
    category_id: 'c-news-local', author: 'فريق المدينة', published_at: hoursAgo(72), is_published: true, views: 410,
  },
  {
    id: 'n-6', title: 'حملة «همة طيبة» الخيرية تجمع تبرعات لخدمة المدينة', slug: 'himmah-campaign',
    excerpt: 'انطلقت حملة «همة طيبة» لجمع التبرعات في مدينة طيبة الإمام بمشاركة واسعة من أبناء المدينة في الداخل والمغترب، وجرى تمديدها حتى 2 أغسطس 2026.',
    content: '<p>انطلقت حملة «همة طيبة» الخيرية لجمع التبرعات في مدينة طيبة الإمام، بمشاركة واسعة من أبناء المدينة في الداخل والمغترب.</p><p>تستهدف الحملة دعم المبادرات الأهلية وخدمة المدينة من إنارة الشوارع وتجهيز المدارس ومساعدة المحتاجين.</p><p>وأعلن القائمون عليها تمديد فترة التبرع حتى يوم الأحد 2 أغسطس 2026، من الساعة السابعة حتى العاشرة مساءً، في الموقع المخصص شرق جامع عبدالله بن رواحة، نظراً للإقبال الكبير على المساهمة.</p><p>وشهدت الحملة مساهمات موثقة من أبناء المدينة، منها مساهمة السيد جمال الخطيب وأولاده بقيمة 2000 دولار، والسيد أكرم الخليل بقيمة 2500 دولار، والسيد عبد الناصر الخليل بقيمة 2000 دولار، وأبناء الحاج نصر الخليل العمر بقيمة 1000 دولار، والسيد خليل أحمد الخليل بقيمة 65000 ليرة سورية.</p>',
    cover: '/images/tayba/campaign_hq.jpg', images: ['/images/tayba/campaign_hq.jpg', '/images/tayba/photo1.jpg', '/images/tayba/photo2.jpg', '/images/tayba/photo3.jpg', '/images/tayba/photo4.jpg', '/images/tayba/photo5.jpg', '/images/tayba/photo6.jpg', '/images/tayba/photo7.jpg'],
    category_id: 'c-news-local', author: 'لجنة الحملة', published_at: hoursAgo(24), is_published: true, views: 320,
  },
];

export const demoProjects = [
  {
    id: 'p-1', name: 'مشروع إنارة شوارع طيبة الإمام بالطاقة الشمسية', slug: 'solar-lighting-project',
    description: 'مبادرة أهلية لإنارة شوارع المدينة بالطاقة الشمسية شملت تركيب 650 جهاز إنارة في الشوارع الرئيسية والساحات.',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80'],
    agency: 'مجلس مدينة طيبة الإمام', start_date: '2024-01-01', end_date: '2025-12-31', progress: 100,
    budget: null, latitude: 35.2645, longitude: 36.7071, status: 'completed', is_published: true,
  },
  {
    id: 'p-2', name: 'باصات النقل الداخلي لخدمة أهالي المدينة', slug: 'inner-transport-buses',
    description: 'مبادرة أهلية بتأمين باصي نقل داخلي بسعة 30 راكباً لنقل الطلاب والموظفين بين أحياء المدينة والمراكز الخدمية.',
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80'],
    agency: 'أهالي المدينة', start_date: '2024-06-01', end_date: '2025-03-31', progress: 100,
    budget: null, latitude: 35.2640, longitude: 36.7065, status: 'completed', is_published: true,
  },
  {
    id: 'p-3', name: 'إعادة تأهيل مدارس المدينة استعداداً للعام الدراسي', slug: 'schools-rehabilitation',
    description: 'مبادرة مجتمعية لتنظيف وتأهيل جميع مدارس المدينة بعد سنوات الإهمال، لضمان بيئة مدرسية نظيفة وصحية.',
    images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80'],
    agency: 'مجلس المدينة ولجنة تسيير الأعمال', start_date: '2025-08-01', end_date: '2026-09-30', progress: 70,
    budget: null, latitude: 35.2635, longitude: 36.7070, status: 'ongoing', is_published: true,
  },
  {
    id: 'p-4', name: 'صيانة وتجهيز مشفى الجواش', slug: 'jawash-hospital-upgrade',
    description: 'أعمال صيانة وتجهيز مشفى الجواش في وسط المدينة لتأمين الخدمات الطبية الأساسية لأهالي طيبة الإمام.',
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80'],
    agency: 'مديرية صحة حماة', start_date: '2025-01-01', end_date: '2026-12-31', progress: 40,
    budget: null, latitude: 35.2648, longitude: 36.7065, status: 'ongoing', is_published: true,
  },
];

export const demoProjectUpdates = [
  { id: 'u-1', project_id: 'p-1', title: 'اكتمال تركيب أجهزة الإنارة', body: 'اكتمل تركيب 650 جهاز إنارة على الطاقة الشمسية في الشوارع الرئيسية والساحات.', image: null, created_at: daysFromNow(-30) },
  { id: 'u-2', project_id: 'p-3', title: 'انطلاق مبادرة تنظيف المدارس', body: 'بدأت المبادرة المجتمعية لتنظيف جميع مدارس المدينة استعداداً للعام الدراسي الجديد.', image: null, created_at: daysFromNow(-10) },
  { id: 'u-3', project_id: 'p-4', title: 'أعمال الصيانة مستمرة', body: 'تتواصل أعمال صيانة وتجهيز مشفى الجواش لتأمين الخدمات الطبية الأساسية.', image: null, created_at: daysFromNow(-5) },
];

export const demoPlaces = [
  { id: 'pl-1', name: 'متحف طيبة الإمام', slug: 'tayyibat-al-imam-museum', description: 'يضم المتحف أكبر لوحة فسيفساء في العالم بمساحة نحو 600 متر مربع، ترصف أرض كنيسة «الشهداء القديسين» البيزنطية التي اكتملت عام 442 ميلادية.', images: ['https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80'], category_id: 'c-places-landmarks', phone: null, website: null, address: 'وسط المدينة', working_hours: 'حسب توقيت الدوام', latitude: 35.2642, longitude: 36.7075, is_featured: true, is_published: true },
  { id: 'pl-2', name: 'جامع الإمام الكبير (جامع المقام)', slug: 'grand-imam-mosque', description: 'يضم ضريح الإمام علي بن الحسين زين العابدين، ويشتهر بمئذنته المستطيلة «الهزازة» التي تُعد واحدة من ثلاث مآذن من نوعها في العالم.', images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80'], category_id: 'c-places-mosques', phone: null, website: null, address: 'وسط المدينة', working_hours: 'حسب أوقات الصلاة', latitude: 35.2632, longitude: 36.7058, is_featured: true, is_published: true },
  { id: 'pl-3', name: 'ضريح الإمام علي بن الحسين زين العابدين', slug: 'shrine-of-ali-ibn-al-husayn', description: 'الحفيد السادس للإمام علي بن أبي طالب، دُفن جثمانه في هذا المكان منذ أكثر من ألف عام، ونُسبت إليه تسمية المدينة.', images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80'], category_id: 'c-places-mosques', phone: null, website: null, address: 'جامع المقام', working_hours: 'حسب أوقات الصلاة', latitude: 35.2634, longitude: 36.7057, is_featured: false, is_published: true },
  { id: 'pl-4', name: 'مشفى الجواش', slug: 'jawash-hospital', description: 'مشفى في قلب مدينة طيبة الإمام على الشارع الرئيسي، يقدم الخدمات الطبية الأساسية لأهالي المدينة والمنطقة.', images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80'], category_id: 'c-places-hospitals', phone: null, website: null, address: 'الشارع الرئيسي', working_hours: '24 ساعة', latitude: 35.2648, longitude: 36.7065, is_featured: true, is_published: true },
  { id: 'pl-5', name: 'مشفى صوران الوطني', slug: 'souran-national-hospital', description: 'مشفى حكومي على أوتوستراد حماة-حلب بسعة 60 سريراً، يخدم مدينة طيبة الإمام وقرى ريف حماة الشمالي ويستقبل الحوادث المرورية.', images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80'], category_id: 'c-places-hospitals', phone: null, website: null, address: 'أوتوستراد حماة-حلب', working_hours: '24 ساعة', latitude: 35.2850, longitude: 36.7210, is_featured: true, is_published: true },
  { id: 'pl-6', name: 'مجلس مدينة طيبة الإمام', slug: 'tayyibat-al-imam-municipality', description: 'المقر الإداري للمدينة لإنهاء المعاملات والخدمات البلدية، ويشرف على المبادرات الخدمية في المدينة.', images: ['https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80'], category_id: 'c-places-government', phone: null, website: null, address: 'مركز المدينة', working_hours: '7:30 - 14:30', latitude: 35.2640, longitude: 36.7069, is_featured: false, is_published: true },
  { id: 'pl-7', name: 'مكتب بريد طيبة الإمام', slug: 'tayyibat-al-imam-post-office', description: 'افتُتح عام 2025 ليقدم خدمات صرف رواتب المتقاعدين والحوالات الداخلية وخدمة شام كاش لسكان المدينة والقرى المجاورة.', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'], category_id: 'c-places-government', phone: null, website: null, address: 'مركز المدينة', working_hours: '9:00 - 14:00', latitude: 35.2636, longitude: 36.7072, is_featured: false, is_published: true },
  { id: 'pl-8', name: 'المركز الثقافي في طيبة الإمام', slug: 'tayyibat-al-imam-cultural-center', description: 'من أكبر المراكز الثقافية في محافظة حماة، يستضيف الندوات والأمسيات الأدبية والأنشطة الثقافية والفكرية.', images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80'], category_id: 'c-places-landmarks', phone: null, website: null, address: 'مركز المدينة', working_hours: 'حسب الفعاليات', latitude: 35.2645, longitude: 36.7060, is_featured: false, is_published: true },
  { id: 'pl-9', name: 'موقع المدينة الأثرية (المعبد المكتشف)', slug: 'ancient-temple-site', description: 'كشف أثري لمعبد تحت الأرض شرق مبنى المقسم، ويؤكد أن المنطقة منطقة آثار تضم مدينة أثرية مدفونة.', images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80'], category_id: 'c-places-landmarks', phone: null, website: null, address: 'شرق مبنى المقسم', working_hours: 'مفتوح', latitude: 35.2630, longitude: 36.7080, is_featured: false, is_published: true },
  { id: 'pl-10', name: 'مبنى المقسم', slug: 'telephone-exchange-building', description: 'معلم من معالم المدينة، وتقع في محيطه الاكتشافات الأثرية المهمة بين مبنى البلدية ومعمل السجاد.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'], category_id: 'c-places-landmarks', phone: null, website: null, address: 'مركز المدينة', working_hours: 'مفتوح', latitude: 35.2633, longitude: 36.7078, is_featured: false, is_published: true },
  { id: 'pl-11', name: 'سوق طيبة الإمام المركزي', slug: 'tayyibat-al-imam-market', description: 'الأسواق التجارية على الشارع الرئيسي، تشتهر بصناعة الأحذية الجلدية والمنتجات المحلية وتنشط حتى ساعات الليل.', images: ['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80'], category_id: 'c-places-markets', phone: null, website: null, address: 'الشارع الرئيسي', working_hours: '9:00 - 22:00', latitude: 35.2646, longitude: 36.7070, is_featured: true, is_published: true },
];

export const demoEvents = [
  { id: 'e-1', title: 'حملة «همة طيبة» الخيرية', slug: 'himmah-event', description: 'حملة خيرية لجمع التبرعات من أبناء المدينة في الداخل والمغترب لدعم المبادرات الأهلية وخدمة المدينة، ممددة حتى 2 أغسطس 2026.', images: ['/images/tayba/campaign_hq.jpg'], category_id: 'c-events-community', start_date: daysFromNow(0), end_date: daysFromNow(1), location: 'شرق جامع عبدالله بن رواحة', latitude: 35.2640, longitude: 36.7065, organizer: 'لجنة الحملة', is_published: true },
  { id: 'e-2', title: 'مباريات فريق طيبة الإمام للكرة الطائرة', slug: 'volleyball-matches', description: 'متابعة مباريات فريق طيبة الإمام للكرة الطائرة ضمن منافسات دوري الدرجة الأولى.', images: ['https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80'], category_id: 'c-events-community', start_date: daysFromNow(15), end_date: daysFromNow(18), location: 'الصالة الرياضية في المدينة', latitude: 35.2650, longitude: 36.7062, organizer: 'فريق المدينة', is_published: true },
  { id: 'e-3', title: 'أمسيات وندوات المركز الثقافي', slug: 'cultural-evenings', description: 'سلسلة ندوات وأمسيات ثقافية وأدبية في المركز الثقافي في طيبة الإمام بمشاركة أدباء ومثقفي المدينة.', images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80'], category_id: 'c-events-community', start_date: daysFromNow(20), end_date: daysFromNow(22), location: 'المركز الثقافي', latitude: 35.2645, longitude: 36.7060, organizer: 'المركز الثقافي', is_published: true },
  { id: 'e-4', title: 'معرض المنتجات الزراعية المحلية', slug: 'agro-products-expo', description: 'معرض للمنتجات الزراعية المحلية من الفستق الحلبي والزيتون والعنب من بساتين طيبة الإمام وريفها.', images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80'], category_id: 'c-events-exhibitions', start_date: daysFromNow(35), end_date: daysFromNow(40), location: 'ساحة المدينة', latitude: 35.2646, longitude: 36.7068, organizer: 'الفلاحون المحليون', is_published: true },
];

export const demoVideos = [
  { id: 'v-1', title: 'جولة في طيبة الإمام', description: 'تعرف على أبرز معالم مدينة طيبة الإمام في ثلاث دقائق.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80', category_id: 'c-videos-city', duration: 180, is_published: true },
  { id: 'v-2', title: 'لوحة الفسيفساء في متحف طيبة الإمام', description: 'تقرير مصور عن أكبر لوحة فسيفساء في العالم.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80', category_id: 'c-videos-city', duration: 240, is_published: true },
  { id: 'v-3', title: 'المركز الثقافي في طيبة الإمام', description: 'جولة في أحد أبرز صروح المدينة الثقافية.', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80', category_id: 'c-videos-city', duration: 150, is_published: true },
];

export const demoStatistics = [
  { id: 's-1', label: 'عدد السكان', value: 40000, icon: 'Users', sort_order: 1, is_published: true },
  { id: 's-2', label: 'المعلمون', value: 750, icon: 'GraduationCap', sort_order: 2, is_published: true },
  { id: 's-3', label: 'الأطباء', value: 1320, icon: 'Cross', sort_order: 3, is_published: true },
  { id: 's-4', label: 'المحامون', value: 300, icon: 'Landmark', sort_order: 4, is_published: true },
  { id: 's-5', label: 'المهندسون', value: 340, icon: 'Building2', sort_order: 5, is_published: true },
  { id: 's-6', label: 'المسافة عن مركز حماة (كم)', value: 18, icon: 'Map', sort_order: 6, is_published: true },
  { id: 's-7', label: 'مساحة لوحة الفسيفساء (م2)', value: 600, icon: 'Star', sort_order: 7, is_published: true },
];

export const demoPartners = [
  { id: 'pa-1', name: 'مجلس مدينة طيبة الإمام', logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&q=80', website: null, sort_order: 1, is_published: true },
  { id: 'pa-2', name: 'متحف طيبة الإمام', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', website: null, sort_order: 2, is_published: true },
  { id: 'pa-3', name: 'المركز الثقافي', logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', website: null, sort_order: 3, is_published: true },
  { id: 'pa-4', name: 'مشفى صوران الوطني', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80', website: null, sort_order: 4, is_published: true },
];

export const demoPages = [
  { id: 'pg-1', title: 'عن المدينة', slug: 'about', content: '<h2>طيبة الإمام... مدينة التاريخ والطيب</h2><p>طيبة الإمام مدينة سورية تقع في ناحية صوران التابعة لمنطقة حماة، في الريف الشمالي الغربي لمحافظة حماة، على بُعد نحو 18 كيلومتراً شمال مدينة حماة و3 كيلومترات غرب الطريق الدولي (حماة-حلب).</p><h3>التسمية</h3><p>سُمّيت المدينة نسبةً إلى ضريح الإمام علي بن الحسين زين العابدين بن علي بن أبي طالب، حيث دُفن جثمانه في هذا المكان منذ أكثر من ألف عام.</p><h3>التراث والآثار</h3><p>مدينة تاريخية اكتُشفت فيها العديد من اللقى الأثرية، ومن أبرز معالمها أكبر لوحة فسيفساء في العالم وتبلغ مساحتها نحو 600 متر مربع، وتُعرض اليوم في متحف طيبة الإمام، كما كانت مئذنة مسجد الإمام المستطيلة (الهزازة) واحدة من ثلاث مآذن من نوعها في العالم.</p><h3>الاقتصاد</h3><p>يقوم اقتصاد المدينة على التجارة والزراعة والصناعة؛ إذ تنتشر فيها زراعة الفستق الحلبي والزيتون والعنب، إضافة إلى صناعة الأحذية الجلدية والصناعات الخفيفة.</p><h3>التعليم</h3><p>تحتل طيبة الإمام المرتبة الأولى على مستوى الجمهورية نسبةً لعدد السكان من حملة الشهادات العليا، ويُقدَّر عدد سكانها بأكثر من 40 ألف نسمة، ويكثر فيها الأطباء والمهندسون والمدرّسون والأكاديميون.</p>', is_published: true },
  { id: 'pg-2', title: 'اتصل بنا', slug: 'contact', content: '<h2>تواصل معنا</h2><p>نرحب باستفساراتكم واقتراحاتكم على مدار الساعة عبر قنوات التواصل المتاحة.</p><p>هاتف: 011 234 5678 — البريد: info@madinti.gov.sa</p>', is_published: true },
];

export const demoSettings = {
  site_name: 'طيبة الإمام',
  site_tagline: 'الراعي الإعلامي صفحة طيبة الإمام الرسمية',
  site_description: 'بوابة إلكترونية شاملة لمدينة طيبة الإمام في ريف حماة: الأخبار، المشاريع، دليل الأماكن، الفعاليات، الخرائط والإحصائيات.',
  hero_image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1600&q=80',
  hero_title: 'مرحباً بكم في مدينة طيبة الإمام',
  hero_subtitle: 'بوابة شاملة تعرّف بمدينة طيبة الإمام: أخبارها، مشاريعها، أماكنها، فعالياتها وتراثها العريق.',
  contact_phone: '+963 944 780 645',
  contact_email: 'tyba1net@gmail.com',
  contact_address: 'مدينة طيبة الإمام، محافظة حماة، سوريا',
  social_facebook: 'https://www.facebook.com/TaybetAlImamOfficial',
  social_twitter: 'https://x.com/TaybatAlImam1',
  social_instagram: 'https://instagram.com',
  social_youtube: 'https://youtube.com/@TaybetAlImamOfficial',
  map_center_lat: '35.26389',
  map_center_lng: '36.70667',
  about_us: 'طيبة الإمام مدينة سورية في ناحية صوران التابعة لمنطقة حماة، تقع في الريف الشمالي الغربي لمحافظة حماة على بُعد نحو 18 كم شمال مدينة حماة و3 كم غرب الطريق الدولي (حماة-حلب). سُمّيت نسبةً إلى ضريح الإمام علي بن الحسين زين العابدين، الحفيد السادس للإمام علي بن أبي طالب، حيث دُفن جثمانه في هذا المكان منذ أكثر من ألف عام. تشتهر المدينة بتراثها الأثري؛ فقد اكتُشفت فيها أكبر لوحة فسيفساء في العالم (نحو 600 م2) تعود للقرن الخامس الميلادي وتُعرض في متحف طيبة الإمام، كما كانت مئذنة مسجد الإمام المستطيلة (الهزازة) من أبرز معالمها. اقتصاد المدينة يقوم على التجارة والزراعة والصناعة، وتنتشر فيها زراعة الفستق الحلبي والزيتون والعنب وصناعة الأحذية الجلدية، وتُعرف بطيبة أهلها وارتفاع التحصيل العلمي، إذ يُقدَّر عدد سكانها بأكثر من 40 ألف نسمة.',
  footer_text: '© 2026 طيبة الإمام — جميع الحقوق محفوظة.',
  developer_name: 'المهندس قصي مهند الصالح',
  developer_phone: '0952639157',
};

export const demoOverviews = {
  news_count: demoNews.length,
  projects_count: demoProjects.length,
  places_count: demoPlaces.length,
  events_count: demoEvents.length,
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
  videos: demoVideos,
  statistics: demoStatistics,
  pages: demoPages,
  partners: demoPartners,
  ads: demoAds,
  settings: demoSettings,
  city_overview_stats: demoOverviews,
};
