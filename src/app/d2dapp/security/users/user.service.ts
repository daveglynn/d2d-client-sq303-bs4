                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 service layer
******************************************************************************************************/
"use strict";
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { CommonService } from   '../../shared/helpers/common.service';

@Injectable()

export class UserService {

    private _url = this._cs.serverUrl;
 
    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getUsersAll(filter?) {

        var parms = {};
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
		if (filter && filter.language) {
            parms['languageId'] = filter.language.id;
		};
    	if (filter && filter.role) {
            parms['roleId'] = filter.role.id;
		};
    	if (filter && filter.profile) {
            parms['profileId'] = filter.profile.id;
		};
      		if (filter && filter.active) {
             parms['active'] = filter.active;
		};
    
		if (filter && filter.orderDir) {
			parms['orderDir'] = filter.orderDir.code;
		};
		if (filter && filter.orderBy) {
			parms['orderBy'] = filter.orderBy.code;
		};

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/user/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getUserById(userId) {
        return this._http.get(this._url + "/user/" + userId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addUser(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(user);
        return this._http.post(this._url + "/user/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateUser(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(user);
        return this._http.put(this._url + "/user/" + user.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteUser(userId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/user/" + userId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get User records for LanguageId 
******************************************************************************************************/
	getUsersForLanguageId = function (languageId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/user/language/" + languageId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get User records for RoleId 
******************************************************************************************************/
	getUsersForRoleId = function (roleId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/user/role/" + roleId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get User records for ProfileId 
******************************************************************************************************/
	getUsersForProfileId = function (profileId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/user/profile/" + profileId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

    getUserEmail(email) {
        return this._http.get("/user/email/" + email)
           .map(res => res.json())
           .catch(error => Observable.throw(error.json()))
    }	
	
}