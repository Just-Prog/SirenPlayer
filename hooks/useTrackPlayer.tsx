import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePlayerStore from "@/stores/usePlayerStore";

const PlayerControlButton: React.FC<{
  onPress?: (arg1: any) => void;
  iconName: any;
}> = ({ onPress, iconName }) => {
  const window = useWindowDimensions();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={iconName} size={window.fontScale * 32} />
    </Pressable>
  );
};

const Player: React.FC<{
  bottomMargin: number;
}> = ({ bottomMargin }) => {
  const window = useWindowDimensions();
  const safetyzone = useSafeAreaInsets();
  const [isPlayerPopUp, setPlayerPopUp] = useState(false);

  const playlist = usePlayerStore((state) => state.playlist);
  const current = usePlayerStore((state) => state.current);

  // Mini player 位置（固定在 Tabs 上方）
  const miniPlayerBottom = useSharedValue(bottomMargin);
  useEffect(() => {
    miniPlayerBottom.value = bottomMargin;
  }, [bottomMargin]);

  const fullScreenTranslateY = useSharedValue(window.height);

  const handlePlayerBarPress = () => {
    if (isPlayerPopUp) {
      fullScreenTranslateY.value = withTiming(window.height, {
        duration: 300,
      });
      miniPlayerBottom.value = withTiming(bottomMargin, { duration: 300 });
      setPlayerPopUp(false);
    } else {
      fullScreenTranslateY.value = withTiming(0, {
        duration: 300,
      });
      miniPlayerBottom.value = withTiming(window.height, { duration: 300 });
      setPlayerPopUp(true);
    }
  };

  const handleCloseButtonPress = () => {
    handlePlayerBarPress();
  };

  const miniPlayerAnimatedStyle = useAnimatedStyle(() => ({
    bottom: miniPlayerBottom.value,
  }));

  const fullScreenAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fullScreenTranslateY.value }],
  }));

  return (
    <>
      <Animated.View
        className="absolute right-0 left-0 z-40 px-4"
        pointerEvents={isPlayerPopUp ? "none" : "auto"}
        style={miniPlayerAnimatedStyle}
      >
        <TouchableOpacity activeOpacity={0.9} onPress={handlePlayerBarPress}>
          <View className="flex flex-row items-center gap-x-4 rounded-2xl bg-white px-4 py-3 shadow-lg">
            <Image
              source={{
                uri: "https://web.hycdn.cn/siren/pic/20250905/2039eb5cf7f7d3a951d5f653c6d33f64.jpg",
              }}
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
              }}
            />
            <Text className="flex-1 font-bold text-lg">美梦必须成真</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* 全屏播放器 - 覆盖整个屏幕包括 Tabs */}
      <Animated.View
        className="absolute inset-0 z-50 flex flex-col bg-white"
        style={fullScreenAnimatedStyle}
      >
        <View className="w-full" style={{ height: safetyzone.top }} />
        <View
          className="absolute top-0 left-2 flex flex-row justify-start"
          style={{ top: safetyzone.top + 8 }}
        >
          <Pressable onPress={handleCloseButtonPress}>
            <Ionicons
              className="ml-4 p-2"
              name={"arrow-down-outline"}
              size={window.fontScale * 32}
            />
          </Pressable>
        </View>
        <View className="flex w-full flex-1 flex-col items-center px-4">
          <View className="w-full" style={{ height: window.fontScale * 32 }} />
          <View className="w-full flex-1 items-center justify-between px-5 pt-4 pb-10">
            <View className="w-full justify-start">
              <Text className="mt-4 font-bold text-xl">美梦必须成真</Text>
              <Text className="font mt-1 text-base">塞壬唱片-MSR</Text>
            </View>

            <View className="flex-1 items-center justify-center">
              <View className="overflow-hidden rounded-xl bg-clip-border shadow-black shadow-lg drop-shadow-lg">
                <Image
                  source={{
                    uri: "https://web.hycdn.cn/siren/pic/20250905/2039eb5cf7f7d3a951d5f653c6d33f64.jpg",
                  }}
                  style={{
                    height: window.width * 0.75,
                    width: window.width * 0.75,
                  }}
                />
              </View>
            </View>
            <View className="mb-12 flex-row gap-x-12">
              <PlayerControlButton iconName={"play-back"} onPress={() => {}} />
              <PlayerControlButton iconName={"play"} onPress={() => {}} />
              <PlayerControlButton
                iconName={"play-forward"}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default function useTrackPlayer() {
  return { Player };
}
