import { Injectable } from '@angular/core';
import { accessToken, payload } from '../utils/user-service-dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  payload = new BehaviorSubject<payload | null>(null);
  payload$ = this.payload.asObservable();

}
