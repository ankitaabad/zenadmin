import { random } from 'radash';
import { fakeProducts, fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it, beforeAll } from 'vitest';
import { authHeader, setup } from './setup';

describe('sellers flow', () => {
  let data: Awaited<ReturnType<typeof setup>>;
  beforeAll(async () => {
    data = await setup();
  });
  it('create catalog', async () => {
    const items = Array(random(3, 10))
      .fill(0)
      .map(() => {
        return fakeProducts();
      });
    const { body, status } = await fetchClient.seller.createCatalog({
      body: items,
      ...authHeader(data.sellerWithoutCatalog.token),
    });
    expect(status).toBe(201);
  });
  it('should fail to create catalog if catalog is already created', async () => {
    const items = Array(random(3, 10))
      .fill(0)
      .map(() => {
        return fakeProducts();
      });
    const { body, status } = await fetchClient.seller.createCatalog({
      body: items,
      ...authHeader(data.seller.token),
    });
    expect(status).toBe(400);
  });
  //todo: catalog already exist

  it('get all orders for a seller', async () => {
    const { body, status } = await fetchClient.seller.getOrders(authHeader(data.seller.token));
    expect(status).toBe(200);
  });
});
