import { SpalshPage } from './../pages/spalsh/spalsh';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Network } from '@ionic-native/network';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProsonalInfoPage } from '../pages/personal-info/personal-info';
import { PropertyInfoPage } from '../pages/property-info/property-info';
import { PaymentPage } from '../pages/payment/payment';
import { EOTFooterComponent } from '../components/footer/footer';
import { SliderComponent } from '../pages/slider/slider';

// services
import { BookingService } from "../services/booking.service";
import { ComponentsModule } from '../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfflieDetectionService } from '../services/offline-detection.service';
import {ContactPage} from "../pages/contact/contact";
import {CallPage} from "../pages/call/call";
import {QuotePage} from "../pages/quote/quote";
import {ContactService} from "../services/contact.service";
import {QuoteService} from "../services/quote.service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProsonalInfoPage,
    PropertyInfoPage,
    PaymentPage,
    EOTFooterComponent,
    SliderComponent,
    ContactPage,
    CallPage,
    QuotePage,
    SpalshPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    EOTFooterComponent,
    SliderComponent,
    ContactPage,
    CallPage,
    QuotePage,
    SpalshPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookingService,
    InAppBrowser,
    Network,
    OfflieDetectionService,
    ContactService,
    QuoteService
  ]
})
export class AppModule {}
