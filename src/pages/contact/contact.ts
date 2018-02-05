import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDetails } from "../../model/contact";
import { ContactService } from "../../services/contact.service";
import { OfflieDetectionService } from "../../services/offline-detection.service";
import { TOAST_DURATION, TOAST_OFFLINE_MESSAGE, TOAST_POSITION } from "../../config/constants";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public _contactForm: FormGroup;
  public _formInvalid = false;

  constructor(private toastController: ToastController,
              private offlieDetectionService: OfflieDetectionService,
              private contactService: ContactService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createPersonalIntoForm();
  }

  /**
   * @desc - create an Angular form to add contact details with validations, email validation is added in the template
   */
  private createPersonalIntoForm(): void {
    this._contactForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone_no: new FormControl("", Validators.required),
      postcode: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required),
    });
  }

  private showToast(message: string): void {
    let toast = this.toastController.create({
      message: message,
      duration: TOAST_DURATION,
      position: TOAST_POSITION
    });
    toast.present();
  }

  /**
   * @desc - send Contact details to email composer
   */
  public sendContactRequest(): void {
    const offline = this.offlieDetectionService.isOnline();
    if (offline) {
      this.showToast(TOAST_OFFLINE_MESSAGE);
      return;
    }
    if (this._contactForm.valid) {
      const formValues = this._contactForm.value;
      const contactData: ContactDetails = {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone_no,
        postcode: formValues.postcode,
        message: formValues.message
      };
      this.contactService.sendContactRequest(contactData)
        .subscribe((data: any) => {
          this.showToast('Contact request submitted.');
          this._contactForm.reset();
        }, err => {
          console.log("error sending contact request: ", err);
          this.showToast('Contact request field, please try again');
        });
    } else {
      Object.keys(this._contactForm.controls).forEach(field => {
        const control = this._contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
