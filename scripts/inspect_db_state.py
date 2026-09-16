import json
import os
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REF = 'jnzvvishbzzuuvdpewjy'
TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
if not TOKEN:
    p = os.path.join(os.path.dirname(__file__), '.supabase_token')
    if os.path.exists(p):
        TOKEN = open(p, encoding='utf-8').read().strip()


def run_sql(sql):
    url = f'https://api.supabase.com/v1/projects/{REF}/database/query'
    req = urllib.request.Request(
        url,
        data=json.dumps({'query': sql}).encode('utf-8'),
        headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'},
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read().decode('utf-8'))


cats = run_sql("select id, name, slug, type, icon, sort_order, is_published from public.categories order by type, sort_order")
print('CATEGORIES:')
for c in cats:
    print(' ', c)

stats = run_sql("select id, label, value, icon, link, sort_order, is_published from public.statistics order by sort_order")
print('STATISTICS:')
for s in stats:
    print(' ', s)

settings = run_sql("select key, left(value, 90) as value from public.settings where key in ('hero_image','hero_title','hero_subtitle') order by key")
print('SETTINGS:')
for s in settings:
    print(' ', s)

pc = run_sql("select c.slug, count(p.id) as n from public.categories c left join public.places p on p.category_id = c.id group by c.slug order by n desc")
print('PLACE COUNTS:')
for p in pc:
    print(' ', p)
