import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Post } from '../../../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    content: string;

    constructor(private router: Router, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
    }

    ngOnInit() {
        this.content = '';

        this.dataService.getUsers()
            .subscribe(res=> console.log(res));
    }

    onClick(){
        console.log(this.currentUser._id + this.content);
        var post = new Post();
        post.user = this.currentUser._id;
        post.content = this.content;
        post.likes = 0;
        this.dataService.addPost(post)
            .subscribe(
                data => {
                    this.content = '';
                });
    }

}
