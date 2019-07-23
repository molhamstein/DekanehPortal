import { LevelHandlerService } from './../../levels/level-handler.service';
import { ApiService } from './../../../services/api.service';
import { IOption } from 'ng-select';
import { AwardHandler } from './../award-handler';
import { AwardModel } from './../award-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { AreaHandlerService } from '../../areas/area-handler.service';
import { ProductHandler } from '../../products/product-handler';

@Component({
  selector: 'app-new-award',
  templateUrl: './new-award.component.html',
  styleUrls: ['./new-award.component.css']
})
export class NewAwardComponent implements OnInit {
  submitted = false;
  id: string;
  requestProcess = false;
  newAward = true;
  types = ['fixed', 'percent'];
  couponList = []
  prizeList = []

  prize = { "productId": "", "count": 0 }
  coupon: any = { "type": "fixed", "value": 0, "duration": "0", "numberOfTimes": 1 }
  manufacturers = []
  sibmpleOption: Array<IOption> = [{ value: "wholesale", label: "wholesale" }, { value: "horeca", label: "horeca" }, { value: "consumer", label: "consumer" }].map(option => ({ value: option.value, label: option.label }));
  areas: Array<IOption>;
  levels: Array<IOption>;
  statusCode: number;
  processValidation = false;
  action = { "target": 0, "type": "price" }
  awardActionTypes = ['price', 'count', 'products-price', 'products-count', 'company-price', 'company-count']
  IOProducts: Array<IOption> = [];
  IOProductsTarget: Array<IOption> = [];
  products = []
  t = []
  productsTarget = []
  tTarget = []
  targetProductIds = []
  targetProductTable = []
  awoardForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    occurrence: new FormControl('', Validators.required),
    occurrenceType: new FormControl('daily', Validators.required),
    areaIds: new FormControl([], Validators.required),
    levelIds: new FormControl([], Validators.required),
    times: new FormControl(0, Validators.required),
    countLimit: new FormControl(0, Validators.required),

  });

  private award: AwardModel;

  constructor(private Handler: AwardHandler, private api: ApiService, private productHandeler: ProductHandler, private levelsHandler: LevelHandlerService, private areaServices: AreaHandlerService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
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
    if (this.id != undefined) {
      this.newAward = false;
      this.Handler.getProductById(this.id).subscribe(product => {
        // this.product = new AwardModel(product.id, product.nameAr, product.nameEn, product.categoryId, product.subCategoryId, product.manufacturerId, product.media, product.officialMassMarketPrice, product.officialConsumerPrice);
        // this.product.id = product.id;
      }, errorCode => this.showError());
    } else {

    }

  }

  searchProduct(str) {
    this.products = []
    this.t = [];
    if (str != '') {
      this.productHandeler.search(str)
        .subscribe(data => {
          for (let offer of data) {
            this.t.push({ label: offer.nameAr, value: offer.id });
            // if (this.product.abstractProductIds.includes(offer.id)) {
            this.products.push({ label: offer.nameAr, value: offer.id, media: offer.media })
            // }
          }
          setTimeout(() => {
            this.IOProducts = this.t;
          }, 100);
        }
          , errorCode => this.showError());
    }

  }

  removeProduct(index) {
    // this.product.offersIds.splice(this.product.offersIds.indexOf(id), 1);
    this.targetProductTable.splice(index, 1);
  }


  targetProductSelected(IOproduct) {
    let offer = this.productsTarget.find(x => x.value === IOproduct.value);
    console.log("offer")
    console.log(offer)
    // // this.newOffer.push(product);

    this.targetProductTable.push({
      "nameAr": offer.label,
      "id": offer.value,
      "media": offer.media
    });
    // this.newOrder.orderProducts = this.selectedProducts;
    this.targetProductIds = [];

    // this.productCheck();

  }
  searchProductTarget(str) {
    this.productsTarget = []
    this.tTarget = [];
    if (str != '') {
      this.productHandeler.search(str)
        .subscribe(data => {
          for (let offer of data) {
            this.tTarget.push({ label: offer.nameAr, value: offer.id });
            // if (this.product.abstractProductIds.includes(offer.id)) {
            this.productsTarget.push({ label: offer.nameAr, value: offer.id, media: offer.media })
            // }
          }
          setTimeout(() => {
            this.IOProductsTarget = this.tTarget;
          }, 100);
        }
          , errorCode => this.showError());
    }

  }

  deleteCoupon(index) {
    this.couponList.splice(index, 1)
  }


  deletePrize(index) {
    this.prizeList.splice(index, 1)
  }


  addCoupon() {
    this.couponList.push(this.coupon);
    this.coupon = { "type": "fixed", "value": 0, "duration": "0", "numberOfTimes": 1 };
  }


  addPrize() {
    let product = this.products.find(x => x.value === this.prize.productId);
    // // this.newOffer.push(product);

    this.prizeList.push({
      "nameAr": product.label,
      "count": this.prize.count,
      "productId": this.prize.productId
    });

    this.prize = { "productId": "", "count": 0 }



  }


  showError() {
    this.alert.showToast.next({ type: 'error' });
  }








  ngOnInit() {
    this.areaServices.getAllAreas()
      .finally(() => {
      })
      .subscribe(data => {

        this.areas = data.map(option => ({ value: option.id, label: option.nameAr }));

      }
        , errorCode => this.showError());

    this.levelsHandler.getAllLevels()
      .finally(() => {
      })
      .subscribe(data => {

        this.levels = data.map(option => ({ value: option.id, clientType: option.clientType, label: option.nameAr + " '" + option.clientType + "'" }));

      }
        , errorCode => this.showError());

    this.api.get('/manufacturers').subscribe((data: any) => {
      if (data.status == 200)
        this.manufacturers = JSON.parse(data._body);
      else
        console.log(data.statusText);
    });
  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  createProduct() {


    this.award = this.awoardForm.value;
    if (this.action.type == 'products-price' || this.action.type == 'products-count') {
      this.targetProductTable.forEach(element => {
        if (this.action['productIds'] == null)
          this.action['productIds'] = []
        this.action['productIds'].push(element.id)
      });
    }
    this.award.action = this.action;
    this.award.coupons = this.couponList;
    this.award.prizes = []
    this.prizeList.forEach(element => {
      this.award.prizes.push({ "count": element.count, "productId": element.productId })
    });
    this.award.clientTypes = [];
    this.award['levelIds'].forEach(element => {
      var level = this.levels.find(function (levelElement) {
        if (element == levelElement.value) {
          return true;
        }
      })
      console.log("clinteType");

      console.log(level['clientType']);
      if (this.award.clientTypes.indexOf(level['clientType']) == -1)
        this.award.clientTypes.push(level['clientType'])
    });
    console.log(this.award);
    this.Handler.createProduct(this.award).finally(() => {
      this.router.navigate(['/awards/new']);


    })
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
        errorCode => this.showError());

  }

  updateProduct(withmedia?: boolean) {
    // this.product = this.ProductForm.value;

    // if (withmedia) {
    //   this.media.url = this.imgUrl;
    //   this.media.thumbnail = this.thumbUrl;
    //   this.media.jpgUrl = this.jpgUrl;
    //   this.product.media = this.media;
    // }
    // this.product.nameEn = this.product.nameAr;
    // this.Handler.updateProduct(this.product).subscribe(successCode => {
    //   this.statusCode = successCode;
    //   this.router.navigate(['/products/list']);
    // },
    //   errorCode => this.showError());


  }

  onProductFormSubmit() {
    this.processValidation = true;

    if (this.awoardForm.invalid) {

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
