import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrdersHandlerService} from '../orders-handler.service';
import {Order, OrderProduct} from '../order';
import {ConstService} from '../../../services/const.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOption} from 'ng-select';
import {ProductHandler} from '../../products/product-handler';
import {ProductModel} from '../../products/product-model';
import {CouponHandlerService} from '../../coupons/coupon-handler.service';
import {UserModel} from '../../user-model';
import {Coupon} from '../../coupons/coupon';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {StaffHandler} from '../../staff/staff.handler';
import {DatePipe} from '@angular/common';
import {AlertService} from '../../../services/alert.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'app-orders-manage',
    templateUrl: './orders-manage.component.html',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateY(100%)', opacity: 0}),
                    animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
                ])
            ]
        ), trigger(
            'rightEnterLeftLeaveAnimation', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('300ms', style({transform: 'translateX(-100%)', opacity: 0}))
                ])
            ]
        )
    ],
    styleUrls: ['./orders-manage.component.css']
})
export class OrdersManageComponent implements OnInit {
    showNewBtn = true;
    orders: any[];
    todayIndex: number;
    addNew = false;
    toDay = this.datFormater(new Date());
    totalPrice = 0;
    dateIndexes: any[];
    editProducts: any[];
    orderUser: UserModel;
    spinnerFlag: boolean;
    unpage = false;
    productsCount;
    pages = 20;
    viewDate;
    orderTodelete;
    onEdit = false;
    IOproducts: Array<IOption> = [];
    IOusers: Array<IOption> = [];
    IOdeusers: Array<IOption> = [];
    tP: Array<IOption> = [];
    ul: Array<IOption> = [];
    deul: Array<IOption> = [];
    products: any[] = [];
    newProducts: any[] = [];
    delMan: any;
    isSubmitted = false;
    couponOrder: Coupon;
    currentPage = 1;
    editIndex;
    modalRef: BsModalRef;
    couponNotfound: boolean;
    hoveredIndex;
    OrderToEdit: any;
    newOrder: Order;
    productError = false;
    users: UserModel[];
    // clientTypeList=['retailCostumer', 'wholesale', 'horeca'];
    selectedProducts: OrderProduct[] = [];
    selectedEditProducts = [];
    selectedEditProductsIds: string[];
    selectedProductsIds: string[];
    statusCode: number;
    orderForm = new FormGroup({
        clientId: new FormControl('', Validators.required),
    });
    delstatus = ['pending', 'inDelivery', 'delivered', 'canceled'];

    constructor(private modalService: BsModalService,
                private datePipe: DatePipe,
                private Handler: OrdersHandlerService,
                private userHandler: StaffHandler,
                private productHandler: ProductHandler,
                public c: ConstService,
                private CouponHandler: CouponHandlerService,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        }, errorCode => this.showError());
        this.orders = [];
        this.getOrders();
        this.newOrder = new Order();
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

    showError() {
        this.alert.showToast.next({type: 'error'});
    }

    datFormater(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    findDateByIndex(index) {
        let obj = this.dateIndexes.find(x => x.index == index);
        if (obj == undefined) {
            return obj;
        } else {
            this.viewDate = obj.date;
            return this.viewDate;

        }
    }

    getOrders() {
        this.spinnerFlag = true;
        this.Handler.getOrdersCount().finally(() => {
            this.Handler.getOrders(this.pages, this.currentPage)
                .finally(() => {
                    this.dateIndexes = [];
                    let d = this.datFormater(this.orders[0].orderDate);
                    this.dateIndexes.push({date: d, index: 0});
                    for (let o of this.orders) {
                        if (this.datFormater(o.orderDate) != this.datFormater(d)) {
                            d = this.datFormater(o.orderDate);
                            this.dateIndexes.push({date: d, index: this.orders.indexOf(o)});
                        }
                    }
                    this.spinnerFlag = false;
                    this.unpage = false;
                    if (localStorage.getItem('ordersScreenY')) {
                        setTimeout(() => {
                            window.scrollTo(0, Number(localStorage.getItem('ordersScreenY')));

                        }, 100);
                    }

                })
                .subscribe(data => {
                        this.orders = data;

                    }
                    , errorCode => this.showError());

        }).subscribe(c => {
            this.productsCount = c['count'];
        }, errorCode => this.showError());
    }

    deleteOrder(id) {
        this.Handler.deleteOrder(id).finally(() => {

            this.modalRef.hide();
            this.router.navigate(['/orders/management']);


        }).subscribe(() => {
        }, errorCode => this.showError());

    }

    openModal(template: TemplateRef<any>, orderId) {
        this.orderTodelete = orderId;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: true, ignoreBackdropClick: true});
    }

    confirm(): void {
        this.deleteOrder(this.orderTodelete);
    }

    decline(): void {
        this.modalRef.hide();
    }
    editOrder(order, index) {
        this.addNew = false;
        this.CouponHandler.getUsersByString(order.client.ownerName).finally(() => {
            this.OrderToEdit = order;
            this.editProducts = this.OrderToEdit.orderProducts;
            this.totalPrice = this.OrderToEdit.totalPrice;
            this.editIndex = index;

        }).subscribe(data => {
                this.ul = [];
                for (let u of data) {
                    this.ul.push({label: u.shopName, value: u.id});
                }
                this.users = data;
                setTimeout(() => {
                    this.IOusers = this.ul;
                }, 100);
            }, errorCode => this.showError()
        );
        if (order.deliveryMemberId != undefined && order.deliveryMemberId != '') {
            order.status = 'inDelivery';
            this.userHandler.getStaffUserById(order.deliveryMemberId).finally(() => {

                this.Handler.getٍStaffByString(this.delMan.username).subscribe(data => {
                        this.deul = [];
                        for (let u of data) {
                            this.deul.push({label: u.username, value: u.id});
                        }
                        setTimeout(() => {
                            this.IOdeusers = this.deul;
                        }, 100);
                    }, errorCode => this.showError()
                );
            }).subscribe(d => this.delMan = d, errorCode => this.showError());
        }
        this.tP = [];
        this.selectedEditProductsIds = [];
        this.selectedProducts = [];
        for (let pro of order.orderProducts) {
            this.tP.push({label: pro.nameAr, value: pro.productId});
            this.selectedEditProducts.push({
                'count': pro.count,
                'price': pro.price,
                'productId': pro.productId,

            });

        }


        setTimeout(() => {
            this.IOproducts = this.tP;
        }, 50);


    }

    productSelected(IOproduct) {
        let product = this.products.find(x => x._id === IOproduct.value);
        this.newProducts.push(product);

        this.selectedProducts.push({
            'count': 0,
            'price': 0,
            'productId': product._id,
        });
        this.newOrder.orderProducts = this.selectedProducts;
        this.selectedProductsIds = [];

        this.productCheck();
    }

    productEditSelected(IOproduct) {
        let product = this.findEditProduct(IOproduct.value);
        this.selectedEditProducts.push({
            'count': 0,
            'price': 0,
            'productId': product._id,
        });
        this.selectedEditProductsIds = [];
    }

    productCheck() {
        if (this.newOrder.orderProducts == [] || this.newOrder.orderProducts == undefined) {
            this.productError = true;
        } else {
            this.productError = false;

        }
    }

    cancelOrder() {
        this.OrderToEdit = this.delMan = this.selectedEditProductsIds = this.editProducts = this.couponOrder = undefined;
        this.selectedEditProducts = [];
        this.totalPrice = 0;
        this.editIndex = undefined;

    }

    checkCoupon(e) {
        let value = e.target.value;
        this.CouponHandler.getCouponByCode(value).subscribe(c => {

            this.newOrder.couponId = this.couponOrder.id;
            this.totalPriceCalculate(this.selectedProducts);
        }, errorCode => this.showError());
    }

    checkEditCoupon(e) {
        let value = e.target.value;
        this.CouponHandler.getCouponByCode(value).subscribe(c => {
            this.couponOrder = c[0];
            this.OrderToEdit.couponId = this.couponOrder;
            this.totalPriceCalculate(this.selectedEditProducts);
        }, errorCode => this.showError());
    }

    pageChanged(event: any): void {
        setTimeout(() => {
            this.getOrders();
        }, 50);
    }

    changepages(event) {
        this.pages = event.target.value;
        setTimeout(() => {
            this.currentPage = 1;
        }, 50);
        this.getOrders();
    }

    findProduct(id) {
        return this.newProducts.find(x => x._id === id);
    }

    findEditProduct(id) {
        if (this.editProducts.find(x => x.productId === id) == undefined) {
            return this.editProducts.find(x => x._id === id);

        } else {
            return this.editProducts.find(x => x.productId === id);

        }
    }

    productDeSelected(id) {
        let product = this.products.find(x => x._id === id);
        this.selectedProducts.splice(this.selectedProducts.indexOf(this.selectedProducts.find(x => x.productId === id)), 1);
        this.newOrder.orderProducts = this.selectedProducts;
        this.totalPriceCalculate(this.selectedProducts);
        this.productCheck();
    }

    productEditDeSelected(id) {
        let product = this.findEditProduct(id);
        this.selectedEditProducts.splice(this.selectedEditProducts.indexOf(this.selectedEditProducts.find(x => x.productId === id)), 1);
        this.OrderToEdit.orderProducts = this.selectedEditProducts;
    }

    findUser(id) {
        return this.users.find(x => x.id === id);
    }

    priceCalculate(id, count) {
        let product: ProductModel;
        product = this.products.find(x => x._id === id);
        let price: number;
        if (this.orderUser.clientType == 'horeca') {
            if (product.horecaPriceDiscount != 0) {
                price = product.horecaPriceDiscount * count;
            } else {
                price = product.horecaPrice * count;
            }
        } else if (this.orderUser.clientType == 'wholesale' || this.orderUser.clientType == 'retailCostumer') {
            if (product.wholeSalePriceDiscount != 0) {
                price = product.wholeSalePriceDiscount * count;
            } else {
                price = product.wholeSalePrice * count;
            }

        }
        this.selectedProducts.find(x => x.productId == id).price = price;
        this.totalPriceCalculate(this.selectedProducts);

    }

    priceEditCalculate(id, count) {

        let price: number;

        this.productHandler.getProductById(id).subscribe(p => {


            if (this.OrderToEdit.clientType == 'horeca') {
                if (p.horecaPriceDiscount != 0) {
                    price = p.horecaPriceDiscount * count;

                } else {
                    price = p.horecaPrice * count;

                }
            } else if (this.OrderToEdit.clientType == 'wholesale' || this.orderUser.clientType == 'retailCostumer') {
                if (p.wholeSalePriceDiscount != 0) {
                    price = p.wholeSalePriceDiscount * count;

                } else {
                    price = p.wholeSalePrice * count;
                }

            }
            this.selectedEditProducts.find(x => x.productId == id).price = price;
            this.totalPriceCalculate(this.selectedEditProducts);

        }, errorCode => this.showError());


    }

    totalPriceCalculate(allProducts) {
        this.totalPrice = 0;
        for (let product of allProducts) {
            this.totalPrice += product.price;
        }
        if (this.couponOrder != undefined) {
            if (this.couponOrder.type == 'fixed') {
                this.totalPrice -= this.couponOrder.value;
            } else if (this.couponOrder.type == 'percent') {
                this.totalPrice = this.totalPrice - (this.couponOrder.value * this.totalPrice / 100);
            }
        }
    }

    userSelected(u, order) {
        this.orderUser = this.findUser(u.value);
        order.clientType = this.orderUser.clientType;
        order.status = 'pending';
    }

    DeuserSelected(u, order) {
        order.status = 'inDelivery';
    }

    searchUsers(str) {
        this.CouponHandler.getUsersByShope(str).subscribe(data => {
                this.ul = [];
                for (let u of data) {
                    this.ul.push({label: u.shopName, value: u.id});
                }
                this.users = data;

                setTimeout(() => {
                    this.IOusers = this.ul;
                }, 50);
            }, errorCode => this.showError()
        );
    }

    searchDeUsers(str) {
        this.Handler.getٍStaffByString(str).subscribe(data => {
            console.log(data);
                this.deul = [];
                for (let u of data) {
                    this.deul.push({label: u.username, value: u.id});
                }
                setTimeout(() => {
                    this.IOdeusers = this.deul;
                }, 100);
            }, errorCode => this.showError()
        );
    }

    ngOnInit() {
        window.addEventListener('scroll', this.scroll, true); //third parameter
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

    scroll = (): void => {
        localStorage.setItem('ordersScreenY', window.pageYOffset.toString());
    };

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
                        this.products = this.products.concat(data);
                    }
                    , errorCode => this.showError());
        }

    }

    searchEditProducts(str) {
        this.tP = [];
        if (str != '') {
            this.productHandler.search(str)
                .subscribe(data => {
                        for (let pro of data) {
                            this.tP.push({label: pro.nameAr, value: pro._id});
                            this.editProducts.push(pro);
                        }
                        setTimeout(() => {
                            this.IOproducts = this.tP;
                        }, 50);

                    }
                    , errorCode => this.showError());
        }

    }

    createOrder() {
        this.newOrder.totalPrice = this.totalPrice;
        this.addNew = !this.addNew;

        this.Handler.createOrder(this.newOrder).finally(() => {
            this.router.navigate(['/orders/management']);
        }).subscribe(data => {
        }, errorCode => this.showError());
    }

    editOrderApi(order) {
        order.orderProducts = this.selectedEditProducts;
        order.totalPrice = this.totalPrice;
        console.log(order);
        this.Handler.updateOrder(order).finally(() => {
            this.cancelOrder();
        }).subscribe(data => {
        }, errorCode => this.showError());
    }

    onOrderFormSubmit() {
        this.isSubmitted = true;

        if (this.orderForm.invalid || this.productError) {
            return;
        }
        this.createOrder();
    }
}
