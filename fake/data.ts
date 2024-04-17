import { UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';

export function fakeUser() {
  return {
    username: faker.internet.userName(),
    hash: faker.lorem.words(5),
    type: faker.helpers.arrayElement([UserType.BUYER, UserType.SELLER] as const),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    hash: faker.lorem.words(5),
    type: faker.helpers.arrayElement([UserType.BUYER, UserType.SELLER] as const),
  };
}
export function fakeCatalogComplete() {
  return {
    id: faker.string.uuid(),
    sellerid: faker.string.uuid(),
  };
}
export function fakeProducts() {
  return {
    name: faker.commerce.product(),
    price: Number(faker.commerce.price()),
  };
}
export function fakeProductsComplete() {
  return {
    id: faker.string.uuid(),
    catalogId: faker.string.uuid(),
    name: faker.commerce.product(),
    price: Number(faker.commerce.price()),
  };
}
export function fakeOrders() {
  return {
    orderItems: JSON.stringify({
      foo: 'db7671a9-48c2-4490-ba25-aa083f1e9aa2',
      bar: 6725482026369024,
      bike: '9',
      a: 'O',
      b: 0.48382504167966545,
      name: 'Lexi',
      prop: '0b1',
    }),
    createdAt: faker.date.anytime(),
  };
}
export function fakeOrdersComplete() {
  return {
    id: faker.string.uuid(),
    buyerId: faker.string.uuid(),
    sellerId: faker.string.uuid(),
    orderItems: JSON.stringify({
      foo: '3e68ebdb-e029-42e7-a8bc-43e4da4eaaab',
      bar: 8730621387997184,
      bike: '9',
      a: 'k',
      b: 0.8118556900881231,
      name: 'Willy',
      prop: '0b1',
    }),
    createdAt: faker.date.anytime(),
  };
}
