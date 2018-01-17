import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";
import { Network } from '@ionic-native/network';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProsonalInfoPage } from '../pages/personal-info/personal-info';
import { PropertyInfoPage } from '../pages/property-info/property-info';
import { PaymentPage } from '../pages/payment/payment';
import { StateComponent } from '../components/state/state';

// services
import { BookingService } from "../services/booking.service";
import { ComponentsModule } from '../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfflieDetectionService } from '../services/offline-detection.service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProsonalInfoPage,
    PropertyInfoPage,
    PaymentPage,
    StateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProsonalInfoPage,
    PropertyInfoPage,
    PaymentPage,
    StateComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookingService,
    InAppBrowser,
    Network,
    OfflieDetectionService
  ]
})
export class AppModule {}
