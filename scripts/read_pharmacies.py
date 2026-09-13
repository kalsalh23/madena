import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DL = r'C:\Users\DELL\Downloads'
import openpyxl

for f in os.listdir(DL):
    if f.endswith('.xlsx') and 'الصيدليات' in f:
        p = os.path.join(DL, f)
        print('FILE:', ascii(f))
        wb = openpyxl.load_workbook(p, read_only=True, data_only=True)
        for ws in wb.worksheets:
            print('SHEET:', ws.title, '| dims:', ws.calculate_dimension())
            for i, row in enumerate(ws.iter_rows(values_only=True)):
                print(i + 1, row)
                if i > 400:
                    break
        wb.close()
