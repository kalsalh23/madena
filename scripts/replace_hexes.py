import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'C:\Users\DELL\Desktop\almadena\src'
REPL = {
    '#F8FAFC': '#F5F3EC',   # خلفية فاتحة -> ورق الهوية
    '#f8fafc': '#F5F3EC',
    '#E5E7EB': '#E4E0D4',   # حدود رمادية -> حدود دافئة
    '#e5e7eb': '#E4E0D4',
    '#054239': '#084239',   # الأخضر الأساسي -> زمرددي الهوية
    '#0e7a63': '#0d7562',
    '#6b1f2a': '#5f0113',   # عنابي قديم -> عنابي الهوية
    '#988561': '#958162',
    '#4a151e': '#491220',
    '#8e3448': '#6d1e2b',
    '#b3576a': '#ba5f74',
    '#260f14': '#360d18',
    '#161616': '#161616',
    '#3d3a3b': '#3c3a3b',
    '#b9a779': '#b6a67a',
    '#c4ac72': '#c9b585',
    '#edebe0': '#ece8dd',
}

changed = 0
for dirpath, _, filenames in os.walk(ROOT):
    for fn in filenames:
        if not fn.endswith(('.jsx', '.js', '.css')):
            continue
        p = os.path.join(dirpath, fn)
        with open(p, 'r', encoding='utf-8') as fh:
            s = fh.read()
        s2 = s
        for a, b in REPL.items():
            s2 = s2.replace(a, b)
        if s2 != s:
            with open(p, 'w', encoding='utf-8') as fh:
                fh.write(s2)
            changed += 1
            print('updated', os.path.relpath(p, ROOT))
print('total files changed:', changed)
