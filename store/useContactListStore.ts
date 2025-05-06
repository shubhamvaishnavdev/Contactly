import { create } from "zustand";
import { fetchContactsFromDb } from "@/controllers/fetchContact.controller";
import { Contact } from "@/types/contact.types";

// Define the Contact type (customize it to match your schema)

// Store state and actions
type ContactStore = {
  contactList: Contact[];
  isContactListLoading: boolean;
  loadContactList: () => Promise<void>;
  setContactList: (contacts: Contact[]) => void;
};

export const useContactListStore = create<ContactStore>((set) => ({
  contactList: [],
  isContactListLoading: false,

  setContactList: (contacts) => set({ contactList: contacts }),

//   Fetch contacts from db
  loadContactList: async () => {
    set({ isContactListLoading: true });
    try {
      const fetchedContacts = await fetchContactsFromDb();
      set({ contactList: fetchedContacts });
    } catch (error) {
      console.error("❌ Failed to fetch contacts:", error);
    } finally {
      set({ isContactListLoading: false });
    }
  },
}));
