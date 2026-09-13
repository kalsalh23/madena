import sys
import os

import pymupdf

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'
files = os.listdir(DL)
OUT = r'C:\Users\DELL\Desktop\almadena\identity_extract'


def find(prefix, suffix='.ai'):
    for f in files:
        n = f.replace('\u0654', '').replace('\u0623', 'ا')
        if n.startswith(prefix) and f.endswith(suffix) and not f.startswith('_'):
            return os.path.join(DL, f)
    raise FileNotFoundError(prefix)


for label in ['الالوان', 'الخطوط', 'الانماط']:
    path = find(label)
    doc = pymupdf.open(path)
    page = doc[0]
    # embedded raster images
    imgs = page.get_images(full=True)
    print(label, '| embedded images:', len(imgs))
    for i, im in enumerate(imgs):
        xref = im[0]
        info = doc.extract_image(xref)
        ext = info['ext']
        p = os.path.join(OUT, f'{label}_img{i + 1}.{ext}')
        with open(p, 'wb') as fh:
            fh.write(info['image'])
        print('  saved', p, info['width'], 'x', info['height'])
    # vector drawings stats
    drawings = page.get_drawings()
    print(label, '| vector drawing paths:', len(drawings))
    # fonts used in the doc
    fonts = page.get_fonts(full=True)
    for f in fonts:
        print('  font:', f[3], 'type:', f[2])
    doc.close()
