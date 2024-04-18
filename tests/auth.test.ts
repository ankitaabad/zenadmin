import { randomString } from 'remeda';
import { fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it, beforeAll } from 'vitest';
import { getUser, setup } from './setup';

describe('auth flow', () => {
  let data: Awaited<ReturnType<typeof setup>>;
  beforeAll(async () => {
    data = await setup();
  });
  it('will create a buyer', async () => {
    const { username, password } = getUser();

    const { body, status } = await fetchClient.auth.register({
      body: { type: 'BUYER', username, password },
    });
    console.log({ response: body });

    expect(status).toBe(201);
    expect(body.data).toHaveProperty('userId');
  });
  it('will create a seller', async () => {
    const { username, password } = getUser();
    const { body, status } = await fetchClient.auth.register({
      body: { type: 'SELLER', username, password },
    });
    console.log({ response: body });
    expect(status).toBe(201);
    expect(body.data).toHaveProperty('userId');
  });
  it('should fail to create an existing user', async () => {
    const { username, password } = data.seller;
    const { body, status } = await fetchClient.auth.register({
      body: { type: 'SELLER', username, password },
    });
    console.log({ response: body });
    expect(status).toBe(400);
  });
  it('should login ', async () => {
    const { username, password } = data.buyer;
    const { body, status } = await fetchClient.auth.login({
      body: { username, password },
    });
    console.log({ response: body });
    expect(status).toBe(200);
    expect(body.data).toHaveProperty('token');
  });
});
// 001rxGWQ00i4KW0CNMPO2NOppu32FIqq
/*
{
  "id": "001rxGYr2OcCna3KJX9n1DpcsB05Nxvr",
  "catalogId": "001rxGYr40y5Lf2e7tIw4f54SO2quvra",
  "name": "shoe",
  "price": 100
},
{
  "id": "001rxGYr0hZspW0LY9xO4aAHnz3ZAOu3",
  "catalogId": "001rxGYr40y5Lf2e7tIw4f54SO2quvra",
  "name": "earphone",
  "price": 1000
}
*/
