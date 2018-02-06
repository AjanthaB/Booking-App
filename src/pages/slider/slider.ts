import { Component, ViewChild } from "@angular/core";
import { Slides } from 'ionic-angular';
import { NavController } from "ionic-angular";

import { ProsonalInfoPage } from "../personal-info/personal-info";
import { BrowserTab } from '@ionic-native/browser-tab';
import {CHAT_URL} from "../../config/constants";

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html'
})
export class SliderComponent {

  /**
   * Slider component
   */
  @ViewChild(Slides) slides: Slides;

  constructor(private navCtrl: NavController,
    private browserTab: BrowserTab) { }

  /**
   * Angular lifecycle event
   */
  ngOnInit() {
    this.startSlider();
  }

  /**
   * Start the Slider
   */
  public startSlider(): void {
    setTimeout(() => {
      this.initSlider();
    }, 3000);
  }

  /**
   * Navigate to the Booking Page
   */
  public toBooking(): void {
    this.navCtrl.push(ProsonalInfoPage);
  }

  /**
   * Initialize Slider component with bellow properties
   */
  public initSlider(): void {
    this.slides.loop = true;
    this.slides.pager = true;
    this.slides.autoplay = 1000;
    this.slides.startAutoplay();
  }

  /**
   * Open the tawk.io chat in a browser tab
   */
  public openChat(): void {
    this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {
        if (isAvailable) {
          this.browserTab.openUrl(CHAT_URL);
        } else {
          console.log("err")
        }
      });
  }
}
