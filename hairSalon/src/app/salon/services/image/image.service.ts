import { Injectable } from '@angular/core';
import { Image } from '../../types/image.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  loadImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>('http://localhost:3000/get-data/image');
  }
}
