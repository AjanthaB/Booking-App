import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ContactService} from "../../services/contact.service";
import { QuoteDetails } from "../../model/quote";
import { EOT_SERVICES, TOAST_DURATION, TOAST_OFFLINE_MESSAGE, TOAST_POSITION } from "../../config/constants";
import { OfflieDetectionService } from "../../services/offline-detection.service";


@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})
export class QuotePage {

  public _quoteForm: FormGroup;
  public _formInvalid: boolean = false;
  public services = EOT_SERVICES;

  constructor(private contactService: ContactService,
              private toastController: ToastController,
              private offlineDetectionService: OfflieDetectionService) {}

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
    this.createQuoteForm();
  }

  /**
   * @desc - create an Angular form to add quote details with validations
   */
  private createQuoteForm(): void {
    this._quoteForm = new FormGroup({
      name: new FormControl("", Validators.required),
      phone_no: new FormControl("", Validators.required),
      postcode: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      service: new FormControl("", Validators.required)
    });
  }

  private showToastMessage(message: string, cssClass: string): void {
    let toast = this.toastController.create({
      message: message,
      duration: TOAST_DURATION,
      position: TOAST_POSITION,
      cssClass
    });
    toast.present();
  }

  /**
   * create new Quote request
   */
  public sendQuoteRequest(): void {
    const offline = this.offlineDetectionService.isOnline();

    if (offline) {
      this.showToastMessage(TOAST_OFFLINE_MESSAGE, "toast-offline");
      return;
    }

    if (this._quoteForm.valid) {
      this._formInvalid = false;
      const formData = this._quoteForm.value;
      const quote: QuoteDetails = {
        name: formData.name,
        phone: formData.phone_no,
        postcode: formData.postcode,
        address: formData.address,
        service: formData.service
      };

      this.contactService.sendQuoteRequest(formData)
        .subscribe((data: any) => {
          this.showToastMessage('Quote request submitted.', "toast-success");
          this._quoteForm.reset();
        }, err => {
          this.showToastMessage('Quote request field, please try again.', "toast-error");
        });

    } else {
      Object.keys(this._quoteForm.controls).forEach(field => {
        const control = this._quoteForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
