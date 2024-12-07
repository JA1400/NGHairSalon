import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/get-data/admin/login', {
      email: email,
      password: password,
    });
  }
}
