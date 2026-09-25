import json
import os
import sys
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REF = 'jnzvvishbzzuuvdpewjy'
TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
if not TOKEN:
    p = os.path.join(os.path.dirname(__file__), '.supabase_token')
    if os.path.exists(p):
        TOKEN = open(p, encoding='utf-8').read().strip()


def api(path, method='GET', body=None):
    url = f'https://api.supabase.com/v1/projects/{REF}{path}'
    data = json.dumps(body).encode('utf-8') if body is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'},
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            raw = r.read().decode('utf-8')
            return r.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:600]


s, fns = api('/functions')
print('functions:', s)
for f in fns or []:
    print('  -', f.get('slug'), '| verify_jwt:', f.get('verify_jwt'), '| status:', f.get('status'))
