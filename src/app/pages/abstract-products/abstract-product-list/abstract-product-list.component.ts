import { AbstractProductModel } from './../abstract-product-model';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AbstractProductHandler } from '../abstract-product-handler';

@Component({
  selector: 'app-abstract-product-list',
  templateUrl: './abstract-product-list.component.html',
  styleUrls: ['./abstract-product-list.component.css']
})
export class AbstractProductListComponent implements OnInit {
  unpage = false;
  spinnerFlag: boolean;
  nameOrderDir;
  searchKey;
  officialMassMarketPriceDir;
  cat = '1';
  subcat = '1';
  man = '1';
  availableTo = '1';
  status = '1';
  isOffer;
  isFeatured;
  availableList = ['both', 'retailCostumer', 'wholesale', 'horeca'];
  statusList = ['available', 'unavailable', 'pending'];
  offerList = ['both', 'product', 'offer'];
  featuredList = ['both', 'isFeatured', 'notFeatured'];
  manOrderDir;
  statusOrderDir;
  retailerOrderDir;
  offerOrderDir;
  cats: any[] = [];
  mans: any[] = [];
  subcats: any[] = [];
  officialConsumerPriceDir;
  officialPriceOrderDir
  thresholdDir
  warningThresholdDir
  totalCountDir
  expectedCountDir
  statusCode: number;
  requestProcess = false;
  allProduct: AbstractProductModel[] = [];
  currentPage = 1;
  page: number;
  returnedArray: any[] = [];
  pages = 20;
  productsCount;
  searchString = '';

  isWarningView = false;
  warningData = []

  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  private eventOptions: boolean | { capture?: boolean, passive?: boolean };

  constructor(private abstractProductHandler: AbstractProductHandler, private router: Router, private alert: AlertService, private ngZone: NgZone) {
    this.getAllCats();
    // this.getAllMans();

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }

  keyUp() {
    var lastSearch = ""
    var mainThis = this
    lastSearch = mainThis.searchKey
    setTimeout(function () {
      if (lastSearch == mainThis.searchKey) {
        mainThis.filterBox()
      }
    }, 700);

  }

  pageChanged(event: any): void {
    setTimeout(() => {
      this.getAllProducts();

    }, 50);
  }

  editProduct(id: string) {
    this.router.navigate(['/abstract-products/edit/' + id]);
  }

  getWarningProd() {
    this.isWarningView = true;
    let as: AbstractProductModel[] = [];
    this.abstractProductHandler.getWarningProd().finally(() => {
      this.unpage = true;
      this.allProduct = as;
      this.returnedArray = as;

    }).finally(() => {
      if (localStorage.getItem('productsScreenY')) {
        setTimeout(() => {
          window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

        }, 1000);
      }
    }).subscribe(data => {
      this.warningData = data;
    }, errorCode => this.showError());
  }

  orderByName() {
    if (this.nameOrderDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;

    }
    if (this.nameOrderDir) {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() < b.nameAr.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() > b.nameAr.toLowerCase() ? -1 : 1);
    }
    this.nameOrderDir = !this.nameOrderDir;

  }

  orderByofficialMassMarketPrice() {
    if (this.officialMassMarketPriceDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;
    }
    if (this.officialMassMarketPriceDir) {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() < b.pack.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() > b.pack.toLowerCase() ? -1 : 1);
    }
    this.officialMassMarketPriceDir = !this.officialMassMarketPriceDir;

  }

  orderByMan() {
    if (this.manOrderDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;
    }
    if (this.manOrderDir) {
      this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() < b.manufacturer.nameAr.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() > b.manufacturer.nameAr.toLowerCase() ? -1 : 1);
    }
    this.manOrderDir = !this.manOrderDir;

  }

  orderByOfficialConsumerPrice() {
    if (this.officialConsumerPriceDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


    }
    if (this.officialConsumerPriceDir) {
      this.returnedArray.sort((a, b) => a.officialConsumerPriceDir < b.officialConsumerPriceDir ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.officialConsumerPriceDir > b.officialConsumerPriceDir ? -1 : 1);
    }
    this.officialConsumerPriceDir = !this.officialConsumerPriceDir;

  }


  orderByThreshold() {
    if (this.thresholdDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


    }
    if (this.thresholdDir) {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].threshold < b.warehouseProducts[0].threshold ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].threshold > b.warehouseProducts[0].threshold ? -1 : 1);
    }
    this.thresholdDir = !this.thresholdDir;

  }

  orderByWarningThresholdDir() {
    if (this.warningThresholdDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


    }
    if (this.warningThresholdDir) {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].warningThreshold < b.warehouseProducts[0].warningThreshold ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].warningThreshold > b.warehouseProducts[0].warningThreshold ? -1 : 1);
    }
    this.warningThresholdDir = !this.warningThresholdDir;

  }

  orderByTotalCount() {
    if (this.totalCountDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


    }
    if (this.totalCountDir) {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].totalCount < b.warehouseProducts[0].totalCount ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].totalCount > b.warehouseProducts[0].totalCount ? -1 : 1);
    }
    this.totalCountDir = !this.totalCountDir;

  }

  orderByExpectedCount() {
    if (this.expectedCountDir == undefined) {
      this.expectedCountDir = this.totalCountDir = this.warningThresholdDir = this.thresholdDir = this.manOrderDir = this.officialMassMarketPriceDir = this.nameOrderDir = this.officialConsumerPriceDir = undefined;


    }
    if (this.expectedCountDir) {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].expectedCount < b.warehouseProducts[0].expectedCount ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.warehouseProducts[0].expectedCount > b.warehouseProducts[0].expectedCount ? -1 : 1);
    }
    this.expectedCountDir = !this.expectedCountDir;

  }




  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox() {
    this.isWarningView=false;
    let value = this.searchKey;
    if (value == '') {
      this.getAllProducts();
      localStorage.removeItem('search');

    } else if (value.length > 2) {
      localStorage.setItem('search', value);
      localStorage.removeItem('filters');
      this.searchProducts(value);

    }
    // this.returnedArray = this.currentArray;
    // let fields = ['nameAr', 'pack'];
    // for (let field of fields) {
    //   for (let t of this.filterByfield(this.returnedArray, field, value)) {
    //     if (!as.includes(t)) {
    //       as.push(t);
    //     }
    //   }
    // }

  }

  searchProducts(str) {
    let as: AbstractProductModel[] = [];
    this.abstractProductHandler.search(str).finally(() => {
      this.unpage = true;
      this.allProduct = as;
      this.returnedArray = as;

    }).finally(() => {
      if (localStorage.getItem('productsScreenY')) {
        setTimeout(() => {
          window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

        }, 1000);
      }
    }).subscribe(data => {
      as = data;
    }, errorCode => this.showError());
  }

  getAllCats() {
    this.abstractProductHandler.getAllCats().finally(() => {
      this.getAllMans();
    })
      .subscribe(data =>
        this.cats = data

        , errorCode => this.showError());
  }

  setOfferFilter(e) {
    let value = e.target.value;
    if (value == 'offer') {
      this.isOffer = true;
    } else if (value == 'product') {
      this.isOffer = false;

    } else {
      this.isOffer = undefined;
    }

  }

  setFeaturedFilter(e) {
    let value = e.target.value;
    if (value == 'isFeatured') {
      this.isFeatured = true;
    } else if (value == 'notFeatured') {
      this.isFeatured = false;
    } else {
      this.isFeatured = undefined;
    }
  }

  setCatFilter(e) {
    this.onCatChange();
  }

  setSubCatFilter(e) {
    this.subcat = e.target.value;
  }

  setManFilter(e) {
    this.man = e.target.value;
  }

  setAvFilter(e) {
    this.availableTo = e.target.value;
  }

  onCatChange() {
    if (this.cat != '1') {
      this.subcats = this.cats.find(x => x.id === this.cat).subCategories;
    }
  }

  setFilters() {
    this.isWarningView=false;
    this.spinnerFlag = true;
    let filters = [];


    if (this.cat != '1') {
      filters.push({ name: 'categoryId', value: this.cat });
    }
    if (this.subcat != '1') {
      filters.push({ name: 'subCategoryId', value: this.subcat });
    }
    if (this.man != '1') {
      filters.push({ name: 'manufacturerId', value: this.man });
    }
    if (this.availableTo != '1') {
      filters.push({ name: 'availableTo', value: this.availableTo });
    }
    if (this.status != '1') {
      filters.push({ name: 'status', value: this.status });
    }
    if (this.isOffer != undefined) {
      filters.push({ name: 'isOffer', value: this.isOffer });
    }
    if (this.isFeatured != undefined) {
      filters.push({ name: 'isFeatured', value: this.isFeatured });
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.removeItem('search');
    if (filters != [] && filters.length != 0) {
      this.abstractProductHandler.getByFilters(filters).finally(() => {
        this.returnedArray = this.allProduct;
        this.spinnerFlag = false;
        this.unpage = true;
        if (localStorage.getItem('productsScreenY')) {
          setTimeout(() => {
            window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

          }, 1000);
        }
      }).subscribe(data => {

        this.allProduct = data;

      }, errorCode => this.showError());
    } else {
      this.getAllProducts();
    }
  }

  emptyFields() {
    localStorage.removeItem('filters');
    this.isWarningView=false;
    localStorage.removeItem('search');
    this.router.navigate(['/abstract-products/list']);
  }

  getAllMans() {
    this.abstractProductHandler.getAllMans().finally(() => {
      if (localStorage.getItem('search')) {
        this.searchProducts(localStorage.getItem('search'));
        this.searchString = localStorage.getItem('search');
      } else {
        if (localStorage.getItem('filters')) {
          let tem = JSON.parse(localStorage.getItem('filters'));
          if (tem.find(x => x.name == 'categoryId')) {
            this.cat = tem.find(x => x.name == 'categoryId').value;
            this.onCatChange();
          }
          if (tem.find(x => x.name == 'subCategoryId')) {
            this.subcat = tem.find(x => x.name == 'subCategoryId').value;
          }
          if (tem.find(x => x.name == 'manufacturerId')) {
            this.man = tem.find(x => x.name == 'manufacturerId').value;
          }
          if (tem.find(x => x.name == 'availableTo')) {
            this.availableTo = tem.find(x => x.name == 'availableTo').value;
          }
          if (tem.find(x => x.name == 'status')) {
            this.status = tem.find(x => x.name == 'status').value;
          }
          if (tem.find(x => x.name == 'isOffer')) {
            this.isOffer = tem.find(x => x.name == 'isOffer').value;
          }
          if (tem.find(x => x.name == 'isFeatured')) {
            this.isFeatured = tem.find(x => x.name == 'isFeatured').value;
          }
        }
        this.setFilters();
      }

    })
      .subscribe(data =>
        this.mans = data

        , errorCode => this.showError());
  }

  getAllProducts() {
    this.spinnerFlag = true;
    this.abstractProductHandler.getProductsCount().finally(() => {
      this.abstractProductHandler.getPerPageProducts(this.pages, this.currentPage)
        .finally(() => {
          this.returnedArray = this.allProduct;
          this.spinnerFlag = false;
          this.unpage = false;

          if (localStorage.getItem('productsScreenY')) {
            setTimeout(() => {
              window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

            }, 100);
          }

        })
        .subscribe(data => {
          this.allProduct = data;
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
