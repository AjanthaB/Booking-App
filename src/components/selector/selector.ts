import { Component } from '@angular/core';

/**
 * Generated class for the SelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selector',
  templateUrl: 'selector.html'
})
export class SelectorComponent {

  text: string;
  selected: boolean = false;
  showPopup: boolean = false;
  noText: string = "NO";
  items=["01", "02", "03", "04", "05", "06"]

  constructor() {
    console.log('Hello SelectorComponent Component');
    this.text = 'Hello World';
  }

  clickBtn(){
    this.selected = !this.selected;
    this.showPopup = this.selected;
    if(!this.selected){
      this.noText = "NO";
    }
  }

  clickItem(item: string){
    this.showPopup = false;
    this.noText = item;
  }

}
