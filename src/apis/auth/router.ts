import { initServer } from '@ts-rest/express';
import { authContract } from './contract';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { pool } from '../../utils';

const s = initServer();
export const authRouter = s.router(authContract, {
  register: async ({ body: { username, type } }) => {
    console.log('inside register');
    console.log({ username, type });
    const id = kuuid.id();
    await db.insert('User', { id, type, username }).run(pool);
    return {
      status: 201,
      body: {
        id,
      },
    };
  },
});
