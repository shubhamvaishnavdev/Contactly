import { getDrizzleDb } from "@/db/db";
import { contacts, customFields } from "@/db/schema";
import { Contact } from "@/types/contact.types";
import { eq, like, or } from "drizzle-orm";

export const searchContacts = async (query: string): Promise<Contact[]> => {
  const db = getDrizzleDb();

  try {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return [];

    const results = await db
      .select({
        id: contacts.id,
        name: contacts.name,
        phone: contacts.phone,
        profilePicture: contacts.profilePicture,
      })
      .from(contacts)
      .leftJoin(customFields, eq(contacts.id, customFields.contactId))
      .where(
        or(
          like(contacts.name, `%${trimmedQuery}%`),
          like(customFields.fieldValue, `%${trimmedQuery}%`),
          like(customFields.fieldName, `%${trimmedQuery}%`)
        )
      );

    // Filter unique contacts by ID
    const uniqueContacts: Record<string, Contact> = {};
    results.forEach((row) => {
      if (!uniqueContacts[row.id]) {
        uniqueContacts[row.id] = row;
      }
    });

    return Object.values(uniqueContacts);
  } catch (error) {
    console.error("❌ Error searching contacts:", error);
    return [];
  }
};
