// drizzle/schema.ts
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Contacts Table
export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  profilePicture: text("profile_picture"),
});

// Custom Fields Table
export const customFields = sqliteTable("custom_fields", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contactId: text("contact_id").notNull(), // FK to contacts
  fieldName: text("field_name").notNull(),
  fieldType: text("field_type").notNull(),
  fieldValue: text("field_value"), // used for text, number, date
  fieldObject: text("field_object"),
});

// Optional: Relations (if using drizzle-relations)
export const customFieldsRelations = relations(customFields, ({ one }) => ({
  contact: one(contacts, {
    fields: [customFields.contactId],
    references: [contacts.id],
  }),
}));
