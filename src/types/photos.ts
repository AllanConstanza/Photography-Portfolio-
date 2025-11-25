export type Photo = {
  src: string;
  alt?: string;
  album: string;
  w?: number;
  h?: number;
};

export type Album = {
  name: string;
  cover: string;
  count: number;
};
