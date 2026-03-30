import type { AlbumsDetailItemProps } from "@/types/albums";
import { fetchAlbumDetail } from "@/utils/requests/albums";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AlbumsDetailListView = () => {
  const params = useSearchParams();
  const router = useRouter();
  const window = useWindowDimensions();
  const safetyzone = useSafeAreaInsets();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<AlbumsDetailItemProps>();
  const fetchData = async () => {
    setLoading(true);
    const data = await fetchAlbumDetail(params.get("cid") ?? "0");
    setDetail(data);
  };

  useEffect(() => {
    fetchData().then((_) => {
      setLoading(false);
    });
  }, []);

  return (
    <View className="my-8 flex h-max-full h-screen w-screen flex-1 flex-col gap-y-4">
      <View className="flex w-full flex-row">
        <TouchableOpacity
          className="px-4"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            className="px-2"
            color="black"
            name="arrow-back"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View className="px-6">
        <Text className="line-clamp-1 text-nowrap font-bold text-4xl">
          {detail?.name ?? "专辑"}
        </Text>
        <Text className="mt-1 line-clamp-1 text-nowrap font-light text-lg">
          {detail?.artistes
            ? detail.artistes.join("、")
            : "MonsterSirenRecords"}
        </Text>
      </View>
      <View className="flex-row gap-x-4 px-6">
        <Image
          source={{
            uri: detail?.coverUrl ?? "",
          }}
          style={{
            height: window.width / 2 - 64,
            width: window.width / 2 - 64,
            backgroundColor: "#e0e0e0",
            borderRadius: 16,
            shadowColor: "#000000",
            shadowRadius: 2,
            shadowOpacity: 0.6,
          }}
        />
        <View className="flex-1 flex-col gap-y-2">
          <ScrollView style={{ width: "100%", height: window.width / 2 - 64 }}>
            <Text className="pt-3">{detail?.intro}</Text>
          </ScrollView>
          <MaterialIcons
            className="absolute -top-9 -right-4 -z-10"
            color={"#eee0e0e0"}
            name={"format-quote"}
            size={window.width / 4}
          />
        </View>
      </View>
      <View className="flex-1">
        <FlatList
          className={"grow-0"}
          data={detail?.songs ?? []}
          ItemSeparatorComponent={() => {
            return (
              <View className="my-2 flex w-full flex-1 flex-col items-center justify-center">
                <View className="w-[90%] flex-1 border border-gray-200/65" />
              </View>
            );
          }}
          ListFooterComponent={() => (
            <View
              style={{
                height:
                  (16 + safetyzone.bottom) * 2 +
                  (Platform.OS === "ios" ? safetyzone.bottom * 2.5 : 0) + 72,
              }}
            />
          )}
          renderItem={({ item }) => (
            <View className="my-2 flex-1 flex-row items-center gap-x-2 px-6">
              <Ionicons name="play" size={16} />
              <Text className="font-bold">{item?.name ?? "?"}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AlbumsDetailListView;
