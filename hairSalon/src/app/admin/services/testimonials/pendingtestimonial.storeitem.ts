import { Testimonial } from 'src/app/salon/types/testimonial.type';
import { AdminServices } from '../services/services.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class PendingTestimonialStoreItem extends StoreItem<Testimonial[]> {
  constructor(private adminServices: AdminServices) {
    super([]);
  }

  async loadPendingTestimonials() {
    this.adminServices.loadPendingTestimonials().subscribe((testimonials) => {
      this.setValue(testimonials);
    });
  }

  get pendingTestimonials$(): Observable<Testimonial[]> {
    return this.value$;
  }
  get pendingTestimonials(): Testimonial[] {
    return this.value;
  }
}
