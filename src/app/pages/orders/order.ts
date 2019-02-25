import { Coupon } from '../coupons/coupon';

export class Order {
    code: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    note: string;
    clientType: string;
    coupon: Coupon;
    orderProducts: OrderProduct[];
    assignedDate: string;
    deliveredDate: string;
    id: string;
    clientId: string;
    deliveryMemberId: string;
    couponId: string;
    couponCode: string

    constructor() {

    }
}
export class OrderProduct {
    count: number;
    price: number;

    productId: string
}
