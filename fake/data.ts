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
      foo: '34e67350-ab15-4ff0-8c51-dd8812a14831',
      bar: 1254907805958144,
      bike: '5',
      a: '7',
      b: 0.5649053887464106,
      name: 'Valentina',
      prop: '0b0',
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
      foo: '60561cac-90ef-45ec-8642-d3b9bcb0a5a8',
      bar: 2687518774394880,
      bike: '1',
      a: 'L',
      b: 0.17208867752924562,
      name: 'Francisca',
      prop: '0b0',
    }),
    createdAt: faker.date.anytime(),
  };
}
