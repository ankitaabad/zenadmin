import { random } from 'radash';
import { fakeProducts, fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it } from 'vitest';

describe('sellers flow', () => {
  it('create catalog', async () => {
    const items = Array(random(3, 10))
      .fill(0)
      .map(() => {
        return fakeProducts();
      });
    console.log({ items });
    const { body, status } = await fetchClient.seller.createCatalog({ body: items });
    console.log({ body: JSON.stringify(body) });
    expect(status).toBe(201);
  });
  //todo: catalog already exist

  it('get all orders for a seller', async () => {
    const { body, status } = await fetchClient.seller.getOrders();
    console.log({ body });
    expect(status).toBe(200);
  });
});
