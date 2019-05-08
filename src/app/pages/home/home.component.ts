import { OrdersHandlerService } from './../orders/orders-handler.service';
import { element } from 'protractor';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConstService } from './../../services/const.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import '../../../assets/charts/amchart/amcharts';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/pie.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/ammap.js';
import '../../../assets/charts/amchart/worldLow.js';
import { HomeHandlerService } from './home-handler.service';
import { Order } from '../orders/order';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    unpage = false;
    spinnerFlag: boolean;
    viewProduct = []
    CountProduct = []
    barcodes = []
    nameOrderDir;
    dateDir
    totalCountDir
    statusCode: number;
    requestProcess = false;
    allOreder: Order[] = [];
    currentPage = 1;
    page: number;
    returnedArray: any[] = [];
    pages = 20;
    productsCount;
    searchString = '';


    meObject = {}
    curentState;
    changeState(newState, model) {
        this.curentState = newState;
        model.show();
    }

    yesChange(modal){
        if(this.curentState=='in'){
            this.homeHandler.login(this.meObject['warehouseId'])
            .finally(() => {
            })
            .subscribe(data => {
                modal.hide();
                this.meObject['state']='in';
            }
                , errorCode => this.showError());

        }
        else {
            this.homeHandler.logout(this.meObject['warehouseId'])
            .finally(() => {
            })
            .subscribe(data => {
                modal.hide();
                this.meObject['state']='out';
            }
                , errorCode => this.showError());

        }
    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    modalRef;
    confirmId
    openModal(template: TemplateRef<any>, id) {
        this.confirmId = id;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
    }

    private eventOptions: boolean | { capture?: boolean, passive?: boolean };

    suppliers = []
    statuses = ["pending", "packed", "pendingDelivery"]
    supplier = 1
    status = 1
    from;
    to;
    constructor(private modalService: BsModalService, private Handler: OrdersHandlerService, private homeHandler: HomeHandlerService, private router: Router, private alert: AlertService, private c: ConstService) {
        this.getAllProducts();
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    pageChanged(event: any): void {
        setTimeout(() => {
            this.getAllProducts();

        }, 50);
    }

    editSupllierOrder(id: string) {
        this.router.navigate(['/supplier-orders/edit/' + id]);
    }

    decline(): void {
        this.modalRef.hide();
    }




    setFilters() {
        var where = {};
        if (this.from)
            where['from'] = new Date(this.from)
        if (this.to)
            where['to'] = new Date(this.to)
        if (this.status != 1)
            where['status'] = this.status
        console.log("where")
        console.log(where)
        this.getAllProducts(where);
    }

    emptyFields() {
        this.from = null;
        this.to = null;
        this.status = 1;
        this.getAllProducts();

    }
    ngOnInit() {

        this.homeHandler.getMe()
            .finally(() => {
            })
            .subscribe(data => {
                this.meObject = data;
            }
                , errorCode => this.showError());

    }
    getTimer(date) {
        let nowDate = new Date().getTime();

        let time = ((new Date(date).getTime() + 60 * 60 * 24 * 1000) - nowDate) / (60 * 60 * 1000);
        if (time > 0) {
            let hours = Math.floor(time);
            let minuets = Math.floor((time - hours) * 60);
            let seconeds = Math.floor(((time - hours) * 60 - minuets) * 60);
            return seconeds + ' : ' + minuets + ' : ' + hours;

        } else return undefined;
    }

    submitPikker(index, modal) {
        this.orderIndex = index;
        modal.show()

    }

    getAllProducts(where = {}) {
        this.spinnerFlag = true;
        this.homeHandler.getWorkerOrder(where)
            .finally(() => {
                this.returnedArray = this.allOreder;
                for (var i = 0; i < this.returnedArray.length; ++i) {
                    this.barcodes[i] = ""
                    this.viewProduct[i] = false;
                    this.CountProduct[i] = 0;
                    this.returnedArray[i].orderProducts.forEach(element => {
                        this.CountProduct[i] += element.count
                        element.checked = false

                    });
                }
                this.spinnerFlag = false;
                this.unpage = false;

                if (localStorage.getItem('productsScreenY')) {
                    setTimeout(() => {
                        window.scrollTo(0, Number(localStorage.getItem('productsScreenY')));

                    }, 100);
                }

            })
            .subscribe(data => {
                this.allOreder = data;
            }
                , errorCode => this.showError());



    }

    changepages(event) {

        this.pages = event.target.value;
        setTimeout(() => {
            this.currentPage = 1;
        }, 50);
        this.getAllProducts();


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
    oneProduct = {}
    submitBarcode(index, modal) {
        var mainThis = this
        this.homeHandler.getProductBybarcode(this.barcodes[index])
            .finally(() => {


            })
            .subscribe(data => {
                this.barcodes[index] = ""
                this.orderIndex = index;
                this.allOreder[index].orderProducts.forEach(function (element) {
                    if (element.productId == data[0].productId) {
                        modal.show()
                        mainThis.oneProduct = element;
                    }
                });
            }
                , errorCode => this.showError());


    }

    yes(modal, confirmModel) {
        modal.hide()
        this.oneProduct['checked'] = true;
        if (this.cheackProductOrder(this.orderIndex)) {
            this.submitPikker(this.orderIndex, confirmModel)
        }
    }
    orderIndex = "";


    yesPacked(modal) {
        modal.hide();
        this.Handler.assignPack(this.allOreder[this.orderIndex].id).subscribe(() => {
            this.router.navigate(['/orders/management']);
        }, errorCode => this.showError());
    }
    cheackProductOrder(orderIndex) {
        for (let index = 0; index < this.allOreder[orderIndex].orderProducts.length; index++) {
            const element = this.allOreder[orderIndex].orderProducts[index];
            if (element['checked'] == false) {
                return false
            }
            if (index == this.allOreder[orderIndex].orderProducts.length - 1)
                return true
        }
    }

}
