import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonComponent } from './salon.component';
import { SalonRoutingModule } from './salon-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { DomService } from './services/dom/dom.service';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactStoreItem } from './services/contact/contact.storeitem';
import { ContactService } from './services/contact/contact.service';
import { TestimonialService } from './services/testimonial/testimonial.service';
import { TestimonialStoreItem } from './services/testimonial/testimonial.storeitem';
import { ServiceService } from './services/service/service.service';
import { ServiceStoreItem } from './services/service/service.storeitem';
import { ImageService } from './services/image/image.service';
import { ImageStoreItem } from './services/image/image.storeitem';
import { InquiryService } from './services/inquiry/inquiry.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    SalonComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    AboutComponent,
    GalleryComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    SalonRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    DomService,
    ContactStoreItem,
    ContactService,
    TestimonialService,
    TestimonialStoreItem,
    ServiceService,
    ServiceStoreItem,
    ImageService,
    ImageStoreItem,
    InquiryService,
  ],
})
export class SalonModule {}
