import { Component } from '@angular/core';
import { ContactStoreItem } from '../salon/services/contact/contact.storeitem';
import { ServiceStoreItem } from '../salon/services/service/service.storeitem';
import { ImageStoreItem } from '../salon/services/image/image.storeitem';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private contactStoreItem: ContactStoreItem,
    private serviceStoreItem: ServiceStoreItem,
    private imageStoreItem: ImageStoreItem
  ) {
    this.contactStoreItem.loadContactInfo();
    this.serviceStoreItem.loadServices();

    this.imageStoreItem.loadImages();
  }
}
