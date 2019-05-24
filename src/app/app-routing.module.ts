import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { 
    path: 'members', 
    canActivate: [AuthGuard],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  { 
    path: 'list', 
    canActivate: [AuthGuard],
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  { 
    path: 'home', 
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
