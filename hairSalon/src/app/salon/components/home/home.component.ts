import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { TestimonialStoreItem } from '../../services/testimonial/testimonial.storeitem';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../../assets/mainSiteStyles.css'],
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
export class HomeComponent {
  visibleSlides: boolean[] = [true, false, false];
  constructor(
    public domService: DomService,
    public storedTestimonial: TestimonialStoreItem
  ) {}
  showSlide(index: number): void {
    for (let i = 0; i < this.visibleSlides.length; i++)
      this.visibleSlides[i] = false;

    this.visibleSlides[index] = true;
  }
}
