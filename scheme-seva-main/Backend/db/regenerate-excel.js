import ExcelJS from 'exceljs';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.join(__dirname, 'schemes.xlsx');

// Import SCHEMES_DATA from excelDb.js
const { SCHEMES_DATA } = await import('./excelDb.js');

async function regenerateExcel() {
  console.log('Regenerating Excel file...');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Schemes');
  
  sheet.columns = [
    { header: '_id', key: '_id' },
    { header: 'data', key: 'data' }
  ];

  console.log(`Adding ${SCHEMES_DATA.length} schemes to Excel file...`);
  for (const scheme of SCHEMES_DATA) {
    sheet.addRow({ _id: scheme._id, data: JSON.stringify(scheme) });
  }

  await workbook.xlsx.writeFile(EXCEL_PATH);
  console.log(`✅ Excel file created at ${EXCEL_PATH} with ${SCHEMES_DATA.length} schemes`);
}

regenerateExcel().catch(console.error);
