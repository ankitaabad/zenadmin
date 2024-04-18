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
      // Todo: add password validation
      body: z.object({
        username: z.string().min(5).max(32),
        password: z.string().min(5),
        type: userTypeSchema,
      }),
      responses: {
        201: c.type<{ message: string; data: { userId: string } }>(),
      },
      summary: 'A new user can register with this api.',
    },
    login: {
      method: 'POST',
      path: '/login',
      body: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: c.type<{ message: string; data: { token: string; userId: string } }>(),
      },
      summary: 'Login to the app',
    },
  },
  { pathPrefix: '/api/auth', commonResponses: { 400: c.type<{ message: string }>() } }
);
