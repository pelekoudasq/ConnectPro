import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    constructor(private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
    }

    ngOnInit() {
    }

}
