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

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    FooterComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,
  ],
  providers: [
    DomService,
    ContactService,
    ContactStoreItem,
    ServiceStoreItem,
    ServiceService,
    AdminServices,
  ],
})
export class AdminModule {}
