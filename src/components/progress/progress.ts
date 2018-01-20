import {Component, Input} from '@angular/core';

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
  _position = 0;

  @Input()
  set position(position: number) {
      this._position = position;
    console.log(this._position);
  }

  constructor() {
    console.log('Hello ProgressComponent Component');
    this.text = 'Hello World';
  }

}
