import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

im = Image.open(r'C:\Users\DELL\Desktop\almadena\public\logo.png').resize((360, 360))
bg = Image.new('RGB', (380, 380), (255, 255, 255))
bg.paste(im, (10, 10), im)
bg.save(r'C:\Users\DELL\Desktop\almadena\identity_extract\logo_check.png')
print('ok')
