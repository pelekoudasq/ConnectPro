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
    posts: Post[];
    content: string;
    

    constructor(private router: Router, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
    }


    ngOnInit() {
        this.content = '';

        console.log('GET POSTS');
        this.dataService.getPosts()
            .subscribe(res =>{
                this.posts = res;
                this.getNames();
            });


    }

    onClick(){
        var post = new Post();
        post.user = this.currentUser._id;
        post.content = this.content;
        this.content= '';
        post.likes = 0;
        this.dataService.addPost(post)
            .subscribe(
                data => {
                    this.ngOnInit();
                });
        this.ngOnInit();
    }

    getNames(){
        console.log('GET NAMES');
        //setTimeout(() => {
        if (this.posts){
            for (let i = 0; i < this.posts.length; i++){
                if(this.posts[i]){
                    console.log(this.posts[i].user);
                    this.dataService.getUser(this.posts[i].user)
                    .subscribe(res => {
                        console.log(res);
                        this.posts[i].userName = res;
                        console.log(this.posts[i].userName);
                    });
                }
            }
        }
        //}, 500);
    }

    trackByFn(){

    }

}
