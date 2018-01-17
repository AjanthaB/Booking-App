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
    this._bookingDataObj = this.bookingService.getBookingDataObj();
    this.createPersonalIntoForm();
    console.log("on Init")
  }

  /**
   * @desc - create an Angular form to add personal details with validations
   */
  private createPersonalIntoForm(): void {
    this._personalInfoForm = new FormGroup({
      date: new FormControl(this._bookingDataObj.booking_date, Validators.required),
      time: new FormControl(this._bookingDataObj.booking_time, Validators.required),
      name: new FormControl(this._bookingDataObj.cust_name, Validators.required),
      postCode: new FormControl(this._bookingDataObj.postcode, Validators.required),
      address: new FormControl(this._bookingDataObj.address, Validators.required),
      phoneNum: new FormControl(this._bookingDataObj.phone, Validators.required),
      email: new FormControl(this._bookingDataObj.email, Validators.required),
      comments: new FormControl(this._bookingDataObj.cust_comments)
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
    bookingData.cust_name = formValue.name;
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
