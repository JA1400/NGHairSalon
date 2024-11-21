import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../../services/inquiry/inquiry.service';
import { Inquiry } from '../../types/inquiry.type';
import { ContactStoreItem } from '../../services/contact/contact.storeitem';
import { ContactInfo } from '../../types/contact.type';
import { Observable, Subscription, take } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.css',
    '../../../../assets/mainSiteStyles.css',
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ContactComponent implements OnInit, OnDestroy {
  inquiryForm: FormGroup;
  alertMsg: string = '';
  contactObservable: Subscription;
  footerInfo: ContactInfo = {
    phone: '',
    address: '',
    email: '',
  };

  constructor(
    public domService: DomService,
    private inquiryService: InquiryService,
    private contactStoreItem: ContactStoreItem,
    private fB: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inquiryForm = this.fB.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.contactObservable = this.contactStoreItem.contactInfo$.subscribe(
      (contact) => {
        this.footerInfo = contact;
      }
    );
  }
  onSubmit(): void {
    const inquiry: Inquiry = {
      name: this.inquiryForm.get('name')?.value,
      email: this.inquiryForm.get('email')?.value,
      subject: this.inquiryForm.get('subject')?.value,
      message: this.inquiryForm.get('message')?.value,
    };

    console.log(inquiry);
    this.inquiryService.sendInquiry(inquiry).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMsg = result.message;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.contactObservable.unsubscribe();
  }
}
