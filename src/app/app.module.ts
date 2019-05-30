import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmService } from './fcm.service';
import { FormsModule } from '@angular/forms';

const firebase = {
  // your firebase web config
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ''
 }


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: 
    [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     ComponentsModule,
     HttpClientModule,
     IonicStorageModule.forRoot(),
     AngularFireModule.initializeApp(firebase), 
     AngularFirestoreModule,
     FormsModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Firebase,
    FcmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
