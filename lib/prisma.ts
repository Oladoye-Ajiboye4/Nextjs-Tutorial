import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env and fill in your Supabase connection string.'
    )
  }
  

  // Prisma 7 talks to Postgres through a driver adapter.
  // DATABASE_URL points at Supabase's transaction pooler (port 6543).
  return new PrismaClient({ adapter: new PrismaPg(connectionString) })
}

// Dev hot-reload creates a new module on every edit; without this the app
// would open a fresh connection pool each time and exhaust the database.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
