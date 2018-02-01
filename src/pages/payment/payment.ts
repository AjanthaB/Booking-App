import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookingService } from '../../services/booking.service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BookingData } from '../../model/booking-data';
import { filter, flatMap } from 'rxjs/operators';
import { interval } from "rxjs/observable/interval";
import { timer } from "rxjs/observable/timer";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {


  private pageContent: string = ``;
  public bookingDataObj = {} as BookingData;
  public peymentType = "full";

  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    private bookingService: BookingService) {}

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
     this.bookingDataObj =  this.bookingService.getBookingDataObj();
     this.bookingDataObj.paid_amount = this.bookingService.getBookkingFee();
     this.bookingService.setBookingDataObj(this.bookingDataObj);
     console.log("Booking data: ", this.bookingDataObj);
    this.createANewBooking();
  }

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

  public getBookingFee(): any {
    return this.bookingService.getBookkingFee();
  }

  public getPayValue(): any {
    return this.bookingService.getPayValue();
  }

  public getTotalCartPrice(): any {
    return this.bookingService.getTotalCart();
  }

  private calCulateDiscount(): any {
    const price = this.bookingService.getTotalCart();
    const discountPrice = (price/100*90).toFixed(2);
    return discountPrice;
  }

  /**
   * cache Personal Information when click on Next button
   */
  public payNow(): void {
    const url = 'data:text/html;base64,' + btoa(this.getTheFormContent(this.bookingDataObj.booking_ref, this.bookingDataObj.paid_amount));
    // const browser: any = this.iab.create(url, "_blank", "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
    // if (browser) {
    //   browser.addEventListener('loaderror', this.loadErrorCallBack);
    //   browser.addEventListener('paymentSubmit', this.onPaymentSubmit);
    // }

    this.enableBooking();
  }

  private loadErrorCallBack(err) {
    console.log(err);
  }

  private onPaymentSubmit(): void {

  }

  /**
   * @desc fetch price when toggle chnaged
   * @param type payment type (pull or half)
   */
  public onChangePaymentType(event): void {
    console.log(event);
    this.bookingService.updatePayValue(this.bookingDataObj, event)
      .subscribe((payValue: any) => {
        this.bookingDataObj.paid_amount = payValue;
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

  private enableBooking(): void {
    this.bookingService.enableBooking()
      .subscribe(data => {
        console.log("booking enabled: ", data);
        // this.checkingPaymentSuccess();
      }, err => {
        console.log("error: ", err);
      });
  }

  /**
   * Check the Payment has done after creating new booking. This execute in every 5 second to check the payment status until success.
   */
  private checkingPaymentSuccess(): void {
    const source = timer(0, 5000);
    source.pipe(
      flatMap(() => this.bookingService.checkBookingSucessLoop(this.bookingService.getCartId())),
      filter(data => {
        return data === 1;
      })
    ).subscribe( data => {
      console.log("Payment Sucess : ", data);
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
