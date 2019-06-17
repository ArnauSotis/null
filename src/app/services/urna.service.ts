import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';
import { EnvironmentHelper } from '../../environments/environment';

@Injectable()
export class UrnaService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private urnaUrls: any;

    constructor(private http: HttpClient, private envHelper: EnvironmentHelper) {
        this.urnaUrls = envHelper.urls.urna;
    }

    sendVote(user: User): Observable<String> {
        return this.http.post<String>(this.urnaUrls.sendVote, JSON.stringify(user), { headers: this.headers });
    }

}

