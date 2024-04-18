import { random } from 'radash';
import { fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it, beforeAll } from 'vitest';
import kuuid from 'kuuid';
import { setup, authHeader } from './setup';

describe('buyers flow', () => {
  let data: Awaited<ReturnType<typeof setup>>;
  beforeAll(async () => {
    data = await setup();
  });
  it('get all sellers', async () => {
    const { body, status } = await fetchClient.buyer.getSellers(authHeader(data.buyer.token));
    console.log({ body });
    expect(status).toBe(200);
  });
  it('should get catalog of a seller', async () => {
    const { body, status } = await fetchClient.buyer.getSellerCatalog({
      params: { sellerId: data.seller.id },
      ...authHeader(data.buyer.token),
    });
    console.log({ body });
    expect(status).toBe(200);
  });
  it('should get empty catalog for a non existent seller', async () => {
    const { body, status } = await fetchClient.buyer.getSellerCatalog({
      params: { sellerId: kuuid.id() },
      ...authHeader(data.buyer.token),
    });
    console.log({ body });
    expect(status).toBe(200);
    expect(body.data).toHaveLength(0);
  });
  it('should create order successfully', async () => {
    const { status, body } = await fetchClient.buyer.createOrder({
      params: { sellerId: data.seller.id },
      body: data.seller.products.map((i) => ({ id: i.id, qty: random(2, 20) })),
      ...authHeader(data.buyer.token),
    });
    console.log({ body });
    expect(status).toBe(201);
  });
  it('should fail to create order with wrong items', async () => {
    const { status, body } = await fetchClient.buyer.createOrder({
      params: { sellerId: data.seller.id },
      body: Array(3)
        .fill(0)
        .map((i) => ({ id: kuuid.id(), qty: random(2, 20) })),
      ...authHeader(data.buyer.token),
    });
    console.log({ body });
    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
  });
  it('should fail to create order with wrong seller id', async () => {
    const { status, body } = await fetchClient.buyer.createOrder({
      params: { sellerId: kuuid.id() },
      body: data.seller.products.map((i) => ({ id: i.id, qty: random(2, 20) })),
      ...authHeader(data.buyer.token),
    });
    console.log({ body: JSON.stringify(body) });
    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
  });
});
