import { NgModule } from '@angular/core';
import { SelectorComponent } from './selector/selector';
import { BrowserModule } from '@angular/platform-browser';

import { ToggleSelecteComponent } from "./toggle/toggle-select";
@NgModule({
	declarations: [SelectorComponent, ToggleSelecteComponent],
	imports: [BrowserModule],
	exports: [SelectorComponent, ToggleSelecteComponent]
})
export class ComponentsModule {}
