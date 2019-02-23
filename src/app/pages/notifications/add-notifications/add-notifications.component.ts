import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationHandlerService } from '../notification-handler.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
    selector: 'app-add-notifications',
    templateUrl: './add-notifications.component.html',
    styleUrls: ['./add-notifications.component.css']
})
export class AddNotificationsComponent implements OnInit {
    spinnerFlag: boolean;
    notificationForm: FormGroup;
    IOoffers: Array<IOption> = [];
    t: Array<IOption> = [];
    userIds = [];
    submitted = false;
    title = "";
    message = "";
    offersTable = [];
    constructor(private Handler: NotificationHandlerService, private alert: AlertService, private router: Router) {
        this.spinnerFlag = true;
    }

    searchOfUser(str) {
        // this.t = [];
        if (str != '') {
            this.Handler.searchByUserName(str)
                .subscribe(data => {
                    for (let offer of data) {
                        this.t.push({ label: offer.ownerName + " - " + offer.shopName, value: offer.id });
                        // if(this.product.offersIds.includes(offer.id)){
                        //   this.offers.push({label: offer.nameAr, value: offer.id})
                        // }
                    }
                    // setTimeout(() => {

                    this.IOoffers = this.t;
                    // }, 100);
                }
                    , errorCode => this.showError());
        }
    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    // sendNot() {
    //     this.Handler.sendNot(this.notificationForm.value)
    // }

    submitNot() {
        if (this.notificationForm.valid == false) {
            this.submitted = true;
            return
        }
        this.Handler.sendNot(this.notificationForm.value).subscribe(
            successCode => {
                this.ngOnInit()
            },
            errorCode => this.showError()
        )
    }
    ngOnInit() {
        this.searchOfUser(" ")
        this.notificationForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            message: new FormControl('', [Validators.required]),
            userIds: new FormControl([])
        });
    }

}
