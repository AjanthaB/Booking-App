import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookingService } from '../../services/booking.service';
import { PropertyInfoPage } from '../property-info/property-info';
import { BookingData } from '../../model/booking-data';
import {
  DEFAULT_POST_CODES, DEFAULT_TIME_RANGE_VALUES, TOAST_DURATION, TOAST_OFFLINE_MESSAGE,
  TOAST_POSITION
} from "../../config/constants";
import {OfflieDetectionService} from "../../services/offline-detection.service";

import * as momentTimeZone from "moment-timezone";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html'
})
export class ProsonalInfoPage {

  /**
   * @desc - Angular Form Group to keep personal information
   */
  public _personalInfoForm: FormGroup;
  private _bookingDataObj = {} as BookingData;
  public timeRangeValues = DEFAULT_TIME_RANGE_VALUES;
  public _postcodes = DEFAULT_POST_CODES;
  public _formInvalid: boolean = false;
  public isDateAvailable = true;
  public _minDay = ""

  constructor(public navCtrl: NavController,
    private toastController: ToastController,
    private offlineDetectionService: OfflieDetectionService,
    private bookingService: BookingService) {
  }

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
    momentTimeZone.tz.setDefault("Europe/London");
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
    this.dateChanged(date);

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
    const today = momentTimeZone();
    const londonTime  = today.format("HH:mm:ss");
    const tmpTime = "17:30:00";
    
    if (londonTime > tmpTime) {
      const tomorrow = today.add(1, 'days');
      date = tomorrow.format("YYYY-MM-DD");
      this._minDay = today.add(2, 'days').format("YYYY-MM-DD").toString();
    } else {
      date = today.format("YYYY-MM-DD");
      this._minDay = today.format("YYYY-MM-DD").toString();
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
      Object.keys(this._personalInfoForm.controls).forEach(field => {
        const control = this._personalInfoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.setPersonalData(formValue);
      const offline = this.offlineDetectionService.isOnline();
      if (offline) {
        this.showToastMessage(TOAST_OFFLINE_MESSAGE, 'toast-offline');
      }
      this.navCtrl.push(PropertyInfoPage);
    }
  }

  /**
   * @desc - assign form values to Booking Date Object
   * @param formValue
   */
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
    this.bookingService.setBookingDataObj(bookingData);
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToHomePage(): void {
    this.navCtrl.pop();
  }

  /**
   * show the toast message
   */
  private showToastMessage(message: string, cssClass: string): void {
    let toast = this.toastController.create({
      message: message,
      duration: TOAST_DURATION,
      position: TOAST_POSITION,
      cssClass
    });
    toast.present();
  }

  private updatePrice(): void {
    this.bookingService.getCartTotal(this._bookingDataObj)
      .subscribe((price: any) => {
        const cartPrice = parseFloat(price);
        this.bookingService.setTotalCart(cartPrice.toFixed(2));
        this.updateBookingFee();
        this.updatePayValue("full");
      }, err => {
        console.log("Error: ", err);
      });
  }

  private updateBookingFee(): void {
    this.bookingService.getBookingFee(this._bookingDataObj)
      .subscribe((price) => {
        const bookingFee = parseFloat(price);
        this.bookingService.setBookingFee(bookingFee.toFixed(2));
      }, err => {
        console.log("error getting booking fee: ", err);
      })
  }

  private updatePayValue(paymentType: string): void {
    this.bookingService.updatePayValue(this._bookingDataObj, paymentType)
      .subscribe((payValue: any) => {
        const value = parseFloat(payValue);
        this.bookingService.setPayValue(value.toFixed(2));
      }, err => {
        console.log("error getting payValue ", err);
      })
  }

  /**
   * @desc - fetch available time slots for selected date
   * @param {string} date
   */
  public dateChanged(date: string) {
    this.bookingService.getAvailableTimeSlots(date)
      .subscribe((res) => {
        this.timeRangeValues = res;
        this._bookingDataObj.booking_time = this.timeRangeValues[0].value.toString();
      },
      (err) => {
        console.log("error when getting available time slots ", err);
      });

    this.bookingService.checkAvailablityOfDate(date)
      .subscribe((res) => {
        if (res && res.status == "0") {
          this.showToastMessage("This Date is not Available.", 'toast-offline');
          this.isDateAvailable = false;
        } else {
          this.isDateAvailable = true;
        }
      },
      (err) => {
        console.log(err);
      });
  };
}
