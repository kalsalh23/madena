import os
import sys

import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'
OUT = r'C:\Users\DELL\Desktop\almadena\public\images\patterns'
os.makedirs(OUT, exist_ok=True)


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
bg = (0x07, 0x42, 0x38)
S = DPI / 144.0  # scale from 144dpi measurements


def is_bg(p, tol=16):
    return abs(p[0] - bg[0]) + abs(p[1] - bg[1]) + abs(p[2] - bg[2]) <= tol


# ---- 1) circular icon tiles ----
# centers at 144dpi: x 701.5, 953.5, 1205.5, 1457.5 ; y ~999 ; r ~105
centers = [(701.5, 'tatriz'), (953.5, 'fsefsaa'), (1205.5, 'kitab'), (1457.5, 'sanbala')]
cy = 999
r = 105
for cx, name in centers:
    cx *= S
    cy2 = cy * S
    r2 = r * S
    pad = 6
    box = (int(cx - r2 - pad), int(cy2 - r2 - pad), int(cx + r2 + pad), int(cy2 + r2 + pad))
    tile = img.crop(box)
    # circular alpha mask
    mask = Image.new('L', tile.size, 0)
    from PIL import ImageDraw
    d = ImageDraw.Draw(mask)
    d.ellipse((pad, pad, tile.size[0] - pad, tile.size[1] - pad), fill=255)
    out = tile.convert('RGBA')
    out.putalpha(mask)
    p = os.path.join(OUT, f'{name}.png')
    out.save(p)
    print('saved', p, out.size)

# ---- 2) decorative strips (make transparent) ----
# strips at 144dpi y-ranges: (1360,1580) diamonds, (1660,1840) mosaic,
# (1920,2120) leaves, (2220,2520) wheat  -> find tight x extent per strip
strips = [
    ('strip-tatriz', 1340, 1600),
    ('strip-fsefsaa', 1640, 1860),
    ('strip-kitab', 1900, 2140),
    ('strip-sanbala', 2200, 2540),
]
for name, y0, y1 in strips:
    y0s, y1s = int(y0 * S), int(y1 * S)
    # tight x extent within band
    xmin, xmax = W, 0
    for y in range(y0s, y1s, 4):
        for x in range(0, W, 2):
            if not is_bg(img.getpixel((x, y))):
                xmin = min(xmin, x)
                xmax = max(xmax, x)
                break
        for x in range(W - 1, 0, -2):
            if not is_bg(img.getpixel((x, y))):
                xmax = max(xmax, x)
                xmin = min(xmin, x)
                break
    pad = 4
    box = (max(0, xmin - pad), y0s, min(W, xmax + pad), y1s)
    crop = img.crop(box).convert('RGBA')
    # remove dark emerald bg -> transparent with smooth edges
    px = crop.load()
    w2, h2 = crop.size
    for yy in range(h2):
        for xx in range(w2):
            r0, g0, b0, a0 = px[xx, yy]
            dist = abs(r0 - bg[0]) + abs(g0 - bg[1]) + abs(b0 - bg[2])
            if dist <= 10:
                px[xx, yy] = (r0, g0, b0, 0)
            elif dist < 40:
                px[xx, yy] = (r0, g0, b0, int(255 * (dist - 10) / 30))
    p = os.path.join(OUT, f'{name}.png')
    crop.save(p)
    print('saved', p, crop.size)

doc.close()
print('done')
