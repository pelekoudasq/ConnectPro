import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { AppRoutingModule } from '../../app-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    currentUser: User;
    userIdToRequest: string;
    dataReady: boolean;
    search: string;
    user: User;


    constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
        localStorage.removeItem('searchItem');
        this.userIdToRequest = this.route.snapshot.params.id;
        //console.log(this.userIdToRequest);
        if (this.userIdToRequest == this.currentUser._id) {
            this.router.navigate(['login/profile']);
        }
    }

    onSearchClick(){
        //console.log('SEARCH CLICKED!');
        localStorage.setItem('searchItem', JSON.stringify(this.search));
        this.router.navigate(['login/search']);
    }

    ngOnInit() {
        this.dataReady = false;
        this.search = '';



       if (this.userIdToRequest){
            this.dataService.getUserObj(this.userIdToRequest)
                .subscribe(res=> {
                    this.user = res;
                });
        }
    }

}
