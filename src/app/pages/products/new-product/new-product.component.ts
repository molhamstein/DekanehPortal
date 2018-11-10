import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductHandler} from '../product-handler';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Media, OfferProducts, ProductModel} from '../product-model';
import {IOption} from 'ng-select';
import {SelectOptionService} from '../../../shared/element/select-option.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private product: ProductModel;
  selectedFile: File;
  imgSrc: string = '';
  myOptions: Array<IOption> = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'}
  ];
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(this.selectedFile);
    this.imgBlankError = false;
  }

  submitted=false;
  imgBlankError = false;
  alloffers: ProductModel[];
  allStatus = ['available', 'unavailable'];
  offersIds = [];
  availableList = ['both', 'retailCostumer', 'wholesale','horeca'];
  offerSourceList = ['dockan', 'company', 'supplier'];
  offerMaxQuantity = '';
  isOffer: boolean = false;
  categoryId = '';
  imgUrl = '';
  mans = [];
  man = '';
  tags = [];
  id:string;
  subCategoryId = '';
  status = '';
  availableTo = '';
  offerSource = '';


  manufacturerId = '';
  isFeatured: boolean = false;
  statusCode: number;
  requestProcess = false;
  cats = [];
  subcats = [];
  newPro=true;
  media = {
    'url': '',
    'type': 'image',
    'thumbnail': '',
    'id': ''
  };
offers: Array<IOption>=[];
t: Array<IOption>=[];
IOoffers: Array<IOption>=[];
  processValidation = false;
  ProductForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    pack: new FormControl('', Validators.required),
    isOffer: new FormControl(''),
    offerSource: new FormControl(''),
    offerMaxQuantity: new FormControl(''),
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
      .subscribe(data =>{
          this.alloffers = data;
          for(let offer of this.alloffers){
            this.t.push({label: offer.nameAr, value: offer.id});
            // if(this.product.offersIds.includes(offer.id)){
            //   this.offers.push({label: offer.nameAr, value: offer.id})
            // }
          }
        }
        , errorCode => this.statusCode = errorCode);

  }

  constructor(private Handler: ProductHandler, private router: Router, private route: ActivatedRoute,private optionService: SelectOptionService) {

    this.getAllOffers();
    this.getAllCats();
    this.getAllMans();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != undefined) {
      this.newPro=false;
      this.Handler.getProductById(this.id).subscribe(product=>{
        this.product =new ProductModel(product.nameAr, product.nameEn, product.pack, product.description, product.horecaPrice, product.wholeSalePrice, product.wholeSaleMarketPrice, product.marketOfficialPrice, product.dockanBuyingPrice, product.horecaPriceDiscount, product.wholeSalePriceDiscount, product.isFeatured, product.isOffer, product.availableTo, product.status, product.offerSource, product.offerMaxQuantity, product.code, product.sku, product.categoryId, product.subCategoryId, product.offersIds, product.tagsIds, product.media, product.offerProducts,product.manufacturerId);
        this.product.creationDate=product.creationDate;
        this.product.id=product.id;
        this.subcats = this.cats.find(x => x.id === this.product.categoryId).subCategories;
        this.subCategoryId=this.product.subCategoryId;
        this.imgSrc=this.product.media.url;
        console.log(this.myOptions);

        console.log(this.IOoffers);
        this.status = this.product.status;
        this.availableTo = this.product.availableTo;
        this.offerSource = this.product.offerSource;
        this.ProductForm.addControl('media',new FormControl(''));
        this.ProductForm.addControl('nameEn',new FormControl(''));
        this.ProductForm.addControl('creationDate',new FormControl(''));
        this.ProductForm.addControl('id',new FormControl(''));
        // if(product['media'])
        // if(product['category'])
        // this.ProductForm.addControl('category',new FormControl(''));
        // if(product['subCategory'])
        //   this.ProductForm.addControl('subCategory',new FormControl(''));
        // if(product['manufacturer'])
        //   this.ProductForm.addControl('manufacturer',new FormControl(''));
        // console.log(product['featured']);
        //   this.ProductForm.addControl('featured',new FormControl(''));
        // if(product['products'])
        //   this.ProductForm.addControl('products',new FormControl(''));

        this.ProductForm.setValue(this.product);
      });
    }else{
      this.status = 'available';
      this.availableTo = 'both';
      this.offerSource = 'dockan';
    }
  }

  setCat(event) {
    this.categoryId = event.target.value;
    this.subcats = this.cats.find(x => x.id === this.categoryId).subCategories;
  }


  ngOnInit() {
    setTimeout(() => {
      this.IOoffers = this.t;
    }, 3000);
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
      this.product.offerProducts = [];
      let t = [];
      for (let tag of this.tags) {
        t.push(tag.value);
      }
      this.product.tagsIds = t;
      console.log(this.product);

      // this.product.offerSource = 'dockan';
      this.Handler.createProduct(this.product).subscribe(successCode => {
          this.statusCode = successCode;
          // this.router.navigate(['/products/list']);
        },
        errorCode => this.statusCode = errorCode);
    }).subscribe(res => {
        this.imgUrl = res[0].url;
      },
      errorCode => console.log(errorCode)
    );

  }
  updateProduct(withmedia?:boolean) {
    let ctages=this.product.tagsIds
    this.product = this.ProductForm.value;

    if(withmedia){
      this.media.url = this.media.thumbnail = this.imgUrl;
      this.product.media = this.media;
    }
    this.product.nameEn = this.product.nameAr;
    if(this.tags!=ctages){
    let t = [];
    for (let tag of this.tags) {
      if(tag.value!=undefined){
        t.push(tag.value);

      }else{
        t.push(tag);

      }
    }
      this.product.tagsIds = t;
    }
    console.log(this.product);
    this.Handler.updateProduct(this.product).subscribe(successCode => {
        this.statusCode = successCode;
        this.router.navigate(['/products/list']);
      },
      errorCode => this.statusCode = errorCode);



  }
  onProductFormSubmit() {
    this.processValidation = true;
    if (this.imgSrc=='') {
      this.imgBlankError = true;
      return;
    }
    if (this.ProductForm.invalid) {

      return;
    }
    if(this.id==undefined){

      this.createProduct();
    }else {
      if(this.selectedFile==undefined){
        this.updateProduct();
      }else {
        this.Handler.uploadImage(this.selectedFile).finally(() => {
          this.updateProduct(true);
        }).subscribe(res => {
            this.imgUrl = res[0].url;
          },
          errorCode => console.log(errorCode)
        );
      }
      // this.router.navigate(['/products/list']);

    }


  }
}
