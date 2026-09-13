import json
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

d = json.load(open(r'C:\Users\DELL\Desktop\almadena\identity_extract\pkg.json'))


def walk(files, pre=''):
    for f in files:
        p = pre + '/' + f['name']
        if f['type'] == 'directory':
            walk(f.get('files', []), p)
        else:
            print(p, f.get('size'))


walk(d['files'])
