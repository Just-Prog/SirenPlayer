import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type React from "react";
import { View } from "react-native";

const LoadingIcon: React.FC<{
  loading: boolean;
}> = ({ loading }) => (
  <View className="flex h-full w-full items-center justify-center">
    <View className="size-10 animate-spin">
      <MaterialCommunityIcons
        className={"size-10"}
        name={"loading"}
        size={32}
      />
    </View>
  </View>
);

export default LoadingIcon;
