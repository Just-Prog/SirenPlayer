import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AlbumsListItemProps } from "@/types/albums";

interface PlayerStoreProps {
  current: number;
  playlist: AlbumsListItemProps[] | undefined;
}

interface PlayerStoreActionProps {
  replacePlaylist: (arg1: PlayerStoreProps["playlist"], arg2: number) => void;
  setCurrent: (arg1: number) => void;
  setPlaylist: (arg1: PlayerStoreProps["playlist"]) => void;
}

type PlayerStoreCombinedProps = PlayerStoreActionProps & PlayerStoreProps;

const usePlayerStore = create<PlayerStoreCombinedProps>()(
  persist(
    (set) => ({
      current: 0,
      playlist: [],
      setCurrent: (arg1) =>
        set((state) => ({ current: arg1, playlist: state.playlist })),
      setPlaylist: (arg1) =>
        set((state) => ({ playlist: arg1, current: state.current })),
      replacePlaylist: (arg1, arg2) =>
        set(() => ({ current: arg2, playlist: arg1 })),
    }),
    {
      name: "siren_state",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePlayerStore;
