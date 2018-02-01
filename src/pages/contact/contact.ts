import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDetails } from "../../model/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public _contactForm: FormGroup;
  public _formInvalid = false;

  constructor(public navCtrl: NavController, private contactService: ContactService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createPersonalIntoForm();
    // this.mailService.initAndOpenEMailComposer();
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
          console.log("contact request success:", data);
          this._contactForm.reset();
        }, err => {
          console.log("error sending contact request: ", err);
        });
    } else {
      console.log("form invalid: ");
      this._formInvalid = true;
    }
  }
}
