import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTrackPlayer from "@/hooks/useTrackPlayer";

export default function HomeAlbumListLayout() {
  const { Player } = useTrackPlayer();
  const safetyzone = useSafeAreaInsets();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="detail" />
      </Stack>
      <Player bottomMargin={safetyzone.bottom} />
    </>
  );
}
