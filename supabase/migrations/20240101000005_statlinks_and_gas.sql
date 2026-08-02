-- ============================================================
-- روابط بطاقات الإحصائيات + تحويل الكنائس إلى مراكز الغاز
-- ============================================================

-- 1) عمود رابط الوجهة في الإحصائيات
alter table public.statistics add column if not exists link text;

-- 2) ربط كل إحصائية بواجهتها المخصصة
update public.statistics set link = '/places?cat=schools'    where label = 'المدارس';
update public.statistics set link = '/places?cat=hospitals'  where label = 'المشافي';
update public.statistics set link = '/places?cat=parks'      where label = 'الحدائق';
update public.statistics set link = '/projects?status=ongoing' where label = 'المشاريع الجارية';
update public.statistics set link = '/map'                   where label = 'الأحياء';
update public.statistics set link = '/places?cat=government' where label = 'المؤسسات';

-- 3) استبدال تصنيف الكنائس بتصنيف مراكز الغاز
update public.categories
set name = 'مراكز الغاز', slug = 'gas-centers', icon = 'Fuel'
where slug = 'churches';
