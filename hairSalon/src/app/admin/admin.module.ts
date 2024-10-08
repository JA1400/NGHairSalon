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
  ],
  providers: [DomService],
})
export class AdminModule {}
