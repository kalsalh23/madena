import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

d = r'C:\Users\DELL\Desktop\almadena\identity_extract'
for src, dst in [('fonts_p1.png', 'f1.jpg'), ('patterns_p1.png', 'p1.jpg')]:
    im = Image.open(d + '\\' + src).convert('RGB')
    im.save(d + '\\' + dst, 'JPEG', quality=88)
    print('saved', dst, im.size)
