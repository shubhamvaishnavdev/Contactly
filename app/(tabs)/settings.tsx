import ResyncContacts from "@/components/settings/ResyncContacts";
import { View, Text, Pressable } from "react-native";

export default function Settings() {
  return (
    <View className="h-full w-full flex justify-center items-center bg-background dark:bg-dark-background p-4 rounded-xl">
      <ResyncContacts />
    </View>
  );
}
