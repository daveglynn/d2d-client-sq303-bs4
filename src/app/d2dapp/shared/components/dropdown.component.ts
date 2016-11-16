import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { ListService } from "../../master/lists/list.service";
import { DropDownItem } from "../../master/items/item";
import { ErrorService } from "../errors/error.service";
import * as _ from 'underscore';

@Component({
    selector: 'dropdownlist',
    templateUrl: 'dropdown.component.html',
    providers: [ItemService, ListService]
})
export class DropDownComponent implements OnInit {
    @Input() InputObject: string;
    @Input() InputDisplay: boolean;
    @Input() InputList: number;
    @Input() InputDefaultItemId: number;
    @Input() InputPlaceholder: string;
    @Input() InputEagerLoad: boolean;
    @Output() OutputButtonOnChange = new EventEmitter(); 

    public defaultItem: String = "";
   
    selectedItem: DropDownItem = new DropDownItem(0, 0, 0, '','',0);
  
    items: DropDownItem[];

    object: string;
    display: boolean;
    list: number;

    placeHolder: string
    eagerLoad: boolean
    listLoaded: boolean = false;

    dropDownLoading;

    constructor(private _itemService: ItemService, private _listService: ListService, private _errorService: ErrorService) {
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
                this._itemService.getItemsByObjectId(this.object, list)
                    .subscribe(
                    data => this.handleData('getItemsByObjectId', data, null),
                    error => this.handleError('getItemsByObjectId', error),
                    () => this.handleSuccess('getItemsByObjectId')
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
            if (this.InputDefaultItemId != 0) {
                this.selectedItem = _.findWhere(this.items, { id: this.InputDefaultItemId });
                this.defaultItem = JSON.stringify(this.selectedItem)
            }

        }

        if (process === 'getItemsByObjectId') {
            debugger;
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
