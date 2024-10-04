import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public domService: DomService) {}
  toggleMenu(): void {
    this.domService.toggleMenu();
  }
}
