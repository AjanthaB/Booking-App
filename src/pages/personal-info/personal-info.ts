import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

import { PropertyInfoPage } from '../property-info/property-info';

@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html'
})
export class ProsonalInfoPage {

  /**
   * @desc - Angular Form Group to keep personal information
   */
  public _personalInfoForm: FormGroup;


  constructor(public navCtrl: NavController, private authService: BookingService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this.createPersonalIntoForm();
  }

  /**
   * @desc - create an Angular form to add personal details with validations
   */
  private createPersonalIntoForm(): void {
    this._personalInfoForm = new FormGroup({
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
  public savePersonalInfo(): void {
    const formValue = this._personalInfoForm.value;
    console.log("Form Data: ", formValue);
    this.navCtrl.push(PropertyInfoPage);
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToHomePage(): void {
    this.navCtrl.pop();
  }
}