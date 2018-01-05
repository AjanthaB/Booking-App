import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule }   from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// services
import { BookingService } from "../services/booking.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookingService
  ]
})
export class AppModule {}
