import { Component, ContentChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookingService } from '../../services/booking.service';
import { Response } from "@angular/http";

import { PaymentPage } from '../payment/payment';
import { BookingData } from '../../model/booking-data';
import { SelectorComponent } from '../../components/selector/selector';

@Component({
  selector: 'page-property-info',
  templateUrl: 'property-info.html'
})
export class PropertyInfoPage {

  @ViewChildren(SelectorComponent) toggleSelectors: QueryList<SelectorComponent>

  public bookingDataObj = {} as BookingData;
  public price = "0";
  public discountPrice = "0";
  public summaryVisible = false;

  constructor(public navCtrl: NavController, private bookingService: BookingService) {}

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
    this.bookingDataObj = this.bookingService.getBookingDataObj();
    this.price = this.bookingService.getTotalCart();
    this.calCulateDiscount(this.price);
  }

  ngAfterViewInit() {
    this.setInitValues();
  }

  /**
   * @desc set initial Booking data values into toogle selectors id exist
   */
  private setInitValues(): void {
    if (this.toggleSelectors) {
      this.toggleSelectors.forEach(selector => {
        const key = selector.getKey();
        if (this.bookingDataObj[key]) {
          if (key === 'prop_type' || key === 'flat_studio') {
            selector.setSelectedOnlyToggle();
          } else {
            selector.setSelectedItem(this.bookingDataObj[key]);
          }
        }
      })
    }
  }

  private updatePrice(): void {
    this.bookingService.getCartTotal(this.bookingDataObj)
      .subscribe((res: Response) => {
        const price: string = res.json();
        this.price = price;
        this.bookingService.setTotalCart(price);
        this.calCulateDiscount(price);
        this.updateBookingFee();
        this.updatePayValue("full");
        console.log("Updated price: ", this.price);
      }, err => {
        console.log("Error: ", err)
      });
  }

  private updateBookingFee(): void {
    this.bookingService.getBookingFee(this.bookingDataObj)
      .subscribe((res: Response) => {
        const bookingFee = res.json();
        this.bookingService.setBookingFee(bookingFee);
        console.log("Booking fee: ", bookingFee);
      }, err => {
        console.log("error getting booking fee: ", err);
      })
  }

  private updatePayValue(paymentType: string): void {
    this.bookingService.updatePayValue(this.bookingDataObj, paymentType)
      .subscribe((res: Response) => {
        const payValue = res.json();
        if (payValue === "full") {
          this.bookingService.setFullAmount(payValue);
        } else {
          this.bookingService.setBookingFee(payValue);
        }
        this.bookingService.setPayValue(payValue);
        console.log("PayeValue", payValue);
      }, err => {
        console.log("error getting payvalue ", err);
      })
  }

  private calCulateDiscount(price: any): void {
    const discountPrice = (price/100*90).toFixed(2);
    this.discountPrice = discountPrice;
  }

  /**
   * On Select the Type
   */
  public onSelectType(event: any): void {
    if (event.selected) {
      this.bookingDataObj.prop_type = event.active.toLowerCase();
    } else {
      this.bookingDataObj.prop_type = event.deActive.toLowerCase();
    }
    this.updatePrice();
    console.log("booking type selected: ", this.bookingDataObj);
  }

  /**
   * On select Flat or Studio
   * @param event
   */
  public onFlatOrStudio(event: any): void {
    if (event.selected) {
      this.bookingDataObj.flat_studio = (event.active === "YES") ? "1" : "0";
    } else {
      this.bookingDataObj.flat_studio = "0";
    }
    this.updatePrice();
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle set the bedroom to zero
   * @param event
   */
  public onToggleBedrooms(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.bedrooms = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle set the Bathroom to zero
   * @param event
   */
  public onToggleBathrooms(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.bathrooms_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleCarpets(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.carpet_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleWindows(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.ext_windows_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleBlinds(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.blinds_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleCurtain(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.curtain_steam_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleMattress(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.mattress_steam_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleWall(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.wall_washing_no = "0";
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
      this.updatePrice();
    }
  }

  /**
   * On Toggle carpets dropdown
   * @param event
   */
  public onToggleSofa(event: any): void {
    if (!event.selected) {
      this.bookingDataObj.sofa_clean_no = "0";
      console.log("After toggle the Sofa: ", this.bookingDataObj);
    }
  }



  /**
   * cache Personal Information when click on Next button
   */
  public savePropertyDataAndRedirectTo(): void {
    if (this.summaryVisible) {
      this.navCtrl.push(PaymentPage)
    } else {
      this.summaryVisible = true;
    }
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToPersonalInfoPage(): void {
    if (!this.summaryVisible) {
      this.navCtrl.pop();
    } else {
      this.summaryVisible = false;
      setTimeout(() => {this.setInitValues();}, 0);
    }


  }
}
