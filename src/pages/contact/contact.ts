import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from "../../services/mail.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public _contactForm: FormGroup;
  public _formInvalid = false;

  constructor(public navCtrl: NavController,
              private mailService: MailService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createPersonalIntoForm();
    this.mailService.initAndOpenEMailComposer();
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

  /**
   * @desc - send Contact details to email composer
   */
  public sendContactRequest(): void {
    console.log(this._contactForm.value);
    if (this._contactForm.valid) {
      this._formInvalid = false;
      console.log("form valid");
      // email body for email composer. This message support limited html tags (if enable isHtml=true in email composer), so we can use them to style the email content.
      const body = `Name: ${this._contactForm.value.name}<br>`
        + `Email: ${this._contactForm.value.email}<br>`
        + `postCode: ${this._contactForm.value.postcode}<br>`
        + `Phone No: ${this._contactForm.value.phone_no}<br><br>`
        + `${this._contactForm.value.message}`;
      this.mailService.openMail(body);
      this._contactForm.reset();
    } else {
      console.log("form invalid: ");
      this._formInvalid = true;
    }
  }
}