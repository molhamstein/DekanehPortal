import {Component, OnInit} from '@angular/core';
import {Slide} from '../slide';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SlideHandlerService} from '../slide-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductHandler} from '../../products/product-handler';
import {IOption} from 'ng-select';
import {Http} from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';

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
    types = ['product', 'external'];
    statusEnum = ['activated', 'deactivated'];
    id: string;
    selectedPRoduct;
    processValidation: boolean = false;
    tP: Array<IOption> = [];
    IOproducts: Array<IOption> = [];
    statusCode;
    imgUrl: string;
    SlideForm = new FormGroup({
        type: new FormControl(''),
        target: new FormControl('', Validators.compose(
            [
                Validators.required
            ])),
        status: new FormControl(''),

    });
    selectedFile: any;
    imgSrc: string = '';
    imgBlankError = false;

    constructor(private http: Http, private sanitizer: DomSanitizer, private Handler: SlideHandlerService, private productHandler: ProductHandler, private router: Router, private route: ActivatedRoute) {
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
                        });
                    }

                    this.SlideForm.setValue({
                        'target': s.target,
                        'type': s.type,
                        'status': s.status
                    });
                }
            );
        }
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
            this.SlideForm.get('target').setValidators([Validators.pattern('https?://.+'), Validators.required]);
        } else if (this.slide.type == 'product') {
            this.SlideForm.get('target').clearValidators();
            this.SlideForm.get('target').setValidators([Validators.required]);

        }
    }

    productSelected(e) {

        this.selectedPRoduct = this.products.find(x => x._id == this.slide.target);

    }

    searchProducts(str) {
        this.tP = [];
        if (str != '') {
            this.productHandler.search(str)
                .subscribe(data => {
                        for (let pro of data) {
                            this.tP.push({label: pro.nameAr, value: pro._id});
                        }
                        setTimeout(() => {
                            this.IOproducts = this.tP;
                        }, 50);
                        this.products = data;
                    }
                    , errorCode => this.statusCode = errorCode);
        }

    }


    ngOnInit() {

    }

    createSlide() {

        this.productHandler.uploadImage(this.selectedFile).finally(() => {

            this.slide.image = this.imgUrl;


            this.Handler.createSlide(this.slide).finally(() => {
                // this.router.navigate(['/topSlider/list']);


            })
                .subscribe(successCode => {
                        this.statusCode = successCode;
                    },
                    errorCode => this.statusCode = errorCode);
        }).subscribe(res => {

                this.imgUrl = res[0].url;
            },
            errorCode => console.log(errorCode)
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
                errorCode => this.statusCode = errorCode);
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
                    errorCode => console.log(errorCode)
                );
            }
        }
    }

}