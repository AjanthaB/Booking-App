import { Component, ViewChild } from "@angular/core";
import { Slides } from 'ionic-angular';
import { NavController } from "ionic-angular";

import { ProsonalInfoPage } from "../personal-info/personal-info";

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html'
})
export class SliderComponent {

  @ViewChild(Slides) slides: Slides;
  
  constructor(private navCtrl: NavController) {
    console.log("Slider component");
  }

  public nextSlide(): void {
    this.slides.loop = true;
    this.slides.pager = true;
    this.slides.autoplay = 1000;
    this.slides.startAutoplay();
  }

  public toBooking(): void {
    this.navCtrl.push(ProsonalInfoPage);
  }
}