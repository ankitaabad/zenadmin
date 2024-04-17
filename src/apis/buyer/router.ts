import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { badRequest, createResponse, okResponse, pool, token } from '../../utils';
import { buyerContract } from './contract';
// @ts-ignore
import type * as s from 'zapatos/schema';
// @ts-ignore
import { conditions as dc } from 'zapatos/db';

import { unique } from 'radash';
import { TsRestResponseError } from '@ts-rest/core';

const s = initServer();
export const buyerRouter = s.router(buyerContract, {
  getSellers: async () => {
    const sellers = await db
      .select('User', { type: 'SELLER' }, { columns: ['id', 'username'] })
      .run(pool);
    return okResponse(sellers);
  },
  getSellerCatalog: async ({ params: { sellerId } }) => {
    type sql = s.Products.SQL | s.Catalog.SQL;
    const query = db.sql<
      sql,
      s.Products.Selectable[]
    >` select ${'Products'}.* from  ${'Products'} where ${'catalogId'}= (select ${'id'} from ${'Catalog'} where ${{ sellerid: sellerId }} limit 1)`;
    // const { text, values } = query.compile();
    // console.log({ text, values });
    const products = await query.run(pool);
    return okResponse(products);
  },
  createOrder: async ({ params: { sellerId }, body: itemsToBuy, res }) => {
    const { id } = res.locals.token as token;
    const orderId = kuuid.id();

    if (unique(itemsToBuy, (i) => i.id).length !== itemsToBuy.length) {
      throw new TsRestResponseError(buyerContract.createOrder, {
        status: 400,
        body: { message: "don't repeat items, add in quantity" },
      });
    }
    const query = db.sql<
      s.Products.SQL | s.Catalog.SQL,
      s.Products.Selectable[]
    >`select ${'Products'}.* from ${'Products'}  where ${{ id: dc.isIn(itemsToBuy.map((i) => i.id)) }} and ${'catalogId'} = (select ${'catalogId'} from ${'Catalog'} where ${{ sellerid: sellerId }} limit 1)`;

    const availableItems = await query.run(pool);
    if (availableItems.length !== itemsToBuy.length) {
      throw new TsRestResponseError(
        buyerContract.createOrder,
        badRequest('some items are not in the catalog')
      );
    }
    const orderItems = itemsToBuy.map((item) => {
      const { name, price } = availableItems.find((ai) => ai.id === item.id);
      return { ...item, name, price };
    });
    await db
      .insert('Orders', {
        sellerId: sellerId,
        buyerId: id,
        createdAt: new Date(),
        id: orderId,
        orderItems: JSON.stringify(orderItems),
      })
      .run(pool);
    return createResponse({ id: orderId });
  },
});
