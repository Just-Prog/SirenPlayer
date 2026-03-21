import type { AlbumsListItemProps } from "@/types/albums";
import type { commonResp } from "@/types/common";
import requests from "./core";

export const FetchAlbumsList: () => Promise<AlbumsListItemProps[]> =
  async () => {
    const data: AlbumsListItemProps[] = (
      (await requests.get("/api/albums")).data as commonResp
    ).data;
    return data;
  };
