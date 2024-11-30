import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  setLocalStorage(responseObj: any): void {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const expires = Date.now() + oneWeek;
    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('expires', JSON.stringify(expires));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  getExpiration(): any {
    const expiration = localStorage.getItem('expires');
    if (expiration) {
      return expiration;
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (!localStorage.getItem('token')) return false;
    if (Date.now() < this.getExpiration()) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }
}
