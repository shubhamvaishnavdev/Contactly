import { saveContactsToDb } from "@/controllers/insertContact.controller";
import { getDeviceContacts } from "@/util/contacts";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHomeComponent from "@/components/home/MainHomeComponent";
import { useContactListStore } from "@/store/useContactListStore";
import { useSearchContactStore } from "@/store/useSearchContactsStore";

export default function HomeScreen() {
  // const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const { contactList, loadContactList, isContactListLoading } =
    useContactListStore();
  const { searchTerm } = useSearchContactStore();

  useEffect(() => {
    loadContactList();
  }, []);

  async function fetchAddContacts() {
    try {
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
    <SafeAreaView edges={["top", "bottom", "left", "right"]}>
      <View className="h-full w-full flex justify-center items-center bg-background dark:bg-dark-background p-4 pb-0 rounded-xl">
        {contactList.length > 0 || searchTerm ? (
          <MainHomeComponent />
        ) : (
          <TouchableOpacity
            className="bg-primaryBtnBackground dark:bg-dark-primaryBtnBackground p-3 rounded-3xl "
            onPress={async () => {
              return await fetchAddContacts();
            }}
          >
            <Text className="text-primaryBtnText dark:text-dark-primaryBtnText">
              {loading || isContactListLoading ? "Syncing..." : "Get contacts"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
