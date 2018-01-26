import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})
export class QuotePage {

  constructor(public navCtrl: NavController) {}

  /**
   * Angular lifecyvle event
   */
  ngOnInit() {}
}
