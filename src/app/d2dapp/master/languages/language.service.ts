                      
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

export class LanguageService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getLanguagesAll(filter?) {
        var parms = {};
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
		if (filter && filter.ruleBookId) {
            parms['ruleBookId'] = filter.ruleBookId;
		};
    	if (filter && filter.parentListId) {
            parms['parentListId'] = filter.parentListId;
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
    
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/language/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getLanguageById(languageId) {
        return this._http.get(this._url + "/language/" + languageId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addLanguage(language) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(language);
        return this._http.post(this._url + "/language/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateLanguage(language) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(language);
        return this._http.put(this._url + "/language/" + language.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteLanguage(languageId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/language/" + languageId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get Language records by RuleBookId 
******************************************************************************************************/
	getLanguagesByRuleBookId = function (ruleBookId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/language/ruleBook/" + ruleBookId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Language records by ParentListId 
******************************************************************************************************/
	getLanguagesByParentListId = function (parentListId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/language/parentList/" + parentListId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Languages for Dropdown 
******************************************************************************************************/
getListByObject() {
    return this._http.get(this._url + "/language" +"/dropdown", { search: this._commonService.getTokenAsParm() })
        .map(res => res.json())
        .catch(error => Observable.throw(error.json()))
}		
	
}