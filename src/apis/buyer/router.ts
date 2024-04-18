import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { badRequest, createResponse, okResponse, pool, stringToBoolean, token } from '../../utils';
import { buyerContract } from './contract';
// @ts-ignore
import type * as s from 'zapatos/schema';
// @ts-ignore
import { conditions as dc } from 'zapatos/db';

import { unique } from 'radash';
import { isEmpty } from 'remeda';

const s = initServer();
export const buyerRouter = s.router(buyerContract, {
  getSellers: async ({ query: { withCatalog } }) => {
    let query;
    if (stringToBoolean(withCatalog)) {
      query = db.sql<
        s.User.SQL | s.Catalog.SQL,
        s.User.Selectable[]
      >`select ${'User'}.${'id'}, ${'User'}.${'username'} from ${'Catalog'} left join ${'User'} on ${'Catalog'}.${'sellerid'} = ${'User'}.${'id'} `;
    } else {
      query = db.select('User', { type: 'SELLER' }, { columns: ['id', 'username'] });
    }
    const sellers = await query.run(pool);

    // rename username key to seller
    const result = sellers.map((item) => {
      return {
        id: item.id,
        seller: item.username,
      };
    });
    return okResponse(result);
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
    if (isEmpty(itemsToBuy)) {
      return badRequest('Empty order');
    }
    if (unique(itemsToBuy, (i) => i.id).length !== itemsToBuy.length) {
      return badRequest("Don't repeat items, add in quantity");
    }
    const query = db.sql<
      s.Products.SQL | s.Catalog.SQL,
      s.Products.Selectable[]
    >`select ${'Products'}.* from ${'Products'}  where ${{ id: dc.isIn(itemsToBuy.map((i) => i.id)) }} and ${'catalogId'} = (select ${'catalogId'} from ${'Catalog'} where ${{ sellerid: sellerId }} limit 1)`;

    const availableItems = await query.run(pool);
    if (availableItems.length !== itemsToBuy.length) {
      return badRequest('Some items you are trying to buy are not in seller catalog.');
    }
    let billAmount = 0;
    const orderItems = itemsToBuy.map((item) => {
      const { name, price } = availableItems.find((ai) => ai.id === item.id);
      billAmount += item.qty * price;
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
    return createResponse({ orderId, orderItems, billAmount }, 'order placed successfully');
  },
});
