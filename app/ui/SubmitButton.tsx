'use client';


import { useFormStatus } from 'react-dom';

export function SubmitButton({
  label = 'Submit',
  pendingLabel = 'Please wait...',
}: {
  label?: string;
  pendingLabel?: string;
}) {
  // 'pending' becomes true automatically when the Server Action is running
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
