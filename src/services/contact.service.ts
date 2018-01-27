import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ContactService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Send the contact details to backend
   * @returns {Observable<any>}
   */
  public sendContactRequest(): Observable<any> {
    const prefixURL = "";
    return this.httpClient.get(prefixURL);
  }
}
