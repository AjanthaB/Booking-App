import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { API_URI} from "../config/constants";
import { ContactDetails } from "../model/contact";
import { QuoteDetails } from "../model/quote";
import { Device }  from "@ionic-native/device";
import { HTTP } from "@ionic-native/http";

@Injectable()
export class ContactService {

  constructor(private httpClient: HttpClient,
              private httpNativeClient: HTTP,
              private device: Device) {}

  /**
   * Send the contact details to backend
   * @returns {Observable<any>}
   */
  public sendContactRequest(contactDetails: ContactDetails): Observable<any> {
    const url = `${API_URI}/message-submit`;

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.post(url, contactDetails, headers))
        .map( res => res.data)
    } else {
      const headers = this.getCORSJSONHeader();
      return this.httpClient.post(url, contactDetails, {headers});
    }
  }

  /**
   * Send the Quote details to backend
   * @param quote
   * @returns {Observable<any>}
   */
  public sendQuoteRequest(quote: QuoteDetails): Observable <any> {
    const url = `${API_URI}/quote-request`;

    if (this.device.platform === "iOS") {
      const headers = this.getHeadersForNativeHttpClient();
      return Observable.fromPromise(this.httpNativeClient.post(url, quote, headers))
        .map( res => res.data)
    } else {
      const headers = this.getCORSJSONHeader();
      return this.httpClient.post(url, quote, {headers});
    }
  }

  /**
   * @desc - return the Http Headers for json
   * @returns {HttpHeaders}
   */
  private getCORSJSONHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('X-CSRF-TOKEN', "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U");
    return  headers;
  }

  private getHeadersForNativeHttpClient(): any {
    return {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'X-CSRF-TOKEN': "Du1OJxE82SVMREHqVyBtGOQV2sCZ6BcN7PlqVP7U"
    };
  }
}
