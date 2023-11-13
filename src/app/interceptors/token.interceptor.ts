import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

// definimos context token inicia en false
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

// function que crea un contexto http y setea este con el context token y lo coloca true
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookiesService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      return this.addTokenToRequest(request, next);
    }
    return next.handle(request);
  }

  addTokenToRequest(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.cookieService.getToken();

    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const authRequest = request.clone({
        headers: headers,
      });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
