import { Injectable } from '@angular/core';
import { ContactInfo } from '../../types/contact.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  getContactInfo(): Observable<ContactInfo> {
    return this.httpClient.get<ContactInfo>(
      '/get-data/contact'
    );
  }
}
