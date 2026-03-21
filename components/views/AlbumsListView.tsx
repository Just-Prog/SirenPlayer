import type React from "react";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import type { AlbumsListItemProps } from "@/types/albums";
import { FetchAlbumsList } from "@/utils/requests/albums";
import SearchBar from "../common/SearchBar";

const AlbumsListItems: React.FC<AlbumsListItemProps> = ({
  artistes,
  cid,
  coverUrl,
  name,
}) => {
  const window = useWindowDimensions();
  return (
    <View className="flex flex-1 flex-col py-4">
      <Image
        className={"rounded"}
        source={{
          uri: coverUrl,
          width: window.width / 2.5,
          height: window.width / 2.5,
          headers: {
            referer: "https://monster-siren.hypergryph.com/",
          },
        }}
      />
    </View>
  );
};

const AlbumsListView = () => {
  const [search, setSearch] = useState<string>("");
  const [albumsList, setAlbumsList] = useState<AlbumsListItemProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchList = async () => {
    setRefreshing(true);
    setAlbumsList(await FetchAlbumsList());
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: biome经典精神分裂式告警
  useEffect(() => {
    fetchList().then(() => {
      setRefreshing(false);
    });
  }, [search]);

  return (
    <View className="my-8 flex w-full flex-col gap-y-2 px-6">
      <View>
        <Text className="mb-4 font-bold text-4xl">专辑</Text>
      </View>
      <SearchBar
        onTextChange={setSearch}
        placeholder="在Monster Siren Record中搜索..."
        text={search}
      />
      <View className="flex h-full w-full">
        <FlatList
          data={albumsList}
          numColumns={2}
          refreshing={refreshing}
          renderItem={({ item, index }) => (
            <AlbumsListItems key={index} {...item} />
          )}
        />
      </View>
    </View>
  );
};

export default AlbumsListView;
