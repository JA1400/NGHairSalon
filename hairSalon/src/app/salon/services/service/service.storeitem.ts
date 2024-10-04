import { Service } from '../../types/service.type';
import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class ServiceStoreItem extends StoreItem<Service[]> {
  constructor(private ServiceService: ServiceService) {
    super([]);
  }

  async loadServices() {
    this.ServiceService.loadServices().subscribe((service) => {
      this.setValue(service);
    });
  }

  get service$(): Observable<Service[]> {
    return this.value$;
  }

  get service(): Service[] {
    return this.value;
  }
}
