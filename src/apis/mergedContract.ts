import { initClient, initContract } from '@ts-rest/core';
import { authContract } from './auth/contract';
import { buyerContract } from './buyer/contract';
import { sellerContract } from './seller/contract';
const c = initContract();
export const mergedContract = c.router({
  auth: authContract,
  buyer: buyerContract,
  seller: sellerContract,
});

export const fetchClient = initClient(mergedContract, { baseUrl: 'http://localhost:3000' });
