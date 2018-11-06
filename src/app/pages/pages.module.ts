import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {LogInComponent} from './auth/log-in/log-in.component';
import {ChartModule} from 'angular2-chartjs';
import {ManufacturersComponent} from './manufacturers/manufacturers.component';
import { AddManufacturerComponent } from './manufacturers/add-manufacturer/add-manufacturer.component';
import { ViewManufacturersComponent } from './manufacturers/view-manufacturers/view-manufacturers.component';
import {SharedModule} from '../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {HttpModule} from '@angular/http';
import {DataFilterPipe} from '../shared/element/data-filter.pipe';
import {StaffModule} from './staff/staff.module';
import {ClientsModule} from './clients/clients.module';
import {CategoriesComponent} from './categories/categories.component';
import {ViewAllCategoriesComponent} from './categories/view-all-categories/view-all-categories.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserModule} from '@angular/platform-browser';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import {ProductsModule} from './products/products.module';


@NgModule({

  imports: [

    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    ChartModule,
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    StaffModule,
    ClientsModule,
    ProductsModule
  ],
  exports:[
    DataFilterPipe,
  ],
  declarations: [
    LogInComponent,
    ManufacturersComponent,
    AddManufacturerComponent,
    ViewManufacturersComponent,
    CategoriesComponent,
    ViewAllCategoriesComponent,
    DashboardComponent,
  ],
})
export class PagesModule { }
