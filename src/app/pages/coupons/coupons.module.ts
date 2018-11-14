import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCouponsComponent } from './list-coupons/list-coupons.component';
import { NewCouponComponent } from './new-coupon/new-coupon.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {CouponHandlerService} from './coupon-handler.service';
import {SelectModule} from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
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
export class CouponsModule { }
