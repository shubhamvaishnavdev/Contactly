import { getDrizzleDb } from "@/db/db";
import { contacts } from "@/db/schema";

/**
 * Fetch all contacts from the local database.
 * @returns {Promise<typeof contacts.$inferSelect[]>} - Returns a list of contacts.
 */
export const fetchContactsFromDb = async (): Promise<typeof contacts.$inferSelect[]> => {
  const db = getDrizzleDb();

  try {
    console.log("📥 Fetching contacts from the database...");

    const allContacts = await db.select().from(contacts);

    console.log(`✅ Fetched ${allContacts.length} contacts.`);
    return allContacts;
  } catch (error) {
    console.error("❌ Error fetching contacts from DB:", error);
    return [];
  }
};
