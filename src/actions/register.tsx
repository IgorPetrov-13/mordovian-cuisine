'use server';

import { IFormData } from '@/types/form-data';
import prisma from '@/utils/prisma';

export async function registerUser(params: IFormData) {
  const { email, password, confirmPassword } = params;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    console.log('Registration error:', error);
  }
}
