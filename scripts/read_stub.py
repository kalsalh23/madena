import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = r'C:\Users\DELL\Downloads\_شعار مجلس المدينة.ai'
data = open(p, 'rb').read()
print(len(data))
print(ascii(data.decode('latin-1'))[:4000])
