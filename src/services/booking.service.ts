import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { BookingData } from "../model/booking-data";
import { Observable } from "rxjs/Observable";
import { DEMO_BOKKING_URI_PREFIX } from "../config/constants";

@Injectable()
export class BookingService {

  private _bookingDataObj = {} as BookingData;

  private requestInfo = {
    personalInfoValid: false
  };

  constructor(private http: Http) {
   this.initPropertyData();
  }

  private initPropertyData() {
    this._bookingDataObj.bedrooms  = 0;
    this._bookingDataObj.bathrooms_no  = 0;
    this._bookingDataObj.ext_windows_no = 0;
    this._bookingDataObj.blinds_no  = 0;
    this._bookingDataObj.curtain_steam_no  = 0;
    this._bookingDataObj.mattress_steam_no = 0;
    this._bookingDataObj.wall_washing_no  = 0;
    this._bookingDataObj.sofa_clean_no = 0;
    this._bookingDataObj.carpet_no  = 0;
    this._bookingDataObj.rug = 0;
    this._bookingDataObj.balcony = 0;
    console.log("Initializing the Property data");
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
    let headers = new Headers();
    // headers.append('Authorization', this.authHeader);
    headers.append('Accept', 'text/plain; charset=utf-8');
    headers.append('Content-Type', 'text/plain; charset=utf-8');
    headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    const urlPrefix = `${DEMO_BOKKING_URI_PREFIX}/api/price`;
    const urlParams = `?type=${bookingDta.prop_type}&studio_flat=${bookingDta.flat_studio}&bedrooms=${bookingDta.bedrooms}`;

    return this.http.get(urlPrefix + urlParams);
  }

  private getCORSTextHeader(): RequestOptions {
    const headers = new Headers();
    headers.append('Accept', 'text/plain; charset=utf-8');
    headers.append('Content-Type', 'text/plain; charset=utf-8');
    headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    return new RequestOptions({ headers: headers });
  }
}