import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductHandler } from '../product-handler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferProducts, ProductModel } from '../product-model';
import { IOption } from 'ng-select';
import { AlertService } from '../../../services/alert.service';
import { IOptions } from 'tslint';
import { getProdConfig } from '@angular/cli/models/webpack-configs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  selectedFile: File;
  imgSrc: string = '';
  submitted = false;
  imgBlankError = false;
  pureProducts: ProductModel[];
  offerProducts: OfferProducts[];
  selectedProductIds: string[] = [];
  selectedProducts: ProductModel[] = [];
  allStatus = ['available', 'unavailable', 'pending'];
  offersIds = [];
  availableList = ['both', 'retailCostumer', 'wholesale', 'horeca'];
  offerSourceList = ['dockan', 'company', 'supplier'];
  offerMaxQuantity = '';
  isOffer: boolean = false;
  categoryId = '';
  imgUrl = '';
  thumbUrl = '';
  jpgUrl = '';
  mans = [];
  man = '';
  tags = [];
  id: string;
  subCategoryId = '';
  status = '';
  availableTo = '';
  offersTable = [];
  selectedOffers = []
  offerSource = '';
  manufacturerId = '';
  isFeatured: boolean = false;
  statusCode: number;
  requestProcess = false;
  cats = [];
  subcats = [];
  newPro = true;
  media = {
    'url': '',
    'type': 'image',
    'thumbnail': '',
    'jpgUrl': '',
    'id': ''
  };
  offers = [];
  t: Array<IOption> = [];
  tP: Array<IOption> = [];
  IOoffers: Array<IOption> = [];
  IOproducts: Array<IOption> = [];
  processValidation = false;
  ProductForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    pack: new FormControl('', Validators.required),
    isOffer: new FormControl(''),
    offerSource: new FormControl(''),
    offerMaxQuantity: new FormControl(0),
    isFeatured: new FormControl(''),
    manufacturerId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl('', Validators.required),
    status: new FormControl(''),
    availableTo: new FormControl(''),
    offersIds: new FormControl(''),
    description: new FormControl(''),
    horecaPrice: new FormControl('', Validators.required),
    wholeSalePrice: new FormControl('', Validators.required),
    wholeSaleMarketPrice: new FormControl('', Validators.required),
    marketOfficialPrice: new FormControl('', Validators.required),
    dockanBuyingPrice: new FormControl('', Validators.required),
    tagsIds: new FormControl(''),
    offerProducts: new FormControl(''),
    horecaPriceDiscount: new FormControl('', Validators.required),
    wholeSalePriceDiscount: new FormControl('', Validators.required),
    code: new FormControl(''),
    sku: new FormControl(''),

  });
  private product: ProductModel;

  constructor(private Handler: ProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    }, errorCode => this.showError());

    this.getAllCats();
    this.getAllMans();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != undefined) {
      this.newPro = false;
      this.Handler.getProductById(this.id).subscribe(product => {
        this.product = new ProductModel(product.nameAr, product.nameEn, product.pack, product.description, product.horecaPrice, product.wholeSalePrice, product.wholeSaleMarketPrice, product.marketOfficialPrice, product.dockanBuyingPrice, product.horecaPriceDiscount, product.wholeSalePriceDiscount, product.isFeatured, product.isOffer, product.availableTo, product.status, product.offerSource, product.offerMaxQuantity, product.code, product.sku, product.categoryId, product.subCategoryId, product.offersIds, product.tagsIds, product.media, product.offerProducts, product.manufacturerId);
        this.product.creationDate = product.creationDate;
        this.product.id = product.id;
        this.product.offerProducts = this.offerProducts = product.offerProducts;
        for (let p of this.offerProducts) {
          this.selectedProductIds.push(p.productId);
        }
        if (product.offerProducts != undefined) {
          this.setSelectedProducts(product.products);

        }
        this.getOffers(product);
        this.subcats = []
        var allSubcats = this.cats.find(x => x.id === this.product.categoryId).subCategories;
        allSubcats.forEach(element => {
          if (element.status == "active")
            this.subcats.push(element);
        });

        this.subCategoryId = this.product.subCategoryId;
        this.imgSrc = this.product.media.url;
        this.status = this.product.status;
        this.availableTo = this.product.availableTo;
        this.offerSource = this.product.offerSource;
        this.ProductForm.addControl('media', new FormControl(''));
        this.ProductForm.addControl('nameEn', new FormControl(''));
        this.ProductForm.addControl('creationDate', new FormControl(''));
        this.ProductForm.addControl('id', new FormControl(''));
        this.ProductForm.setValue(this.product);
      }, errorCode => this.showError());
    } else {
      this.status = 'available';
      this.availableTo = 'both';
      this.offerSource = 'dockan';
      this.offerProducts = [];

    }
  }

  removeOffer(id) {
    this.product.offersIds.splice(this.product.offersIds.indexOf(id), 1);
    this.offersTable.splice(this.offersTable.indexOf(this.offersTable.find(x => x.id === id)), 1);
  }

  getOffers(product) {

    for (let id of product.offersIds) {
      this.Handler.getProductById(id).subscribe(
        data => {
          this.offersTable.push(data);
        }
      );
    }
  }
  setSelectedProducts(products) {
    this.selectedProducts = [];
    for (let pro of products) {
      // this.IOproducts.push({label: pro.product.nameAr, value: pro.product.id})
      this.selectedProducts.push(pro.product);
    }
  }

  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(this.selectedFile);
    this.imgBlankError = false;
  }

  getAllCats() {
    this.Handler.getAllCats()
      .subscribe(data =>
        this.cats = data

        , errorCode => this.showError());
  }

  getAllMans() {
    this.Handler.getAllMans()
      .subscribe(data =>
        this.mans = data

        , errorCode => this.showError());
  }

  searchOffers(str) {
    this.offers = []
    this.t = [];
    if (str != '') {
      this.Handler.searchByisOffer(str, true)
        .subscribe(data => {
          for (let offer of data) {
            this.t.push({ label: offer.nameAr, value: offer.id });
            // if (this.product.offersIds.includes(offer.id)) {
            this.offers.push({ label: offer.nameAr, value: offer.id, media: offer.media })
            // }
          }
          setTimeout(() => {
            this.IOoffers = this.t;
          }, 100);
        }
          , errorCode => this.showError());
    }

  }

  searchProducts(str) {
    this.tP = [];
    if (str != '') {
      this.Handler.searchByisOffer(str, false)
        .subscribe(data => {
          for (let pro of data) {
            this.tP.push({ label: pro.nameAr, value: pro.id });
            // if(this.product.offersIds.includes(offer.id)){
            //   this.offers.push({label: offer.nameAr, value: offer.id})
            // }
          }
          setTimeout(() => {
            console.log(this.tP);
            this.IOproducts = this.tP;
          }, 50);
          this.pureProducts = data;
          console.log(this.pureProducts);

        }
          , errorCode => this.showError());
    }

  }

  setCat(event) {
    this.subcats = []
    this.categoryId = event.target.value;
    var allSubcats = this.cats.find(x => x.id === this.categoryId).subCategories;
    allSubcats.forEach(element => {
      if (element.status == "active")
        this.subcats.push(element);
    });

  }

  findProduct(id) {
    return this.pureProducts.find(x => x.id === id);
  }

  findselecttedProduct(id) {
    return this.selectedProducts.find(x => x.id === id);
  }
  productSelected(IOproduct) {
    let product = this.findProduct(IOproduct.value);
    this.selectedProducts.push(product);
    this.offerProducts.push({
      'quantity': 0,
      'productId': IOproduct.value,
      'id': IOproduct.value
    });
  }

  productDeSelected(id) {
    let product = this.selectedProducts.find(x => x.id === id);

    this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1);
    this.offerProducts.splice(this.offerProducts.indexOf(this.offerProducts.find(x => x.id === id)), 1);
  }

  ngOnInit() {

    this.offerProducts = [];

  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  createProduct() {

    this.Handler.uploadImage(this.selectedFile).finally(() => {

      this.product = this.ProductForm.value;
      this.media.url = this.imgUrl;
      this.media.thumbnail = this.thumbUrl;
      this.media.jpgUrl = this.jpgUrl;
      this.product.nameEn = this.product.nameAr;
      this.product.media = this.media;
      if (this.product.offerSource == '') {
        this.product.offerSource = this.offerSource;
      }
      this.product.offerProducts = this.offerProducts;
      let t = [];
      for (let tag of this.tags) {
        t.push(tag.value);
      }
      this.product.tagsIds = t;
      this.product.offersIds = []
      this.offersTable.forEach(element => {
        this.product.offersIds.push(element.id)
      });
      this.product.offersIds
      // this.product.offerSource = 'dockan';
      this.Handler.createProduct(this.product).finally(() => {
        this.router.navigate(['/products/new']);


      })
        .subscribe(successCode => {
          this.statusCode = successCode;
        },
          errorCode => this.showError());
    }).subscribe(res => {

      this.imgUrl = res[0].url;
      this.thumbUrl = res[0].thumbnail;
      this.jpgUrl = res[0].jpgUrl;

    }, errorCode => this.showError()
    );

  }

  updateProduct(withmedia?: boolean) {
    let ctages = this.product.tagsIds;
    this.product = this.ProductForm.value;

    if (withmedia) {
      this.media.url = this.imgUrl;
      this.media.thumbnail = this.thumbUrl;
      this.media.jpgUrl = this.jpgUrl;
      this.product.media = this.media;
    }
    this.product.nameEn = this.product.nameAr;
    if (this.tags != ctages) {
      let t = [];
      for (let tag of this.tags) {
        if (tag.value != undefined) {
          t.push(tag.value);

        } else {
          t.push(tag);

        }
      }
      this.product.tagsIds = t;
    }
    this.offersTable.forEach(element => {
      this.product.offersIds.push(element.id)
    });
    this.Handler.updateProduct(this.product).subscribe(successCode => {
      this.statusCode = successCode;
      this.router.navigate(['/products/list']);
    },
      errorCode => this.showError());


  }

  offerSelected(IOproduct) {
    let offer = this.offers.find(x => x.value === IOproduct.value);
    console.log("offer")
    console.log(offer)
    // // this.newOffer.push(product);

    this.offersTable.push({
      "nameAr": offer.label,
      "id": offer.value,
      "media": offer.media
    });
    // this.newOrder.orderProducts = this.selectedProducts;
    this.offersIds = [];

    // this.productCheck();

  }

  onProductFormSubmit() {
    this.processValidation = true;
    if (this.imgSrc == '') {
      this.imgBlankError = true;
      return;
    }
    if (this.ProductForm.invalid) {

      return;
    }
    if (this.id == undefined) {
      this.submitted = true;

      this.createProduct();
    } else {
      this.submitted = true;

      if (this.selectedFile == undefined) {
        this.updateProduct();
      } else {
        this.Handler.uploadImage(this.selectedFile).finally(() => {
          this.updateProduct(true);
        }).subscribe(res => {
          this.imgUrl = res[0].url;
          this.thumbUrl = res[0].thumbnail;
          this.jpgUrl = res[0].jpgUrl;
        }, errorCode => this.showError()
        );
      }

    }
  }

  goProducts() {
    this.router.navigate(['/products/list']);

  }
}
