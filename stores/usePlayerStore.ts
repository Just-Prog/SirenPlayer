import { create } from "zustand";
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

const usePlayerStore = create<PlayerStoreProps & PlayerStoreActionProps>()(
  (set) => ({
    current: 0,
    playlist: [],
    setCurrent: (arg1) => set(() => ({ current: arg1 })),
    setPlaylist: (arg1) => set(() => ({ playlist: arg1 })),
    replacePlaylist: (arg1, arg2) =>
      set(() => ({ current: arg2, playlist: arg1 })),
  })
);

export default usePlayerStore;
