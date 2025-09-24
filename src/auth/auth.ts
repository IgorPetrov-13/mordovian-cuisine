import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

// Your own logic for dealing with plaintext password strings; be careful!
import { signInSchema } from '@/schema/zod';

import prisma from '@/utils/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { getUserFromDb } from '@/utils/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required.');
          }

          const { email, password } = await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          //const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
          }

          // return JSON object with the user data
          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
