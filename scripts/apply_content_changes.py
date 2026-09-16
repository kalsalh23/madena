import json
import os
import sys
import urllib.error
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REF = 'jnzvvishbzzuuvdpewjy'
TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
if not TOKEN:
    p = os.path.join(os.path.dirname(__file__), '.supabase_token')
    if os.path.exists(p):
        TOKEN = open(p, encoding='utf-8').read().strip()

SQL = r"""
-- ============ 1) إخفاء واجهات محذوفة ============
-- فنادق + فعاليات + فيديوهات: إلغاء النشر (تبقى البيانات محفوظة)
update public.categories set is_published = false where slug in ('hotels');
update public.categories set is_published = false where type in ('events', 'videos', 'gallery');
update public.places set is_published = false
  where category_id in (select id from public.categories where slug = 'hotels');

-- ============ 2) البنوك -> مراكز الصرافة ============
update public.categories
  set name = 'مراكز الصرافة', slug = 'exchanges', icon = 'Coins'
  where slug = 'banks';

-- ============ 3) خلفية الهيرو ============
delete from public.settings where key = 'hero_image';

-- ============ 4) إحداثيات الأماكن الحقيقية حول طيبة الإمام ============
-- مركز المدينة التقريبي: 35.2685, 36.7175
update public.places set latitude = 35.2689, longitude = 36.7162 where slug = 'tayyibat-al-imam-museum';
update public.places set latitude = 35.2692, longitude = 36.7185 where slug = 'grand-imam-mosque';
update public.places set latitude = 35.2695, longitude = 36.7191 where slug = 'shrine-of-ali-ibn-al-husayn';
update public.places set latitude = 35.2663, longitude = 36.7145 where slug = 'jawash-hospital';
update public.places set latitude = 35.2701, longitude = 36.7126 where slug = 'souran-national-hospital';
update public.places set latitude = 35.2678, longitude = 36.7180 where slug = 'tayyibat-al-imam-municipality';
update public.places set latitude = 35.2670, longitude = 36.7193 where slug = 'tayyibat-al-imam-post-office';
update public.places set latitude = 35.2665, longitude = 36.7178 where slug = 'tayyibat-al-imam-cultural-center';
update public.places set latitude = 35.2652, longitude = 36.7210 where slug = 'ancient-temple-site';
update public.places set latitude = 35.2682, longitude = 36.7157 where slug = 'telephone-exchange-building';
update public.places set latitude = 35.2673, longitude = 36.7136 where slug = 'tayyibat-al-imam-market';

-- ============ 5) إحصائيات تقريبية قابلة للتعديل لاحقاً ============
delete from public.statistics;
insert into public.statistics (label, value, icon, sort_order, is_published) values
  ('عدد السكان', 40000, 'Users', 1, true),
  ('عدد الطلاب', 9500, 'GraduationCap', 2, true),
  ('المعلمون', 750, 'GraduationCap', 3, true),
  ('الأطباء', 220, 'Cross', 4, true),
  ('الصيادلة', 45, 'Pill', 5, true),
  ('المهندسون', 340, 'Building2', 6, true),
  ('المسافة عن مركز حماة (كم)', 18, 'Map', 7, true),
  ('مساحة لوحة الفسيفساء (م2)', 600, 'Star', 8, true);
"""


def run_sql(sql):
    url = f'https://api.supabase.com/v1/projects/{REF}/database/query'
    req = urllib.request.Request(
        url,
        data=json.dumps({'query': sql}).encode('utf-8'),
        headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            return r.status, json.loads(r.read().decode('utf-8')) if r.read else None
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:800]


if __name__ == '__main__':
    s, out = run_sql(SQL)
    print('apply:', s, out if out else '(ok)')
    s, cats = run_sql("select name, slug, is_published from public.categories where type='places' order by sort_order")
    print('place categories:')
    for c in cats:
        print('  ', c)
    s, stats = run_sql("select label, value, sort_order from public.statistics order by sort_order")
    print('statistics:', len(stats))
    for st in stats:
        print('  ', st)
    s, nocoords = run_sql("select count(*) as n from public.places where latitude is null or longitude is null")
    print('places missing coords:', nocoords)
