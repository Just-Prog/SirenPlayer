import type {
  AlbumsDetailItemProps,
  AlbumsListItemProps,
} from "@/types/albums";
import type { commonResp } from "@/types/common";
import requests from "./core";

export const fetchAlbumsList: () => Promise<AlbumsListItemProps[]> =
  async () => {
    const data: AlbumsListItemProps[] = (
      (await requests.get("/api/albums")).data as commonResp
    ).data;
    return data;
  };

export const fetchAlbumDetail: (
  arg1: string
) => Promise<AlbumsDetailItemProps> = async (cid: string) => {
  const data: AlbumsDetailItemProps = (
    (await requests.get(`api/album/${cid}/detail`)).data as commonResp
  ).data;
  return data;
};
