import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';
import { EnvironmentHelper } from '../../environments/environment';

@Injectable()
export class CensoService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private censoUrls: any;

    constructor(private http: HttpClient, private envHelper: EnvironmentHelper) {
        this.censoUrls = envHelper.urls.censo;
    }

    // return e and n.
    getPublicKey(electionIdentifier: Number): Observable<Object> {
        return this.http.get<Object>(`${this.censoUrls.getPublicKey}/${electionIdentifier}`);
    }

    // return signed_blinded_key
    getVoterId(electionIdentifier: Number, user: User): Observable<String> {
        return this.http.post<String>(`${this.censoUrls.postVoterId}/${electionIdentifier}`, JSON.stringify(user), { headers: this.headers });
    }

    // return blinded_pub_key
    getSignedBlindKey(user: User): Observable<String> {
        return this.http.post<String>(this.censoUrls.getSignedBlindKey, JSON.stringify(user), { headers: this.headers });
    }
}