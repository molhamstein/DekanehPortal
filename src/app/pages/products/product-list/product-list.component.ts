import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ProductHandler} from '../product-handler';
import {ProductModel} from '../product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  unpage = false;
  spinnerFlag: boolean;
  nameOrderDir;
  packOrderDir;
  cat;
  subcat;
  man;
  availableTo;
  isOffer;
  availableList = ['both', 'retailCostumer', 'wholesale', 'horeca'];
  offerList = ['both', 'product', 'offer'];
  manOrderDir;
  statusOrderDir;
  retailerOrderDir;
  offerOrderDir;
  cats: any[] = [];
  mans: any[] = [];
  subcats: any[] = [];
  clientPriceOrderDir;
  statusCode: number;
  requestProcess = false;
  allProduct: ProductModel[] = [];
  currentPage = 1;
  page: number;
  returnedArray: any[] = [];
  pages = 20;
  productsCount;

  pageChanged(event: any): void {
    setTimeout(() => {
      this.getAllProducts();

    }, 50);
  }

  constructor(private productHandler: ProductHandler, private router: Router) {
    this.getAllCats();
    this.getAllMans();
    this.getAllProducts();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit/' + id]);
  }

  orderByName() {
    if (this.nameOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

    }
    if (this.nameOrderDir) {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() < b.nameAr.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() > b.nameAr.toLowerCase() ? -1 : 1);
    }
    this.nameOrderDir = !this.nameOrderDir;

  }

  orderByPack() {
    if (this.packOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;
    }
    if (this.packOrderDir) {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() < b.pack.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() > b.pack.toLowerCase() ? -1 : 1);
    }
    this.packOrderDir = !this.packOrderDir;

  }

  orderByMan() {
    if (this.manOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;
    }
    if (this.manOrderDir) {
      this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() < b.manufacturer.nameAr.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.manufacturer.nameAr.toLowerCase() > b.manufacturer.nameAr.toLowerCase() ? -1 : 1);
    }
    this.manOrderDir = !this.manOrderDir;

  }

  orderByClientPrice() {
    if (this.clientPriceOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;


    }
    if (this.clientPriceOrderDir) {
      this.returnedArray.sort((a, b) => a.wholeSalePriceDiscount < b.wholeSalePriceDiscount ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.wholeSalePriceDiscount > b.wholeSalePriceDiscount ? -1 : 1);
    }
    this.clientPriceOrderDir = !this.clientPriceOrderDir;

  }

  orderByRetailer() {
    if (this.retailerOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

    }
    if (this.retailerOrderDir) {
      this.returnedArray.sort((a, b) => a.horecaPriceDiscount < b.horecaPriceDiscount ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.horecaPriceDiscount > b.horecaPriceDiscount ? -1 : 1);
    }
    this.retailerOrderDir = !this.retailerOrderDir;

  }

  orderByOffer() {
    if (this.offerOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

    }
    if (this.offerOrderDir) {
      this.returnedArray.sort((a, b) => a.isOffer < b.isOffer ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.isOffer > b.isOffer ? -1 : 1);
    }
    this.offerOrderDir = !this.offerOrderDir;

  }

  orderByStatus() {
    if (this.statusOrderDir == undefined) {
      this.manOrderDir = this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

    }
    if (this.statusOrderDir) {
      this.returnedArray.sort((a, b) => a.status < b.status ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.status > b.status ? -1 : 1);
    }
    this.statusOrderDir = !this.statusOrderDir;

  }


  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox(event) {
    let value = event.target.value;
    if (value == '') {
      this.getAllProducts();

    } else {
      let as: ProductModel[] = [];
      this.productHandler.search(value).finally(() => {
        this.unpage = true;
        this.allProduct = as;
        this.returnedArray = as;

      }).subscribe(data => {
        as = data;
      });
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

  getAllCats() {
    this.productHandler.getAllCats()
      .subscribe(data =>
          this.cats = data

        , errorCode => this.statusCode = errorCode);
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

  setCatFilter(e) {
    this.cat = e.target.value;
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

  onCatChange(e) {
    this.subcats = this.cats.find(x => x.id === e.target.value).subCategories;
  }

  setFilters() {
    this.spinnerFlag = true;
    let filters = [];
    if (this.cat != undefined) {
      filters.push({name: 'categoryId', value: this.cat});
    }
    if (this.subcat != undefined) {
      filters.push({name: 'subCategoryId', value: this.subcat});
    }
    if (this.man != undefined) {
      filters.push({name: 'manufacturerId', value: this.man});
    }
    if (this.availableTo != undefined) {
      filters.push({name: 'availableTo', value: this.availableTo});
    }
    if (this.isOffer != undefined) {
      filters.push({name: 'isOffer', value: this.isOffer});
    }
    if (filters != []) {
      this.productHandler.getByFilters(filters).finally(() => {
        this.returnedArray = this.allProduct;
        this.spinnerFlag = false;
        this.unpage = true;

      }).subscribe(data => {

        this.allProduct = data;

      });
    }
  }

  emptyFields() {
    this.router.navigate(['/products/list']);
  }

  getAllMans() {
    this.productHandler.getAllMans()
      .subscribe(data =>
          this.mans = data

        , errorCode => this.statusCode = errorCode);
  }

  getAllProducts() {
    this.spinnerFlag = true;
    this.productHandler.getProductsCount().finally(() => {
      this.productHandler.getPerPageProducts(this.pages, this.currentPage)
        .finally(() => {
          this.returnedArray = this.allProduct;
          this.spinnerFlag = false;
          this.unpage = false;


        })
        .subscribe(data => {
            this.allProduct = data;

          }
          , errorCode => this.statusCode = errorCode);

    }).subscribe(c => {
      this.productsCount = c['count'];
    });


  }


  // deleteProduct(id: string) {
  //
  //   this.preConfig();
  //   this.productHandler.getProductById(id)
  //     .subscribe(product => {
  //         this.productToUpdate = product;
  //         this.productToUpdate.status = 'deactivated';
  //
  //         this.productHandler.updateProduct(this.productToUpdate).subscribe(
  //           successCode => {
  //             this.statusCode = 200;
  //             this.allProduct = this.originalProducts;
  //             // this.backToCreateArticle();
  //           },
  //           errorCode => this.statusCode = errorCode
  //         );
  //       },
  //       errorCode => this.statusCode = errorCode);
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

  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
