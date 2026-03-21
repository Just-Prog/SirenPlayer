import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("white");
  }, []);
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
      <StatusBar />
    </SafeAreaProvider>
  );
}
