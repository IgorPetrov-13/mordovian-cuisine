'use server';

import { IFormData } from '@/types/form-data';
import { saltAndHashPassword } from '@/utils/password';
import prisma from '@/utils/prisma';

export async function registerUser(params: IFormData) {
  const { email, password, confirmPassword } = params;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.log('Registration error:', error);
  }
}
