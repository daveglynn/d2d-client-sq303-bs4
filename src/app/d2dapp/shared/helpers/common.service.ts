"use strict";
 
import {Injectable} from "@angular/core";
import {URLSearchParams} from '@angular/http';
import { LocalData } from './common';
import * as _ from 'underscore';

@Injectable()

export class CommonService {

    getTokenAsParm() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('token'));
        return params;
    }

    setParms(urlParms) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('token'));

          _.each(urlParms, function (element, index, list) {
              params.append(String(index), String(element));
          });

         //for (var key in urlParms) {
         //    if (urlParms.hasOwnProperty(key)) {
         //        var obj = urlParms[key];
         //        for (var prop in obj) {
         //            if (obj.hasOwnProperty(prop)) {
         //                console.log(key + " = " + obj[prop]);
         //                 params.append(prop, obj[prop]);
         //            }
         //         }
         //    }
         // }


        return params;
    }

   
    
    getToken() {
        return localStorage.getItem('token');
    }


    clearLocalStorage() {
        localStorage.clear();
    }

    setLocalStorage(localData: LocalData) {
        localStorage.setItem('token', localData.token);
        localStorage.setItem('userId', localData.userId);
        localStorage.setItem('firstName', localData.firstName);
        localStorage.setItem('lastName', localData.lastName);
        localStorage.setItem('email', localData.email);
    }


    setMode(componentMode: string, urlMode: string) {

        var runMode = 'display';

       // if ((componentMode == 'workwith') || (componentMode == 'display') || (componentMode == 'select')) {
       //     runMode = componentMode;
       //} else {
       //     runMode = componentMode;
       //     runMode = 'display';
       // }

        if (_.contains(['workwith', 'display', 'select'], componentMode)) {
            runMode = componentMode;
        } else {
            runMode = urlMode;
            if (!_.contains(['workwith', 'display', 'select'], runMode)) {
                runMode = 'display';
            }
        }

        return runMode;
    }

    setModal(componentModal: string, urlModal: string) {

        var runModal = 'false';
      //  if ((componentModal == 'true') || (componentModal == 'false')) {
      //      runModal = componentModal;
      //  } else {
      //      runModal = urlModal;
      //      runModal = 'false';
      //  }

      if (_.contains(['true', 'false'], componentModal)) {
          runModal = componentModal;
      } else {
          runModal = urlModal;
          if (!_.contains(['true', 'false'], runModal)) {
              runModal = 'false';
          }
      }
        return runModal;

    }

    getLocalDate(date: string) {
        var d = new Date(date);
        return d.toISOString().split('.')[0].toString();
    }

    getAction(path:string) {


        if (path.indexOf("add") > 0 ) {
            return "add";
        } else if (path.indexOf("edit") > 0 ) {
            return "edit";
        } else if (path.indexOf("delete") > 0 ) {
            return "delete";
        } else if (path.indexOf("view") > 0 ) {
            return "view";
        } else  {
            return "";
        }
        
    }

}
