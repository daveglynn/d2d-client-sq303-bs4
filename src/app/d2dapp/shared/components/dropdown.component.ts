import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { DropDownItem } from "../../master/items/item";
import { ErrorService } from "../errors/error.service";
import * as _ from 'underscore';

@Component({
    selector: 'dropdownlist',
    templateUrl: 'dropdown.component.html',
    providers: [ItemService]
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

    constructor(private _itemService: ItemService, private _errorService: ErrorService) {
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
        debugger;
        this.getList(list)
    }

    getList(list) {

        if (this.object == 'item') {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._itemService.getItemsByListId(list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        } else {
            if (this.listLoaded == false) {
                this.listLoaded = true
                this._itemService.getItemsByObjectId(this.object, list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        }

    }

    onChange(selectedItem) {

        debugger;
        this.selectedItem = JSON.parse(selectedItem);
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
        if (process === 'getItemsByListId') {
            this.items = [];
            for (let i in data) {
                console.log(data[i].name);
                this.items.push(new DropDownItem(data[i].id, data[i].listId, data[i].parentListId,data[i].name, data[i].code, data[i].ruleBookId));
            }
            debugger;
            //set selected record
            if (this.InputDefaultItemId != 0) {
                this.defaultItem = JSON.stringify(_.findWhere(this.items, { id: this.InputDefaultItemId }))
            }

        }
        if (process === 'getItemsByParentListId') {
 
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
