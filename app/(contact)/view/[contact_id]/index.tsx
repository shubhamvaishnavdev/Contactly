import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewContact = () => {
  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]}>
      <View className="h-full w-full bg-background dark:bg-dark-background">
        <Text className="text-white">ViewContact</Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewContact;
