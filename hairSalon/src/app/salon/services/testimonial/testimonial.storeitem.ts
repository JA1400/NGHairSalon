import { Testimonial } from '../../types/testimonial.type';
import { TestimonialService } from './testimonial.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class TestimonialStoreItem extends StoreItem<Testimonial[]> {
  constructor(private testimonialService: TestimonialService) {
    super([]);
  }

  async loadStoredTestimonials() {
    this.testimonialService.loadSTestimonials().subscribe((testimonials) => {
      this.setValue(testimonials);
    });
  }

  get storedTestimonials$(): Observable<Testimonial[]> {
    return this.value$;
  }
  get storedTestimonials(): Testimonial[] {
    return this.value;
  }
}
