import os
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE = 'https://cdn.jsdelivr.net/gh/engdawood/thmanyah-font-web@4266a9d/fonts/thmanyah-serif-display/woff2/'
WEIGHTS = ['Light', 'Regular', 'Medium', 'Bold', 'Black']
OUT = r'C:\Users\DELL\Desktop\almadena\public\fonts'
os.makedirs(OUT, exist_ok=True)

for w in WEIGHTS:
    fname = f'thmanyah-serif-display-{w}.woff2'
    url = BASE + fname
    dst = os.path.join(OUT, fname)
    urllib.request.urlretrieve(url, dst)
    print('downloaded', fname, os.path.getsize(dst), 'bytes')
