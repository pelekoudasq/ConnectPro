import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searchItem: string;
    currentUser: User;
    users: User[] = [];
    search: string;

    constructor(private router: Router, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!this.currentUser){
                this.router.navigate(['']);
            }

    }

    onSearchClick(){
        console.log('SEARCH CLICKED!');
        localStorage.setItem('searchItem', JSON.stringify(this.search));
        //this.router.navigate(['login/search']);
        this.ngOnInit();
    }

    ngOnInit() {
        this.searchItem = JSON.parse(localStorage.getItem('searchItem'));
            if(!this.searchItem){
                console.log('no search item');
                this.router.navigate(['login/home']);
            }
        console.log(this.searchItem);
        //search in db
        localStorage.removeItem('searchItem');
    }



}
