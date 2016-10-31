// standard for all components
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientValidators } from '../../shared/validators/client.validators';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { ErrorService } from "../.././shared/errors/error.service";
import { CommonService } from   '../../shared/helpers/common.service';
import { Router } from "@angular/router";
// required for this component
import { AuthService } from "./auth.service";
import { User, Login } from '../../security/users/user';
import { LocalData } from '../../shared/helpers/common';

@Component({
    selector: 'my-signin',
    templateUrl: 'signin.component.html'
})

export class SigninComponent implements OnInit {
    signingIn;
    form: FormGroup;

    constructor(private _fb: FormBuilder,
        private _authService: AuthService,
        private _cs: ConstantsService,
        private _commonService: CommonService,
        private _errorService: ErrorService,
        private _router: Router) {

    this.form = _fb.group({
            email: ['',[Validators.required,
                ClientValidators.containsSpace,
                ClientValidators.invalidEmailAddress,
                ClientValidators.outOfRange50
            ]],
            password: ['', [
                Validators.required,
                ClientValidators.containsSpace, 
                ClientValidators.invalidPassword
            ]]
        });
    }


    ngOnInit() {

    }

    onSubmit() {
        this.signingIn = true;
        const login = new Login(this.form.value.email, this.form.value.password);
        this._authService.signin(login)
            .subscribe(
                data => this.handleData(data),
                error => this.handleError(error),
                () => this.handleSuccess()
            ) 
       // window.location.href = this.cs.redirectAfterSignin;
    }

    handleError(error: any) {
        console.log("handle error");
        this.signingIn = false;
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
        var localData = new LocalData(data.token, data.user.id, data.user.firstName, data.user.lastName, data.user.email);
        this._commonService.clearLocalStorage();
        this._commonService.setLocalStorage(localData);

    }

    handleSuccess() {
        console.log("handle success");
        this.signingIn = false;
        
        this._router.navigate(['/components/users'], { queryParams: { mode: 'workwith', modal: 'false' } });
    }

}