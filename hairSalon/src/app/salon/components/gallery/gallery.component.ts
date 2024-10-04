import { Component } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ImageStoreItem } from '../../services/image/image.storeitem';
import { Image } from '../../types/image.type';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [
    './gallery.component.css',
    '../../../../assets/mainSiteStyles.css',
  ],
})
export class GalleryComponent {
  imageUrls: Image[] = [];
  visibleImages: Image[] = [];
  currentIndex: number = 0;
  disableBtn: boolean = false;
  constructor(
    public domService: DomService,
    public imageStoreItem: ImageStoreItem
  ) {
    imageStoreItem.loadImages();
    this.loadImagesArray();
  }

  loadImagesArray(): void {
    this.imageStoreItem.images$.subscribe((images) => {
      this.imageUrls = images;
      this.visibleImages = this.imageUrls.slice(0, 5);
      this.currentIndex = 5;
    });
  }

  loadMore(): void {
    if (this.disableBtn) return;
    const endIndex = Math.min(this.currentIndex + 5, this.imageUrls.length);
    this.newImageBatch(endIndex);
    this.currentIndex = endIndex;
    if (this.currentIndex === this.imageUrls.length) this.disableBtn = true;
  }

  private newImageBatch(end: number): void {
    this.visibleImages = this.visibleImages.concat(
      this.imageUrls.slice(this.currentIndex, end)
    );
  }
}
