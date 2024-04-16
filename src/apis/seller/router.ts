import { tryit } from 'radash';
import { badRequest, fixedSellerId } from './../../utils';
import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { createResponse, okResponse, pool } from '../../utils';
import { sellerContract } from './contract';
import { isEmpty } from 'remeda';
import { TsRestResponseError } from '@ts-rest/core';

const s = initServer();
export const sellerRouter = s.router(sellerContract, {
  createCatalog: async ({ body }) => {
    const catalogId = kuuid.id();
    console.log('inside create catalog');
    let dberr;
    await db.serializable(pool, async () => {
      //todo: get seller id from token
      const [err, _] = await tryit(
        db.insert('Catalog', { id: catalogId, sellerid: fixedSellerId }).run
      )(pool);
      if (err) {
        dberr = err;
        return;
      }
      await db
        .insert(
          'Products',
          body.map((item) => {
            return { id: kuuid.id(), catalogId, name: item.name, price: item.price };
          })
        )
        .run(pool);
    });
    //@ts-ignore
    if (dberr.code === '23505') {
      throw new TsRestResponseError(sellerContract.createCatalog, {
        status: 400,
        body: { message: 'You already have a catalog.' },
      });
    }
    return { status: 201, body: { id: catalogId } };
  },
  getOrders: async () => {
    // todo:  get seller id from token
    //todo: future: can implement pagination as well
    const result = await db
      .select(
        'Orders',
        { sellerId: fixedSellerId },
        { order: { by: 'createdAt', direction: 'DESC' } }
      )
      .run(pool);
    return okResponse(result);
  },
});
