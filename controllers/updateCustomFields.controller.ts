import { getDrizzleDb } from "@/db/db";
import { customFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function updateCustomContactDetails(data: {
  id: number;
  contactId: string;
  fieldName: string;
  fieldType: string;
  fieldValue: string;
  fieldObject: any;
}) {
  const db = getDrizzleDb();
  try {
    const result = await db
      .update(customFields)
      .set({
        fieldName: data.fieldName,
        fieldType: data.fieldType,
        fieldValue: data.fieldValue,
        fieldObject: data.fieldObject,
      })
      .where(
        and(
          eq(customFields.id, data.id),
          eq(customFields.contactId, data.contactId)
        )
      );

    return console.log("Custom fields updated successfully!");
  } catch (error) {
    console.error("Failed to update custom contact Fields:", error);
    throw error;
  }
}
