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


def rest(method, path, body=None, prefer='return=representation'):
    headers = {
        'apikey': ANON,
        'Authorization': f'Bearer {ANON}',
        'Content-Type': 'application/json',
        'Prefer': prefer,
    }
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
    # probe write access with a temp row
    s, res = rest('POST', '/rest/v1/places', {
        'name': 'اختبار صلاحية',
        'slug': 'write-probe-test-temp',
        'is_published': False,
    })
    print('insert:', s, json.dumps(res, ensure_ascii=False)[:300])
    if s in (200, 201):
        sid = res[0]['id']
        d, dres = rest('DELETE', f'/rest/v1/places?id=eq.{sid}')
        print('cleanup:', d, dres)
