import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    ProfileComponent,
    HomeComponent,
    NetworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
