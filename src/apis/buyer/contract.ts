import { initContract } from '@ts-rest/core';
import { z } from 'zod';
// @ts-ignore
import type * as s from 'zapatos/schema';
const c = initContract();
export const buyerContract = c.router(
  {
    getSellers: {
      method: 'GET',
      path: '/list-of-sellers',
      responses: {
        200: c.type<{ id: string; username: string }[]>(),
      },
      summary: 'Get all the sellers',
    },
    getSellerCatalog: {
      method: 'GET',
      path: '/seller-catalog/:sellerId',
      pathParams: z.object({ sellerId: z.string() }),
      responses: {
        200: c.type<s.Products.JSONSelectable[]>(),
      },
      summary: 'Get list of products sold by a seller',
    },
    createOrder: {
      method: 'POST',
      path: '/create-order/:sellerId',
      pathParams: z.object({ sellerId: z.string() }),
      body: z.array(z.object({ id: z.string(), qty: z.number() })),
      responses: {
        201: c.type<{ id: string }>(),
      },
      summary: 'Place an order',
    },
  },
  { pathPrefix: '/api/buyer', commonResponses: { 400: c.type<{ message: string }>() } }
);
