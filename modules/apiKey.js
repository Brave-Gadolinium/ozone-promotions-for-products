import dotenv from 'dotenv';
dotenv.config();
// const brand = process.env.Brand;
const brand = 'Armbest';
const api_key = brand === 'Armbest' ? process.env.API_KEY_Armbest : process.env.API_KEY_BestShoes;

const client_id = brand == 'Armbest' ? process.env.CLIENT_ID_Armbest : process.env.CLIENT_ID_BestShoes;
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
    "InfoModels": "https://api-seller.ozon.ru/v3/product/info/list",
    "storage": { api_key, client_id, pathFolder }
}

export { headers, api_links, pathFolder };