import type {
  AlbumsDetailItemProps,
  AlbumsListItemProps,
} from "@/types/albums";
import { fetchAlbumDetail } from "@/utils/requests/albums";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const AlbumsDetailListViewItem: React.FC<AlbumsListItemProps> = ({
  artistes,
  cid,
  name,
}) => {
  return (
    <View>
      <Text>name</Text>
    </View>
  );
};

const AlbumsDetailListView = () => {
  const params = useSearchParams();
  const router = useRouter();
  const window = useWindowDimensions();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<AlbumsDetailItemProps>();
  const fetchData = async () => {
    setLoading(true);
    setDetail(await fetchAlbumDetail(params.get("cid") ?? "0"));
  };

  useEffect(() => {
    fetchData().then((_) => {
      setLoading(false);
    });
  }, []);

  return (
    <View className="my-8 flex h-max-full w-full flex-1 flex-col gap-y-4">
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
          <Text className="pt-3">{detail?.intro}</Text>
          <MaterialIcons
            className="absolute -top-9 -right-4 -z-10"
            color={"#eee0e0e0"}
            name={"format-quote"}
            size={window.width / 4}
          />
        </View>
      </View>
    </View>
  );
};

export default AlbumsDetailListView;
