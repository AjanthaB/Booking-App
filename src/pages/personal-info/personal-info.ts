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
  public timeRangeValues = [{"value":1,"label":"07 AM : 08 AM"},{"value":2,"label":"08 AM : 09 AM"},{"value":3,"label":"09 AM : 10 AM"},{"value":4,"label":"12 PM : 01 PM"},{"value":5,"label":"01 PM : 02 PM"},{"value":6,"label":"02 PM : 03 PM"},{"value":7,"label":"03 PM : 04 PM"},{"value":8,"label":"04 PM : 05 PM"},{"value":9,"label":"05 PM : 06 PM"},{"value":10,"label":"Arrival Time"}];
  public _postcodes = [
    "NW 452 E1",
    "SE 4122 E3",
    "LM 412 S2",
    "UE 4131 G1"
  ];

  constructor(public navCtrl: NavController,
    private bookingService: BookingService) {
  }

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    this._bookingDataObj = this.bookingService.getBookingDataObj();
    if(this._bookingDataObj.booking_time == "" || this._bookingDataObj.booking_time == undefined){
      this._bookingDataObj.booking_time = this.timeRangeValues[0].value.toString();
    }
    this.createPersonalInfoForm();
    this.updatePrice();
  }

  /**
   * @desc - create an Angular form to add personal details with validations
   */
  private createPersonalInfoForm(): void {
    const date = this.calculateDate();

    this._personalInfoForm = new FormGroup({
      date: new FormControl(date, Validators.required),
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
   * @desc - Calculate the date. If current time is grater than 05.00pm date is set as tomorrow, otherwise today.
   * @returns {string}
   */
  private calculateDate(): string {
    let date = "";
    const today = new Date();
    const currentTime = today.toTimeString().substring(0,8);
    const tmpTime = "17:00:00";

    if (currentTime > tmpTime) {
      const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
      date = tomorrow.toISOString().substring(0 ,10);
    } else {
      date = today.toISOString().substring(0 ,10);
    }

    return date;
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
    bookingData.booking_time = (formValue.time != undefined) ? formValue.time.toString() : this._bookingDataObj.booking_time;
    bookingData.cust_name = formValue.name;
    bookingData.postcode = formValue.postCode;
    bookingData.address = formValue.address;
    bookingData.phone = formValue.phoneNum;
    bookingData.email = formValue.email;
    bookingData.cust_comments = formValue.comments;
    console.log(bookingData);
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

  public dateChanged(date: string) {
    this.bookingService.getAvailableTimeSlots(date)
      .subscribe((res) => {
        this.timeRangeValues = res;
        this._bookingDataObj.booking_time = this.timeRangeValues[0].value.toString();
        console.log("time chages")
      },
      (err) => {
        console.log("error getting when get available time slots ", err);
      });
  };
}
