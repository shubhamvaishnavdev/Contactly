import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const requestMediaLibraryPermission = async () => {
  const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

  // Already granted
  if (permission.granted) return true;

  // Not granted: request it
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status === "granted") return true;

  Alert.alert("Permission Denied", "Please allow media access to continue.");
  return false;
};
