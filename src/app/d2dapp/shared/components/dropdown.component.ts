import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { DropDownParent } from "../../master/items/item";
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
    @Input() InputParentSetId: number;
    @Input() InputParentPlaceholder: string;
    @Input() InputParentEagerLoad: boolean;
    

    setParentName: string;

    public defaultParent: String = "";
    
    selectedParent: DropDownParent = new DropDownParent( 0, '','',0);

    parents: DropDownParent[];

    object: string;
    display: boolean;
    list: number;

    parentPlaceHolder: string
    parentEagerLoad: boolean
    parentsLoaded: boolean = false;

    dropDownLoading;

    constructor(private _itemService: ItemService, private _errorService: ErrorService) {
        this.dropDownLoading = true;
    }

    ngOnInit() {
        this.display = this.InputDisplay;
        this.list = this.InputList;
        this.object = this.InputObject;
        this.parentPlaceHolder = this.InputParentPlaceholder
        this.parentEagerLoad = this.InputParentEagerLoad

        if (this.parentEagerLoad == true) {
            this.loadParent(this.list)
        }

    }

    loadParent(list) {
        debugger;
        this.getParent(list)
    }

    getParent(list) {

        if (this.object == 'item') {
            if (this.parentsLoaded == false) {
                this.parentsLoaded = true
                this._itemService.getItemsByListId(list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        } else {
            if (this.parentsLoaded == false) {
                this.parentsLoaded = true
                this._itemService.getItemsByObjectId(this.object, list)
                    .subscribe(
                    data => this.handleData('getItemsByListId', data, null),
                    error => this.handleError('getItemsByListId', error),
                    () => this.handleSuccess('getItemsByListId')
                    );
            }
        }

    }

    onSelect(parent) {

        debugger;
        this.selectedParent = JSON.parse(parent);

    }

    handleError(process, error: any) {

        this.dropDownLoading = false;
        if (error.message != "error.json is not a function") {
            this._errorService.handleError(error);
        }
        console.log("handle error");
        this._errorService.handleError(error);
    }

    handleData(process, data: any, parentId) {
        this.dropDownLoading = false;
        console.log("handle data");
        console.log(data);
        if (process === 'getItemsByListId') {
            this.parents = [];
            for (let i in data) {
                console.log(data[i].name);
                this.parents.push(new DropDownParent(data[i].id, data[i].name, data[i].code, data[i].ruleBookId));
            }

            debugger;
            //set selected record
            if (this.InputParentSetId != 0) {
                this.defaultParent = JSON.stringify(_.findWhere(this.parents, { parentId: this.InputParentSetId }))
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
