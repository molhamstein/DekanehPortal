import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstService } from '../../../services/const.service';
import { AlertService } from '../../../services/alert.service';
import { ComplainHandlerService } from '../complain-handler.service';
import { Complain } from '../complain';

@Component({
    selector: 'app-list-complains',
    templateUrl: './list-complains.component.html',
    styleUrls: ['./list-complains.component.css']
})
export class ListComplainComponent implements OnInit {
    spinnerFlag: boolean;
    currentPage = 1;
    statusCode: number;
    requestProcess = false;
    page: number;
    pages = 20;
    complainCount;
    allComplain: Complain[] = [];
    orginalCoupon: Complain[] = [];
    returnedArray: Complain[] = [];

    constructor(private couponHandler: ComplainHandlerService, private router: Router, public c: ConstService, private alert: AlertService) {
        this.couponHandler.getComplainCount().finally(() => {
            this.getComplain();
        }).subscribe(co => {
            this.complainCount = co['count'];
        }, errorCode => this.showError());
    }

    pageChanged(event: any): void {

        setTimeout(() => {
            this.getComplain();


        }, 50);

    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    changepages(event) {

        this.pages = event.target.value;

        this.getComplain();


    }

 

    filterByfield(set: any[], field: string, value: string) {

        let f = set.filter(it => it[field].toLowerCase().includes(value));

        return f;
    }


    getComplain() {
        this.spinnerFlag = true;

        this.couponHandler.getComplain(this.pages, this.currentPage).finally(() => {
            this.returnedArray = this.allComplain;
            this.spinnerFlag = false;

        })
            .subscribe(data => {
                this.allComplain = data;
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
    //             this.getComplain();
    //             // this.backToCreateArticle();
    //           },
    //           errorCode => this.showError()
    //         );
    //       },
    //       errorCode => this.showError());

    // }


    ngOnInit() {
        this.getComplain();
    }

    preConfig() {
        this.statusCode = null;
        this.requestProcess = true;
    }
}
