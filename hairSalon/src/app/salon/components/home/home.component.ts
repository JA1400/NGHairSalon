import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { TestimonialStoreItem } from '../../services/testimonial/testimonial.storeitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../../assets/mainSiteStyles.css'],
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
