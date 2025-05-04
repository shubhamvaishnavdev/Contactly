export interface Contact {
  id: string;
  name: string;
  phone: string;
  profilePicture: string | null;
}

export type FieldType = "text" | "number" | "date" | "image" | "map" | "link";

export interface CustomContactDetails {
  id: number;
  contactId: string;
  fieldName: string;
  fieldType: FieldType;
  fieldValue?: string | null; // for text, number, date, lat, lng, image URL
  fieldObject?: string | null; // can be used for complex objects (stored as JSON string)
}

export interface FullContact {
  contact: Contact;
  customFields: CustomContactDetails[];
}

export interface EditContactData {
  id: string;
  fieldName: string;
  fieldType: string;
  fieldValue: string;
}
