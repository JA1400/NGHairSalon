import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/authservice.service';
import { DomService } from 'src/app/salon/services/dom/dom.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../../../assets/adminSiteStyles.css',
  ],
})
export class AdminNavbarComponent {
  constructor(
    public domService: DomService,
    private authService: AuthService
  ) {}
  toggleMenu(): void {
    this.domService.toggleMenu();
  }

  logOut(): void {
    this.authService.logout();
  }
}
