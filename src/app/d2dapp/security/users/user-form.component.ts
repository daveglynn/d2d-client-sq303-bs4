/***************************************************************************************
 Import section
***************************************************************************************/
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup  }  from '@angular/forms';
import { FormControl, Validators }  from '@angular/forms';
import { Router, ActivatedRoute }   from '@angular/router';
import { ClientValidators }         from '../../shared/validators/client.validators';
import { DropDown}                  from "../../shared/helpers/dropdown";
import { Location }                 from '@angular/common';
import { CommonService }            from   '../../shared/helpers/common.service';
import { ErrorService }             from "../.././shared/errors/error.service";
import { Subscription }             from "rxjs/Subscription";

import { UserService }              from './user.service';
import { User }                     from './user';
import { UserCode }                 from './user.code';

import { DropDownItem } from "./../../master/items/item";


@Component({
    templateUrl: 'user-form.component.html'
})

export class UserFormComponent implements OnInit, OnDestroy {

    /***************************************************************************************
     Parameter section
    ***************************************************************************************/
    @Input() InputModal: string;

    /***************************************************************************************
     Definition section
    ***************************************************************************************/
    modalClass: string = "";
    modalDisplay: string = "";
    allDisplay: string = "";

    // this control
    modal: string;
    form: FormGroup;
    title: string;
    action: string;
    dataIsProcessing;
    dataLoaded;
    languageInvalid: boolean = false;
    profileInvalid: boolean = false;
    userId: number;
    ids: string;
    previousUserId: number;
    nextUserId: number;
    parmsSubscription: Subscription;
    parmsQuerySubscription: Subscription;

    // disablers
    active_disabled: boolean = false;
    firstName_disabled: boolean = false;
    lastName_disabled: boolean = false;
    email_disabled: boolean = false;
    password_disabled: boolean = false;
    profileId_disabled: boolean = false;
    language_disabled: boolean = false;
    phone_disabled: boolean = false;
    addressLine1_disabled: boolean = false;
    addressLine2_disabled: boolean = false;
    addressLine3_disabled: boolean = false;
    addressLine4_disabled: boolean = false;
    enabledFrom_disabled: boolean = false;
    enabledTo_disabled: boolean = false;

    // create a new instance 
    user = new User(null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null);

    userErrors: boolean = false;
    languageErrorCode: number = 0;
    profileErrorCode: number = 0;

    /***************************************************************************************
     Construtor section
    ***************************************************************************************/
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _errorService: ErrorService,
        private _location: Location,
        private _commonService: CommonService,
        private _userService: UserService,
        private _userCode: UserCode
    ) { }

    /***************************************************************************************
     Initialisation section
    ***************************************************************************************/
    ngOnInit() {

        this.dataLoaded = false;

        this.parmsQuerySubscription = this._activatedRoute.params.subscribe(params => {
            this.ids = params['ids'];
        });

        this.parmsSubscription = this._activatedRoute.params.subscribe(parms => {
            this.userId = parms['id'];

            if (!this.userId) return;
            this.dataIsProcessing = true;

            this._userService.getUserById(this.userId)
                .subscribe(
                data => this.handleData('getUserById', data),
                error => this.handleError('getUserById', error),
                () => this.handleSuccess('getUserById')
                );
        });

        this.action = this._commonService.getAction(this._activatedRoute.snapshot.routeConfig.path);
        this.setupValidators(this._fb)
        this.setupForm();
        this.setupInitialFormValid(this._fb);

    }
    /***************************************************************************************
     destroy section
    ***************************************************************************************/
    ngOnDestroy() {
        this.parmsSubscription.unsubscribe();
        this.parmsQuerySubscription.unsubscribe();
    }
    /***************************************************************************************
     Set up section
    ***************************************************************************************/
    private setupForm() {

        this.modalProcessing()

        //var id = this._activatedRoute.snapshot.params['id'];

        if (this.action === 'edit') {
            this.title = 'Edit User'
        } else if (this.action === 'view') {
            this.title = 'View User'
        } else if (this.action === 'add') {
            this.title = 'Add User'
            this.dataLoaded = true;
        } else if (this.action === 'delete') {
            this.title = 'Delete User'
        }

        // set disablers as required
        //this.firstName_disabled: boolean = false;
        //this.lastName_disabled: boolean = false;
        //this.email_disabled: boolean = false;
        //this.password_disabled: boolean = false;
        //this.phone_disabled: boolean = false;
        //this.addressLine1_disabled: boolean = false;
        //this.addressLine2_disabled: boolean = false;
        //this.addressLine3_disabled: boolean = false;
        //this. addressLine4_disabled: boolean = false;

    }

    private setupValidators(fb) {

        if (this.action === "add") {
            this.form = fb.group({
                active: [''],
                firstName: ['', [Validators.required, ClientValidators.outOfRange50]],
                lastName: ['', [Validators.required, ClientValidators.outOfRange50]],
                email: ['', [Validators.required, ClientValidators.containsSpace, ClientValidators.invalidEmailAddress]],
                password: ['', [Validators.required, ClientValidators.outOfRange50, ClientValidators.containsSpace, ClientValidators.invalidPassword]],
                profileId: [''],
                phone: ['', [ClientValidators.outOfRange50]],
                enabledFrom: [''],
                enabledTo: [''],
                addressLine1: ['', [ClientValidators.outOfRange50]],
                addressLine2: ['', [ClientValidators.outOfRange50]],
                addressLine3: ['', [ClientValidators.outOfRange50]],
                addressLine4: ['', [ClientValidators.outOfRange50]]

            });
        } else {
            this.form = fb.group({
                active: [''],
                firstName: ['', [Validators.required, ClientValidators.outOfRange50]],
                lastName: ['', [Validators.required, ClientValidators.outOfRange50]],
                email: ['', [Validators.required, ClientValidators.containsSpace, ClientValidators.invalidEmailAddress]],
                password: [''],
                profileId: [''],
                phone: ['', [ClientValidators.outOfRange50]],
                enabledFrom: [''],
                enabledTo: [''],
                addressLine1: ['', [ClientValidators.outOfRange50]],
                addressLine2: ['', [ClientValidators.outOfRange50]],
                addressLine3: ['', [ClientValidators.outOfRange50]],
                addressLine4: ['', [ClientValidators.outOfRange50]]
            });
        };
    }

    private setupInitialFormValid(fb) {

        if (this.action === "add") {
            this.userErrors = true
        }

    }

    /***************************************************************************************
     Modal section
    ***************************************************************************************/
    private modalProcessing() {

        this._activatedRoute.params.subscribe(params => {
            this.modal = this._commonService.setModal(this.InputModal, params['modal'])
        });

        if (this.modal === "true") {
            this.modalClass = "modal fade"
            this.modalDisplay = 'block'
            this.allDisplay = 'block'
        } else {
            this.modalClass = ""
            this.modalDisplay = 'none'
            this.allDisplay = 'block'
        }
    }

    /***************************************************************************************
     Component event section
    ***************************************************************************************/
    routerCanDeactivate() {

        if (this.form.dirty)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        return true;
    }

    save() {

        this.dataIsProcessing = true;
        if (this.user.id) {
            if (this.action === 'edit') {
                this._userService.updateUser(this.user)
                    .subscribe(
                    data => this.handleData('updateUser', data),
                    error => this.handleError('updateUser', error),
                    () => this.handleSuccess('updateUser')
                    );
            }
            if (this.action === 'delete') {
                this._userService.deleteUser(this.user.id)
                    .subscribe(
                    data => this.handleData('deleteUser', data),
                    error => this.handleError('deleteUser', error),
                    () => this.handleSuccess('deleteUser')
                    );
            }

        } else {
            this._userService.addUser(this.user)
                .subscribe(
                data => this.handleData('addUser', data),
                error => this.handleError('addUser', error),
                () => this.handleSuccess('addUser')
                );
        }

    }

    cancel() {
        this._router.navigate(['/components/users'], { queryParams: { mode: 'workwith', modal: 'false' } });
    }

    private outputButtonOnChangeDropdownlist(list, selectedItem) {

         var validate = [];

        validate['action'] = this.action;
        validate['object'] = list;
        validate['selectedItem'] = selectedItem;
 
        if (list == 'language') {
            this.languageErrorCode = this._userCode.validate(validate);
        }

        if (list == 'profile') {
            this.profileErrorCode = this._userCode.validate(validate);
        }

        if (this.languageErrorCode > 0 || this.profileErrorCode > 0) {
            this.userErrors = true
            return
        }

        this.userErrors = false

        if (list == 'profile') {
            this.user.profileId = selectedItem.id
        }

        if (list == 'language') {
            this.user.languageId = selectedItem.id
        }
    }
    /***************************************************************************************
     Data loading section
    ***************************************************************************************/

    private outputButtonAccordionPreviousOnClick() {
        var userIdIndex = this.ids.split(",").map((item, index) => parseInt(item)).indexOf(parseInt(this.userId.toString()));
        userIdIndex = this._commonService.getPrevId(userIdIndex)
        this.previousUserId = this.ids.split(",").map((item, index) => parseInt(item))[userIdIndex]
        this._router.navigate(['/components/users/edit', this.previousUserId, this.ids]);
    }

    private outputButtonAccordionNextOnClick() {
        var userIdIndex = this.ids.split(",").map((item, index) => parseInt(item)).indexOf(parseInt(this.userId.toString()));
        userIdIndex = this._commonService.getNextId(userIdIndex, this.ids.split(",").map((item, index) => parseInt(item)).length)
        this.nextUserId = this.ids.split(",").map((item, index) => parseInt(item))[userIdIndex]
        this._router.navigate(['/components/users/edit', this.nextUserId, this.ids]);
    }


    /***************************************************************************************
     Api results section
    ***************************************************************************************/
    handleError(process, error: any) {

        this.dataIsProcessing = false;
        // this is not an error , but delete request is throwing it. Angular bug
        // therefore treat it as a success
        if (error.message != "error.json is not a function") {
            this._errorService.handleError(error);
        } else {
            this.handleSuccess(process)
        }
        console.log("handle error");
        this._errorService.handleError(error);
        if (error.status == 404) {
            this._router.navigate(['NotFound']);
        }
    }

    handleData(process, data: any) {

        this.dataIsProcessing = false;
        console.log("handle data");
        console.log(data);

        if (process === 'getUserById') {
            this.user = data;
            this.user.enabledFrom = this._commonService.getLocalDate(this.user.enabledFrom);
            this.user.enabledTo = this._commonService.getLocalDate(this.user.enabledTo);
            this.dataLoaded = true;

        }
    }

    handleSuccess(process) {

        this.dataIsProcessing = false;
        console.log("handle success");
        // Ideally, here we'd want:
        // this.form.markAsPristine();
        if (process != 'getUserById') {
            this._location.back();
        }
    }
}