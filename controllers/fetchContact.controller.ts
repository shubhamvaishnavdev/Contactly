import { getDrizzleDb } from "@/db/db";
import { contacts, customFields } from "@/db/schema";
import { Contact, CustomContactDetails } from "@/types/contact.types";
import { eq } from "drizzle-orm";

/**
 * Fetch all contacts from the local database.
 * @returns {Promise<typeof contacts.$inferSelect[]>} - Returns a list of contacts.
 */
export const fetchContactsFromDb = async (): Promise<
  (typeof contacts.$inferSelect)[]
> => {
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

export const fetchContactFromDb = async (
  contactId: string
): Promise<{
  contact: Contact;
  customDetails: CustomContactDetails[];
} | null> => {
  const db = getDrizzleDb();

  try {
    console.log("📥 Fetching contacts from the database...");

    const contact = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId))
      .then((rows) => rows[0]);

    if (!contact) return null;

    const customDetails = (await db
      .select()
      .from(customFields)
      .where(eq(customFields.contactId, contactId))) as CustomContactDetails[];

    return {
      contact,
      customDetails,
    };
  } catch (error) {
    console.error("❌ Error fetching contact from DB:", error);
    return null; // changed from [] to null
  }
};
