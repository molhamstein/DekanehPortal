import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductHandler} from '../product-handler';
import {ProductModel} from '../product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  nameOrderDir;
  packOrderDir;
  statusOrderDir;
  retailerOrderDir;
  offerOrderDir;
  clientPriceOrderDir;
  statusCode: number;
  requestProcess = false;
  productToUpdate = null;
  allProduct: ProductModel[] = [];
  currentPage = 1;
  page: number;
  returnedArray: ProductModel[] = [];
  pages = 10;
  currentArray: ProductModel[] = [];

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.allProduct.slice(startItem, endItem);
    this.currentArray=this.returnedArray;
  }

  constructor(private productHandler: ProductHandler, private router: Router) {
    this.getAllProducts();
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit/' + id]);
  }

  orderByName() {
    if (this.nameOrderDir == undefined) {
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

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
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;
    }
    if (this.packOrderDir) {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() < b.pack.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.pack.toLowerCase() > b.pack.toLowerCase() ? -1 : 1);
    }
    this.packOrderDir = !this.packOrderDir;

  }

  orderByClientPrice() {
    if (this.clientPriceOrderDir == undefined) {
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;


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
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

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
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

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
      this.packOrderDir = this.nameOrderDir = this.statusOrderDir = this.offerOrderDir = this.retailerOrderDir = this.clientPriceOrderDir = this.retailerOrderDir = undefined;

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
    this.returnedArray = this.currentArray;
    let as: ProductModel[] = [];
    let fields = ['nameAr', 'pack'];
    for (let field of fields) {
      for (let t of this.filterByfield(this.returnedArray, field, value)) {
        if (!as.includes(t)) {
          as.push(t);
        }
      }
    }
    this.returnedArray = as;

    console.log(value);
  }

  getAllProducts() {
    this.productHandler.getAllProducts()
      .finally(() => {
        this.returnedArray = this.allProduct.slice(0, this.pages);
        this.currentArray=this.returnedArray;


      })
      .subscribe(data => {
          this.allProduct = data.sort((a, b) => new Date(a.creationDate)> new Date(b.creationDate) ? -1 : 1);
        }
        , errorCode => this.statusCode = errorCode);


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
    this.returnedArray = this.allProduct.slice(0, this.pages);
    this.currentArray=this.returnedArray;
    setTimeout(()=> {
      this.currentPage=1;
    }, 50);


  }

  ngOnInit() {

  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
