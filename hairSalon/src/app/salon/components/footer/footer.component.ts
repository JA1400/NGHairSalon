import { Component, OnDestroy } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ContactStoreItem } from '../../services/contact/contact.storeitem';
import { ContactInfo } from '../../types/contact.type';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  footerInfo: ContactInfo = {
    phone: '',
    address: '',
    email: '',
  };

  constructor(
    public domService: DomService,
    public contatcStoreItem: ContactStoreItem
  ) {
    this.contatcStoreItem.contactInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        this.footerInfo = info;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
