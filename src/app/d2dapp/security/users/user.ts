                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 class layer
******************************************************************************************************/
"use strict";
export class User {
	constructor( 
		public id?: number
		 	,public languageId?: number
		 	,public roleId?: number
		 	,public profileId?: number
		 	,public active?: boolean
		 	,public email?: string
			,public password?: string
	 	 	,public firstName?: string
		 	,public lastName?: string
		 	,public phone?: string
		 	,public addressLine1?: string
		 	,public addressLine2?: string
		 	,public addressLine3?: string
		 	,public addressLine4?: string
		 	,public enabledFrom?: string
		 	,public enabledTo?: string
		  ) { }
}
    
export class Login {
    constructor(public email: string, public password: string) { }
}


import { DropDownItem } from "./../../master/items/item";

export class Search {
    constructor(public profile: DropDownItem, public language: DropDownItem, public role: DropDownItem, public q: string, public orderBy: DropDownItem, public orderDir: DropDownItem) { }
}

	
	
