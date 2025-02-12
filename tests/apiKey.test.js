import { api_key, client_id, headers, api_links } from '../modules/apiKey';
// import { render, screen } from '@testing-library/react';

describe('apiKey module', () => {
    test('should export valid API key and client ID', () => {
        expect(api_key).toBeDefined();
        expect(client_id).toBeDefined();
        expect(typeof api_key).toBe('string');
        expect(typeof client_id).toBe('string');    
    })

    test('should export correct headers', () => {
        expect(headers).toEqual({
            'Client-Id': client_id,
            'Api-Key': api_key,
        });
    });

    test('should export valid API links', () => {
        expect(api_links.SaleList.normal).toBe('https://api-seller.ozon.ru/v1/actions');
        expect(api_links.ProductList).toBe('https://api-seller.ozon.ru/v3/product/list');
    });
})