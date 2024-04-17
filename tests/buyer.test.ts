import { random } from 'radash';
import { fakeUser } from '../fake/data';
import { fixedSellerProducts } from '../src/utils';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it } from 'vitest';

describe('buyers flow', () => {
  it('get all sellers', async () => {
    const { body, status } = await fetchClient.buyer.getSellers();
    console.log({ body });
    expect(status).toBe(200);
  });
  it('should get catalog of a seller', async () => {
    const { body, status } = await fetchClient.buyer.getSellerCatalog({
      params: { sellerId: fixedSellerProducts.sellerId },
    });
    console.log({ body });
    expect(status).toBe(200);
  });
  it('should create order successfully', async () => {
    const { status, body } = await fetchClient.buyer.createOrder({
      params: { sellerId: fixedSellerProducts.sellerId },
      body: fixedSellerProducts.products.map((i) => ({ id: i, qty: random(2, 20) })),
    });
    console.log({ body });
    expect(status).toBe(201);
  });
});
