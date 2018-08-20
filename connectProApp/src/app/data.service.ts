import { Injectable } from '@angular/core';
import { User } from '../user';
import { map } from 'rxjs/operators';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DataService {


    constructor(private http: Http) {
        console.log('Data Service init')
    }

    getUsers() {
        return this.http.get("http://localhost:3000/api/users")
            .map(res => res.json());
    }

    login(email: string, password: string) {
        return this.http.post("http://localhost:3000/api/login", {email: email, password: password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log('dataService: here');
                if (user) {
                    console.log('dataService: '+user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user['_body']));
                }
                return user;
            }));
    }

    logout() {
       // remove user from local storage to log user out
       localStorage.removeItem('currentUser');
   }

    getUser(id: string) {
        return this.http.get("http://localhost:3000/api/user/"+id)
            .map(res => res.json())
    }

    registerUser(user: User) {
        return this.http.post("http://localhost:3000/api/register", user);
    }
}
