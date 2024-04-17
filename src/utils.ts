import 'dotenv/config';
import Pool from 'pg-pool';
import { partial } from 'radash';

export const env = process.env as {
  DATABASE_URL: string;
  PORT: string;
};
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
export const fixedSellerId = '001rwka70n0OQI4SUEzm0bfD9v1JmxIu';
export const fixedBuyerId = '001rwka70n0OQI4SUEzm0bfD9v1JmxIu';
export const fixedSellerProducts = {sellerId:"001rwka70n0OQI4SUEzm0bfD9v1JmxIu",products:["001rwkaL2MJAJs1OUud72HMLPW2qmxo8","001rwkaL2cKcY942agiF2Kxezs18IBzr"]}
//todo: get status type from ts-rest
type status = 200 | 201 | 400;
//todo: why partial is not giving correct types
// function buildResponse <T>(status:status,body:T){
//   return {status,body}

// }
export function okResponse<T>(body: T) {
  return {
    status: 200 as status,
    body,
  };
}

export function createResponse<T>(body: T) {
  return {
    status: 201 as status,
    body,
  };
}
export function badRequest<T>(body: T) {
  return {
    status: 400 as status,
    body,
  };
}
