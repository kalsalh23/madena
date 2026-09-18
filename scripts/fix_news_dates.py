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


# قبل التصحيح: آخر 5 أخبار
before = run_sql("select title, published_at from public.news order by published_at desc limit 5")
print('BEFORE:')
for r in before:
    print('  ', r['published_at'], '|', r['title'][:40])

# تصحيح: +3 ساعات (توقيت سوريا) لعكس إزالة نموذج الإدخال القديم
run_sql("update public.news set published_at = published_at + interval '3 hours' where published_at is not null")

after = run_sql("select title, published_at from public.news order by published_at desc limit 5")
print('AFTER:')
for r in after:
    print('  ', r['published_at'], '|', r['title'][:40])
