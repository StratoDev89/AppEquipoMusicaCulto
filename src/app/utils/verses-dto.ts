export interface Verse {
  name: string;
  text: string;
}

export interface SavedVerse extends Verse {
  _id: string;
}

export interface UpdateVerseDto extends Partial<Verse> {}
