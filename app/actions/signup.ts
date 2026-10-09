'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { SignupSchema, FormState } from './schema';

export async function signupAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
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

  const { username, email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.customer.findUnique({ where: { email } });

    if (existingUser) {
      
      return {
        success: false,
        errors: { email: ['That email is already registered.'] },
      };
    }

    await prisma.customer.create({
      data: {
        name: username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
  } catch (error) {
    console.error('Signup failed:', error);
    return {
      success: false,
      message: 'Database error: failed to register user.',
    };
  }

  // redirect() throws, so it must stay outside the try/catch.
  redirect('/signin');
}
