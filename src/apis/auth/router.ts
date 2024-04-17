import { initServer } from '@ts-rest/express';
import { authContract } from './contract';
import * as db from 'zapatos/db';
import kuuid from 'kuuid';
import { badRequest, createResponse, env, okResponse, pool } from '../../utils';
import bcrypt from 'bcryptjs';
import { isEmpty } from 'remeda';
import { TsRestResponseError } from '@ts-rest/core';
import jwt from 'jsonwebtoken';
const s = initServer();
export const authRouter = s.router(authContract, {
  register: async ({ body: { username, type, password } }) => {
    console.log('inside register');
    console.log({ username, password, type });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const id = kuuid.id();
    await db.insert('User', { id, type, username, hash }).run(pool);
    return createResponse({ id });
  },
  login: async ({ body: { username, password } }) => {
    const user = await db.selectOne('User', { username }).run(pool);
    if (!user) {
      throw new TsRestResponseError(authContract.login, badRequest('user not found'));
    }
    if (!bcrypt.compareSync(password, user.hash)) {
      throw new TsRestResponseError(
        authContract.login,
        badRequest('username or password is incorrect')
      );
    }
    const token = jwt.sign({ username, id: user.id, type: user.type }, env.JWTSECRET, {
      expiresIn: '1h',
    });
    return okResponse({ token });
  },
});
