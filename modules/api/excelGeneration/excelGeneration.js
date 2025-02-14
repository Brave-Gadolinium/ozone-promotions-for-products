import ExcelJS from 'exceljs';
import fs from 'fs/promises';

const Brand = 'BestShoes';

// Чтение JSON файла
async function readJsonFile(filePath) {
    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Ошибка при чтении JSON файла:', error.message);
        throw error;
    }
}

// Функция для извлечения основного артикула
function getBaseArticle(offerId) {
    return offerId.split('(')[0].trim();
}

// Группировка данных по основному артикулу
function groupDataByBaseArticle(data) {
    return data.items.reduce((acc, item) => {
        const baseArticle = getBaseArticle(item.offer_id);
        if (!acc[baseArticle]) {
            acc[baseArticle] = [];
        }
        acc[baseArticle].push({
            Артикул: item.offer_id,
            Цена: Math.round(item.price),
            Старая_цена: Math.round(item.old_price),
            Артикул2: baseArticle,
            Динамика_цены: Math.round(item.old_price) - Math.round(item.price),
        });
        return acc;
    }, {});
}

// Преобразование сгруппированных данных в плоский массив для записи в Excel
function flattenGroupedData(groupedData) {
    return Object.entries(groupedData).flatMap(([baseArticle, items]) => {
        // Добавляем детальные строки сначала
        const detailedRows = items.map(item => ({
            Артикул: item.Артикул,
            Название: item.Название,
            Цена: item.Цена,
            Старая_цена: item.Старая_цена,
            Динамика_цены: item.Динамика_цены,
            Валюта: item.Валюта,
            Количество: item.Количество,
            Статус: item.Статус,
        }));

        // Добавляем baseArticle в конец группы
        const baseArticleRow = {
            Артикул: baseArticle,
            Название: '',
            Цена: '',
            Старая_цена: '',
            Динамика_цены: '',
            Валюта: '',
            Количество: '',
            Статус: ''
        };

        // Возвращаем массив, где baseArticle находится в конце
        return [...detailedRows, baseArticleRow];
    });
}

// Создание Excel-файла с помощью exceljs
async function createExcelFile(data) {

    data.items.sort((a, b) => {
        const offerIdA = a.offer_id.replace(/[^0-9]/g, ''); // Удаляем нечисловые символы из offer_id
        const offerIdB = b.offer_id.replace(/[^0-9]/g, '');
        
        return parseInt(offerIdA, 10) - parseInt(offerIdB, 10); // Сортируем числа
    });
    
    try {
        const groupedData = groupDataByBaseArticle(data);
        const flatData = flattenGroupedData(groupedData);
        console.log(flatData)
        // Создание новой книги и листа
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Лист1');
        workbook.properties = { hasMacros: true }; // Указываем, что файл содержит макросы

        // Добавление заголовков
        worksheet.addRow(['Артикул', 'Цена', 'Старая цена', 'Динамика_цены', 'Артикул', 'BESTSHOES']);
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell(cell => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '8FC7FF' }
            };
        });

        // Добавление данных
        flatData.forEach(rowData => {
            worksheet.addRow([
                rowData['Артикул'],
                rowData['Цена'],
                rowData['Старая_цена'],
                rowData['Динамика_цены'],
                rowData['Артикул'],
                ' ',
            ]);
        });

        // Установка ширины столбцов
        worksheet.columns = [
            { width: 15 }, // Артикул
            { width: 15 }, // Цена
            { width: 20 }, // Старая цена
            { width: 20 }, // Старая цена
            { width: 20 }, // Старая цена
            { width: 20 }, // Старая цена

        ];
        worksheet.getRow(1).height = 30;
        headerRow.eachCell((cell) => {
            cell.alignment = {
                vertical: 'middle', // Выравнивание по вертикали
                horizontal: 'center', // Выравнивание по горизонтали
                wrapText: true // Если текст длинный, он будет переноситься
            };
        });

        // Установка белого цвета заливки всех строк
        // worksheet.eachRow({ includeEmpty: true }, (row) => {
        //     row.eachCell({ includeEmpty: true }, (cell) => {
        //         cell.fill = {
        //             type: 'pattern', // Тип заливки
        //             pattern: 'solid', // Сплошная заливка
        //             fgColor: { argb: 'FFFFFF' } // Белый цвет (FFFFFF)
        //         };
        //     });
        // });
        
        // Установка денежного формата для второго столбца (индекс 3, так как индексация начинается с 1)
        worksheet.getColumn(3).eachCell({ includeEmpty: true }, (cell) => {
            if (cell.row.number > 1) { // Пропускаем первую строку (заголовки)
                cell.numFmt = '#,##0 ₽'; // Формат для отображения числа в рублях
            }
        });

        // Группировка строк
        let rowOffset = 1; // Начинаем с первой строки заголовков
        Object.values(groupedData).forEach(items => {
            const baseRow = rowOffset + items.length + 1; // Строка с baseArticle в конце
            worksheet.getRow(baseRow).outlineLevel = 0; // Основной артикул всегда виден
            const startRow = rowOffset + 1; // Начало группы
            const endRow = baseRow - 1; // Конец группы (перед baseArticle)
            for (let i = startRow; i <= endRow; i++) {
                worksheet.getRow(i).outlineLevel = 1; // Группируемые строки
            }

            const headerRow = worksheet.getRow(baseRow);
            headerRow.eachCell(cell => {
                cell.font = { bold: true };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'B9DCFF' }
                };
            });

            rowOffset += items.length + 1; // Сдвиг для следующей группы
        });

        // Сохранение файла
        const buffer = await workbook.xlsx.writeBuffer();
        await fs.writeFile('output.xlsx', buffer);
        console.log("Файл успешно создан!");
    } catch (error) {
        console.error('Ошибка при создании Excel-файла:', error.message);
        throw error;
    }
}

// Основная функция
(async () => {
    try {
        const filePath = `../../storage/${Brand === 'BestShoes' ? 'modelsStorageBestShoes' : 'modelsStorageArmbest'}.json`;
        const jsonData = await readJsonFile(filePath);
        await createExcelFile(jsonData);
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
})();