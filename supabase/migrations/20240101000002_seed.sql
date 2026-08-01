-- ============================================================
-- مدينتي — بيانات تجريبية (تعديلها لاحقاً من لوحة الإدارة)
-- ============================================================

-- ---------- الإعدادات ----------
insert into public.settings (key, value, type) values
  ('site_name', 'طيبة الإمام', 'text'),
  ('site_tagline', 'بوابة المدينة الشاملة', 'text'),
  ('site_description', 'بوابة إلكترونية تقدم كل ما يخص المدينة: الأخبار والمشاريع والأماكن والفعاليات.', 'text'),
  ('hero_image', 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1600&q=80', 'image'),
  ('hero_title', 'مرحباً بكم في مدينتنا الجميلة', 'text'),
  ('hero_subtitle', 'اكتشف كل ما تقدمه المدينة من خدمات وفرص ومشاريع تنموية.', 'text'),
  ('contact_phone', '011 234 5678', 'text'),
  ('contact_email', 'info@madinti.gov.sa', 'text'),
  ('contact_address', 'الطريق الرئيسي، وسط المدينة', 'text'),
  ('social_facebook', 'https://facebook.com', 'text'),
  ('social_twitter', 'https://x.com', 'text'),
  ('social_instagram', 'https://instagram.com', 'text'),
  ('social_youtube', 'https://youtube.com', 'text'),
  ('map_center_lat', '24.7136', 'text'),
  ('map_center_lng', '46.6753', 'text'),
  ('about_us', 'نحن بوابة إلكترونية موثوقة تقدم كل ما يخص المدينة من معلومات وخدمات.', 'textarea'),
  ('footer_text', '© 2026 طيبة الإمام — جميع الحقوق محفوظة.', 'text'),
  ('ad_enabled', '0', 'boolean'),
  ('ad_title', '', 'text'),
  ('ad_text', '', 'textarea'),
  ('ad_image', '', 'image'),
  ('ad_link', '', 'text');

-- ---------- التصنيفات ----------
insert into public.categories (name, slug, type, icon, color, sort_order) values
  ('المدارس', 'schools', 'places', 'GraduationCap', '#054239', 1),
  ('المشافي', 'hospitals', 'places', 'Cross', '#6b1f2a', 2),
  ('الصيدليات', 'pharmacies', 'places', 'Pill', '#054239', 3),
  ('المطاعم', 'restaurants', 'places', 'Utensils', '#988561', 4),
  ('الحدائق', 'parks', 'places', 'Trees', '#0e7a63', 5),
  ('المساجد', 'mosques', 'places', 'Moon', '#054239', 6),
  ('الكنائس', 'churches', 'places', 'Church', '#6b1f2a', 7),
  ('الدوائر الحكومية', 'government', 'places', 'Landmark', '#054239', 8),
  ('الفنادق', 'hotels', 'places', 'Hotel', '#988561', 9),
  ('الأسواق', 'markets', 'places', 'ShoppingBag', '#6b1f2a', 10),
  ('محطات الوقود', 'fuel', 'places', 'Fuel', '#054239', 11),
  ('البنوك', 'banks', 'places', 'Banknote', '#0e7a63', 12),
  ('الأخبار المحلية', 'local-news', 'news', 'Newspaper', '#054239', 1),
  ('المشاريع', 'projects-news', 'news', 'Building2', '#988561', 2),
  ('فعاليات المجتمع', 'community-events', 'events', 'Calendar', '#6b1f2a', 1),
  ('المعارض', 'exhibitions', 'events', 'GalleryHorizontal', '#054239', 2),
  ('معرض المدينة', 'city-gallery', 'gallery', 'Image', '#054239', 1),
  ('الطبيعة', 'nature', 'gallery', 'Leaf', '#0e7a63', 2),
  ('فيديو المدينة', 'city-videos', 'videos', 'Play', '#054239', 1);

-- ---------- الأخبار ----------
insert into public.news (title, slug, excerpt, content, cover, category_id, author, published_at, views) values
  ('إطلاق المرحلة الثانية من تطوير الواجهة البحرية', 'waterfront-phase-two',
   'أعلنت أمانة المدينة عن بدء أعمال المرحلة الثانية لتطوير الواجهة البحرية على مساحة 120 ألف متر مربع.',
   '<p>أعلنت أمانة المدينة عن بدء أعمال <strong>المرحلة الثانية</strong> من مشروع تطوير الواجهة البحرية، والتي ستشمل ممشى جديداً ومسطحات خضراء ومرافق ترفيهية.</p><p>ومن المتوقع أن يستفيد من المشروع أكثر من 200 ألف زائر سنوياً.</p><blockquote>المشروع يأتي ضمن رؤية المدينة المستقبلية 2030.</blockquote>',
   'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80',
   (select id from public.categories where slug='local-news'), 'الإدارة العامة', now() - interval '2 days', 1240),
  ('افتتاح حديقة النور المركزية أبوابها للزوار', 'central-park-opening',
   'افتتحت بلدية المدينة حديقة النور المركزية بمساحة 45 ألف متر مربع وبطاقة استيعابية تصل إلى 5000 زائر.',
   '<p>افتتحت بلدية المدينة حديقة النور المركزية التي تعد الأكبر في المدينة.</p><p>تضم الحديقة نافورة تفاعلية ومسارات للدراجات وملاعب للأطفال ومناطق للجلوس.</p>',
   'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80',
   (select id from public.categories where slug='local-news'), 'إدارة الحدائق', now() - interval '5 days', 980),
  ('انطلاق مهرجان المدينة للتمور والفواكه', 'dates-festival',
   'تنطلق النسخة الخامسة من مهرجان المدينة للتمور والفواكه بمركز المعارض الدولي وتستمر لمدة عشرة أيام.',
   '<p>ينطلق مهرجان المدينة للتمور والفواكه بمشاركة أكثر من 150 عارضاً محلياً.</p><p>يتضمن المهرجان ورش عمل وعروضاً شعبية وسوقاً للمنتجات الزراعية.</p>',
   'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80',
   (select id from public.categories where slug='community-events'), 'اللجنة المنظمة', now() - interval '1 day', 560),
  ('توقيع اتفاقية إنشاء مجمع النقل الحديث', 'transport-complex',
   'وقّعت أمانة المدينة اتفاقية لإنشاء مجمع نقل حديث يخدم جميع الأحياء بنظام تشغيلي ذكي.',
   '<p>شهدت المدينة توقيع اتفاقية إنشاء مجمع النقل الحديث الذي سيعمل بنظام تشغيلي ذكي.</p><p>سيقلل المجمع من الازدحام المروري بنسبة تصل إلى 35%.</p>',
   'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
   (select id from public.categories where slug='projects-news'), 'مكتب النقل', now() - interval '8 days', 730),
  ('برنامج تشجير شامل للشوارع الرئيسية', 'tree-planting',
   'أطلقت إدارة البيئة برنامجاً لتشجير 50 شارعاً رئيسياً بأكثر من 10 آلاف شجرة محلية.',
   '<p>أطلقت إدارة البيئة برنامجها السنوي لتشجير الشوارع الرئيسية، مستهدفة زراعة أكثر من عشرة آلاف شجرة.</p>',
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
   (select id from public.categories where slug='local-news'), 'إدارة البيئة', now() - interval '12 days', 410),
  ('جائزة المدينة للابتكار في عامها الثالث', 'innovation-award',
   'فتح باب الترشح لجائزة المدينة للابتكار في نسختها الثالثة بجوائز تصل قيمتها إلى 500 ألف ريال.',
   '<p>فتح باب الترشح لجائزة المدينة للابتكار بنسختها الثالثة.</p><p>تستهدف الجائزة رواد الأعمال والطلاب والمبدعين في مختلف المجالات.</p>',
   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
   (select id from public.categories where slug='community-events'), 'مركز الابتكار', now() - interval '15 days', 320);

-- ---------- المشاريع ----------
insert into public.projects (name, slug, description, images, agency, start_date, end_date, progress, budget, latitude, longitude, status) values
  ('تطوير الواجهة البحرية', 'waterfront-development',
   'مشروع استراتيجي لتطوير الواجهة البحرية يشمل ممشى ومسطحات خضراء ومرافق ترفيهية وتجارية.',
   array['https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80'],
   'أمانة المدينة', '2024-03-01', '2026-06-30', 62, '850 مليون ريال', 24.71, 46.67, 'ongoing'),
  ('مجمع النقل الحديث', 'modern-transport-complex',
   'إنشاء مجمع نقل متكامل يربط الأحياء بنظام ذكي ومواقف متعددة الطوابق.',
   array['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80'],
   'مكتب النقل العام', '2024-06-01', '2027-03-31', 35, '1.2 مليار ريال', 24.74, 46.70, 'ongoing'),
  ('الحديقة المركزية الكبرى', 'grand-central-park',
   'حديقة مركزية على مساحة 45 ألف متر مربع بنافورة تفاعلية ومسار للدراجات.',
   array['https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80'],
   'بلدية المدينة', '2023-01-01', '2025-05-31', 100, '320 مليون ريال', 24.72, 46.68, 'completed'),
  ('تطوير الأحياء القديمة', 'old-districts-renewal',
   'إعادة تأهيل الأحياء التاريخية مع الحفاظ على الطابع العمراني الأصيل.',
   array['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'],
   'هيئة التطوير الحضري', '2025-01-01', '2027-12-31', 18, '500 مليون ريال', 24.75, 46.65, 'ongoing');

insert into public.project_updates (project_id, title, body, image, created_at) values
  ((select id from public.projects where slug='waterfront-development'), 'إنجاز المرحلة الأولى من الممشى',
   'تم إنجاز 4 كيلومترات من الممشى البحري وتركيب الإنارة الذكية.', null, now() - interval '10 days'),
  ((select id from public.projects where slug='waterfront-development'), 'وصول 60% من مواد الإنشاء',
   'وصلت شحنات المواد الأساسية للمشروع وبدأ تركيب المسطحات الخضراء.', null, now() - interval '3 days'),
  ((select id from public.projects where slug='modern-transport-complex'), 'استكمال الأساسات',
   'انتهت أعمال الأساسات للمحطة الرئيسية وجارٍ أعمال الهيكل الخرساني.', null, now() - interval '6 days');

-- ---------- الأماكن ----------
insert into public.places (name, slug, description, images, category_id, phone, website, address, working_hours, latitude, longitude, is_featured) values
  ('مدرسة النور الثانوية', 'al-noor-high-school',
   'مدرسة ثانوية حكومية حديثة تضم مختبرات علمية وصالات رياضية.',
   array['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80'],
   (select id from public.categories where slug='schools'), '011 222 1001', null, 'حي النور', '7:00 - 14:00', 24.7136, 46.6753, false),
  ('مستشفى المدينة العام', 'city-general-hospital',
   'مستشفى عام بسعة 300 سرير يقدم خدمات طوارئ على مدار الساعة.',
   array['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80'],
   (select id from public.categories where slug='hospitals'), '011 222 2000', null, 'شارع المستشفى', '24 ساعة', 24.7180, 46.6820, true),
  ('صيدلية الشفاء', 'al-shifa-pharmacy',
   'صيدلية مجهزة تجهيزاً كاملاً مع خدمة التوصيل.',
   array['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80'],
   (select id from public.categories where slug='pharmacies'), '011 222 3001', null, 'حي الورود', '8:00 - 23:00', 24.7120, 46.6780, false),
  ('مطعم بيت الشواء', 'grill-house',
   'مطعم عائلي متخصص في المشويات والمأكولات الشرقية.',
   array['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'],
   (select id from public.categories where slug='restaurants'), '011 222 4000', null, 'شارع التخصصي', '12:00 - 00:00', 24.7150, 46.6790, true),
  ('حديقة الواحة', 'al-oasis-park',
   'حديقة عائلية كبيرة بمسطحات خضراء وألعاب أطفال.',
   array['https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&q=80'],
   (select id from public.categories where slug='parks'), null, null, 'حي الواحة', '6:00 - 23:00', 24.7110, 46.6720, true),
  ('الجامع الكبير', 'grand-mosque',
   'الجامع الكبير يتسع لخمسة آلاف مصلٍّ بمئذنة مميزة.',
   array['https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80'],
   (select id from public.categories where slug='mosques'), null, null, 'وسط البلد', 'حسب أوقات الصلاة', 24.7170, 46.6770, false),
  ('البلدية الرئيسية', 'main-municipality',
   'مبنى البلدية الرئيسي لإنهاء المعاملات والخدمات البلدية.',
   array['https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80'],
   (select id from public.categories where slug='government'), '011 222 5000', null, 'شارع البلدية', '7:30 - 14:30', 24.7160, 46.6810, false),
  ('فندق المدينة الذهبي', 'golden-city-hotel',
   'فندق خمس نجوم يضم 200 غرفة وقاعات مؤتمرات.',
   array['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'],
   (select id from public.categories where slug='hotels'), '011 222 6000', null, 'شارع الملك فهد', '24 ساعة', 24.7190, 46.6840, true),
  ('سوق المدينة المركزي', 'central-market',
   'سوق مركزي متعدد الطوابق للمواد الغذائية والمنتجات المحلية.',
   array['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80'],
   (select id from public.categories where slug='markets'), '011 222 7000', null, 'حي السوق', '9:00 - 22:00', 24.7140, 46.6740, false),
  ('محطة وقود السلام', 'al-salam-station',
   'محطة وقود وخدمة سيارات متكاملة.',
   array['https://images.unsplash.com/photo-1503353567194-e2c4e091e972?w=1200&q=80'],
   (select id from public.categories where slug='fuel'), '011 222 8000', null, 'الدائري الغربي', '24 ساعة', 24.7100, 46.6690, false),
  ('بنك المدينة الوطني', 'national-bank',
   'فرع رئيسي لبنك المدينة الوطني مع خدمة سريعة للعملاء.',
   array['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'],
   (select id from public.categories where slug='banks'), '011 222 9000', null, 'شارع البنوك', '9:00 - 16:00', 24.7185, 46.6800, false),
  ('مدرسة المستقبل الابتدائية', 'future-primary-school',
   'مدرسة ابتدائية حديثة بفصول ذكية وأنشطة لاصفية.',
   array['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80'],
   (select id from public.categories where slug='schools'), '011 222 1002', null, 'حي المستقبل', '7:00 - 13:30', 24.7165, 46.6760, false);

-- ---------- الفعاليات ----------
insert into public.events (title, slug, description, images, category_id, start_date, end_date, location, latitude, longitude, organizer) values
  ('مهرجان المدينة للتمور والفواكه', 'dates-festival-event',
   'مهرجان سنوي يضم أكثر من 150 عارضاً مع ورش عمل وعروض شعبية.',
   array['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80'],
   (select id from public.categories where slug='community-events'), now() + interval '7 days', now() + interval '17 days',
   'مركز المعارض الدولي', 24.7200, 46.6860, 'اللجنة المنظمة'),
  ('معرض المدينة للتقنية والابتكار', 'tech-expo',
   'معرض يضم أحدث التقنيات من شركات محلية وعالمية مع جلسات ملهمة.',
   array['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80'],
   (select id from public.categories where slug='exhibitions'), now() + interval '30 days', now() + interval '32 days',
   'قاعة المؤتمرات', 24.7210, 46.6870, 'مركز الابتكار'),
  ('مهرجان رمضان الثقافي', 'ramadan-festival',
   'فعاليات ثقافية وتراثية خلال شهر رمضان المبارك.',
   array['https://images.unsplash.com/photo-1554322961-e79b4bebd9a8?w=1200&q=80'],
   (select id from public.categories where slug='community-events'), now() + interval '60 days', now() + interval '90 days',
   'حي التراث', 24.7125, 46.6730, 'هيئة الثقافة'),
  ('سباق المدينة للجري', 'city-marathon',
   'سباق سنوي للجري لمسافات مختلفة بمشاركة أكثر من 3000 متسابق.',
   array['https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80'],
   (select id from public.categories where slug='community-events'), now() + interval '45 days', now() + interval '45 days',
   'الواجهة البحرية', 24.71, 46.67, 'الاتحاد الرياضي');

-- ---------- المعرض ----------
insert into public.gallery (title, description, image_url, category_id) values
  ('أفق المدينة عند الغروب', 'منظر بانورامي لأفق المدينة.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80', (select id from public.categories where slug='city-gallery')),
  ('الواجهة البحرية الجديدة', 'إطلالة على مشروع الواجهة البحرية.', 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1400&q=80', (select id from public.categories where slug='city-gallery')),
  ('حديقة النور المركزية', 'مسطحات خضراء ونافورة تفاعلية.', 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1400&q=80', (select id from public.categories where slug='city-gallery')),
  ('أجواء الطبيعة في الضواحي', 'مساحات طبيعية خلابة.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80', (select id from public.categories where slug='nature')),
  ('مسارات المشاة', 'مسارات مشي آمنة ومظللة.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80', (select id from public.categories where slug='nature')),
  ('سوق المدينة المركزي', 'نشاط تجاري حيوي.', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80', (select id from public.categories where slug='city-gallery')),
  ('المكتبة العامة', 'مكتبة حديثة تخدم القراء.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80', (select id from public.categories where slug='city-gallery')),
  ('الجامع الكبير', 'تحفة معمارية إسلامية.', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1400&q=80', (select id from public.categories where slug='city-gallery'));

-- ---------- الفيديوهات ----------
insert into public.videos (title, description, video_url, thumbnail, category_id, duration) values
  ('جولة تعريفية في المدينة', 'تعرف على أبرز معالم المدينة في ثلاث دقائق.',
   'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
   (select id from public.categories where slug='city-videos'), 180),
  ('مشروع الواجهة البحرية', 'تقرير مصور حول تقدم أعمال المشروع.',
   'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80',
   (select id from public.categories where slug='city-videos'), 240),
  ('مهرجان التمور - لقطات', 'أبرز اللقطات من فعاليات المهرجان.',
   'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80',
   (select id from public.categories where slug='city-videos'), 150);

-- ---------- الإحصائيات ----------
insert into public.statistics (label, value, icon, sort_order) values
  ('عدد السكان', 850000, 'Users', 1),
  ('المدارس', 320, 'GraduationCap', 2),
  ('المشافي', 42, 'Cross', 3),
  ('الحدائق', 78, 'Trees', 4),
  ('المشاريع الجارية', 15, 'Building2', 5),
  ('الأحياء', 46, 'Home', 6),
  ('المؤسسات', 2100, 'Landmark', 7);

-- ---------- الشركاء ----------
insert into public.partners (name, logo, website, sort_order) values
  ('أمانة المدينة', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&q=80', null, 1),
  ('بلدية المدينة', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', null, 2),
  ('غرفة التجارة', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', null, 3),
  ('جامعة المدينة', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80', null, 4);

-- ---------- الصفحات ----------
insert into public.pages (title, slug, content) values
  ('عن المدينة', 'about',
   '<h2>مدينة تفتخر بماضيها وتطمح لمستقبلها</h2><p>تتميز مدينتنا بموقع جغرافي مميز وتراث غني ونهضة عمرانية متسارعة، وتواصل العمل وفق رؤية واضحة لتحسين جودة الحياة.</p><h3>رؤيتنا</h3><p>أن نكون مدينة ذكية ومستدامة تستحق الحياة فيها والعيش الكريم لأهلها.</p>'),
  ('اتصل بنا', 'contact',
   '<h2>تواصل معنا</h2><p>نرحب باستفساراتكم واقتراحاتكم على مدار الساعة عبر قنوات التواصل المتاحة.</p><p>هاتف: 011 234 5678 — البريد: info@madinti.gov.sa</p>');
