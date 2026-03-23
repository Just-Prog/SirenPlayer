import AlbumsDetailListView from "@/components/views/AlbumsDetailListView";
import { useWindowDimensions, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HomeAlbumDetailPage = () => {
  const safetyzone = useSafeAreaInsets();
  const window = useWindowDimensions();
  return (
    <SafeAreaView>
      <View
        className={"flex flex-row"}
        style={{ maxHeight: window.height - safetyzone.bottom }}
      >
        <AlbumsDetailListView />
      </View>
    </SafeAreaView>
  );
};

export default HomeAlbumDetailPage;
