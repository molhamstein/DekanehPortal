import { AbstractProductHandler } from './../abstract-product-handler';
import { AbstractProductModel } from './../abstract-product-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-abstract-new-product',
  templateUrl: './abstract-new-product.component.html',
  styleUrls: ['./abstract-new-product.component.css']
})
export class AbstractNewProductComponent implements OnInit {
  selectedFile: File;
  imgSrc: string = '';
  submitted = false;
  imgBlankError = false;
  categoryId = '';
  imgUrl = '';
  thumbUrl = '';
  jpgUrl = '';
  id: string;
  subCategoryId = '';
  manufacturerId = '';
  requestProcess = false;
  cats = [];
  mans = [];
  subcats = [];
  threshold: number = 0;
  warningThreshold: number = 0;
  warehouseProducts = []
  warehouse = {}
  newPro = true;
  media = {
    'url': '',
    'type': 'image',
    'thumbnail': '',
    'jpgUrl': '',
    'id': ''
  };

  statusCode: number;
  processValidation = false;
  ProductForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    officialMassMarketPrice: new FormControl('', Validators.required),
    officialConsumerPrice: new FormControl('', Validators.required),
    manufacturerId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl('', Validators.required),
  });
  private product: AbstractProductModel;

  constructor(private Handler: AbstractProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
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
        this.product = new AbstractProductModel(product.id, product.nameAr, product.nameEn, product.categoryId, product.subCategoryId, product.manufacturerId, product.media, product.officialMassMarketPrice, product.officialConsumerPrice);
        this.product.id = product.id;
        this.warehouseProducts = product.warehouseProducts;
        this.warehouse = product.warehouseProducts[0];
        this.threshold = product.warehouseProducts[0].threshold;
        this.warningThreshold = product.warehouseProducts[0].warningThreshold;
        this.subcats = []
        var allSubcats = this.cats.find(x => x.id === this.product.categoryId).subCategories;
        allSubcats.forEach(element => {
          if (element.status == "active")
            this.subcats.push(element);
        });

        this.subCategoryId = this.product.subCategoryId;
        this.imgSrc = this.product.media.url;
        this.ProductForm.addControl('media', new FormControl(''));
        this.ProductForm.addControl('nameEn', new FormControl(''));
        this.ProductForm.addControl('id', new FormControl(''));
        this.ProductForm.setValue(this.product);
        console.log(this.ProductForm.value)
      }, errorCode => this.showError());
    } else {

    }

  }

  editWarehouse() {
    console.log(this.warehouse);
    this.Handler.updateWhearhouseProduct(this.warehouse['id'], { "threshold": this.threshold, "warningThreshold": this.warningThreshold }).subscribe(successCode => {
      this.statusCode = successCode;
      this.router.navigate(['/abstract-products/list']);
    },
      errorCode => this.showError());

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




  setCat(event) {
    this.subcats = []
    this.categoryId = event.target.value;
    var allSubcats = this.cats.find(x => x.id === this.categoryId).subCategories;
    allSubcats.forEach(element => {
      if (element.status == "active")
        this.subcats.push(element);
    });

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
      this.media.url = this.imgUrl;
      this.media.thumbnail = this.thumbUrl;
      this.media.jpgUrl = this.jpgUrl;
      this.product.nameEn = this.product.nameAr;
      this.product.media = this.media;
      let t = [];
      // this.product.offerSource = 'dockan';
      this.Handler.createProduct(this.product, this.threshold, this.warningThreshold).finally(() => {
        this.router.navigate(['/abstract-products/new']);


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
    this.product = this.ProductForm.value;

    if (withmedia) {
      this.media.url = this.imgUrl;
      this.media.thumbnail = this.thumbUrl;
      this.media.jpgUrl = this.jpgUrl;
      this.product.media = this.media;
    }
    this.product.nameEn = this.product.nameAr;
    this.Handler.updateProduct(this.product).subscribe(successCode => {
      this.statusCode = successCode;
      this.router.navigate(['/products/list']);
    },
      errorCode => this.showError());


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
    this.router.navigate(['/abstract-products/list']);

  }
}
