import { Level } from './../levels';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IOption} from 'ng-select';
import {UserModel} from '../../user-model';
import {AlertService} from '../../../services/alert.service';
import { LevelHandlerService } from '../level-handler.service';

@Component({
    selector: 'app-new-level',
    templateUrl: './new-level.component.html',
    styleUrls: ['./new-level.component.css']
})
export class NewLevelComponent implements OnInit {
    newLevel = false;
    level: Level = new Level();
    id;
    valuePerError = false;
    statusCode: number;
    processValidation = false;
    requestProcessing = false;
    submitted = false;
    types=[{ value: "wholesale", label: "wholesale" }, { value: "horeca", label: "horeca" }, { value: "consumer", label: "consumer" }]
    levelForm = new FormGroup({
        nameAr: new FormControl('', Validators.required),
        limit: new FormControl('', Validators.required),
        clientType: new FormControl('', Validators.required),
    });

    constructor(private levelHandler: LevelHandlerService, private router: Router, private route: ActivatedRoute,private alert:AlertService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.newLevel = true;
            this.level = new Level();
        } else {

            this.levelHandler.getLevel(this.id).finally(() => {

                this.levelForm.setValue({
                    nameAr: this.level.nameAr,
                    limit: this.level.limit,
                    clientType: this.level.clientType,
                });
            }).subscribe(data => {
                this.level = data;

            }, errorCode => this.showError());


        }
    }
    showError() {
        this.alert.showToast.next({type: 'error'});
    }

    creatNewLevel() {
        this.level=this.levelForm.value;
        this.level.nameEn=this.level.nameAr;
        this.levelHandler.createLevel(this.level).subscribe(
            successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/coupons/list']);
                console.log(this.statusCode);
            },
            errorCode => this.showError()
        );
    }

    updateLevel() {
        this.level=this.levelForm.value;
        this.level.nameEn=this.level.nameAr;
        this.level.id=this.id;

        this.levelHandler.updateLevel(this.level).subscribe(successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/levels/list']);
            },
            errorCode => this.showError()
        );
    }

    goHome() {
        this.router.navigate(['/levels/list']);

    }

   

    ngOnInit() {


    }

    onCouponFormSubmit() {
        this.processValidation = true;
        if (this.levelForm.invalid || this.valuePerError) {
            return;
        } else {
            this.submitted = true;
        }
        if (this.id == undefined) {
            this.creatNewLevel();
        } else {
            this.updateLevel();
        }
    }
}
