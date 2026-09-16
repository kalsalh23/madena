import json
import os
import sys
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

VTOKEN = open(r'C:\Users\DELL\Desktop\almadena\scripts\.vercel_token', encoding='utf-8').read().strip()
TEAM = 'team_grBXAnvjNcx41kaOltdI7yQg'
PROJECT = 'prj_kQQzELFuAyhnPM4huh4YetMysM6q'
# مركز طيبة الإمام
LAT, LNG = '35.2685', '36.7175'


def api(path, method='GET', body=None):
    url = f'https://api.vercel.com{path}' + ('&' if '?' in path else '?') + f'teamId={TEAM}'
    data = json.dumps(body).encode('utf-8') if body is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Authorization': f'Bearer {VTOKEN}', 'Content-Type': 'application/json'},
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')[:500]


# جلب معرفات المتغيرين الحاليين
s, envs = api(f'/v9/projects/{PROJECT}/env')
ids = {e['key']: e['id'] for e in envs.get('envs', [])}
print('found env ids:', {k: v[:8] for k, v in ids.items() if 'MAP' in k})

for key, val in [('VITE_MAP_CENTER_LAT', LAT), ('VITE_MAP_CENTER_LNG', LNG)]:
    eid = ids.get(key)
    if not eid:
        print('missing', key)
        continue
    s, out = api(f'/v9/projects/{PROJECT}/env/{eid}', method='PATCH', body={
        'key': key,
        'value': val,
        'type': 'encrypted',
        'target': ['production', 'preview', 'development'],
    })
    print('update', key, '->', s, out if s >= 400 else 'OK')
