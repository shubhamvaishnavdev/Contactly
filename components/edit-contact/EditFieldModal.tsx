import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { CustomContactDetails } from "@/types/contact.types";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateCustomContactDetails } from "@/controllers/updateCustomFields.controller";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import DropDown from "../common/DropDown";
import { useContactDetailsStore } from "@/store/useContactDetailsStore";

type Props = {
  visible: boolean;
  onClose: () => void;
  contactId: string;
  initialData: CustomContactDetails;
};

const EditFieldModal = ({
  visible,
  onClose,
  contactId,
  initialData,
}: Props) => {
  const colorScheme = useColorScheme();
  const { loadContactDetails } = useContactDetailsStore();
  const [fieldType, setFieldType] = useState<string>(initialData.fieldType);
  const [fieldName, setFieldName] = useState(initialData.fieldName);
  const [fieldValue, setFieldValue] = useState(initialData.fieldValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Utility: Format Date to dd-mm-yyyy
  const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Utility: Convert dd-mm-yyyy to Date object
  const parseDateFromDDMMYYYY = (dateString: string | null | undefined) => {
    if (!dateString || !dateString.includes("/")) return new Date();
    const [day, month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Date picker handler
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      const formatted = formatDateToDDMMYYYY(selectedDate);
      setFieldValue(formatted);
    }
  };

  const handleSave = async () => {
    const updatedField = {
      id: initialData.id,
      contactId: initialData.contactId,
      fieldName,
      fieldType,
      fieldValue: fieldValue ?? "",
      fieldObject: null,
    };

    console.log("Updated field:", updatedField);
    await updateCustomContactDetails(updatedField);
    await loadContactDetails(contactId);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-cardBackground dark:bg-dark-cardBackground p-4 rounded-2xl w-full max-w-md space-y-4 gap-4">
          <Text className="text-lg font-bold text-text dark:text-dark-text text-center">
            Edit Values
          </Text>

          <TextInput
            className="border border-borderColor dark:border-dark-borderColor p-4 rounded text-text dark:text-dark-text"
            placeholder="Field Name"
            value={fieldName}
            onChangeText={setFieldName}
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
          />

          <DropDown value={fieldType} setValue={setFieldType} />

          {fieldType === "date" ? (
            <>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="border p-2 rounded  border-borderColor dark:border-dark-borderColor  text-text dark:text-dark-text"
              >
                <Text className="p-2 text-text dark:text-dark-text">
                  {fieldValue ? fieldValue : "Pick a date"}
                </Text>
              </Pressable>

              {/* 👇 This part was missing in your code */}
              {showDatePicker && (
                <DateTimePicker
                  value={parseDateFromDDMMYYYY(fieldValue) ?? ""}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          ) : (
            <TextInput
              className="border border-borderColor dark:border-dark-borderColor p-4 rounded text-text dark:text-dark-text"
              placeholder="Field Value"
              value={fieldValue || undefined}
              onChangeText={setFieldValue}
              placeholderTextColor={Colors[colorScheme ?? "light"].text}
            />
          )}

          <View className="flex-row justify-between">
            <Pressable
              onPress={onClose}
              className=" py-2 px-4 border border-borderColor dark:border-dark-borderColor"
            >
              <Text className="text-text dark:text-dark-text">Cancel</Text>
            </Pressable>

            <Pressable
              className=" py-2 px-4 border border-borderColor dark:border-dark-borderColor bg-primaryBtnBackground dark:bg-dark-primaryBtnBackground"
              onPress={handleSave}
            >
              <Text className="text-primaryBtnText dark:text-dark-primaryBtnText">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditFieldModal;
