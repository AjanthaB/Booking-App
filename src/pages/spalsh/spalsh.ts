import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SpalshPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-spalsh',
  templateUrl: 'spalsh.html',
})
export class SpalshPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpalshPage');
  }

    /**
   * @desc - Redirect to Personal Info Page
   */
  public redirectToPersonalInfo(): void {
    this.navCtrl.push(HomePage);
  }

}
