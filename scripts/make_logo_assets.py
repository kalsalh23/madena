import sys

from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SRC = r'C:\Users\DELL\Downloads\5852788974517162292.jpg'
OUT = r'C:\Users\DELL\Desktop\almadena\public'
BG = (0, 68, 57)  # زمرددي الهوية من خلفية الشعار نفسه

im = Image.open(SRC).convert('RGB')
W, H = im.size

# ---- 1) بطاقة الشعار المربعة (الرمز فقط) ----
cx = (470 + 768) // 2
cy = (240 + 690) // 2
side = 520
x0 = cx - side // 2
y0 = cy - side // 2
tile = im.crop((x0, y0, x0 + side, y0 + side)).resize((512, 512), Image.LANCZOS)
tile.save(OUT + r'\logo.png', optimize=True)
print('logo.png', tile.size)

# ---- 2) الفيكون من نفس البطاقة ----
tile.resize((256, 256), Image.LANCZOS).save(OUT + r'\favicon.png', optimize=True)
print('favicon.png saved')

# ---- 3) الشعار الكامل (رمز + النصان) ----
full = im.crop((218, 220, 988, 1032))
full.save(OUT + r'\logo-full.png', optimize=True)
print('logo-full.png', full.size)

# ---- 4) صورة OG للمشاركة 1200x630 ----
og = Image.new('RGB', (1200, 630), BG)
f2 = full.copy()
f2.thumbnail((560, 580), Image.LANCZOS)
og.paste(f2, ((1200 - f2.width) // 2, (630 - f2.height) // 2))
og.save(OUT + r'\og-image.png', optimize=True)
print('og-image.png', og.size)

# معاينة للتحقق
prev = Image.new('RGB', (512 + 40 + 630, 660), (250, 250, 250))
prev.paste(tile, (20, 20))
prev.paste(og, (572, 15))
d = ImageDraw.Draw(prev)
prev.save(r'C:\Users\DELL\Desktop\almadena\identity_extract\new_logo_preview.png')
print('preview saved')
