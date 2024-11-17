import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavbarComponent } from './components/navbar/navbar.component';
import { DomService } from '../salon/services/dom/dom.service';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { ContactService } from '../salon/services/contact/contact.service';
import { ContactStoreItem } from '../salon/services/contact/contact.storeitem';
import { FormsModule } from '@angular/forms';
import { ServiceStoreItem } from '../salon/services/service/service.storeitem';
import { ServiceService } from '../salon/services/service/service.service';
import { AdminServices } from './services/services/services.service';
import { InquiriesComponent } from './components/inquiries/inquiries.component';
import { InquiryStoreItem } from './services/inquiry/inquiry.storeitem';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PendingTestimonialStoreItem } from './services/testimonials/pendingtestimonial.storeitem';
import { TestimonialStoreItem } from '../salon/services/testimonial/testimonial.storeitem';
import { TestimonialService } from '../salon/services/testimonial/testimonial.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageStoreItem } from '../salon/services/image/image.storeitem';
import { ImageService } from '../salon/services/image/image.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    FooterComponent,
    InfoComponent,
    InquiriesComponent,
    TestimonialsComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    DomService,
    ContactService,
    ContactStoreItem,
    ServiceStoreItem,
    ServiceService,
    AdminServices,
    InquiryStoreItem,
    PendingTestimonialStoreItem,
    TestimonialStoreItem,
    TestimonialService,
    ImageStoreItem,
    ImageService,
  ],
})
export class AdminModule {}
