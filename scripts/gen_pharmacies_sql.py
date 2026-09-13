import sys

import openpyxl

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ترجمة أسماء الصيدليات إلى slugs لاتينية قصيرة وفريدة
SLUGS = [
    'mohammad-al-khadar', 'nariman', 'hossam-al-abdallah', 'al-muhannad', 'nada',
    'almasa', 'mohammad-al-issa', 'al-shifa', 'bayt-al-afiya', 'sham',
    'haritha', 'al-quds', 'al-kyal', 'al-yousef', 'hassan',
    'khairiya', 'al-jamal', 'mayar', 'anas', 'tawfiq',
    'samaher', 'fakhr', 'al-khatib', 'al-maha', 'alaa',
    'bayt-al-shifa', 'samar', 'hanan',
]

SRC = r'C:\Users\DELL\Downloads\الصيدليات.xlsx'
OUT = r'C:\Users\DELL\Desktop\almadena\supabase\migrations\20240913000000_real_pharmacies.sql'


def q(s):
    if s is None:
        return 'null'
    return "'" + str(s).replace("'", "''") + "'"


wb = openpyxl.load_workbook(SRC, read_only=True, data_only=True)
ws = wb['Sheet1']
rows = list(ws.iter_rows(values_only=True))[1:]
wb.close()

lines = [
    '-- ============================================================',
    '-- الصيدليات الحقيقية في طيبة الإمام (28 صيدلية) — من ملف الصيدليات.xlsx',
    '-- التصنيف: pharmacies | تُدرج فقط إن لم تكن موجودة (idempotent)',
    '-- ============================================================',
    '',
]
for i, (num, name, pharmacist, address) in enumerate(rows):
    if not name:
        continue
    slug = SLUGS[i] if i < len(SLUGS) else f'pharmacy-{i + 1:02d}'
    desc = f"صيدلية في مدينة طيبة الإمام — الصيدلاني/ـة المسؤول: {pharmacist}" if pharmacist else 'صيدلية في مدينة طيبة الإمام'
    lines.append(
        "insert into public.places (name, slug, description, category_id, address, is_published) "
        "select " + ', '.join([q(name.strip()), q(slug), q(desc),
                               "(select id from public.categories where slug='pharmacies')",
                               q(address.strip()), 'true'])
        + " where not exists (select 1 from public.places where slug = " + q(slug) + ");"
    )

sql = '\n'.join(lines) + '\n'
with open(OUT, 'w', encoding='utf-8') as fh:
    fh.write(sql)
print('written', OUT, '| rows:', len([l for l in lines if l.startswith('insert')]))
