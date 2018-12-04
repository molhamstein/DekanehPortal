import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListCouponsComponent} from './list-coupons/list-coupons.component';
import {NewCouponComponent} from './new-coupon/new-coupon.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {CouponHandlerService} from './coupon-handler.service';
import {SelectModule} from 'ng-select';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        PaginationModule,
        FormsModule,
        SelectModule

    ], providers: [
        CouponHandlerService
    ],
    declarations: [ListCouponsComponent, NewCouponComponent]
})
export class CouponsModule {
}
