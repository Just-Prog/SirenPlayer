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
      setCurrent: (arg1) => set(() => ({ current: arg1 })),
      setPlaylist: (arg1) => set(() => ({ playlist: arg1 })),
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
