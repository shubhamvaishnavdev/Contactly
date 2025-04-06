import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import migrations from "../drizzle/migrations";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const useInitializeDb = () => {
  const [ready, setReady] = useState(false);

  if (!dbInstance) {
    const expoDb = SQLite.openDatabaseSync("contactly.db");
    dbInstance = drizzle(expoDb);
  }
const migrate = useMigrations(dbInstance!, migrations);
  useEffect(() => {
    const init = async () => {

      try {
        const expoDb = SQLite.openDatabaseSync("contactly.db");
        await expoDb.execAsync("PRAGMA foreign_keys = ON;");

        const alreadyMigrated = await AsyncStorage.getItem("@db_migrated_v1");

        if (!alreadyMigrated) {
          const { success, error } = migrate 

          if (error) {
            console.error("Migration Error:", error);
          } else if (success) {
            console.log("Migrations ran successfully");
            await AsyncStorage.setItem("@db_migrated_v1", "true");
          }
        } else {
          console.log("Migrations already applied. Skipping...");
        }

        setReady(true);
      } catch (err) {
        console.error("DB Setup Error:", err);
      }
    };

    init();
  }, []);

  return { db: dbInstance, ready };
};
