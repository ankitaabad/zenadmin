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
      foo: '085e811e-bd2f-4a41-9fea-613aaeda546f',
      bar: 7543379426541568,
      bike: 'f',
      a: '6',
      b: 0.7759441726375371,
      name: 'Vickie',
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
      foo: '867af4bc-e0fd-4361-b205-9801dc985966',
      bar: 6932619094654976,
      bike: 'e',
      a: 'o',
      b: 0.11667597712948918,
      name: 'Madeline',
      prop: '0b1',
    }),
    createdAt: faker.date.anytime(),
  };
}
