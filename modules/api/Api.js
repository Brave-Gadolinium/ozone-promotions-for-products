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

        const requestBody = {
            "filter": {
                "visibility": "ALL",
            },
            "last_id": "",
            "limit" : 1,
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
        console.log('Полученные данные:', data);
        console.log('Полученные данные:', data.result.items);

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