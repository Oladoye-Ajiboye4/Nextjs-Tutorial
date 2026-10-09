import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: 'Ada Lovelace' },
  { id: 2, name: 'Alan Turing' },
];

// GET /api/users
export async function GET() {
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();
  
  const newUser = {
    id: users.length + 1,
    name: body.name,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
