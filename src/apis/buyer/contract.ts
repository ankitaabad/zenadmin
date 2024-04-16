import { initContract } from '@ts-rest/core';
import { z } from 'zod';
// @ts-ignore  
import type * as s from "zapatos/schema"
const c = initContract();
export const buyerContract = c.router({
  "getSellers": {
    method: "GET",
    path: "/list-of-sellers",
    responses: {
      200: c.type<{ id: string, username: string }[]>()
    },
    summary: "get all the sellers"
  },
  "getSellerCatalog": {
    method:"GET",
    path:"seller-catalog/:sellerId",
    pathParams: z.object({sellerId:z.string()}),
    responses:{
      200: c.type<s.Products.JSONSelectable[]>()
    },
    summary: "get list of products sold by a seller"
  }

}, { pathPrefix: "/api/buyer" });