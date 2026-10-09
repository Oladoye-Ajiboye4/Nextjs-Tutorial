import { z } from 'zod';

export const SignupSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters.'),
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const SigninSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

// The keys here must match the field names in the Zod schemas above,
// because `z.flattenError(...).fieldErrors` is keyed by them.
export type FormState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};
