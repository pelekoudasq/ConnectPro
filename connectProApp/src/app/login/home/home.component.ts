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
    dataReady: boolean;
    search: string;


    constructor(private router: Router, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser){
            this.router.navigate(['']);
        }
        localStorage.removeItem('searchItem');
    }

    onSearchClick(){
        console.log('SEARCH CLICKED!');
        localStorage.setItem('searchItem', JSON.stringify(this.search));
        this.router.navigate(['login/search']);
    }

    ngOnInit() {
        this.dataReady = false;
        this.content = '';
        this.search = '';

        //console.log('GET POSTS');
        this.dataService.getPosts()
            .subscribe(res =>{
                this.posts = res;
                this.getNames();
                this.dataReady = true;
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
        //console.log('GET NAMES');
        if (this.posts){
            for (let i = 0; i < this.posts.length; i++){
                if(this.posts[i]){
                    //console.log(this.posts[i].user);
                    this.dataService.getUser(this.posts[i].user)
                    .subscribe(res => {
                        //console.log(res);
                        this.posts[i].userName = res;
                        //console.log(this.posts[i].userName);
                    });
                }
            }
        }
    }

    trackByFn(){

    }

}
