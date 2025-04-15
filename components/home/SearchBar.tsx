import { TextInput, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Feather from "@expo/vector-icons/Feather";

const SearchBar = () => {
  const colorScheme = useColorScheme();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View className="mx-2 p-1 border border-text dark:border-dark-text rounded-full flex-row items-center justify-around">
      <Ionicons
        name="search-sharp"
        size={24}
        color={Colors[colorScheme ?? "light"].text}
      />
      <TextInput
        placeholder="Search..."
        className="h-auto w-[75%] text-text dark:text-dark-text placeholder:text-placeholderText dark:placeholder:text-dark-placeholderText"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
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
