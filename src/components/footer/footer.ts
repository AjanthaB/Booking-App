import { Component } from "@angular/core";

@Component({
  selector: 'eot-footer',
  templateUrl: 'footer.html',
  styles: ['footer.scss']
})
export class EOTFooterComponent {

  constructor() {
    console.log("State Component Initialization");
  }
}
