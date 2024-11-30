import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const token = localStorage.getItem('token');

    if (!token) {
      return next.handle(req);
    }

    const cloned = req.clone({
      headers: req.headers.set('Authorization', token),
    });

    return next.handle(cloned);
  }
}
