import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {PagesModule} from '../../pages/pages.module';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {TitleComponent} from './title/title.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UtilsModule} from '../../utils/utils.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {ManufacturersComponent} from '../../pages/manufacturers/manufacturers.component';
import {ViewManufacturersComponent} from '../../pages/manufacturers/view-manufacturers/view-manufacturers.component';
import {AddManufacturerComponent} from '../../pages/manufacturers/add-manufacturer/add-manufacturer.component';
import {StaffListComponent} from '../../pages/staff/staff-list/staff-list.component';
import {NewStaffComponent} from '../../pages/staff/new-staff/new-staff.component';

const AppRoutes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'manufacturers',
        component: ManufacturersComponent,
        children: [
          {
            path: 'add',
            component: AddManufacturerComponent,
          },
          {
            path: 'view',
            component: ViewManufacturersComponent,
          }
        ]
      },
      {
        path: 'staff', children: [
          {
            path: 'list',
            component: StaffListComponent,
          },
          {
            path: 'add-on',
            component: NewStaffComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    RouterModule.forChild(AppRoutes),
    PagesModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    HttpModule,
    UtilsModule,
    PagesModule,


  ],
  declarations: [
    AdminComponent,
    BreadcrumbsComponent,
    // AddManufacturerComponent,
    // AuthComponent,
    TitleComponent,
  ],
})
export class AdminModule {

}
