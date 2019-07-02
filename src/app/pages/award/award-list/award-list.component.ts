import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LevelHandlerService } from './../../levels/level-handler.service';
import { AwardHandler } from './../award-handler';
import { AwardModel } from './../award-model';
import { ConstService } from './../../../services/const.service';
import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})
export class AwardListComponent implements OnInit {
  unpage = false;
  spinnerFlag: boolean;
  searchKey = "";
  statusCode: number;
  requestProcess = false;
  allAwards: AwardModel[] = [];
  currentPage = 1;
  page: number;
  returnedArray: any[] = [];
  pages = 20;
  awardsCount;
  searchString = '';

  status = 1;
  clientType = 1;
  level = 1;

  levels = []
  clientTypes = [{ "value": "wholesale", "label": "wholesale" }, { "value": "horeca", "label": "horeca" }, { "value": "consumer", "label": "consumer" }]
  statusList = [{ "value": "active", "label": "active" }, { "value": "deactive", "label": "deactive" }]



  modalRef: BsModalRef;
  awardView = {}
  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  private eventOptions: boolean | { capture?: boolean, passive?: boolean };

  constructor(private awardServices: AwardHandler, private modalService: BsModalService, private levelsHandler: LevelHandlerService, private router: Router, private alert: AlertService, private ngZone: NgZone, private c: ConstService) {
    // this.getAllCats();
    // this.getAllMans();

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }

  keyUp() {
    var lastSearch = ""
    var mainThis = this
    lastSearch = mainThis.searchKey
    setTimeout(function () {
      if (lastSearch == mainThis.searchKey) {
        mainThis.setFilters()
      }
    }, 700);

  }

  pageChanged(event: any): void {
    setTimeout(() => {
      this.getAllProducts();

    }, 50);
  }

  editProduct(id: string) {
    this.router.navigate(['/abstract-products/edit/' + id]);
  }

  getWarningProd() {
    this.router.navigate(['/reports/warning']);

    // this.isWarningView = true;
    // let as: AwardModel[] = [];
    // this.awardServices.getWarningProd().finally(() => {
    //   this.unpage = true;
    //   this.allAwards = as;
    //   this.returnedArray = as;

    // }).finally(() => {
    //   if (localStorage.getItem('productsScreenY')) {
    //     setTimeout(() => {
    //       window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

    //     }, 1000);
    //   }
    // }).subscribe(data => {
    //   this.warningData = data;
    // }, errorCode => this.showError());
  }





  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox() {
    let value = this.searchKey;
    if (value == '') {
      this.getAllProducts();
      localStorage.removeItem('search');

    } else if (value.length > 2) {
      localStorage.setItem('search', value);
      localStorage.removeItem('filters');
      this.searchProducts(value);

    }
    // this.returnedArray = this.currentArray;
    // let fields = ['nameAr', 'pack'];
    // for (let field of fields) {
    //   for (let t of this.filterByfield(this.returnedArray, field, value)) {
    //     if (!as.includes(t)) {
    //       as.push(t);
    //     }
    //   }
    // }

  }

  searchProducts(str) {
    let as: AwardModel[] = [];
    this.awardServices.search(str).finally(() => {
      this.unpage = true;
      this.allAwards = as;
      this.returnedArray = as;

    }).finally(() => {
      if (localStorage.getItem('productsScreenY')) {
        setTimeout(() => {
          window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

        }, 1000);
      }
    }).subscribe(data => {
      as = data;
    }, errorCode => this.showError());
  }


  openModal(template, award) {
    this.awardView = award;
    template.show("modal-lg")
  }




  setFilters() {
    this.spinnerFlag = true;
    let filters = [];
    if (this.searchKey != '') {
      filters.push({ 'nameAr': { "like": this.searchKey } });
    }

    if (this.clientType != 1) {
      filters.push({ 'clientTypes': { "like": this.clientType } });
    }

    if (this.level != 1) {
      filters.push({ 'levelIds': { "like": this.level } });
    }




    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.removeItem('search');
    if (filters != [] && filters.length != 0) {
      this.awardServices.getByFilters(filters).finally(() => {
        this.returnedArray = this.allAwards;
        this.spinnerFlag = false;
        this.unpage = true;
        if (localStorage.getItem('productsScreenY')) {
          setTimeout(() => {
            window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

          }, 1000);
        }
      }).subscribe(data => {

        this.allAwards = data;

      }, errorCode => this.showError());
    } else {
      this.getAllProducts();
    }
  }

  emptyFields() {
    localStorage.removeItem('filters');
    localStorage.removeItem('search');
    this.router.navigate(['/abstract-products/list']);
  }


  getAllProducts() {
    this.spinnerFlag = true;
    this.awardServices.getProductsCount().finally(() => {
      this.awardServices.getPerPageProducts(this.pages, this.currentPage)
        .finally(() => {
          this.returnedArray = this.allAwards;
          this.spinnerFlag = false;
          this.unpage = false;

          if (localStorage.getItem('productsScreenY')) {
            setTimeout(() => {
              window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

            }, 100);
          }

        })
        .subscribe(data => {
          this.allAwards = data;
        }
          , errorCode => this.showError());

    }).subscribe(c => {
      this.awardsCount = c['count'];
    }, errorCode => this.showError());


  }


  // deleteProduct(id: string) {
  //
  //   this.preConfig();
  //   this.awardServices.getProductById(id)
  //     .subscribe(product => {
  //         this.productToUpdate = product;
  //         this.productToUpdate.status = 'deactivated';
  //
  //         this.awardServices.updateOrder(this.productToUpdate).subscribe(
  //           successCode => {
  //             this.statusCode = 200;
  //             this.allAwards = this.originalProducts;
  //             // this.backToCreateArticle();
  //           },
  //           errorCode => this.showError()
  //         );
  //       },
  //       errorCode => this.showError());
  //
  // }

  changepages(event) {

    this.pages = event.target.value;
    setTimeout(() => {
      this.currentPage = 1;
    }, 50);
    this.getAllProducts();


  }

  geAllLevel() {

    this.levelsHandler.getAllLevels()
      .finally(() => {
      })
      .subscribe(data => {

        this.levels = data

      }
        , errorCode => this.showError());

  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.getAllProducts()
    this.geAllLevel()
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    if (window.pageYOffset.toString() != '0') {
      localStorage.setItem('productsScreenY', window.pageYOffset.toString());

    }
  };

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
