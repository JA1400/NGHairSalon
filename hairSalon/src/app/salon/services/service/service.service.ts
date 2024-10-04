import { Injectable } from '@angular/core';
import { Service } from '../../types/service.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  loadServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>('http://localhost:3000/service');
  }
}
