import { Component, ViewChild } from "@angular/core";
import { Slides } from 'ionic-angular';
import { NavController } from "ionic-angular";

import { ProsonalInfoPage } from "../personal-info/personal-info";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html'
})
export class SliderComponent {

  /**
   * Slider component
   */
  @ViewChild(Slides) slides: Slides;

  constructor(private navCtrl: NavController, private inAppBrowser: InAppBrowser,) {}

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

  public openChat(): void {
    // const url = 'data:text/html;base64,' + btoa(this.getTawkPage());
    this.inAppBrowser.create("https://www.end-of-tenancy-london.co.uk/chat/", "_blank", "hidden=no,location=no");
  }

  private getTawkPage(): string {
    return '<html><head></head><body>' +
      '<script type="text/javascript">' +
      'const load = () => {' +
      'var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();' +
      'var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];' +
      's1.async=true;' +
      's1.src="https://embed.tawk.to/5a7291f64b401e45400c9281/default";' +
      's1.charset="UTF-8";' +
      's1.setAttribute("crossorigin","*");' +
      's0.parentNode.insertBefore(s1,s0);' +
      '};' +
      'window.onload = load;' +
      '</script>\n' +
      + '</body></html>';
  }
}
