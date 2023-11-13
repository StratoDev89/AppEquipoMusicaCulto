import { Observable } from 'rxjs';
import { SavedSong, Song, UpdateSongDto } from './songs-dto';

export interface SongServiceInterface {
  create(song: Song): Observable<SavedSong>;
  getAll(): void;
  get(id: string): Observable<SavedSong>;
  update(id: string, changes: UpdateSongDto): Observable<SavedSong>;
  delete(id: string): Observable<boolean>;
}
