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
DPI = 144
pix = page.get_pixmap(dpi=DPI)
img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
W, H = img.size
print('render:', img.size)
bg = (0x07, 0x42, 0x38)


def is_bg(p, tol=16):
    return abs(p[0] - bg[0]) + abs(p[1] - bg[1]) + abs(p[2] - bg[2]) <= tol


for frac in [0.33, 0.35, 0.37, 0.39, 0.41, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85]:
    y = int(H * frac)
    runs = []
    x = 0
    while x < W:
        if not is_bg(img.getpixel((x, y))):
            start = x
            while x < W and not is_bg(img.getpixel((x, y))):
                x += 1
            runs.append((start, x - 1))
        else:
            x += 1
    runs = [r for r in runs if r[1] - r[0] > 30]
    print(f'y={frac:.2f} ({y})', runs)
doc.close()
