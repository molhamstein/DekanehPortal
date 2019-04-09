import { ProductHandler } from './../../products/product-handler';
import { not } from 'rxjs/util/not';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { DamagedProductModel } from '../damaged-products-model';
import { DamagedProductHandler } from '../damaged-products-handler';

@Component({
  selector: 'app-new-damaged-product',
  templateUrl: './new-damaged-product.component.html',
  styleUrls: ['./new-damaged-product.component.css']
})
export class NewDamagedProductComponent implements OnInit {
  submitted = false;
  id: string;
  requestProcess = false;
  newPro = true;
  absProducts=[];
  statusCode: number;
  processValidation = false;
  damagedProductForm = new FormGroup({
    abstractProductId: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    subCategoryId: new FormControl('', Validators.required),
  });
  private product: DamagedProductModel;

  constructor(private Handler: DamagedProductHandler, private prodHandler:ProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.getAllAbs()
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    }, errorCode => this.showError());


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != undefined) {
      this.newPro = false;
      this.Handler.getProductById(this.id).subscribe(product => {
        this.product = new DamagedProductModel(product.id, product.abstractProductId, product.count, product.reason, product.date, product.note);
        this.product.id = product.id;
        this.damagedProductForm.addControl('id', new FormControl(''));
        this.damagedProductForm.setValue(this.product);
        console.log(this.damagedProductForm.value)
      }, errorCode => this.showError());
    } else {

    }

  }


  getAllAbs() {
    this.prodHandler.getAllAbs()
      .subscribe(data =>
        this.absProducts = data

        , errorCode => this.showError());
  }


  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  ngOnInit() {


  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  createProduct() {


    this.product = this.damagedProductForm.value;
    let t = [];
    // this.product.offerSource = 'dockan';
    this.Handler.createProduct(this.product).finally(() => {
      this.router.navigate(['/abstract-products/new']);


    })
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
        errorCode => this.showError());


  }

  updateProduct() {
    this.product = this.damagedProductForm.value;

    this.Handler.updateProduct(this.product).subscribe(successCode => {
      this.statusCode = successCode;
      this.router.navigate(['/products/list']);
    },
      errorCode => this.showError());


  }

  onProductFormSubmit() {
    this.processValidation = true;

    if (this.damagedProductForm.invalid) {

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
}
