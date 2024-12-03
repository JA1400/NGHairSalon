import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './login/services/authservice.service';
import { FourofourComponent } from './fourofour/fourofour.component';
@NgModule({
  declarations: [AppComponent, FourofourComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
