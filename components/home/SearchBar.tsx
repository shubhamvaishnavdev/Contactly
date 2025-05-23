import { TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Feather from "@expo/vector-icons/Feather";
import { searchContacts } from "@/controllers/search.controller";
import { useContactListStore } from "@/store/useContactListStore";

const SearchBar = () => {
  const colorScheme = useColorScheme();
  const { setContactList, loadContactList } = useContactListStore();
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm.trim().length >= 3) {
      debounceTimeout.current = setTimeout(() => {
        handleSearch(searchTerm.trim());
      }, 400);
    } else {
      loadContactList();
    }

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchContacts(query);
      setContactList(results);
    } catch (error) {
      console.error("❌ Error during search:", error);
    }
  };

  return (
    <View className="mx-2 p-1 border border-text dark:border-dark-text rounded-full flex-row items-center justify-around">
      <Ionicons
        name="search-sharp"
        size={24}
        color={Colors[colorScheme ?? "light"].text}
      />
      <TextInput
        placeholder="Search..."
        className="h-auto w-[75%] text-text dark:text-dark-text"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        placeholderTextColor={Colors[colorScheme ?? "light"].placeholderText}
      />
      <Feather
        name="mic"
        size={24}
        color={Colors[colorScheme ?? "light"].text}
      />
    </View>
  );
};

export default SearchBar;
