// Контроллер для отмены сетевого запроса (если он занимает много времени)
const controller = new AbortController();
const signal = controller.signal;
async function getModelsInfo(data, api_links, arrayIdModels) {

    const response = await fetch(api_links.InfoModels, {
        signal,
        method: 'POST',
        headers: {
            'Client-Id': api_links['storage']['client_id'],
            "Api-Key": api_links['storage']['api_key'],
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: arrayIdModels })
    });

    const answer = await response.json();
    return answer;
}

export { getModelsInfo };