import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../../../../assets/mainSiteStyles.css'],
})
export class AboutComponent {
  constructor(public domService: DomService) {}
}
