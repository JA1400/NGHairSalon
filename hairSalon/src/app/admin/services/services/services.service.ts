import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/salon/types/service.type';
import { ContactInfo } from 'src/app/salon/types/contact.type';
import { Inquiry } from 'src/app/salon/types/inquiry.type';
@Injectable()
export class AdminServices {
  constructor(private httpClient: HttpClient) {}

  loadInquiries(id?: string): Observable<any> {
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
    const url: string = `http://localhost:3000/admin/contact/${contact._id}`;
    return this.httpClient.put(url, contact);
  }

  /* *********************************** */

  addService(service: Service): Observable<any> {
    const url: string = 'http://localhost:3000/admin/services';
    return this.httpClient.post(url, service);
  }

  updateService(service: Service): Observable<any> {
    const url: string = `http://localhost:3000/admin/services/${service._id}`;
    return this.httpClient.put(url, service);
  }

  deleteService(id?: string): Observable<any> {
    const url: string = `http://localhost:3000/admin/services/${id}`;
    return this.httpClient.delete(url);
  }
}
