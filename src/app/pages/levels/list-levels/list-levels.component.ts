import { LevelHandlerService } from './../level-handler.service';
import { Level } from './../levels';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstService } from '../../../services/const.service';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-list-levels',
    templateUrl: './list-levels.component.html',
    styleUrls: ['./list-levels.component.css']
})
export class ListLevelsComponent implements OnInit {
    limitOrderDir;
    nameOrderDir;
    clintTypeOrderDir;
    countOrderDir;
    spinnerFlag: boolean;
    currentPage = 1;
    statusCode: number;
    requestProcess = false;
    page: number;
    pages = 20;
    levelCount;
    allLevel: Level[] = [];
    orginalCoupon: Level[] = [];
    returnedArray: Level[] = [];
    statuesFilter = ""
    // statues = [{ "value": "", "view": "coupon.status.all" }, { "value": "available", "view": "coupon.status.available" }, { "value": "used", "view": "coupon.status.used" }, { "value": "deactivated", "view": "coupon.status.deactivated" }]

    setState(event) {
        this.statuesFilter = event.target.value
        this.currentPage = 1;
        this.levelHandler.getLevelCount(this.statuesFilter).finally(() => {
            this.getLevels();
        }).subscribe(co => {
            this.levelCount = co['count'];
        }, errorCode => this.showError());

    }
    constructor(private levelHandler: LevelHandlerService, private router: Router, public c: ConstService, private alert: AlertService) {
        this.levelHandler.getLevelCount(this.statuesFilter).finally(() => {
            this.getLevels();
        }).subscribe(co => {
            this.levelCount = co['count'];
        }, errorCode => this.showError());
    }

    pageChanged(event: any): void {

        setTimeout(() => {
            this.getLevels();


        }, 50);

    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    changepages(event) {

        this.pages = event.target.value;

        this.getLevels();


    }

    editLevel(id: string) {
        this.router.navigate(['/levels/edit/' + id]);
    }

    orderByName() {
        if (this.nameOrderDir == undefined) {
            this.nameOrderDir = this.limitOrderDir  = this.countOrderDir = this.clintTypeOrderDir = undefined;


        }
        if (this.nameOrderDir) {
            this.allLevel.sort((a, b) => a['nameAr'].toLowerCase() < b['nameAr'].toLowerCase() ? -1 : 1);

        } else {
            this.allLevel.sort((a, b) => a['nameAr'].toLowerCase() > b['nameAr'].toLowerCase() ? -1 : 1);
        }
        this.nameOrderDir = !this.nameOrderDir;
    }

    orderByLimit() {
        if (this.limitOrderDir == undefined) {
            this.limitOrderDir = this.nameOrderDir = this.countOrderDir = this.clintTypeOrderDir = undefined;
        }
        if (this.limitOrderDir) {
            this.allLevel.sort((a, b) => a.limit < b.limit ? -1 : 1);

        } else {
            this.allLevel.sort((a, b) => a.limit > b.limit ? -1 : 1);
        }
        this.limitOrderDir = !this.limitOrderDir;

    }

    orderByClintType() {
        if (this.clintTypeOrderDir == undefined) {
            this.limitOrderDir = this.nameOrderDir = this.countOrderDir =  this.clintTypeOrderDir = undefined;


        }
        if (this.clintTypeOrderDir) {
            this.allLevel.sort((a, b) => a.clientType.toLowerCase() < b.clientType.toLowerCase() ? -1 : 1);

        } else {
            this.allLevel.sort((a, b) => a.clientType.toLowerCase() > b.clientType.toLowerCase() ? -1 : 1);
        }
        this.clintTypeOrderDir = !this.clintTypeOrderDir;

    }

    orderByCount() {
        if (this.countOrderDir == undefined) {
            this.limitOrderDir  = this.nameOrderDir = this.countOrderDir = this.clintTypeOrderDir = undefined;


        }
        if (this.countOrderDir) {
            this.allLevel.sort((a, b) => a.count < b.count ? -1 : 1);

        } else {
            this.allLevel.sort((a, b) => a.count > b.count ? -1 : 1);
        }
        this.countOrderDir = !this.countOrderDir;

    }

    // orderByValue() {
    //     if (this.valueOrderDir == undefined) {
    //         this.limitOrderDir = this.statusOrderDir = this.nameOrderDir = this.countOrderDir = this.valueOrderDir = this.clintTypeOrderDir = undefined;

    //     }
    //     if (this.valueOrderDir) {
    //         this.allLevel.sort((a, b) => a.value < b.value ? -1 : 1);

    //     } else {
    //         this.allLevel.sort((a, b) => a.value > b.value ? -1 : 1);
    //     }
    //     this.valueOrderDir = !this.valueOrderDir;

    // }


    // orderByStatus() {
    //     if (this.statusOrderDir == undefined) {
    //         this.limitOrderDir = this.statusOrderDir = this.nameOrderDir = this.countOrderDir = this.valueOrderDir = this.clintTypeOrderDir = undefined;

    //     }
    //     if (this.statusOrderDir) {
    //         this.allLevel.sort((a, b) => a.status < b.status ? -1 : 1);

    //     } else {
    //         this.allLevel.sort((a, b) => a.status > b.status ? -1 : 1);
    //     }
    //     this.statusOrderDir = !this.statusOrderDir;

    // }


    filterByfield(set: any[], field: string, value: string) {

        let f = set.filter(it => it[field].toLowerCase().includes(value));

        return f;
    }

    filterBox(event) {
        let value = event.target.value;
        if (value == '') {
            this.getLevels();

        } else {
            let as: Level[] = [];
            this.levelHandler.searchCoupons(value).finally(() => {
                this.allLevel = as;
                this.returnedArray = as;

            }).subscribe(data => {
                as = data;
            }, errorCode => this.showError());
        }
    }

    getLevels() {
        this.spinnerFlag = true;

        this.levelHandler.getLevels(this.statuesFilter, this.pages, this.currentPage).finally(() => {
            this.returnedArray = this.allLevel;
            this.spinnerFlag = false;

        })
            .subscribe(data => {
                // let t: Coupon[] = [];
                // for (let c of data) {
                //     if (c.userId != undefined && c.userId != '') {
                //         // c.expireDate=new Date(c.expireDate).toISOString().slice(0, 16);
                //         this.levelHandler.getUsersById(c.userId).finally(() => {
                //             t.push(c);
                //         }).subscribe(data => {
                //             c.userId = data.ownerName;
                //             c.shopName = data.shopName;
                //         }, errorCode => this.showError());
                //     } else {
                //         t.push(c);
                //     }
                // }
                this.allLevel = data;
            }
                , errorCode => this.showError());
    }


    // deleteCoupon(id: string) {
    //
    //   this.preConfig();
    //   this.levelHandler.getCouponId(id)
    //     .subscribe(coupon => {
    //         this.couponToUpdate = coupon;
    //         this.couponToUpdate.status = 'deactivated';
    //
    //         this.levelHandler.updateCoupon(this.couponToUpdate).subscribe(
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
        this.getLevels();
        
    }

    preConfig() {
        this.statusCode = null;
        this.requestProcess = true;
    }
}
