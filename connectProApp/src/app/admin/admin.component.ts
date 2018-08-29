import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    currentUser: User;
    users: User[];

    constructor(private router: Router, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.dataService.getUsers()
            .subscribe(res => this.users = res);
    }

}
