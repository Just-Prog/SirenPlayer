import { useWindowDimensions, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AlbumsListView from "@/components/views/AlbumsListView";

export default function HomeTabMainView() {
  const safetyzone = useSafeAreaInsets();
  const window = useWindowDimensions();
  return (
    <SafeAreaView>
      <View
        className={"flex flex-row"}
        style={{ maxHeight: window.height - safetyzone.bottom }}
      >
        <AlbumsListView />
      </View>
    </SafeAreaView>
  );
}
