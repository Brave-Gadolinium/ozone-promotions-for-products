// 

// Контроллер для отмены сетевого запроса (если он занимает много времени)
const controller = new AbortController();
const signal = controller.signal;


async function getSalesActions(api_links) {
    console.log('Получение списка акций');
    const response = await fetch(api_links.SaleList.normal, {
        headers: {
            'Client-Id': api_links['storage']['client_id'],
            "Api-Key": api_links['storage']['api_key'],
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();
    console.log(data);

    excelGeneration(answer);

    setTimeout(() => controller.abort(), 3000);
}

export { getSalesActions };