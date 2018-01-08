import { Injectable } from "@angular/core";

@Injectable()
export class BookingService {

//   const data: {   
//     booking_ref: booking_ref_val, 
//     booking_date: booking_date_val, 
//     booking_time: booking_time_val, 
//     cust_name: cust_name_val,  
//     postcode : postcode_val,
//     address : address_val,
//     phone : phone_val,
//     email : email_val,
//     cust_comments : cust_comments_val,
//     paid_amount : paid_amount_val,
//     full_amount : full_amount_val,
//     prop_type : prop_type_val,
//     flat_studio : flat_studio_val,

//     bedrooms : bedrooms_val,
//     bathrooms_no : bathrooms_no_val,
//     ext_windows_no : ext_windows_no_val,
//     blinds_no : blinds_no_val,
//     curtain_steam_no : curtain_steam_no_val,
//     mattress_steam_no : mattress_steam_no_val,
//     wall_washing_no : wall_washing_no_val,
//     sofa_clean_no : sofa_clean_no_val,
//     carpet_no : carpet_no_val,
//     rug : rug_val, 
//     balcony : balcony_val 
// }

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