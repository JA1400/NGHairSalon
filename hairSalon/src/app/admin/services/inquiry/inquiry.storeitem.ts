import { Inquiry } from 'src/app/salon/types/inquiry.type';
import { AdminServices } from '../services/services.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class InquiryStoreItem extends StoreItem<Inquiry[]> {
  constructor(private adminServices: AdminServices) {
    super([]);
  }

  async loadInquiry() {
    this.adminServices.loadInquiries().subscribe((inquiries) => {
      this.setValue(inquiries);
    });
  }

  get inquiry$(): Observable<Inquiry[]> {
    return this.value$;
  }

  get inquiry(): Inquiry[] {
    return this.value;
  }
}
