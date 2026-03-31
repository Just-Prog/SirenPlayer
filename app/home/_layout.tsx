import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTrackPlayer from "@/hooks/useTrackPlayer";

export default function HomeLayout() {
  const { Player } = useTrackPlayer();
  const safetyzone = useSafeAreaInsets();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Player bottomMargin={safetyzone.bottom + 54} />
    </>
  );
}
