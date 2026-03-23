import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function HomeTabLayout() {
  const isAndroid = Platform.OS === "android";

  return isAndroid ? (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="albums"
        options={{
          tabBarLabel: "主页",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              color="black"
              name={focused ? "home" : "home-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarLabel: "收藏",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              color="black"
              name={focused ? "star" : "star-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarLabel: "用户",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              color="black"
              name={focused ? "person" : "person-outline"}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  ) : (
    <NativeTabs>
      <NativeTabs.Trigger name="albums">
        <Label>主页</Label>
        <Icon sf={{ default: "house", selected: "house.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorite">
        <Label>收藏</Label>
        <Icon sf={{ default: "star", selected: "star.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="user">
        <Label>用户</Label>
        <Icon sf={{ default: "person", selected: "person.fill" }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
