import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import * as schema from "./schema";

class DatabaseClient {
  private static instance: DatabaseClient;
  private db: DatabaseType;

  private constructor() {
    const dbPath = this.getDatabasePath();
    this.db = new Database(dbPath);
  }

  private getDatabasePath(): string {
    return (
      process.env.DATABASE_URL ||
      (process.env.NODE_ENV === "production"
        ? process.env.PROD_DB_PATH || "./prod.db"
        : process.env.DEV_DB_PATH || "./dev.db")
    );
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  public getDb() {
    return drizzle(this.db, { schema });
  }
}

export const db = DatabaseClient.getInstance().getDb();
