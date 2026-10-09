'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { SigninSchema, FormState } from './schema';

export async function signinAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SigninSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Missing or invalid fields.',
    };
  }

  const { email, password } = validatedFields.data;

  let user = null;

  try {
    user = await prisma.customer.findUnique({ where: { email } });
  } catch (error) {
    console.error('Signin failed:', error);
    return { success: false, message: 'Database error: could not sign you in.' };
  }

  const passwordMatches = user
    ? await bcrypt.compare(password, user.password)
    : // Compare against a dummy hash so a missing user and a wrong password
      // take the same amount of time.
      await bcrypt.compare(password, '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv');

  if (!user || !passwordMatches) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('userId', user.id, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  // redirect() throws, so it must stay outside the try/catch.
  redirect('/dashboard');
}
