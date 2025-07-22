import {test,expect,request} from '@playwright/test'

test('Get no param',async ()=>{

    const requestContext = await request.newContext({
        baseURL : 'https://fakestoreapi.com/products',
        timeout : 10000,
        extraHTTPHeaders : {
            'Accept' : 'application/json'
        }
    })

    const response = await requestContext.get('');

    const responseCode = response.status();
    const responseBody = await response.json();
    expect(response).toBeOK();
    expect(responseCode).toBe(200);
    expect(responseBody[0]).toHaveProperty('title');
    expect(responseBody[0].title).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
})