import { requestMediaLibraryPermission } from "./requestPermissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "react-native";

export const openGallery = async (): Promise<{
  imageName: string;
  imagePath: string;
} | null> => {
  const hasPermission = await requestMediaLibraryPermission();
  if (!hasPermission) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    console.log("Selected image:", imageUri);
    // Proceed to save image or update state
    try {
      const contactlyDir = `${FileSystem.documentDirectory}Contactly/`;

      // Create folder if it doesn't exist
      const folderInfo = await FileSystem.getInfoAsync(contactlyDir);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(contactlyDir, {
          intermediates: true,
        });
      }

      // Generate unique image name with extension
      const extension = imageUri.split(".").pop()?.split("?")[0] || "jpg";
      const imageName = `${uuidv4()}.${extension}`;
      const newPath = `${contactlyDir}${imageName}`;

      // Copy image to Contactly folder
      await FileSystem.copyAsync({
        from: imageUri,
        to: newPath,
      });

      console.log("Saved image to:", newPath);
      return { imageName, imagePath: newPath };
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save image.");
      return null;
    }
  }
  return null;
};
