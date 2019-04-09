import { SupplierHandlerService } from './../../supplier/supplier-handler.service';
import { AbstractProductHandler } from './../../abstract-products/abstract-product-handler';
import { AbstractProductModel } from './../../abstract-products/abstract-product-model';
import { IOption } from 'ng-select';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { SupplierOrder, SupplierOrderProduct } from '../Supplier-order';
import { SupplierOrdersHandlerService } from '../supplier-order-handler.service';

@Component({
  selector: 'app-new-supplier-order',
  templateUrl: './new-supplier-order.component.html',
  styleUrls: ['./new-supplier-order.component.css']
})
export class NewSupplierOrderComponent implements OnInit {
  submitted = false;
  id: string;
  requestProcess = false;
  supplierId = ""
  newPro = true;

  suppliers = [];
  supplierOrder;
  statusCode: number;
  processValidation = false;
  supplierOrderForm = new FormGroup({
    note: new FormControl(''),
    supplierId: new FormControl('', Validators.required)
  });
  private product: SupplierOrder;

  constructor(private Handler: SupplierOrdersHandlerService, private supplierHandler: SupplierHandlerService, private abstractHandeler: AbstractProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    }, errorCode => this.showError());


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getAllSupplier();
    if (this.id != undefined) {
      this.newPro = false;
      this.Handler.getOrder(this.id).subscribe(product => {
        console.log(product);
        // this.selectedAbsProducts=product;
        product.supplyProducts.forEach(element => {
          this.offerProducts.push({
            'count': element.count,
            'buyingPrice': element.buyingPrice,
            'productAbstractId': element.productAbstractId
          });
          this.selectedAbsProducts.push(element.productAbstractSnapshot)
        });

        // this.supplierOrder = new SupplierOrder(product);
        // this.product.id = product.id;
        // this.supplierOrderForm.setValue(this.product);
        this.supplierOrderForm = new FormGroup({
          note: new FormControl(product.note),
          supplierId: new FormControl(product.supplierId, Validators.required)
        });

        console.log("this.supplierOrderForm")
        console.log(this.supplierOrderForm)

      }, errorCode => this.showError());
    } else {

    }

  }



  showError() {
    this.alert.showToast.next({ type: 'error' });
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


  ngOnInit() {


  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  createProduct() {
    let tempSup = this.supplierOrderForm.value;
    tempSup.products = this.offerProducts;
    let sub = new SupplierOrder(tempSup)
    console.log(sub);
    // let t = [];
    this.Handler.createSupplierOrder(sub).finally(() => {
      this.router.navigate(['/supplier-orders/new']);


    })
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
        errorCode => this.showError());
  }

  updateProduct(withmedia?: boolean) {
    var tempSup = this.supplierOrderForm.value;
    tempSup.products = this.offerProducts;
    tempSup.id = this.id;
    let sub = new SupplierOrder(tempSup)
    console.log(sub);

    this.Handler.updateOrder(sub).subscribe(successCode => {
      this.statusCode = successCode;
      this.router.navigate(['/supplier-orders/list']);
    },
      errorCode => this.showError());


  }

  onProductFormSubmit() {
    this.processValidation = true;

    if (this.supplierOrderForm.invalid) {

      return;
    }
    if (this.id == undefined) {
      this.submitted = true;

      this.createProduct();
    } else {
      this.submitted = true;

      this.updateProduct();

    }
  }

  goProducts() {
    this.router.navigate(['/abstract-products/list']);

  }

  tP: Array<IOption> = [];
  IOproducts: Array<IOption> = [];
  selectedAbsProducts: AbstractProductModel[] = [];
  offerProducts: SupplierOrderProduct[] = [];

  pureAbsProducts: AbstractProductModel[];


  searchProducts(str) {
    this.tP = [];
    if (str != '') {
      this.abstractHandeler.search(str)
        .subscribe(data => {
          for (let pro of data) {
            this.tP.push({ label: pro.nameAr, value: pro.id });
          }
          // setTimeout(() => {
          console.log(this.tP);
          this.IOproducts = this.tP;
          // }, 50);
          this.pureAbsProducts = data;
          console.log(this.pureAbsProducts);

        }
          , errorCode => this.showError());
    }

  }

  findProduct(id) {
    return this.pureAbsProducts.find(x => x.id === id);
  }

  absproductSelected(IOproduct) {
    let product = this.findProduct(IOproduct.value);
    this.selectedAbsProducts.push(product);
    this.offerProducts.push({
      'count': 0,
      'buyingPrice': 0,
      'productAbstractId': IOproduct.value
    });
  }

  findselecttedProduct(id) {
    return this.selectedAbsProducts.find(x => x.id === id);
  }

  productDeSelected(id) {
    let product = this.selectedAbsProducts.find(x => x.id === id);

    this.selectedAbsProducts.splice(this.selectedAbsProducts.indexOf(product), 1);
    this.offerProducts.splice(this.offerProducts.indexOf(this.offerProducts.find(x => x.productAbstractId === id)), 1);
  }


}
