import { Injectable } from '@angular/core';
import { Testimonial } from '../../types/testimonial.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private httpClient: HttpClient) {}

  loadSTestimonials(): Observable<Testimonial[]> {
    return this.httpClient.get<Testimonial[]>(
      'http://localhost:3000/get-data/storedtestimonial'
    );
  }
}
