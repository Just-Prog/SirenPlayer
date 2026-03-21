import { SafeAreaView } from "react-native-safe-area-context";
import AlbumsListView from "@/components/views/AlbumsListView";

export default function HomeTabMainView() {
  return (
    <SafeAreaView>
      <AlbumsListView />
    </SafeAreaView>
  );
}
