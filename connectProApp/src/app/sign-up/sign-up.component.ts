import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    confPassword: string;

    userConfirmation: boolean;

    constructor() { }

    ngOnInit() {
        this.firstName = '';
        this.lastName = '';
        this.emailAddress = '';
        this.password = '';
        this.confPassword = '';
        this.userConfirmation = false;
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

    onClick(){
        //check email
        if (this.checkPasswords() == true){
            console.log('ok passwords');
            this.userConfirmation = true;
        } else {
            console.log('try again')
        }

    }


}
