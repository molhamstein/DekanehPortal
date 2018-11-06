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

  orderBy(col) {
    for (var ord in this.orderDir) {
      if (this.orderDir.hasOwnProperty(ord)) {
        if (col == ord) {
          this.orderDir[ord] = this.orderDir[ord] == 0 ?
            this.orderDir[ord] = 1 : this.orderDir[ord] == -1 ?
              this.orderDir[ord] = 0 : -1 * this.orderDir[ord];
        } else {
          this.orderDir[ord] = 0;
        }
      }
    }
    if(this.orderDir[col]==1){
      this.categories.sort((a, b) => a[col]< b[col] ? -1 : 1);
    }else if(this.orderDir[col]==-1){
      this.categories.sort((a, b) => a[col]> b[col] ? -1 : 1);
    }else
      return;
  }

  editCat(category) {
    this.router.navigate(['Categories',category.id,'edit'])
  }

  deleteCat(category) {
    this.api.delete ('/categories',category.id,).subscribe(
      (res:any)=>{
        if(res.ok){
          this.api.get('/categories').subscribe((data: any) => {
            if (data.ok) {
              this.categories = JSON.parse(data._body);
              this.subCategories=[];
              this.categories.map(category => {
                // cat['showSub'] = false;
                this.api.get('/categories/' + category.id + '/subCategories').subscribe((data: any) => {
                  if (data.ok) {
                    let res = JSON.parse(data._body);
                    let temp = {'parentId': category.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : []};
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
      }
    );
    alert('DELETE ' + category.id);
  }

  constructor(private router: Router, private api: ApiService) {
    this.orderDir = {'code': 0, 'titleAr': 0, 'titleEn': 0, 'creationDate': 0, 'icon': 0, 'id': 0, 'parentCategoryId': 0,};
    this.api.get('/categories').subscribe((data: any) => {
      if (data.ok) {
        this.categories = JSON.parse(data._body);
        this.subCategories=[];
        this.categories.map(category => {
          // cat['showSub'] = false;
          this.api.get('/categories/' + category.id + '/subCategories').subscribe((data: any) => {
            if (data.ok) {
              let res = JSON.parse(data._body);
              let temp = {'parentId': category.id, 'value': res, 'visible': false, 'cols': res.length > 0 ? Object.keys(res[0]) : []};
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
  showSub(category) {
    this.subCategories.map(sub => {
      if (sub.parentId == category.id) {
        if (sub.visible) {
          sub.visible = false;
        } else {
          sub.visible = true;
        }
      } else {
        sub.visible = false;
      }
    });
    this.subCategories = [...this.subCategories];
  }

  filterBox($event) {
  }

  ngOnInit() {
  }

}
