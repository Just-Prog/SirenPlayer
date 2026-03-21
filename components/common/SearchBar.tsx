import Ionicons from "@expo/vector-icons/Ionicons";
import type React from "react";
import { memo, useEffect, useState } from "react";
import { Platform, TextInput, View } from "react-native";

const SearchBar: React.FC<{
  text: string;
  onTextChange: (arg1: string) => void;
  placeholder?: string;
}> = ({ text, onTextChange, placeholder = "搜索..." }) => {
  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    if (text !== localText) {
      setLocalText(text);
    }
  }, [text, localText]);

  return (
    <View
      className={`flex flex-row items-center gap-x-2 rounded-2xl bg-gray-200 px-4 ${Platform.OS === "ios" ? "py-4" : null}`}
    >
      <Ionicons name="search" size={16} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        onChangeText={(value) => {
          setLocalText(value);
          onTextChange(value);
        }}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        value={localText}
      />
    </View>
  );
};

export default memo(SearchBar);
