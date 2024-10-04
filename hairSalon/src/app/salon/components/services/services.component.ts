import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ServiceStoreItem } from '../../services/service/service.storeitem';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../../../../assets/mainSiteStyles.css',
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
