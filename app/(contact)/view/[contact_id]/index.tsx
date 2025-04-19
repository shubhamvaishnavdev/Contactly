import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ShowContactDetails from "@/components/view-contact/ShowContactDetails";
import { CustomContactDetails } from "@/types/contact.types";

const ViewContact = () => {
  const basicDetails = {
    id: "contact_001",
    name: "Shubham Vaishnav",
    phone: "+91-9876543210",
  };

  const customDetails: CustomContactDetails[] = [
    {
      id: 1,
      contactId: "contact_001",
      fieldName: "Email",
      fieldType: "text",
      fieldValue: "shubham@example.com",
      fieldObject: null,
    },
    {
      id: 2,
      contactId: "contact_001",
      fieldName: "Age",
      fieldType: "number",
      fieldValue: "28",
      fieldObject: null,
    },
    {
      id: 3,
      contactId: "contact_001",
      fieldName: "Birthday",
      fieldType: "date",
      fieldValue: "1997-05-15",
      fieldObject: null,
    },
    {
      id: 4,
      contactId: "contact_001",
      fieldName: "Location",
      fieldType: "map",
      fieldValue: null,
      fieldObject: JSON.stringify({
        lat: 23.0225,
        lng: 72.5714,
        label: "Ahmedabad, Gujarat, India",
      }),
    },
    {
      id: 6,
      contactId: "contact_001",
      fieldName: "Address",
      fieldType: "text",
      fieldValue: "Ahmedabad, Gujarat, India",
      fieldObject: null,
    },
    {
      id: 7,
      contactId: "contact_001",
      fieldName: "Profile Picture",
      fieldType: "image",
      fieldValue:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      fieldObject: null,
    },

    {
      id: 9,
      contactId: "contact_001",
      fieldName: "Company",
      fieldType: "text",
      fieldValue: "Tecoreng",
      fieldObject: null,
    },
    {
      id: 10,
      contactId: "contact_001",
      fieldName: "LinkedIn",
      fieldType: "link",
      fieldValue: "https://linkedin.com/in/shubhamvaishnav",
      fieldObject: null,
    },
    {
      id: 11,
      contactId: "contact_001",
      fieldName: "Notes",
      fieldType: "text",
      fieldValue:
        "Met at tech conference. Interested in React Native collaboration.",
      fieldObject: null,
    },
    {
      id: 12,
      contactId: "contact_001",
      fieldName: "Notes",
      fieldType: "text",
      fieldValue:
        "Met at tech conference. Interested in React Native collaboration.",
      fieldObject: null,
    },
    {
      id: 13,
      contactId: "contact_001",
      fieldName: "Notes",
      fieldType: "text",
      fieldValue:
        "Met at tech conference. Interested in React Native collaboration.",
      fieldObject: null,
    },
    {
      id: 14,
      contactId: "contact_001",
      fieldName: "Notes",
      fieldType: "text",
      fieldValue:
        "Met at tech conference. Interested in React Native collaboration.",
      fieldObject: null,
    },
  ];

  return (
    <View className="min-h-full w-full bg-background dark:bg-dark-background ">
      <ShowContactDetails
        basicDetails={basicDetails}
        customDetails={customDetails}
      />
    </View>
  );
};

export default ViewContact;
