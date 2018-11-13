import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCouponsComponent } from './list-coupons/list-coupons.component';
import { NewCouponComponent } from './new-coupon/new-coupon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListCouponsComponent, NewCouponComponent]
})
export class CouponsModule { }
