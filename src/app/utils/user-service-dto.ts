import { Observable } from 'rxjs';
import { UpdateUser, User, UserSaved } from './users.dto';

export type accessToken = string 

export interface payload {
  sub: string;
  nick: string;
}

export interface UserServiceInterface {
  create(user: User): Observable<UserSaved>;
  login(user: User): Observable<accessToken>;
  getAll(): Observable<UserSaved[] | []>;
  get(id: string): Observable<UserSaved>;
  update(id: string, changes: UpdateUser): Observable<UserSaved>;
  delete(id: string): Observable<boolean>;
}
