import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SRC = r'C:\Users\DELL\Desktop\almadena\public\logo.png'
OUT = r'C:\Users\DELL\Desktop\almadena\public\badge.png'

im = Image.open(SRC).convert('RGB')
w, h = im.size

# الرمز الكريمي (فاتح) يصبح أبيض معتماً — الخلفية الزمردية (داكنة) شفافة
sil = Image.new('RGBA', (w, h), (0, 0, 0, 0))
po = sil.load()
pi = im.load()
for y in range(h):
    for x in range(w):
        r, g, b = pi[x, y]
        # سطوع تقريبي: الزمرددي داكن (~50)، الكريمي فاتح (~243)
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum > 150:
            po[x, y] = (255, 255, 255, 255)
        elif lum > 110:
            # حواف ناعمة
            po[x, y] = (255, 255, 255, int(255 * (lum - 110) / 40))

# اقتصاص حول المحتوى الأبيض مع هامش
bbox = sil.getbbox()
if bbox:
    pad = 40
    x0 = max(0, bbox[0] - pad)
    y0 = max(0, bbox[1] - pad)
    x1 = min(w, bbox[2] + pad)
    y1 = min(h, bbox[3] + pad)
    sil = sil.crop((x0, y0, x1, y1))

# مربع ثم 96×96
w2, h2 = sil.size
side = max(w2, h2)
sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
sq.paste(sil, ((side - w2) // 2, (side - h2) // 2))
sq.resize((96, 96), Image.LANCZOS).save(OUT, optimize=True)
print('badge.png saved')
