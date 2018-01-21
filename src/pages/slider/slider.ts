import { Component, ViewChild } from "@angular/core";
import { Slides } from 'ionic-angular';
import { NavController } from "ionic-angular";

import { ProsonalInfoPage } from "../personal-info/personal-info";

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html'
})
export class SliderComponent {

  /**
   * Slider component
   */
  @ViewChild(Slides) slides: Slides;

  constructor(private navCtrl: NavController) {}

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
}
