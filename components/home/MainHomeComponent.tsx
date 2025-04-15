import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import ContactCard from "./contactCard";
import { Contact } from "@/types/contact.types";
import SearchBar from "./SearchBar";
import FilterComponent from "./FilterComponent";

const MainHomeComponent = ({ contactList }: { contactList: Contact[] }) => {
  const renderItem = ({ item }: { item: Contact }) => (
    <ContactCard contact={item} />
  );
  return (
    <View className=" h-full w-full">
      <SearchBar />
      <View className="flex-row justify-between items-center px-2 mt-4">
        <Text className="text-text dark:text-dark-text ">
          {contactList.length || 0}
        </Text>
        <FilterComponent />
      </View>
      <FlashList
        data={contactList.length > 0 ? contactList : []}
        renderItem={renderItem}
        estimatedItemSize={500} // Must be close to real item height
      />
    </View>
  );
};

export default MainHomeComponent;
