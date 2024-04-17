import { initContract } from '@ts-rest/core';
import { z } from 'zod';
// @ts-ignore
import type * as s from 'zapatos/schema';
const c = initContract();
export type product = {
  id: string;
  name: string;
  price: number;
};
export const sellerContract = c.router(
  {
    createCatalog: {
      method: 'POST',
      path: '/create-catalog',
      body: z.array(z.object({ name: z.string(), price: z.number() })),
      responses: {
        201: c.type<{ id: string; products: product[] }>(),
      },
      summary: 'Create a catalog',
    },
    getOrders: {
      method: 'GET',
      path: '/orders',
      responses: {
        200: c.type<s.Orders.JSONSelectable[]>(),
      },
      summary: 'Get all orders for a seller',
    },
  },
  {
    pathPrefix: '/api/seller',
    commonResponses: { 400: c.type<{ message: string }>(), 401: c.type<{ message: string }>() },
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  }
);
