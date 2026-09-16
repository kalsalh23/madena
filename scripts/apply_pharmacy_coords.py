import json
import os
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.path.insert(0, os.path.dirname(__file__))
from pharmacy_coords import PHARMACY_COORDS

REF = 'jnzvvishbzzuuvdpewjy'
TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
if not TOKEN:
    p = os.path.join(os.path.dirname(__file__), '.supabase_token')
    if os.path.exists(p):
        TOKEN = open(p, encoding='utf-8').read().strip()

lines = []
for slug, (lat, lng) in PHARMACY_COORDS.items():
    lines.append(f"update public.places set latitude = {lat}, longitude = {lng} where slug = '{slug}';")
sql = '\n'.join(lines)

url = f'https://api.supabase.com/v1/projects/{REF}/database/query'
req = urllib.request.Request(
    url,
    data=json.dumps({'query': sql}).encode('utf-8'),
    headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'},
    method='POST',
)
with urllib.request.urlopen(req, timeout=180) as r:
    print('apply coords:', r.status)

# verify
req2 = urllib.request.Request(
    url,
    data=json.dumps({'query': 'select count(*) as n from public.places where latitude is null or longitude is null'}).encode('utf-8'),
    headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'},
    method='POST',
)
with urllib.request.urlopen(req2, timeout=60) as r:
    res = json.loads(r.read().decode('utf-8'))
    print('places missing coords now:', res)
