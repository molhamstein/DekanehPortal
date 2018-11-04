import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-view-all-categories',
  templateUrl: './view-all-categories.component.html',
  styleUrls: ['./view-all-categories.component.css']
})
export class ViewAllCategoriesComponent implements OnInit {
  categories: any[];
  cols: any[];
  orderDir: any;
  subCategories: any[];

  navigateTo(path: string[]) {
    this.router.navigate(path);
  }

  log(s) {
    console.log(s);
  }

  orderBy(col) {
    this.orderDir[col] = this.orderDir[col] == 0 ?
      this.orderDir[col] = 1 : this.orderDir[col] == -1 ?
        this.orderDir[col] = 0 : -1 * this.orderDir[col];
    //add Ordering...
    this.categories = this.categories;
  }

  constructor(private router: Router, private api: ApiService) {
    this.orderDir = {'code': 0, 'titleAr': 0, 'titleEn': 0, 'creationDate': 0, 'icon': 0, 'id': 0, 'parentCategoryId': 0,};
    this.subCategories=[];
    this.api.get('/categories').subscribe((data: any) => {
      if (data.ok) {
        this.categories = JSON.parse(data._body);
        this.categories.map(category=> {
          // cat['showSub'] = false;
          this.api.get('/categories/' + category.id + '/subCategories').subscribe((data: any) => {
            if (data.ok) {
              let res=JSON.parse(data._body);
              let temp={'parentId':category.id,'value':res,'visible':false,'cols':res.length>0?Object.keys(res[0]):[]};
              this.subCategories.push(temp);
            }
          });
        });
        if (this.categories.length > 0) {
          this.cols = Object.keys(this.categories[0]);
        } else {
          alert('No data found');
        }
      } else {
        console.log(data.statusText);
      }
    });
  }
  // getSub(category){
  //   let res;
  //   this.subCategories.map(sub => {
  //     if(sub.parentId== category.id){
  //       res=sub;
  //     }
  //   });
  //   return this.subCategories[this.subCategories.indexOf(res)];
  //   }


  showSub(category) {
    this.subCategories.map(sub => {
      if(sub.parentId== category.id){
       if(sub.visible){
         sub.visible=false;
       }else{
         sub.visible=true;
       }
      }else{
        sub.visible=false;
      }
    });
    this.subCategories=[...this.subCategories];
  }

  filterBox($event) {
  }

  ngOnInit() {
  }

}
