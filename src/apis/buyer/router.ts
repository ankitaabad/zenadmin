import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { okResponse, pool } from '../../utils';
import { buyerContract } from './contract';
// @ts-ignore
import type * as s from 'zapatos/schema';
import { tryit } from 'radash';

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
    const [err, products] = await tryit(
      db.sql<
        sql,
        s.Products.Selectable[]
      >` select ${'Products'}.* from  ${'Products'} where ${'catalogId'}= select ${'catalogId'} from ${'Catalog'} where ${'Catalog'}.${'sellerid'} = ${db.vals(sellerId)} limit 1`
        .run
    )(pool);
    return okResponse(products);
  },
});
