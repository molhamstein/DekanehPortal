import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ProductHandler} from '../product-handler';
import {ProductModel} from '../product-model';
import {AlertService} from '../../../services/alert.service';

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
    cat = '1';
    subcat = '1';
    man = '1';
    availableTo = '1';
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

    showError() {
        this.alert.showToast.next({type: 'error'});
    }

    constructor(private productHandler: ProductHandler, private router: Router, private alert: AlertService) {
        this.getAllCats();
        // this.getAllMans();

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

    pageChanged(event: any): void {
        setTimeout(() => {
            this.getAllProducts();

        }, 50);
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
            }, errorCode => this.showError());
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
        this.productHandler.getAllCats().finally(() => {
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
        this.spinnerFlag = true;
        let filters = [];


        if (this.cat != '1') {
            filters.push({name: 'categoryId', value: this.cat});
        }
        if (this.subcat != '1') {
            filters.push({name: 'subCategoryId', value: this.subcat});
        }
        if (this.man != '1') {
            filters.push({name: 'manufacturerId', value: this.man});
        }
        if (this.availableTo != '1') {
            filters.push({name: 'availableTo', value: this.availableTo});
        }
        if (this.isOffer != undefined) {
            filters.push({name: 'isOffer', value: this.isOffer});
        }
        localStorage.setItem('filters', JSON.stringify(filters));
        if (filters != [] && filters.length != 0) {
            this.productHandler.getByFilters(filters).finally(() => {
                this.returnedArray = this.allProduct;
                this.spinnerFlag = false;
                this.unpage = true;

            }).subscribe(data => {

                this.allProduct = data;

            }, errorCode => this.showError());
        } else {
            this.getAllProducts();
        }
    }

    emptyFields() {
        localStorage.removeItem('filters');
        this.router.navigate(['/products/list']);
    }

    getAllMans() {
        this.productHandler.getAllMans().finally(() => {
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
                if (tem.find(x => x.name == 'isOffer')) {
                    this.isOffer = tem.find(x => x.name == 'isOffer').value;
                }
            }
            this.setFilters();
        })
            .subscribe(data =>
                    this.mans = data

                , errorCode => this.showError());
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
                    , errorCode => this.showError());

        }).subscribe(c => {
            this.productsCount = c['count'];
        }, errorCode => this.showError());


    }


    // deleteProduct(id: string) {
    //
    //   this.preConfig();
    //   this.productHandler.getProductById(id)
    //     .subscribe(product => {
    //         this.productToUpdate = product;
    //         this.productToUpdate.status = 'deactivated';
    //
    //         this.productHandler.updateOrder(this.productToUpdate).subscribe(
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

    }

    preConfig() {
        this.statusCode = null;
        this.requestProcess = true;
    }
}
