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
import { User } from "../../security/users/user";

@Component({
    selector: 'my-signup',
    templateUrl: 'register.component.html'
})

export class SignupComponent implements OnInit {

    signingUp;
    form: FormGroup;
 
    constructor(private _fb: FormBuilder,
        private _authService: AuthService,
        private _cs: ConstantsService,
        private _commonService: CommonService,
        private _errorService: ErrorService,
        private _router: Router) {

        this.form = _fb.group({
            firstName: ['', [
                Validators.required,
                ClientValidators.outOfRange50
            ]],
            lastName: ['', [
                Validators.required,
                ClientValidators.outOfRange50
            ]],
            email: ['', [
                Validators.required,
                ClientValidators.containsSpace,
                ClientValidators.invalidEmailAddress,
                ClientValidators.outOfRange50
            ]],
            password: ['', [
                Validators.required,
                ClientValidators.containsSpace,
                ClientValidators.invalidPassword
            ]],
        });
    } 

    ngOnInit() {

    } 

    onSubmit() {
        this.signingUp = true; 

        const user = new User(null, null, null, null, true, this.form.value.email,this.form.value.password, this.form.value.firstName, this.form.value.lastName, null, null, null, null, null, null, null);

        console.log(user);
        this._authService.signup(user)
            .subscribe(
            data => this.handleData(data),
            error => this.handleError(error),
            () => this.handleSuccess() 
            )
    }

    handleError(error: any) {
        console.log("handle error");
        this.signingUp = false; 
        this._errorService.handleError(error);
    }

    handleData(data: any) {
        console.log("handle data");
    }

    handleSuccess() {
        console.log("handle success");
        this.signingUp = false;
         this._commonService.clearLocalStorage();
         this._router.navigate(['/pages/signin']);
   }

}