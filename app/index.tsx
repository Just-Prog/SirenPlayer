import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppOpeningView() {
  const router = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      <View className="flex h-full w-screen flex-col items-center justify-center gap-y-4">
        <Text className="text-nowrap font-bold text-xl">Siren Player</Text>
        <Text className="text-nowrap">@Monster Siren</Text>
      </View>
    </SafeAreaView>
  );
}
