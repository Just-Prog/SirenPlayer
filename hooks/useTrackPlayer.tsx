import { Image } from "expo-image";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const Player: React.FC<{
  bottomMargin: number;
}> = ({ bottomMargin }) => {
  const window = useWindowDimensions();
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        className="absolute z-50 flex w-screen flex-1 flex-col items-center justify-center px-4"
        style={{ bottom: bottomMargin }}
      >
        <View className="flex w-[90%] flex-row items-center gap-x-4 rounded-2xl bg-white px-4 py-4 shadow-black shadow-lg drop-shadow-md">
          <Image
            source={{
              uri: "https://web.hycdn.cn/siren/pic/20250905/2039eb5cf7f7d3a951d5f653c6d33f64.jpg", //sample 无忧梦呓
            }}
            style={{
              height: window.width / 10,
              width: window.width / 10,
              borderRadius: window.width / 20,
            }}
          />
          <Text className="font-bold text-lg">美梦必须成真</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function useTrackPlayer() {
  return { Player };
}
