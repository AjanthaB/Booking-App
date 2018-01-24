import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookingService } from '../../services/booking.service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BookingData } from '../../model/booking-data';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {


  private pageContent: string = '<html><head></head><body>'
    + '<form id="myForm" action="https://secure-test.worldpay.com/wcc/purchase" method="POST">'
      + '<meta name="csrf-token" content="ia5ZAHasWnjDT4MtIVk79pySycFNlWG2KBShBBnm">'
      + '<input type="hidden" name="testMode" value="100">'
      + '<input type="hidden" name="instId" value="1179612">'
      + '<input type="hidden" id="cartId" name="cartId" value="BK180">'
      + '<input id="worldpay-value" type="hidden" name="amount" value="199.80">'
      + '<input type="hidden" name="currency" value="GBP">'
      + '<input id="pay-btn" type="submit" value="Pay Now">'
    + '</form>'
    + '<script>const load = () => {document.getElementById("myForm").submit();};window.onload = load;</script>'
    + '</body></html>';

  private pageContentUrl = 'data:text/html;base64,' + btoa(this.pageContent);
  public bookingDataObj = {} as BookingData;
  public peymentType = "full";

  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    private bookingService: BookingService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
   this.bookingDataObj =  this.bookingService.getBookingDataObj();
   this.bookingDataObj.paid_amount = this.bookingService.getBookkingFee();
   this.bookingService.setBookingDataObj(this.bookingDataObj);
   console.log("Booking data: ", this.bookingDataObj);
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
    const browser:any = this.iab.create(this.pageContentUrl, "_blank", "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
    browser.addEventListener('loaderror', this.loadErrorCallBack)
  }

  private loadErrorCallBack(err) {
    console.log(err);
  }

  /**
   * @desc fetch price when toggle chnaged
   * @param type payment type (pull or half)
   */
  public onChangePaymentType(event): void {
    console.log(event);
    this.bookingService.updatePayValue(this.bookingDataObj, event)
      .subscribe((res: Response) => {
        const payValue: any = res.json();
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

  private createANewBooking(): void {
    this.bookingService.addNewBooking(this.bookingDataObj)
  }
}
