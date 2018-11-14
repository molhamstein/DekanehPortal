import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {CouponHandlerService} from '../coupon-handler.service';
import {Coupon} from '../coupon';
import {ConstService} from '../../../services/const.service';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrls: ['./list-coupons.component.css']
})
export class ListCouponsComponent implements OnInit {
  codeOrderDir;
  statusOrderDir;
  valueOrderDir;
  ownerOrderDir;
  expireOrderDir;
  statusCode: number;
  requestProcess = false;
  couponToUpdate = null;
  allCoupon: Coupon[] = [];
  orginalCoupon: Coupon[] = [];

  constructor(private couponHandler: CouponHandlerService, private router: Router,public c:ConstService) {

  }

  editCoupon(id: string) {
    this.router.navigate(['/coupons/edit/' + id]);
  }

  orderByCode() {
    if (this.codeOrderDir == undefined) {
      this.codeOrderDir = this.statusOrderDir =this.expireOrderDir= this.valueOrderDir =this.ownerOrderDir= undefined;
    }
    if (this.codeOrderDir) {
      this.allCoupon.sort((a, b) => a.code.toLowerCase() < b.code.toLowerCase() ? -1 : 1);

    } else {
      this.allCoupon.sort((a, b) => a.code.toLowerCase() > b.code.toLowerCase() ? -1 : 1);
    }
    this.codeOrderDir = !this.codeOrderDir;

  }
  orderByOwner() {
    if (this.ownerOrderDir == undefined) {
      this.codeOrderDir = this.statusOrderDir =this.expireOrderDir= this.valueOrderDir =this.ownerOrderDir= undefined;


    }
    if (this.ownerOrderDir) {
      this.allCoupon.sort((a, b) => a.userId.toLowerCase() < b.userId.toLowerCase() ? -1 : 1);

    } else {
      this.allCoupon.sort((a, b) => a.userId.toLowerCase() > b.userId.toLowerCase() ? -1 : 1);
    }
    this.ownerOrderDir = !this.ownerOrderDir;

  }

  orderByExpire() {
    if (this.expireOrderDir == undefined) {
      this.codeOrderDir = this.statusOrderDir =this.expireOrderDir= this.valueOrderDir =this.ownerOrderDir= undefined;


    }
    if (this.expireOrderDir) {
      this.allCoupon.sort((a, b) => a.expireDate.toLowerCase() < b.expireDate.toLowerCase() ? -1 : 1);

    } else {
      this.allCoupon.sort((a, b) => a.expireDate.toLowerCase() > b.expireDate.toLowerCase() ? -1 : 1);
    }
    this.expireOrderDir = !this.expireOrderDir;

  }

  orderByValue() {
    if (this.valueOrderDir == undefined) {
      this.codeOrderDir = this.statusOrderDir =this.expireOrderDir= this.valueOrderDir =this.ownerOrderDir= undefined;

    }
    if (this.valueOrderDir) {
      this.allCoupon.sort((a, b) => a.value < b.value ? -1 : 1);

    } else {
      this.allCoupon.sort((a, b) => a.value > b.value ? -1 : 1);
    }
    this.valueOrderDir = !this.valueOrderDir;

  }

  
  orderByStatus() {
    if (this.statusOrderDir == undefined) {
      this.codeOrderDir = this.statusOrderDir =this.expireOrderDir= this.valueOrderDir =this.ownerOrderDir= undefined;

    }
    if (this.statusOrderDir) {
      this.allCoupon.sort((a, b) => a.status < b.status ? -1 : 1);

    } else {
      this.allCoupon.sort((a, b) => a.status > b.status ? -1 : 1);
    }
    this.statusOrderDir = !this.statusOrderDir;

  }

 
  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox(event) {
    let value = event.target.value;
    this.allCoupon=this.orginalCoupon;
    let as: Coupon[] = [];
    let fields = ['code','userId'];
    for (let field of fields) {
      for (let t of this.filterByfield(this.allCoupon, field, value)) {
        if (!as.includes(t)) {
          as.push(t);
        }
      }
    }
    this.allCoupon = as;

  }

  getAllCoupons() {
    this.couponHandler.getAllCoupons()
      .subscribe(data =>{
        let t :Coupon[]=[];
        for(let c of data){
          if(c.userId!=undefined&&c.userId!=''){
            // c.expireDate=new Date(c.expireDate).toISOString().slice(0, 16);
            this.couponHandler.getUsersById(c.userId).finally(()=>{
              t.push(c);
            }).subscribe(data=>{
              c.userId=data.ownerName;
            });
          }else {
            t.push(c);
          }
        }
          this.allCoupon = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
          this.orginalCoupon=this.allCoupon;
        }
        , errorCode => this.statusCode = errorCode);
  }


  // deleteCoupon(id: string) {
  //
  //   this.preConfig();
  //   this.couponHandler.getCouponId(id)
  //     .subscribe(coupon => {
  //         this.couponToUpdate = coupon;
  //         this.couponToUpdate.status = 'deactivated';
  //
  //         this.couponHandler.updateCoupon(this.couponToUpdate).subscribe(
  //           successCode => {
  //             this.statusCode = 200;
  //             this.getAllCoupons();
  //             // this.backToCreateArticle();
  //           },
  //           errorCode => this.statusCode = errorCode
  //         );
  //       },
  //       errorCode => this.statusCode = errorCode);

  // }


  ngOnInit() {
    this.getAllCoupons();
  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
