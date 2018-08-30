import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
