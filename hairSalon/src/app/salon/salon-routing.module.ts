import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonComponent } from './salon.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: SalonComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'testimonials',
        component: TestimonialsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonRoutingModule {}
