import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ConstService} from '../../../services/const.service';
import {URLSearchParams} from '@angular/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-all-categories',
  templateUrl: './view-all-categories.component.html',
  styleUrls: ['./view-all-categories.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(0)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(100%)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(100%)', opacity: 1}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class ViewAllCategoriesComponent implements OnInit {
  categories: any[];
  cols: any[];
  orderDir: any;
  subCategories: any[];
  modalRef: BsModalRef;
  catTodelete: string;

  constructor(private router: Router, private api: ApiService, public c: ConstService, private modalService: BsModalService) {
    this.orderDir = {'code': 0, 'titleAr': 0, 'titleEn': 0, 'creationDate': 0, 'icon': 0, 'id': 0, 'parentCategoryId': 0,};
    //
    let param = new URLSearchParams();
    param.append('filter', '{"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories","order": "creationDate DESC"}');
    this.api.get('/categories', param).subscribe((data: any) => {
      if (data.ok) {
        this.categories = JSON.parse(data._body);
        this.subCategories = [];
        this.categories.map(category => {
          // cat['showSub'] = false;
          this.api.get('/categories/' + category.id + '/subCategories').subscribe((data: any) => {
            if (data.ok) {
              let res = JSON.parse(data._body);
              let temp = {
                'parentId': category.id,
                'value': res,
                'visible': false,
                'cols': res.length > 0 ? Object.keys(res[0]) : []
              };
              this.subCategories.push(temp);
            }
          });
        });
        if (this.categories.length > 0) {
          console.log(this.cols);
          this.cols = Object.keys(this.categories[0]);
          let index: number = this.cols.indexOf('icon');
          let index2: number = this.cols.indexOf('subCategories');
          if (index2 !== -1) {
            this.cols.splice(index2, 1);

          }
          if (index !== -1) {
            this.cols.splice(index, 1);
          }

        } else {
          alert('No data found');
        }
      } else {
        console.log(data.statusText);
      }
    });
  }

  openModal(template: TemplateRef<any>, category) {
    this.catTodelete = category;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: true, ignoreBackdropClick: true});
  }

  confirm(): void {
    this.deleteCat(this.catTodelete);
  }

  decline(): void {
    this.modalRef.hide();
  }

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
    if (this.orderDir[col] == 1) {
      this.categories.sort((a, b) => a[col] < b[col] ? -1 : 1);
    } else if (this.orderDir[col] == -1) {
      this.categories.sort((a, b) => a[col] > b[col] ? -1 : 1);
    } else
      return;
  }

  editCat(category) {
    this.router.navigate(['categories', category.id, 'edit']);
  }

  deleteCat(category) {
    this.api.delete('/categories', category.id,).finally(() => {
      this.modalRef.hide();
    }).subscribe(
      (res: any) => {
        if (res.ok) {
          this.api.get('/categories').subscribe((data: any) => {
            if (data.ok) {
              this.categories = JSON.parse(data._body);
              this.subCategories = [];
              this.categories.map(category => {
                // cat['showSub'] = false;
                this.api.get('/categories/' + category.id + '/subCategories').subscribe((data: any) => {
                  if (data.ok) {
                    let res = JSON.parse(data._body);
                    let temp = {
                      'parentId': category.id,
                      'value': res,
                      'visible': false,
                      'cols': res.length > 0 ? Object.keys(res[0]) : []
                    };
                    this.subCategories.push(temp);
                  }
                });
              });
              if (this.categories.length > 0) {
                console.log(this.cols);

                this.cols = Object.keys(this.categories[0]);
                let index: number = this.cols.indexOf('icon');
                let index2: number = this.cols.indexOf('subCategories');
                if (index2 !== -1) {
                  this.cols.splice(index2, 1);

                }
                if (index !== -1) {
                  this.cols.splice(index, 1);
                }
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
    // alert('DELETE ' + category.id);
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
