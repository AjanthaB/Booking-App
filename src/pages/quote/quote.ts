import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MailService} from "../../services/mail.service";


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

  constructor(public navCtrl: NavController, private mailService: MailService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createQuoteForm();
    this.mailService.initAndOpenEMailComposer();
  }

  /**
   * @desc - create an Angular form to add contact details with validations
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
      const mailBody = `Name: ${this._quoteForm.value.name}<br>`
        + `postCode: ${this._quoteForm.value.postcode}<br>`
        + `Address: ${this._quoteForm.value.address}<br>`
        + `Phone No: ${this._quoteForm.value.phone_no}<br>`
        + `Service: ${this._quoteForm.value.service}`;
      this.mailService.openMail(mailBody);
      this._quoteForm.reset();
    } else {
      console.log("form not valid");
      this._formInvalid = true;
    }
  }
}
