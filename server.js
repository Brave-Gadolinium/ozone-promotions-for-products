import express from 'express';
const app = express();
const port = 2024;
import { fileURLToPath } from 'url';
import path from 'path';
// import mysql from 'mysql2/promise';
import cors from 'cors';
import fs from 'fs';
const __filenameOzonModels = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameOzonModels);

app.use(express.static(path.join(__dirname, 'public', 'index.html')));

app.use(cors());

// Выбранный бренд
const Brand = 'BestShoes';

// Маршрут для получения данных из JSON файла
app.get('/api/modelsOzon', async (req, res) => {
    try {
        // Чтение JSON файла
        const data = await fs.promises.readFile(`./modules/storage/${Brand === 'BestShoes' ? 'modelsStorageBestShoes' : 'modelsStorageArmbest'}.json`, 'utf8');
        const jsonData = JSON.parse(data);

        // Отправка данных клиенту
        res.json(jsonData);
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
        res.status(500).json({ error: 'Не удалось прочитать файл' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
});