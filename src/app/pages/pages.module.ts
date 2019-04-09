import { SupplierModule } from './supplier/supplier.module';
import { DamagedProductModule } from './damaged-products/damaged-products.module';
import { AbstractProductsModule } from './abstract-products/abstract-products.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LogInComponent } from './auth/log-in/log-in.component';
import { ChartModule } from 'angular2-chartjs';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { AddManufacturerComponent } from './manufacturers/add-manufacturer/add-manufacturer.component';
import { ViewManufacturersComponent } from './manufacturers/view-manufacturers/view-manufacturers.component';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from '../shared/element/data-filter.pipe';
import { StaffModule } from './staff/staff.module';
import { ClientsModule } from './clients/clients.module';
import { CategoriesComponent } from './categories/categories.component';
import { ViewAllCategoriesComponent } from './categories/view-all-categories/view-all-categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ProductsModule } from './products/products.module';
import { SelectModule } from 'ng-select';
import { OrdersComponent } from './orders/orders.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { AreasModule } from './areas/areas.module';
import { CouponsModule } from './coupons/coupons.module';
import { TopSliderModule } from './top-slider/top-slider.module';
import { RatingsModule } from './ratings/ratings.module';
import { NotificationModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReportModule } from './reports/reports.module';
import { SupplierOrdersModule } from './supplier-order/supplier-orders.module';

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
        ModalModule.forRoot(),
        StaffModule,
        ClientsModule,
        RatingsModule,
        NotificationModule,
        ProductsModule,
        AbstractProductsModule,
        SelectModule,
        AreasModule,
        TopSliderModule,
        OrdersModule,
        CouponsModule,
        ReportModule,
        DamagedProductModule,
        SupplierOrdersModule,
        SupplierModule
    ],
    exports: [
        DataFilterPipe,
    ],
    declarations: [
        LogInComponent,
        ManufacturersComponent,
        AddManufacturerComponent,
        AddCategoryComponent,
        ViewManufacturersComponent,
        CategoriesComponent,
        ViewAllCategoriesComponent,
        DashboardComponent,
        OrdersComponent,
        ViewOrdersComponent
    ],
    providers: [DatePipe]
})
export class PagesModule {
}
