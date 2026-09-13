import sys
import os

import fitz

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'
files = os.listdir(DL)


def find(prefix, suffix='.ai'):
    for f in files:
        n = f.replace('\u0654', '').replace('\u0623', 'ا')  # normalize hamza forms
        if n.startswith(prefix) and f.endswith(suffix) and not f.startswith('_'):
            return os.path.join(DL, f)
    raise FileNotFoundError(prefix)


SRC = {
    'colors': find('الالوان'),
    'fonts': find('الخطوط'),
    'patterns': find('الانماط'),
}
OUT = r'C:\Users\DELL\Desktop\almadena\identity_extract'
os.makedirs(OUT, exist_ok=True)

for label, path in SRC.items():
    doc = fitz.open(path)
    print('=' * 60)
    print(label, '| pages:', len(doc), '| size:', doc[0].rect)
    for i, page in enumerate(doc):
        text = page.get_text('text')
        print('-' * 40, f'page {i + 1}')
        print(text[:3000])
        pix = page.get_pixmap(dpi=100)
        img_path = os.path.join(OUT, f'{label}_p{i + 1}.png')
        pix.save(img_path)
        print('[image saved]', img_path)
    doc.close()
