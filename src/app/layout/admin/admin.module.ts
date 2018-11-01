import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {PagesModule} from '../../pages/pages.module';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {TitleComponent} from './title/title.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UtilsModule} from '../../utils/utils.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {ManufacturersComponent} from '../../pages/manufacturers/manufacturers.component';
import {ViewManufacturersComponent} from '../../pages/manufacturers/view-manufacturers/view-manufacturers.component';
import {AddManufacturerComponent} from '../../pages/manufacturers/add-manufacturer/add-manufacturer.component';
import {StaffListComponent} from '../../pages/staff/staff-list/staff-list.component';
import {CategoriesComponent} from '../../pages/categories/categories.component';
import {ViewAllCategoriesComponent} from '../../pages/categories/view-all-categories/view-all-categories.component';
const AppRoutes=[
  {path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        component:DashboardComponent,
      },
      {
        path:"categories",
        component:CategoriesComponent,
        children:[
          {
            path:"viewAll",
            component:ViewAllCategoriesComponent,
          },
        ],
      },
      {
        path:"manufacturers",
        component:ManufacturersComponent,
        children:[
          {
            path:"add",
            component:AddManufacturerComponent,
          },
          {
            path:"view",
            component:ViewManufacturersComponent,
          }
        ]
      },
      { path: 'staff',children:[
        {path:"list",component:StaffListComponent,},
        ],
      },
    ],
    },
]
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
    ReactiveFormsModule,
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
