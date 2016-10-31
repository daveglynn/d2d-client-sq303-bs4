import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { LocationStrategy,
    HashLocationStrategy }         from '@angular/common';

import { AppComponent }                 from './app.component';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES }      from './shared/nav-dropdown.directive';
import { ToastModule }                  from 'ng2-toastr/ng2-toastr';

import { ChartsModule }                 from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES }    from './shared/sidebar.directive';
import { AsideToggleDirective }         from './shared/aside.directive';
import { BreadcrumbsComponent }         from './shared/breadcrumb.component';
import { routing }                      from './app.routing';

//Layouts
import { FullLayoutComponent }          from './layouts/full-layout.component';
import { SimpleLayoutComponent }        from './layouts/simple-layout.component';

//Main view
import { DashboardComponent }           from './dashboard/dashboard.component';

//Components
import { ButtonsComponent }             from './components/buttons.component';
import { CardsComponent }               from './components/cards.component';
import { FormsComponent }               from './components/forms.component';
import { SocialButtonsComponent }       from './components/social-buttons.component';
import { SwitchesComponent }            from './components/switches.component';
import { TablesComponent }              from './components/tables.component';

//Icons
import { FontAwesomeComponent }         from './icons/font-awesome.component';
import { GlyphiconsComponent }          from './icons/glyphicons.component';
import { GlyphiconsFiletypesComponent } from './icons/glyphicons-filetypes.component';
import { GlyphiconsSocialComponent }    from './icons/glyphicons-social.component';
import { SimpleLineIconsComponent }     from './icons/simple-line-icons.component';

//Plugins
import { NotificationsComponent }       from './plugins/notifications.component';

//Widgets
import { WidgetsComponent }             from './widgets/widgets.component';

//Charts
import { ChartsComponent }              from './charts/charts.component';

//Pages
import { p404Component }                from './pages/404.component';
import { p500Component }                from './pages/500.component';
import { LoginComponent }               from './pages/login.component';
import { RegisterComponent }            from './pages/register.component';

//dgstart
import { D2DAppModule }      from './d2dapp/d2dapp.module';
//dgend

@NgModule({
    imports: [
        BrowserModule,
        routing,
        Ng2BootstrapModule,
        ChartsModule,
        ToastModule,
        D2DAppModule     //dgstart
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        DashboardComponent,
        ButtonsComponent,
        CardsComponent,
        FormsComponent,
        SocialButtonsComponent,
        SwitchesComponent,
        TablesComponent,
        FontAwesomeComponent,
        GlyphiconsComponent,
        GlyphiconsFiletypesComponent,
        GlyphiconsSocialComponent,
        SimpleLineIconsComponent,
        NotificationsComponent,
        WidgetsComponent,
        ChartsComponent,
        p404Component,
        p500Component,
        LoginComponent,
        RegisterComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
