import json
import os
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

VTOKEN = os.environ.get('VERCEL_TOKEN', '')
TEAM = 'team_grBXAnvjNcx41kaOltdI7yQg'
PROJECT = 'prj_kQQzELFuAyhnPM4huh4YetMysM6q'
if not VTOKEN:
    print('ضع الرمز في متغير البيئة VERCEL_TOKEN أولاً')
    sys.exit(1)


def api(path):
    url = f'https://api.vercel.com{path}' + ('&' if '?' in path else '?') + f'teamId={TEAM}'
    req = urllib.request.Request(url, headers={'Authorization': f'Bearer {VTOKEN}'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode('utf-8'))


p = api(f'/v9/projects/{PROJECT}')
print('name:', p.get('name'))
print('framework:', p.get('framework'))
git = p.get('link') or {}
print('git:', json.dumps(git, ensure_ascii=False)[:400])
latest = (p.get('latestDeployments') or [{}])[0]
print('latest deployment:', latest.get('url'), '|', latest.get('createdAt'), '|', latest.get('readyState'))
meta = latest.get('meta') or {}
print('deploy meta:', json.dumps(meta, ensure_ascii=False)[:300])
print('alias:', json.dumps(latest.get('alias'), ensure_ascii=False)[:300])
