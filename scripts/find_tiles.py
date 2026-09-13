import os
import sys

import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'


def find(prefix, suffix='.ai'):
    for f in os.listdir(DL):
        n = f.replace('\u0654', '').replace('\u0623', 'ا')
        if n.startswith(prefix) and f.endswith(suffix) and not f.startswith('_'):
            return os.path.join(DL, f)
    raise FileNotFoundError(prefix)


path = find('الانماط')
doc = pymupdf.open(path)
page = doc[0]
print('page rect:', page.rect)

pix = page.get_pixmap(dpi=144)
img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
W, H = img.size
print('render size:', img.size)

# background is warm cream ~ #ece8dd. Find rows/cols where non-bg content exists
bg = img.getpixel((5, 5))
print('bg sample:', bg)


def non_bg_mask_row(y, tol=18):
    row_has = 0
    for x in range(0, W, 4):
        p = img.getpixel((x, y))
        if abs(p[0] - bg[0]) + abs(p[1] - bg[1]) + abs(p[2] - bg[2]) > tol:
            row_has += 1
    return row_has


for y in range(0, H, 20):
    n = non_bg_mask_row(y)
    if n > 3:
        print('row', y, 'content px:', n)
doc.close()
