import { Injectable } from '@angular/core';

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
}
