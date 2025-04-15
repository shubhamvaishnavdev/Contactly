import { View, Text } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const FilterComponent = () => {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Feather
        name="filter"
        size={24}
        color={Colors[colorScheme ?? "light"].text}
      />
    </View>
  );
};

export default FilterComponent;
