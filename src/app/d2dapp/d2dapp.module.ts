import { NgModule }                     from '@angular/core';
import { CommonModule }        from '@angular/common';
import { PreventUnsavedChangesGuard } from './prevent-unsaved-changes-guard.service';
import { RouterModule }        from '@angular/router';
//import { PostsModule }       from './posts/posts.module';
import { HttpModule }          from '@angular/http';

import { User }                from './security/users/user';
import { UserFormComponent }   from './security/users/user-form.component';
import { UsersComponent }      from './security/users/users.component';
import { TableSimpleComponent }    from './shared/components/tableSimple.component';
import { Accordion, AccordionGroup }    from './shared/components/accordion.component';
 
import { ErrorService } from "./shared/errors/error.service";
import { ProfileService } from './master/profiles/profile.service';
import { LanguageService } from './master/languages/language.service';
import { AuthService } from "./security/auth/auth.service";

import { AuthenticationComponent }      from './security/auth/auth.component';

import { SignupComponent }   from './security/auth/signup.component';
import { SigninComponent }   from './security/auth/signin.component';

//import { AppComponent }      from './app.component';
//import { HomeComponent }     from './home.component';
//import { NavBarComponent }   from './navbar.component';
//import { NotFoundComponent } from './not-found.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { usersRouting }      from './security/users/users.routing';
//import { postsRouting }      from './posts/posts.routing';
//import { routing }           from './app.routing';

import {OrderBy} from "./shared/pipes/orderBy.pipe"
import {Format} from "./shared/pipes/format.pipe"

import { PaginationComponent } from './shared/components/pagination.component';
import { SpinnerComponent }    from './shared/components/spinner.component';
import { FocusDirective }    from './shared/directives/focus.directive';
import { DisableDirective }    from './shared/directives/disable.directive';
import { AppShadowDirective }    from './shared/directives/appshadow.directive';
import { CommonService }    from './shared/helpers/common.service';
import { ConstantsService }    from './shared/helpers/constants.service';

import { AuthGuard }                    from './security/auth/auth.guard.ts';

import { ErrorComponent } from "./shared/errors/error.component";
import { DropDownComponent } from "./shared/components/dropdown.component";

 
import { UserService }                           from './security/users/user.service';
import { UserCode }                           from './security/users/user.code';
 
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        usersRouting,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserFormComponent,
        UsersComponent,
        TableSimpleComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        OrderBy,
        Format,
        PaginationComponent,
        SpinnerComponent,
        FocusDirective,
        DisableDirective,
        AppShadowDirective,
        ErrorComponent,
        Accordion,
        AccordionGroup,
        DropDownComponent
    ],
    exports: [
        UserFormComponent,
        UsersComponent,
        AuthenticationComponent,
        SignupComponent,
        PaginationComponent,
        SpinnerComponent,
        FocusDirective,
        DisableDirective,
        AppShadowDirective,
        ErrorComponent
    ],
    providers: [
        PreventUnsavedChangesGuard,
        ErrorService,
        ProfileService,
        LanguageService,
        AuthService,
        UserService,
        CommonService,
        ConstantsService,
        AuthGuard,
        UserCode               
    ]
})
export class D2DAppModule {
}