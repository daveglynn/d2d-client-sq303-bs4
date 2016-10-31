import {EventEmitter} from "@angular/core"
import {Error} from "./error";
export class ErrorService {
 
        errorOccurred = new EventEmitter<Error>()
        handleError(error: any) {
        var errorData = new Error("", "");

        // this is not an error , but delete is throwing it. Angular bug
        if (error.message === "error.json is not a function") return;

        if ((error.status != 'undefined') && (error.status != undefined)) {
            if (error.status == '401') {
                errorData = new Error(error.status, "Authentication is required for this screen");
            }
        }  

        // server unhandled errors
        if (errorData.title === "") {
            if (typeof error.err === 'object') {
                if (error.err.message !== 'undefined') {
                    errorData = new Error(error.err.name, error.err.message);
                }
            }

        }

        // server validation errors
        if (errorData.title === "") {
            if (typeof error === 'object') {
                var parsedType = "";
                var parsedMessage = "";
                if (typeof error.message === 'string') {
                    parsedMessage = error.message;
                } else {
                    for (let item of error) {
                        if (typeof item === 'object') {
                            parsedMessage += item.message + "\n";
                        }
                    }
                }
                if (parsedMessage != "") {
                    errorData = new Error("Validation", parsedMessage);
                }
            }
        }

//        if ((error._body != undefined) && (error._body != 'undefined')) {
// 
//             if ((errorData.title === "")) {
//                 errorData = new Error(error._body, error._body);
//             }
// 
//             if ((errorData.title === "") && (JSON.parse(error._body).message != 'undefined') && (JSON.parse(error._body).message != undefined)) {
//                 errorData = new Error(JSON.parse(error._body).title, JSON.parse(error._body).message);
//             }
//         }
//         if ((errorData.title === "") && (error.message != 'undefined') && (error.message != undefined)) {
//             errorData = new Error(error.title, error.message);
//         }
//         if ((errorData.title === "") && (error.name != 'undefined') && (error.name != undefined)) {
//             errorData = new Error(error.name, error.message);
//         }

        if (errorData.title === "") {
            var errorData = new Error("Error", "An Error occurred proccessing your request");
          }
        console.log(errorData);
        this.errorOccurred.emit(errorData);
    };
} 