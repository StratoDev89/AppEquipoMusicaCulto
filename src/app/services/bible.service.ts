import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SavedVerse, Verse } from '../utils/verses-dto';
import { checkToken } from '../interceptors/token.interceptor';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  API_URL = environment.API_URL;
  API_SONG_ENDPOINT = '/api/v1/verses';

  constructor(private http: HttpClient) {}

  create(verse: Verse) {
    return this.http.post<SavedVerse>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}`,
      verse,
      { context: checkToken() }
    );
  }

  getAll() {
    return this.http.get<SavedVerse[]>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}`
    );
  }

  get() {
    return this.http
      .get<SavedVerse[]>(`${this.API_URL}${this.API_SONG_ENDPOINT}`)
      .pipe(
        map((savedVerses: SavedVerse[]) => {
          if (savedVerses.length === 0) {
            return null;
          }
          const randomIndex = Math.floor(Math.random() * savedVerses.length);
          return savedVerses[randomIndex];
        })
      );
  }

  update() {}

  delete(id: string) {
    return this.http.delete<boolean>(
      `${this.API_URL}${this.API_SONG_ENDPOINT}/${id}`,
      { context: checkToken() }
    );
  }
}
