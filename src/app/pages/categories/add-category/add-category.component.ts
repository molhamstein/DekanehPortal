import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConstService} from '../../../services/const.service';
import {ApiService} from '../../../services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    categoriesForm: FormGroup;
    subCategoriesForm: FormGroup;
    submitted: boolean = false;
    subCategories;
    addSub: boolean = false;
    id;
    titleAr = '';
    titleEn = '';
    code = '';
    selectedFile: File;
    imgSrc: string = '';
    imgUrl: string = '';
    imgBlankError: boolean;

    constructor(private route: ActivatedRoute, private c: ConstService, private router: Router, private api: ApiService, public translate: TranslateService) {
        this.route.params.subscribe(params => {
            if (params['id'] != undefined) {
                this.id = params['id'];
            }
        });
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imgSrc = reader.result;
        reader.readAsDataURL(this.selectedFile);
        this.imgBlankError = false;
    }

    uploadImage(image: File): Observable<any> {
        let formData = new FormData();
        formData.append('file', image);
        return this.api.post('/attachments/images/upload', formData).map(function (res) {
            var data = res.json();
            return data;
        }).catch(function (error: Response | any) {
            console.error(error.message || error);
            return Observable.throw(error.status);
        });
    }

    // click:boolean=true:[
    deleteSub(subCat) {
        this.api.delete('/categories/' + this.id + '/subCategories', subCat.id).subscribe(
            (res) => {
                if (res.ok) {
                    this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
                        if (data.ok) {
                            let res = JSON.parse(data._body);
                            let temp = {
                                'parentId': this.id,
                                'value': res,
                                'visible': false,
                                'cols': res.length > 0 ? Object.keys(res[0]) : []
                            };
                            this.subCategories = temp;
                        }
                    });
                } else {
                    alert('ERROR');
                }
            }
        );
    }

    addCategory() {
        this.submitted = true;
        let hasError: boolean;
        for (var key in this.categoriesForm.controls) {
            // check if the property/key is defined in the object itself, not in parent
            if (this.categoriesForm.controls.hasOwnProperty(key)) {
                if (this.categoriesForm.controls[key].invalid) {
                    hasError = true;
                    break;
                }
            }
        }
        if (!hasError) {
            if (this.id == undefined) {
                this.uploadImage(this.selectedFile).finally(() => {
                    let cat = {
                        'titleAr': '',
                        'titleEn': '',
                        'code': '',
                        'icon': ''
                    };
                    cat = this.categoriesForm.value;
                    cat.icon = this.imgUrl;
                    console.log(cat);
                    this.api.post('/categories', cat, {}).subscribe((res) => {
                        if (res.status == 200) {
                            console.log(res);
                            this.router.navigate(['categories', 'viewAll']);
                        } else {
                            alert(res.statusText);
                        }
                    });
                }).subscribe(res => {
                        this.imgUrl = res[0].url;
                    },
                    errorCode => console.log(errorCode)
                );

            } else {
                if (this.selectedFile == undefined) {
                    this.api.put('/categories/' + this.id, this.categoriesForm.value, {}).subscribe((res) => {
                        if (res.status == 200) {
                            console.log(res);
                            this.router.navigate(['categories', 'viewAll']);
                        } else {
                            alert(res.statusText);
                        }
                    });
                } else {
                    this.uploadImage(this.selectedFile).finally(() => {
                        let cat = {
                            'titleAr': '',
                            'titleEn': '',
                            'code': '',
                            'icon': ''
                        };
                        cat = this.categoriesForm.value;
                        cat.icon = this.imgUrl;
                        console.log(cat);
                        this.api.put('/categories/' + this.id, cat, {}).subscribe((res) => {
                            if (res.status == 200) {
                                console.log(res);
                                this.router.navigate(['categories', 'viewAll']);
                            } else {
                                alert(res.statusText);
                            }
                        });
                    }).subscribe(res => {
                            this.imgUrl = res[0].url;
                        },
                        errorCode => console.log(errorCode)
                    );

                }

            }
        } else {
            alert(this.c.translateUtterance('Manufactures.errorInForm'));
        }
    }

    addSubCategories() {
        let hasError: boolean;
        for (var key in this.subCategoriesForm.controls) {
            // check if the property/key is defined in the object itself, not in parent
            if (this.subCategoriesForm.controls.hasOwnProperty(key)) {
                if (this.subCategoriesForm.controls[key].invalid) {
                    hasError = true;
                    break;
                }
            }
        }
        if (!hasError) {
            this.api.post('/categories/' + this.id + '/subCategories', this.subCategoriesForm.value, {}).subscribe((res) => {
                if (res.status == 200) {
                    this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
                        if (data.ok) {
                            let res = JSON.parse(data._body);
                            let temp = {
                                'parentId': this.id,
                                'value': res,
                                'visible': false,
                                'cols': res.length > 0 ? Object.keys(res[0]) : []
                            };
                            this.subCategories = temp;
                        }
                    });
                    this.addSub = false;
                    this.subCategoriesForm = new FormGroup({
                        titleAr: new FormControl('', [Validators.required,]),
                        titleEn: new FormControl('', [Validators.required,]),
                    });
                } else {
                    alert(res.statusText);
                }
            });
        } else {
            alert(this.c.translateUtterance('Manufactures.errorInForm'));
        }

    }

    ngOnInit() {
        this.subCategoriesForm = new FormGroup({
            titleAr: new FormControl('', [Validators.required,]),
            titleEn: new FormControl('', [Validators.required,]),
            code: new FormControl('', [Validators.required,]),
        });
        this.categoriesForm = new FormGroup({
            titleAr: new FormControl('', [Validators.required,]),
            titleEn: new FormControl('', [Validators.required,]),
            code: new FormControl('', [Validators.required,]),
        });
        if (this.id != undefined) {
            this.api.get('/categories').subscribe((data: any) => {
                if (data.status == 200)
                    JSON.parse(data._body).map((man: any) => {
                        if (man.id == this.id) {
                            this.imgSrc = man.icon;

                            this.categoriesForm = new FormGroup({
                                titleAr: new FormControl(man.titleAr, [Validators.required,]),
                                titleEn: new FormControl(man.titleEn, [Validators.required,]),
                                code: new FormControl(man.code, [Validators.required,]),
                            });
                        }
                    });
                else
                    console.log(data.statusText);
            });
            this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
                if (data.ok) {
                    let res = JSON.parse(data._body);
                    let temp = {'parentId': this.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : []};
                    this.subCategories = temp;
                }
            });
        }
    }
}
