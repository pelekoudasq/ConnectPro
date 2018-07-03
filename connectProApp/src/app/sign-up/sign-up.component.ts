import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    password: any = document.getElementById("pwrd1");
    confPassword: any = document.getElementById("pwrd2");
    constructor() { }

    ngOnInit() {
    }

    checkPasswords(){
        if (this.password != this.confPassword){
            this.confPassword.setCustomValidity("passwords do not match");
        } else {
            this.confPassword.setCustomValidity('');
        }
    }


}
