import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SRC = r'C:\Users\DELL\Downloads\5852788974517162292.jpg'
im = Image.open(SRC).convert('RGB')
W, H = im.size
print('size:', im.size)

# خلفية الزمرددي — نجد منطقة الشعار (الرمادي الفاتح/الكريمي) فوق النص
BG = im.getpixel((10, 10))
print('bg:', BG)


def is_fg(p, tol=60):
    return abs(p[0] - BG[0]) + abs(p[1] - BG[1]) + abs(p[2] - BG[2]) > tol


# مسح صفوف لمعرفة توزيع المحتوى
import collections

row_counts = []
for y in range(0, H, 4):
    c = sum(1 for x in range(0, W, 4) if is_fg(im.getpixel((x, y))))
    row_counts.append((y, c))

# طباعة نطاقات المحتوى
in_band = False
for y, c in row_counts:
    if c > 3 and not in_band:
        print('band start ~', y)
        in_band = True
    if c <= 3 and in_band:
        print('band end   ~', y)
        in_band = False
if in_band:
    print('band end   ~', H)
