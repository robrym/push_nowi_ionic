import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public tokensito:any;
  public items:any;
  public estatus:string = '';
  result:any= [];
  data: Observable<any>;
  constructor( 
    public http: HttpClient,
    public toastController: ToastController, 
    private authService: AuthenticationService,
    private platform: Platform,
    private fcm: FCM,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.platform.is('cordova')) {


      this.fcm.subscribeToTopic('people');

      this.fcm.getToken().then(token => {
        console.log(token);
        this.tokensito = token;  
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.tokensito = token;
      });

      // this.fcm.unsubscribeFromTopic('marketing');
    } else {
      // You're testing in browser, do nothing or mock the plugins' behaviour.
      //
      // var url: string = 'assets/mock-images/image.jpg';
    }
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }
  async login() {
    this.authService.login();
  }
  postData(nombre,correo,telefono,deviceToken){
    
    if(nombre==undefined  || correo==undefined  || telefono==undefined )
    alert("Porfavor llene todos los campos");
    else{
      var url = "http://nowipicks.com/push/ios/api.php?nombre="+nombre+"&telefono="+telefono+"&correo="+correo;
      let postData = new FormData();
      //postData.append('nombre','Robert');
      //postData.append('telefono','+0960349050');
      //postData.append('correo','itsrobrym@gmail.com');
      this.data = this.http.post(url, postData);
      this.data.subscribe(data =>{
        console.log(data.data.children[0]);
       var mensaje = this.estatus = data.data.children[0].estatus_text;
       var estatusReg = this.estatus = data.data.children[0].estatus;
       this.presentToast(mensaje);

       if(estatusReg === '1'){
   
        this.login();
       }
      })
    }
   
  }

}
