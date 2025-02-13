// Модули
import fs from 'fs';
import path from 'path';

// Дополнительные переменные
const moduleStorageFolderPath = './modules/storage/modelsStorage.json';

async function readJSON(fetchedData) {

    let existingData;
    try {
        const directoryPath = path.dirname(moduleStorageFolderPath);
        await fs.promises.mkdir(directoryPath, { recursive: true });
        try {
            const fileContent = await fs.promises.readFile(moduleStorageFolderPath, 'utf8');
            existingData = JSON.parse(fileContent);
        } catch (error) {
            console.warn('Файл не существует или поврежден. Создание новой структуры данных.');
            existingData = { items: [] };
        }

        // Функция для проверки уникальности элемента по product_id
        const isUniqueItem = (item, itemsArray) => {
            return !itemsArray.some(existingItem => existingItem.product_id === item.product_id);
        };
        
        // Добавляем новые данные в массив items
        if (fetchedData && Array.isArray(fetchedData.items)) {
            existingData.items = existingData.items || [];
            const uniqueItemsToAdd = fetchedData.items.filter(item => isUniqueItem(item, existingData.items));
            existingData.items.push(...uniqueItemsToAdd);

            // Обновляем общее количество элементов (total), если оно есть
            if (fetchedData.total !== undefined) {
                existingData.total = (existingData.total || 0) + uniqueItemsToAdd.length;
            }

            // Обновляем last_id, если оно есть
            if (fetchedData.last_id) {
                existingData.last_id = fetchedData.last_id;
            }
        } else {
            console.warn('В полученных данных отсутствует поле items. Ничего не добавлено.');
        }
        
        // Записываем обновленные данные обратно в файл
        const jsonData = JSON.stringify(existingData, null, 2);
        await fs.promises.writeFile(moduleStorageFolderPath, jsonData, 'utf8');
        console.log('Данные успешно обновлены и сохранены.');
    } catch (error) {
        // Если файл не существует или пуст, создаем новую структуру
        existingData = { result: { items: [] } };
    }
}

export { readJSON };