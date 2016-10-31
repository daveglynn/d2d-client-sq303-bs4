// required for this component
import { Component, OnInit } from "@angular/core";

// required for this component
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-auth',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active"><a [routerLink]="['signup']">Signup</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['signin']" *ngIf="!isLoggedIn()">Signin</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['logout']" *ngIf="isLoggedIn()">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})

export class AuthenticationComponent implements OnInit{

    constructor(private _authService: AuthService) {}

    ngOnInit() {

    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

}