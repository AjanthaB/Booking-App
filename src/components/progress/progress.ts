import { Component } from '@angular/core';

/**
 * Generated class for the ProgressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-eot',
  templateUrl: 'progress.html'
})
export class ProgressComponent {

  text: string;

  constructor() {
    console.log('Hello ProgressComponent Component');
    this.text = 'Hello World';
  }

}
