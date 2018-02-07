import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BookingService } from '../../services/booking.service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BookingData } from '../../model/booking-data';
import { filter, flatMap } from 'rxjs/operators';
import { timer } from "rxjs/observable/timer";
import { TOAST_DURATION, TOAST_OFFLINE_MESSAGE, TOAST_POSITION } from "../../config/constants";
import {OfflieDetectionService} from "../../services/offline-detection.service";
import {HomePage} from "../home/home";
import {SplashPage} from "../spalsh/splash";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  public bookingDataObj = {} as BookingData;
  public peymentType = "full";

  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    private offlineDetectionService: OfflieDetectionService,
    private toastController: ToastController,
    private bookingService: BookingService) {}

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
     this.bookingDataObj =  this.bookingService.getBookingDataObj();
     this.bookingDataObj.paid_amount = this.bookingService.getPayValue();
     this.bookingService.setBookingDataObj(this.bookingDataObj);
     this.createANewBooking();
  }

  /**
   * @desc - generate the html page as base64 string to open with InnApp Browser, after open this page redirect to payment gateway
   * @param {string} cartId
   * @param {number} worldpayValue
   * @returns {string}
   */
  private getTheFormContent(cartId: string, worldpayValue: number): string {
    return '<html><head></head><body>'
      + '<form id="myForm" action="https://secure-test.worldpay.com/wcc/purchase" method="POST">'
      + '<meta name="csrf-token" content="ia5ZAHasWnjDT4MtIVk79pySycFNlWG2KBShBBnm">'
      + '<input type="hidden" name="testMode" value="100">'
      + '<input type="hidden" name="instId" value="1179612">'
      + '<input type="hidden" id="cartId" name="cartId" value="' + cartId + '">'
      + '<input id="worldpay-value" type="hidden" name="amount" value="' + worldpayValue + '">'
      + '<input type="hidden" name="currency" value="GBP">'
      + '<input id="pay-btn" type="submit" value="Pay Now">'
      + '</form>'
      + '<script>const load = () => {document.getElementById("myForm").submit();};window.onload = load;</script>'
      + '</body></html>';
  }

  /**
   * return the booking fee
   * @returns {string}
   */
  public getBookingFee(): string {
    return this.bookingService.getBookkingFee();
  }

  /**
   * return the payvalue
   * @returns {any}
   */
  public getPayValue(): any {
    return this.bookingService.getPayValue();
  }

  /**
   * return thr total cart price
   * @returns {any}
   */
  public getTotalCartPrice(): any {
    return this.bookingService.getTotalCart();
  }

  /**
   * Calculate the price discount
   * @returns {any}
   */
  private calCulateDiscount(): any {
    const price = this.bookingService.getTotalCart();
    const discountPrice = (price/100*90).toFixed(2);
    return discountPrice;
  }

  /**
   * cache Personal Information when click on Next button
   */
  public payNow(): void {
    const offline = this.offlineDetectionService.isOnline();

    if (offline) {
      this.showToastMessage();
      return;
    }
    const url = 'data:text/html;base64,' + btoa(this.getTheFormContent(this.bookingDataObj.booking_ref, this.bookingDataObj.paid_amount));
    let browser = this.iab.create(url, "_blank", "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");

    browser.on("exit").subscribe((event) => {
      console.log("bowser has been closed..");
      this.clearTheData();
      this.navCtrl.popToRoot();
    }, err => {
      console.log("Error: ", err);
    });

    this.enableBooking();
  }

  /**
   * Clear the Booking data and.
   */
  private clearTheData(): void {
    this.bookingService.setBookingDataObj(this.bookingService.getBookingInitData());
    this.bookingService.setCartId("");
    this.bookingService.setBookingFee("0.00");
    this.bookingService.setFullAmount("0.00");
    this.bookingService.setPayValue("0.00");
  }

  /**
   * @desc fetch price when toggle chnaged
   * @param type payment type (pull or half)
   */
  public onChangePaymentType(event): void {
    console.log(event);
    this.bookingService.updatePayValue(this.bookingDataObj, event)
      .subscribe((payValue: any) => {
        const value = parseFloat(payValue).toFixed(2);
        this.bookingDataObj.paid_amount = value;
        this.bookingService.setBookingDataObj(this.bookingDataObj);
        this.bookingDataObj = this.bookingService.getBookingDataObj();
        console.log("Booking Data: ", this.bookingDataObj);
      }, err => {
        console.log("Error: ", err);
      });
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToPersonalInfoPage(): void {
    this.navCtrl.pop();
  }

  /**
   * @desc - Create a New Booking
   */
  private createANewBooking(): void {
    this.bookingService.addNewBooking(this.bookingDataObj)
      .subscribe((data: any) => {
        console.log(data);
        if (data && data["ref_id"]) {
          this.bookingService.setCartId(data["ref_id"]);
        }
      }, err => {
        console.log("error: ", err);
      });
  }

  /**
   * show the toast message
   */
  private showToastMessage(): void {
    let toast = this.toastController.create({
      message: TOAST_OFFLINE_MESSAGE,
      duration: TOAST_DURATION,
      position: TOAST_POSITION
    });
    toast.present();
  }

  /**
   * enable the newly created booking
   */
  private enableBooking(): void {
    this.bookingService.enableBooking()
      .subscribe(data => {
        console.log("booking enabled: ", data);
        this.checkingPaymentSuccess();
      }, err => {
        console.log("error: ", err);
      });
  }

  /**
   * Check the Payment has done or not after creating new booking. This execute in every 5 second to check the payment status until success.
   */
  private checkingPaymentSuccess(): void {
    const source = timer(0, 5000);
    const cartId = this.bookingService.getCartId();
    source.pipe(
      flatMap(() => this.bookingService.checkBookingSucessLoop(cartId)),
      filter(data => {
        console.log("Payment pending: ", data);
        return data == 1;
      })
    ).subscribe( data => {
      console.log("Payment Success : ", data);
      this.bookingService.confirmTheBooking(this.bookingDataObj)
        .subscribe(data => {
          console.log("Booking confirmation done")
        }, err => {
          console.log("error: ", err);
        })
    }, err => {
      console.log("error: ", err);
    })
  }
}
