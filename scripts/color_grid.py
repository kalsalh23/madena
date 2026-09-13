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
pix = page.get_pixmap(dpi=144)
img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
W, H = img.size

# sample color grid 8 cols x 10 rows
for gy in range(10):
    row = []
    for gx in range(8):
        x = int((gx + 0.5) * W / 8)
        y = int((gy + 0.5) * H / 10)
        row.append('%02x%02x%02x' % img.getpixel((x, y)))
    print(f'y~{int((gy + 0.5) * H / 10):4d}', ' '.join(row))

# also save a small preview
img.thumbnail((540, 675))
img.save(r'C:\Users\DELL\Desktop\almadena\identity_extract\patterns_preview.png')
print('preview saved')
doc.close()
