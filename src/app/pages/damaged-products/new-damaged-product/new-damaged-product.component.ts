import { AbstractProductHandler } from './../../abstract-products/abstract-product-handler';
import { IOption } from 'ng-select';
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
  allReason = ['expired', 'damaged', 'other']
  requestProcess = false;
  newPro = true;
  absProducts = [];
  statusCode: number;
  processValidation = false;
  damagedProductForm = new FormGroup({
    note: new FormControl(''),
    reason: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
  });
  private product: DamagedProductModel;

  constructor(private Handler: DamagedProductHandler, private prodHandler: ProductHandler, private productabsHandeler: AbstractProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
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
        this.product = new DamagedProductModel(product.id, product.damageProducts, product.reason, product.date, product.note);
        var date = new Date(this.product.date)
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var hh = String(date.getHours()).padStart(2, '0');
        var MM = String(date.getMinutes()).padStart(2, '0');
        this.damagedProductForm = new FormGroup({
          id: new FormControl(this.product.id),
          note: new FormControl(this.product.note),
          reason: new FormControl(this.product.reason, Validators.required),
          date: new FormControl(yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + MM, Validators.required),
        });
        this.product.damageProducts.forEach(element => {
          this.abstractProductTable.push({
            "nameAr": element.productAbstractSnapshot.nameAr,
            "count": element.count,
            "productAbstractId": element.productAbstractId,
            "media": element.productAbstractSnapshot.media
          });
        });
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
    this.product['products'] = [];
    this.abstractProductTable.forEach(element => {
      this.product['products'].push({
        "count": element.count,
        "productAbstractId": element.productAbstractId,
      })
    });
    // this.product.offerSource = 'dockan';
    this.Handler.createProduct(this.product).finally(() => {
      this.router.navigate(['/damaged/add']);


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
      this.router.navigate(['/damaged/list']);
    },
      errorCode => this.showError());


  }

  onProductFormSubmit() {
    alert("SSS");
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

  abstract = []
  t = []
  IOAbstractProd: Array<IOption> = [];
  abstractProductTable = [];
  abstractProductIds = []


  removeProduct(id) {
    // this.product.offersIds.splice(this.product.offersIds.indexOf(id), 1);
    this.abstractProductTable.splice(this.abstractProductTable.indexOf(this.abstractProductTable.find(x => x.id === id)), 1);
  }
  productSelected(IOproduct) {
    let offer = this.abstract.find(x => x.value === IOproduct.value);
    console.log("offer")
    console.log(offer)
    // // this.newOffer.push(product);

    this.abstractProductTable.push({
      "nameAr": offer.label,
      "count": 0,
      "productAbstractId": offer.value,
      "media": offer.media
    });
    // this.newOrder.orderProducts = this.selectedProducts;
    this.abstractProductIds = [];

    // this.productCheck();

  }
  searchAbstract(str) {
    this.abstract = []
    this.t = [];
    if (str != '') {
      this.productabsHandeler.search(str)
        .subscribe(data => {
          for (let offer of data) {
            this.t.push({ label: offer.nameAr, value: offer.id });
            // if (this.product.abstractProductIds.includes(offer.id)) {
            this.abstract.push({ label: offer.nameAr, value: offer.id, media: offer.media })
            // }
          }
          setTimeout(() => {
            this.IOAbstractProd = this.t;
          }, 100);
        }
          , errorCode => this.showError());
    }

  }
}
