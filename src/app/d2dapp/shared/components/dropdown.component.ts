import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ListService } from "../../master/lists/list.service";
import { DropDownItem } from "../../master/items/item";
import { ErrorService } from "../errors/error.service";
import * as _ from 'underscore';

@Component({
    selector: 'dropdownlist',
    templateUrl: 'dropdown.component.html',
    providers: [  ListService]
})
export class DropDownComponent implements OnInit {
    @Input() InputObject: string;
    @Input() InputDisplay: boolean;
    @Input() InputList: number;
    @Input() InputDefault: number;
    @Input() InputPlaceholder: string;
    @Input() InputEagerLoad: boolean;
    @Output() OutputButtonOnChange = new EventEmitter(); 

    public defaultItem: String = "";
   
    selectedItem: DropDownItem = new DropDownItem(0, 0, '','',0);
  
    items: DropDownItem[];

    object: string;
    display: boolean;
    list: number;

    placeHolder: string
    eagerLoad: boolean
    listLoaded: boolean = false;

    dropDownLoading;

    constructor(  private _listService: ListService, private _errorService: ErrorService) {
        this.dropDownLoading = true;
    }

    ngOnInit() {
        this.display = this.InputDisplay;
        this.list = this.InputList;
        this.object = this.InputObject;
        this.placeHolder = this.InputPlaceholder
        this.eagerLoad = this.InputEagerLoad

        if (this.eagerLoad == true) {
            this.loadList(this.list)
        }

    }

    loadList(list) {
         this.getList(list)
    }

    getList(list) {
        debugger;
        if (this.object == 'list') {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._listService.getListByIdItems(list)
                    .subscribe(
                    data => this.handleData('getListByIdItems', data, null),
                    error => this.handleError('getListByIdItems', error),
                    () => this.handleSuccess('getListByIdItems')
                    );
            }
        } else {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._listService.getListByObject(this.object, list)
                    .subscribe(
                    data => this.handleData('getListByObject', data, null),
                    error => this.handleError('getListByObject', error),
                    () => this.handleSuccess('getListByObject')
                    );
            }
        }

    }

    onChange(selectedItem) {
 
        if (selectedItem.trim() != "") {
            this.selectedItem = JSON.parse(selectedItem);
        } else {
            this.selectedItem = selectedItem;
        }

        this.OutputButtonOnChange.next(this.selectedItem);
    }

    handleError(process, error: any) {

        this.dropDownLoading = false;
        if (error.message != "error.json is not a function") {
            this._errorService.handleError(error);
        }
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(process, data: any, parentListId) {

        this.dropDownLoading = false;
        console.log("handle data");
        console.log(data);

        if (process === 'getListByIdItems') {
            this.items = [];
            this.items = data.items;
            //set selected record
            if (this.InputDefault != 0) {
                this.selectedItem = _.findWhere(this.items, { id: this.InputDefault });
                this.defaultItem = JSON.stringify(this.selectedItem).replace(/null/i, "\"\"");
            }
        }

        if (process === 'getListByObject') {
            this.items = [];
            this.items = data;
            //set selected record
            if (this.InputDefault != 0) {
                this.selectedItem = _.findWhere(this.items, { id: this.InputDefault});
                this.defaultItem = JSON.stringify(this.selectedItem).replace(/null/i, "\"\"");
 
            }
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
