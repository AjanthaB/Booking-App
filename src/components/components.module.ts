import { NgModule } from '@angular/core';
import { SelectorComponent } from './selector/selector';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressComponent } from './progress/progress';
@NgModule({
	declarations: [SelectorComponent,
    ProgressComponent],
	imports: [BrowserModule],
	exports: [SelectorComponent,
    ProgressComponent]
})
export class ComponentsModule {}
