import { Component } from "@angular/core";

@Component({
  selector: 'nav-state',
  templateUrl: 'state.html'
})
export class StateComponent {

  constructor() {
    console.log("State Component Initialization");
  }
}