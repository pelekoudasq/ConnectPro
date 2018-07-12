import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './login/profile/profile.component';


const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path:'login/profile',
        component: ProfileComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
