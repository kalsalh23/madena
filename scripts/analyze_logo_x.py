import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SRC = r'C:\Users\DELL\Downloads\5852788974517162292.jpg'
im = Image.open(SRC).convert('RGB')
W, H = im.size
BG = im.getpixel((10, 10))


def is_fg(p, tol=60):
    return abs(p[0] - BG[0]) + abs(p[1] - BG[1]) + abs(p[2] - BG[2]) > tol


def bbox(y0, y1):
    xmin, xmax, ymin, ymax = W, 0, H, 0
    for y in range(y0, y1, 2):
        for x in range(0, W, 2):
            if is_fg(im.getpixel((x, y))):
                xmin = min(xmin, x)
                xmax = max(xmax, x)
                ymin = min(ymin, y)
                ymax = max(ymax, y)
    return xmin, ymin, xmax, ymax


print('emblem bbox:', bbox(240, 700))
print('text1 bbox :', bbox(750, 895))
print('text2 bbox :', bbox(905, 1015))
