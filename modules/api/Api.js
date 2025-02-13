// Модули
import { readJSON } from './jsonReader/jsonReader.js'
import { getModelsInfo } from './getModelInfo/getModelInfo.js'


// Необходимые переменные
const limitCountQuery = 1000;
let lastid = '';


// Контроллер для отмены сетевого запроса (если он занимает много времени)
const controller = new AbortController();
const signal = controller.signal;


// Получить все товары в Ozon
async function getProductList(api_links) {
    try {

        // Проверяем, что api_links содержит необходимые данные
        if (!api_links || !api_links["ProductList"] || !api_links['storage'] || !api_links['storage']['client_id'] || !api_links['storage']['api_key']) {
            throw new Error('Не предоставлены необходимые параметры для выполнения запроса.');
        }

        const arrayIdModels = []

        const requestBody = {
            "filter": {
                "visibility": "ALL",
            },
            "last_id": lastid,
            "limit" : limitCountQuery,
        }
        
        const response = await fetch(api_links["ProductList"], {
            signal,
            method: 'POST',
            headers: {
                'Client-Id': api_links['storage']['client_id'],
                "Api-Key": api_links['storage']['api_key'],
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error(`Запрос вернул ошибку! Статус запроса: ${response.status}`);
        }
        const data = await response.json();

        data.result.items.forEach((element, i) => {
            arrayIdModels.push(element['product_id'].toString());
        });

        const answer = await getModelsInfo(data, api_links, arrayIdModels);

        readJSON(answer);
        if (data.result.items.length < limitCountQuery) {
            console.log('Всё')
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Запрос был отменён');
        } else {
            console.error('Ошибка:', error);
        }
    }
    setTimeout(() => controller.abort(), 3000);
}

export { getProductList };