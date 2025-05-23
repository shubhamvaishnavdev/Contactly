import { create } from "zustand";

// Store state and actions
type ContactStore = {
  searchTerm: string;
  setSearchTerm: (query: string) => void;
};

export const useSearchContactStore = create<ContactStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (query) => set({ searchTerm: query }),
}));
