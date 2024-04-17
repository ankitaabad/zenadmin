//@ts-nocheck
import { token } from './../src/utils';
import { randomString } from 'remeda';
import { fakeProducts, fakeUser } from '../fake/data';
import { fetchClient } from '../src/apis/mergedContract';
import { memo, random } from 'radash';
import { userType } from '../src/apis/auth/contract';
import { product } from '../src/apis/seller/contract';

export const getUser = () => {
  return {
    username: fakeUser().username,
    password: randomString(10),
  };
};
export const authHeader = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};
type user = {
  username: string;
  password: string;
  token: string;
  type: userType;
  id: string;
};
type buyer = user & {
  type: 'BUYER';
};
type sellerWithoutCatalog = user & {
  type: 'SELLER';
};
type seller = sellerWithoutCatalog & {
  products: product[];
};
const init = async () => {
  try {
    const buyer: Partial<buyer> = getUser();
    buyer.type = 'BUYER';
    const seller: Partial<seller> = getUser();
    seller.type = 'SELLER';
    const sellerWithoutCatalog: Partial<seller> = getUser();
    sellerWithoutCatalog.type = 'SELLER';
    buyer.id = (await fetchClient.auth.register({ body: buyer })).body.id;
    seller.id = (await fetchClient.auth.register({ body: seller })).body.id;
    sellerWithoutCatalog.id = (
      await fetchClient.auth.register({ body: sellerWithoutCatalog })
    ).body.id;

    buyer.token = (await fetchClient.auth.login({ body: buyer })).body.token;
    seller.token = (await fetchClient.auth.login({ body: seller })).body.token;
    sellerWithoutCatalog.token = (
      await fetchClient.auth.login({ body: sellerWithoutCatalog })
    ).body.token;

    const items = Array(random(3, 10))
      .fill(0)
      .map(() => {
        return fakeProducts();
      });
    seller.products = (
      await fetchClient.seller.createCatalog({ body: items, ...authHeader(seller.token) })
    ).body.products;

    await fetchClient.buyer.createOrder({
      params: { sellerId: seller.id },
      body: seller.products,
      ...authHeader(buyer.token),
    });
    return Object.freeze({
      buyer: buyer as buyer,
      seller: seller as seller,
      sellerWithoutCatalog: sellerWithoutCatalog as sellerWithoutCatalog,
    });
  } catch (err) {
    console.log({ err });
  }
};

export const setup = memo(init);
