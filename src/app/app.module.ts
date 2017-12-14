import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PaymentPage } from '../pages/payment/payment';
import { Stripe } from '@ionic-native/stripe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GlobalVar } from '../pages/provider/globalvar';

export const firebaseConfig = {  //firebase prod
  apiKey: "AIzaSyA2hmBLG9AcWqUq_KiXUE6UPp9lcf9kd3E",
  authDomain: "kojak-pronos.firebaseapp.com",
  databaseURL: "https://kojak-pronos.firebaseio.com",
  projectId: "kojak-pronos",
  storageBucket: "kojak-pronos.appspot.com",
  messagingSenderId: "509801286196"
};




@NgModule({
  declarations: [
    MyApp,
    HomePage, PaymentPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Retour'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, PaymentPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    InAppPurchase,
    GlobalVar,
    Stripe,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
