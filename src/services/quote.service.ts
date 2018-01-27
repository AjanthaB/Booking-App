import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Send the quote details to backend
   * @returns {Observable<any>}
   */
  public sendQuoteRequest(): Observable<any> {
    const prefixURL = "";
    return this.httpClient.get(prefixURL);
  }
}
