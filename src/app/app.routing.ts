import { Routes, RouterModule }         from '@angular/router';

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
import { UsersComponent }               from './d2dapp/security/users/users.component';
import { SignupComponent }              from './d2dapp/security/auth/signup.component';
import { SigninComponent }              from './d2dapp/security/auth/signin.component';
import { UserFormComponent }            from './d2dapp/security/users/user-form.component';
import { AuthGuard }                    from './d2dapp/security/auth/auth.guard.ts';
import { PreventUnsavedChangesGuard }   from './d2dapp/prevent-unsaved-changes-guard.service';
//dgend

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboards'
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'components',
                redirectTo: 'components/buttons',
                pathMatch: 'full',
            },
            {
                path: 'components',
                data: {
                    title: 'Components'
                },
                canActivate: [AuthGuard],
                children: [

                    {
                        path: 'users',
                        component: UsersComponent,
                        data: {
                            title: 'Users'
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'users/add',
                        component: UserFormComponent,
                        canDeactivate: [PreventUnsavedChangesGuard],
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'users/view/:id/:ids',
                        component: UserFormComponent,
                        canDeactivate: [PreventUnsavedChangesGuard],
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'users/edit/:id/:ids',
                        component: UserFormComponent,
                        canDeactivate: [PreventUnsavedChangesGuard],
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'users/delete/:id/:ids',
                        component: UserFormComponent,
                        canDeactivate: [PreventUnsavedChangesGuard],
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'plugins',
                data: {
                    title: 'Plugins'
                },
                children: [
                    {
                        path: 'notifications',
                        component: NotificationsComponent,
                        data: {
                            title: 'Notifications'
                        },
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'widgets',
                component: WidgetsComponent,
                data: {
                    title: 'Widgets'
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'charts',
                component: ChartsComponent,
                data: {
                    title: 'Charts'
                },
                canActivate: [AuthGuard],
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: 'signup',
                component: SignupComponent,
                data: {
                    title: 'SignUp'
                }
            },
            {
                path: 'signin',
                component: SigninComponent,
                data: {
                    title: 'SignIn'
                }
            }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes);
