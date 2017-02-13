import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { DropDownItem } from "../../master/items/item";
import { ErrorService } from "../errors/error.service";
import * as _ from 'underscore';

@Component({
    selector: 'dropdownlist',
    templateUrl: 'dropdown.component.html',
    providers: [  ItemService]
})
export class DropDownComponent implements OnInit {
    @Input() InputObject: string;
    @Input() InputDisplay: boolean;
    @Input() InputAction: string;
    @Input() InputList: number;
    @Input() InputDefault: DropDownItem;
    @Input() InputPlaceholder: string;
    @Input() InputEagerLoad: boolean;
    @Output() OutputButtonOnChange = new EventEmitter(); 

    public defaultItem: String = "";
   
    selectedItem: DropDownItem = new DropDownItem(0,"", 0, "", "", 0);
    selectedIdCode: string;
  
    items: DropDownItem[];

    object: string;
    display: boolean
    action: string;
    list: number;

    placeHolder: string
    eagerLoad: boolean
    listLoaded: boolean = false;

    dropDownLoading;

    constructor(  private _itemService: ItemService, private _errorService: ErrorService) {
        this.dropDownLoading = true;
    }

    ngOnInit() {
        this.display = this.InputDisplay;
        this.action = this.InputAction;
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

        var filter = {};
        if (this.action == "add") {
            filter['expired'] = false;
        }

        if (this.object == 'list') {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._itemService.getListByIdItems(list, filter)
                    .subscribe(
                    data => this.handleData('getListByIdItems', data, null),
                    error => this.handleError('getListByIdItems', error),
                    () => this.handleSuccess('getListByIdItems')
                    );
            }
        } else {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._itemService.getListByObject(this.object, filter)
                    .subscribe(
                    data => this.handleData('getListByObject', data, null),
                    error => this.handleError('getListByObject', error),
                    () => this.handleSuccess('getListByObject')
                    );
            }
        }

    }

    onChange(selectedItem) {
        debugger;
        this.selectedItem = _.findWhere(this.items, { idCode: selectedItem });
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
            this.items = data;
            //set selected record
            debugger;
            if ((this.InputDefault.idCode != "") && (this.InputDefault.idCode != undefined)) {
                this.selectedItem = _.findWhere(this.items, { id: 2 });
                this.defaultItem = JSON.stringify(this.selectedItem.id).replace(/null/i, "\"\"");
            }
        }

        if (process === 'getListByObject') {
            this.items = [];
            this.items = data;
            //set selected record
            debugger;
            if ((this.InputDefault.idCode != "") && (this.InputDefault.idCode != undefined)) {
                this.selectedItem = _.findWhere(this.items, { id: 2 });
                this.defaultItem = JSON.stringify(this.selectedItem.id).replace(/null/i, "\"\"");
            }
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
