import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="max-w-md mx-auto mt-10 p-6">
        <div>Welcome to the best app to make money</div>

        <nav className="mt-6 flex gap-4 text-sm">
          <Link href="/signup" className="text-blue-600 underline">Sign up</Link>
          <Link href="/signin" className="text-blue-600 underline">Sign in</Link>
          <Link href="/dashboard" className="text-blue-600 underline">Dashboard</Link>
        </nav>
      </main>
    </>
  );
}
