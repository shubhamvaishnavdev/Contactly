import { getDrizzleDb } from "@/db/db";
import { customFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";

interface NewCustomField {
  fieldName: string;
  fieldType: string;
  fieldValue?: string; // optional because in schema fieldValue is optional
  fieldObject?: string; // in case you later need to handle objects
}

export async function saveCustomFieldsForContact(
  contactId: string,
  fields: NewCustomField
) {
  const db = getDrizzleDb();
  try {
    const dataToInsert = {
      contactId,
      fieldName: fields.fieldName,
      fieldType: fields.fieldType,
      fieldValue: fields.fieldValue || null,
      fieldObject: fields.fieldObject || null,
    };

    await db.insert(customFields).values(dataToInsert);

    console.log("Custom fields saved successfully!");
  } catch (error) {
    console.error("Error saving custom fields:", error);
    throw error;
  }
}


