import { NewSupplierComponent } from './../../pages/supplier/new-supplier/new-supplier.component';
import { SupplierOrdersListComponent } from './../../pages/supplier-order/supplier-order-list/supplier-order-list.component';
import { AbstractProductListComponent } from './../../pages/abstract-products/abstract-product-list/abstract-product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PagesModule } from '../../pages/pages.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './title/title.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UtilsModule } from '../../utils/utils.module';
// import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { ManufacturersComponent } from '../../pages/manufacturers/manufacturers.component';
import { ViewManufacturersComponent } from '../../pages/manufacturers/view-manufacturers/view-manufacturers.component';
import { AddManufacturerComponent } from '../../pages/manufacturers/add-manufacturer/add-manufacturer.component';
import { StaffListComponent } from '../../pages/staff/staff-list/staff-list.component';
import { NewStaffComponent } from '../../pages/staff/new-staff/new-staff.component';
import { ClientListComponent } from '../../pages/clients/client-list/client-list.component';
import { NewClientComponent } from '../../pages/clients/new-client/new-client.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';
// import {ViewAllCategoriesComponent} from '../../pages/categories/view-all-categories/view-all-categories.component';
// import {ViewCategoriesComponent} from '../../pages/categories-management/view-categories/view-categories.component';
import { ViewAllCategoriesComponent } from '../../pages/categories/view-all-categories/view-all-categories.component';
import { AddCategoryComponent } from '../../pages/categories/add-category/add-category.component';
import { ProductListComponent } from '../../pages/products/product-list/product-list.component';
import { NewProductComponent } from '../../pages/products/new-product/new-product.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { ViewOrdersComponent } from '../../pages/orders/view-orders/view-orders.component';
// import {ListAreasComponent} from '../../pages/areas/list-areas/list-areas.component';
import { NewAreaComponent } from '../../pages/areas/new-area/new-area.component';
// import {ListCouponsComponent} from '../../pages/coupons/list-coupons/list-coupons.component';
import { NewCouponComponent } from '../../pages/coupons/new-coupon/new-coupon.component';
import { ListAreasComponent } from '../../pages/areas/list-areas/list-areas.component';
import { ListCouponsComponent } from '../../pages/coupons/list-coupons/list-coupons.component';
import { SlideListingComponent } from '../../pages/top-slider/slide-listing/slide-listing.component';
import { NewSlideComponent } from '../../pages/top-slider/new-slide/new-slide.component';
import { RatesListComponent } from '../../pages/ratings/rates-list/rates-list.component';
import { OrdersManageComponent } from '../../pages/orders/orders-manage/orders-manage.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { NotificationsService } from '../../services/notifications.service';
import { OrdersFromSuppliersComponent } from '../../pages/orders/orders-from-suppliers/orders-from-suppliers.component';
import { AddNotificationsComponent } from '../../pages/notifications/add-notifications/add-notifications.component';
import { AbstractNewProductComponent } from '../../pages/abstract-products/abstract-new-product/abstract-new-product.component';
import { WarningReportComponent } from '../../pages/reports/warning-report/warning-report.component';
import { DamagedProductListComponent } from '../../pages/damaged-products/damaged-product-list/damaged-product-list.component';
import { NewDamagedProductComponent } from '../../pages/damaged-products/new-damaged-product/new-damaged-product.component';
import { NewSupplierOrderComponent } from '../../pages/supplier-order/new-supplier-order/new-supplier-order.component';
import { ListSuppliersComponent } from '../../pages/supplier/list-suppliers/list-suppliers.component';
import { DashboardHandlerService } from '../../pages/dashboard/dashboard-handler.service';

const AppRoutes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'categories',
                component: CategoriesComponent,
                children: [
                    {
                        path: 'viewAll',
                        component: ViewAllCategoriesComponent,
                    },
                    {
                        path: 'add',
                        component: AddCategoryComponent,
                    },
                    {
                        path: ':id/edit',
                        component: AddCategoryComponent,
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
                        path: ':id/edit',
                        component: AddManufacturerComponent,
                    },
                    {
                        path: 'view',
                        component: ViewManufacturersComponent,
                    }
                ]
            },
            {
                path: 'suppliers',
                children: [
                    {
                        path: 'add',
                        component: NewSupplierComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewSupplierComponent,
                    },
                    {
                        path: 'list',
                        component: ListSuppliersComponent,
                    }
                ]
            },
            
            {
                path: 'topSlider', children: [
                    {
                        path: 'list',
                        component: SlideListingComponent,
                    },
                    {
                        path: 'new',
                        component: NewSlideComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewSlideComponent,
                    },
                ],
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
                path: 'areas', children: [
                    {
                        path: 'list',
                        component: ListAreasComponent,
                    },
                    {
                        path: 'new',
                        component: NewAreaComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewAreaComponent,
                    },
                ],
            },
            {
                path: 'coupons', children: [
                    {
                        path: 'list',
                        component: ListCouponsComponent,
                    },
                    {
                        path: 'new',
                        component: NewCouponComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewCouponComponent,
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
            {
                path: 'reports', children: [
                    {
                        path: 'warning',
                        component: WarningReportComponent,
                    }
                ],
            },
            {
                path: 'abstract-products', children: [
                    {
                        path: 'list',
                        component: AbstractProductListComponent,
                    },
                    {
                        path: 'new',
                        component: AbstractNewProductComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: AbstractNewProductComponent,
                    },
                ],
            },
            {
                path: 'damaged', children: [
                    {
                        path: 'list',
                        component: DamagedProductListComponent,
                    },
                    {
                        path: 'add',
                        component: NewDamagedProductComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewDamagedProductComponent,
                    },
                ],
            },
            {
                path: 'ratings', children: [
                    {
                        path: 'list',
                        component: RatesListComponent,
                    },
                ],
            },
            {
                path: 'notifications', children: [
                    {
                        path: 'add',
                        component: AddNotificationsComponent,
                    },
                ],
            },
            {
                path: 'orders',
                component: OrdersComponent,
                children: [
                    {
                        path: 'from-supplier',
                        component: OrdersFromSuppliersComponent,
                    },
                    {
                        path: 'management',
                        component: OrdersManageComponent,
                    }
                ]
            },
            {
                path: 'supplier-orders',
                children: [
                    {
                        path: 'new',
                        component: NewSupplierOrderComponent,
                    },
                    {
                        path: 'list',
                        component: SupplierOrdersListComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: NewSupplierOrderComponent,
                    }
                ]
            }
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
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
    ], providers: [AuthGuardService, NotificationsService,DashboardHandlerService]
})
export class AdminModule {

}
