// standard for all components
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorService } from "../.././shared/errors/error.service";
import { CommonService } from   '../../shared/helpers/common.service'; 

// required for this component
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-logout',
    templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit{

    loggingOut;

    constructor(private _authService: AuthService, private _router: Router,private _commonService: CommonService, private _errorService: ErrorService) { }

    ngOnInit() {

    }

    onLogout() {
        this.loggingOut = true;
        this._authService.logout()
            .subscribe(
            error => this.handleError(error),
            () => this.handleSuccess()
            )
    }

    handleError(error: any) {
        console.log("handle error");
        this._commonService.clearLocalStorage();
        this.loggingOut = false;
        this._errorService.handleError(error);
    }

    handleSuccess() {
        console.log("handle success");
        this.loggingOut = false;
        this._commonService.clearLocalStorage();
        this._router.navigate(['/auth/signin']);
    }
}