import {Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {LogInComponent} from './pages/auth/log-in/log-in.component';
import {AdminComponent} from './layout/admin/admin.component';

export const AppRoutes: Routes = [
    {
        path: 'auth',
        children: [

            {
                path: 'login',
                component: LogInComponent,
            },
        ],
    },
    {
        path: '',
        // loadChildren: 'app/modules/main.module#MainModule' ,
        component: AdminComponent,
        // loadChildren: 'app/layout/admin/admin.module#AdminModule',
        // canActivate: [AuthGuardService],
        // canActivateChild: [AuthGuardService],
    },
];
