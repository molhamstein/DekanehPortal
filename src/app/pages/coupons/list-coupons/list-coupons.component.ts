import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CouponHandlerService} from '../coupon-handler.service';
import {Coupon} from '../coupon';
import {ConstService} from '../../../services/const.service';
import {AlertService} from '../../../services/alert.service';

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
    spinnerFlag: boolean;
    currentPage = 1;
    statusCode: number;
    requestProcess = false;
    page: number;
    pages = 2;
    couponCount;
    allCoupon: Coupon[] = [];
    orginalCoupon: Coupon[] = [];
    returnedArray: Coupon[] = [];

    constructor(private couponHandler: CouponHandlerService, private router: Router, public c: ConstService,private alert:AlertService) {
        this.couponHandler.getCouponCount().finally(() => {
            this.getCoupons();
        }).subscribe(co => {
            this.couponCount = co['count'];
        } , errorCode => this.showError());
    }

    pageChanged(event: any): void {

        setTimeout(() => {
            this.getCoupons();


        }, 50);

    }
    showError() {
        this.alert.showToast.next({type: 'error'});
    }
    changepages(event) {

        this.pages = event.target.value;

        this.getCoupons();


    }

    editCoupon(id: string) {
        this.router.navigate(['/coupons/edit/' + id]);
    }

    orderByCode() {
        if (this.codeOrderDir == undefined) {
            this.codeOrderDir = this.statusOrderDir = this.expireOrderDir = this.valueOrderDir = this.ownerOrderDir = undefined;
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
            this.codeOrderDir = this.statusOrderDir = this.expireOrderDir = this.valueOrderDir = this.ownerOrderDir = undefined;


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
            this.codeOrderDir = this.statusOrderDir = this.expireOrderDir = this.valueOrderDir = this.ownerOrderDir = undefined;


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
            this.codeOrderDir = this.statusOrderDir = this.expireOrderDir = this.valueOrderDir = this.ownerOrderDir = undefined;

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
            this.codeOrderDir = this.statusOrderDir = this.expireOrderDir = this.valueOrderDir = this.ownerOrderDir = undefined;

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
        if (value == '') {
            this.getCoupons();

        } else {
            let as: Coupon[] = [];
            this.couponHandler.searchCoupons(value).finally(() => {
                this.allCoupon = as;
                this.returnedArray = as;

            }).subscribe(data => {
                as = data;
            }, errorCode => this.showError());
        }
    }

    getCoupons() {
        this.spinnerFlag = true;

        this.couponHandler.getCoupons(this.pages, this.currentPage).finally(() => {
            this.returnedArray = this.allCoupon;
            this.spinnerFlag = false;

        })
            .subscribe(data => {
                    let t: Coupon[] = [];
                    for (let c of data) {
                        if (c.userId != undefined && c.userId != '') {
                            // c.expireDate=new Date(c.expireDate).toISOString().slice(0, 16);
                            this.couponHandler.getUsersById(c.userId).finally(() => {
                                t.push(c);
                            }).subscribe(data => {
                                c.userId = data.ownerName;
                            }, errorCode => this.showError());
                        } else {
                            t.push(c);
                        }
                    }
                    this.allCoupon = data;
                }
                , errorCode => this.showError());
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
    //             this.getCoupons();
    //             // this.backToCreateArticle();
    //           },
    //           errorCode => this.showError()
    //         );
    //       },
    //       errorCode => this.showError());

    // }


    ngOnInit() {
        this.getCoupons();
    }

    preConfig() {
        this.statusCode = null;
        this.requestProcess = true;
    }
}
