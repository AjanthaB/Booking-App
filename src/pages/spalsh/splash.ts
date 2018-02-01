import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-spalsh',
  templateUrl: 'splash.html',
})
export class SplashPage {

  /**
   * @desc - Constructor function
   * @param {NavController} navCtrl
   */
  constructor(public navCtrl: NavController) {}

  /**
   * @desc - Angular lifecycle event
   */
  ionViewDidLoad() {
    // after splash animation finish redirect to home page
    setTimeout(() => {
      this.redirectToHomePage();
    }, 1500);
  }

  /**
   * @desc - Redirect to Home Page
   */
  public redirectToHomePage(): void {
    this.navCtrl.push(HomePage);
  }

}
