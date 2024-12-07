import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ServiceStoreItem } from '../../services/service/service.storeitem';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../../../../assets/mainSiteStyles.css',
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ServicesComponent {
  constructor(
    public domService: DomService,
    public serviceStoreItem: ServiceStoreItem
  ) {
    this.serviceStoreItem.loadServices();
  }
}
