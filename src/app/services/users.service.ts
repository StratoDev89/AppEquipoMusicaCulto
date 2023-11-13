import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceInterface, accessToken } from '../utils/user-service-dto';
import { User, UserSaved, UpdateUser, Payload } from '../utils/users.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookiesService } from './cookies.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UserServiceInterface {
  API_URL = environment.API_URL;
  API_USER_ENDPOINT = '/api/v1/users';
  user = new BehaviorSubject<Payload | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookiesService
  ) {}

  create(user: User) {
    return this.http.post<UserSaved>(
      `${this.API_URL}${this.API_USER_ENDPOINT}`,
      user
    );
  }

  login(user: User): Observable<accessToken> {
    return this.http
      .post<accessToken>(`${this.API_URL}${this.API_USER_ENDPOINT}/login`, user)
      .pipe(
        tap((token) => {
          this.cookieService.saveToken(token);
          this.getProfile(token).subscribe();
        })
      );
  }

  getAll(): Observable<UserSaved[] | []> {
    return this.http.get<UserSaved[]>(
      `${this.API_URL}${this.API_USER_ENDPOINT}`
    );
  }

  get(id: string): Observable<UserSaved> {
    throw new Error('Method not implemented.');
  }

  getProfile(token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .get<Payload>(`${this.API_URL}${this.API_USER_ENDPOINT}/profile`, {
        headers: headers,
      })
      .pipe(
        tap((user) => {
          this.user.next(user);
        })
      );
  }

  update(id: string, changes: UpdateUser): Observable<UserSaved> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
