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
    dbError: boolean;


    constructor(private dataService: DataService, private router: Router) {

    }

    ngOnInit() {
        this.dbError = false;
        this.dataService.logout();
    }

    dbErrorFound(){
        this.email = '';
        this.password = '';
        this.dbError = true;
    }

    foundUser(){
        this.router.navigate(['login/home']);
    }

    foundAdmin(){
        this.router.navigate(['admin']);
    }

    onClick(){
        //this.email = (<HTMLInputElement>document.getElementById("email")).value;
        //this.password = (<HTMLInputElement>document.getElementById("pswrd")).value;
        console.log(this.email+' '+this.password);
        this.dataService.login(this.email, this.password)
            .subscribe(
                data => {
                    if (data.userType == 'user'){
                        console.log('HERE', data.userType);
                        this.foundUser();
                    }
                    else
                        this.foundAdmin();
                },
                error =>{
                    this.dbErrorFound();
                });
    }

}
