import Link from 'next/link';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  // Reading cookies() opts this route into dynamic rendering, so Next won't
  // try to hit the database at build time.
  const userId = (await cookies()).get('userId')?.value;

  const [users, currentUser] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    userId
      ? prisma.user.findUnique({ where: { id: userId }, select: { name: true } })
      : null,
  ]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        {currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to the dashboard.'}
      </p>

      <h2 className="mt-8 font-semibold text-gray-800">
        Users in the database ({users.length})
      </h2>

      <ul className="mt-4 divide-y rounded border">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between gap-4 p-3 text-sm">
            <span className="font-medium text-gray-800">{user.name}</span>
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}

        {users.length === 0 && (
          <li className="p-3 text-sm text-gray-500">
            No users yet.{' '}
            <Link href="/signup" className="text-blue-600 underline">Create one</Link>.
          </li>
        )}
      </ul>

      <Link href="/" className="mt-6 inline-block text-sm text-blue-600 underline">
        Back home
      </Link>
    </div>
  );
}
