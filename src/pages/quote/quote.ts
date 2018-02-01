import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MailService} from "../../services/mail.service";
import {ContactService} from "../../services/contact.service";
import {QuoteDetails} from "../../model/quote";


@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})
export class QuotePage {

  public _quoteForm: FormGroup;
  public _formInvalid: boolean = false;
  public services = [
    "After builders cleaning",
    "Spring cleaning",
    "Carpet cleaning London",
    "Office and commercial cleaning",
    "Regular domestic cleaning"
  ];

  constructor(public navCtrl: NavController, private contactService: ContactService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createQuoteForm();
    // this.mailService.initAndOpenEMailComposer();
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

  public sendQuoteRequest(): void {
    console.log(this._quoteForm.value);
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
          console.log("quote request success: ", data);
          this._quoteForm.reset();
        }, err => {
          console.log("error sending quote:", quote);
        });

    } else {
      console.log("form not valid");
      this._formInvalid = true;
    }
  }
}
