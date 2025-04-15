import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Contact } from "@/types/contact.types";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const ContactCard = ({ contact }: { contact: Contact }) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      key={contact?.id}
      className="flex flex-row items-center rounded-full p-2"
      onPress={()=>router.push(`/(contact)/view/${contact?.id}`)}
    >
      <View className="flex-row gap-4">
        <View className="bg-icon dark:bg-icon h-14 w-14 rounded-full flex justify-center items-center">
          <Feather name="user" size={24} color="black" />
        </View>
        <View className="justify-around">
          <Text className="text-text dark:text-dark-secondaryText text-lg font-bold">
            {contact.name.length > 15
              ? `${contact.name.slice(0, 15)} ...`
              : contact.name}
          </Text>
          <Text className="text-text dark:text-dark-secondaryText">
            {contact.phone}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
