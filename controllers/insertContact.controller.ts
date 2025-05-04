import { getDrizzleDb } from "@/db/db";
import { contacts } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

type SimplifiedContact = {
  id: string;
  name: string;
  phone: string;
};

export const saveContactsToDb = async (contactList: SimplifiedContact[]) => {
  const db = getDrizzleDb();
  try {
    console.log("🔄 Starting contact sync to DB...");
    console.log(`📦 Total contacts to process: ${contactList.length}`);

    if (contactList.length === 0) {
      console.log("⚠️ No contacts provided. Skipping DB sync.");
      return;
    }

    // Step 1: Get all IDs from the list
    const contactIds = contactList.map((c) => c.id);

    // Step 2: Fetch existing contacts from DB
    const existingContacts = await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(inArray(contacts.id, contactIds));

    const existingIds = new Set(existingContacts.map((c) => c.id));

    // Step 3: Separate contacts to insert and update
    const toInsert = contactList.filter((c) => !existingIds.has(c.id));
    const toUpdate = contactList.filter((c) => existingIds.has(c.id));

    // Step 4: Insert new contacts
    if (toInsert.length > 0) {
      await db.insert(contacts).values(toInsert);
    }

    // Step 5: Update existing contacts
    for (const contact of toUpdate) {
      await db
        .update(contacts)
        .set({ name: contact.name, phone: contact.phone })
        .where(eq(contacts.id, contact.id));
    }

    if (toUpdate.length > 0) {
      console.log("🔁 Updated existing contacts.");
    }

    console.log("🎉 Contacts successfully synced to DB!");
  } catch (error) {
    console.error("❌ Error syncing contacts to DB:", error);
  }
};

export const saveContactProfileImage = async ({
  contactId,
  imagePath,
}: {
  contactId: string;
  imagePath: string;
}) => {
  const db = getDrizzleDb();

  try {
    // Check if contact exists
    const existing = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId));

    if (existing.length > 0) {
      // Update the existing contact's profilePicture
      await db
        .update(contacts)
        .set({ profilePicture: imagePath })
        .where(eq(contacts.id, contactId));

      console.log("✅ Profile image updated in contacts");
    } else {
      console.warn("⚠️ Contact not found, cannot update image");
    }
  } catch (error) {
    console.error("❌ Error saving profile image to DB:", error);
  }
};
