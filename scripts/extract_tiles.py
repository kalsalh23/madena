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
DPI = 288
pix = page.get_pixmap(dpi=DPI)
img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
W, H = img.size
print('render:', img.size)

# Focus on the middle band y in [0.28H, 0.62H] and find tile columns via vertical scans
bg = (0x07, 0x42, 0x38)


def is_bg(p, tol=14):
    return abs(p[0] - bg[0]) + abs(p[1] - bg[1]) + abs(p[2] - bg[2]) <= tol


y_scan = int(H * 0.42)
cols = []
for x in range(0, W):
    p = img.getpixel((x, y_scan))
    cols.append(not is_bg(p))

# find column runs
runs = []
x = 0
while x < W:
    if cols[x]:
        start = x
        while x < W and cols[x]:
            x += 1
        runs.append((start, x - 1))
    else:
        x += 1
runs = [r for r in runs if r[1] - r[0] > 100]
print('column runs at y=', y_scan, ':', runs)

# for each column run, find vertical extent at its center
tiles = []
for (x0, x1) in runs:
    xc = (x0 + x1) // 2
    ys = []
    for y in range(int(H * 0.2), int(H * 0.75)):
        ys.append(not is_bg(img.getpixel((xc, y))))
    y = 0
    yr = []
    yy = 0
    while yy < len(ys):
        if ys[yy]:
            s = yy
            while yy < len(ys) and ys[yy]:
                yy += 1
            yr.append((s + int(H * 0.2), yy - 1 + int(H * 0.2)))
        else:
            yy += 1
    yr = [r for r in yr if r[1] - r[0] > 100]
    print('col run', (x0, x1), 'y-runs:', yr)
    if yr:
        y0, y1 = yr[0]
        tiles.append((x0, y0, x1, y1))

print('tiles:', tiles)
doc.close()
