import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Inquiry } from 'src/app/salon/types/inquiry.type';
import { AdminServices } from '../../services/services/services.service';
import { InquiryStoreItem } from '../../services/inquiry/inquiry.storeitem';
import { DomService } from 'src/app/salon/services/dom/dom.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: [
    './inquiries.component.css',
    '../../../../assets/adminSiteStyles.css',
  ],
})
export class InquiriesComponent implements OnInit {
  inquiries: Inquiry[];
  constructor(
    private inquiryStoreItem: InquiryStoreItem,
    private adminServices: AdminServices,
    public domService: DomService
  ) {
    inquiryStoreItem.loadInquiry();
  }

  ngOnInit(): void {
    this.inquiryStoreItem.inquiry$.subscribe((inquiries) => {
      this.inquiries = inquiries;
    });
  }

  filterDeletedInquiry(id?: string): void {
    this.inquiries = this.inquiries.filter((inquiry) => {
      return inquiry._id !== id;
    });
  }

  onSubmit(id?: string): void {
    this.adminServices
      .deleteInquiry(id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.domService.actionMessage = result.message;
          this.filterDeletedInquiry(id);
        },
        error: (e) => {
          this.domService.actionMessage = e.error.message;
        },
      });
  }
}
