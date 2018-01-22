import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { BookingData } from "../model/booking-data";
import { Observable } from "rxjs/Observable";
import { DEMO_BOKKING_URI_PREFIX } from "../config/constants";

@Injectable()
export class BookingService {

  /**
   * Object to hold all booking data
   */
  private _bookingDataObj = {} as BookingData;
  /**
   * Hold weather states are completed or not
   */
  private stateInfo = {
    personalInfoCompleted: false,
    propertyInfoCompleted: false,
    paymentInfoCompleted: false
  };
  private requestInfo = {
    personalInfoValid: false
  };

  /**
   * Hold the booking fee
   */
  private bookingFee = "0";
  /**
   * Hold the total cart value
   */
  private totalCart = "0";
  /**
   * Hold the wold pay value
   */
  private worldPayValue = "0";
  /**
   * Hold the full amount value
   */
  private fullAmount = "0";

  /**
   * Constructor function of the class
   * @param http
   */
  constructor(private http: Http) {
   this.initPropertyData();
  }

  /**
   * @desc - initialize the property data of the booking Object
   */
  private initPropertyData() {
    this._bookingDataObj = this.getBookingInitData();
  }

  public getBookkingFee(): any {
    return this.bookingFee;
  }

  public setBookingFee(fee: string): void {
    this.bookingFee = fee;
  }

  public getTotalCart(): any {
    return this.totalCart;
  }

  public setTotalCart(price: string): void {
    this.totalCart = price;
  }

  public getPayValue(): any {
    return this.worldPayValue;
  }

  public setPayValue(value: string): void {
    this._bookingDataObj.paid_amount = parseInt(value, 10);
    this.worldPayValue = value;
  }

  public getFullAmount(): any {
    return this.fullAmount;
  }

  public setFullAmount(value: string): void {
    this._bookingDataObj.full_amount = parseInt(value, 10);
    this.fullAmount = value
  }
  /**
   * @desc - return dummy Booking Data Object
   */
  public getBookingInitData(): BookingData {
    return {
      booking_ref: "",
      booking_date: "",
      booking_time: "",
      cust_name: "",
      postcode : "",
      address : "",
      phone : "",
      email : "",
      cust_comments : "",
      paid_amount : 0,
      full_amount : 0,
      prop_type : "flat",
      flat_studio : "",
      bedrooms: "",
      bathrooms_no: "",
      ext_windows_no: "",
      blinds_no: "",
      curtain_steam_no: "",
      mattress_steam_no: "",
      wall_washing_no: "",
      sofa_clean_no: "",
      carpet_no: "",
      rug: "",
      balcony: ""
    };
  }

  /**
   * @desc - set Personal Info Valid
   */
  public setPersonalInforValid(valid = false): void {
    this.requestInfo.personalInfoValid = true;
  }

  /**
   * @desc - BookingData Object to hold booking data
   */
  public getBookingDataObj(): BookingData {
    return this._bookingDataObj;
  }

  /**
   * @desc - BookingData Object to hold booking data
   */
  public setBookingDataObj(bookingDta: BookingData): void {
     this._bookingDataObj = bookingDta;
  }

  public saveBookingData(): Observable<any> {
    const saveUrl = "";
    let headers = new Headers();
    // headers.append('Authorization', this.authHeader);
    headers.append('Accept', 'application/json; charset=utf-8');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    return this.http.post(saveUrl, this._bookingDataObj);
  }

  /**
   * @desc - get the total cost of the cart in every toggle selection
   * @param bookingDta Booking Data Object
   */
  public getCartTotal(bookingDta: BookingData): Observable<Response> {
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/price`;
    const urlParams = `?type=${bookingDta.prop_type}&studio_flat=${bookingDta.flat_studio}`
      + `&bedrooms=${bookingDta.bedrooms}&bathrooms=${bookingDta.bathrooms_no}&ext_windows=${bookingDta.ext_windows_no}&blinds=${bookingDta.blinds_no}`
      + `&curtain=${bookingDta.curtain_steam_no}&mattress=${bookingDta.mattress_steam_no}&wall_washing=${bookingDta.wall_washing_no}&sofa_clean=${bookingDta.sofa_clean_no}`
      + `&carpet_cleaning=${bookingDta.carpet_no}&rug=${bookingDta.rug}&balcony=${bookingDta.balcony}&bf=true&discount=false`;

      return this.http.get(urlPrefix + urlParams, this.getCORSTextHeader());
  }

  /**
   * @desc - get the Booking data in payment view
   * @param bookingDta Booking Data Object
   */
  public getBookingFee(bookingDta: BookingData): Observable <any> {
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/price`;
    const urlParams = `?type=${bookingDta.prop_type}&studio_flat=${bookingDta.flat_studio}&bedrooms=${bookingDta.bedrooms}&bf=only`;

    return this.http.get(urlPrefix + urlParams, this.getCORSTextHeader());
  }

  /**
   * @desc get the payment value. If payment full then return price with booking fees. If payment is not full return the booking fees only
   * @param bookingDta Booking data Object
   * @param paymentType Payment type full or half
   */
  public updatePayValue(bookingDta: BookingData, paymentType: string): Observable<any> {
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/price`;
    let urlParams = ``;
    if (paymentType === 'full') {
      urlParams = `?type=${bookingDta.prop_type}&studio_flat=${bookingDta.flat_studio}`
        + `&bedrooms=${bookingDta.bedrooms}&bathrooms=${bookingDta.bathrooms_no}&ext_windows=${bookingDta.ext_windows_no}&blinds=${bookingDta.blinds_no}`
        + `&curtain=${bookingDta.curtain_steam_no}&mattress=${bookingDta.mattress_steam_no}&wall_washing=${bookingDta.wall_washing_no}&sofa_clean=${bookingDta.sofa_clean_no}`
        + `&carpet_cleaning=${bookingDta.carpet_no}&rug=${bookingDta.rug}&balcony=${bookingDta.balcony}&bf=true&discount=true&vat=full`;
    } else {
      urlParams = `?type=${bookingDta.prop_type}&studio_flat=${bookingDta.flat_studio}&bedrooms=${bookingDta.bedrooms}&bf=only&vat=bf`;
    }

    return this.http.get(urlPrefix + urlParams, this.getCORSTextHeader());
  }

  /**
   * @desc - Create a new booking
   * @param bookingDta
   */
  public addNewBooking(bookingDta: BookingData): Observable<Response> {
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/new`;
    // todo: need to add the parameter cartId
    return this.http.get(urlPrefix, this.getCORSJSONHeader());
  }

  public enableBooking(bookingDta: BookingData): Observable<Response> {
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/booking-enable`;
    // todo: need to add paramaeter cartId
    return this.http.get(urlPrefix, this.getCORSJSONHeader());
  }

  /**
   * @desc - return header for access text type response
   */
  private getCORSTextHeader(): RequestOptions {
    const headers = new Headers();
    headers.append('Accept', 'text/plain; charset=utf-8');
    headers.append('Content-Type', 'text/plain; charset=utf-8');
    headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    return new RequestOptions({ headers: headers });
  }

  private getCORSJSONHeader(): RequestOptions {
    const headers = new Headers();
    headers.append('Accept', 'application/json; charset=utf-8');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    return new RequestOptions({ headers: headers });
  }
}
