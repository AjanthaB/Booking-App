import { SplashPage } from '../pages/spalsh/splash';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Network } from '@ionic-native/network';


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
import { ContactPage } from "../pages/contact/contact";
import { CallPage } from "../pages/call/call";
import { QuotePage } from "../pages/quote/quote";
import { ContactService } from "../services/contact.service";
import { MailService } from "../services/mail.service";
import { BrowserTab } from '@ionic-native/browser-tab';

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
    SplashPage
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
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Network,
    OfflieDetectionService,
    BookingService,
    ContactService,
    MailService,
    BrowserTab
  ]
})
export class AppModule {}
