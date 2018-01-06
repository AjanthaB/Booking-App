import { NgModule } from '@angular/core';
import { SelectorComponent } from './selector/selector';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
	declarations: [SelectorComponent],
	imports: [BrowserModule],
	exports: [SelectorComponent]
})
export class ComponentsModule {}
