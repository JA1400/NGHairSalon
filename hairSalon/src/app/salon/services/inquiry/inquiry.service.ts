import { Injectable } from '@angular/core';
import { Inquiry } from '../../types/inquiry.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InquiryService {
  constructor(private httpClient: HttpClient) {}

  sendInquiry(inquiry: Inquiry): Observable<any> {
    const url: string = '/get-data/inquiry';
    return this.httpClient.post(url, inquiry);
  }
}
