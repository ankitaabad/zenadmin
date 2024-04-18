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
      query: z.object({ withCatalog: z.string().optional() }),

      responses: {
        200: c.type<{ message: string; data: { id: string; seller: string }[] }>(),
      },
      summary: 'Get all the sellers',
    },
    getSellerCatalog: {
      method: 'GET',
      path: '/seller-catalog/:sellerId',
      pathParams: z.object({ sellerId: z.string() }),
      responses: {
        200: c.type<{ message: string; data: s.Products.JSONSelectable[] }>(),
      },
      summary: 'Get list of products sold by a seller',
    },
    createOrder: {
      method: 'POST',
      path: '/create-order/:sellerId',
      pathParams: z.object({ sellerId: z.string() }),
      body: z.array(z.object({ id: z.string(), qty: z.number().min(1) })),
      responses: {
        201: c.type<{
          message: string;
          data: { orderId: string; billAmount: number };
        }>(),
      },
      summary: 'Place an order',
    },
  },
  {
    pathPrefix: '/api/buyer',
    commonResponses: { 400: c.type<{ message: string }>(), 401: c.type<{ message: string }>() },
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  }
);
