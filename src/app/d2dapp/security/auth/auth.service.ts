import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { CommonService } from   '../../shared/helpers/common.service';
import { User, Login } from '../../security/users/user';

import {URLSearchParams} from '@angular/http';

@Injectable()
export class AuthService {
    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http) { }
    private _url = this._cs.serverUrl;

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
         return this._http.post(this._url + '/user', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    } 

    signin(login: Login) {
        const body = JSON.stringify(login);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this._url + '/user/login', body, { headers: headers })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    } 
       
    logout() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + '/user/login', { headers: headers, body: '', search: this._commonService.getTokenAsParm() })
 
           .map(response => response.json())
           .catch(error => Observable.throw(error.json()))
    }

    isLoggedIn() {
          return localStorage.getItem('signin' + '-' + 'token') !== null;
    }


}