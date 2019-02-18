import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CouponHandlerService} from '../coupon-handler.service';
import {Coupon} from '../coupon';
import {IOption} from 'ng-select';
import {UserModel} from '../../user-model';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-new-coupon',
    templateUrl: './new-coupon.component.html',
    styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent implements OnInit {
    newCoupon = false;
    coupon: Coupon = new Coupon();
    types = ['fixed', 'percent'];
    IOusers: Array<IOption> = [];
    t: Array<IOption> = [];
    id;
    valuePerError = false;
  statusOptions: string[] = ['available', 'deactivated'];
    expireDate: Date;
    statusCode: number;
    processValidation = false;
    requestProcessing = false;
    submitted = false;
    CouponForm = new FormGroup({

        value: new FormControl('', Validators.required),
        // code: new FormControl('', Validators.required),
        expireDate: new FormControl(new Date().toISOString().slice(0, 16), Validators.required),
        status: new FormControl('',),
        numberOfTimes: new FormControl('',),
        numberOfUsed: new FormControl('',),
        userId: new FormControl('',),
        type: new FormControl('',),

    });

    constructor(private CouponHandler: CouponHandlerService, private router: Router, private route: ActivatedRoute,private alert:AlertService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.newCoupon = true;
            this.coupon = new Coupon();
            this.coupon.type = 'fixed';
            this.coupon.status = 'available';
        } else {

            this.CouponHandler.getCoupon(this.id).finally(() => {

                this.CouponForm.setValue({
                    value: this.coupon.value,
                    // code: this.coupon.code,
                    expireDate: new Date(this.coupon.expireDate).toISOString().slice(0, 16),
                    status: this.coupon.status,
                    numberOfTimes: this.coupon.numberOfTimes,
                    numberOfUsed: this.coupon.numberOfUsed,
                    userId: this.coupon.userId,
                    type: this.coupon.type,
                });
                let u: UserModel;
                this.CouponHandler.getUsersById(this.coupon.userId).finally(() => {
                    this.searchUsers(u.ownerName);

                }).subscribe(user => {
                    u = user;
                }, errorCode => this.showError());
                console.log(this.coupon);
            }).subscribe(data => {
                this.coupon = data;

            }, errorCode => this.showError());


        }
    }
    showError() {
        this.alert.showToast.next({type: 'error'});
    }
    typeCheck() {
        if (this.coupon.type == 'percent' && (this.coupon.value > 100 || this.coupon.value < 0)) {
            this.valuePerError = true;

        } else {
            this.valuePerError = false;

        }
    }

    creatNewCoupon() {
        this.CouponHandler.createCoupon(this.coupon).subscribe(
            successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/coupons/list']);
                console.log(this.statusCode);
            },
            errorCode => this.showError()
        );
    }

    updateCoupon() {

        this.CouponHandler.updateCoupon(this.coupon).subscribe(successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/coupons/list']);
            },
            errorCode => this.showError()
        );
    }

    goHome() {
        this.router.navigate(['/coupons/list']);

    }

    searchUsers(str) {

        this.CouponHandler.getUsersByString(str).subscribe(data => {
                this.t = [];
                for (let u of data) {
                    this.t.push({label: u.ownerName, value: u.id});
                }
                setTimeout(() => {
                    this.IOusers = this.t;
                }, 100);
            }, errorCode => this.showError()
        );
    }

    ngOnInit() {


    }

    onCouponFormSubmit() {
        this.typeCheck();
        this.processValidation = true;
        if (this.CouponForm.invalid || this.valuePerError) {
            return;
        } else {
            this.submitted = true;
        }
        if (this.id == undefined) {
            this.creatNewCoupon();
        } else {
            this.updateCoupon();
        }
        console.log(this.coupon);
    }
}
