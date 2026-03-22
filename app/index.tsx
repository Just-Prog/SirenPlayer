import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function AppOpeningView() {
  const router = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home/main");
    }, 2000);
  }, []);
  return (
    <View className="flex h-full w-screen flex-col items-center justify-center gap-y-2 bg-black/95">
      <Text
        className="text-nowrap text-3xl text-white"
        style={{ fontFamily: "Geometos" }}
      >
        Siren Player
      </Text>
      <Text
        className="text-nowrap text-white"
        style={{ fontFamily: "Geometos" }}
      >
        A WORLD FAMILIARLY UNKNOWN
      </Text>
      <Text
        className="pt-8 text-sm text-white"
        style={{ fontFamily: "Geometos" }}
      >
        @Monster_Siren_Records
      </Text>
    </View>
  );
}
