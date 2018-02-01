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
  public timeRangeValues = ['07 AM : 08 AM', '08 AM : 09 AM', '09 AM : 10 AM', '12 PM : 01 PM', '01 PM : 02 PM', '03 PM : 04 PM', '04 PM : 05 PM', 'Arrival Time'];

  constructor(public navCtrl: NavController,
    private bookingService: BookingService) {
  }

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this._bookingDataObj = this.bookingService.getBookingDataObj();
    this.createPersonalInfoForm();
    this.updatePrice();
  }

  /**
   * @desc - create an Angular form to add personal details with validations
   */
  private createPersonalInfoForm(): void {
    this._personalInfoForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
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
    console.log(this._personalInfoForm.valid);
    if (!this._personalInfoForm.valid) {
      this._formInvalid = true;
    } else {
      this.setPersonalData(formValue)
      this.navCtrl.push(PropertyInfoPage);
    }
  }

  private setPersonalData(formValue: any): void {
    const bookingData = this.bookingService.getBookingDataObj();
    bookingData.booking_date = formValue.date;  // need to format the date
    bookingData.booking_time = this.timeRangeValues.indexOf(formValue.time).toString();
    bookingData.cust_name = formValue.name;
    bookingData.postcode = formValue.postCode;
    bookingData.address = formValue.address;
    bookingData.phone = formValue.phoneNum;
    bookingData.email = formValue.email;
    bookingData.cust_comments = formValue.comments;
    this.bookingService.setBookingDataObj(bookingData);
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToHomePage(): void {
    this.navCtrl.pop();
  }

  private updatePrice(): void {
    this.bookingService.getCartTotal(this._bookingDataObj)
      .subscribe((price: any) => {
        this.bookingService.setTotalCart(price);
        this.updateBookingFee();
        this.updatePayValue("full");
      }, err => {
        console.log("Error: ", err)
      });
  }

  private updateBookingFee(): void {
    this.bookingService.getBookingFee(this._bookingDataObj)
      .subscribe((price) => {
        this.bookingService.setBookingFee(price);
        console.log("Booking fee: ", price);
      }, err => {
        console.log("error getting booking fee: ", err);
      })
  }

  private updatePayValue(paymentType: string): void {
    this.bookingService.updatePayValue(this._bookingDataObj, paymentType)
      .subscribe((payValue: any) => {
        this.bookingService.setPayValue(payValue);
        console.log("PayValue", payValue);
      }, err => {
        console.log("error getting payValue ", err);
      })
  }
}
