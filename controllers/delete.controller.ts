import { getDrizzleDb } from "@/db/db";
import { customFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const deleteCustomFieldFromDb = async ({
  customFieldId, //id of custom field
  contactId, //id which is used to link custom field with contact
}: {
  customFieldId: number;
  contactId: string;
}): Promise<boolean> => {
  const db = getDrizzleDb();

  try {
    console.log("🗑️ Deleting custom field from database...");

    const deleted = await db
      .delete(customFields)
      .where(
        and(
          eq(customFields.id, customFieldId),
          eq(customFields.contactId, String(contactId))
        )
      );

    console.log("✅ Custom field deleted successfully!");
    return true;
  } catch (error) {
    console.error("❌ Error deleting custom field from DB:", error);
    return false;
  }
};
