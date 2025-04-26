import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  TextInput,
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomContactDetails } from "@/types/contact.types";
import { saveCustomFieldsForContact } from "@/controllers/insertCustomFields.controller";

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
  contact_id: string;
  loadData: any;
}

const InputModal: React.FC<InputModalProps> = ({
  visible,
  onClose,
  contact_id,
  loadData,
}) => {
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<string>("text");
  const [fieldValue, setFieldValue] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
      setFieldValue(formattedDate);
    }
  };

  const handleFieldValuePress = () => {
    if (fieldType === "date") {
      setShowDatePicker(true);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitted Data:", {
      fieldName,
      fieldType,
      fieldValue,
    });

    if (contact_id) {
      await saveCustomFieldsForContact(contact_id, {
        fieldName,
        fieldType,
        fieldValue,
      });
    }
    await loadData();
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-11/12 gap-4">
          <Text className="text-lg font-bold text-center">Enter Your Name</Text>
          <TextInput
            className="border p-4 rounded"
            placeholder="Field Name"
            value={fieldName}
            onChangeText={setFieldName}
          />
          <View className="border rounded">
            <Picker
              selectedValue={fieldType}
              onValueChange={(itemValue) => setFieldType(itemValue)}
            >
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Number" value="number" />
              <Picker.Item label="Link" value="link" />
              <Picker.Item label="Image" value="image" />
              <Picker.Item label="Date" value="date" />
            </Picker>
          </View>

          <Pressable onPress={handleFieldValuePress}>
            <TextInput
              className="border p-4 rounded"
              placeholder="Field Value"
              value={fieldValue || undefined}
              onChangeText={setFieldValue}
              editable={fieldType !== "date"} // Disable manual editing for date
              pointerEvents={fieldType === "date" ? "none" : "auto"} // Properly handle click
            />
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          <View className="flex-row justify-between">
            <Pressable
              onPress={onClose}
              className="px-4 py-2 bg-gray-300 rounded-xl"
            >
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="px-4 py-2 bg-blue-500 rounded-xl"
            >
              <Text className="text-white">Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
