import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/salon/services/dom/dom.service';
import { AdminServices } from '../../services/services/services.service';
import { concatMap, finalize, from, Observable, take } from 'rxjs';
import { Image } from 'src/app/salon/types/image.type';
import { ImageStoreItem } from 'src/app/salon/services/image/image.storeitem';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl } from '@angular/forms';

interface ImageToUpload {
  image: string;
  uploading: boolean;
  uploaded: boolean;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [
    './gallery.component.css',
    '../../../../assets/adminSiteStyles.css',
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeAndSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate(
          '100ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class GalleryComponent implements OnInit {
  fileInput = new FormControl({ value: null, disabled: false });
  openDeleteForm: boolean = false;
  enableUploadBtn: boolean = false;
  disableChooseBtn: boolean = false;
  actionMessage: string = '';
  imageToDelete?: string = '';
  storedImages: Image[];
  selectedFiles: FileList;
  imagesToUpload: ImageToUpload[] = [];

  constructor(
    public domService: DomService,
    private imageStoreItem: ImageStoreItem,
    private adminServices: AdminServices
  ) {
    imageStoreItem.loadImages();
  }

  ngOnInit(): void {
    this.imageStoreItem.images$.subscribe((images) => {
      this.storedImages = images;
    });
  }

  toggleAnimation(image: ImageToUpload): void {
    image.uploading = true;
  }

  toggleComplete(image: ImageToUpload): void {
    image.uploading = false;
    image.uploaded = true;
  }

  testAnimation(): void {
    this.imagesToUpload.splice(0, 1);
  }

  clearFileInput() {
    this.fileInput.setValue(null);
  }

  enableFileInput() {
    this.fileInput.enable();
  }

  disableFileInput() {
    this.fileInput.disable();
  }

  removeImageSequentially() {
    const intervalId = setInterval(() => {
      if (this.imagesToUpload.length > 0) {
        this.imagesToUpload.splice(0, 1); // Remove the first element
      } else {
        this.disableChooseBtn = false;
        this.clearFileInput();
        clearInterval(intervalId); // Stop the interval when the array is empty
      }
    }, 500);
  }

  addToDelete(id?: string): void {
    this.imageToDelete = id;
  }

  toggleDeleteForm(): void {
    this.openDeleteForm = !this.openDeleteForm;
    this.domService.toggleOverflow(this.openDeleteForm);
  }

  onFileSelected($event: any) {
    this.imagesToUpload = [];
    this.selectedFiles = $event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        this.imagesToUpload.push({
          image: imageUrl,
          uploading: false,
          uploaded: false,
        });
      };

      reader.readAsDataURL(file);
    }
    this.enableUploadBtn = true;
  }

  uploadFile(file: File, image: ImageToUpload): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    this.toggleAnimation(image);
    return this.adminServices.addImage(formData);
  }

  onImageUpload(): void {
    let index = 0;
    const fileUploads = from(this.selectedFiles);
    this.disableFileInput();
    this.enableUploadBtn = false;
    fileUploads
      .pipe(
        concatMap((file) => this.uploadFile(file, this.imagesToUpload[index])),
        finalize(() => {
          this.removeImageSequentially();
          this.enableFileInput();
          this.clearFileInput();
        })
      )
      .subscribe({
        next: (result) => {
          this.toggleComplete(this.imagesToUpload[index]);
          this.actionMessage = `${result.message} ${index + 1} Image(s)`;
          index++;
        },
        error: (error) => {
          this.actionMessage = error.error.message;
        },
        complete: () => {},
      });
  }

  filterImageOut(id?: string): void {
    this.storedImages = this.storedImages.filter((img) => {
      return img._id !== id;
    });
  }

  deleteImage(): void {
    this.adminServices
      .deleteImage(this.imageToDelete)
      .pipe(take(1))
      .subscribe({
        next: (result: any) => {
          this.actionMessage = result.message;
          this.filterImageOut(this.imageToDelete);
          this.toggleDeleteForm();
        },
        error: (e) => {
          this.actionMessage = e.error.message;
        },
      });
  }
}
