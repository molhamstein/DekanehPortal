import { Supplier } from './../supplier';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import { SupplierHandlerService } from '../supplier-handler.service';

@Component({
    selector: 'app-new-supplier',
    templateUrl: './new-supplier.component.html',
    styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {
    newSupplier = false;
    supplier: Supplier;
    nameAr = '';
    nameEn = '';
    id;
    statusCode: number;

    processValidation = false;
    requestProcessing = false;
    submitted = false;
    supplierForm = new FormGroup({

        nameAr: new FormControl('', Validators.required),
        nameEn: new FormControl('', Validators.required),

    });

    constructor(private SupplierHandler: SupplierHandlerService, private router: Router, private route: ActivatedRoute,private alert:AlertService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.newSupplier = true;

        } else {

            this.SupplierHandler.getSupplier(this.id).subscribe(data => {
                this.supplier = data;
                this.supplierForm.setValue({
                    nameAr: data.nameAr,
                    nameEn: data.nameEn,
                });
            });


        }
    }
    showError(){
        this.alert.showToast.next({type: "error"});
    }
    creatNewArea() {
        this.supplier = this.supplierForm.value;
        this.SupplierHandler.createSupplier(this.supplier).subscribe(
            successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/suppliers/list']);
            },
            errorCode => this.showError()
        );
    }

    updateArea() {
        this.supplier.nameAr = this.nameAr;
        this.supplier.nameEn = this.nameEn;
        this.SupplierHandler.updateSupplier(this.supplier).subscribe(successCode => {
                this.statusCode = successCode;
                this.router.navigate(['/suppliers/list']);
            },
            errorCode => this.showError()
        );
    }

    goHome() {
        this.router.navigate(['/suppliers/list']);

    }

    ngOnInit() {
    }

    onsupplierFormSubmit() {
        this.submitted = true;
        this.processValidation = true;
        if (this.supplierForm.invalid) {
            return;
        }
        if (this.id == undefined) {
            this.creatNewArea();
        } else {
            this.updateArea();
        }
        console.log(this.supplier);
    }
}
