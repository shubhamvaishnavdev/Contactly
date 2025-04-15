import ContactCard from "@/components/home/contactCard";
import { fetchContactsFromDb } from "@/controllers/fetchContact.controller";
import { saveContactsToDb } from "@/controllers/insertContact.controller";
import { Contact } from "@/types/contact.types";
import { getDeviceContacts } from "@/util/contacts";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHomeComponent from "@/components/home/MainHomeComponent";

export default function HomeScreen() {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const fetchedContacts = await fetchContactsFromDb();
    setContactList(fetchedContacts);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function fetchAddContacts() {
    try {
      // if db has no contacts then fetch and add in db
      // fetch contacts from device
      const contactData = await getDeviceContacts();

      // add in db
      await saveContactsToDb(contactData);

      // load data in ui
      await loadData();
    } catch (error) {
      console.error("Failed to sync contacts", error);
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]}>
      <View className="h-full w-full flex justify-center items-center bg-background dark:bg-dark-background p-4 pb-0 rounded-xl">
        {contactList.length > 0 ? (
          <MainHomeComponent contactList={contactList}/>
        ) : (
          <TouchableOpacity
            className="bg-primaryBtnBackground dark:bg-dark-primaryBtnBackground p-3 rounded-3xl "
            onPress={async () => {
              return await fetchAddContacts();
            }}
          >
            <Text className="text-primaryBtnText dark:text-dark-primaryBtnText">
              {loading ? "Syncing..." : "Get contacts"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
