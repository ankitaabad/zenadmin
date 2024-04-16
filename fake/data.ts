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
export function fakeproducts() {
  return {
    name: faker.person.fullName(),
    price: faker.number.int(),
  };
}
export function fakeproductsComplete() {
  return {
    id: faker.string.uuid(),
    catalogId: faker.string.uuid(),
    name: faker.person.fullName(),
    price: faker.number.int(),
  };
}
export function fakeOrders() {
  return {
    orderItems: JSON.stringify({"foo":"fa768f68-381c-4a86-9b4c-36658c6c1a60","bar":452674302509056,"bike":"9","a":"f","b":0.8621027993503958,"name":"Ora","prop":"0b0"}),
  };
}
export function fakeOrdersComplete() {
  return {
    id: faker.string.uuid(),
    buyerId: faker.string.uuid(),
    sellerId: faker.string.uuid(),
    orderItems: JSON.stringify({"foo":"76ddf1ff-7bce-4358-9c2b-e7d48f31d8f6","bar":8773816358535168,"bike":"2","a":"8","b":0.9805714995600283,"name":"Charley","prop":"0b1"}),
  };
}
