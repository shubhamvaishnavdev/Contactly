import { create } from "zustand";
import { Contact, CustomContactDetails } from "@/types/contact.types";
import { fetchContactFromDb } from "@/controllers/fetchContact.controller";

type ContactDetailsStore = {
  basicDetails: Contact | null;
  customDetails: CustomContactDetails[];
  isLoading: boolean;
  loadContactDetails: (contactId: string) => Promise<void>;
  resetContactDetails: () => void;
};

export const useContactDetailsStore = create<ContactDetailsStore>((set) => ({
  basicDetails: null,
  customDetails: [],
  isLoading: false,

  loadContactDetails: async (contactId:string) => {
    set({ isLoading: true });
    try {
      const response = await fetchContactFromDb((contactId));
      if (response) {
        set({
          basicDetails: response.contact,
          customDetails: response.customDetails,
        });
      }
    } catch (error) {
      console.error("❌ Failed to load contact details:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  resetContactDetails: () => {
    set({
      basicDetails: null,
      customDetails: [],
    });
  },
}));
