import json
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

env = {}
with open(r'C:\Users\DELL\Desktop\almadena\.env', encoding='utf-8') as fh:
    for line in fh:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip()

URL = env['VITE_SUPABASE_URL']
ANON = env['VITE_SUPABASE_ANON_KEY']

req = urllib.request.Request(
    URL + "/rest/v1/places?select=name,slug,address,is_published,categories!inner(name,slug)&categories.slug=eq.pharmacies&order=created_at.asc",
    headers={'apikey': ANON, 'Authorization': f'Bearer {ANON}'},
)
with urllib.request.urlopen(req, timeout=60) as r:
    rows = json.loads(r.read().decode('utf-8'))
print('public read count:', len(rows))
for x in rows[:6]:
    print(' -', x['name'], '|', x.get('categories', {}).get('name'), '| published:', x.get('is_published'))
