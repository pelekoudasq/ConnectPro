//imports
import { Component } from '@angular/core';

//component decorator, specify
@Component({
  selector: 'app-root',
  //define where html template located
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//all the logic is
export class AppComponent {
  title = 'app';
}

//new Component
//cmd: ng generate component $name
//or: ng g c $name
//
