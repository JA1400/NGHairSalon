import { ContactInfo } from '../../types/contact.type';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class ContactStoreItem extends StoreItem<ContactInfo> {
  constructor(private contactService: ContactService) {
    super({
      address: '',
      phone: '',
      email: '',
    });
  }

  async loadContactInfo() {
    this.contactService.getContactInfo().subscribe((info) => {
      this.setValue(info);
    });
  }

  get contactInfo$(): Observable<ContactInfo> {
    return this.value$;
  }

  get contactInfo(): ContactInfo {
    return this.value;
  }
}
