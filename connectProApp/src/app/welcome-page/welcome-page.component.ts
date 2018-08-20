import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../../user';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

    currentUser: User;
    users: User[];
    email: any;
    password: any;

    constructor(private dataService: DataService, private router: Router) {

    }

    ngOnInit() {
    }

    found(){
        this.router.navigate(['login/profile']);
    }

    onClick(){
        this.email = (<HTMLInputElement>document.getElementById("email")).value;
        this.password = (<HTMLInputElement>document.getElementById("pswrd")).value;
        console.log('email', this.email, 'pass', this.password);
        //this.findInUsers();
        this.dataService.login(this.email, this.password)
            .subscribe(
                data => {
                this.found();
            });
        //this.found();
    }

}
