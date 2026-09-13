import json
import sys
import urllib.error
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = 'https://jnzvvishbzzuuvdpewjy.supabase.co'
ANON = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuenp2'
        'dmlzaGJ6enV1dmRwZXdqeSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg1NjExNzQ1LCJleHAiOjIxMDEx'
        'ODc3NDV9.cQ-vGdzAyDzsFn8IpfArAvNiu2t-WFEdmt054hqEoy8')


def rest(method, path, body=None):
    req = urllib.request.Request(
        URL + path,
        data=json.dumps(body).encode('utf-8') if body is not None else None,
        headers={
            'apikey': ANON,
            'Authorization': f'Bearer {ANON}',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:500]


if __name__ == '__main__':
    # 1) read pharmacies category + existing places
    s, cats = rest('GET', '/rest/v1/categories?slug=eq.pharmacies&select=id,name,slug')
    print('categories:', s, json.dumps(cats, ensure_ascii=False))
    s, places = rest('GET', '/rest/v1/places?select=id,name,slug,address&order=created_at.asc')
    print('places:', s, 'count:', len(places) if isinstance(places, list) else places)
    if isinstance(places, list):
        for p in places[:40]:
            print('  -', p.get('name'), '|', p.get('slug'))
