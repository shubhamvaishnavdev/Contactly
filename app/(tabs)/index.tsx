import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="h-full w-full flex justify-center items-center bg-background dark:bg-dark-background p-4 rounded-xl">
      <Text className="text-text dark:text-dark-text font-bold">hello</Text>
    </View>
  );
}
