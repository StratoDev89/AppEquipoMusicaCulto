export type Style = 'jubilo' | 'reflexion';

export interface Song {
  name: string;
  tone: string;
  youtubeUrl: string;
  style: Style | null;
  observations: string;
}

export interface SavedSong extends Song {
  _id: string;
}

export interface UpdateSongDto extends Partial<Song> {}

export interface SongsResponse {
  songs: SavedSong[];
}
