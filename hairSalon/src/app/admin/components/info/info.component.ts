import { Component, OnInit } from '@angular/core';
import { ContactStoreItem } from 'src/app/salon/services/contact/contact.storeitem';
import { ContactInfo } from 'src/app/salon/types/contact.type';
import { ServiceStoreItem } from 'src/app/salon/services/service/service.storeitem';
import { ServiceTwo } from 'src/app/salon/types/serviceTwo.type';
import { AdminServices } from '../../services/services/services.service';
import { DomService } from 'src/app/salon/services/dom/dom.service';
import { map, take } from 'rxjs';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Service } from 'src/app/salon/types/service.type';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css', '../../../../assets/adminSiteStyles.css'],
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
  ],
})
export class InfoComponent implements OnInit {
  contactInfo: ContactInfo;
  services: ServiceTwo[];
  contactEditForm: FormGroup;
  contactFormDisable: boolean = false;
  openDeleteForm: boolean = false;
  openAddForm: boolean = false;
  serviceToDelete?: string;
  actionMessage: string = 'Welcome Back';
  addServiceForm: any = {
    title: '',
    price: null,
    description: '',
  };

  constructor(
    public contactStoreItem: ContactStoreItem,
    public serviceStoreItem: ServiceStoreItem,
    private adminServices: AdminServices,
    public domService: DomService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactStoreItem.contactInfo$.subscribe((info) => {
      this.contactInfo = info;
    });

    this.serviceStoreItem.service$
      .pipe(map((data) => data.map((item) => ({ ...item, isValid: false }))))
      .subscribe((newArray) => (this.services = newArray));

    this.contactEditForm = this.fb.group({
      phone: [
        { value: '5555555555', disabled: true },
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
        ],
      ],
      email: [
        { value: 'default@default.com', disabled: true },
        [Validators.required, Validators.email],
      ],
      address: [{ value: 'not loaded', disabled: true }, Validators.required],
    });
  }

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  get phone(): AbstractControl<any, any> | null {
    return this.contactEditForm.get('phone');
  }

  get email(): AbstractControl<any, any> | null {
    return this.contactEditForm.get('email');
  }

  get address(): AbstractControl<any, any> | null {
    return this.contactEditForm.get('address');
  }

  toggleEnable() {
    this.contactFormDisable = true;
    this.contactEditForm.controls['phone'].enable();
    this.contactEditForm.controls['email'].enable();
    this.contactEditForm.controls['address'].enable();
  }

  toggleDisable() {
    this.contactFormDisable = false;
    this.contactEditForm.controls['phone'].disable();
    this.contactEditForm.controls['email'].disable();
    this.contactEditForm.controls['address'].disable();
  }

  checkValidService(index: number): void {
    const numberRegex = /^\d+$/;
    if (!this.services[index].price) {
      this.services[index].isValid = false;
      return;
    }
    if (
      numberRegex.test(this.services[index].price.toString()) &&
      this.services[index].description &&
      this.services[index].title
    ) {
      this.services[index].isValid = true;
    } else {
      this.services[index].isValid = false;
    }
  }

  onContactUpdate(): void {
    if (this.contactEditForm.invalid) return;

    const contact: ContactInfo = {
      _id: this.contactInfo._id,
      phone: this.contactEditForm.get('phone')?.value,
      email: this.contactEditForm.get('email')?.value,
      address: this.contactEditForm.get('address')?.value,
    };

    this.adminServices
      .updateContact(contact)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.actionMessage = result.message;
        },
        error: (e) => {
          this.actionMessage = e.error.message;
        },
      });

    this.toggleDisable();
  }

  toggleDeleteForm(): void {
    this.openDeleteForm = !this.openDeleteForm;
    this.domService.toggleOverflow(this.openDeleteForm);
  }

  toggleAddForm(): void {
    this.openAddForm = !this.openAddForm;
    this.domService.toggleOverflow(this.openAddForm);
  }

  addToDelete(id?: string): void {
    this.serviceToDelete = id;
  }

  filterDeletedService(id?: string): void {
    this.services = this.services.filter((service) => {
      return service._id !== id;
    });
  }

  addService(form: NgForm): void {
    if (form.invalid) return;
    const service: Service = {
      title: form.value.title,
      price: form.value.price,
      description: form.value.description,
    };
    this.adminServices
      .addService(service)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.actionMessage = result.message;
          const service: ServiceTwo = { ...result.service, isValid: false };
          this.services = [...this.services, service];
        },
        error: (e) => {
          console.log(e);
        },
      });
    this.toggleAddForm();
  }

  deleteService(id?: string): void {
    this.filterDeletedService(id);
    this.adminServices
      .deleteService(id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.actionMessage = result.message;
        },
        error: (e) => {
          this.actionMessage = e.error.message;
        },
      });
    this.toggleDeleteForm();
  }

  onServiceUpdate(id?: string): void {
    const service: ServiceTwo[] = this.services.filter((s) => s._id === id);
    const serviceIndex = this.services.findIndex((s) => s._id === id);

    /* switch this to a service insteade of serviceTwo??? */
    this.adminServices
      .updateService(service[0])
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.actionMessage = result.message;
          this.services[serviceIndex].isValid = false;
        },
        error: (e) => {
          this.actionMessage = e.error.message;
        },
      });
    this.domService.scrollToTop();
  }
}
