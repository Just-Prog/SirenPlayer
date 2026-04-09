import type { commonResp } from "@/types/common";
import type { SongInfoProps } from "@/types/song";
import requests from "./core";

export const fetchSongInfo: (arg1: string) => Promise<SongInfoProps> = async (
  cid: string
) => {
  const url = `/api/song/${cid}`;
  const data: SongInfoProps = ((await requests.get(url)).data as commonResp)
    .data;
  return data;
};
