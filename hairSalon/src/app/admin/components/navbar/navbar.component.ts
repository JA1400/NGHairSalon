import { Component } from '@angular/core';
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
  constructor(public domService: DomService) {}
  toggleMenu(): void {
    this.domService.toggleMenu();
  }
}
