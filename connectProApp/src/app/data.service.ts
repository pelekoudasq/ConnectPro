import { Injectable } from '@angular/core';
import { User } from '../user';

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
        return this.http.post("http://localhost:3000/api/login", {email: email, password: password});
    }

    getUser(id: string) {
        return this.http.get("http://localhost:3000/api/user/"+id)
            .map(res => res.json())
    }

    registerUser(user: User) {
        return this.http.post("http://localhost:3000/api/register", user);
    }
}
