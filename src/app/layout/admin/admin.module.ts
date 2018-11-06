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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UtilsModule} from '../../utils/utils.module';
// import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {ManufacturersComponent} from '../../pages/manufacturers/manufacturers.component';
import {ViewManufacturersComponent} from '../../pages/manufacturers/view-manufacturers/view-manufacturers.component';
import {AddManufacturerComponent} from '../../pages/manufacturers/add-manufacturer/add-manufacturer.component';
import {StaffListComponent} from '../../pages/staff/staff-list/staff-list.component';
import {NewStaffComponent} from '../../pages/staff/new-staff/new-staff.component';
import {ClientListComponent} from '../../pages/clients/client-list/client-list.component';
import {NewClientComponent} from '../../pages/clients/new-client/new-client.component';
import {CategoriesComponent} from '../../pages/categories/categories.component';
// import {ViewAllCategoriesComponent} from '../../pages/categories/view-all-categories/view-all-categories.component';
// import {ViewCategoriesComponent} from '../../pages/categories-management/view-categories/view-categories.component';
import {ViewAllCategoriesComponent} from '../../pages/categories/view-all-categories/view-all-categories.component';
import {AddCategoryComponent} from '../../pages/categories/add-category/add-category.component';
import {ProductListComponent} from '../../pages/products/product-list/product-list.component';
import {NewProductComponent} from '../../pages/products/new-product/new-product.component';
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
        path: 'Categories',
        component: CategoriesComponent,
        children: [
          {
            path:"viewAll",
            component:ViewAllCategoriesComponent,
          },
          {
            path:'add',
            component:AddCategoryComponent,
          },
          {
            path: ':id/edit',
            component:AddCategoryComponent,
          },
        ],
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
          {
            path: 'edit/:id',
            component: NewStaffComponent,
          },
        ],
      },
      {
        path: 'client', children: [
          {
            path: 'list',
            component: ClientListComponent,
          },
          {
            path: 'new',
            component: NewClientComponent,
          },
          {
            path: 'edit/:id',
            component: NewClientComponent,
          },
        ],
      },
      {
        path: 'products', children: [
          {
            path: 'list',
            component: ProductListComponent,
          },
          {
            path: 'new',
            component: NewProductComponent,
          },
          {
            path: 'edit/:id',
            component: NewProductComponent,
          },
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
    // BrowserModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    HttpModule,
    UtilsModule,
    PagesModule,
    ReactiveFormsModule
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
