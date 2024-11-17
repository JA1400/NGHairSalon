import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, Observable, of } from 'rxjs';
import { Service } from 'src/app/salon/types/service.type';
import { ContactInfo } from 'src/app/salon/types/contact.type';
import { Inquiry } from 'src/app/salon/types/inquiry.type';
import { Testimonial } from 'src/app/salon/types/testimonial.type';
import { TestimonialTwo } from 'src/app/salon/types/testimonialTwo.type';
@Injectable()
export class AdminServices {
  constructor(private httpClient: HttpClient) {}

  deleteImage(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/image/${id}`;
    return this.httpClient.delete(url);
  }

  addImage(image: FormData): Observable<any> {
    return this.httpClient
      .post('http://localhost:3000/admin/image', image)
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }

  /* *********************************** */

  loadPendingTestimonials(): Observable<any> {
    return this.httpClient.get<Testimonial[]>(
      'http://localhost:3000/admin/testimonials'
    );
  }

  storeTestimonial(testimonial: TestimonialTwo): Observable<any> {
    const url: string = `http://localhost:3000/admin/testimonials`;
    return this.httpClient.put(url, testimonial);
  }

  deletePendingTestimonial(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/pendingtestimonials/${id}`;
    return this.httpClient.delete(url);
  }

  deleteStoredTestimonial(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/storedtestimonials/${id}`;
    return this.httpClient.delete(url);
  }

  deleteTestimonial(tType: number, id?: string): Observable<any> {
    const testimonialType: string[] = [
      'pendingtestimonials',
      'storedtestimonials',
    ];
    const url: string = `http://localhost:3000/admin/${testimonialType[tType]}/${id}`;
    return this.httpClient.delete(url);
  }
  /* *********************************** */

  loadInquiries(): Observable<any> {
    return this.httpClient.get<Inquiry[]>(
      'http://localhost:3000/admin/inquiry'
    );
  }

  deleteInquiry(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/inquiry/${id}`;
    return this.httpClient.delete(url);
  }

  /* *********************************** */

  updateContact(contact: ContactInfo): Observable<any> {
    const { phone, email, address } = contact;
    const url: string = `http://localhost:3000/admin/contact/${contact._id}`;
    return this.httpClient.put(url, { phone, email, address });
  }

  /* *********************************** */

  addService(service: Service): Observable<any> {
    const url: string = 'http://localhost:3000/admin/services';
    return this.httpClient.post(url, service);
  }

  updateService(service: Service): Observable<any> {
    const { title, price, description } = service;
    const url: string = `http://localhost:3000/admin/services/${service._id}`;
    return this.httpClient.put(url, { title, price, description });
  }

  deleteService(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/services/${id}`;
    return this.httpClient.delete(url);
  }
}
