import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomService } from 'src/app/salon/services/dom/dom.service';
import { TestimonialStoreItem } from 'src/app/salon/services/testimonial/testimonial.storeitem';
import { PendingTestimonialStoreItem } from '../../services/testimonials/pendingtestimonial.storeitem';
import { Testimonial } from 'src/app/salon/types/testimonial.type';
import { TestimonialTwo } from 'src/app/salon/types/testimonialTwo.type';
import { delay, map, Subscription, take } from 'rxjs';
import { AdminServices } from '../../services/services/services.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: [
    './testimonials.component.css',
    '../../../../assets/adminSiteStyles.css',
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  openDeleteForm: boolean = false;
  editPendingTesti: boolean = true;
  emptyTestimonials: boolean = false;
  loading: boolean = true;
  testimonialToDelete?: string;
  testimonialDeleteType: number;
  storedTestimonials: Testimonial[];
  pendingTestimonials: TestimonialTwo[];
  sTestimonialObservable: Subscription;
  pTestimonialObservable: Subscription;
  constructor(
    public domService: DomService,
    private sTestimonials: TestimonialStoreItem,
    private pTestimonials: PendingTestimonialStoreItem,
    private adminServices: AdminServices
  ) {
    this.sTestimonials.loadStoredTestimonials();
    this.pTestimonials.loadPendingTestimonials();
  }

  ngOnInit(): void {
    let loadingTimeout = setTimeout(() => {
      this.loading = false;
      this.emptyTestimonials = true;
    }, 2000);
    this.sTestimonialObservable = this.sTestimonials.storedTestimonials$
      .pipe(delay(500))
      .subscribe((sTestimonials) => {
        this.storedTestimonials = sTestimonials;
        if (sTestimonials.length) {
          clearTimeout(loadingTimeout);
          this.loading = false;
          this.emptyTestimonials = false;
        }
      });
    this.pTestimonialObservable = this.pTestimonials.pendingTestimonials$
      .pipe(map((data) => data.map((item) => ({ ...item, isValid: false }))))
      .subscribe((newArray) => (this.pendingTestimonials = newArray));
  }

  checkValidTestimonial(index: number): void {
    if (
      !this.pendingTestimonials[index].name ||
      !this.pendingTestimonials[index].email ||
      !this.pendingTestimonials[index].message
    ) {
      return;
    }

    this.pendingTestimonials[index].isValid = true;
  }

  addToDelete(tType: number, id?: string): void {
    this.testimonialDeleteType = tType;
    this.testimonialToDelete = id;
  }

  addToStoredTestimonial(testimonial: any): void {
    const testi: TestimonialTwo = {
      ...testimonial,
      isValid: false,
    };
    this.storedTestimonials = [...this.storedTestimonials, testi];
  }

  removePendingTestimonial(index: number): void {
    this.pendingTestimonials = this.pendingTestimonials
      .slice(0, index)
      .concat(this.pendingTestimonials.slice(index + 1));
  }

  toggleDeleteForm(): void {
    this.openDeleteForm = !this.openDeleteForm;
    this.domService.toggleOverflow(this.openDeleteForm);
  }

  filterDeletedTestimonial(testiType?: number): void {
    if (testiType === 1) {
      this.storedTestimonials = this.storedTestimonials.filter((testi) => {
        return testi._id !== this.testimonialToDelete;
      });
    }
    this.pendingTestimonials = this.pendingTestimonials.filter((testi) => {
      return testi._id !== this.testimonialToDelete;
    });
  }

  storeTestimonial(index: number): void {
    this.adminServices
      .storeTestimonial(this.pendingTestimonials[index])
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.domService.actionMessage = result.message;
          this.addToStoredTestimonial(result.testimonial);
          this.removePendingTestimonial(index);
          this.filterDeletedTestimonial(0);
        },
        error: (e) => {
          e.error.message;
        },
      });
  }

  deleteTestimonial(): void {
    this.adminServices
      .deleteTestimonial(this.testimonialDeleteType, this.testimonialToDelete)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.domService.actionMessage = result.message;
          this.filterDeletedTestimonial(this.testimonialDeleteType);
          this.toggleDeleteForm();
        },
        error: (e) => {
          this.domService.actionMessage = e.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.pTestimonialObservable.unsubscribe();
    this.sTestimonialObservable.unsubscribe();
  }
}
