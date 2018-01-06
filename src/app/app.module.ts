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
import { ProsonalInfoPage } from '../pages/personal-info/personal-info';
import { PropertyInfoPage } from '../pages/property-info/property-info';
import { PaymentPage } from '../pages/payment/payment';

// services
import { BookingService } from "../services/booking.service";
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProsonalInfoPage,
    PropertyInfoPage,
    PaymentPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProsonalInfoPage,
    PropertyInfoPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookingService
  ]
})
export class AppModule {}
