import express from 'express';
const app = express();
const port = 2024;
import { fileURLToPath } from 'url';
import path from 'path';
// import mysql from 'mysql2/promise';
import cors from 'cors';
import fs from 'fs';
const __filenameOzonModels = fileURLToPath(import.meta.url); // Получаем путь к текущему файлу
const __dirname = path.dirname(__filenameOzonModels); // Получаем директорию текущего файла

app.use(express.static(path.join(__dirname, 'public', 'index.html')));

// const bestserverPool = mysql.createPool({
//     host: '192.168.100.170',
//     user: 'root',
//     password: 'root', 
//     database: 'bestserver',
//     waitForConnections: true
// });

// bestserverPool.getConnection()
// .then((connection) => {
//     console.log('2 Успешное подключение к базе данных MySQL: storagesigns');
//     connection.release();
// })
// .catch((err) => {
//     console.error('Ошибка при подключении к базе данных', err.message);
// });

app.use(cors());

// Маршрут для получения данных из JSON файла
app.get('/api/modelsOzon', async (req, res) => {
    try {
        // Чтение JSON файла
        const data = await fs.promises.readFile('./modules/storage/modelsStorage.json', 'utf8');
        const jsonData = JSON.parse(data); // Преобразование в JavaScript объект

        // Отправка данных клиенту
        res.json(jsonData);
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
        res.status(500).json({ error: 'Не удалось прочитать файл' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
});