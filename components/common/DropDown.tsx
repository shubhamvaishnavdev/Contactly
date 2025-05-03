import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

type DropDownProps = {
  value: string | null;
  setValue: (callback: (val: string) => string) => void;
};

const DropDown: React.FC<DropDownProps> = ({ value, setValue }) => {
  const colorScheme = useColorScheme();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Text", value: "text" },
    { label: "Number", value: "number" },
    { label: "Date", value: "date" },
    { label: "Map", value: "map" },
    { label: "Link", value: "link" },
    { label: "Image", value: "image" },
  ]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Select an item"
      showArrowIcon={true}
      showTickIcon={true}
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].cardBackground, // closed state background
        borderColor: Colors[colorScheme ?? "light"].borderColor, // border color
        borderRadius: 14,
      }}
      textStyle={{
        color: Colors[colorScheme ?? "light"].text, // selected item text (closed state)
        paddingLeft: 2,
      }}
      placeholderStyle={{
        color: Colors[colorScheme ?? "light"].text, // placeholder text
      }}
      dropDownContainerStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].cardBackground, // opened dropdown background
        borderColor: Colors[colorScheme ?? "light"].borderColor,
      }}
      listItemLabelStyle={{
        color: Colors[colorScheme ?? "light"].text, // list item text when open
      }}
      selectedItemLabelStyle={{
        fontWeight: "bold", // selected item styling inside dropdown
        color: Colors[colorScheme ?? "light"].text,
      }}
      ArrowDownIconComponent={({ style }) => (
        <View style={style}>
          <AntDesign
            name="down"
            size={16}
            color={Colors[colorScheme ?? "light"].text}
          />
        </View>
      )}
      ArrowUpIconComponent={({ style }) => (
        <View style={style}>
          <AntDesign
            name="up"
            size={16}
            color={Colors[colorScheme ?? "light"].text}
          />
        </View>
      )}
    />
  );
};

export default DropDown;
