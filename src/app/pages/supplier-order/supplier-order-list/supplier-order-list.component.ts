import { SupplierHandlerService } from './../../supplier/supplier-handler.service';
import { SupplierOrder, SupplierOrderProduct } from './../Supplier-order';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConstService } from '../../../services/const.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ProductHandler } from '../../products/product-handler';
import { ProductModel } from '../../products/product-model';
import { CouponHandlerService } from '../../coupons/coupon-handler.service';
import { UserModel } from '../../user-model';
import { Coupon } from '../../coupons/coupon';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { StaffHandler } from '../../staff/staff.handler';
import { DatePipe } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { element } from 'protractor';
import { SupplierOrdersHandlerService } from '../supplier-order-handler.service';

@Component({
  selector: 'app-supplier-order-list',
  templateUrl: './supplier-order-list.component.html',
  styleUrls: ['./supplier-order-list.component.css']
})
export class SupplierOrdersListComponent implements OnInit {
  unpage = false;
  spinnerFlag: boolean;
  viewProduct = []
  CountProduct=[]
  nameOrderDir;
  dateDir
  totalCountDir
  statusCode: number;
  requestProcess = false;
  allSupplierOreder: SupplierOrder[] = [];
  currentPage = 1;
  page: number;
  returnedArray: any[] = [];
  pages = 20;
  productsCount;
  searchString = '';


  showError() {
    this.alert.showToast.next({ type: 'error' });
  }
  modalRef;
  confirmId
  openModal(template: TemplateRef<any>, id) {
    this.confirmId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
  }

  private eventOptions: boolean | { capture?: boolean, passive?: boolean };

  suppliers = []
  statuses = ["pending", "canceled", "delivered"]
  supplier = 1
  status = 1
  from;
  to;
  constructor(private modalService: BsModalService, private SupplierOrdersHandler: SupplierOrdersHandlerService, private supplierHandler: SupplierHandlerService, private router: Router, private alert: AlertService, private c: ConstService) {
    this.getAllProducts();
    this.getAllSupplier();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  pageChanged(event: any): void {
    setTimeout(() => {
      this.getAllProducts();

    }, 50);
  }

  editSupllierOrder(id: string) {
    this.router.navigate(['/supplier-orders/edit/' + id]);
  }

  decline(): void {
    this.modalRef.hide();
  }


  canselSupllierOrder() {
    this.decline();

    this.SupplierOrdersHandler.cancelSupplierOrder(this.confirmId)
      .finally(() => {
      })
      .subscribe(data => {

        this.getAllProducts();
      }
        , errorCode => this.showError());


  }


  deliverSupllierOrder(id) {
    this.decline();
    this.SupplierOrdersHandler.deliverSupplierOrder(this.confirmId)
      .finally(() => {
      })
      .subscribe(data => {

        this.getAllProducts();
      }
        , errorCode => this.showError());


  }
  getAllSupplier() {
    this.supplierHandler.getAllSuppliers()
      .finally(() => {
      })
      .subscribe(data => {

        this.suppliers = data
      }
        , errorCode => this.showError());


  }

  setFilters() {
    var where = {};
    where['and'] = [];
    if (this.from)
      where['and'].push({ "createDate": { gt: new Date(this.from) } })
    if (this.to)
      where['and'].push({ "createDate": { lt: new Date(this.to) } })
    if (this.supplier != 1)
      where['and'].push({ "supplierId": this.supplier })
    if (this.status != 1)
      where['and'].push({ "status": this.status })
    this.getAllProducts({ "where": where });
  }

  emptyFields() {
    this.from = null;
    this.to = null;
    this.status = 1;
    this.supplier = 1;
    this.getAllProducts();

  }
  // orderByName() {
  //   if (this.nameOrderDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;

  //   }
  //   if (this.nameOrderDir) {
  //     this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() < b.nameAr.toLowerCase() ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() > b.nameAr.toLowerCase() ? -1 : 1);
  //   }
  //   this.nameOrderDir = !this.nameOrderDir;

  // }

  // orderByofficialMassMarketPrice() {
  //   if (this.officialMassMarketPriceDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;
  //   }
  //   if (this.officialMassMarketPriceDir) {
  //     this.returnedArray.sort((a, b) => a.pack.toLowerCase() < b.pack.toLowerCase() ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.pack.toLowerCase() > b.pack.toLowerCase() ? -1 : 1);
  //   }
  //   this.officialMassMarketPriceDir = !this.officialMassMarketPriceDir;

  // }

  // orderByMan() {
  //   if (this.manOrderDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;
  //   }
  //   if (this.manOrderDir) {
  //     this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() < b.manufacturer.nameAr.toLowerCase() ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() > b.manufacturer.nameAr.toLowerCase() ? -1 : 1);
  //   }
  //   this.manOrderDir = !this.manOrderDir;

  // }

  // orderByOfficialConsumerPrice() {
  //   if (this.officialConsumerPriceDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


  //   }
  //   if (this.officialConsumerPriceDir) {
  //     this.returnedArray.sort((a, b) => a.officialConsumerPriceDir < b.officialConsumerPriceDir ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.officialConsumerPriceDir > b.officialConsumerPriceDir ? -1 : 1);
  //   }
  //   this.officialConsumerPriceDir = !this.officialConsumerPriceDir;

  // }


  // orderByThreshold() {
  //   if (this.thresholdDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


  //   }
  //   if (this.thresholdDir) {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].threshold < b.warehouseProducts[0].threshold ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].threshold > b.warehouseProducts[0].threshold ? -1 : 1);
  //   }
  //   this.thresholdDir = !this.thresholdDir;

  // }

  // orderByWarningThresholdDir() {
  //   if (this.warningThresholdDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


  //   }
  //   if (this.warningThresholdDir) {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].warningThreshold < b.warehouseProducts[0].warningThreshold ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].warningThreshold > b.warehouseProducts[0].warningThreshold ? -1 : 1);
  //   }
  //   this.warningThresholdDir = !this.warningThresholdDir;

  // }

  // orderByTotalCount() {
  //   if (this.totalCountDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


  //   }
  //   if (this.totalCountDir) {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].totalCount < b.warehouseProducts[0].totalCount ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].totalCount > b.warehouseProducts[0].totalCount ? -1 : 1);
  //   }
  //   this.totalCountDir = !this.totalCountDir;

  // }

  // orderByExpectedCount() {
  //   if (this.expectedCountDir == undefined) {
  //     this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


  //   }
  //   if (this.expectedCountDir) {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].expectedCount < b.warehouseProducts[0].expectedCount ? -1 : 1);

  //   } else {
  //     this.returnedArray.sort((a, b) => a.warehouseProducts[0].expectedCount > b.warehouseProducts[0].expectedCount ? -1 : 1);
  //   }
  //   this.expectedCountDir = !this.expectedCountDir;

  // }




  // filterByfield(set: any[], field: string, value: string) {

  //   let f = set.filter(it => it[field].toLowerCase().includes(value));

  //   return f;
  // }

  // emptyFields() {
  //   localStorage.removeItem('filters');
  //   this.isWarningView = false;
  //   localStorage.removeItem('search');
  //   this.router.navigate(['/abstract-products/list']);
  // }



  getAllProducts(where = {}) {
    this.spinnerFlag = true;
    this.SupplierOrdersHandler.getOrdersCount(where).finally(() => {
      this.SupplierOrdersHandler.getOrders(this.pages, this.currentPage, where)
        .finally(() => {
          this.returnedArray = this.allSupplierOreder;
          for (var i = 0; i < this.returnedArray.length; ++i) {
            this.viewProduct[i] = false;
            this.CountProduct[i] = 0;
            this.returnedArray[i].supplyProducts.forEach(element => {
              this.CountProduct[i] += element.count
            });
          }
          this.spinnerFlag = false;
          this.unpage = false;

          if (localStorage.getItem('productsScreenY')) {
            setTimeout(() => {
              window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

            }, 100);
          }

        })
        .subscribe(data => {
          this.allSupplierOreder = data;
        }
          , errorCode => this.showError());

    }).subscribe(c => {
      this.productsCount = c['count'];
    }, errorCode => this.showError());


  }


  // deleteProduct(id: string) {
  //
  //   this.preConfig();
  //   this.abstractProductHandler.getProductById(id)
  //     .subscribe(product => {
  //         this.productToUpdate = product;
  //         this.productToUpdate.status = 'deactivated';
  //
  //         this.abstractProductHandler.updateOrder(this.productToUpdate).subscribe(
  //           successCode => {
  //             this.statusCode = 200;
  //             this.allProduct = this.originalProducts;
  //             // this.backToCreateArticle();
  //           },
  //           errorCode => this.showError()
  //         );
  //       },
  //       errorCode => this.showError());
  //
  // }

  changepages(event) {

    this.pages = event.target.value;
    setTimeout(() => {
      this.currentPage = 1;
    }, 50);
    this.getAllProducts();


  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    if (window.pageYOffset.toString() != '0') {
      localStorage.setItem('productsScreenY', window.pageYOffset.toString());

    }
  };

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
