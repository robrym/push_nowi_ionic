import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Cree Variables
  public tokensito3:string;
  public nombre:string;
  public telefono:string;
  public correo:string;
  public tokensito2:any;
  public items:any;
  public estatus:string = '';
  result:any= [];
  data: Observable<any>;
constructor( 
  private menuCtrl: MenuController,
  private router: Router,
  public http: HttpClient,
  public toastController: ToastController, 
  private authService: AuthenticationService,
  private platform: Platform,
  private fcm: FCM,
  private authenticationService: AuthenticationService,
  public storage: Storage
  
  ) {}

  ngOnInit() {

    /*this.obtenerToken().then((result) => {
      this.tokensito2 = result; 
    }*/


//);

//this.authService.checkToken();

this.storage.get('tkn').then((data) => {
      if(data){
        this.tokensito3 = data;
      }else{
        this.tokensito3 = 'Sin Valor';
      }    
    });  
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

  obtenerToken(){
  alert(this.tokensito3);
    
  }

  

  /*async obtenerToken(){
    return await this.storage.get('tkn');
  }*/

   /* async obtenerState(){
      alert(this.authService.isAuthenticated());
    }*/
 
  
  
//Se Envia informacion al api
  postData(nombre,correo,telefono){
// AQUI ESTA EL PPROBLEMA
//this.tokensito2
//AQUI ESTA EL ROLLO
    
    if(nombre==undefined  || correo==undefined  || telefono==undefined )
    alert("Porfavor llene todos los campos");
    else{
     // this.tokensito = this.storage.get('tkn');
      
      var url = "http://nowipicks.com/push/ios/api.php?nombre="+nombre+"&telefono="+telefono+"&correo="+correo+"&tkn="+this.tokensito3;
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
        this.verPicks();
       }

       this.nombre = "";
       this.correo = "";
       this.telefono = "";
      })
    }
   
  }
  verPicks(){
    this.router.navigate(['list']);   
 }



 
}
