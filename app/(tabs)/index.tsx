import { fetchContactsFromDb } from "@/controllers/fetchContact.controller";
import { saveContactsToDb } from "@/controllers/insertContact.controller";
import { getDeviceContacts } from "@/util/contacts";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
type SimplifiedContact = {
  id: string;
  name: string;
  phone: string;
};

export default function HomeScreen() {
  const [contactList, setContactList] = useState<SimplifiedContact[]>([]);
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
    <View className="h-full w-full flex justify-center items-center bg-background dark:bg-dark-background p-4 rounded-xl">
      {contactList.length > 0 ? (
        <Text className="text-white">data</Text>
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
  );
}
