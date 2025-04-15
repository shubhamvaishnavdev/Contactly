import { Stack, Tabs } from "expo-router";
import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ContactLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="view/[contact_id]/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
