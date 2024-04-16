import { UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    username: faker.internet.userName(),
    type: faker.helpers.arrayElement([UserType.BUYER, UserType.SELLER] as const),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
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
    orderItems: JSON.stringify({"foo":"8ae0eb6e-567f-45aa-8d85-6687cf5185b2","bar":8539805807804416,"bike":"0","a":"p","b":0.9076025672256947,"name":"Velma","prop":"0b1"}),
    createdAt: faker.date.anytime(),
  };
}
export function fakeOrdersComplete() {
  return {
    id: faker.string.uuid(),
    buyerId: faker.string.uuid(),
    sellerId: faker.string.uuid(),
    orderItems: JSON.stringify({"foo":"da207a1d-ef5a-4089-8d3e-c7aa7b06755a","bar":7012755808714752,"bike":"1","a":"i","b":0.34104325040243566,"name":"Unique","prop":"0b1"}),
    createdAt: faker.date.anytime(),
  };
}
