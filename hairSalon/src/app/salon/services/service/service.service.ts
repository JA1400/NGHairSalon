import { Injectable } from '@angular/core';
import { Service } from '../../types/service.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  loadServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(
      'http://localhost:3000/get-data/service'
    );
  }

  updateService(
    id: string,
    title: string,
    price: number,
    description: string
  ): Observable<any> {
    const url: string = `http://localhost:3000/get-data/service${id}`;
    return this.httpClient.put(url, {
      title: title,
      price: price,
      description: description,
    });
  }
}
