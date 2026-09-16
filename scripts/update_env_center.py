# تحديث مركز الخريطة في .env المحلي إلى طيبة الإمام
import re

P = r'C:\Users\DELL\Desktop\almadena\.env'
s = open(P, encoding='utf-8').read()
s = re.sub(r'VITE_MAP_CENTER_LAT=.*', 'VITE_MAP_CENTER_LAT=35.2685', s)
s = re.sub(r'VITE_MAP_CENTER_LNG=.*', 'VITE_MAP_CENTER_LNG=36.7175', s)
open(P, 'w', encoding='utf-8').write(s)
print('local .env updated')
