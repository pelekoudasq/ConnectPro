import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    Users: any[];


    rForm: FormGroup;
    post: any;

    firstName: string = '';
    lastName: string = '';
    emailAddress: string = '';
    password: string = '';
    confPassword: string = '';

    userConfirmation: boolean;

    constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {

        this.rForm = fb.group({
            'firstName' : [null, Validators.compose([Validators.required])],
            'lastName' : [null, Validators.compose([Validators.required])],
            'emailAddress' : [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'confPassword' : [null, Validators.compose([Validators.required])]
        });

    }

    ngOnInit() {
        this.firstName = '';
        this.lastName = '';
        this.emailAddress = '';
        this.password = '';
        this.confPassword = '';
        this.userConfirmation = false;
    }

    //database
    addPost(post) {
        this.firstName = post.firstName;
        this.lastName = post.lastName;
        this.emailAddress = post.emailAddress;
        this.password = post.password;
        this.confPassword = post.confPassword;
        var user = new User();

        if (this.checkPasswords() == true){
            console.log('ok passwords');
            this.userConfirmation = true;
            user.firstName = post.firstName;
            user.lastName = post.lastName;
            user.email = post.emailAddress;
            user.password = post.password;
            this.dataService.registerUser(user).subscribe(users => {
                console.log(users);
            });
            setTimeout(() => {
                this.router.navigate(['']);
            }, 2000);
        } else {
            console.log('try again')
            return false;
        }
    }

    checkPasswords(){
        if (this.password === this.confPassword){
            console.log('same password', this.confPassword);
            return true;
            //this.confPassword.setCustomValidity("passwords do not match");
        } else {
            console.log('different password', this.password);
            this.password = '';
            this.confPassword = '';
            return false;
            //this.confPassword.setCustomValidity('');
        }
    }


}
