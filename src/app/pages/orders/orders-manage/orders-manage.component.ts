import {Component, OnInit} from '@angular/core';
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
        )
    ],
    styleUrls: ['./orders-manage.component.css']
})
export class OrdersManageComponent implements OnInit {
    orders: any[];
    totalPrice = 0;
    editProducts: any[];
    orderUser: UserModel;
    spinnerFlag: boolean;
    unpage = false;
    productsCount;
    pages = 20;
    onEdit = false;
    IOproducts: Array<IOption> = [];
    IOusers: Array<IOption> = [];
    IOdeusers: Array<IOption> = [];
    tP: Array<IOption> = [];
    ul: Array<IOption> = [];
    deul: Array<IOption> = [];
    products: any[]=[];
    newProducts: any[]=[];
    delMan: any;
    isSubmitted = false;
    couponOrder: Coupon;
    currentPage = 1;
    editIndex;
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

    constructor(private Handler: OrdersHandlerService, private userHandler: StaffHandler, private productHandler: ProductHandler, public c: ConstService, private CouponHandler: CouponHandlerService, private router: Router, private route: ActivatedRoute) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
        this.orders = [];
        this.getOrders();
        this.newOrder = new Order();
    }

    getOrders() {
        this.spinnerFlag = true;
        this.Handler.getOrdersCount().finally(() => {
            this.Handler.getOrders(this.pages, this.currentPage)
                .finally(() => {
                    this.spinnerFlag = false;
                    this.unpage = false;
                })
                .subscribe(data => {
                        this.orders = data;
                        console.log(data.find(x=>x.id=='5c0293e444e1e86995a57732'));
                    }
                    , errorCode => this.statusCode = errorCode);

        }).subscribe(c => {
            this.productsCount = c['count'];
        });
    }

    editOrder(order, index) {
        this.CouponHandler.getUsersByString(order.client.ownerName).finally(() => {
            this.OrderToEdit = order;
            this.editProducts = this.OrderToEdit.products;
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
            }
        );
        if (order.deliveryMemberId != undefined && order.deliveryMemberId != '') {
            console.log(order.deliveryMemberId);

            this.userHandler.getStaffUserById(order.deliveryMemberId).finally(() => {

                this.CouponHandler.getUsersByString(this.delMan.ownerName).subscribe(data => {
                        this.deul = [];
                        for (let u of data) {
                            this.deul.push({label: u.ownerName, value: u.id});
                        }
                        setTimeout(() => {
                            this.IOdeusers = this.deul;
                        }, 100);
                    }
                );
            }).subscribe(d => this.delMan = d);
        }
        this.tP = [];
        this.selectedEditProductsIds = [];
        this.selectedProducts = [];
        for (let pro of order.products) {
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
        let product = this.products.find(x=>x._id===IOproduct.value);
        this.newProducts.push(product);

        this.selectedProducts.push({
            'count': 0,
            'price': 0,
            'productId': product._id,
        });
        this.newOrder.products = this.selectedProducts;
        this.selectedProductsIds=[];

        this.productCheck();
    }

    productEditSelected(IOproduct) {
        let product = this.findEditProduct(IOproduct.value);
        this.selectedEditProducts.push({
            'count': 0,
            'price': 0,
            'productId': product._id,
        });
this.selectedEditProductsIds=[];
    }

    productCheck() {
        if (this.newOrder.products == [] || this.newOrder.products == undefined) {
            this.productError = true;
        } else {
            this.productError = false;

        }
    }

    cancelOrder() {
        this.OrderToEdit = this.delMan = this.selectedEditProductsIds = this.editProducts = this.couponOrder = undefined;
        this.selectedEditProducts = [];
        this.editIndex = undefined;

    }

    checkCoupon(e) {
        let value = e.target.value;
        this.CouponHandler.getCouponByCode(value).subscribe(c => {

            this.newOrder.couponId = this.couponOrder.id;
            this.totalPriceCalculate(this.selectedProducts);
        });
    }

    checkEditCoupon(e) {
        let value = e.target.value;
        this.CouponHandler.getCouponByCode(value).subscribe(c => {
            this.couponOrder = c[0];
            this.OrderToEdit.couponId = this.couponOrder;
            this.totalPriceCalculate(this.selectedEditProducts);
        });
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
        this.newOrder.products = this.selectedProducts;
        this.productCheck();
    }

    productEditDeSelected(id) {
        let product = this.findEditProduct(id);
        this.selectedEditProducts.splice(this.selectedEditProducts.indexOf(this.selectedEditProducts.find(x => x.productId === id)), 1);
        this.OrderToEdit.products = this.selectedEditProducts;
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
                    console.log(price);

                } else {
                    price = p.wholeSalePrice * count;
                }

            }
            this.selectedEditProducts.find(x => x.productId == id).price = price;
            this.totalPriceCalculate(this.selectedEditProducts);

        });


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

        this.CouponHandler.getUsersByString(str).subscribe(data => {
                this.ul = [];
                for (let u of data) {
                    this.ul.push({label: u.shopName, value: u.id});
                }
                this.users = data;
                setTimeout(() => {
                    this.IOusers = this.ul;
                }, 100);
            }
        );
    }

    searchDeUsers(str) {
        this.CouponHandler.getUsersByString(str).subscribe(data => {
                this.deul = [];
                for (let u of data) {
                    this.deul.push({label: u.ownerName, value: u.id});
                }
                setTimeout(() => {
                    this.IOdeusers = this.deul;
                }, 100);
            }
        );
    }

    ngOnInit() {
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
                        this.products=this.products.concat(data);
                    }
                    , errorCode => this.statusCode = errorCode);
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
                    , errorCode => this.statusCode = errorCode);
        }

    }

    createOrder() {
        this.newOrder.totalPrice = this.totalPrice;
        console.log(this.newOrder);
        this.Handler.createOrder(this.newOrder).finally(() => {
            this.router.navigate(['/orders/management']);
        }).subscribe();
    }

    editOrderApi(order) {
        order.products = this.selectedEditProducts;
        order.totalPrice = this.totalPrice;
        this.Handler.updateOrder(order).finally(() => {
            this.cancelOrder();
        }).subscribe();
    }

    onOrderFormSubmit() {
        this.isSubmitted = true;

        if (this.orderForm.invalid || this.productError) {
            return;
        }
        console.log(this.newOrder);
        this.createOrder();
    }
}
