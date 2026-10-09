'use client';

import Link from "next/link";
import { useActionState } from 'react';
import Form from 'next/form';
import { signinAction } from '@/app/actions/signin';
import { SubmitButton } from '@/app/ui/SubmitButton';
import { FormState } from '../actions/schema';

const initialState: FormState = {
  success: false,
  message: '',
};

export default function SignInPage() {
  const [state, formAction] = useActionState(signinAction, initialState);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

      <Form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 w-full p-2 border rounded" />
          {state.errors?.email && <p className="text-sm text-red-600">{state.errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" required className="mt-1 w-full p-2 border rounded" />
          {state.errors?.password && <p className="text-sm text-red-600">{state.errors.password[0]}</p>}
        </div>

        {/* Wrong credentials / database errors land here */}
        {state.message && <p className="text-sm font-medium text-red-600">{state.message}</p>}

        <SubmitButton label="Sign In" pendingLabel="Signing in..." />
      </Form>

      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-600 underline">Sign up</Link>
      </p>
    </div>
  );
}
