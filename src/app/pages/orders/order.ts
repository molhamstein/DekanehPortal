import {Coupon} from '../coupons/coupon';

export class Order {
    code: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    clientType: string;
    coupon: Coupon;
    orderProducts: OrderProduct[];
    assignedDate: string;
    deliveredDate: string;
    id: string;
    clientId: string;
    deliveryMemberId: string;
    couponId: string;

    constructor() {

    }
}
export class OrderProduct {
    count: number;
    price:number;

    productId: string
}
