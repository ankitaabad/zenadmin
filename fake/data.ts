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
export function fakeCatalog() {
  return {
    sellerid: faker.lorem.words(5),
  };
}
export function fakeCatalogComplete() {
  return {
    id: faker.string.uuid(),
    sellerid: faker.lorem.words(5),
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
      foo: '5eb89fe7-b310-4dc3-aab1-e91891350e5c',
      bar: 1900771243196416,
      bike: 'a',
      a: 'e',
      b: 0.5253509825561196,
      name: 'Lesly',
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
      foo: '891cb623-20b5-4900-a1f2-499da0399e5a',
      bar: 358402907701248,
      bike: 'e',
      a: 'Y',
      b: 0.7027911604382098,
      name: 'Ryder',
      prop: '0b1',
    }),
    createdAt: faker.date.anytime(),
  };
}
