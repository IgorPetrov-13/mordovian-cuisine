import NextAuth from 'next-auth';
import { ZodError } from 'zod';
import Credentials from 'next-auth/providers/credentials';

// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from '@/utils/password';
import { getUserFromDb } from '@/utils/db';
import { signInSchema } from '@/schema/zod';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/utils/prisma';

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash);

          if (!user) {
            throw new Error('Invalid credentials.');
          }

          // return JSON object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
