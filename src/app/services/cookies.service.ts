import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { accessToken } from '../utils/user-service-dto';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  saveToken(token: accessToken) {
    setCookie('app-musica-culto', token, { expires: 7, path: '/' });
  }

  getToken() {
    return getCookie('app-musica-culto');
  }

  removeToken() {
    removeCookie('app-musica-culto');
  }
}
