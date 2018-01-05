import { Injectable } from "@angular/core";

@Injectable()
export class BookingService {

  private requestInfo = {
    personalInfoValid: false
  };

  constructor() {}

  /**
   * @desc - set Personal Info Valid
   */
  public setPersonalInforValid(valid = false): void {
    this.requestInfo.personalInfoValid = true;
  }
}