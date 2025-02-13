import { api_links, pathFolder } from './modules/apiKey.js';
import { getProductList } from './modules/api/Api.js';

// Получение файла с акциями
function getSaleFile() {
    console.log('Получение всех товаров с Ozon по API');
    getProductList(api_links);
}

getSaleFile()