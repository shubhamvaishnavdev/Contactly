import * as Contacts from "expo-contacts";

type SimplifiedContact = {
  id: string;
  name: string;
  phone: string;
};
/**
 * Request permission and fetch contacts.
 * @returns {Promise<SimplifiedContact[]>} - Returns an array of contacts if permission granted, else an empty array.
 */

export const getDeviceContacts = async (): Promise<SimplifiedContact[]> => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      console.warn("Contacts permission not granted.");
      return [];
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.Name,
        Contacts.Fields.ID,
        Contacts.Fields.PhoneNumbers,
      ],
    });

    const formattedData: SimplifiedContact[] = data
      .filter((contact) => contact.phoneNumbers?.length)
      .map((contact) => ({
        id: contact.id as string,
        name: `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim(),
        phone: contact.phoneNumbers![0]!.number!.replace(/\s+/g, ""),
      }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};
