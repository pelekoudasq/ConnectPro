import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './login/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './login/home/home.component';
import { NetworkComponent } from './login/network/network.component';
import { JobsComponent } from './login/jobs/jobs.component';
import { MessagingComponent } from './login/messaging/messaging.component';
import { NotificationsComponent } from './login/notifications/notifications.component';
import { SearchComponent } from './login/search/search.component';
import { UserComponent } from './login/user/user.component';



const routes: Routes = [
    { path: '', component: WelcomePageComponent, data:{requiresLogin: false} },
    { path: 'sign-up', component: SignUpComponent, data:{requiresLogin: false} },
    { path: 'admin', component: AdminComponent, data:{requiresLogin: true} },
    { path: 'login/profile', component: ProfileComponent, data:{requiresLogin: true} },
    { path: 'login/home', component: HomeComponent, data:{requiresLogin: true} },
    { path: 'login/network', component: NetworkComponent, data:{requiresLogin: true} },
    { path: 'login/jobs', component: JobsComponent, data:{requiresLogin: true} },
    { path: 'login/messaging', component: MessagingComponent, data:{requiresLogin: true} },
    { path: 'login/notifications', component: NotificationsComponent, data:{requiresLogin: true} },
    { path: 'login/search', component: SearchComponent, data:{requiresLogin: true} },
    { path: 'login/user/:id', component: UserComponent, data:{requiresLogin: true} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
