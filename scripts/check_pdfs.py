import sys
import os

import pymupdf

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'
OUT = r'C:\Users\DELL\Desktop\almadena\identity_extract'

for fname in os.listdir(DL):
    if fname.endswith('.pdf') and not fname.startswith('_'):
        path = os.path.join(DL, fname)
        try:
            doc = pymupdf.open(path)
        except Exception as e:
            print(fname, 'ERR', e)
            continue
        print('=' * 60)
        print(ascii(fname), '| pages:', len(doc))
        for i, page in enumerate(doc):
            t = page.get_text('text')
            # print first 500 chars
            print(f'-- p{i + 1}:', ascii(t[:500]))
        doc.close()
