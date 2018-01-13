import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

import { PropertyInfoPage } from '../property-info/property-info';
import { BookingData } from '../../model/booking-data';

@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html'
})
export class ProsonalInfoPage {

  /**
   * @desc - Angular Form Group to keep personal information
   */
  public _personalInfoForm: FormGroup;
  public _formInvalid: boolean = false;
  private _bookingDataObj = {} as BookingData;

  constructor(public navCtrl: NavController,
    private bookingService: BookingService) {
  }

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
      date: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
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
    this._formInvalid = false;
    this.setPersonalData(formValue)
    this.navCtrl.push(PropertyInfoPage);
  }

  private setPersonalData(formValue: any): void {
    const bookingData = this.bookingService.getBookingDataObj();
    bookingData.booking_date = formValue.date;  // need to format the date
    bookingData.booking_time = formValue.time; // need to format 
    bookingData.cust_name = formValue.date;
    bookingData.postcode = formValue.postcode;
    bookingData.address = formValue.address;
    bookingData.phone = formValue.phoneNum;
    bookingData.email = formValue.email;
    bookingData.cust_comments = formValue.comments;
    this.bookingService.setBookingDataObj(bookingData);
    console.log("after setting booking data: ", this.bookingService.getBookingDataObj())
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToHomePage(): void {
    this.navCtrl.pop();
  }
}
