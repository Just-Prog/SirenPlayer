import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { AlbumsListItemProps } from "@/types/albums";
import { fetchAlbumsList } from "@/utils/requests/albums";
import SearchBar from "../common/SearchBar";

const AlbumsListItems: React.FC<AlbumsListItemProps> = ({
  cid,
  coverUrl,
  name,
}) => {
  const window = useWindowDimensions();
  const router = useRouter();
  return (
    <View className="flex w-[50%] flex-col">
      <TouchableOpacity
        activeOpacity={0.85}
        className="items-center justify-start gap-y-4"
        onPress={() => {
          console.log(`clicked on cid ${cid}, name ${name}`);
          router.push(`/home/albums/detail?cid=${cid}`);
        }}
      >
        <Image
          source={{
            uri: coverUrl,
            headers: {
              referer: "https://monster-siren.hypergryph.com/",
            },
          }}
          style={{
            borderRadius: 24,
            width: window.width / 2 - 48,
            height: window.width / 2 - 32,
            backgroundColor: "#e0e0e0",
          }}
        />
        <Text className="mx-8 line-clamp-2 text-center font-bold text-base">
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AlbumsListView = () => {
  const [search, setSearch] = useState<string>("");
  const [albumsList, setAlbumsList] = useState<AlbumsListItemProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [albumsListBak, setAlbumsListBak] = useState<AlbumsListItemProps[]>([]);
  // TODO 搜索功能实装
  const tabBarHeight = 16;
  const safetyZone = useSafeAreaInsets();
  const flatlist = useRef(null);
  const fetchList = async () => {
    setRefreshing(true);
    const data = await fetchAlbumsList();
    setAlbumsList(data);
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: biome经典精神分裂式告警
  useEffect(() => {
    fetchList().then(() => {
      setRefreshing(false);
    });
  }, [search]);

  return (
    <View className="my-8 flex h-max-full w-full flex-1 flex-col gap-y-4">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          flatlist.current?.scrollToOffset({ animated: true, y: 0 })
        }
      >
        <View className="px-6">
          <Text className="font-bold text-4xl">专辑</Text>
        </View>
      </TouchableOpacity>
      <View className="px-6">
        <SearchBar
          onTextChange={setSearch}
          placeholder="在Monster Siren Record中搜索..."
          text={search}
        />
      </View>

      <FlatList
        className={"grow-0"}
        data={albumsList}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        ListFooterComponent={() => (
          <View
            style={{
              height:
                (tabBarHeight + safetyZone.bottom) * 2 +
                (Platform.OS === "ios" ? safetyZone.bottom : 0),
            }}
          />
        )}
        numColumns={2}
        ref={flatlist}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <AlbumsListItems key={index} {...item} />
        )}
      />
    </View>
  );
};

export default AlbumsListView;
export { AlbumsListItems };
