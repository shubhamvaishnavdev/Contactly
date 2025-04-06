// drizzle/db.ts
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDrizzleDb = () => {
  if (dbInstance) return dbInstance;

  const expoDb = SQLite.openDatabaseSync("contactly.db");
  dbInstance = drizzle(expoDb);

  return dbInstance;
};
