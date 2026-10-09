'use client';

import Link from "next/link";
import { useActionState } from 'react';
import Form from 'next/form'; // The new Next.js 16 Form component
import { signupAction } from '@/app/actions/signup';
import { SubmitButton } from '@/app/ui/SubmitButton';
import { FormState } from '../actions/schema';


const initialState: FormState = {
  success: false,
  message: '',
};


export default function SignupForm() {
  // Hooks the Server Action (signupAction) to our component's state
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>

      {/*
        Notice we pass 'formAction' to the 'action' attribute.
        The Next.js <Form> automatically handles progressive enhancement!
      */}
      <Form action={formAction} className="space-y-4">

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" name="username" required minLength={2} className="mt-1 w-full p-2 border rounded" />
          {/* Display Zod Errors */}
          {state.errors?.username && <p className="text-sm text-red-600">{state.errors.username[0]}</p>}
        </div>


        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 w-full p-2 border rounded" />
          {state.errors?.email && <p className="text-sm text-red-600">{state.errors.email[0]}</p>}
        </div>


        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" required minLength={8} className="mt-1 w-full p-2 border rounded" />
          {state.errors?.password && <p className="text-sm text-red-600">{state.errors.password[0]}</p>}
        </div>


        {/* Feedback Message (Success or Database Error) */}
        {state.message && (
          <p className={`text-sm font-medium ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}


        {/* Loading-aware button */}
        <SubmitButton label="Sign Up" pendingLabel="Registering..." />
      </Form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-600 underline">Sign in</Link>
      </p>
    </div>
  );
}
