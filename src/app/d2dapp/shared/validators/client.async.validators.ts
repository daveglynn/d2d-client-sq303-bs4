import {Control} from '@angular/common';
import { Http, Headers } from "@angular/http";

export class AuthAsyncValidators {

    constructor(private http: Http) { }

    //public  alreadyExists(control: Control) {
    //
    //     return new Promise((resolve, reject) => {
    //
    //        this.http.get("http://d2d-demo.herokuapp.com/users/email/" + control.value)
    //        .subscribe(data => {
    //             data = data
    //             if (data) {
    //                 resolve({ alreadyExists: true })
    //             } else {
    //                 resolve(null);
    //             }
    //         });
    // });
    // }

    public alreadyExists(control: Control) {

        return this.http.get("http://d2d-demo.herokuapp.com/users/email/" + control.value)
            .map(res => res.json());
    }








}