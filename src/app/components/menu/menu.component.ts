import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,public menuCtrl: MenuController, 
    
    private authService: AuthenticationService,

    public toastController: ToastController, 
    
    ) { }

  ngOnInit() {}
  
  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  verPicks(){
    this.router.navigate(['list']);  
    this.menuCtrl.toggle(); 
  }
  verHome(){
    this.router.navigate(['home']);   
    this.menuCtrl.toggle();
  }

  logout() {
    this.presentToast('Deslogeado del sistema');
    this.authService.logout();
    this.router.navigate(['home']);   
    this.menuCtrl.toggle();
  }

}
