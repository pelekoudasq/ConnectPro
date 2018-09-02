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
    requested: boolean;


    constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
        localStorage.removeItem('searchItem');

    }

    onSearchClick(){
        //console.log('SEARCH CLICKED!');
        localStorage.setItem('searchItem', JSON.stringify(this.search));
        this.router.navigate(['login/search']);
    }

    ngOnInit() {

        console.log('INITIALIZE');
        this.requested = false;

        this.userIdToRequest = this.route.snapshot.params.id;
        //console.log(this.userIdToRequest);
        if (this.userIdToRequest == this.currentUser._id) {
            this.router.navigate(['login/profile']);
        }
        if (this.userIdToRequest){
            this.dataService.getUserObj(this.userIdToRequest)
            .subscribe(res=> {
                this.user = res;
            });
        }

        //check if already requested (or friends kapoia allh stigmi)
        if(this.currentUser && this.user){
        console.log('HERE');
            this.dataService.checkRequested(this.currentUser._id, this.user._id)
                .subscribe(
                    data => {
                        console.log('requested' + data);
                        this.requested = true;
                        (document.getElementById("connect") as HTMLInputElement).value = "Requested";
                    },
                    error => {
                        this.requested = false;
                    }
                );
        }


        this.dataReady = false;
        this.search = '';

    }

    onConnectClick(){
        this.requested = true;
        if(this.user._id){
            this.dataService.requestConnection(this.currentUser._id, this.user._id)
                .subscribe(res=> {
                    console.log(res);
                });
        }
        this.ngOnInit();
    }

}
