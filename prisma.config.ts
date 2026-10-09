import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env files, so load it here explicitly.
try {
  process.loadEnvFile(".env");
} catch {
  // .env is optional: CI supplies these from the environment instead.
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  // Only needed by CLI commands that talk to the database (db push, migrate).
  // `prisma generate` works without it, so a fresh clone can install first
  // and fill in .env afterwards.
  datasource: process.env.DIRECT_URL
    ? {
        // Direct/session connection (port 5432): Supabase's transaction
        // pooler cannot run schema changes.
        url: process.env.DIRECT_URL,
      }
    : undefined,
});
