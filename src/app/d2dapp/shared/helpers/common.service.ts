"use strict";

import {Injectable} from "@angular/core";
import {URLSearchParams} from '@angular/http';
import { LocalData } from './common';
import * as _ from 'underscore';

@Injectable()

export class CommonService {

    blankDropDownItem: string = '{"id":0,"parentListId":0,"name":"","code":"","ruleBookId":0}'

    getTokenAsParm() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('signin' + '-' + 'token'));
        return params;
    }

    setParms(urlParms) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('Auth', localStorage.getItem('signin' + '-' + 'token'));

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
        return localStorage.getItem('signin' + '-' + 'token');
    }

    getLocalStorageJsonStringToObject(name) {
        var storageValue = localStorage.getItem(name);
        if (!_.isEmpty(storageValue) && (storageValue != "undefined")) {
            return JSON.parse(localStorage.getItem(name));
        } else { return "" }
    }

    getLocalStorageString(name) {
        var storageValue = localStorage.getItem(name);
        if (!_.isEmpty(storageValue) && (storageValue != "undefined")) {
            return localStorage.getItem(name);
        } else { return "" }
    }

    getLocalStorageNumber(name) {
        var storageValue = localStorage.getItem(name);
        if (!_.isEmpty(storageValue) && (storageValue != "undefined")) {
            return parseInt(localStorage.getItem(name));
        } else { return 0 }
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    saveSigninToLocalStorage(name, localData) {
        _.each(localData, function (element, index, list) {
            localStorage.setItem(name + "-" + String(index), String(element));
        });
    }

    saveJsonStringToLocalStorage(name, localData) {
        if (!_.isEmpty(localData) && (localData != "undefined")) {
            localStorage.setItem(name, JSON.stringify(localData));
        } else { localStorage.setItem(name, ""); }
    }

    saveStringToLocalStorage(name, localData) {
        localStorage.setItem(name, localData);
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

    getAction(path: string) {
        if (path.indexOf("add") > 0) {
            return "add";
        } else if (path.indexOf("edit") > 0) {
            return "edit";
        } else if (path.indexOf("delete") > 0) {
            return "delete";
        } else if (path.indexOf("view") > 0) {
            return "view";
        } else {
            return "";
        }

    }

    getPrevId(current: number) {
        if (current == 0)
            return current;
        else
            current--;
        return current
    }

    getNextId(current: number, length: number) {
        if (current == length - 1)
            return current
        else
            current++;
        return current;
    }

}
