import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './login/profile/profile.component';
import {HomeComponent } from './login/home/home.component';


const routes: Routes = [
    { path: '', component: WelcomePageComponent, data:{requiresLogin: false} },
    { path: 'sign-up', component: SignUpComponent, data:{requiresLogin: false} },
    { path: 'login/profile', component: ProfileComponent, data:{requiresLogin: true} },
    { path: 'login/home', component: HomeComponent, data:{requiresLogin: true} }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
