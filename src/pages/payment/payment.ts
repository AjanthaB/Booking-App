import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {


  constructor(public navCtrl: NavController, private authService: BookingService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
    // this.createPersonalIntoForm();
  }

  /**
   * cache Personal Information when click on Next button
   */
  public payNow(): void {
    // this.navCtrl.push()
  }

  /**
   * @desc - back to Home Page
   */
  public redirecToPersonalInfoPage(): void {
    this.navCtrl.pop();
  }
}
