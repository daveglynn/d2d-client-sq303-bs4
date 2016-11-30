import {Component, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'accordion',
    template: `
<div class="row">
    <div class="col-lg-12">
        <div class="card">
                <div class="card-header card-info" role="tablist">
                    <i class="fa fa-edit"></i><strong>{{InputTitle}}</strong>
                    <div class="card-actions">
                      <ul class="nav navbar-nav pull-right hidden-md-down">
			                <a class="nav-link" (click)="navigatePrevious()"><i class="icon-arrow-left "></i></a>
                            <a class="nav-link" (click)="navigateNext()"><i class="icon-arrow-right"></i></a>
                            <a class="nav-link" (click)="openAllGroups()"><i class="icon-arrow-down "></i></a>
                            <a class="nav-link" (click)="closeAllGroups()" ><i class="icon-arrow-up "></i></a>
                            <a href="javascript: window.history.back()" class="btn-close"><i class="icon-logout icons font-2l"></i></a>
                       </ul>
                    </div>
                </div>   
 
            <ng-content></ng-content>
     
        </div>
    </div>
</div>     `
})
export class Accordion implements OnInit {

    @Input() InputTitle: string;
    @Input() InputKeepOpenMode: boolean;
    @Input() InputOpenGroup: number;
    @Output() outputButtonPreviousOnClick = new EventEmitter();
    @Output() outputButtonNextOnClick = new EventEmitter();

    groups: Array<AccordionGroup> = [];

    groupMode: boolean;

    addGroup(group: AccordionGroup): void {
        this.groups.push(group);
    }

    closeOthers(openGroup: AccordionGroup): void {
        this.groups.forEach((group: AccordionGroup) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    openGroup(groupToOpen: number): void {
        var count = 0;
        this.groups.forEach((group: AccordionGroup) => {
            count = count + 1;
            if (groupToOpen == count) {
                group.isOpen = true;
            }
        });
    }
    openAllGroups(): void {
        this.groups.forEach((group: AccordionGroup) => {
            if (group.isOpen == false) {
                group.isOpen = true;
            }
        });
    }

    closeAllGroups(): void {
        this.groups.forEach((group: AccordionGroup) => {
            if (group.isOpen == true) {
                group.isOpen = false;
            }
        });
    }


    toggleGroupMode(): void {
        this.groups.forEach((group: AccordionGroup) => {
            if (this.groupMode == false) {
                this.groupMode = true;
            } else { this.groupMode = false; }

        });
    }


    navigatePrevious() {
        this.outputButtonPreviousOnClick.next();
    }

    navigateNext() {
        this.outputButtonNextOnClick.next();
    }

    ngOnInit() {

        if (this.InputOpenGroup != 0) {
            this.openGroup(this.InputOpenGroup);
        }
    }

}

@Component({
    selector: 'accordion-group',
    template: `
 
   
                  <div class="card-header" role="tab"  (click)="toggleOpen($event)">
 
                      <a href tabindex="0"><strong>{{heading}}</strong></a>
 
                  </div>
                  <div class="collapsed" [hidden]="!isOpen">
                    <div class="card-block">
                        <ng-content></ng-content>
                    </div>
                  </div>
    
          `,

})
export class AccordionGroup implements OnDestroy {
    private _isOpen: boolean = false;
    private _isClickingGroup: boolean = false;

    @Input() heading: string;

    @Input()
    set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            if ((!this.accordion.InputKeepOpenMode) && (this._isClickingGroup == true)) {
                this.accordion.closeOthers(this);
            }
        }
        this._isClickingGroup = false;
    }

    get isOpen() {
        return this._isOpen;
    }

    constructor(private accordion: Accordion) {
        this.accordion.addGroup(this);
    }

    ngOnDestroy() {
        // this.accordion.removeGroup(this);
    }

    toggleOpen(event: MouseEvent): void {
        event.preventDefault();
        this._isClickingGroup = true;
        this.isOpen = !this.isOpen;
    }
}