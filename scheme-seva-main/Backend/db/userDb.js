import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.join(__dirname, 'users.xlsx');

const initializeUserDb = async () => {
    if (fs.existsSync(EXCEL_PATH)) {
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');

    sheet.columns = [
        { header: '_id', key: '_id', width: 20 },
        { header: 'name', key: 'name', width: 25 },
        { header: 'email', key: 'email', width: 30 },
        { header: 'password', key: 'password', width: 30 },
        { header: 'phoneNumber', key: 'phoneNumber', width: 15 },
        { header: 'role', key: 'role', width: 15 },
        { header: 'refreshToken', key: 'refreshToken', width: 30 },
        { header: 'interests', key: 'interests', width: 25 },
        { header: 'incomeGroup', key: 'incomeGroup', width: 15 },
        { header: 'state', key: 'state', width: 15 },
        { header: 'age', key: 'age', width: 10 },
        { header: 'favorites', key: 'favorites', width: 25 },
        { header: 'gender', key: 'gender', width: 15 },
        { header: 'dob', key: 'dob', width: 15 },
        { header: 'fatherName', key: 'fatherName', width: 25 },
        { header: 'occupation', key: 'occupation', width: 25 },
        { header: 'income', key: 'income', width: 15 }
    ];

    await workbook.xlsx.writeFile(EXCEL_PATH);
    console.log("users.xlsx database created.");
};

const getAllUsers = async () => {
    if (!fs.existsSync(EXCEL_PATH)) {
        await initializeUserDb();
    }
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_PATH);
    const sheet = workbook.getWorksheet('Users');
    
    let users = [];
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        
        let user = {
            _id: row.getCell(1).value?.toString() || '',
            name: row.getCell(2).value?.toString() || '',
            email: row.getCell(3).value?.toString() || '',
            password: row.getCell(4).value?.toString() || '',
            phoneNumber: row.getCell(5).value?.toString() || '',
            role: row.getCell(6).value?.toString() || 'USER',
            refreshToken: row.getCell(7).value?.toString() || null,
            interests: row.getCell(8).value ? row.getCell(8).value.toString().split(',').filter(Boolean) : [],
            incomeGroup: row.getCell(9).value?.toString() || '',
            state: row.getCell(10).value?.toString() || '',
            age: parseInt(row.getCell(11).value) || null,
            favorites: row.getCell(12).value ? row.getCell(12).value.toString().split(',').filter(Boolean) : [],
            gender: row.getCell(13).value?.toString() || '',
            dob: row.getCell(14).value?.toString() || '',
            fatherName: row.getCell(15).value?.toString() || '',
            occupation: row.getCell(16).value?.toString() || '',
            income: parseFloat(row.getCell(17).value) || null
        };
        users.push(user);
    });
    
    return users;
};

const saveUsers = async (users) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');
    
    sheet.columns = [
        { header: '_id', key: '_id', width: 20 },
        { header: 'name', key: 'name', width: 25 },
        { header: 'email', key: 'email', width: 30 },
        { header: 'password', key: 'password', width: 30 },
        { header: 'phoneNumber', key: 'phoneNumber', width: 15 },
        { header: 'role', key: 'role', width: 15 },
        { header: 'refreshToken', key: 'refreshToken', width: 30 },
        { header: 'interests', key: 'interests', width: 25 },
        { header: 'incomeGroup', key: 'incomeGroup', width: 15 },
        { header: 'state', key: 'state', width: 15 },
        { header: 'age', key: 'age', width: 10 },
        { header: 'favorites', key: 'favorites', width: 25 },
        { header: 'gender', key: 'gender', width: 15 },
        { header: 'dob', key: 'dob', width: 15 },
        { header: 'fatherName', key: 'fatherName', width: 25 },
        { header: 'occupation', key: 'occupation', width: 25 },
        { header: 'income', key: 'income', width: 15 }
    ];

    users.forEach(user => {
        sheet.addRow({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber || '',
            role: user.role || 'USER',
            refreshToken: user.refreshToken || '',
            interests: Array.isArray(user.interests) ? user.interests.join(',') : '',
            incomeGroup: user.incomeGroup || '',
            state: user.state || '',
            age: user.age || '',
            favorites: Array.isArray(user.favorites) ? user.favorites.join(',') : '',
            gender: user.gender || '',
            dob: user.dob || '',
            fatherName: user.fatherName || '',
            occupation: user.occupation || '',
            income: user.income || ''
        });
    });

    await workbook.xlsx.writeFile(EXCEL_PATH);
};

export { initializeUserDb, getAllUsers, saveUsers };
