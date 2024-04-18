import { tryit } from 'radash';
import { initServer } from '@ts-rest/express';
import { authContract } from './contract';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { badRequest, createResponse, env, okResponse, pool } from '../../utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const s = initServer();
export const authRouter = s.router(authContract, {
  register: async ({ body: { username, type, password } }) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const id = kuuid.id();
    const [err, data] = await tryit(db.insert('User', { id, type, username, hash }).run)(pool);
    //@ts-ignore
    if (err?.code === '23505') {
      return badRequest('username already exists');
    }
    return createResponse({ userId: id }, 'User Registered Successfully');
  },
  login: async ({ body: { username, password } }) => {
    const user = await db.selectOne('User', { username }).run(pool);
    if (!user || !bcrypt.compareSync(password, user.hash)) {
      return badRequest('username or password is incorrect');
    }
    const token = jwt.sign({ username, id: user.id, type: user.type }, env.JWTSECRET, {
      expiresIn: '1h',
    });
    return okResponse({ token, userId: user.id }, 'Successfully authenticated');
  },
});
