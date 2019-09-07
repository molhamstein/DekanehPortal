import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConstService } from '../../../services/const.service';
import { ApiService } from '../../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response } from '@angular/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
  parrent;
  code = '';
  codeError;
  subcodeError;
  priority = '';
  status = "";
  selectedFile: File;
  imgSrc: string = '';
  imgUrl: string = '';
  imgBlankError: boolean;
  modalRef: BsModalRef;
  catTodelete: string;
  statues = [{ "value": "active", "view": "Categories.sub.active" }, { "value": "inactive", "view": "Categories.sub.inactive" }]


  constructor(private modalService: BsModalService, private route: ActivatedRoute, private c: ConstService, private router: Router, private api: ApiService, public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.id = params['id'];

      }
    });
  }

  editCat(category) {
    this.router.navigate(['/categories/edit/' + category.id]);
  }

  openModal(template: TemplateRef<any>, category) {
    this.catTodelete = category;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
  }

  confirm(): void {
    this.deleteSub(this.catTodelete);
  }

  decline(): void {
    this.modalRef.hide();
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
    this.api.delete('/categories/' + this.id + '/subCategories', subCat.id).finally(() => {
      this.modalRef.hide();
    }).subscribe(
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
            'priority': '',
            'status': '',
            'icon': ''
          };
          cat = this.categoriesForm.value;
          cat.icon = this.imgUrl;
          console.log(cat);
          this.api.post('/categories', cat).subscribe((res) => {
            if (res.status == 200) {
              console.log(res);
              this.router.navigate(['categories', 'viewAll']);
            } else {
              alert(res.statusText);
            }
          }, errorCodes => {
            if (errorCodes['status'] == 422) {
              this.codeError = true;

            }
          });
        }).subscribe(res => {
          this.imgUrl = res[0].url;
        },
          errorCode => console.log(errorCode)
        );

      } else {
        if (this.selectedFile == undefined) {
          this.api.put('/categories/' + this.id, this.categoriesForm.value, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })).subscribe((res) => {
            if (res.status == 200) {
              console.log(res);
              if (this.id == undefined) {
                this.router.navigate(['categories', 'viewAll']);

              } else {
                if (this.parrent != undefined)
                  this.router.navigate(['/categories/edit/' + this.parrent]);
                else
                  this.router.navigate(['/categories/edit/' + this.id]);

              }
            } else {
              alert(res.statusText);
            }
          }, errorCodes => {
            if (errorCodes['status'] == 422) {
              this.codeError = true;
            }
          });
        } else {
          this.uploadImage(this.selectedFile).finally(() => {
            let cat = {
              'titleAr': '',
              'titleEn': '',
              'code': '',
              'status': '',
              'priority': '',
              'icon': ''
            };
            cat = this.categoriesForm.value;
            cat.icon = this.imgUrl;
            console.log(cat);
            this.api.put('/categories/' + this.id, cat, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })).subscribe((res) => {
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

  goHome() {
    this.router.navigate(['categories', 'viewAll']);

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
      this.api.post('/categories/' + this.id + '/subCategories', this.subCategoriesForm.value).subscribe((res) => {
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
              this.router.navigate(['/categories/' + this.id + '/edit']);
              this.subCategories = temp;
            }
          });
          this.addSub = false;
          this.subCategoriesForm = new FormGroup({
            titleAr: new FormControl('', [Validators.required,]),
            titleEn: new FormControl('', [Validators.required,]),
            status: new FormControl('active'),
          });
        } else {
          alert(res.statusText);
        }
      }, errorCode => {
        if (errorCode == 422) {
          this.subcodeError = true;
        }
      });
    } else {
      console.log(this.subCategoriesForm.value);

      alert(this.c.translateUtterance('Manufactures.errorInForm'));
    }

  }

  ngOnInit() {
    this.subCategoriesForm = new FormGroup({
      titleAr: new FormControl('', [Validators.required,]),
      titleEn: new FormControl('', [Validators.required,]),
      code: new FormControl('', [Validators.required,]),
      status: new FormControl('active'),
      priority: new FormControl('', [Validators.required,]),
    });
    this.categoriesForm = new FormGroup({
      titleAr: new FormControl('', [Validators.required,]),
      titleEn: new FormControl('', [Validators.required,]),
      code: new FormControl('', [Validators.required,]),
      priority: new FormControl('', [Validators.required,]),
      status: new FormControl('active'),
    });
    if (this.id != undefined) {
      this.api.get('/categories').subscribe((data: any) => {
        if (data.status == 200)
          JSON.parse(data._body).map((man: any) => {
            if (man.id == this.id) {
              this.imgSrc = man.icon;
              this.parrent = man.parentCategoryId == undefined ? undefined : man.parentCategoryId;
              this.categoriesForm = new FormGroup({
                titleAr: new FormControl(man.titleAr, [Validators.required,]),
                titleEn: new FormControl(man.titleEn, [Validators.required,]),
                code: new FormControl(man.code, [Validators.required,]),
                priority: new FormControl(man.priority, [Validators.required,]),
                status: new FormControl(man.status),

              });
            }
          });
        else
          console.log(data.statusText);
      });
      this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
        if (data.ok) {
          let res = JSON.parse(data._body);
          let temp = { 'parentId': this.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : [] };
          this.subCategories = temp;
          console.log(temp.cols);

        }
      });
    }
  }
}
