import { Injectable } from '@angular/core';
import { SongServiceInterface } from '../utils/song-services-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song, SavedSong, UpdateSongDto, Style } from '../utils/songs-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  API_URL = environment.API_URL;
  API_SONG_ENDPOINT = '/api/v1/songs';
  songs = new BehaviorSubject<SavedSong[]>([]);
  songs$ = this.songs.asObservable();

  constructor(private http: HttpClient) {}

  create(song: Song): Observable<SavedSong> {
    return this.http.post<SavedSong>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}`,
      song,
      { context: checkToken() }
    );
  }

  getAll(title: string, style: string) {
    let params = new HttpParams();
    params = params.set('title', title);
    params = params.set('style', style);

    return this.http.get<SavedSong[]>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}`,
      { params }
    );
  }

  get(id: string): Observable<SavedSong> {
    throw new Error('Method not implemented.');
  }

  update(id: string, changes: UpdateSongDto): Observable<SavedSong> {
    return this.http.put<SavedSong>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}/${id}`,
      changes,
      { context: checkToken() }
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}/${id}`,
      { context: checkToken() }
    );
  }

  updateSongsList() {
    this.getAll('', '').subscribe((data) => this.songs.next(data));
  }
}
