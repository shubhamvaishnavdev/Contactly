import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Contact, CustomContactDetails } from "@/types/contact.types";
import EditFieldModal from "../edit-contact/EditFieldModal";
import { updateCustomContactDetails } from "@/controllers/updateCustomFields.controller";

const ShowContactDetails = ({
  basicDetails,
  customDetails,
  loadData,
}: {
  basicDetails: Contact | null;
  customDetails: CustomContactDetails[] | [];
  loadData: any;
}) => {
  const [editingField, setEditingField] = useState<null | CustomContactDetails>(
    null
  );

  

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const imageField = customDetails.find(
    (f: CustomContactDetails) => f.fieldType === "image"
  );

  return (
    <ScrollView
      className="h-auto w-full p-4 bg-background dark:bg-dark-background min-h-screen"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Profile Picture */}
      <View className="items-center mb-4">
        {imageField?.fieldValue ? (
          <Image
            source={{ uri: imageField.fieldValue }}
            className="w-32 h-32 rounded-full border border-gray-300"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-32 rounded-full border border-gray-300 items-center justify-center bg-gray-100">
            <AntDesign name="user" size={64} color="gray" />
          </View>
        )}
      </View>

      {/* Basic Info */}
      <View className="items-center mb-4">
        <Text className="text-xl font-bold text-text dark:text-dark-text">
          {basicDetails?.name}
        </Text>
        <Text className="text-text dark:text-dark-text">
          {basicDetails?.phone}
        </Text>
      </View>

      {/* Custom Details */}
      <View className="space-y-3">
        {customDetails.map((field) => {
          // Skip image field (already shown above)
          if (field.fieldType === "image") return null;

          let content = null;

          // Map or Location
          if (field.fieldType === "map" && field.fieldObject) {
            const location = JSON.parse(field.fieldObject);
            content = (
              <Text className="text-text dark:text-dark-text">
                {location.label} ({location.lat}, {location.lng})
              </Text>
            );
          }
          // Clickable Link
          else if (field.fieldType === "link") {
            const value = field.fieldValue;

            if (
              typeof value === "string" &&
              value.trim() &&
              value.startsWith("http")
            ) {
              content = (
                <Pressable onPress={() => openLink(value)}>
                  <Text className="text-blue-600 underline">{value}</Text>
                </Pressable>
              );
            }
          }

          // Default Text / Number / Date
          else {
            content = (
              <Text className="text-text dark:text-dark-text">
                {field.fieldValue}
              </Text>
            );
          }

          return (
            <View key={field.id} className=" pb-6">
              <View className="flex-row gap-2">
                <Text className="text-sm pl-2 text-secondaryText dark:text-dark-secondaryText">
                  {field.fieldName}
                </Text>
                <Pressable onPress={() => setEditingField(field)}>
                  <AntDesign name="edit" size={16} color="gray" />
                </Pressable>
              </View>
              <View className="mt-1 p-4 dark:bg-dark-cardBackground rounded-2xl">
                {content}
              </View>
            </View>
          );
        })}
      </View>
      {editingField && (
        <EditFieldModal
          visible={true}
          onClose={() => setEditingField(null)}
          loadData={loadData}
          initialData={editingField}
        />
      )}
    </ScrollView>
  );
};

export default ShowContactDetails;
