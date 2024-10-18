import { Component } from '@angular/core';
import { ContactStoreItem } from '../salon/services/contact/contact.storeitem';
import { ServiceStoreItem } from '../salon/services/service/service.storeitem';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private contactStoreItem: ContactStoreItem,
    private serviceStoreItem: ServiceStoreItem
  ) {
    this.contactStoreItem.loadContactInfo();
    this.serviceStoreItem.loadServices();
  }
}
