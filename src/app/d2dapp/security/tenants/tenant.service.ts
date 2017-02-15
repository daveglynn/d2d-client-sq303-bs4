                      
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

export class TenantService {

    private _url = this._cs.serverUrl;

    constructor(private _cs: ConstantsService, private _commonService: CommonService,private _http: Http){
	}

    getTenantsAll(filter?) {
        var parms = {};
		var idCode = "";
        if (filter && filter.q) {
            parms['q'] = filter.q;
        }
	  	if (filter && filter.active) {
             parms['active'] = filter.active;
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
        return this._http.get(this._url + "/tenant/all", { search: this._commonService.setParms(parms) })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    getTenantById(tenantId) {
        return this._http.get(this._url + "/tenant/" + tenantId, { search: this._commonService.getTokenAsParm() })
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()))
	}

    addTenant(tenant) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(tenant);
        return this._http.post(this._url + "/tenant/", body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    updateTenant(tenant) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(tenant);
        return this._http.put(this._url + "/tenant/" + tenant.id, body, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
	}
    
    deleteTenant(tenantId) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this._url + "/tenant/" + tenantId, { headers: headers, search: this._commonService.getTokenAsParm() })
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))

    }
  	
	
	
}