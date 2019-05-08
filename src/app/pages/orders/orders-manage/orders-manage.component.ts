import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersHandlerService } from '../orders-handler.service';
import { Order, OrderProduct } from '../order';
import { ConstService } from '../../../services/const.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ProductHandler } from '../../products/product-handler';
import { ProductModel } from '../../products/product-model';
import { CouponHandlerService } from '../../coupons/coupon-handler.service';
import { UserModel } from '../../user-model';
import { Coupon } from '../../coupons/coupon';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { StaffHandler } from '../../staff/staff.handler';
import { DatePipe } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { element } from 'protractor';

@Component({
  selector: 'app-orders-manage',
  templateUrl: './orders-manage.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('300ms', style({ transform: 'translateY(100%)', opacity: 0 }))
        ])
      ]
    ), trigger(
      'rightEnterLeftLeaveAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('300ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ])
      ]
    )
  ],
  styleUrls: ['./orders-manage.component.css']
})
export class OrdersManageComponent implements OnInit {
  showNewBtn = true;
  orders: any[];
  viewProduct = []
  CountProduct = [];
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
  delMemFilter;
  keeperMemFilter;
  shopeMemFilter;
  statusFilter = -1;
  statusList = [
    "pending",
    "inDelivery",
    "delivered",
    "canceled",
    "pendingDelivery",
    "packed",
    "inWarehouse"
  ]
  fromFilter;
  toFilter
  viewDate;
  orderTodelete;
  orderTodeliver;
  onEdit = false;
  IOproducts: Array<IOption> = [];
  IOusers: Array<IOption> = [];
  IOusersFilter: Array<IOption> = [];
  IOdeusers: Array<IOption> = [];
  IOdeusersFilter: Array<IOption> = [];
  IOweausers: Array<IOption> = [];
  tP: Array<IOption> = [];
  ul: Array<IOption> = [];
  deul: Array<IOption> = [];
  deulwarehousePackager: Array<IOption> = [];
  deulwarehouseKeeper: Array<IOption> = [];
  wearul: Array<IOption> = [];
  products: any[] = [];
  newProducts: any[] = [];
  delMan: any;
  isSubmitted = false;
  couponOrder: Coupon;
  currentPage = 1;
  editIndex;
  addError;
  editError;
  editErrorNameProd;
  addErrorProd;
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
  math = Math;

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
      }
    }, errorCode => this.showError());
    this.orders = [];
    this.getOrders();
    this.newOrder = new Order();
  }

  orderIdAddNote;
  clientIdAddNote;
  submiteddAddNote;
  userNotForm = new FormGroup({
    createdAt: new FormControl(new Date(), Validators.required),
    note: new FormControl("", Validators.required),
  });
  open(modal, id, clientId) {
    this.userNotForm = new FormGroup({
      createdAt: new FormControl(new Date, Validators.required),
      note: new FormControl("", Validators.required),
    });
    this.orderIdAddNote = id;
    this.clientIdAddNote = clientId
    modal.show()
  }
  orderModel
  statusModel(order, modal) {
    if (order.status == 'canceled')
      return
    this.orderModel = Object.assign({}, order);
    if (order.warehouseKeeperId != undefined && order.warehouseKeeperId != '') {
      var name = ""
      if (this.orderModel.warehouseKeeper.ownerName)
        name = this.orderModel.warehouseKeeper.ownerName
      else
        name = this.orderModel.warehouseKeeper.username

      this.Handler.getUserByString('warehouseKeeper', name).subscribe(data => {
        this.deulwarehouseKeeper = [];
        for (let u of data) {
          if (u.ownerName)
            this.deulwarehouseKeeper.push({ label: u.ownerName, value: u.id });
          else
            this.deulwarehouseKeeper.push({ label: u.username, value: u.id });
        }
        setTimeout(() => {
          this.IOdewarehouseKeeper = this.deulwarehouseKeeper;
        }, 100);
      }, errorCode => this.showError()
      );
    }
    if (order.packagerMemberId != undefined && order.packagerMemberId != '') {
      var name = ""
      if (this.orderModel.packagerMember.ownerName)
        name = this.orderModel.packagerMember.ownerName
      else
        name = this.orderModel.packagerMember.username

      this.Handler.getUserByString('warehousePackager', name).subscribe(data => {
        this.deulwarehousePackager = [];
        for (let u of data) {
          if (u.ownerName)
            this.deulwarehousePackager.push({ label: u.ownerName, value: u.id });
          else
            this.deulwarehousePackager.push({ label: u.username, value: u.id });

        }
        setTimeout(() => {
          this.IOPickedUser = this.deulwarehousePackager;
        }, 100);
      }, errorCode => this.showError()
      );
    }
    if (order.deliveryMemberId != undefined && order.deliveryMemberId != '') {
      var name = ""
      if (this.orderModel.deliveryMember.ownerName)
        name = this.orderModel.deliveryMember.ownerName
      else
        name = this.orderModel.deliveryMember.username
      this.Handler.getUserByString('deliverer', name).subscribe(data => {
        this.deul = [];
        for (let u of data) {
          if (u.ownerName)
            this.deul.push({ label: u.ownerName, value: u.id });
          else
            this.deul.push({ label: u.username, value: u.id });
        }
        setTimeout(() => {
          this.IOdeusers = this.deul;
        }, 100);
      }, errorCode => this.showError()
      );

    }
    modal.show()

  }
  download(orederId) {
    this.Handler.downloadBill(orederId).subscribe(
      successCode => {
        console.log(successCode);
        var win = window.open(successCode['path'], '_blank');
        win.focus();

      },
      errorCode => this.showError()
    )
  }

  addNote(modal) {
    if (this.userNotForm.valid == false) {
      this.submiteddAddNote = true;
      return
    }
    var data = this.userNotForm.value;
    data["userId"] = this.clientIdAddNote;
    data["orderId"] = this.orderIdAddNote;
    this.Handler.addNote(data).subscribe(
      successCode => {
        modal.hide();
      },
      errorCode => this.showError()
    )
  }

  emptyFilter() {
    this.delMemFilter = undefined;
    this.keeperMemFilter = undefined;
    this.shopeMemFilter = undefined;
    this.statusFilter = -1;
    this.fromFilter = undefined;
    this.toFilter = undefined;
    this.getOrders();
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
    this.alert.showToast.next({ type: 'error' });
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

  filter() {
    this.getOrders();
  }

  getOrdersFinilaize() {
    this.dateIndexes = [];
    let d = this.datFormater(this.orders[0].orderDate);
    this.dateIndexes.push({ date: d, index: 0 });
    for (let o of this.orders) {
      if (this.datFormater(o.orderDate) != this.datFormater(d)) {
        d = this.datFormater(o.orderDate);
        this.dateIndexes.push({ date: d, index: this.orders.indexOf(o) });
      }
    }
    this.spinnerFlag = false;
    this.unpage = false;
    if (localStorage.getItem('ordersScreenY')) {
      setTimeout(() => {
        window.scrollTo(0, Number(localStorage.getItem('ordersScreenY')));

      }, 100);
    }
  }

  getOrders() {
    this.spinnerFlag = true;
    this.orders = [];
    var where = {}
    where["and"] = []
    if (this.delMemFilter)
      where["and"].push({ "deliveryMemberId": this.delMemFilter })
    if (this.keeperMemFilter)
      where["and"].push({ "warehouseKeeperId": this.keeperMemFilter })
    if (this.statusFilter!=-1)
      where["and"].push({ "status": this.statusFilter })
    if (this.shopeMemFilter)
      where["and"].push({ "clientId": this.shopeMemFilter })
    if (this.fromFilter)
      where["and"].push({ "orderDate": { "gt": new Date(this.fromFilter) } })
    if (this.toFilter)
      where["and"].push({ "orderDate": { "lt": new Date(this.toFilter) } })

    console.log("where");
    console.log(where);
    this.Handler.getOrdersCount(where).finally(() => {
      this.Handler.getOrders(this.pages, this.currentPage, where)
        .finally(() => {
          this.getOrdersFinilaize();
        }).subscribe(data => {
          this.orders = data;
          for (var i = 0; i < data.length; ++i) {
            this.viewProduct[i] = false;
            this.CountProduct[i] = 0;
            data[i].orderProducts.forEach(element => {
              this.CountProduct[i] += element.count
            });
          }
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
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
  }

  openDeliveredModal(template: TemplateRef<any>, order) {
    this.orderTodeliver = order;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
  }

  confirm(): void {
    this.deleteOrder(this.orderTodelete);
  }

  confirmDelivered(): void {
    this.setDeliverd(this.orderTodeliver);
  }

  decline(): void {
    this.modalRef.hide();
  }

  editOrder(order, index) {
    this.addNew = false;
    console.log(order);


    this.CouponHandler.getUsersByString(order.client.ownerName).finally(() => {
      this.OrderToEdit = order;
      this.editProducts = this.OrderToEdit.orderProducts;
      this.totalPrice = this.OrderToEdit.totalPrice;
      this.editIndex = index;

    }).subscribe(data => {
      this.ul = [];
      for (let u of data) {
        this.ul.push({ label: u.shopName, value: u.id });
      }
      this.users = data;
      setTimeout(() => {
        this.IOusers = this.ul;
      }, 100);
    }, errorCode => { this.showError() }
    );


    this.tP = [];

    this.selectedEditProductsIds = [];
    this.selectedProducts = [];
    for (let pro of order.orderProducts) {
      this.tP.push({ label: pro.nameAr, value: pro.productId });
      this.selectedEditProducts.push({
        'count': pro.count,
        'sellingPrice': pro.sellingPrice,
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
      'sellingPrice': 0,
      'productId': product._id,
    });
    this.newOrder.orderProducts = this.selectedProducts;
    this.selectedProductsIds = [];

    this.productCheck();
  }

  productEditSelected(IOproduct) {
    console.log("IOproduct");
    console.log(IOproduct);
    let product = this.findEditProduct(IOproduct.value);
    this.selectedEditProducts.push({
      'count': 0,
      'price': product.sellingPrice,
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

  submitCancelOrder(model) {
    this.Handler.cancelOrder(this.orderModel.id).subscribe(() => {
      model.hide();
      this.router.navigate(['/orders/management']);
    }, errorCode => this.showError());

  }

  cancelOrder(full?) {
    this.OrderToEdit = this.delMan = this.selectedEditProductsIds = this.editProducts = this.couponOrder = undefined;
    this.selectedEditProducts = [];
    this.totalPrice = 0;
    this.editIndex = undefined;
    if (full)
      this.router.navigate(['/orders/management']);

  }

  checkCoupon(e) {
    let value = e.target.value;
    this.CouponHandler.getCouponByCode(value).subscribe(c => {
      this.couponOrder = c[0];

      this.newOrder.couponId = c[0].id;


      this.totalPriceCalculate(this.selectedProducts);
    }, errorCode => this.showError());
  }

  checkEditCoupon(e) {
    let value = e.target.value;
    this.CouponHandler.getCouponByCode(value).subscribe(c => {
      this.couponOrder = c[0];
      this.OrderToEdit.couponId = c[0].id;
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
    console.log("this.editProducts");
    console.log(this.editProducts);
    if (this.editProducts.find(x => x.productId === id) == undefined) {
      return this.editProducts.find(x => x._id === id);

    } else {
      return this.editProducts.find(x => x.productId === id).product;

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
    this.selectedProducts.find(x => x.productId == id).sellingPrice = price;
    this.totalPriceCalculate(this.selectedProducts);

  }

  priceEditCalculate(id, count) {

    let sellingPrice: number;

    this.productHandler.getProductById(id).subscribe(p => {


      if (this.OrderToEdit.clientType == 'horeca') {
        if (p.horecaPriceDiscount != 0) {
          sellingPrice = p.horecaPriceDiscount * count;

        } else {
          sellingPrice = p.horecaPrice * count;

        }
      } else if (this.OrderToEdit.clientType == 'wholesale' || this.orderUser.clientType == 'retailCostumer') {
        if (p.wholeSalePriceDiscount != 0) {
          sellingPrice = p.wholeSalePriceDiscount * count;

        } else {
          sellingPrice = p.wholeSalePrice * count;
        }

      }
      this.selectedEditProducts.find(x => x.productId == id).sellingPrice = sellingPrice;
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

  WearuserSelected(u, order) {
    order.status = 'packed';
  }

  searchUsers(str, isFilter) {
    this.CouponHandler.getUsersByShope(str).subscribe(data => {
      this.ul = [];
      for (let u of data) {
        this.ul.push({ label: u.shopName + " / " + u.ownerName, value: u.id });
      }
      this.users = data;

      setTimeout(() => {
        if (isFilter){
          console.log(this.IOusersFilter)
          this.IOusersFilter = this.ul;
        }
        else
          this.IOusers = this.ul;
      }, 50);
    }, errorCode => this.showError()
    );
  }

  IOdewarehouseKeeper: Array<IOption> = [];
  IOdewarehouseKeeperFilter: Array<IOption> = [];


  submitKeeper(model) {
    this.Handler.assignWarehouseKeeper({ 'userId': this.orderModel.warehouseKeeperId }, this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }

  submitPikker(model) {
    this.Handler.assignPack(this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }

  submitDilivery(model) {
    this.Handler.assignDelivery({ 'userId': this.orderModel.deliveryMemberId }, this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }

  submitInDelivery(model) {
    this.Handler.submitInDelivery(this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }

  changeDilivery(model) {
    this.Handler.changeDilivery({ 'userId': this.orderModel.deliveryMemberId }, this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }

  submitPendingDelivery(model) {
    this.Handler.submitPendingDelivery({ 'userId': this.orderModel.deliveryMemberId }, this.orderModel.id).subscribe(() => {
      model.hide()
      this.router.navigate(['/orders/management']);

    }, errorCode => this.showError());
  }
  searchWearKeper(str, isFilter) {
    this.Handler.getUserByString('warehouseKeeper', str).subscribe(data => {
      this.deul = [];
      for (let u of data) {
        if (u.ownerName)
          this.deul.push({ label: u.ownerName, value: u.id });
        else
          this.deul.push({ label: u.username, value: u.id });

      }
      setTimeout(() => {
        if (isFilter)

          this.IOdewarehouseKeeperFilter = this.deul;

        else
          this.IOdewarehouseKeeper = this.deul;
      }, 100);
    }, errorCode => this.showError()
    );
  }

  IOPickedUser: Array<IOption> = [];

  searchPicked(str) {
    this.Handler.getUserByString('warehousePackager', str).subscribe(data => {
      this.deul = [];
      for (let u of data) {
        if (u.ownerName)
          this.deul.push({ label: u.ownerName, value: u.id });
        else
          this.deul.push({ label: u.username, value: u.id });


      }
      setTimeout(() => {
        this.IOPickedUser = this.deul;
      }, 100);
    }, errorCode => this.showError()
    );
  }
  whereFilter = {};

  searchDeliver(str, isFilter) {
    this.Handler.getUserByString('deliverer', str).subscribe(data => {
      this.deul = [];
      for (let u of data) {
        if (u.ownerName)
          this.deul.push({ label: u.ownerName, value: u.id });
        else
          this.deul.push({ label: u.username, value: u.id });

      }
      setTimeout(() => {
        if (isFilter)

          this.IOdeusersFilter = this.deul;

        else
          this.IOdeusers = this.deul;
      }, 100);
    }, errorCode => this.showError()
    );
  }

  searchWearUsers(str) {
    this.Handler.getUserWearByString(str).subscribe(data => {
      this.wearul = [];
      for (let u of data) {
        if (u.ownerName)
          this.wearul.push({ label: u.ownerName, value: u.id });
        else
          this.wearul.push({ label: u.username, value: u.id });

      }
      setTimeout(() => {
        this.IOweausers = this.wearul;
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
    if (window.pageYOffset.toString() != '0') {
      localStorage.setItem('ordersScreenY', window.pageYOffset.toString());

    }
  };

  searchProducts(str, id) {
    this.tP = [];
    if (str != '') {
      this.productHandler.searchByUser(str, this.orderUser.clientType, "true")
        .subscribe(data => {
          for (let pro of data) {
            this.tP.push({ label: pro.nameAr, value: pro._id });
          }
          setTimeout(() => {
            this.IOproducts = this.tP;
          }, 50);
          this.products = this.products.concat(data);
        }
          , errorCode => this.showError());
    }

  }

  setDeliverd(order) {
    this.Handler.SetDelivered(order.id).finally(() => {
      order.status = 'delivered';
      this.modalRef.hide();

    }).subscribe(() => {
    }, errorCode => this.showError());
  }

  searchEditProducts(str) {
    this.tP = [];
    if (str != '') {
      this.productHandler.searchByUser(str, this.OrderToEdit.clientType)
        .subscribe(data => {
          for (let pro of data) {
            this.tP.push({ label: pro.nameAr, value: pro._id });
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
    // this.newOrder.totalPrice = this.totalPrice;
    this.addError = false;
    this.Handler.createOrder(this.newOrder).finally(() => {
    }).subscribe(data => {
      this.addNew = !this.addNew;

      this.router.navigate(['/orders/management']);
    }, errorCode => {
      if (errorCode.statusCode == 612) {
        this.addError = true;
        this.addErrorProd = errorCode.data[0]
      }
      else this.showError();
    });
  }

  editOrderApi(order) {
    order.orderProducts = this.selectedEditProducts;
    order.totalPrice = this.totalPrice;
    console.log(order);
    if (order.status === 'canceled') {
      this.Handler.cancelOrder(order.id).subscribe(() => {
        this.router.navigate(['/orders/management']);
      }, errorCode => this.showError());
    } else {
      this.editError = false;
      var tempOrder = Object.assign({}, order);
      if (order.status == 'packed') {
        tempOrder.status = "inWarehouse"
        delete tempOrder.packagerMemberId
      }
      else if (order.status == 'inDelivery') {
        tempOrder.status = "packed"
        delete tempOrder.deliveryMemberId
      }

      this.Handler.updateOrder(tempOrder).finally(() => {
        if (order.status == 'inDelivery') {
          this.Handler.assignDelivery({ 'userId': order.deliveryMemberId }, order.id).subscribe(() => {
          }, errorCode => this.showError());
        }
        else if (order.status == 'packed') {
          this.Handler.assignPack(order.id).subscribe(() => {
          }, errorCode => this.showError());
        }
        // this.cancelOrder();
      }).subscribe(data => {
        this.router.navigate(['/orders/management']);
      }, errorCode => {
        console.log(errorCode);
        if (errorCode.statusCode == 611) {
          this.editError = true;
          this.editErrorNameProd = errorCode.data[0].nameAr
        } else if (errorCode.statusCode == 612) {
          this.addError = true;
          this.addErrorProd = errorCode.data[0]
        } else { this.showError(); }
      });
    }
  }

  onOrderFormSubmit() {
    this.isSubmitted = true;

    if (this.orderForm.invalid || this.productError) {
      return;
    }
    this.createOrder();
  }
}
