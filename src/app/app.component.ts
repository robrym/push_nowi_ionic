import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public tokensito2:any;
  public tokensito:any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    public storage: Storage
  ) {
    this.initializeApp();
  }

 
  initializeApp() {
    //Verifica que la plataforma este lista
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
//subscribe a la persona
      this.fcm.subscribeToTopic('people');
//Obtener Token
      this.fcm.getToken().then(token => {
        //alert("Token Normal:"+token);

        //LocalStorage para SETEAR el token. tkn = > token
        
        if(token){
          this.storage.set('tkn',token);
        }
        //this.tokensito2 = token;
      });

      this.fcm.onNotification().subscribe(data => {
        //alert(data);
        if (data.wasTapped) {
          //alert('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          //alert('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });
//ObtenerToken en Refresh
      this.fcm.onTokenRefresh().subscribe(token => {
        //alert("On Token Refresh:"+token);
        if(token){
          this.storage.set('tkn',token);
          alert('Variable Guardada');
        }
        //this.tokensito2 = token;
      });

      // this.fcm.unsubscribeFromTopic('marketing');
    });
  }
}
/*
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

 

  initializeApp() {

    this.fcm.getToken().then(token => {
      console.log(token);
      alert(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      alert(token);
    });

     this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['register']);
        }
      });

     

     
    });
  }
}*/