import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations/dev",
  dialect: "sqlite",
  dbCredentials: {
    url: "./dev.db",
  },
  strict: true,
  verbose: true,
  breakpoints: true,
});
