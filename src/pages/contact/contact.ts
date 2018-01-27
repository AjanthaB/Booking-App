import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ContactService} from "../../services/contact.service";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public _contactForm: FormGroup;

  constructor(public navCtrl: NavController, private contactService: ContactService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createPersonalIntoForm();
  }

  /**
   * @desc - create an Angular form to add contact details with validations
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

  public sendContactRequest(): void {
    console.log(this._contactForm.value);
    // this.contactService.sendContactRequest();
  }
}
