import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations/prod",
  dialect: "sqlite",
  dbCredentials: {
    url: "./prod.db",
  },
  strict: true,
  verbose: false,
  breakpoints: true,
});
