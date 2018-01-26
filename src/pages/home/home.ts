import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

import { ProsonalInfoPage } from '../personal-info/personal-info';
import { SliderComponent } from '../slider/slider';
import {ContactPage} from "../contact/contact";
import {CallPage} from "../call/call";
import {QuotePage} from "../quote/quote";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public sliider = SliderComponent;
  public booking = ProsonalInfoPage;
  public contact = ContactPage;
  public call = CallPage;
  public quote = QuotePage;

  /**
   * @desc - handle visibility of personal information form
   */
  public _personalInfoFormVisible = true;


  constructor(public navCtrl: NavController, private authService: BookingService) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {
  }

  /**
   * @desc - Redirect to Personal Info Page
   */
  public redirectToPersonalInfo(): void {
    this.navCtrl.push(SliderComponent);
  }

}
