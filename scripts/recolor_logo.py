import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SRC = r'C:\Users\DELL\Desktop\almadena\public\logo.jpg'
OUT_PNG = r'C:\Users\DELL\Desktop\almadena\public\logo.png'
EMERALD = (8, 66, 57)  # 084239
BURGUNDY = (109, 30, 43)  # 6D1E2B

im = Image.open(SRC).convert('RGB')
w, h = im.size
print('src size', im.size)


def make_tinted(target, out_path, boost=1.0):
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    po = out.load()
    pi = im.load()
    # reference foreground red level (teal has low red). use red channel diff
    fg_r = 60  # teal-ish foreground red level
    for y in range(h):
        for x in range(w):
            r, g, b = pi[x, y]
            # alpha from red channel distance from white, normalized to fg level
            a = (255 - r) / (255 - fg_r)
            a = max(0.0, min(1.0, a * boost))
            if a <= 0.02:
                po[x, y] = (0, 0, 0, 0)
            else:
                # blend: premultiplied look — target color with alpha
                po[x, y] = (target[0], target[1], target[2], int(a * 255))
    out.save(out_path)
    print('saved', out_path)


make_tinted(EMERALD, OUT_PNG)
make_tinted(BURGUNDY, OUT_PNG.replace('logo.png', 'logo-burgundy.png'))
