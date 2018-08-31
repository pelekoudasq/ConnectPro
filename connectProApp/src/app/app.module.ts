import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { DataService } from './data.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './login/profile/profile.component';
import { HomeComponent } from './login/home/home.component';
import { NetworkComponent } from './login/network/network.component';
import { JobsComponent } from './login/jobs/jobs.component';
import { MessagingComponent } from './login/messaging/messaging.component';
import { NotificationsComponent } from './login/notifications/notifications.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './login/search/search.component';
import { UserComponent } from './login/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    ProfileComponent,
    HomeComponent,
    NetworkComponent,
    JobsComponent,
    MessagingComponent,
    NotificationsComponent,
    AdminComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
      DataService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
