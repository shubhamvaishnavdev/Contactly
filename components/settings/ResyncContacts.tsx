import { Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useContactListStore } from "@/store/useContactListStore";
import { getDeviceContacts } from "@/util/contacts";
import { saveContactsToDb } from "@/controllers/insertContact.controller";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const ResyncContacts = () => {
  const [loading, setLoading] = useState(false);
  const { loadContactList } = useContactListStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadContactList();
  }, []);

  async function fetchAddContacts() {
    try {
      setLoading(true);
      // if db has no contacts then fetch and add in db
      // fetch contacts from device
      const contactData = await getDeviceContacts();

      // add in db
      await saveContactsToDb(contactData);

      // load data in ui
      await loadContactList();
    } catch (error) {
      console.error("Failed to sync contacts", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      className="border border-borderColor dark:border-dark-borderColor w-full rounded-xl p-2"
      disabled={loading}
      onPress={async () => await fetchAddContacts()}
    >
      <Text className="text-text dark:text-dark-text text-center">
        {loading ? (
          <ActivityIndicator color={Colors[colorScheme ?? "light"].text} />
        ) : (
          "Resync"
        )}
      </Text>
    </Pressable>
  );
};

export default ResyncContacts;
