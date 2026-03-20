import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function HomeTabLayout() {
  const isAndroid = Platform.OS === "android";

  return isAndroid ? (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="main" options={{ tabBarLabel: "主页" }} />
      <Tabs.Screen name="user" options={{ tabBarLabel: "用户" }} />
    </Tabs>
  ) : (
    <NativeTabs>
      <NativeTabs.Trigger name="main">
        <Label>主页</Label>
        <Icon sf={{ default: "house", selected: "house.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="user">
        <Label>用户</Label>
        <Icon sf={{ default: "person", selected: "person.fill" }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
