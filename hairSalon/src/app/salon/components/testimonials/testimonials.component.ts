import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { Testimonial } from '../../types/testimonial.type';
import { TestimonialStoreItem } from '../../services/testimonial/testimonial.storeitem';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: [
    './testimonials.component.css',
    '../../../../assets/mainSiteStyles.css',
  ],
})
export class TestimonialsComponent {
  sTestimonials: Testimonial[] = [];
  currentIndex: number = 0;
  constructor(
    public domService: DomService,
    private testimonialStoreItem: TestimonialStoreItem
  ) {
    this.testimonialStoreItem.storedTestimonials$.subscribe((testimonials) => {
      this.sTestimonials = testimonials;
    });
  }

  nextSlide(): void {
    if (this.currentIndex + 1 === this.sTestimonials.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.sTestimonials.length - 1;
    } else {
      this.currentIndex--;
    }
  }
}
