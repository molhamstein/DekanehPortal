import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AreaHandlerService} from '../area-handler.service';
import {Area} from '../area';

@Component({
    selector: 'app-new-area',
    templateUrl: './new-area.component.html',
    styleUrls: ['./new-area.component.css']
})
export class NewAreaComponent implements OnInit {
    newArea = false;
    area: Area;
    nameAr = '';
    nameEn = '';
    id;
    statusCode: number;

    processValidation = false;
    requestProcessing = false;
    submitted = false;
    AreaForm = new FormGroup({

        nameAr: new FormControl('', Validators.required),
        nameEn: new FormControl('', Validators.required),

    });

    constructor(private AreaHandler: AreaHandlerService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.newArea = true;

        } else {

            this.AreaHandler.getArea(this.id).subscribe(data => {
                this.area = data;
                this.AreaForm.setValue({
                    nameAr: data.nameAr,
                    nameEn: data.nameEn,
                });
            });


        }
    }

    creatNewArea() {
        this.area = this.AreaForm.value;
        this.AreaHandler.createArea(this.area).subscribe(
            successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/areas/list']);
            },
            errorCode => this.statusCode = errorCode
        );
    }

    updateArea() {
        this.area.nameAr = this.nameAr;
        this.area.nameEn = this.nameEn;
        this.AreaHandler.updateArea(this.area).subscribe(successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/areas/list']);
            },
            errorCode => this.statusCode = errorCode
        );
    }

    goHome() {
        this.router.navigate(['/areas/list']);

    }

    ngOnInit() {
    }

    onAreaFormSubmit() {
        this.submitted = true;
        this.processValidation = true;
        if (this.AreaForm.invalid) {
            return;
        }
        if (this.id == undefined) {
            this.creatNewArea();
        } else {
            this.updateArea();
        }
        console.log(this.area);
    }
}
