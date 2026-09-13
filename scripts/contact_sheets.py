import os
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

d = r'C:\Users\DELL\Desktop\almadena\public\images\patterns'
chk = r'C:\Users\DELL\Desktop\almadena\identity_extract'
names = ['strip-tatriz', 'strip-fsefsaa', 'strip-kitab', 'strip-sanbala']
W = 1600

for bgval, out in [((248, 250, 252), 'strips_check.png'), ((7, 66, 57), 'strips_check_dark.png')]:
    sheet = Image.new('RGB', (W, 4 * 260 + 40), bgval)
    y = 20
    for n in names:
        im = Image.open(os.path.join(d, n + '.png'))
        im.thumbnail((W - 40, 240))
        sheet.paste(im, (20, y), im)
        y += 260
    sheet.save(os.path.join(chk, out))
    print('saved', out)

c = Image.new('RGB', (4 * 240 + 40, 240), (255, 255, 255))
x = 20
for n in ['tatriz', 'fsefsaa', 'kitab', 'sanbala']:
    im = Image.open(os.path.join(d, n + '.png')).resize((220, 220))
    c.paste(im, (x, 10), im)
    x += 240
c.save(os.path.join(chk, 'circles_check.png'))
print('saved circles_check.png')
