                      
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

export class ItemService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getItemsAll(filter?) {
        var parms = {};
		var idCode = "";
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
		if (filter && filter.list && filter.list.idCode.trim() != "") {
			idCode = filter.list.idCode.split(":")
            parms['listId'] = idCode[0];
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
    
		if (filter && filter.orderDir && filter.orderDir.idCode.trim() != "") {
			idCode = filter.orderDir.idCode.split(":")
			parms['orderDir'] = idCode[1];
		};
		if (filter && filter.orderBy && filter.orderBy.idCode.trim() != "") {
			idCode = filter.orderBy.idCode.split(":")
			parms['orderBy'] = idCode[1];
		};

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.get(this._url + "/item/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getItemById(itemId) {
        return this._http.get(this._url + "/item/" + itemId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addItem(item) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(item);
        return this._http.post(this._url + "/item/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateItem(item) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(item);
        return this._http.put(this._url + "/item/" + item.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteItem(itemId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/item/" + itemId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
/******************************************************************************************************
 Get Item records for ListId 
******************************************************************************************************/
	getItemsForListId = function (listId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/item/list/" + listId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Item records for RuleBookId 
******************************************************************************************************/
	getItemsForRuleBookId = function (ruleBookId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/item/ruleBook/" + ruleBookId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Item records for ParentListId 
******************************************************************************************************/
	getItemsForParentListId = function (parentListId, filter?) {

		var parms = {};
		if (filter && filter.view) {
			parms['view'] = filter.view;
		}
    
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.get(this._url + "/item/parentList/" + parentListId, { search: this._commonService.setParms(parms) })

			.map(res => res.json())
			.catch(error => Observable.throw(error.json()))
	}	
     

/******************************************************************************************************
 Get Item records by List 
******************************************************************************************************/
getListByIdItems(listId,parms?) {

    return this._http.get(this._url + "/item/list/" + listId +"/dropdown",  { search: this._commonService.setParms(parms) })
        .map(res => res.json())
        .catch(error => Observable.throw(error.json()))
}	

/******************************************************************************************************
 Get Item records by Object 
******************************************************************************************************/
getListByObject = function (object, parms?) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this._url + "/" + object + "/dropdown", { search: this._commonService.setParms(parms) })
        .map(res => res.json())
        .catch(error => Observable.throw(error.json()))
}	
	
}