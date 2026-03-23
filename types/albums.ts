export interface AlbumsListItemProps {
  artistes: string[];
  cid: string;
  coverUrl: string;
  name: string;
}

export interface AlbumsDetailItemProps {
  artistes?: string[];
  belong: string;
  cid: string;
  coverDeUrl: string;
  coverUrl: string;
  intro: string;
  name: string;
  songs: AlbumsListItemProps[];
}
