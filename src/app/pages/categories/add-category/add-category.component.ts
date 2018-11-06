import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConstService} from '../../../services/const.service';
import {ApiService} from '../../../services/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoriesForm: FormGroup;
  subCategoriesForm:FormGroup;
  submitted: boolean = false;
  subCategories;
  addSub:boolean=false;
  id;
  // click:boolean=true:[
  deleteSub(subCat){
    this.api.delete('/categories/'+this.id+'/subCategories',subCat.id).subscribe(
      (res)=>{
        if(res.ok){
          this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
            if (data.ok) {
              let res = JSON.parse(data._body);
              let temp = {'parentId': this.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : []};
              this.subCategories=temp;
            }
          });
        }else{
          alert("ERROR");
        }
      }
    );
  }
  addManufactur() {
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
      if(this.id==undefined){
        this.api.post('/categories', this.categoriesForm.value, {}).subscribe((res) => {
          if (res.status == 200) {
            console.log(res);
            // this.router.navigate(['Categories', 'viewAll']);
          } else {
            alert(res.statusText);
          }
        });
      }else{
        this.api.put('/categories/'+this.id, this.categoriesForm.value, {}).subscribe((res) => {
          if (res.status == 200) {
            console.log(res);
            this.router.navigate(['categories', 'viewAll']);
          } else {
            alert(res.statusText);
          }
        });
      }
    } else {
      alert(this.c.translateUtterance('Manufactures.errorInForm'));
    }
  }

  constructor(private route: ActivatedRoute, private c: ConstService, private router: Router, private api: ApiService, public translate: TranslateService) {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.id = params['id'];
      }
    });
  }
  addSubCategories(){

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
        this.api.post('/categories/'+this.id+'/subCategories', this.subCategoriesForm.value, {}).subscribe((res) => {
          if (res.status == 200) {
            this.api.get('/categories/' + this.id + '/subCategories').subscribe((data: any) => {
              if (data.ok) {
                let res = JSON.parse(data._body);
                let temp = {'parentId': this.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : []};
                this.subCategories=temp;
              }
            });
            this.addSub=false;
            this.subCategoriesForm=new FormGroup({
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
    this.subCategoriesForm=new FormGroup({
      titleAr: new FormControl('', [Validators.required,]),
      titleEn: new FormControl('', [Validators.required,]),
    });
    this.categoriesForm = new FormGroup({
      titleAr: new FormControl('', [Validators.required,]),
      titleEn: new FormControl('', [Validators.required,]),
    });
    if (this.id != undefined) {
      this.api.get("/categories").subscribe((data:any)=>{
        if(data.status==200)
          JSON.parse(data._body).map((man:any)=>{
            if(man.id==this.id){
              this.categoriesForm = new FormGroup({
                titleAr: new FormControl(man.titleAr, [Validators.required,]),
                titleEn: new FormControl(man.titleEn, [Validators.required,]),
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
          this.subCategories=temp;
        }
      });
    }
  }
}
