import { FormControl } from '@angular/forms';

export class ClientValidators {

    static isEmpty(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {

             if (control.value.trim() == "")
                return { isEmpty: true };
        }
        return null;

    }

    static containsSpace(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value.indexOf(' ') >= 0)
                return { containsSpace: true };
        }
        return null;

    }

    static invalidEmailAddress(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value.trim() != "") {
                if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                    return { invalidEmailAddress: true };
                }
            }
        }
        return null;

    }

    static invalidPassword(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value.trim() != "") {
                if (!control.value.match("^.{6,10}$")) {
                    return { invalidPassword: true };
                }
                if (!control.value.match("[0-9]")) {
                    return { invalidPassword: true };
                }
                if (!control.value.match("[A-Z]")) {
                    return { invalidPassword: true };
                }
                if (!control.value.match("[a-z]")) {
                    return { invalidPassword: true };
                }
            }
        }
        return null;

    }


    static outOfRange50(control: FormControl): { [s: string]: boolean } {
      
        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value != "") {
                if (control.value.length > 50) {
                    return { 'outOfRange50': true };
                }
            }
        }
        return null;

    }

    static dropDownNotSelected(control: FormControl): { [s: string]: boolean } {
        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value != "") {
                if ((control.value == -1) || (control.value == null)) {
                    return { 'dropDownNotSelected': true };
                }
            }
        }
        return null;

    }
    static invalidNumberRange(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (control.value > 2147483647 || control.value < 0) {
                return { 'invalidNumberRange': true };
            }
        }
        return null;

    }

    static invalidNumber(control: FormControl): { [s: string]: boolean } {

        if ((control.dirty == true) || (control.touched == true) || (control.pristine == false)) {
            if (isNaN(parseFloat(control.value)) || isFinite(control.value)) {
                return { 'invalidNumber': true };
            }
        }
        return null;

    }


    //static alreadyExists(test: string, http: Http) {
    //    return new Promise((resolve, reject) => {
    //         //var _http = require('http');
    //          http.get("http://d2d-demo.herokuapp.com/users/email/" + test)
    //            .subscribe(data => {
    //                data = data
    //                if (data) {
    //                     resolve({ alreadyExists: true })
    //                } else {
    //                    resolve(null);
    //                }
    //            });
    //    });
    // }

}

