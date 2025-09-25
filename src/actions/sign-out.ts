import { signOut } from '@/auth/auth';

export async function signOutFunc() {
  try {
    const result = await signOut();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
