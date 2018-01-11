
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
  paid_amount : number;
  full_amount : number;
  prop_type : string;
  flat_studio : string;

  bedrooms : number;
  bathrooms_no : number;
  ext_windows_no : number;
  blinds_no : number;
  curtain_steam_no : number;
  mattress_steam_no : number;
  wall_washing_no : number;
  sofa_clean_no : number;
  carpet_no : number;
  rug : number; 
  balcony : number; 
}