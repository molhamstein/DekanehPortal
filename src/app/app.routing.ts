import {Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {LogInComponent} from './pages/auth/log-in/log-in.component';
import {AdminComponent} from './layout/admin/admin.component';

export const AppRoutes: Routes = [
  { path: '',
    // loadChildren: 'app/modules/main.module#MainModule' ,
    canActivate: [AuthGuardService],
    canActivateChild:[AuthGuardService],
    component:AdminComponent,
  },
  { path: 'auth',
    children:[
      {
        path:"login",
        component:LogInComponent,
      },
    ],
  },

];
