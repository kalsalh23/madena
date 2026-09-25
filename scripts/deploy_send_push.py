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

content = open(
    r'C:\Users\DELL\Desktop\almadena\supabase\functions\send-push\index.ts',
    encoding='utf-8',
).read()

boundary = '----SupabaseDeployFormBoundary7MA4YWxkTrZu0gW'
metadata = json.dumps({
    'entrypoint_path': 'index.ts',
    'name': 'send-push',
    'verify_jwt': True,
})

parts = []
parts.append(
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="metadata"\r\n'
    f'Content-Type: application/json\r\n\r\n'
    f'{metadata}\r\n'
)
parts.append(
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="file"; filename="index.ts"\r\n'
    f'Content-Type: text/plain\r\n\r\n'
    f'{content}\r\n'
)
parts.append(f'--{boundary}--\r\n')
body = ''.join(parts).encode('utf-8')

url = f'https://api.supabase.com/v1/projects/{REF}/functions/deploy?slug=send-push&bundle=true'
req = urllib.request.Request(
    url,
    data=body,
    headers={
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': f'multipart/form-data; boundary={boundary}',
    },
    method='POST',
)
try:
    with urllib.request.urlopen(req, timeout=300) as r:
        print('deploy:', r.status, r.read().decode('utf-8')[:500])
except urllib.error.HTTPError as e:
    print('deploy FAIL', e.code, e.read().decode('utf-8', 'replace')[:800])
