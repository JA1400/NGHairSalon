import { Component, OnInit } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { ImageStoreItem } from '../../services/image/image.storeitem';
import { Image } from '../../types/image.type';
import { delay, take, map, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [
    './gallery.component.css',
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
export class GalleryComponent implements OnInit {
  imageUrls: Image[] = [];
  visibleImages: Image[] = [];
  currentIndex: number = 0;
  disableBtn: boolean = false;
  startIndex: number = 0;
  endIndex: number = 3;
  loading: boolean = true;
  reachedEnd: boolean = false;
  totalImages: number = 0;
  initObservable: Subscription;
  constructor(
    public domService: DomService,
    public imageStoreItem: ImageStoreItem
  ) {}

  ngOnInit(): void {
    const loadingTimeout = setTimeout(() => {
      this.loading = false;
    }, 5000);
    this.imageStoreItem
      .loadImages()
      .then(() => {
        this.initObservable = this.imageStoreItem.images$
          .pipe(
            map((images) => {
              this.totalImages = images.length;
              const firstThreeImages = images.slice(
                this.startIndex,
                this.endIndex
              );
              return firstThreeImages;
            })
          )
          .subscribe({
            next: (firstThreeImages) => {
              if (firstThreeImages.length) {
                this.visibleImages = [...firstThreeImages];
                clearTimeout(loadingTimeout);
                this.loading = false;
                this.calculateNextImages();
                this.initObservable.unsubscribe();
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
      })
      .catch((e) => {
        console.log(e);
        this.totalImages = 0;
      });
  }

  addImagesOnScroll(): void {
    if (!this.totalImages) return;
    if (this.reachedEnd) return;
    this.loading = true;
    this.initObservable = this.imageStoreItem.images$
      .pipe(
        take(1),
        delay(500),
        map((images) => {
          const firstThreeImages = images.slice(this.startIndex, this.endIndex);
          return firstThreeImages;
        })
      )
      .subscribe({
        next: (firstThreeImages) => {
          this.visibleImages = [...this.visibleImages, ...firstThreeImages];
          this.loading = false;
          this.calculateNextImages();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  calculateNextImages(): void {
    if (this.reachedEnd) return;

    this.endIndex = Math.min(this.endIndex + 3, this.totalImages);
    this.startIndex = Math.min(this.startIndex + 3, this.endIndex);

    if (this.startIndex === this.endIndex) {
      this.reachedEnd = true;
    }
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
