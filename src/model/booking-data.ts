
/**
 * Model for hold Booking Data
 */
export interface BookingData {
  booking_ref: string;
  booking_date: string;
  booking_time: string;
  cust_name: string;
  postcode : string;
  address : string;
  phone : string;
  email : string;
  cust_comments : string;
  paid_amount : number | any;
  full_amount : number;
  prop_type : string;
  flat_studio : string;

  bedrooms : string;
  bathrooms_no : string;
  ext_windows_no : string;
  blinds_no : string;
  curtain_steam_no : string;
  mattress_steam_no : string;
  wall_washing_no : string;
  sofa_clean_no : string;
  carpet_no : string;
  rug : string;
  balcony : string;
}
