import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookingService } from '../../services/booking.service';

import { PaymentPage } from '../payment/payment';
import { BookingData } from '../../model/booking-data';

@Component({
  selector: 'page-property-info',
  templateUrl: 'property-info.html'
})
export class PropertyInfoPage {


  private bookingDataObj = {} as BookingData;


  constructor(public navCtrl: NavController, private bookingService: BookingService) {}

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
    this.bookingDataObj = this.bookingService.getBookingDataObj();
    console.log(this.bookingDataObj);
  }

  /**
   * On Select the Type
   */
  public onSelectType(event: any): void {
    if (event.selected) {
      this.bookingDataObj.prop_type = event.active;
    } else {
      this.bookingDataObj.prop_type = event.deActive;
    }
    console.log("booking type selected: ", this.bookingDataObj);
  }

  /**
   * On select Flat or Studio
   * @param event
   */
  public onFlatOrStudio(event: any): void {
    if (event.selected) {
      this.bookingDataObj.flat_studio = event.active;
    } else {
      this.bookingDataObj.flat_studio = event.deActive;
    }
    console.log("Flat or Studio selected: ", this.bookingDataObj);
  }

   /**
   * On select Bedrooms
   * @param event
   */
  public onSelectBedrooms(event: any): void {
    if (event.selected) {
      this.bookingDataObj.bedrooms = event.deActive;
      console.log("After select the bed rooms: ", this.bookingDataObj);
    }
  }

  /**
   * On Toggle set the bedroom to zero
   * @param event 
   */
  public onToggleBedrooms(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.bedrooms = 0;
      console.log("After toggle the bed rooms: ", this.bookingDataObj);
    }
  }

  /**
   * On select the Bathrooms
   * @param event 
   */
  public onSelectBathRooms(event: any): void {
    if (event.selected) {
      this.bookingDataObj.bathrooms_no = event.deActive;
      console.log("After toggle the bathrooms: ", this.bookingDataObj);
    }
  }

  /**
   * On Toggle set the Bathroom to zero
   * @param event 
   */
  public onToggleBathrooms(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.bathrooms_no = 0;
      console.log("After toggle the bath rooms: ", this.bookingDataObj);
    }
  }

  /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectCatpets(event: any): void {
    if (event.selected) {
      this.bookingDataObj.carpet_no = event.deActive;
      console.log("After select the carpers", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleCarpets(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.carpet_no = 0;
      console.log("After toggle the carrpets: ", this.bookingDataObj);
    }
  }

  /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectWindows(event: any): void {
    if (event.selected) {
      this.bookingDataObj.ext_windows_no = event.deActive;
      console.log("After select the windows", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleWindows(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.ext_windows_no = 0;
      console.log("After toggle the windows: ", this.bookingDataObj);
    }
  }

   /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectBlinds(event: any): void {
    if (event.selected) {
      this.bookingDataObj.blinds_no = event.deActive;
      console.log("After select the Blinds", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleBlinds(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.blinds_no = 0;
      console.log("After toggle the Blinds: ", this.bookingDataObj);
    }
  }

   /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectCurtain(event: any): void {
    if (event.selected) {
      this.bookingDataObj.curtain_steam_no = event.deActive;
      console.log("After select the Curtain", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleCurtain(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.curtain_steam_no = 0;
      console.log("After toggle the Curtain: ", this.bookingDataObj);
    }
  }

  /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectMattress(event: any): void {
    if (event.selected) {
      this.bookingDataObj.mattress_steam_no = event.deActive;
      console.log("After select the Matttress", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleMattress(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.mattress_steam_no = 0;
      console.log("After toggle the Mattress: ", this.bookingDataObj);
    }
  }

  /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectWall(event: any): void {
    if (event.selected) {
      this.bookingDataObj.wall_washing_no = event.deActive;
      console.log("After select the Wall", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleWall(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.wall_washing_no = 0;
      console.log("After toggle the Mattress: ", this.bookingDataObj);
    }
  }

  /**
   * On Select carpets dropdown
   * @param event 
   */
  public onSelectSofa(event: any): void {
    if (event.selected) {
      this.bookingDataObj.sofa_clean_no = event.deActive;
      console.log("After select the Sofa", this.bookingDataObj);
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event 
   */
  public onToggleSofa(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.sofa_clean_no = 0;
      console.log("After toggle the Sofa: ", this.bookingDataObj);
    }
  }

  

  /**
   * cache Personal Information when click on Next button
   */
  public savePropertyDataAndRedirectTo(): void {
    this.navCtrl.push(PaymentPage)
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToPersonalInfoPage(): void {
    this.navCtrl.pop();
  }
}
