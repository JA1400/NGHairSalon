import { Component, OnInit } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { InquiryService } from '../../services/inquiry/inquiry.service';
import { Inquiry } from '../../types/inquiry.type';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.css',
    '../../../../assets/mainSiteStyles.css',
  ],
})
export class ContactComponent implements OnInit {
  inquiryForm: FormGroup;
  alertMsg: string = '';
  constructor(
    public domService: DomService,
    private inquiryService: InquiryService,
    private fB: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inquiryForm = this.fB.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
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
}
