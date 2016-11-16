                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 class layer
******************************************************************************************************/
"use strict";
export class Language {
	constructor( 
		public id?: number
		 	,public name?: string
		 	,public code?: string
		 	,public active?: boolean
		 	,public ruleBookId?: number
		 	,public expired?: boolean
		 	,public parent?: boolean
		 	,public parentListId?: number
		  ) { }
}
    
	
	
