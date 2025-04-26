import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Platform,
  useColorScheme,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { CustomContactDetails } from "@/types/contact.types";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateCustomContactDetails } from "@/controllers/updateCustomFields.controller";

type Props = {
  visible: boolean;
  onClose: () => void;
  loadData: any;
  initialData: CustomContactDetails;
};

const EditFieldModal = ({ visible, onClose, loadData, initialData }: Props) => {
  const colorScheme = useColorScheme();
  const [fieldType, setFieldType] = useState(initialData.fieldType);
  const [fieldName, setFieldName] = useState(initialData.fieldName);
  const [fieldValue, setFieldValue] = useState(initialData.fieldValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      setFieldValue(selectedDate.toISOString());
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
    await loadData();
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
          />

          <View className="border border-borderColor dark:border-dark-borderColor rounded text-text dark:text-dark-text">
            <Picker
              selectedValue={fieldType}
              onValueChange={(itemValue) => setFieldType(itemValue)}
              className="text-text dark:text-dark-text"
              style={{ color: Colors[colorScheme ?? "light"].text }}
            >
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Number" value="number" />
              <Picker.Item label="Link" value="link" />
              <Picker.Item label="Image" value="image" />
              <Picker.Item label="Map" value="map" />
              <Picker.Item label="Date" value="date" />
            </Picker>
          </View>

          {fieldType === "date" ? (
            <>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="border p-2 rounded  border-borderColor dark:border-dark-borderColor  text-text dark:text-dark-text"
              >
                <Text className="p-2 text-text dark:text-dark-text">
                  {fieldValue
                    ? new Date(fieldValue).toDateString()
                    : "Pick a date"}
                </Text>
              </Pressable>

              {/* 👇 This part was missing in your code */}
              {showDatePicker && (
                <DateTimePicker
                  value={fieldValue ? new Date(fieldValue) : new Date()}
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
