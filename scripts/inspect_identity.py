import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

d = r'C:\Users\DELL\Downloads'
files = sorted(os.listdir(d))
print('total entries:', len(files))
for f in files:
    if f.lower().endswith(('.ai', '.pdf')):
        p = os.path.join(d, f)
        with open(p, 'rb') as fh:
            head = fh.read(16)
        print(ascii(f), os.path.getsize(p), head)
