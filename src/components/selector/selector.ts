import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'selector',
  templateUrl: 'selector.html'
})
export class SelectorComponent {

  /**
   * Hold the Lable of the toggle
   */
  _lable = "lable";
  /**
   * Hold the lable value of active state
   */
  _activeLable: string = "YES";
  /**
   * Hold the lable value of deactive state
   */
  _deActiveLable: any = "NO";
  /**
   * Hold the copy of deactive lable value
   */
  _tmpDeActiveLable: any = "NO";
  /**
   * Hold the boolean value to determine toggle and selection
   */
  _toggleOnly: boolean = false;
  text: string;
  selected: boolean = false;
  showPopup: boolean = false;
  _items = [{displayValue: "01", actualValue: "1"}, {displayValue: "02", actualValue: "2"}, {displayValue: "03", actualValue: "3"}];

  @Input()
  set lable(lable: string) {
    if (lable) {
      this._lable = lable;
    }
  }

 @Input()
 set activeLable(lable: string) {
  if (lable) {
    this._activeLable = lable;
  }
 }

 @Input()
 set deActiveLable(lable: string) {
   if (lable) {
     this._deActiveLable = lable;
     this._tmpDeActiveLable = lable;
   }
 }

 @Input()
 set toggleOnly(toggle: boolean) {
   if (toggle == null) {
    this._toggleOnly = false;
   } else {
    this._toggleOnly = toggle;
   }
 }

 @Input()
 set items(items: any[]) {
  if (items) {
    this._items = items;
  }
  // } else { // need to uncomment after remove the harcoded items
  //   this._items = [];
  // }
 }

 @Input()
 set selectedItem(item: string) {
   if (item) {
     this._deActiveLable = item;
     this.selected = true;
     this.showPopup = true;
   }
 }

 @Output()
 onSelectItem = new EventEmitter<any>();

 @Output()
 onToggle = new EventEmitter<any>();

  constructor() {}

  /**
   * @desc - toggle the selection and show the popup
   */
  toggle(): void {
    this.selected = !this.selected;
    if (this.selected) {
      this.showPopup = true;
    } else {
      this.showPopup = false;
      this._deActiveLable = this._tmpDeActiveLable;
    }
    this.emitOnToggle();
  }

  /**
   * @desc - emit data to OnToggle EventEmitter
   */
  private emitOnToggle(): void {
    this.onToggle.emit({active: this._activeLable, 
      deActive: this._deActiveLable, 
      selected: this.selected});
  }

   /**
   * @desc - emit data to OnSelect EventEmitter
   */
  private emitOnSelect(): void {
    this.onSelectItem.emit({active: this._activeLable, 
      deActive: (this._deActiveLable.displayValue) ? this._deActiveLable.displayValue: this._deActiveLable, 
      selected: this.selected});
  }

  /**
   * @desc - select the item from dopdown and 
   * @param item - selected item
   */
  selectItem(item: string): void {
    this.showPopup = false;
    this._deActiveLable = item;
    this.emitOnSelect();
  }
}
