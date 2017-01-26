                      
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

export class ObjectService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getObjectsAll(filter?) {
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
        return this._http.get(this._url + "/object/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getObjectById(objectId) {
        return this._http.get(this._url + "/object/" + objectId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addObject(object) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(object);
        return this._http.post(this._url + "/object/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateObject(object) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(object);
        return this._http.put(this._url + "/object/" + object.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteObject(objectId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/object/" + objectId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get Object records for RuleBookId 
******************************************************************************************************/
	getObjectsForRuleBookId = function (ruleBookId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/object/ruleBook/" + ruleBookId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Object records for ParentListId 
******************************************************************************************************/
	getObjectsForParentListId = function (parentListId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/object/parentList/" + parentListId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

	
	
}