import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const userTypeSchema = z.enum(['BUYER', 'SELLER']);
export type userType = z.infer<typeof userTypeSchema>;
export const authContract = c.router(
  {
    register: {
      method: 'POST',
      path: '/register',
      // Todo: add password
      body: z.object({ username: z.string().max(32), type: userTypeSchema }),
      responses: {
        201: c.type<{ id: string }>(),
      },
      summary: 'A new user can register with this',
    },
  },
  { pathPrefix: '/api/auth' }
);
