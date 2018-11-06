import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductHandler} from '../product-handler';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../product-model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private product: ProductModel;
  selectedFile: File;
  imgSrc: string = '';

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(this.selectedFile);
    this.imgBlankError = false;
  }


  imgBlankError = false;
  alloffers: ProductModel[];
  allStatus = ['available', 'unavailable'];
  offersIds = [];
  availableList = ['both', 'retailCostumer', 'wholesale'];
  offerSourceList = ['dockan', 'company', 'supplier'];
  offerSource = '';
  offerMaxQuantity = '';
  isOffer: boolean = false;
  categoryId = '';
  imgUrl = '';
  mans = [];
  man = '';
  tags = [];
  subCategoryId = '';
  status = 'available';
  manufacturerId = '';
  featured: boolean = false;
  statusCode: number;
  requestProcess = false;
  availableTo = 'both';
  cats = [];
  subcats = [];
  media = {
    'url': '',
    'type': 'image',
    'thumbnail': '',
    'id': ''
  };
  processValidation = false;
  ProductForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    pack: new FormControl('', Validators.required),
    isOffer: new FormControl(''),
    offerSource: new FormControl(''),
    offerMaxQuantity: new FormControl(''),
    featured: new FormControl(''),
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
    horecaPriceDiscount: new FormControl('', Validators.required),
    wholeSalePriceDiscount: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),

  });

  getAllCats() {
    this.Handler.getAllCats()
      .subscribe(data =>
          this.cats = data

        , errorCode => this.statusCode = errorCode);
  }

  getAllMans() {
    this.Handler.getAllMans()
      .subscribe(data =>
          this.mans = data

        , errorCode => this.statusCode = errorCode);
  }

  getAllOffers() {
    this.Handler.getOffers()
      .subscribe(data =>
          this.alloffers = data

        , errorCode => this.statusCode = errorCode);
  }

  constructor(private Handler: ProductHandler, private router: Router, private route: ActivatedRoute) {
    this.getAllCats();
    this.getAllOffers();
    this.getAllMans();
  }

  setCat(event) {
    this.categoryId = event.target.value;
    this.subcats = this.cats.find(x => x.id === this.categoryId).subCategories;
  }


  ngOnInit() {
  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  createProduct() {
    this.Handler.uploadImage(this.selectedFile).finally(() => {
      this.product = this.ProductForm.value;
      this.media.url = this.media.thumbnail = this.imgUrl;
      this.product.nameEn = this.product.nameAr;
      this.product.media = this.media;
      let t = [];
      for (let tag of this.tags) {
        t.push(tag.value);
      }
      this.product.tagsIds = t;
      this.product.offerSource = 'dockan';
      this.Handler.createProduct(this.product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/products/list']);
        },
        errorCode => this.statusCode = errorCode);
    }).subscribe(res => {
        this.imgUrl = res[0].url;
      },
      errorCode => console.log(errorCode)
    );

  }

  onProductFormSubmit() {
    if (!this.selectedFile) {
      this.imgBlankError = true;
      return;
    }
    if (this.ProductForm.invalid) {

      return;
    }

    this.createProduct();


  }
}
