                      
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

export class RoleService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getRolesAll(filter?) {
        var parms = {};
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
		if (filter && filter.ruleBook && filter.ruleBook.id != 0) {
            parms['ruleBookId'] = filter.ruleBook.id;
		};
    	if (filter && filter.parentList && filter.parentList.id != 0) {
            parms['parentListId'] = filter.parentList.id;
		};
      	if (filter && filter.active) {
             parms['active'] = filter.active;
		};
    if (filter && filter.expired) {
             parms['expired'] = filter.expired;
		};
    if (filter && filter.parent) {
             parms['parent'] = filter.parent;
		};
    
		if (filter && filter.orderDir && filter.orderDir.code != "") {
			parms['orderDir'] = filter.orderDir.code;
		};
		if (filter && filter.orderBy && filter.orderBy.code != "") {
			parms['orderBy'] = filter.orderBy.code;
		};

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/role/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getRoleById(roleId) {
        return this._http.get(this._url + "/role/" + roleId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addRole(role) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(role);
        return this._http.post(this._url + "/role/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateRole(role) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(role);
        return this._http.put(this._url + "/role/" + role.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteRole(roleId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/role/" + roleId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get Role records for RuleBookId 
******************************************************************************************************/
	getRolesForRuleBookId = function (ruleBookId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/role/ruleBook/" + ruleBookId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Role records for ParentListId 
******************************************************************************************************/
	getRolesForParentListId = function (parentListId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/role/parentList/" + parentListId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

	
	
}