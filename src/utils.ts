import { userType } from './apis/auth/contract';
import 'dotenv/config';
import { RequestHandler } from 'express';
import Pool from 'pg-pool';
import { partial, tryit } from 'radash';
import jwt from 'jsonwebtoken';
export const env = process.env as {
  DATABASE_URL: string;
  PORT: string;
  JWTSECRET: string;
};
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export function okResponse<T>(data: T, message: string = 'SUCCESS') {
  return {
    status: 200 as 200,
    body: { message, data },
  };
}

export function createResponse<T>(data: T, message: string = 'SUCCESS') {
  return {
    status: 201 as 201,
    body: { message, data },
  };
}
export function badRequest(message: string) {
  return {
    status: 400 as 400,
    body: { message },
  };
}
export function unauthorized() {
  return {
    status: 401 as 401,
    body: { message: 'Unauthorized access' },
  };
}
export type token = { username: string; id: string; type: userType };
export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(400).json({ message: 'Please provide the token' });

  const [err, data] = await tryit(jwt.verify)(token, env.JWTSECRET);
  if (err) {
    return res.status(401).json({ message: 'invalid token' });
  }
  res.locals.token = data;
  next();
};

const restrictUserType = (shouldBeUserType: userType) => {
  const fn: RequestHandler = async (req, res, next) => {
    const { type } = res.locals.token as token;
    if (type !== shouldBeUserType) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    next();
  };
  return fn;
};
export const stringToBoolean = (str: string) => {
  return str?.toLowerCase() === 'true';
};
export const buyerOnlyMiddleware = partial(restrictUserType, 'BUYER')();
export const sellerOnlyMiddleware = partial(restrictUserType, 'SELLER')();
