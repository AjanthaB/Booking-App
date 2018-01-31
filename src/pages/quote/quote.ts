import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuoteService} from "../../services/quote.service";


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

  constructor(public navCtrl: NavController, private quoteService: QuoteService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createQuoteForm();
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
    console.log(this._quoteForm);
    this._formInvalid = false;
    if (!this._quoteForm.valid) {
      this._formInvalid = true;
    }
    // this.quoteService.sendQuoteRequest();
  }
}
