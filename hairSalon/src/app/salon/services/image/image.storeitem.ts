import { Image } from '../../types/image.type';
import { ImageService } from './image.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/app/shared/storeItem';

@Injectable()
export class ImageStoreItem extends StoreItem<Image[]> {
  constructor(private imageService: ImageService) {
    super([]);
  }

  async loadImages() {
    this.imageService.loadImages().subscribe((service) => {
      this.setValue(service);
    });
  }

  get images$(): Observable<Image[]> {
    return this.value$;
  }

  get images(): Image[] {
    return this.value;
  }
}
