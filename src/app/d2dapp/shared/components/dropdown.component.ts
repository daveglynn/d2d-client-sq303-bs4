import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { ItemService } from "../../master/items/item.service";
import { DropDownParent } from "../../master/items/item";
//import { DropDownChild } from "../../master/items/item";
import { ErrorService } from "../errors/error.service";
import * as _ from 'underscore';

@Component({
    selector: 'dropdownlist',
    templateUrl: 'dropdown.component.html',
    providers: [ItemService]
})
export class DropDownComponent implements OnInit {
    @Input() InputObject: string;
    @Input() InputDependant: number;
    @Input() InputList: number;
    @Input() InputParentSetId: number;
    @Input() InputParentPlaceholder: string;
    @Input() InputParentEagerLoad: boolean;
    
    //@Input() InputChild: number;
    //@Input() InputChildName: string;
    setParentName: string;

    selectedParent: DropDownParent = new DropDownParent( 0, '','',0);
    //selectedChild: DropDownChild = new DropDownChild(0, 0, '');

    parents: DropDownParent[];
    //children: DropDownChild[];

    object: string;
    dependant: number;
    list: number;

    parentPlaceHolder: string
    parentEagerLoad: boolean
    parentsLoaded: boolean = false;
    //childrenLoaded: boolean = false;

    dropDownLoading;

    constructor(private _itemService: ItemService, private _errorService: ErrorService) {
        this.dropDownLoading = true;
    }

    ngOnInit() {
 
        this.dependant = this.InputDependant;
        this.list = this.InputList;
        this.object = this.InputObject;
        this.parentPlaceHolder = this.InputParentPlaceholder
        this.parentEagerLoad = this.InputParentEagerLoad

        if (this.InputParentSetId != 0) {
           // this.selectedParent.parentId = this.InputParentSetId;
           // this.parents = [];
         //   this.parents.push(new DropDownParent(this.selectedParent.parentId, this.selectedParent.name, this.selectedParent.code,this.selectedParent.ruleBookId));

            //if (this.InputChild != 0) {
            //    this.selectedChild.parentId = this.InputParentSetId;
            //    this.selectedChild.childId = this.InputChild;
            //    this.selectedChild.name = this.InputChildName;
            //    this.children = [];
            //    this.children.push(new DropDownChild(this.selectedChild.childId, this.selectedChild.parentId, this.selectedChild.name));
            //}

        }

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
        //set selected record
        //var foundRecord = _.findWhere(this.parents, { parentId: parentId  });
        //this.selectedParent = foundRecord;

        //this.getChildren(parentId);
    }

  //  getChildren(parentId) {
  //
  //      if (this.childrenLoaded == false) {
  //          this.childrenLoaded = true
  //          this._itemService.getItemsByParentListId(parentId)
  //              .subscribe(
  //              data => this.handleData('getItemsByParentListId', data, parentId),
  //              error => this.handleError('getItemsByParentListId', error),
  //              () => this.handleSuccess('getItemsByParentListId')
  //              );
  //      }
  //  }

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
            var foundRecord = _.findWhere(this.parents, { parentId: this.InputParentSetId });
            this.selectedParent = foundRecord;
            //this.setParentName = foundRecord.name;

        }
        if (process === 'getItemsByParentListId') {
        //    this.children = [];
        //    for (let i in data) {
        //        console.log(data[i].name);
        //        this.children.push(new DropDownChild(data[i].id, parentId, data[i].name));
        //    }
        }
    }

    handleSuccess(process) {
        this.dropDownLoading = false;
        console.log("handle success");
    }

}
