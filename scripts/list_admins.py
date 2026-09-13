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


admins = run_sql("select a.id, a.name, a.role, a.is_active, u.email, u.last_sign_in_at, u.created_at from public.admins a left join auth.users u on u.id = a.user_id")
print('admins table:')
for a in admins:
    print(' -', a)

users = run_sql("select id, email, email_confirmed_at is not null as confirmed, last_sign_in_at from auth.users order by created_at")
print('auth.users:')
for u in users:
    print(' -', u)
