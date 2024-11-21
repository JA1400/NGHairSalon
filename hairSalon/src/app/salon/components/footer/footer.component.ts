import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ContactStoreItem } from '../../services/contact/contact.storeitem';
import { ContactInfo } from '../../types/contact.type';
import { finalize, Subject, take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  footerInfo: ContactInfo = {
    phone: '',
    address: '',
    email: '',
  };

  constructor(
    public domService: DomService,
    public contatcStoreItem: ContactStoreItem
  ) {}

  ngOnInit(): void {
    this.contatcStoreItem.contactInfo$.pipe(take(2)).subscribe((contact) => {
      this.footerInfo = contact;
    });
  }
}
