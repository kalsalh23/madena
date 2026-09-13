import json
import sys
import urllib.error
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
print('URL:', URL, '| key len:', len(ANON))


def rest(method, path, body=None, prefer=None):
    headers = {
        'apikey': ANON,
        'Authorization': f'Bearer {ANON}',
        'Content-Type': 'application/json',
    }
    if prefer:
        headers['Prefer'] = prefer
    req = urllib.request.Request(
        URL + path,
        data=json.dumps(body).encode('utf-8') if body is not None else None,
        headers=headers,
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode('utf-8')
            return r.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:500]


if __name__ == '__main__':
    s, cats = rest('GET', '/rest/v1/categories?slug=eq.pharmacies&select=id,name,slug')
    print('categories:', s, json.dumps(cats, ensure_ascii=False)[:300])
    s, places = rest('GET', '/rest/v1/places?select=id,name,slug,address&order=created_at.asc')
    print('places:', s, 'count:', len(places) if isinstance(places, list) else places)
    if isinstance(places, list):
        for p in places[:40]:
            print('  -', p.get('name'), '|', p.get('slug'))
