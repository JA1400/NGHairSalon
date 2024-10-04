import { Component } from '@angular/core';
import { ContactStoreItem } from './services/contact/contact.storeitem';
import { TestimonialStoreItem } from './services/testimonial/testimonial.storeitem';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css'],
})
export class SalonComponent {
  constructor(
    public contactStoreItem: ContactStoreItem,
    public storedTestimonial: TestimonialStoreItem
  ) {
    this.contactStoreItem.loadContactInfo();
    this.storedTestimonial.loadStoredTestimonials();
  }
}
