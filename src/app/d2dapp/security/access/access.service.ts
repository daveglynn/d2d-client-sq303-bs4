                      
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

export class AccessService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getAccessAll(filter?) {
        var parms = {};
		var idCode = "";
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
		if (filter && filter.profile && filter.profile.idCode.trim() != "") {
			idCode = filter.profile.idCode.split(":")
            parms['profileId'] = idCode[0];
		};
    	if (filter && filter.company && filter.company.idCode.trim() != "") {
			idCode = filter.company.idCode.split(":")
            parms['companyId'] = idCode[0];
		};
    	if (filter && filter.division && filter.division.idCode.trim() != "") {
			idCode = filter.division.idCode.split(":")
            parms['divisionId'] = idCode[0];
		};
    	if (filter && filter.object && filter.object.idCode.trim() != "") {
			idCode = filter.object.idCode.split(":")
            parms['objectId'] = idCode[0];
		};
    	if (filter && filter.ruleBook && filter.ruleBook.idCode.trim() != "") {
			idCode = filter.ruleBook.idCode.split(":")
            parms['ruleBookId'] = idCode[0];
		};
    	if (filter && filter.parentList && filter.parentList.idCode.trim() != "") {
			idCode = filter.parentList.idCode.split(":")
            parms['parentListId'] = idCode[0];
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
    if (filter && filter.canAdd) {
             parms['canAdd'] = filter.canAdd;
		};
    if (filter && filter.canView) {
             parms['canView'] = filter.canView;
		};
    if (filter && filter.canEdit) {
             parms['canEdit'] = filter.canEdit;
		};
    if (filter && filter.canDelete) {
             parms['canDelete'] = filter.canDelete;
		};
    
		if (filter && filter.orderDir && filter.orderDir.idCode.trim() != "") {
			idCode = filter.orderDir.idCode.split(":")
			parms['orderDir'] = idCode[1];
		};
		if (filter && filter.orderBy && filter.orderBy.idCode.trim() != "") {
			idCode = filter.orderBy.idCode.split(":")
			parms['orderBy'] = idCode[1];
		};

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/access/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getAccessById(accessId) {
        return this._http.get(this._url + "/access/" + accessId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addAccess(access) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(access);
        return this._http.post(this._url + "/access/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateAccess(access) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(access);
        return this._http.put(this._url + "/access/" + access.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteAccess(accessId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/access/" + accessId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get Access records for ProfileId 
******************************************************************************************************/
	getAccessForProfileId = function (profileId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/profile/" + profileId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Access records for CompanyId 
******************************************************************************************************/
	getAccessForCompanyId = function (companyId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/company/" + companyId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Access records for DivisionId 
******************************************************************************************************/
	getAccessForDivisionId = function (divisionId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/division/" + divisionId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Access records for ObjectId 
******************************************************************************************************/
	getAccessForObjectId = function (objectId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/object/" + objectId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Access records for RuleBookId 
******************************************************************************************************/
	getAccessForRuleBookId = function (ruleBookId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/ruleBook/" + ruleBookId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Access records for ParentListId 
******************************************************************************************************/
	getAccessForParentListId = function (parentListId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/access/parentList/" + parentListId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

	
	
}