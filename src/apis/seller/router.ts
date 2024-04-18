import { tryit } from 'radash';
import { badRequest, createResponse, token } from './../../utils';
import { initServer } from '@ts-rest/express';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { okResponse, pool } from '../../utils';
import { sellerContract } from './contract';
import { isEmpty } from 'remeda';

const s = initServer();
export const sellerRouter = s.router(sellerContract, {
  createCatalog: async ({ body, res }) => {
    if (isEmpty(body)) {
      return badRequest('Please provide the products to create a catalog.');
    }
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
      return badRequest(
        'You already have a catalog. As of now we dont have apis to update or replace the catalog.'
      );
    }

    return createResponse({ catalogId, products }, 'Catalog created successfully');
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
