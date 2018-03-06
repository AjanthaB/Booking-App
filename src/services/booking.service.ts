import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { Device } from '@ionic-native/device';
import { HTTP } from "@ionic-native/http";

import { BookingData } from "../model/booking-data";
import { DEMO_BOOKING_URI_PREFIX, API_URI} from "../config/constants";


@Injectable()
export class BookingService {

  /**
   * Object to hold all booking data
   */
  private _bookingDataObj = {} as BookingData;
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
   * Hold the Booking Id
   * @type {string}
   */
  private cartId = "";

  /**
   * Constructor function of the class
   * @param http
   */
  constructor(private http: HttpClient,
              private device : Device,
              private httpNativeClient: HTTP) {
   this.initPropertyData();
  }

  /**
   * @desc - initialize the property data of the booking Object
   */
  private initPropertyData() {
    this._bookingDataObj = this.getBookingInitData();
  }

  public getCartId(): string {
    return this.cartId;
  }

  public setCartId(cartId: string): void {
    this.cartId = cartId;
    this._bookingDataObj.booking_ref = this.cartId;
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
    this._bookingDataObj.full_amount = parseFloat(value);
    this.worldPayValue = value;
  }

  public getFullAmount(): any {
    return this.fullAmount;
  }

  public setFullAmount(value: string): void {
    this._bookingDataObj.full_amount = parseFloat(value);
    this.fullAmount = value
  }
  /**
   * @desc - return dummy Booking Data Object
   */
  public getBookingInitData(): BookingData {
    return {
      booking_ref: "",
      booking_date: "",
      booking_time: "1",
      cust_name: "",
      postcode : "",
      address : "",
      phone : "",
      email : "",
      cust_comments : "",
      paid_amount : 0,
      full_amount : 0,
      prop_type : "flat",
      flat_studio : "0",
      bedrooms: "0",
      bathrooms_no: "0",
      ext_windows_no: "0",
      blinds_no: "0",
      curtain_steam_no: "0",
      mattress_steam_no: "0",
      wall_washing_no: "0",
      sofa_clean_no: "0",
      carpet_no: "0",
      rug: "0",
      balcony: "0"
    };
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

  private getHeadersForNativeHttpClient(): any {
    return {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'X-CSRF-TOKEN': "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U"
    };
  }

  /**
   * @desc - get the total cost of the cart in every toggle selection
   * @param bookingDta Booking Data Object
   */
  public getCartTotal(bookingData: BookingData): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;
    const data = {
      "type": bookingData.prop_type,
      "bedrooms": bookingData.bedrooms,
      "bathrooms": bookingData.bathrooms_no,
      "ext_windows": bookingData.ext_windows_no,
      "blinds": bookingData.blinds_no,
      "curtain": bookingData.curtain_steam_no,
      "mattress": bookingData.mattress_steam_no,
      "wall_washing": bookingData.wall_washing_no,
      "sofa_clean": bookingData.sofa_clean_no,
      "carpet_cleaning": bookingData.carpet_no,
      "rug": bookingData.rug,
      "balcony": bookingData.balcony,
      "bf": "true",
      "discount": "false"
    }

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.get(url, data, headers))
        .map( res => res.data)
    } else {
      const params = this.getParams(data);
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params})
    }
  }

  /**
   * @desc - get the Booking data in payment view
   * @param bookingData Booking Data Object
   */
  public getBookingFee(bookingData: BookingData): Observable <any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;

    const data = {
      type: bookingData.prop_type,
      studio_flat: bookingData.flat_studio,
      bedrooms: bookingData.bedrooms,
      bf: "only"
    };

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();

      return Observable.fromPromise(this.httpNativeClient.get(url, data, headers))
        .map( res => res.data)
    } else {
      const headers = this.getCORSTextHeader();
      const params = this.getParams(data);

      return this.http.get(url, {headers, params})
    }
  }

  /**
   * Create a HttpParams Object with a given object
   * @param data
   * @returns {HttpParams}
   */
  private getParams(data: any): HttpParams {
    let params = new HttpParams();
    Object.keys(data).forEach((key, index) => {
      params = params.set(key, data[key]);
    });

    return params;
  }

  /**
   * @desc get the payment value. If payment full then return price with booking fees. If payment is not full return the booking fees only
   * @param bookingData Booking data Object
   * @param paymentType Payment type full or half
   */
  public updatePayValue(bookingData: BookingData, paymentType: string): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;
    let params = new HttpParams();
    let commonData = {
      "type": bookingData.prop_type,
      "studio_flat": bookingData.flat_studio,
      "bedrooms": bookingData.bedrooms
    };

    let data;

    if (paymentType === 'full') {
      data = Object.assign({}, commonData, {
        "bathrooms": bookingData.bathrooms_no,
        "ext_windows": bookingData.ext_windows_no,
        "blinds": bookingData.blinds_no,
        "curtain": bookingData.curtain_steam_no,
        "mattress": bookingData.mattress_steam_no,
        "wall_washing": bookingData.wall_washing_no,
        "sofa_clean": bookingData.sofa_clean_no,
        "carpet_cleaning": bookingData.carpet_no,
        "rug": bookingData.rug,
        "balcony": bookingData.balcony,
        "bf": "true",
        "discount": "false",
        "vat": "full"
      });

    } else {
      data = Object.assign({}, commonData, {
        "bf": "only",
        "vat": "bf"
      });
    }

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.get(url, data, headers))
        .map( res => res.data)
    } else {
      const params = this.getParams(data);
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params})
    }
  }

  /**
   * @desc - Create a new booking
   * @param bookingData
   */
  public addNewBooking(bookingData: BookingData): any {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/new`;
    let params = this.getParams(bookingData);

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.get(url, bookingData, headers))
        .map( res => JSON.parse(res.data))
    } else {
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params})
    }
  }

  /**
   * @desc - Enable the newly create booking with given red_id
   * @returns {any}
   */
  public enableBooking(): any {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/booking-enable`;
    const data = {
      ref_id: this.getCartId(),
      paid_amount: this._bookingDataObj.paid_amount.toString()
    };

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      headers.responseType = 'text';
      return Observable.fromPromise(this.httpNativeClient.get(url, data, headers))
        .map( res => res.data)
    } else {
      const headers = this.getCORSTextHeader();
      const params = this.getParams(data);
      return this.http.get(url, {headers, params, responseType: 'text'})
    }
  }

  /**
   * Check the Payment has been done or not with a given booking id
   * @param {string} cartRefId
   * @returns {Observable<any>}
   */
  public checkBookingSucessLoop(cartRefId: string): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/booking-status`;

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      headers.responseType = 'text';
      return Observable.fromPromise(this.httpNativeClient.get(url, {ref_id: cartRefId}, headers))
        .map( res => res.data)
    } else {
      let params = new HttpParams();
      params = params.set("ref_id", cartRefId);
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params, responseType: 'text'})
    }
  }

  /**
   * Confirm the booking
   * @param {BookingData} bookingData
   * @returns {Observable<any>}
   */
  public confirmTheBooking(bookingData: BookingData): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/booking-confirm`;
    const data = {
      booking_date: bookingData.booking_date,
      booking_time: bookingData.booking_time,
      cust_email: bookingData.email,
      cust_name: bookingData.cust_name
    };

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      headers.responseType = 'text';
      return Observable.fromPromise(this.httpNativeClient.get(url, data, headers))
        .map( res => res.data)
    } else {
      const params = this.getParams(data);
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params, responseType: 'text'})
    }
  }

  /**
   * @desc - return HttpHeaders for text
   * @returns {HttpHeaders}
   */
  private getCORSTextHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/plain; charset=utf-8');
    headers = headers.append('Content-Type', 'text/plain; charset=utf-8');
    headers = headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");

    return headers;
  }

  /**
   * @desc - return HttpHeaders for json
   * @returns {HttpHeaders}
   */
  private getCORSJSONHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");

    return  headers;
  }

  /**
   * @desc - Fetch available time slot from back-end
   * @param {string} selectedDate
   * @returns {Observable<any>}
   */
  public getAvailableTimeSlots(selectedDate: string): Observable<any>{
    const url = `${DEMO_BOOKING_URI_PREFIX}/available-timeslots`;

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.get(url, {d: selectedDate}, headers))
        .map( res => JSON.parse(res.data))
    } else {
      let params = new HttpParams();
      params = params.set("d", selectedDate);
      const headers = this.getCORSTextHeader();
      return this.http.get(url, {headers, params})
    }
  }

  public checkAvailablityOfDate(selectedDate: string): Observable<any>{
    const url = `${API_URI}/date-checking`;

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.post(url, {date: selectedDate}, headers))
        .map( res => JSON.parse(res.data))
    } else {
      const data = { date: selectedDate};
      const headers = this.getCORSJSONHeader();
      return this.http.post(url, data, {headers});
    }
  }
}
