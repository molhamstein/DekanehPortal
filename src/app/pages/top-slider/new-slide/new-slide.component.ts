import { Component, OnInit } from '@angular/core';
import { Slide } from '../slide';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideHandlerService } from '../slide-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHandler } from '../../products/product-handler';
import { IOption } from 'ng-select';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { OrdersHandlerService } from '../../orders/orders-handler.service';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-new-slide',
    templateUrl: './new-slide.component.html',
    styleUrls: ['./new-slide.component.css']
})
export class NewSlideComponent implements OnInit {
    slide: Slide;
    newSlide = true;
    submitted = false;
    products: any[];
    mans: any[];
    types = ['product', 'external', 'manufacturer'];
    statusEnum = ['activated', 'deactivated'];
    clientTypes=['all', 'wholesale',"horeca"];
    id: string;
    selectedPRoduct;
    selectedMan;
    processValidation: boolean = false;
    tP: Array<IOption> = [];
    tM: Array<IOption> = [];
    IOproducts: Array<IOption> = [];
    IOmans: Array<IOption> = [];
    statusCode;
    imgUrl: string;
    SlideForm = new FormGroup({
        type: new FormControl(''),
        target: new FormControl(''),
        clientType: new FormControl(''),
        status: new FormControl(''),

    });
    selectedFile: any;
    imgSrc: string = '';
    imgBlankError = false;
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    constructor(
        private http: Http,
        private alert: AlertService,
        private sanitizer: DomSanitizer,
        private Handler: SlideHandlerService,
        private productHandler: ProductHandler,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.slide = new Slide();

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.slide.status = 'activated';
            this.slide.type = 'product';
        } else {
            this.newSlide = false;
            this.Handler.getSlideById(this.id).subscribe(s => {
                this.slide = s;

                this.imgSrc = s.image;
                if (this.slide.type == 'product') {
                    let IOp = [];
                    this.productHandler.getProductById(this.slide.target).finally(() => {

                    }).subscribe(data => {
                        this.searchProducts(data.nameAr);
                    }, errorCode => this.showError());
                } else if (this.slide.type == 'manufacturer') {
                    let IOm = [];
                    this.productHandler.getManById(this.slide.target).finally(() => {

                    }).subscribe(data => {
                        this.searchMan(data.nameAr);
                    }, errorCode => this.showError());
                }

                this.SlideForm.setValue({
                    'target': s.target,
                    'type': s.type,
                    'clientType':s.clientType,
                    'status': s.status
                });
            }
            );
        }
    }

    goHome() {
        this.router.navigate(['/topSlider/list']);

    }
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imgSrc = reader.result;
        reader.readAsDataURL(this.selectedFile);
        this.imgBlankError = false;
    }

    setImage() {
        this.imgSrc = this.slide.image;

    }

    changeTarget() {
        this.slide.target = '';
        if (this.slide.type == 'external') {
            this.SlideForm.get('target').clearValidators();
            this.SlideForm.get('target').setValidators([Validators.pattern('https?://.+')]);
        } else if (this.slide.type == 'product') {
            this.SlideForm.get('target').clearValidators();
        }
    }

    productSelected(e) {

        this.selectedPRoduct = this.products.find(x => x._id == this.slide.target);

    }

    manSelected(e) {
        console.log(e);
        this.selectedMan = this.mans.find(x => x.id == this.slide.target);

    }
    searchProducts(str) {
        this.tP = [];
        if (str != '') {
            this.productHandler.search(str)
                .subscribe(data => {
                    for (let pro of data) {
                        this.tP.push({ label: pro.nameAr, value: pro._id });
                    }
                    setTimeout(() => {
                        this.IOproducts = this.tP;
                    }, 50);
                    this.products = data;
                }
                    , errorCode => this.showError());
        }

    }

    searchMan(str) {
        this.tM = [];
        if (str != '') {
            this.Handler.getManByString(str)
                .subscribe(data => {
                    for (let pro of data) {
                        this.tM.push({ label: pro.nameAr, value: pro.id });
                    }
                    setTimeout(() => {
                        this.IOmans = this.tM;
                    }, 50);
                    this.mans = data;
                }
                    , errorCode => this.showError());
        }

    }


    ngOnInit() {

    }

    createSlide() {

        this.productHandler.uploadImage(this.selectedFile).finally(() => {

            this.slide.image = this.imgUrl;


            this.Handler.createSlide(this.slide).finally(() => {
                this.router.navigate(['/topSlider/list']);


            })
                .subscribe(successCode => {
                    this.statusCode = successCode;
                },
                    errorCode => this.showError());
        }).subscribe(res => {

            this.imgUrl = res[0].url;
        },
            errorCode => this.showError()
        );

    }

    updateSlide(media?: boolean) {

        if (media) {
            this.slide.image = this.imgUrl;
        }
        this.Handler.updateSlide(this.slide).finally(() => {
            this.router.navigate(['/topSlider/list']);

        })
            .subscribe(successCode => {
                this.statusCode = successCode;
            },
                errorCode => this.showError());
    }

    onSlideFormSubmit() {
        this.processValidation = true;

        if (this.imgSrc == '') {
            this.imgBlankError = true;
            return;
        }
        if (this.SlideForm.invalid) {
            return;
        }
        if (this.id == undefined) {
            this.submitted = true;

            this.createSlide();
        } else {
            this.submitted = true;
            if (this.selectedFile == undefined) {
                this.updateSlide();
            } else {
                this.productHandler.uploadImage(this.selectedFile).finally(() => {
                    this.updateSlide(true);
                }).subscribe(res => {
                    this.imgUrl = res[0].url;
                },
                    errorCode => this.showError()
                );
            }
        }
    }

}
