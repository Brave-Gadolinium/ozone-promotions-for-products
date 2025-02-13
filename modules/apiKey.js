import dotenv from 'dotenv';
dotenv.config();
const api_key = process.env.API_KEY;
const client_id = process.env.CLIENT_ID;
const pathFolder = '';

const headers = { "Client-Id": client_id, "Api-Key": api_key }
const api_links = {
    "SaleList": {
        // # Список доступных акций
        "normal": "https://api-seller.ozon.ru/v1/actions"
    },
    "SaleCandidates": {
        // # Список доступных для акции товаров
        "normal": "https://api-seller.ozon.ru/v1/actions/candidates"
    },
    "ProductsInSale": {
        // # Список доступных для акции товаров
        "normal": "https://api-seller.ozon.ru/v1/actions/products"
    },    
    "AddToSale": {
        // # Добавить товар в акцию
        "normal": "https://api-seller.ozon.ru/v1/actions/products/activate"
    },
    "RemoveFromSale": {
        // # Удалить товары из акции
        "normal": "https://api-seller.ozon.ru/v1/actions/products/deactivate"
    }, 
    // # Список товаров
    "ProductList": "https://api-seller.ozon.ru/v3/product/list",
    "storage": { api_key, client_id, pathFolder}
}

export { headers, api_links, pathFolder };