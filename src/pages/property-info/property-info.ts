import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-property-info',
  templateUrl: 'property-info.html'
})
export class PropertyInfoPage {

  /**
   * @desc - Angular Form Group to keep personal information
   */
  public _propertylInfoForm: FormGroup;


  constructor(public navCtrl: NavController, private authService: BookingService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    // this.createPersonalIntoForm();
  }

  /**
   * @desc - create an Angular form to add personal details with validations
   */
  private createPersonalIntoForm(): void {
    this._propertylInfoForm = new FormGroup({
      dateTime: new FormControl(new Date(), Validators.required),
      name: new FormControl("", Validators.required),
      postCode: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      phoneNum: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      comments: new FormControl("")
    });
  }

  /**
   * cache Personal Information when click on Next button
   */
  public savePropertyDataAndRedirectTo(): void {
    this.navCtrl.push(PaymentPage)
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToPropertyInfoPage(): void {
    this.navCtrl.pop();
  }
}
