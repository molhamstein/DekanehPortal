import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {ConstService} from '../../../services/const.service';
import { Supplier } from '../supplier';
import { SupplierHandlerService } from '../supplier-handler.service';

@Component({
    selector: 'app-list-suppliers',
    templateUrl: './list-suppliers.component.html',
    styleUrls: ['./list-suppliers.component.css']
})
export class ListSuppliersComponent implements OnInit {


    nameArOrderDir;
    nameEnOrderDir;
    createdAtOrderDir;
    creationDateCode: number;
    requestProcess = false;
    allSuppliers: Supplier[] = [];
    originalSuppliers: Supplier[] = [];
    currentPage = 4;
    page: number;
    returnedArray: Supplier[] = [];
    currentArray: Supplier[] = [];
    pages = 10;

    constructor(private supplierHandler: SupplierHandlerService, private router: Router, private alert: AlertService, private c: ConstService) {
        this.getAllArea();
    }

    pageChanged(event: any): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.allSuppliers.slice(startItem, endItem);
        this.currentArray = this.returnedArray;
    }

    editArea(id: string) {
        this.router.navigate(['/suppliers/edit/' + id]);
    }

    orderByNameAr() {
        if (this.nameArOrderDir == undefined) {
            this.nameArOrderDir = this.nameEnOrderDir = this.createdAtOrderDir = undefined;

        }
        if (this.nameArOrderDir) {
            this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() < b.nameAr.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() > b.nameAr.toLowerCase() ? -1 : 1);
        }
        this.nameArOrderDir = !this.nameArOrderDir;

    }

    orderByNameEn() {
        if (this.nameEnOrderDir == undefined) {
            this.nameArOrderDir = this.nameEnOrderDir = this.createdAtOrderDir = undefined;

        }
        if (this.nameEnOrderDir) {
            this.returnedArray.sort((a, b) => a.nameEn.toLowerCase() < b.nameEn.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.nameEn.toLowerCase() > b.nameEn.toLowerCase() ? -1 : 1);
        }
        this.nameEnOrderDir = !this.nameEnOrderDir;

    }


    orderByCreatedAt() {
        if (this.createdAtOrderDir == undefined) {
            this.nameArOrderDir = this.nameEnOrderDir = this.createdAtOrderDir = undefined;


        }
        if (this.createdAtOrderDir) {
            this.returnedArray.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.creationDate < b.creationDate ? -1 : 1);
        }
        this.createdAtOrderDir = !this.createdAtOrderDir;

    }


    filterByfield(set: any[], field: string, value: string) {

        let f = set.filter(it => it[field].toLowerCase().includes(value));

        return f;
    }

    filterBox(event) {
        let value = event.target.value;
        this.returnedArray = this.currentArray;
        let as: Supplier[] = [];
        let fields = ['nameAr', 'nameEn'];
        for (let field of fields) {
            for (let t of this.filterByfield(this.returnedArray, field, value)) {
                if (!as.includes(t)) {
                    as.push(t);
                }
            }
        }
        this.returnedArray = as;

    }

    getAllArea() {
        this.supplierHandler.getAllSuppliers()
            .finally(() => {
                this.returnedArray = this.allSuppliers.slice(0, this.pages);
                this.currentArray = this.returnedArray;
            })
            .subscribe(data => {
                  

                    this.allSuppliers = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
                    this.originalSuppliers = this.allSuppliers;
                }
                , errorCode => this.showError());


    }
    showError() {
        this.alert.showToast.next({type: 'error'});
    }
  
    changepages(event) {
        this.pages = event.target.value;
        this.returnedArray = this.allSuppliers.slice(0, this.pages);
        this.currentArray = this.returnedArray;
        setTimeout(() => {
            this.currentPage = 1;
        }, 50);


    }

    ngOnInit() {
    }

    preConfig() {
        this.creationDateCode = null;
        this.requestProcess = true;
    }

}
