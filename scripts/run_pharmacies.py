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
if not TOKEN:
    print('ضع الرمز في متغير البيئة SUPABASE_ACCESS_TOKEN أو scripts/.supabase_token')
    sys.exit(1)


def run_sql(sql):
    url = f'https://api.supabase.com/v1/projects/{REF}/database/query'
    req = urllib.request.Request(
        url,
        data=json.dumps({'query': sql}).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {TOKEN}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:600]


if __name__ == '__main__':
    sql_path = r'C:\Users\DELL\Desktop\almadena\supabase\migrations\20240913000000_real_pharmacies.sql'
    sql = open(sql_path, encoding='utf-8').read()
    s, out = run_sql(sql)
    print('migration:', s, json.dumps(out, ensure_ascii=False)[:600] if out else '(ok)')
    s, cnt = run_sql("select count(*) as n from public.places p join public.categories c on c.id = p.category_id where c.slug='pharmacies'")
    print('pharmacies count:', s, json.dumps(cnt, ensure_ascii=False))
    s, rows = run_sql("select p.name, p.slug, p.address from public.places p join public.categories c on c.id = p.category_id where c.slug='pharmacies' order by p.created_at asc")
    if isinstance(rows, list):
        for r0 in rows:
            print(' -', r0.get('name'), '|', r0.get('slug'))

