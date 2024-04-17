import { tryit } from 'radash';
import { badRequest, createResponse, token } from './../../utils';
import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { okResponse, pool } from '../../utils';
import { sellerContract } from './contract';
import { TsRestResponseError } from '@ts-rest/core';

const s = initServer();
export const sellerRouter = s.router(sellerContract, {
  createCatalog: async ({ body, res }) => {
    const { id } = res.locals.token as token;
    const catalogId = kuuid.id();
    let dberr;
    const products = body.map((item) => {
      return { id: kuuid.id(), catalogId, name: item.name, price: item.price };
    });
    await db.serializable(pool, async () => {
      //todo: get seller id from token
      const [err, _] = await tryit(db.insert('Catalog', { id: catalogId, sellerid: id }).run)(pool);
      if (err) {
        dberr = err;
        return;
      }

      await db.insert('Products', products).run(pool);
    });
    //@ts-ignore
    if (dberr?.code === '23505') {
      throw new TsRestResponseError(
        sellerContract.createCatalog,
        badRequest('You already have a catalog.')
      );
    }

    return createResponse({ id: catalogId, products });
  },

  getOrders: async ({ res }) => {
    const { id } = res.locals.token as token;
    //todo: future: can implement pagination as well
    const result = await db
      .select('Orders', { sellerId: id }, { order: { by: 'createdAt', direction: 'DESC' } })
      .run(pool);
    return okResponse(result);
  },
});
