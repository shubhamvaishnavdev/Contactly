import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Contact, CustomContactDetails } from "@/types/contact.types";
import EditFieldModal from "../edit-contact/EditFieldModal";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { json } from "drizzle-orm/gel-core";
import { deleteCustomFieldFromDb } from "@/controllers/delete.controller";
import CustomDeleteModal from "../common/deleteConfirmationModal";
import { requestMediaLibraryPermission } from "@/util/requestPermissions";
import { openGallery } from "@/util/openGallery ";
import { saveContactProfileImage } from "@/controllers/insertContact.controller";
import { useContactDetailsStore } from "@/store/useContactDetailsStore";
import { useContactListStore } from "@/store/useContactListStore";

const ShowContactDetails = ({ contactId }: { contactId: string }) => {
  const colorScheme = useColorScheme();
  const { basicDetails, customDetails, loadContactDetails } =
    useContactDetailsStore();
  const { loadContactList } = useContactListStore();
  const [editingField, setEditingField] = useState<null | CustomContactDetails>(
    null
  );

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteField, setDeleteField] = useState({
    contactId: "",
    customFieldId: 0,
  });

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleDelete = async ({
    customFieldId,
    contactId,
  }: {
    customFieldId: number;
    contactId: string;
  }) => {
    await deleteCustomFieldFromDb({
      customFieldId,
      contactId: String(contactId),
    });
    await loadContactDetails(contactId);
  };

  const handleProfilePicClick = async () => {
    const result = await openGallery();
    if (result) {
      const { imageName, imagePath } = result;
      console.log("Image saved:", imageName, imagePath);
      await saveContactProfileImage({
        contactId: basicDetails?.id ?? "",
        imagePath: imagePath,
      });
      await loadContactDetails(contactId);
      await loadContactList();
    }
  };

  return (
    <ScrollView
      className="h-auto w-full p-4 bg-background dark:bg-dark-background min-h-screen"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Profile Picture */}
      <Pressable className="items-center mb-4" onPress={handleProfilePicClick}>
        {basicDetails?.profilePicture ? (
          <Image
            source={{ uri: basicDetails?.profilePicture }}
            className="w-32 h-32 rounded-full border border-gray-300"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-32 rounded-full border border-gray-300 items-center justify-center bg-gray-100">
            <AntDesign name="user" size={64} color="gray" />
          </View>
        )}
      </Pressable>

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
          let content = null;
          // Skip image field (already shown above)
          if (field.fieldType === "image") {
            content = (
              <Image
                source={{ uri: field.fieldValue ?? undefined }}
                className="w-32 h-32 flex rounded-2xl justify-center items-center m-auto border border-gray-300"
                resizeMode="cover"
              />
            );
          }
          // Map or Location
          else if (field.fieldType === "map" && field.fieldObject) {
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
              <View className="flex-row justify-between pr-4">
                <Text className="text-sm pl-2 text-secondaryText dark:text-dark-secondaryText">
                  {field.fieldName}
                </Text>
                <Menu>
                  <MenuTrigger>
                    <Entypo
                      name="dots-three-vertical"
                      size={16}
                      color={Colors[colorScheme ?? "light"].text}
                    />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].cardBackground,
                        padding: 10,
                        borderRadius: 10,
                        overflow: "hidden", // optional, but good
                        borderWidth: 1,
                        borderColor: Colors[colorScheme ?? "light"].borderColor,
                      },
                    }}
                  >
                    <MenuOption onSelect={() => setEditingField(field)}>
                      <Text
                        style={{ color: Colors[colorScheme ?? "light"].text }}
                      >
                        Edit
                      </Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => {
                        setDeleteField({
                          contactId: field.contactId,
                          customFieldId: Number(field.id),
                        });
                        setIsDeleteModalVisible(true);
                      }}
                    >
                      <Text style={{ color: "red" }}>Delete</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
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
          contactId={contactId}
          initialData={editingField}
        />
      )}
      <CustomDeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={() => {
          handleDelete(deleteField);
          setIsDeleteModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default ShowContactDetails;
