import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-eot',
  templateUrl: 'progress.html'
})
export class ProgressComponent {

  text: string;
  _position = 0;

  /**
   * get the position
   * @param {number} position
   */
  @Input()
  set position(position: number) {
    this._position = position;
  }

  constructor() {
    this.text = '';
  }

}
