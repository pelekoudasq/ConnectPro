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

    users: User[];
    id: string;
    email: any;
    password: any;

    constructor(private dataService: DataService, private router: Router) {

        this.dataService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    ngOnInit() {
    }

    found(){
        this.router.navigate(['login/profile']);
    }

    findInUsers(){
        for(var i = 0; i < this.users.length; i++){
            if( this.users[i].email == this.email && this.users[i].password == this.password){
                console.log("found");
                this.id = this.users[i]._id.toString();
                console.log(this.id);
                this.dataService.getUser(this.id)
                    .subscribe(users => {
                        console.log(users);
                    });
                this.found();
                break;
            }
        }
    }

    onClick(){
        this.email = (<HTMLInputElement>document.getElementById("email")).value;
        this.password = (<HTMLInputElement>document.getElementById("pswrd")).value;
        console.log('email', this.email, 'pass', this.password);
        this.findInUsers();
    }

}
