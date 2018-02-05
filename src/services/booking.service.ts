import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";

import { BookingData } from "../model/booking-data";
import { DEMO_BOOKING_URI_PREFIX } from "../config/constants";

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
  constructor(private http: HttpClient) {
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

  /**
   * @desc - get the total cost of the cart in every toggle selection
   * @param bookingDta Booking Data Object
   */
  public getCartTotal(bookingData: BookingData): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;
    const headers = this.getCORSTextHeader();

    let params = new HttpParams();
    params = params.set("type", bookingData.prop_type);
    params = params.set("studio_flat", bookingData.flat_studio);
    params = params.set("bedrooms", bookingData.bedrooms);
    params = params.set("bathrooms", bookingData.bathrooms_no);
    params = params.set("ext_windows", bookingData.ext_windows_no);
    params = params.set("blinds", bookingData.blinds_no);
    params = params.set("curtain", bookingData.curtain_steam_no);
    params = params.set("mattress", bookingData.mattress_steam_no);
    params = params.set("wall_washing", bookingData.wall_washing_no);
    params = params.set("sofa_clean", bookingData.sofa_clean_no);
    params = params.set("carpet_cleaning", bookingData.carpet_no);
    params = params.set("rug", bookingData.rug);
    params = params.set("balcony", bookingData.balcony);
    params = params.set("bf", "true");
    params = params.set("discount", "false");

    return this.http.get(url, {headers, params});
  }

  /**
   * @desc - get the Booking data in payment view
   * @param bookingData Booking Data Object
   */
  public getBookingFee(bookingData: BookingData): Observable <any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;
    const headers = this.getCORSTextHeader();

    let params = new HttpParams();
    params = params.set("type", bookingData.prop_type);
    params = params.set("studio_flat", bookingData.flat_studio);
    params = params.set("bedrooms", bookingData.bedrooms);
    params = params.set("bf", "only");

    return this.http.get(url , {headers, params} );
  }

  /**
   * @desc get the payment value. If payment full then return price with booking fees. If payment is not full return the booking fees only
   * @param bookingData Booking data Object
   * @param paymentType Payment type full or half
   */
  public updatePayValue(bookingData: BookingData, paymentType: string): Observable<any> {
    const url = `${DEMO_BOOKING_URI_PREFIX}/api/price`;
    const headers = this.getCORSTextHeader();
    let params = new HttpParams();

    params = params.set("type", bookingData.prop_type);
    params = params.set("studio_flat", bookingData.flat_studio);
    params = params.set("bedrooms", bookingData.bedrooms);

    if (paymentType === 'full') {
      params = params.set("bathrooms", bookingData.bathrooms_no);
      params = params.set("ext_windows", bookingData.ext_windows_no);
      params = params.set("blinds", bookingData.blinds_no);
      params = params.set("curtain", bookingData.curtain_steam_no);
      params = params.set("mattress", bookingData.mattress_steam_no);
      params = params.set("wall_washing", bookingData.wall_washing_no);
      params = params.set("sofa_clean", bookingData.sofa_clean_no);
      params = params.set("carpet_cleaning", bookingData.carpet_no);
      params = params.set("rug", bookingData.rug);
      params = params.set("balcony", bookingData.balcony);
      params = params.set("bf", "true");
      params = params.set("discount", "false");
      params = params.set("discount", "true");
      params = params.set("vat", "full");
    } else {
      params = params.set("bf", "only");
      params = params.set("vat", "bf");
    }

    return this.http.get(url, {headers, params});
  }

  /**
   * @desc - Create a new booking
   * @param bookingData
   */
  public addNewBooking(bookingData: BookingData): any {
    const urlPrefix = `${DEMO_BOOKING_URI_PREFIX}/api/new`;
    const headers = this.getCORSJSONHeader();
    let params = new HttpParams();

    Object.keys(bookingData).forEach(key => {
      params = params.append(key, bookingData[key]);
    });

    return this.http.get(urlPrefix, {headers, params});
  }

  /**
   * @desc - Enable the newly create booking with given red_id
   * @returns {any}
   */
  public enableBooking(): any {
    const urlPrefix = `${DEMO_BOOKING_URI_PREFIX}/api/booking-enable`;
    const headers = this.getCORSTextHeader();
    let params = new HttpParams();
    params = params.append("ref_id", this.getCartId());
    params = params.append("paid_amount", this._bookingDataObj.paid_amount.toString());

    return this.http.get(urlPrefix, {headers, params, responseType: 'text'});
  }

  /**
   * Check the Payment has been done or not with a given booking id
   * @param {string} cartRefId
   * @returns {Observable<any>}
   */
  public checkBookingSucessLoop(cartRefId: string): Observable<any> {
    const urlPrefix = `${DEMO_BOOKING_URI_PREFIX}/api/booking-status`;
    const headers = this.getCORSJSONHeader();
    let params = new HttpParams();
    params = params.set("ref_id", cartRefId);

    return this.http.get(urlPrefix, {headers, params, responseType: 'text'});
  }

  /**
   * Confirm the booking
   * @param {BookingData} bookingData
   * @returns {Observable<any>}
   */
  public confirmTheBooking(bookingData: BookingData): Observable<any> {
    const urlPrefix = `${DEMO_BOOKING_URI_PREFIX}/api/booking-confirm`;
    const headers = this.getCORSJSONHeader();
    const params = new HttpParams();
    params.set("booking_date", bookingData.booking_date);
    params.set("booking_time", bookingData.booking_time);
    params.set("cust_email", bookingData.email);
    params.set("cust_name", bookingData.cust_name);

    return this.http.get(urlPrefix, {headers, params});
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
    const headers = this.getCORSJSONHeader();
    let params = new HttpParams();
    params = params.set("d", selectedDate);

    return this.http.get(url, {headers, params});
  }
}
