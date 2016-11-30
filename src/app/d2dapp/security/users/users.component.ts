/***************************************************************************************
 Import section
***************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService }       from './user.service';
import { ErrorService } from "../.././shared/errors/error.service";
import { ProfileService } from '../../master/profiles/profile.service';
import { LanguageService } from '../../master/languages/language.service';
import { CommonService } from   '../../shared/helpers/common.service';
import { Router, ActivatedRoute }                from '@angular/router';
import { Location } from '@angular/common';
import { ConstantsService } from   '../../shared/helpers/constants.service';
import { DropDownItem } from "./../../master/items/item";
import { Search }                     from './user';
import * as _ from 'underscore';

@Component({
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

    /***************************************************************************************
     Parameter section
    ***************************************************************************************/
    @Input() InputMode: string;
    @Input() InputModal: string;
    @Output() OutputButtonCloseClick = new EventEmitter();

    /***************************************************************************************
     Definition section
    ***************************************************************************************/

    //form
    title: string;
    mode: string;
    modal: string;
    usersLoading;
    pageSize = 10;
    users = [];
    userIds = [];
    pagedUsers = [];
    profiles = [];
    languages = [];
    userIdsList: string = "";

    //modal
    modalClass: string = "";
    modalDisplay: string = "";
    allDisplay: string = "";

    //table arrays
    preButtons: any[] = [];
    links: any[] = [];
    columns: any[] = [];
    buttons: any[] = [];
    sorting: {};

    //constants dropdown ListId definitions
    dropdown_UserComponentOrderBy: number
    dropdown_UserComponentOrderDir: number

    //constants dropdown ListId defaults
    dropdown_UserComponentOrderBy_DefaultId: number;
    dropdown_UserComponentOrderDir_DefaultId: number;
    dropdown_UserComponentLanguage_DefaultId: number;
    dropdown_UserComponentProfile_DefaultId: number;

    /***************************************************************************************
     Construtor section
    ***************************************************************************************/
    constructor(private _userService: UserService,
        private _errorService: ErrorService,
        private _profileService: ProfileService,
        private _languageService: LanguageService,
        private _commonService: CommonService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location,
        private _constantsService: ConstantsService) {
    }

    /***************************************************************************************
     Initialisation section
    ***************************************************************************************/
    ngOnInit() {

        //initial form setup
        this.setupForm();

        //load search dropdowns
        this.loadProfiles();
        this.loadLanguages();

        //load main data
        debugger;
        this.loadUsers(this.setupSearch());
    }

    /***************************************************************************************
     Set up search
    ***************************************************************************************/
    private setupSearch() {

        //set up initial search parameters
        this.dropdown_UserComponentOrderBy, this.dropdown_UserComponentOrderDir
        var profile = new DropDownItem(this.dropdown_UserComponentProfile_DefaultId, 0, "", "", 0);
        var language = new DropDownItem(this.dropdown_UserComponentLanguage_DefaultId, 0, "", "", 0)
        var orderBy = new DropDownItem(this.dropdown_UserComponentOrderBy_DefaultId, 0, "", "", 0)
        var orderDir = new DropDownItem(this.dropdown_UserComponentOrderDir_DefaultId, 0, "", "", 0)
        var search = new Search(profile, language, '', orderBy, orderDir);
        return search
    }

    /***************************************************************************************
     Set up section
    ***************************************************************************************/
    private setupForm() {
  
        this.setupConstant()

        //set modal
        this.modalProcessing()

        //set table
        this.setupTable()

    }


    /***************************************************************************************
    setup constants
    ***************************************************************************************/
    private setupConstant() {

 
        this.dropdown_UserComponentOrderDir = this._constantsService.dropdown_UserComponentOrderDir
        this.dropdown_UserComponentOrderBy = this._constantsService.dropdown_UserComponentOrderBy
        this.dropdown_UserComponentOrderBy_DefaultId = this._constantsService.dropdown_UserComponentOrderBy_DefaultItemId
        this.dropdown_UserComponentOrderDir_DefaultId = this._constantsService.dropdown_UserComponentOrderDir_DefaultItemId
        this.dropdown_UserComponentProfile_DefaultId = this._constantsService.dropdown_UserComponentProfile_DefaultId
        this.dropdown_UserComponentLanguage_DefaultId = this._constantsService.dropdown_UserComponentLanguage_DefaultId
    }

    /***************************************************************************************
     setup Table
    ***************************************************************************************/
    private setupTable() {

        //set default table sort
        this.sorting = {
            column: '',
            descending: false
        };

        // setup links - all modes
        this.links.push({
            display: 'Name',
            variable: 'recordDescription',
            filter: 'text',
            router: "edit"
        });

        // setup columns - all modes
        this.columns.push(
            {
                display: 'Email',
                variable: 'email',
                filter: 'text'
            }
        );

        //  setup columns - all modes except select
        if (this.mode != 'select') {
            this.columns.push({
                display: 'Address',
                variable: 'addressLine1',
                filter: 'text'
            });
        }

        //  setup left buttons - select mode
        if (this.mode === 'select') {
            this.preButtons.push({
                width: '3%',
                action: 'select',
                display: 'Select',
                router: "{ 'id' : object.id}"
            });
        }

        // setup right buttons - all modes
        this.buttons.push(
            {
                action: 'view',
                display: 'View',
                router: 'view'
            }
        );

        // setup right buttons - workwith mode
        if (this.mode === 'workwith') {
            this.buttons.push({
                action: 'edit',
                display: 'Edit',
                router: 'edit'
            });
            this.buttons.push({
                action: 'delete',
                display: 'Delete',
                router: 'delete'
            }
            );
        }

        //set title
        if (this.mode === 'select') {
            this.title = "Select a User"
        }
        if (this.mode === 'display') {
            this.title = "Display Users"
        }
        if (this.mode === 'workwith') {
            this.title = "Work With Users"
        }
    }

    /***************************************************************************************
     Modal section
    ***************************************************************************************/
    private modalProcessing() {

        this._route.queryParams.subscribe(params => {
            this.mode = this._commonService.setMode(this.InputMode, params['mode'])
            this.modal = this._commonService.setModal(this.InputModal, params['modal'])
        });

        if (this.modal === "true") {
            this.modalClass = "modal"
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
    private outputButtonOnChangeTableSimpleOnClick(selection) {
        debugger;
        if (selection.router == "select") {
            this.OutputButtonCloseClick.next(selection);
        } else {
            this._router.navigate(['/components/users/' + selection.router, selection.id,this.userIdsList]);
        }
        
    }

    private outputButtonOnChangeDropdownlist(selectedItem) {
        
    }

    private close() {
        if (_.contains(['true'], this.modal)) {
            this.OutputButtonCloseClick.next(null);
        } else {
            this._location.back();
        }
    }

    private onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedUsers = _.take(_.rest(this.users, startIndex), this.pageSize);
    }

    /***************************************************************************************
     Data loading section
    ***************************************************************************************/
    private loadProfiles() {

        this._profileService.getProfilesAll()
            .subscribe(
            data => this.handleData('loadProfiles', data),
            error => this.handleError('loadProfiles', error, 0, null),
            () => this.handleSuccess('loadProfiles')
            );
    }
      
    private loadLanguages() {

        this._languageService.getLanguagesAll()
            .subscribe(
            data => this.handleData('loadLanguages', data),
            error => this.handleError('loadLanguages', error, 0, null),
            () => this.handleSuccess('loadLanguages')
            );
    }

    private loadUsers(filter?) {
        debugger;
        this.usersLoading = true;
        this._userService.getUsersAll(filter)
            .subscribe(
            data => this.handleData('getUsersAll', data),
            error => this.handleError('getUsersAll', error, 0, null),
            () => this.handleSuccess('getUsersAll')
            )

    }

    private reLoadPage(profile, language, q, orderBy, orderDir) {
 
        profile.value = "";
        language.value = "";
        q.value = "";
        this.loadUsers();
    }

    private reloadUsers(filter) {
 
        this.loadUsers(filter);
    }


    /***************************************************************************************
     Api results section
    ***************************************************************************************/
    private handleError(process, error: any, index, user) {

        console.log("handle error");
        this._errorService.handleError(error);
    }

    private handleData(process, data: any) {

        console.log("handle data");
        console.log(data);
        if (process === 'getUsersAll') {
            this.users = data;
            this.userIds = data.map(function (users) { return users.id; });
            this.userIdsList = this.userIds.join(",")
            this.pagedUsers = _.take(this.users, this.pageSize);
        }
        if (process === 'loadProfiles') {
            this.profiles = data;
        }
        if (process === 'loadLanguages') {
            this.languages = data;
        }
    }

    private handleSuccess(process) {

        this.usersLoading = false
        console.log("handle success");
    }
}