import { TransfereService } from './../../../services/transfere.service';
import { ConstService } from './../../../services/const.service';
import { SupplierOrder } from './../../supplier-order/Supplier-order';
import { AbstractProductHandler } from './../../abstract-products/abstract-product-handler';
import { IOption } from 'ng-select';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { SupplierHandlerService } from '../../supplier/supplier-handler.service';
import { SupplierOrdersHandlerService } from '../../supplier-order/supplier-order-handler.service';

@Component({
  selector: 'app-warning-report',
  templateUrl: './warning-report.component.html',
  styleUrls: ['./warning-report.component.css']
})
export class WarningReportComponent implements OnInit {
  submitted = false;
  processValidation = false;
  tP: Array<IOption> = [];
  IOproducts: Array<IOption> = [];
  products = []
  newProducts: any[] = [];
  selectedProducts: any[] = [];
  selectedProductsIds: string[];
  suppliers = []
  supplierId;
  thresholdList = ["threshold", "warning", "only-warning", "instock"]
  threshold = "threshold"
  count;
  currentPage = 1;
  pages = 20;
  data = []
  cart = {}
  constructor(private router: Router, transferSer: TransfereService, private productHandler: AbstractProductHandler, private SupplierOrder: SupplierOrdersHandlerService, private supplierHandler: SupplierHandlerService,
    private alert: AlertService, private c: ConstService) {
    let data = transferSer.getData()
    if (data != null) {
      this.threshold = data.type
    }
    this.cart = JSON.parse(localStorage.getItem('cart')) || {};
    console.log("this.cart")
    console.log(localStorage.getItem('cart'))
  }

  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  addToCart(product) {
    this.cart[product.id] = product
    localStorage.setItem('cart', JSON.stringify(this.cart))// JSON.parse(data['_body']).user.username);
    console.log(JSON.stringify(this.cart))
  }

  removerFromCart(product) {
    delete this.cart[product.id]
    localStorage.setItem('cart', JSON.stringify(this.cart))// JSON.parse(data['_body']).user.username);
  }

  pageChanged(event: any): void {
    setTimeout(() => {
      this.changeThreshold();

    }, 50);
  }

  // createSupplierOrder() {
  //   if (this.supplierId == null || this.selectedProducts.length == 0)
  //     return
  //   this.processValidation = true;
  //   this.submitted = true;
  //   let tempSup = {};
  //   tempSup['products'] = this.selectedProducts;
  //   tempSup['supplierId'] = this.supplierId
  //   let sub = new SupplierOrder(tempSup)
  //   // let t = [];
  //   this.SupplierOrder.createSupplierOrder(sub).finally(() => {
  //     this.router.navigate(['/supplier-orders/list']);


  //   })
  //     .subscribe(successCode => {
  //     },
  //       errorCode => this.showError());
  // }

  changeThreshold(isPaggination = false) {
    if (isPaggination == false) {
      this.currentPage = 1;
    }
    this.newProducts = []
    this.selectedProducts = []
    this.productHandler.getWarningProdCount(this.threshold).subscribe(data => {
      this.count = data.count;
      this.productHandler.getWarningProd(this.threshold, this.pages, this.currentPage).finally(() => {
      }).finally(() => {

      }).subscribe(data => {
        this.data = data
      }, errorCode => this.showError());
    }, errorCode => this.showError());

  }
  ngOnInit() {
    console.log("init")
    this.changeThreshold()
  }


  // window.addEventListener('scroll', this.scroll, true);


  // productDeSelected(id) {
  //   let product = this.products.find(x => x._id === id);
  //   this.selectedProducts.splice(this.selectedProducts.indexOf(this.selectedProducts.find(x => x.productId === id)), 1);
  // }

  // searchProducts(str) {
  //   this.tP = [];
  //   if (str != '') {
  //     this.productHandler.searchByUser(str, "")
  //       .subscribe(data => {
  //         for (let pro of data) {
  //           this.tP.push({ label: pro.nameAr, value: pro._id });
  //         }
  //         setTimeout(() => {
  //           this.IOproducts = this.tP;
  //         }, 50);
  //         this.products = this.products.concat(data);
  //       }
  //         , errorCode => this.showError());
  //   }
  // }

  // productSelected(IOproduct) {
  //   let product = this.products.find(x => x._id === IOproduct.value);
  //   this.newProducts.push(product);

  //   this.selectedProducts.push({
  //     'count': 0,
  //     'buyingPrice': 0,
  //     'productAbstractId': product.id

  //   });
  //   // this.newOrder.orderProducts = this.selectedProducts;
  //   this.selectedProductsIds = [];

  //   // this.productCheck();
  // }

  // getAllSupplier() {
  //   this.supplierHandler.getAllSuppliers()
  //     .finally(() => {
  //     })
  //     .subscribe(data => {

  //       this.suppliers = data
  //     }
  //       , errorCode => this.showError());


  // }

  // findProduct(id) {
  //   return this.newProducts.find(x => x.id === id);
  // }
}
